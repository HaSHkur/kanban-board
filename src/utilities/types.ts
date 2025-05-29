export interface Task {
  id: string;
  content: string;
  
}

export interface ColumnType {
  name: string;
  items: Task[];
}

export interface Columns {
  [key: string]: ColumnType;
}
