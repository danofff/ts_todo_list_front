export enum SnackTypes {
  success = "success",
  error = "error",
  default = "default",
}

interface ISnackbar {
  isActive: boolean;
  type: SnackTypes;
  content: string;
}

export default ISnackbar;
