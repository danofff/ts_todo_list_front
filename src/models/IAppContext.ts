import Todo from "./Todo";
import User from "./User";
import ISnackbar from "./ISnackbar";

export interface IAppContext {
  user: User | null;
  todos: Todo[] | null;
  showBucket: boolean;
  isLoading: boolean;
  snackbar: ISnackbar;
  onLogin: (user: User) => void;
  onLogout: () => void;
  addTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
  deleteTodo: (todoId: string) => void;
  setShowBucket: (isActive: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSnackbar: (snackbar: ISnackbar) => void;
}
