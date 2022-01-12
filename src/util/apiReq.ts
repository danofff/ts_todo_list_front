import User from "../models/User";
import Todo from "../models/Todo";

const apiBaseUrl =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/api";

const makeHeaders = (user?: User | null) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (user && user.token) {
    headers.Authorization = "Bearer " + user.token;
  }

  return headers;
};

export const fetchTodo = async (user: User) => {
  const result = await fetch(`${apiBaseUrl}/todos`, {
    method: "GET",
    headers: makeHeaders(user),
  });
  if (result.ok) {
    return await result.json();
  } else {
    throw new Error();
  }
};

export const postTodo = async (todoText: string, user: User | null) => {
  if (!user) {
    return;
  }
  const result = await fetch(`${apiBaseUrl}/todos`, {
    method: "POST",
    headers: makeHeaders(user),
    body: JSON.stringify({
      text: todoText,
    }),
  });
  if (result.ok) {
    return await result.json();
  } else {
    throw new Error("Unable create a TODO");
  }
};

export const editTodo = async (todo: Todo, user: User | null) => {
  const result = await fetch(`${apiBaseUrl}/todos/${todo.id}`, {
    method: "PATCH",
    headers: makeHeaders(user),
    body: JSON.stringify({
      todo,
    }),
  });
  if (result.ok) {
    return await result.json();
  } else {
    const error = await result.json();
    throw error;
  }
};

export const deleteTodo = async (todoId: string, user: User | null) => {
  const result = await fetch(`${apiBaseUrl}/todos/${todoId}`, {
    method: "DELETE",
    headers: makeHeaders(user),
  });
  if (result.ok) {
    return true;
  } else {
    const error = await result.json();
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  const result = await fetch(`${apiBaseUrl}/auth/login`, {
    method: "POST",
    headers: makeHeaders(),
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (result.ok) {
    return await result.json();
  } else {
    const error = await result.json();
    throw new Error(error.message);
  }
};
export const signupUser = async (username: string, password: string) => {
  const result = await fetch(`${apiBaseUrl}/auth/signup`, {
    method: "POST",
    headers: makeHeaders(),
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (result.ok) {
    return await result.json();
  } else {
    const error = await result.json();
    throw new Error(error.message);
  }
};
