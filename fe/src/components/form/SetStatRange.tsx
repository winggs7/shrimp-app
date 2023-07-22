import React, { useState, useEffect } from "react";
import ShrimpButton from "../base/ShrimpButton";
import ShrimpInput from "../base/ShrimpInput";
import ShrimpSelect from "../base/ShrimpSelect";
import { Stat } from "../../Model/stat";
import { StatApi } from "../../Apis/stat.api";

export default function SetStatRange() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [id, setId] = useState<string>();
  const [statFrom, setStatFrom] = useState<number>();
  const [statTo, setStatTo] = useState<number>();

  useEffect(() => {
    StatApi.getAllStats().then((result) => {
      setStats(result);
    });
  }, []);

  const onSave = () => {
    if (statFrom && statTo && id) {
      const data: Stat = {
        id,
        from_stat: statFrom,
        to_stat: statTo,
      };
      StatApi.updateStat(data);
    }
  };

  return (
    <div className="form-container">
      <form className="shrimpForm" action="">
        <div className="form__title">Set stat range</div>
        <ShrimpSelect onChange={setId} items={stats} />
        <ShrimpInput title={"Min stat"} require={true} onInput={setStatFrom} />
        <ShrimpInput title={"Max stat"} require={true} onInput={setStatTo} />
        <div className="form__button">
          <ShrimpButton title={"Accept"} onClick={onSave} />
          <ShrimpButton title={"cancel"} />
        </div>
      </form>
    </div>
  );
}
