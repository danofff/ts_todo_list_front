import React, { useState, useEffect } from "react";

import { IAppContext } from "../models/IAppContext";
import Todo from "../models/Todo";
import User from "../models/User";
import { fetchTodo } from "../util/apiReq";
import ISnackbar, { SnackTypes } from "../models/ISnackbar";

const AppContext = React.createContext<IAppContext>({
  user: null,
  todos: [] as Todo[],
  showBucket: false,
  isLoading: false,
  snackbar: { isActive: false, type: SnackTypes.default, content: "" },
  onLogin: (user: User) => {},
  onLogout: () => {},
  addTodo: () => {},
  editTodo: (todo: Todo) => {},
  deleteTodo: (todoId: string) => {},
  setShowBucket: (show: boolean) => {},
  setIsLoading: (isLoading: boolean) => {},
  setSnackbar: (snackbar: ISnackbar) => {},
});

export const AppContextProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showBucket, setShowBucket] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    isActive: false,
    type: SnackTypes.default,
    content: "",
  });

  //retrive user from local storage
  useEffect(() => {
    const storedUserJSON = localStorage.getItem("user");
    if (storedUserJSON) {
      const retrivedUser = JSON.parse(storedUserJSON);
      setUser(retrivedUser);
    }
  }, []);

  //fetch todo for user
  useEffect(() => {
    async function requestTodos() {
      try {
        if (user) {
          const todos = await fetchTodo(user);
          const mappedTodos = todos.map((todo: any) => {
            return new Todo(
              todo.id,
              todo.text,
              todo.userId,
              new Date(todo.editedAt),
              todo.isDone
            );
          });
          setTodos(mappedTodos);
        }
      } catch (error: any) {
        console.log(error);
        setSnackbar({
          isActive: true,
          type: SnackTypes.error,
          content: error.message,
        });
      }
    }

    try {
      requestTodos();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const onLoginHandler = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const onLogoutHandler = () => {
    console.log("logout is working");

    localStorage.removeItem("user");
    setUser(null);
  };

  const addTodoHandler = (todo: Todo) => {
    setTodos((prevState) => {
      return [...prevState, todo];
    });
  };

  const editTodoHandler = (todo: any) => {
    setTodos((prevState) => {
      const editedTodo = new Todo(
        todo.id,
        todo.text,
        todo.userId,
        new Date(todo.editedAt),
        todo.isDone
      );
      const filteredState = prevState.filter((td) => {
        return td.id !== editedTodo.id;
      });
      return [...filteredState, editedTodo];
    });
  };

  const deleteTodoHandler = (todoId: string) => {
    setTodos((prevState) => {
      return prevState.filter((todo) => {
        return todo.id !== todoId;
      });
    });
  };

  const setIsBucketActiveHandler = (show: boolean) => {
    setShowBucket(show);
  };

  const setIsLoadingHandler = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        todos,
        showBucket,
        isLoading,
        snackbar,
        onLogin: onLoginHandler,
        onLogout: onLogoutHandler,
        addTodo: addTodoHandler,
        editTodo: editTodoHandler,
        deleteTodo: deleteTodoHandler,
        setShowBucket: setIsBucketActiveHandler,
        setIsLoading: setIsLoadingHandler,
        setSnackbar,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
