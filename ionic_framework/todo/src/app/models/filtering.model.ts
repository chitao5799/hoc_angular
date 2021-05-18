export interface FilterStatus{
  type: Filter;
  label: string;
}

export enum Filter{
  NotStart,
  Inprogress,
  Completed,
}
