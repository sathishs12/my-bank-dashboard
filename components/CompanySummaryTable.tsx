// //table-design in tw 
// 'use client';

// import { IAccount } from "@/types";
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { useState } from 'react'; // Ensure useState is imported
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// interface CompanySummary {
//   name: string;
//   count: number;
// }

// // Function to assign a company name based on the account ID
// const getCompanyName = (id: string): string => {
//   const numericId = parseInt(id, 10);
//   if (numericId <= 10) return "Innovate Inc.";
//   if (numericId <= 20) return "Quantum Solutions";
//   if (numericId <= 30) return "Nexa Technologies";
//   if (numericId <= 40) return "Pioneer Corp.";
//   if (numericId <= 50) return "Vertex Systems";
//   if (numericId <= 60) return "Zenith Dynamics";
//   if (numericId <= 70) return "Apex Innovations";
//   if (numericId <= 80) return "Omega Enterprises";
//   if (numericId <= 90) return "Nova Labs";
//   if (numericId <= 100) return "Stellar Global";
//   return "Unknown Company";
// };

// const CompanySummaryTable = ({ accounts }: { accounts: IAccount[] }) => {
//   const router = useRouter();
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [searchTerm, setSearchTerm] = useState('');

//   // Group accounts by company and count them
//   const companyData: Record<string, number> = {};
//   for (const account of accounts) {
//     const companyName = getCompanyName(account.id);
//     if (companyData[companyName]) {
//       companyData[companyName]++;
//     } else {
//       companyData[companyName] = 1;
//     }
//   }

//   const summaryList: CompanySummary[] = Object.keys(companyData).map(name => ({
//     name,
//     count: companyData[name],
//   }));

//   // Filter the list based on the search term
//   const filteredList = summaryList.filter(company => 
//     company.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Apply pagination to the filtered list
//   const totalRecords = filteredList.length;
//   const totalPages = Math.ceil(totalRecords / itemsPerPage);
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const paginatedList = filteredList.slice(startIdx, startIdx + itemsPerPage);

//   const handleCompanyClick = (companyName: string) => {
//     router.push(`/dashboard?company=${encodeURIComponent(companyName)}`);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to page 1 on search
//   };

//   const rowVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
//     }),
//   };

//   return (
//     // --- UPDATED: Height is now larger to accommodate pagination ---
//     <div className="flex flex-col h-[500px] shadow-md sm:rounded-lg bg-white">
//       {/* --- UPDATED: Header section with search bar --- */}
//       <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b gap-4">
//         <h1 className="text-xl md:text-2xl font-bold text-gray-800">Company Overview</h1>
//         <div className="relative w-full md:w-1/3">
//           <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search for a company..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
//           />
//         </div>
//       </div>
      
//       <div className="flex-grow overflow-auto">
//         <table className="w-full text-left text-gray-500">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
//             <tr>
//               <th style={{ width: '60%' }} scope="col" className="py-3 px-6">Company Name</th>
//               <th style={{ width: '40%' }} scope="col" className="py-3 px-6 text-right">Account Count</th>
//             </tr>
//           </thead>
//           <AnimatePresence>
//             <motion.tbody>
//               {paginatedList.length > 0 ? (
//                 paginatedList.map((company, index) => (
//                   <motion.tr
//                     key={company.name}
//                     custom={index}
//                     variants={rowVariants}
//                     initial="hidden"
//                     animate="visible"
//                     onClick={() => handleCompanyClick(company.name)}
//                     className="bg-white border-b hover:bg-gray-50 cursor-pointer"
//                   >
//                     <td style={{ width: '60%' }} className="py-4 px-6 font-medium text-indigo-600">{company.name}</td>
//                     <td style={{ width: '40%' }} className="py-4 px-6 font-semibold text-gray-800 text-right">{company.count}</td>
//                   </motion.tr>
//                 ))
//               ) : (
//                 <tr><td colSpan={2} className="py-6 px-6 text-center text-gray-500">No companies found.</td></tr>
//               )}
//             </motion.tbody>
//           </AnimatePresence>
//         </table>
//       </div>
       
//        {/* --- UPDATED: Footer section with pagination controls --- */}
//        <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t gap-4">
//         <strong className="text-sm text-gray-700">
//           Showing {paginatedList.length > 0 ? startIdx + 1 : 0} to {Math.min(startIdx + itemsPerPage, totalRecords)} of {totalRecords} companies
//         </strong>
//         <div className="flex items-center gap-2">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>
//           <span className="text-sm font-medium text-gray-900">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             disabled={currentPage === totalPages || totalPages === 0}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanySummaryTable;




'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CompanyAnalyticsPopup from './CompanyAnalyticsPopup';
import { span } from 'framer-motion/client';

