import React, { useEffect, useState } from "react";
import InformationBar from "../base/InformationBar";
import Weather from "../base/Weather";
import { useLocation } from "react-router-dom";
import { PondApi } from "../../Apis/pond.api";
import { CropApi } from "../../Apis/crop.api";
import { Crop } from "../../Model/crop";
import { Pond } from "../../Model/pond";
import CropComponent from "../base/CropComponent";

export default function Manage() {
  let location = useLocation();
  const [pond, setPond] = useState<Pond>();
  const [crops, setCrops] = useState<Crop[]>();

  useEffect(() => {
    const pondId = location.pathname.split("/")[2];
    const promise = async () => {
      await Promise.all([
        PondApi.getPondById(pondId),
        CropApi.getAllCropsByPondId(pondId),
      ]).then((data) => {
        setPond(data[0]);
        setCrops(data[1]);
      });
    };
    promise();
  }, [location.pathname]);

  return (
    <>
      <div className="left-side">
        {pond ? (
          <>
            <div className="pond__name">Pond: {pond?.name}</div>
            <CropComponent crops={crops} pondId={pond.id} />
          </>
        ) : (
          <div className="pond__name">Choose pond!</div>
        )}
      </div>
      <div className="right-side">
        <InformationBar />
        <Weather />
      </div>
    </>
  );
}
