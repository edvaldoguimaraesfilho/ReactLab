export type DialogType =
  | "success"
  | "warning"
  | "delete";

export interface DialogState {
  open: boolean;
  type: DialogType;
  title: string;
  message: string;
}