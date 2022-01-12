import React, { useContext, useEffect } from "react";

import AppContext from "../../store/appContext";
import { SnackTypes } from "../../models/ISnackbar";

import classes from "./Snackbar.module.scss";

const Snackbar: React.FC = () => {
  const appCtx = useContext(AppContext);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (appCtx.snackbar.isActive) {
      timer = setTimeout(() => {
        appCtx.setSnackbar({
          isActive: false,
          type: SnackTypes.default,
          content: "",
        });
      }, 6 * 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [appCtx]);

  const onCloseHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
    appCtx.setSnackbar({
      isActive: false,
      type: SnackTypes.default,
      content: "",
    });
  };

  return (
    <div
      className={`${classes.snackbar} ${
        appCtx.snackbar.isActive ? classes.active : ""
      } ${classes[appCtx.snackbar.type]}`}
    >
      <span className={classes.content}>{appCtx.snackbar.content}</span>
      <span className={classes.button} onClick={onCloseHandler}>
        &#9587;
      </span>
    </div>
  );
};

export default Snackbar;
