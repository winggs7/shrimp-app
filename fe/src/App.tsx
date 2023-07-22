import React, { useState, useEffect } from "react";
import HomeContainer from "./containers/HomeContainer/HomeContainer";
import "./App.scss";
import LoginContainer from "./containers/LoginContainer/LoginContainer";
import { Route, Routes } from "react-router-dom";
import Manage from "./components/pages/Manage";

export const MENU: any = {
  HOME: "HOME",
  MANAGE: "MANAGE",
  SETTING: "SETTING",
};

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      const userData: any = localStorage.getItem("user");
      setUser(JSON.parse(userData));
    }
  }, []);

  const onSetUser = (data: any) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  return (
    <Routes>
      {user !== null ? (
        <>
          <Route
            path="/"
            element={
              <HomeContainer
                user={user}
                onSetUser={onSetUser}
                navigate={MENU.HOME}
              />
            }
          />
          <Route
            path="/crop/:pondId"
            element={
              <HomeContainer
                user={user}
                onSetUser={onSetUser}
                navigate={MENU.MANAGE}
              />
            }
          />
          <Route
            path="/setting"
            element={
              <HomeContainer
                user={user}
                onSetUser={onSetUser}
                navigate={MENU.SETTING}
              />
            }
          />
        </>
      ) : (
        <Route path="/" element={<LoginContainer onSetUser={onSetUser} />} />
      )}
    </Routes>
  );
}
