import React, { useContext, useState } from "react";

import ITodoListProps from "../models/ITodoListProps";
import Todo from "../models/Todo";
import AppContext from "../store/appContext";
import { editTodo } from "../util/apiReq";
import TodoItem from "./TodoItem";
import { SnackTypes } from "../models/ISnackbar";

import classes from "./TodoList.module.scss";

const TodoList: React.FC<ITodoListProps> = ({ isDoneTodoList }) => {
  const appCtx = useContext(AppContext);
  const [isDraggOver, setIsDraggOver] = useState(false);

  const onDragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggOver(true);
  };
  const onDragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggOver(false);
  };
  const onDropHandler = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggOver(false);
    appCtx.setShowBucket(false);
    const todo: Todo = JSON.parse(event.dataTransfer.getData("todo"));

    if (todo.isDone === isDoneTodoList) {
      return;
    }
    appCtx.setIsLoading(true);
    const sendTodo = new Todo(
      todo.id,
      todo.text,
      todo.userId,
      new Date(),
      !todo.isDone
    );

    try {
      const { todo: editedTodo } = await editTodo(sendTodo, appCtx.user);
      appCtx.editTodo(editedTodo);
    } catch (error: any) {
      console.log(error);
      appCtx.setSnackbar({
        isActive: true,
        type: SnackTypes.error,
        content: error.message,
      });
    }
    appCtx.setIsLoading(false);
  };
  return (
    <div
      className={`${classes.container} ${
        isDoneTodoList ? classes.doneTodos : classes.activeTodos
      } ${isDraggOver ? classes.active : ""}`}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDragEnd={() => {
        setIsDraggOver(false);
      }}
      onDrop={onDropHandler}
    >
      <h2>{isDoneTodoList ? "Todos Done" : "Todos Active"}</h2>
      <ul>
        {appCtx.todos
          ?.filter((todo) => todo.isDone === isDoneTodoList)
          .map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />;
          })}
      </ul>
    </div>
  );
};

export default TodoList;
