import React, { useContext } from "react";

import IButtonProps from "../../models/IButtonProps";
import AppContext from "../../store/appContext";

import classes from "./Button.module.scss";
const Button: React.FC<IButtonProps> = (props) => {
  const appCtx = useContext(AppContext);
  const onLogoutHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    appCtx.onLogout();
  };
  return (
    <button className={classes.button} onClick={onLogoutHandler}>
      {props.text}
    </button>
  );
};

export default Button;
