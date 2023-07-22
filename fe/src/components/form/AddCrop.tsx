import React, { useState } from "react";
import ShrimpButton from "../base/ShrimpButton";
import ShrimpInput from "../base/ShrimpInput";
import { CropApi } from "../../Apis/crop.api";
import { FORM } from "../../containers/HomeContainer/HomeContainer";
import { useNavigate } from "react-router-dom";

export interface Props extends FORM {
  id?: string;
  pondId?: string;
}

export default function AddCrop({ id, pondId, open, setOpen }: Props) {
  const [type, setType] = useState<string>();
  const [population, setPopulation] = useState<number>();

  const onSave = () => {
    if (type && population && pondId) {
      const data = {
        pondId,
        type,
        number: population,
      };
      if (!id) {
        CropApi.createCrop(data);
      } else {
        CropApi.updateCrop({ id, ...data });
      }
      setOpen(false);
    }
  };
  return (
    <div className={`form-container ${open ? "visible" : ""}`}>
      <form className="shrimpForm" action="">
        <div className="form__title">Add new crop</div>
        <ShrimpInput title={"Type"} require={true} onInput={setType} />
        <ShrimpInput
          title={"Population"}
          require={true}
          onInput={setPopulation}
        />
        <div className="form__button">
          <ShrimpButton title={"Accept"} onClick={onSave} />
          <ShrimpButton title={"cancel"} onClick={() => setOpen(false)} />
        </div>
      </form>
    </div>
  );
}