interface ApiAccountData {
  id: string;
  companyName: string;
  name: string;
  accountNo: string;
  currentBalance: number;
  status: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface RowData {
  name: string;
  number: number;
}

const CompanySummaryTable = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [accountData, setAccountData] = useState<ApiAccountData[]>([]);
  const [rowData, setRowData] = useState<RowData[]>([]);
const [selectedCompany, setSelectedCompany] = useState<{ name: string; count: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://684fa5d6e7c42cfd17955990.mockapi.io/api/account-details/accountDetails'
        );
        const data: ApiAccountData[] = await response.json();

        setAccountData(data);

        const companyCounts: Record<string, number> = {};

        data.forEach((account) => {
          companyCounts[account.companyName] = (companyCounts[account.companyName] || 0) + 1;
        });

        const groupedData: RowData[] = Object.entries(companyCounts).map(([name, number]) => ({
          name,
          number,
        }));

        setRowData(groupedData);
      } catch (error) {
        console.error('Failed to fetch account data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return rowData.filter((row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rowData, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

const columnDefs: ColDef<RowData>[] = [
{
  headerName: 'S.NO',
  minWidth: 70,
  maxWidth: 100,
  valueGetter: (params: any) => {
    const pageOffset = (currentPage - 1) * itemsPerPage;
    return pageOffset + (params.node?.rowIndex ?? 0) + 1;
  },
  cellRenderer: (params: any) => (
    <span className="font-bold text-sm text-center block" style={{ color: "#02343F" }}>
      {params.value}
    </span>
  ),
},
{
  headerName: 'Company Name',
  field: 'name',
  minWidth: 400,
  flex: 2,
  headerClass: 'custom-header-class',
  cellRenderer: (params: any) => {
    const [hover, setHover] = useState(false);

    return (
      <span
        onClick={() =>
          router.push(`/dashboard?company=${encodeURIComponent(params.value)}`)
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
              backgroundColor: hover ? '#02343F' : '',
             color: hover ? '#F0EDCC' : '#02343F'
            //  backgroundColor: hover ? '#02343F' : '#F0EDCC',
            //  color: hover ? '#F0EDCC' : '#02343F'
         }}
        className="inline-block px-3 py-1 rounded-full font-semibold cursor-pointer transition-all duration-200 "
      >
        {params.value}
      </span>
    );
  },
}
,
{
  headerName: 'Account Count',
  field: 'number',
  minWidth: 150,
  flex: 2,
  cellRenderer: (params: any) => {
    const [hover, setHover] = React.useState(false);

    return (
      <div
        onClick={() =>
          setSelectedCompany({ name: params.data.name, count: params.value })
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
              backgroundColor: hover ? '#02343F' : '',
             color: hover ? '#F0EDCC' : '#02343F'
        //   backgroundColor: hover ? '#02343F' : '#F0EDCC',
        //   color: hover ? '#F0EDCC' : '#02343F',
        }}
        className="inline-flex font-semibold items-center justify-center w-10 h-10 rounded-full font-semibold cursor-pointer transition-colors duration-200 "
      >
        {params.value}
      </div>
    );
  },
  cellClass: 'justify-center',
}

];


  return (
    <div className="flex flex-col h-[450px] shadow-md sm:rounded-lg bg-white">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b gap-4"  style={{ color: '#02343F'}}>
        <h1 className="text-xl md:text-3xl font-bold text-gray-800" style={{color:"#02343F"}}>Company Overview</h1>
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
          Showing {paginatedData.length > 0 ? startIdx + 1 : 0} to{' '}
          {Math.min(startIdx + itemsPerPage, filteredData.length)} of {filteredData.length} companies
        </strong>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
      className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 disabled:bg-gray-300"
    >
      Previous
    </button>

    <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
      Page {currentPage} of {totalPages}
    </span>

    <button
      disabled={currentPage === totalPages || totalPages === 0}
      onClick={() => setCurrentPage((prev) => prev + 1)}
      className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 disabled:bg-gray-300"
    >
      Next
    </button>
  </div>
      </div>
{selectedCompany && (
  <CompanyAnalyticsPopup
    companyName={selectedCompany.name}
    accountCount={selectedCompany.count}
    onClose={() => setSelectedCompany(null)}
  />
)}


    </div>
  );
};

export default CompanySummaryTable;




// 'use client';

// import React, { useState, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { AgGridReact } from 'ag-grid-react';
// import { ColDef } from 'ag-grid-community';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// interface RowData {
//   name: string;
//   number: number;
// }

