import React, { useEffect, useState } from "react";
import ShrimpButton from "../base/ShrimpButton";
import moment from "moment";
import { History } from "../../Model/history";
import { CropApi } from "../../Apis/crop.api";
import { FORM } from "../../containers/HomeContainer/HomeContainer";

export interface Props extends FORM {
  cropId: string;
}

export default function ShowHistory({ cropId, open, setOpen }: Props) {
  const [histories, setHistories] = useState<History[]>();

  const stat_array = ["pH", "Temperature"];

  useEffect(() => {
    CropApi.getCropHistory(cropId).then((result) => {
      setHistories(result);
    });
  }, [cropId]);

  return (
    <div className={`form-container history ${open ? "visible" : ""}`}>
      <div className="shrimpForm">
        <div className="form__title">Histories (Danger)</div>
        <div className="form__button">
          <ShrimpButton title={"Close"} onClick={() => setOpen(false)} />
          <ShrimpButton title={"histories"} />
        </div>
        <div className="history-container">
          {histories &&
            histories.map((history: any, id: any) => {
              return (
                <div key={id} className="history-item">
                  <div className="date">
                    Date:{" "}
                    {moment(history["history_date"]).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )}
                  </div>
                  <div className="type">
                    Type: {stat_array[history["statID"] - 1]}
                  </div>
                  <div className="number">Index: {history["num_stat"]}</div>
                  <div className="desc">
                    Description: {history["description"]}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
