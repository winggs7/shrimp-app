import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import MenuItem from "./MenuItem";
import { MENU } from "../../App";
import { useNavigate } from "react-router-dom";

export interface Props {
  onChangeNav: Function;
  menuItem: string;
  user: any;
  onLogout: Function;
}

export default function Navigation({ onChangeNav, menuItem, onLogout }: Props) {
  const navigate = useNavigate();
  return (
    <div className="navigation-container">
      <div className="logo-container">
        <div className="logo-image">
          <FontAwesomeIcon icon={solid("shrimp")} />
        </div>
      </div>
      <MenuItem
        title={"Home"}
        icon={<FontAwesomeIcon icon={solid("home")} />}
        nav={MENU.HOME}
        onClick={() => navigate("/")}
        isActive={menuItem === MENU.HOME}
      />
      <MenuItem
        title={"Manage"}
        icon={<FontAwesomeIcon icon={solid("list")} />}
        nav={MENU.MANAGE}
        onClick={() => navigate("/")}
        isActive={menuItem === MENU.MANAGE}
      />
      <MenuItem
        title={"Setting"}
        icon={<FontAwesomeIcon icon={solid("gear")} />}
        nav={MENU.SETTING}
        onClick={() => navigate("/setting")}
        isActive={menuItem === MENU.SETTING}
      />
      <button className="logout-btn" onClick={() => onLogout()}>
        Logout
      </button>
    </div>
  );
}
