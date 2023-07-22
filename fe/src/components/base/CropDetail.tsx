import React, { useEffect, useState } from "react";
import axios from "axios";
import StatComponent from "./StatComponent";
import CropInfo from "./CropInfo";
import ShrimpButton from "./ShrimpButton";
import { Crop, CropStat } from "../../Model/crop";
import { CropApi } from "../../Apis/crop.api";
import { Stat } from "../../Model/stat";
import { StatApi } from "../../Apis/stat.api";
import AssignStats from "../form/AssignStats";
import ShowHistory from "../form/ShowHistory";

export interface Props {
  crop: Crop;
}

export default function CropDetail({ crop }: Props) {
  const [statIds, setStatIds] = useState<string[]>();
  const [stats, setStats] = useState<Stat[]>();
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);

  useEffect(() => {
    CropApi.getStatCrop(crop.id).then((data) => {
      if (data.length > 0) {
        setStatIds(data?.map((s) => s.statId));
      }
    });
    StatApi.getAllStats().then((data) => {
      setStats(data);
    });
  }, [crop]);

  useEffect(() => {
    CropApi.getCropHistory(crop?.id).then((data) => {
      if (data.length > 0) {
        alert(
          "Please check your histories! There are some problem with your pond!"
        );
      }
    });
  }, []);

  return (
    <>
      <CropInfo crop={crop} />
      <div className="" style={{ display: "flex" }}>
        <ShrimpButton
          title={"Assign stat"}
          onClick={() => setIsOpenForm(true)}
        />
        <ShrimpButton
          title={"View histories"}
          onClick={() => setIsOpenHistory(true)}
        />
      </div>
      {statIds &&
        statIds?.map((statId, id) => {
          return <StatComponent key={id} statId={statId} crop={crop} />;
        })}
      {isOpenForm && (
        <AssignStats
          cropId={crop.id}
          open={isOpenForm}
          setOpen={setIsOpenForm}
        />
      )}
      {isOpenHistory && (
        <ShowHistory
          cropId={crop.id}
          open={isOpenHistory}
          setOpen={setIsOpenHistory}
        />
      )}
    </>
  );
}
