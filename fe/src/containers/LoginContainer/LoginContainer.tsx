import React, { useState } from "react";
import { AuthApi } from "../../Apis/auth.api";
import AlertPopup from "../../components/base/AlertPopup";
import { AlertPopupModel } from "../../Model/alert";

export interface Props {
  onSetUser: any;
}

export default function LoginContainer({ onSetUser }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [alert, setAlert] = useState<AlertPopupModel | null>();

  const onLogin = async () => {
    setAlert(null);
    await AuthApi.login(email, password)
      .then((data) => {
        onSetUser(data);
      })
      .catch((errorMessage) => {
        setAlert({
          type: "warning",
          title: errorMessage,
        });
      });
  };

  const onSignup = async () => {
    setAlert(null);
    let pattern = /^[A-Za-z0-9_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!pattern.test(email)) {
      setAlert({
        type: "warning",
        title: "Email is incorrect!",
      });
      return;
    } else if (password.length < 6) {
      setAlert({
        type: "warning",
        title: "At least 6 characters!",
      });
      return;
    }

    await AuthApi.register(email, password)
      .then((data) => {
        setEmail("");
        setPassword("");
        setIsLogin(true);
      })
      .catch((errorMessage) => {
        setAlert({
          type: "warning",
          title: errorMessage,
        });
      });
  };

  return (
    <>
      <div className="auth-container">
        {isLogin ? (
          <div className="auth-wrap">
            <div className="title">
              <h4>Login</h4>
            </div>
            <div className="content">
              <input
                type="mail"
                placeholder="email"
                value={email.toString()}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password.toString()}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="auth-btn" onClick={() => onLogin()}>
                Login
              </button>
              <button className="link-btn" onClick={() => setIsLogin(false)}>
                Create a new account!
              </button>
            </div>
          </div>
        ) : (
          <div className="auth-wrap">
            <div className="title">
              <h4>Signup</h4>
            </div>
            <div className="content">
              <input
                type="mail"
                placeholder="exp: a@gmail.com"
                value={email.toString()}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password.toString()}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="re-enter password"
                onChange={(e) => {
                  if (e.target.value !== password) {
                  }
                }}
              />
              <button className="auth-btn" onClick={() => onSignup()}>
                Signup
              </button>
              <button className="link-btn" onClick={() => setIsLogin(true)}>
                Already have account?
              </button>
            </div>
          </div>
        )}
      </div>
      {alert && <AlertPopup title={alert.title} type={alert.type} />}
    </>
  );
}
