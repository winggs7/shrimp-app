import React, { useState, useEffect } from "react";
import ShrimpButton from "../base/ShrimpButton";
import ShrimpInput from "../base/ShrimpInput";
import { FORM } from "../../containers/HomeContainer/HomeContainer";
import { PondApi } from "../../Apis/pond.api";

export interface Props extends FORM {
  id?: string;
  userName?: string;
}

export default function AddPond({ id, userName, open, setOpen }: Props) {
  const [name, setName] = useState<string>();
  const [area, setArea] = useState<number>();
  const [deep, setDeep] = useState<number>();

  const onSave = () => {
    if (name && area && deep) {
      const data = {
        userName,
        name,
        area,
        deep,
      };
      if (!id) {
        PondApi.createPond(data);
      } else {
        PondApi.updatePond({ id, ...data });
      }
    }
    setOpen(false);
  };

  return (
    <div className={`form-container ${open ? "visible" : ""}`}>
      <form className="shrimpForm">
        <div className="form__title">Add new pond</div>
        <ShrimpInput title={"Name"} require={true} onInput={setName} />
        <ShrimpInput title={"Area"} require={true} onInput={setArea} />
        <ShrimpInput title={"Deep"} require={true} onInput={setDeep} />
        <div className="form__button">
          <ShrimpButton title={"Accept"} onClick={onSave} />
          <ShrimpButton title={"Cancel"} onClick={() => setOpen(false)} />
        </div>
      </form>
    </div>
  );
}
