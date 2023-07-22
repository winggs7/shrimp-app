import React, { useEffect, useState } from "react";
import PondItem from "./PondItem";
import { PondApi } from "../../Apis/pond.api";
import { Pond } from "../../Model/pond";

export interface Props {
  user: any;
  onChangeNav: Function;
  reload?: boolean;
}

export default function PondComponent({ user, onChangeNav, reload }: Props) {
  const [ponds, setPonds] = useState<Pond[]>();

  useEffect(() => {
    PondApi.getPondsByUser(user?.name).then((result) => {
      setPonds(result);
    });
  }, [reload]);

  return (
    <div className="pond-container">
      <div className="title">Pond List</div>
      <div className="pond-list">
        {ponds &&
          ponds.map((pond, id) => {
            return <PondItem key={id} pond={pond} onChangeNav={onChangeNav} />;
          })}
      </div>
    </div>
  );
}
