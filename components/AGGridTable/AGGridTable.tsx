// 'use client';

// import React, { useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import { ColDef } from 'ag-grid-community';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// interface RowData {
//   name: string;
//   number: number;
// }

// const AGGridTable = () => {
//   const [rowData] = useState<RowData[]>([
//     { name: 'Alice', number: 123 },
//     { name: 'Bob', number: 456 },
//     { name: 'Charlie', number: 789 },
//   ]);

//   // 🛠️ Use keys of RowData as `field`
//   const [columnDefs] = useState<ColDef<RowData>[]>([
//     { headerName: 'Name', field: 'name', sortable: true, filter: true },
//     { headerName: 'Number', field: 'number', sortable: true, filter: true },
//   ]);

//   return (
//     <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
//       <AgGridReact<RowData>
//         rowData={rowData}
//         columnDefs={columnDefs}
//         pagination={true}
//         paginationPageSize={5}
//       />
//     </div>
//   );
// };

// export default AGGridTable;



'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface RowData {
  name: string;
  number: number;
}

const AGGridTable = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [rowData] = useState<RowData[]>([
    { name: 'Innovate Inc.', number: 10 },
    { name: 'Quantum Solutions', number: 8 },
    { name: 'Nexa Technologies', number: 15 },
    { name: 'Pioneer Corp.', number: 5 },
    { name: 'Vertex Systems', number: 12 },
    { name: 'Zenith Dynamics', number: 18 },
    { name: 'Apex Innovations', number: 7 },
    { name: 'Omega Enterprises', number: 6 },
    { name: 'Nova Labs', number: 11 },
    { name: 'Stellar Global', number: 9 },
  ]);

  const filteredData = useMemo(() => {
    return rowData.filter(row =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rowData, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

  const columnDefs: ColDef<RowData>[] = [
    {
      headerName: 'Company Name',
      field: 'name',
      flex: 1,
      cellRenderer: (params:any) => (
        <span
          onClick={() => router.push(`/dashboard?company=${encodeURIComponent(params.value)}`)}
          className="text-indigo-600 font-medium cursor-pointer hover:underline"
        >
          {params.value}
        </span>
      ),
    },
    {
      headerName: 'Account Count',
      field: 'number',
      flex: 1,
      cellClass: 'text-right font-semibold text-gray-800',
    },
  ];

  return (
    <div className="flex flex-col h-[500px] shadow-md sm:rounded-lg bg-white">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Company Overview</h1>
        <div className="relative w-full md:w-1/3">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a company..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
          />
        </div>
      </div>

      {/* AG Grid Table */}
      <div className="ag-theme-alpine h-full overflow-auto">
        <AgGridReact<RowData>
          rowData={paginatedData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          headerHeight={40}
          rowHeight={50}
          suppressPaginationPanel
        />
      </div>

      {/* Footer with Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t gap-4">
        <strong className="text-sm text-gray-700">
          Showing {paginatedData.length > 0 ? startIdx + 1 : 0} to {Math.min(startIdx + itemsPerPage, filteredData.length)} of {filteredData.length} companies
        </strong>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-900">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AGGridTable;