// const CompanySummaryTable = () => {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const [rowData] = useState<RowData[]>([
//     { name: 'Innovate Inc.', number: 10 },
//     { name: 'Quantum Solutions', number: 10 },
//     { name: 'Nexa Technologies', number: 2 },
//     { name: 'Pioneer Corp.', number: 0 },
//     { name: 'Vertex Systems', number: 12 },
//     // { name: 'Zenith Dynamics', number: 18 },
//     // { name: 'Apex Innovations', number: 7 },
//     // { name: 'Omega Enterprises', number: 6 },
//     // { name: 'Nova Labs', number: 11 },
//     // { name: 'Stellar Global', number: 9 },
//   ]);

//   const filteredData = useMemo(() => {
//     return rowData.filter(row =>
//       row.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [rowData, searchTerm]);

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

//   const columnDefs: ColDef<RowData>[] = [
//     {
//       headerName: 'Company Name',
//       field: 'name',
//       flex: 1,
//       cellRenderer: (params:any) => (
//         <span
//           onClick={() => router.push(`/dashboard?company=${encodeURIComponent(params.value)}`)}
//           className="text-indigo-600 font-medium cursor-pointer hover:underline"
//         >
//           {params.value}
//         </span>
//       ),
//     },
//     {
//       headerName: 'Account Count',
//       field: 'number',
//       flex: 1,
//       cellClass: 'text-right font-semibold text-gray-800',
//     },
//   ];

//   return (
//     <div className="flex flex-col h-[440px] shadow-md sm:rounded-lg bg-white">
//       {/* Header with Search */}
//       <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b gap-4">
//         <h1 className="text-xl md:text-2xl font-bold text-gray-800">Company Overview</h1>
//         <div className="relative w-full md:w-1/3">
//           <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search for a company..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
//           />
//         </div>
//       </div>

//       {/* AG Grid Table */}
//       <div className="ag-theme-alpine h-full overflow-auto">
//         <AgGridReact<RowData>
//           rowData={paginatedData}
//           columnDefs={columnDefs}
//           domLayout="autoHeight"
//           headerHeight={40}
//           rowHeight={50}
//           suppressPaginationPanel
//         />
//       </div>

//       {/* Footer with Pagination */}
//       <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t gap-4">
//         <strong className="text-sm text-gray-700">
//           Showing {paginatedData.length > 0 ? startIdx + 1 : 0} to {Math.min(startIdx + itemsPerPage, filteredData.length)} of {filteredData.length} companies
//         </strong>
//         <div className="flex items-center gap-2">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>
//           <span className="text-sm font-medium text-gray-900">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             disabled={currentPage === totalPages || totalPages === 0}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanySummaryTable;


// each company different color company name and number
// const colorPalette = [
//   { bg: 'bg-red-100', text: 'text-red-800', gradient: 'from-red-400 to-red-600' },
//   { bg: 'bg-green-100', text: 'text-green-800', gradient: 'from-green-400 to-green-600' },
//   { bg: 'bg-blue-100', text: 'text-blue-800', gradient: 'from-blue-400 to-blue-600' },
//   { bg: 'bg-yellow-100', text: 'text-yellow-800', gradient: 'from-yellow-400 to-yellow-600' },
//   { bg: 'bg-purple-100', text: 'text-purple-800', gradient: 'from-purple-400 to-purple-600' },
//   { bg: 'bg-pink-100', text: 'text-pink-800', gradient: 'from-pink-400 to-pink-600' },
//   { bg: 'bg-indigo-100', text: 'text-indigo-800', gradient: 'from-indigo-400 to-indigo-600' },
// ];


// const getCompanyColor = (companyName: string) => {
//   const hash = Array.from(companyName).reduce((acc, char) => acc + char.charCodeAt(0), 0);
//   return colorPalette[hash % colorPalette.length];
// };


// const columnDefs: ColDef<RowData>[] = [
//   {
//     headerName: 'Company Name',
//     field: 'name',
//     flex: 2,
//     cellRenderer: (params: any) => {
//       const color = getCompanyColor(params.value);
//       return (
//         <span
//           onClick={() =>
//             router.push(`/dashboard?company=${encodeURIComponent(params.value)}`)
//           }
//           className={`inline-block px-3 py-1 rounded-full text-white bg-gradient-to-r ${color.gradient} hover:brightness-110 cursor-pointer transition-all duration-200 shadow-sm text-sm sm:text-base`}
//         >
//           {params.value}
//         </span>
//       );
//     },
//   },
//   {
//     headerName: 'Account Count',
//     field: 'number',
//     flex: 1,
//     cellRenderer: (params: any) => {
//       const color = getCompanyColor(params.data.name); // use name for consistent coloring
//       return (
//         <div
//           className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full ${color.bg} ${color.text} font-semibold shadow-sm text-sm sm:text-base`}
//         >
//           {params.value}
//         </div>
//       );
//     },
//     cellClass: 'justify-center',
//   },
// ];
