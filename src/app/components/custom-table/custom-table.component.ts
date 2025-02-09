import { Component, computed, input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ColumnConfig,
  TableConfig,
  TableRow,
  SortState,
  TableMode,
} from '../../models/table.model';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css',
})
export class CustomTableComponent {
  // Make TableMode enum available to template
  protected TableMode = TableMode;

  // Inputs
  config = input.required<TableConfig>();
  data = input.required<TableRow[]>();

  // Two-way binding for edited data
  editedData = model<TableRow[]>();

  // Internal state
  private editState = signal<Record<string, boolean>>({});
  private sortState = signal<SortState>({ column: '', direction: null });
  private searchQuery = signal<string>('');
  protected tableMode = signal<TableMode>(TableMode.Editable);

  // Computed properties
  protected columns = computed(() => this.config().columns);
  protected isEditable = computed(
    () =>
      this.tableMode() === TableMode.Editable &&
      (this.config().editable ?? false)
  );
  protected isDisabled = computed(
    () =>
      this.tableMode() === TableMode.Disabled ||
      (this.config().disabled ?? false)
  );

  protected filteredAndSortedData = computed(() => {
    let result = [...this.data()];

    // Apply search
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      result = result.filter((row) =>
        this.columns().some(
          (col) =>
            col.searchable && String(row[col.key]).toLowerCase().includes(query)
        )
      );
    }

    // Apply sort
    const { column, direction } = this.sortState();
    if (column && direction) {
      result.sort((a, b) => {
        const aVal = String(a[column]);
        const bVal = String(b[column]);
        return direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    return result;
  });

  // Methods
  protected getCellValue(row: TableRow, column: ColumnConfig): string {
    if (!row || !column) return '';

    const value = row[column.key];
    if (value === null || value === undefined) return '';
    console.log(value, column.key);
    return value.toString();
  }

  protected isCellEditable(column: ColumnConfig): boolean {
    if (!column) return false;
    return (
      (column.editable ?? this.isEditable()) &&
      !this.isDisabled() &&
      !column.disabled
    );
  }

  protected toggleEdit(rowId: string | number, columnKey: string): void {
    if (!rowId || !columnKey || this.tableMode() !== TableMode.Editable) return;

    const key = `${rowId}-${columnKey}`;
    this.editState.update((state) => ({
      ...state,
      [key]: !state[key],
    }));

  }

  protected isEditing(rowId: string | number, columnKey: string): boolean {
    if (!rowId || !columnKey || this.tableMode() !== TableMode.Editable)
      return false;
    return this.editState()[`${rowId}-${columnKey}`] ?? false;
  }

  protected onCellValueChange(
    row: TableRow,
    column: ColumnConfig,
    value: string
  ): void {
    // if (!row || !column || this.tableMode() !== TableMode.Editable) return;

    // const updatedRow = { ...row, [column.key]: value };
    // const updatedData = this.data().map((r) =>
    //   r.id === row.id ? updatedRow : r
    // );

    // this.editedData.set(updatedData);

    if (!row || !column || this.tableMode() !== TableMode.Editable) return;

    row[column.key] = value; // Update the row data directly
  }

  protected formatDate(date: string | Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }

  protected getBadgeClass(value: string): string {
    if (!value) return 'badge';
    return `badge badge-${value.toLowerCase()}`;
  }

  protected toggleSort(column: ColumnConfig): void {
    if (!column.sortable) return;

    const currentState = this.sortState();
    let newDirection: 'asc' | 'desc' | null = 'asc';

    if (currentState.column === column.key) {
      if (currentState.direction === 'asc') newDirection = 'desc';
      else if (currentState.direction === 'desc') newDirection = null;
    }

    this.sortState.set({
      column: newDirection ? column.key : '',
      direction: newDirection,
    });
  }

  protected getSortIcon(column: ColumnConfig): string {
    if (!column.sortable) return '';

    const state = this.sortState();
    if (state.column !== column.key) return '↕️';
    return state.direction === 'asc' ? '↑' : '↓';
  }

  protected onSearch(query: string): void {
    this.searchQuery.set(query);
  }

  protected setTableMode(mode: TableMode): void {
    this.tableMode.set(mode);
    // Clear edit state when switching modes
    this.editState.set({});
  }
}
