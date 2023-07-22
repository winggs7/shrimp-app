import React, { useState } from "react";
import PondComponent from "../base/PondComponent";
import InformationBar from "../base/InformationBar";
import ShrimpButton from "../base/ShrimpButton";
import Weather from "../base/Weather";
import AddPond from "../form/AddPond";

export interface Props {
  user: any;
  onChangeNav: Function;
}

export default function Home({ onChangeNav, user }: Props) {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  return (
    <>
      <div className="left-side">
        <ShrimpButton title={"Add pond"} onClick={() => setIsOpenForm(true)} />
        <PondComponent
          onChangeNav={onChangeNav}
          user={user}
          reload={isOpenForm}
        />
      </div>
      <div className="right-side">
        <InformationBar user={user} />
        <Weather />
      </div>
      {isOpenForm && (
        <AddPond
          userName={user?.name}
          open={isOpenForm}
          setOpen={setIsOpenForm}
        />
      )}
    </>
  );
}
