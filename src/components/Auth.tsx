import React, { useState, useContext } from "react";

import { loginUser, signupUser } from "../util/apiReq";
import AppContext from "../store/appContext";
import User from "../models/User";
import { SnackTypes } from "../models/ISnackbar";

import classes from "./Auth.module.scss";

const Auth: React.FC = () => {
  const [mode, setMode] = useState("login");
  const [nameInput, setNameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState("");
  const appCtx = useContext(AppContext);

  const onNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };
  const onPasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordInput(event.target.value);
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (mode === "login") {
        const result = await loginUser(nameInput, passwordInput);

        appCtx.onLogin(
          new User(result.user.id, result.user.username, result.token)
        );
      } else {
        const result = await signupUser(nameInput, passwordInput);
        console.log(result);
      }
    } catch (error: any) {
      //handle error
      appCtx.setSnackbar({
        isActive: true,
        content: error.message,
        type: SnackTypes.error,
      });
    }
  };

  const onSwitchMode = () => {
    const newMode = mode === "login" ? "signup" : "login";
    setMode(newMode);
  };

  return (
    <React.Fragment>
      <h2 className={classes.title}>{mode}</h2>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes["form-control"]}>
          <input
            type="text"
            id="username"
            value={nameInput}
            onChange={onNameInputChange}
            placeholder=" "
            autoComplete="on"
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className={classes["form-control"]}>
          <input
            type="password"
            id="password"
            value={passwordInput}
            onChange={onPasswordInputChange}
            placeholder=" "
            autoComplete="on"
          />
          <label htmlFor="password">Password</label>
        </div>
        <p className={classes.switch} onClick={onSwitchMode}>
          {"Switch to"} <span>{mode === "login" ? "SIGNUP" : "LOGIN"}</span>
        </p>
        <button>{mode}</button>
      </form>
    </React.Fragment>
  );
};

export default Auth;
