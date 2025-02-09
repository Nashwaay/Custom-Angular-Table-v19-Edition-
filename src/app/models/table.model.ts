export type CellType = 'text' | 'badge' | 'date' | 'input' | 'link' | 'number';

export enum TableMode {
  ReadOnly = 'readonly',
  Editable = 'editable',
  Disabled = 'disabled',
}

export interface ColumnConfig {
  key: string;
  header: string;
  type: CellType;
  editable?: boolean;
  disabled?: boolean;
  width?: string;
  format?: (value: any) => string;
  sortable?: boolean;
  searchable?: boolean;
}

export interface TableConfig {
  columns: ColumnConfig[];
  editable?: boolean;
  disabled?: boolean;
  showControls?: boolean;
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

export interface SortState {
  column: string;
  direction: 'asc' | 'desc' | null;
}
