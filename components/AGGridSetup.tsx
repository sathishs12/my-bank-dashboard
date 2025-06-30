// 'use client';

// // Import AG Grid CSS files
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css"; 

// // Import and register AG Grid modules
// import { ModuleRegistry } from '@ag-grid-community/core';
// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// import { CsvExportModule } from '@ag-grid-community/csv-export';

// // This is the most reliable place to register modules.
// // It will run once when your app loads on the client.
// ModuleRegistry.registerModules([
//   ClientSideRowModelModule,
//   CsvExportModule
// ]);

// // This component doesn't render any HTML. Its only job is to import CSS
// // and register the modules above.
// const AGGridSetup = () => {
//   return null;
// };

// export default AGGridSetup;

'use client';

import { useEffect } from 'react';
import { ModuleRegistry } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import {
  ClientSideRowModelModule,
  CsvExportModule,
} from 'ag-grid-community';

import {
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  RowGroupingModule,
  SetFilterModule
} from 'ag-grid-enterprise';

const AGGridSetup = () => {
  useEffect(() => {
    ModuleRegistry.registerModules([
      ClientSideRowModelModule,
      CsvExportModule,
      MenuModule,
      ColumnsToolPanelModule,
      FiltersToolPanelModule,
      RowGroupingModule,
      SetFilterModule
    ]);
  }, []);

  return null;
};

export default AGGridSetup;
