import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Pond } from "../../Model/pond";
import { getDiffDate } from "../../utils/common-helper";
import { useNavigate } from "react-router-dom";

export interface Props {
  pond: Pond;
  onChangeNav?: any;
}

export default function PondItem({ pond, onChangeNav }: Props) {
  const navigate = useNavigate();
  return (
    <div className="pond-item" onClick={() => navigate(`/crop/${pond.id}`)}>
      <div className="name">{pond.name}</div>
      <div className="content">Last {getDiffDate(pond.startDate)}</div>
      <div className="content">Area: {pond.area} km</div>
      <div className="content">
        Deep: {pond.deep} km<sup>2</sup>
      </div>
      <div className="link">
        Go to detail
        <FontAwesomeIcon icon={solid("chevron-right")} />
      </div>
    </div>
  );
}
