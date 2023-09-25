import React, { useEffect, useState } from "react";
import StatComponent from "./StatComponent";
import CropInfo from "./CropInfo";
import ShrimpButton from "./ShrimpButton";
import { Crop } from "../../Model/crop";
import { CropApi } from "../../Apis/crop.api";
import { Stat } from "../../Model/stat";
import { StatApi } from "../../Apis/stat.api";
import AssignStats from "../form/AssignStats";
import ShowHistory from "../form/ShowHistory";
import WarningBox from "./WarningBox";
import { useNavigate } from "react-router-dom";
import { AlertPopupModel } from "../../Model/alert";
import AlertPopup from "./AlertPopup";
import { useWeather } from "../../contexts/weather-context";

export interface Props {
  crop: Crop;
  pondId: string;
  setCrop: any;
}

export default function CropDetail({ crop, pondId, setCrop }: Props) {
  const navigate = useNavigate();

  const { predictWeather, currentWeather } = useWeather();

  const [statIds, setStatIds] = useState<string[]>();
  const [stats, setStats] = useState<Stat[]>();
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertPopupModel | null>();

  useEffect(() => {
    if (!isOpenForm) {
      setStatCrop();
    }
  }, [isOpenForm]);

  useEffect(() => {
    setStatCrop();
    StatApi.getAllStats().then((data) => {
      setStats(data);
    });
  }, [crop]);

  useEffect(() => {
    CropApi.getCropHistory(crop?.id).then((data) => {
      if (data.length > 0) {
        setAlert({
          type: "danger",
          title:
            "Please check your histories! There are some problem with your crop!",
        });
      }
    });
  }, []);

  const setStatCrop = () => {
    CropApi.getStatCrop(crop.id).then((data) => {
      if (data.length > 0) {
        const datas = data?.filter((s) => s.isActive === 1);
        setStatIds(datas.map((d) => d.statId));
      }
    });
  };

  const openWarning = () => {
    return (
      <WarningBox
        isOpen={warning}
        onClick={() => onDeleteCrop()}
        onCancel={() => setWarning(false)}
      />
    );
  };

  const onDeleteCrop = async () => {
    if (crop) {
      await CropApi.deleteCrop(crop?.id)
        .then(() => {
          setCrop(null);
          navigate("/crop/" + pondId);
        })
        .catch((errorMessage) => {
          setAlert({
            type: "danger",
            title: errorMessage,
          });
        });
    }
  };

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
        <ShrimpButton
          title={"Delete crop"}
          type="error"
          onClick={() => setWarning(true)}
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
      {openWarning()}
      {alert && <AlertPopup title={alert.title} type={alert.type} />}
    </>
  );
}
