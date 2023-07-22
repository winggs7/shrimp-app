import React, { useState, useEffect } from "react";
import ShrimpButton from "../base/ShrimpButton";
import ShrimpCheckbox from "../base/ShrimpCheckbox";
import { Stat } from "../../Model/stat";
import { StatApi } from "../../Apis/stat.api";
import { CropApi } from "../../Apis/crop.api";
import { FORM } from "../../containers/HomeContainer/HomeContainer";
import { CropStat } from "../../Model/crop";

export interface Props extends FORM {
  cropId: string;
}

export default function AssignStats({ cropId, open, setOpen }: Props) {
  const [stats, setStats] = useState<Stat[]>();
  const [statIds, setStatIds] = useState<string[]>([]);

  useEffect(() => {
    StatApi.getAllStats().then((result) => {
      setStats(result);
    });
    CropApi.getStatCrop(cropId).then((result) => {
      setStatIds(result.map((r) => r.statId));
    });
  }, []);

  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (statIds?.includes(value)) {
      setStatIds(statIds.filter((sc) => sc !== value));
    } else {
      setStatIds([...statIds, value]);
    }
  };

  const onSave = () => {
    if (statIds.length > 0) {
      CropApi.createStatCrop({
        id: cropId,
        statIds: statIds.toString(),
      });
    }
    setOpen(false);
  };

  return (
    <div className={`form-container ${open ? "visible" : ""}`}>
      <form className="shrimpForm" action="">
        <div className="form__title">Assign stats</div>
        <ShrimpCheckbox
          items={stats}
          checkedItems={statIds}
          onChange={onChangeCheckBox}
        />
        <div className="form__button">
          <ShrimpButton title={"Accept"} onClick={onSave} />
          <ShrimpButton title={"cancel"} onClick={() => setOpen(false)} />
        </div>
      </form>
    </div>
  );
}
