export interface ButtonModel{
  disableStatus: boolean;
  label: string;
  color: string;
  type: ButtonType;
}

export enum ButtonType{
  Add,
  Update,
  Delete,
  Cacel
}
