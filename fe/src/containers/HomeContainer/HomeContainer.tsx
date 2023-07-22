import React, { useEffect, useState } from "react";
import Header from "../../components/base/Header";
import Navigation from "../../components/base/Navigation";
import Home from "../../components/pages/Home";
import Manage from "../../components/pages/Manage";
import Setting from "../../components/pages/Setting";
import { MENU } from "../../App";

export interface Props {
  user: any;
  onSetUser: Function;
  navigate: string;
}

export interface FORM {
  open?: any;
  setOpen?: any;
}

export default function HomeContainer({ user, onSetUser, navigate }: Props) {
  const [menuItem, setMenuItem] = useState<string>("home");

  useEffect(() => {
    setMenuItem(navigate);
  }, [navigate]);

  const onChangeNav = (nav: string, id?: string) => {
    setMenuItem(nav);
  };

  // const onDeleteValue = async (action?: string, id?: string) => {
  //   if (action === "deletePond") {
  //     try {
  //       await axios.delete("http://localhost:7000/pond/" + id);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setMenuItem("home");
  //   } else if (action === "deleteCrop") {
  //     try {
  //       await axios.delete("http://localhost:7000/crop/" + id);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setCropID("");
  //     onChangeNav(MENU.MANAGE, pondID);
  //   } else if (action === "deleteHistory") {
  //     try {
  //       await axios.delete("http://localhost:7000/crop/history/" + id);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   if (action === "cancel") {
  //     setWarning({ action: "", id: "" });
  //   }
  //   setForm("");
  // };

  // const onOpenWarningDelete = (action?: string, id?: string) => {
  //   setWarning({ action, id });
  //   setForm("delete");
  // };

  // const renderWarning = () => {
  //   if (form === FORM.DELETE) {
  //     return <WarningBox onDeleteValue={onDeleteValue} info={warning} />;
  //   } else if (form === FORM.NONE) {
  //     return "";
  //   }
  // };

  const onLogout = async () => {
    try {
      // const response = await axios.post("http://localhost:7000/user/logout", {
      //     username: user.name
      // })
      // response && onSetUser(null);
      localStorage.clear();
      onSetUser(null);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="home-container">
      <Navigation
        user={user}
        menuItem={menuItem}
        onChangeNav={onChangeNav}
        onLogout={onLogout}
      />
      <div className={`main-container`}>
        <Header user={user} />
        <div className="content-container">
          {menuItem === MENU.HOME && (
            <Home user={user} onChangeNav={onChangeNav} />
          )}
          {menuItem === MENU.MANAGE && <Manage />}
          {menuItem === MENU.SETTING && <Setting />}
        </div>
      </div>
    </div>
  );
}
