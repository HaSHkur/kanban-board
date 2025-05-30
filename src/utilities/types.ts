export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string; 
  status: Status;
}

export interface ColumnType {
  name: string;
  items: Task[];
}

export interface Columns {
  [key: string]: ColumnType;
}

export type Status = "new" | "ongoing" | "done";
