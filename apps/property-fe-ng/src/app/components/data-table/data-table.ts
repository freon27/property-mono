import { Component, computed, input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';

export interface ColumnConfig<T> {
  header: string;
  field: keyof T;
}

@Component({
  selector: 'app-data-table',
  imports: [AgGridAngular],
  template: `

    <ag-grid-angular

      class="ag-theme-quartz data-table"
      [rowData]="dataSource()"
      [columnDefs]="colDefs()"
    >
    </ag-grid-angular>
  `,
  styles: ``
})
export class DataTable<Data> {
  columns = input.required<ColumnConfig<Data>[]>();

  dataSource = input<Data[]>();

  colDefs = computed<ColDef[]>(() =>
    this.columns().map((config) => ({
      headerName: config.header,
      field: config.field as string,
    }))
  );
}
