import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CustomTableComponent } from './app/components/custom-table/custom-table.component';
import { TableConfig, TableRow } from './app/models/table.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CustomTableComponent],
  template: `
    <div class="container">
      <h1>Hello Angular Table</h1>
      <app-custom-table
        [config]="tableConfig"
        [data]="tableData"
        [(editedData)]="tableData"
      />
    </div>
  `,
  styles: [
    `
    .container {
      padding: 2rem;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: 2rem;
    }
  `,
  ],
})
export class App {
  tableConfig: TableConfig = {
    editable: true,
    showControls: true,
    columns: [
      {
        key: 'id',
        header: 'ID',
        type: 'link',
        editable: false,
        sortable: true,
        searchable: true,
      },
      {
        key: 'name',
        header: 'Name',
        type: 'text',
        editable: true,
        sortable: true,
        searchable: true,
      },
      {
        key: 'status',
        header: 'Status',
        type: 'badge',
        sortable: true,
        searchable: true,
      },

      {
        key: 'age',
        header: 'Age',
        type: 'text',
        editable: false,
        sortable: true,
        searchable: true,
      },
      {
        key: 'pieces',
        header: 'Pieces',
        type: 'number',
        editable: true,
        sortable: true,
        searchable: true,
      },
      {
        key: 'date',
        header: 'Relasee Date',
        type: 'date',
        editable: true,
        sortable: true,
        searchable: true,
      },
    ],
  };

  tableData: TableRow[] = [
    {
      id: 10313,
      name: 'LEGO Wildflower Bouquet',
      status: 'Available',
      statusType: 'Success',
      date: '2023-02-01',
      pieces: '939',
      age: '18+',
      link: 'https://www.lego.com/en-us/product/wildflower-bouquet-10313',
    },
    {
      id: 10261,
      name: 'LEGO Creator Expert Roller Coaster',
      status: 'Retired',
      pieces: '4124',
      age: '16+',
      statusType: 'Error',
      date: '2018-05-17',
      link: 'https://www.lego.com/en-us/product/roller-coaster-10261',
    },
    {
      id: 10362,
      name: 'LEGO French Café',
      status: 'Coming Soon',
      statusType: 'Warning',
      date: '2025-03-01',
      pieces: '1101',
      age: '18+',
      link: 'https://www.lego.com/en-us/product/french-cafe-10362',
    },
  ];
}

// Add the bootstrapping call
bootstrapApplication(App).catch((err) => console.error(err));
