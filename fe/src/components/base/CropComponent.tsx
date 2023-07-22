import React, { useEffect, useState } from "react";
import axios from "axios";
import CropItem from "./CropItem";
import ShrimpButton from "./ShrimpButton";
import CropDetail from "./CropDetail";
import { Crop } from "../../Model/crop";
import AddCrop from "../form/AddCrop";
import { useNavigate } from "react-router-dom";

export interface Props {
  pondId?: string;
  crops?: Crop[];
}

export default function CropComponent({ pondId, crops }: Props) {
  const navigate = useNavigate();
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [crop, setCrop] = useState<Crop>();
  return (
    <>
      {crop ? (
        <CropDetail crop={crop} />
      ) : (
        <div className="crop-container">
          <div className="title">Crop list</div>
          <ShrimpButton
            title={"add crop"}
            onClick={() => setIsOpenForm(true)}
          />
          <div className="crop-list">
            {crops &&
              crops.map((crop, id) => {
                return <CropItem key={id} crop={crop} onClick={setCrop} />;
              })}
          </div>
        </div>
      )}
      {isOpenForm && (
        <AddCrop pondId={pondId} open={isOpenForm} setOpen={setIsOpenForm} />
      )}
    </>
  );
}
