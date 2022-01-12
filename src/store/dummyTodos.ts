import Todo from "../models/Todo";

export const dummy_todos: Todo[] = [
  new Todo("td1", "Learn JavaScript", "u1", new Date()),
  new Todo("td2", "Learn NodeJs", "u1", new Date(), true),
  new Todo("td3", "Learn React", "u1", new Date()),
];
