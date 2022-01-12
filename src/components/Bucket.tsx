import React, { useContext, useState } from "react";

import AppContext from "../store/appContext";
import { deleteTodo } from "../util/apiReq";
import trash from "../shared/img/trash.svg";
import { SnackTypes } from "../models/ISnackbar";

import classes from "./Bucket.module.scss";

const Bucket: React.FC = () => {
  const appCtx = useContext(AppContext);
  const [isBucketActive, setIsBucketActive] = useState(false);

  const onDropHandler = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    appCtx.setIsLoading(true);
    appCtx.setShowBucket(false);
    setIsBucketActive(false);
    console.log("dropped");
    const { id: todoId } = JSON.parse(event.dataTransfer.getData("todo"));
    try {
      if (appCtx.user) {
        await deleteTodo(todoId, appCtx.user);
        appCtx.deleteTodo(todoId);
      }
    } catch (error: any) {
      appCtx.setSnackbar({
        isActive: true,
        type: SnackTypes.error,
        content: error.message,
      });
    }
    appCtx.setIsLoading(false);
  };

  const onDragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsBucketActive(false);
  };
  return (
    <div
      className={`${classes.container} ${isBucketActive && classes.active} ${
        appCtx.showBucket && classes.show
      }`}
      onDrop={onDropHandler}
      onDragOver={(event) => {
        event.preventDefault();
        setIsBucketActive(true);
      }}
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
    >
      <img src={trash} alt="trash" />
    </div>
  );
};

export default Bucket;
