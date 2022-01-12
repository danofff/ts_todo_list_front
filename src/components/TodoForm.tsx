import React, { useState, useContext } from "react";

import Todo from "../models/Todo";
import AppContext from "../store/appContext";
import { postTodo } from "../util/apiReq";
import { SnackTypes } from "../models/ISnackbar";

import classes from "./TodoForm.module.scss";

const TodoForm: React.FC = () => {
  const [todoInput, setTodoInput] = useState<string>("");
  const appCtx = useContext(AppContext);

  const onChangeTodoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    appCtx.setIsLoading(true);
    try {
      const result = await postTodo(todoInput, appCtx.user);

      appCtx.addTodo(
        new Todo(
          result.todo.id,
          result.todo.text,
          result.todo.userId,
          new Date(result.todo.editedAt)
        )
      );
    } catch (error: any) {
      appCtx.setSnackbar({
        isActive: true,
        type: SnackTypes.error,
        content: error.message,
      });
    }
    appCtx.setIsLoading(false);
    setTodoInput("");
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <input
        type="text"
        value={todoInput}
        onChange={onChangeTodoHandler}
        placeholder="Add Todo"
      />
      <button>ADD</button>
    </form>
  );
};
export default TodoForm;
