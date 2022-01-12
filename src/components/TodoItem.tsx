import React, { useContext, useState } from "react";

import AppContext from "../store/appContext";
import ITodoProps from "../models/ITodoProps";

import classes from "./TodoItem.module.scss";
import draggable from "../shared/img/draggable.svg";

const TodoItem: React.FC<ITodoProps> = ({ todo }) => {
  const appCtx = useContext(AppContext);
  const [isDragged, setIsDragged] = useState(false);

  const onDragStartHandler = (event: React.DragEvent<HTMLLIElement>) => {
    appCtx.setShowBucket(true);
    setIsDragged(true);
    console.log("drag started");
    event.dataTransfer.setData("todo", JSON.stringify(todo));
  };

  const onDragEndHandler = (event: React.DragEvent<HTMLLIElement>) => {
    appCtx.setShowBucket(false);
    setIsDragged(false);
  };
  return (
    <li
      className={`${classes.item} ${isDragged ? classes.active : ""}`}
      draggable
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
    >
      <div className={classes.text}>
        <span>{todo.text}</span>
        <span className={classes.time}>
          {todo.createdDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "numeric",
            day: "numeric",
            year: "2-digit",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
      <img src={draggable} alt="draggable" draggable={false} />
    </li>
  );
};

export default TodoItem;
