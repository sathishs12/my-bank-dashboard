'use client';

// Import AG Grid modules
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export'; // Example: add more modules here if you need them

// This is a client component that has no UI.
// Its only purpose is to register the AG Grid modules.
const AgGridModules = () => {
  // Register the modules just once.
  ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    CsvExportModule, // We only need ClientSideRowModelModule for now, but this shows how to add more.
  ]);

  // This component renders nothing.
  return null;
};

export default AgGridModules;