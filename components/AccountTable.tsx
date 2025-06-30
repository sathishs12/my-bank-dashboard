
// //table-design in tw 
// 'use client'; 

// import React, { useState } from "react";
// import { useRouter } from 'next/navigation';
// import { IAccount } from "@/types";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import * as XLSX from 'xlsx';
// // --- NEW: Import the back button icon ---
// import { ArrowDownTrayIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

// // --- NEW: Add companyName to the props ---
// interface AccountTableProps {
//   accounts: IAccount[];
//   companyName: string; // The name of the company being viewed
// }

// const AccountTable = ({ accounts, companyName }: AccountTableProps) => {
//   const router = useRouter(); 
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [sortColumn, setSortColumn] = useState<string>("");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
//   const [selectedStatus, setSelectedStatus] = useState<IAccount['status'] | ''>('');

//   const downloadExcel = (data: IAccount[], filename: string) => {
//     const dataToExport = data.map(({ avatar, ...rest }) => rest);
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Accounts");
//     XLSX.writeFile(workbook, filename);
//   };

//   // Your filtering logic remains the same
//   let filtered = accounts;
//   if (selectedDate) {
//     filtered = filtered.filter((item) => new Date(item.updatedAt).toLocaleDateString("en-US") === new Date(selectedDate).toLocaleDateString("en-US"));
//   }
//   if (selectedStatus) {
//     filtered = filtered.filter((item) => item.status === selectedStatus);
//   }

//   // Your sorting logic remains the same
//   if (sortColumn) {
//     filtered = [...filtered].sort((a, b) => {
//       let comparison = 0;
//       if (sortColumn === "name") {
//         comparison = a.name.localeCompare(b.name);
//       } else if (sortColumn === "currentBalance") {
//         comparison = a.currentBalance - b.currentBalance;
//       }
//       return sortDirection === "asc" ? comparison : -comparison;
//     });
//   }

//   const totalRecords = filtered.length;
//   const totalPages = Math.ceil(totalRecords / itemsPerPage);
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

//   const getStatusClasses = (status: IAccount['status']) => {
//     switch (status) {
//       case "active": return "bg-green-100 text-green-800";
//       case "inactive": return "bg-yellow-100 text-yellow-800";
//       case "closed": return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };
//   const handleSort = (column: string) => {
//     if (sortColumn === column) {
//       setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortColumn(column);
//       setSortDirection("asc");
//       setCurrentPage(1);
//     }
//   };
  
//   const rowVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" },
//     }),
//     exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
//   };

//   return (
//     <div className="flex flex-col h-[530px] shadow-md sm:rounded-lg bg-white"> 
//       {/* --- UPDATED: Header section with Back button and dynamic title --- */}
//       <div className="flex items-center justify-between p-4 border-b">
//         <div className="flex items-center gap-4">
//           {/* <button
//             onClick={() => router.push('/dashboard')}
//             className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 font-semibold"
//             title="Back to Company Overview"
//           >
//             <ArrowUturnLeftIcon className="h-5 w-5" />
//             Back
//           </button> */}
//           <h1 className="text-xl md:text-2xl font-bold text-gray-800">
//             {companyName} Dashboard
//           </h1>
//         </div>
//         <div className="flex items-center gap-4">
//           <select id="filter-status" value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value as IAccount['status'] | ''); setCurrentPage(1); }} className="border px-2 py-1.5 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900">
//             <option value="">All Statuses</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//             <option value="closed">Closed</option>
//           </select>
//           <input id="filter-date" type="date" value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1); }} className={`border px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${selectedDate ? "text-gray-900" : "text-gray-500"}`}/>
//           <button disabled={!selectedDate && !selectedStatus} onClick={() => { setSelectedDate(''); setSelectedStatus(''); setCurrentPage(1); }} className="px-4 py-1.5 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed bg-red-500 text-white hover:bg-red-600">Clear</button>
//           <button
//             onClick={() => downloadExcel(filtered, `${companyName.replace(/\s+/g, '_')}_accounts.xlsx`)}
//             className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300"
//             disabled={filtered.length === 0}
//           >
//             <ArrowDownTrayIcon className="h-5 w-5" />
//             Export
//           </button>
//         </div>
//       </div>
      
//       {/* The rest of the component (table, pagination) remains the same */}
//       <div className="flex-grow overflow-auto">
//         <table className="w-full text-sm text-left text-gray-500">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
//             <tr>
//               {/* --- UPDATED: S.NO calculation --- */}
//               <th style={{ width: '10%' }} scope="col" className="py-3 px-6">S.NO</th>
//               <th style={{ width: '25%' }} scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("name")}>Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}</th>
//               <th style={{ width: '20%' }} scope="col" className="py-3 px-6">Account No</th>
//               <th style={{ width: '15%' }} scope="col" className="py-3 px-6 text-right cursor-pointer" onClick={() => handleSort("currentBalance")}>Balance {sortColumn === "currentBalance" && (sortDirection === "asc" ? "↑" : "↓")}</th>
//               <th style={{ width: '15%' }} scope="col" className="py-3 px-6 text-center">Status</th>
//               <th style={{ width: '15%' }} scope="col" className="py-3 px-6">Last Updated</th>
//               <th style={{ width: '10%' }} scope="col" className="py-3 px-6 text-center">Actions</th>
//             </tr>
//           </thead>
//           <AnimatePresence>
//             <motion.tbody>
//               {paginated.length > 0 ? (
//                 paginated.map((account, index) => (
//                   <motion.tr
//                     key={account.id}
//                     custom={index}
//                     variants={rowVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     onClick={() => router.push(`/dashboard/accounts/${account.id}`)}
//                     className="bg-white border-b hover:bg-gray-50 cursor-pointer"
//                   >
//                     {/* --- UPDATED: S.NO calculation --- */}
//                     <td style={{ width: '10%' }} className="py-4 px-6">{startIdx + index + 1}</td>
//                     <td style={{ width: '25%' }} className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{account.name}</td>
//                     <td style={{ width: '20%' }} className="py-4 px-6">{account.accountNo}</td>
//                     <td style={{ width: '15%' }} className="py-4 px-6 text-right font-mono">₹{Number(account.currentBalance).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
//                     <td style={{ width: '15%' }} className="py-4 px-6 text-center"><span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(account.status)}`}>{account.status}</span></td>
//                     <td style={{ width: '15%' }} className="py-4 px-6">{new Date(account.updatedAt).toLocaleDateString()}</td>
//                     <td style={{ width: '10%' }} className="py-4 px-6 text-center">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           downloadExcel([account], `account_${account.accountNo}.xlsx`);
//                         }}
//                         className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
//                         title="Download as Excel"
//                       >
//                         <ArrowDownTrayIcon className="h-5 w-5" />
//                       </button>
//                     </td>
//                   </motion.tr>
//                 ))
//               ) : (
//                 <tr><td colSpan={7} className="py-6 px-6 text-center text-gray-500">No matching accounts found.</td></tr>
//               )}
//             </motion.tbody>
//           </AnimatePresence>
//         </table>
//       </div>

//       <div className="flex justify-between items-center p-4 border-t">
//         <strong className="text-sm text-gray-700">Showing {paginated.length} of {totalRecords} records</strong>
//          <button
//             onClick={() => router.push('/dashboard')}
//             className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 font-semibold"
//             title="Back to Company Overview"
//           >
//             <ArrowUturnLeftIcon className="h-5 w-5" />
//             Back
//           </button>
//         <div className="flex items-center gap-4">
//           <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">Previous</button>
//           <span className="text-sm font-medium text-gray-900">Page {currentPage} of {totalPages}</span>
//           <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage((prev) => prev + 1)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountTable;






'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { IAccount } from '@/types';
import * as XLSX from 'xlsx';
import { ArrowDownTrayIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import StatusCell from './grid-cells/StatusCell';
import ActionsCell from './grid-cells/ActionsCell';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import TransactionPopup from './TransactionPopup';


interface AccountTableProps {
  accounts: IAccount[];
  companyName: string;
}


const AccountTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyName = searchParams.get('company') ?? '';

  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<IAccount['status'] | ''>('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [hover, setHover] = useState(false); 
  const [selectedAccountNo, setSelectedAccountNo] = useState<string | null>(null);
// const [selectedAccount, setSelectedAccount] = useState<{ no: string; status: IAccount['status'] } | null>(null);
const [showPopup, setShowPopup] = useState(false);
const [selectedAccount, setSelectedAccount] = useState<{
  accountNo: string;
  status: 'active' | 'InActive' | 'closed';
  currentBalance: number;
} | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://684fa5d6e7c42cfd17955990.mockapi.io/api/account-details/accountDetails');
        const data = await response.json();
        setAccounts(data);
      } catch (err) {
        console.error('Error fetching account data:', err);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return accounts
      .filter((a) => a.companyName === companyName)
      .filter((a) =>
        a.name.toLowerCase().includes(searchText.toLowerCase())
      )
      .filter((a) =>
        selectedStatus ? a.status === selectedStatus : true
      )
      .filter((a) =>
        selectedDate
          ? new Date(a.updatedAt).toLocaleDateString('en-US') ===
            new Date(selectedDate).toLocaleDateString('en-US')
          : true
      );
  }, [accounts, companyName, selectedDate, selectedStatus, searchText]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

  const downloadExcel = (data: IAccount[], filename: string) => {
    const dataToExport = data.map(({ avatar, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Accounts');
    XLSX.writeFile(workbook, filename);
  };

const columns: ColDef<IAccount>[] = [
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
  headerName: 'Name',
  field: 'name',
  sortable: true,
  minWidth: 150,
  flex: 2,
  cellRenderer: (params: any) => (
    <span className="font-semibold text-sm sm:text-base bg-clip-text text-transparent" 
    style={{color:"#02343F"}}>
      {params.value}
    </span>
  ),
}
,
// {
//   headerName: 'Account No',
//   field: 'accountNo',
//   minWidth: 130,
//   flex: 1,
//   cellRenderer: (params: any) => (
//     <span className="inline-block px-2 py-1 rounded bg-gray-100 text-gray-900 font-semibold text-xs sm:text-sm">
//       {params.value || '-'}
//     </span>
//   ),
// },
{
  headerName: 'Account No',
  field: 'accountNo',
  minWidth: 130,
  flex: 1,
  cellRenderer: (params: any) => {
    const [hover, setHover] = React.useState(false);

    return (
      <span
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
         style={{
           backgroundColor: hover ? '#02343F' : '',
             color: hover ? '#F0EDCC' : '#02343F'
          // backgroundColor: hover ? '#02343F' : '#F0EDCC',
          // color: hover ? '#F0EDCC' : '#02343F',
        }}
        className="inline-block px-2 py-1 rounded font-semibold text-xs sm:text-sm cursor-pointer transition-colors duration-200"
        onClick={() => {
          setSelectedAccount({
            accountNo: params.value,
            status: params.data.status,
            currentBalance: params.data.currentBalance,
          });
          setShowPopup(true);
        }}
      >
        {params.value || '-'}
      </span>
    );
  },
},

  {
    headerName: 'Balance',
    field: 'currentBalance',
    sortable: true,
    minWidth: 120,
    flex: 1,
    valueFormatter: ({ value }) => `₹${Number(value).toLocaleString('en-IN')}`,
    cellRenderer: (params: any) => (
      <span className="text-green-700 font-mono font-semibold text-right block"
      style={{color:"#02343F"}}>
        ₹ {params.value}
      </span>
    ),
  },
  {
    headerName: 'Status',
    field: 'status',
    cellRenderer: StatusCell, // Assume this already returns styled content
    minWidth: 100,
    maxWidth: 120,
    cellClass: 'flex justify-center items-center',
  },
{
  headerName: 'Last Updated',
  field: 'updatedAt',
  minWidth: 120,
  flex: 1,
  cellRenderer: (params: any) => {
    const date = new Date(params.value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    return (
      <span
        className="text-semibold font-semibold text-center block"
        style={{ color: '#02343F' }}
      >
        {formattedDate}
      </span>
    );
  },
}
,
  {
    headerName: 'Actions',
    cellRenderer: ActionsCell,
    sortable: false,
    filter: false,
    minWidth: 80,
    maxWidth: 100,
    cellClass: 'text-center',
  },
];




  return (
    <div className="flex flex-col h-[450px] shadow-md sm:rounded-lg bg-white">
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold " style={{color:"#02343F"}}>
            {companyName} Dashboard
          </h1>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
              className={`border px-2 py-1.5 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto ${searchText ? 'text-black font-semibold' : 'text-gray-700'
                }`}
            />

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value as IAccount['status'] | '');
                setCurrentPage(1);
              }}
              className={`
    w-full sm:w-auto px-3 py-2 rounded-lg shadow-sm
    bg-white border border-gray-300 focus:outline-none
    focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500
    text-sm font-medium text-gray-800 transition-all duration-200
    hover:border-indigo-500 hover:shadow-md
  `}
            >
              <option value="">All Statuses</option>
              <option value="active" className="text-green-600">Active</option>
              <option value="InActive" className="text-yellow-600">InActive</option>
              <option value="closed" className="text-red-600">Closed</option>
            </select>


            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setCurrentPage(1);
              }}
              className={`border px-2 py-1.5 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto ${selectedDate ? 'text-black font-semibold' : 'text-gray-700'
                }`}
            />

            <button
              disabled={!selectedDate && !selectedStatus && !searchText}
              onClick={() => {
                setSelectedDate('');
                setSelectedStatus('');
                setSearchText('');
                setCurrentPage(1);
              }}
              className="px-4 py-1.5 rounded-md bg-gray-800 text-white hover:bg-gray-500 disabled:bg-gray-300 w-full sm:w-auto"
            >
              Clear
            </button>

            <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() =>
        downloadExcel(filteredData, `${companyName.replace(/\s+/g, '_')}_accounts.xlsx`)
      }
      style={{
        color: hover ? '#02343F' : '#F0EDCC',
        backgroundColor: hover ? '#F0EDCC' : '#02343F',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
      className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-md w-full cursor-pointer transition-colors duration-200 sm:w-auto"
    >
      <ArrowDownTrayIcon className="h-5 w-5" />
      Export
    </button>
          </div>
        </div>
      </div>


      <div className="ag-theme-alpine w-full flex-grow">
        <AgGridReact
          rowData={paginatedData}
          columnDefs={columns}
          domLayout="autoHeight"
          headerHeight={40}
          rowHeight={50}
          pagination={false}
        />
      </div>

   {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-t"> */}
   <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t gap-4">
  <strong className="text-sm text-gray-700">
    Showing {paginatedData.length} of {filteredData.length} records
  </strong>

  <button
    onClick={() => router.push('/dashboard')}
    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-semibold"
  >
    <ArrowUturnLeftIcon className="h-5 w-5" /> Back
  </button>

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
{showPopup && selectedAccount && (
  <TransactionPopup
    accountNo={selectedAccount.accountNo}
    accountStatus={selectedAccount.status}
    currentBalance={selectedAccount.currentBalance}
    onClose={() => setShowPopup(false)}
  />
)}




    </div>
  );
};

export default AccountTable;




// 'use client';

// import React, { useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { AgGridReact } from 'ag-grid-react';
// import { ColDef } from 'ag-grid-community';
// import { IAccount } from '@/types';
// import * as XLSX from 'xlsx';
// import { ArrowDownTrayIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

// // --- NEW: Import the custom cell renderer components ---
// import StatusCell from './grid-cells/StatusCell';
// import ActionsCell from './grid-cells/ActionsCell';


// interface AccountTableProps {
//   accounts: IAccount[];
//   companyName: string;
// }

// const AccountTable = ({ accounts, companyName }: AccountTableProps) => {
//   const router = useRouter();
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState<IAccount['status'] | ''>('');
//   const [searchText, setSearchText] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const filteredData = useMemo(() => {
//     return accounts
//       .filter((a) =>
//         a.name.toLowerCase().includes(searchText.toLowerCase())
//       )
//       .filter((a) =>
//         selectedStatus ? a.status === selectedStatus : true
//       )
//       .filter((a) =>
//         selectedDate
//           ? new Date(a.updatedAt).toLocaleDateString('en-US') ===
//             new Date(selectedDate).toLocaleDateString('en-US')
//           : true
//       );
//   }, [accounts, selectedDate, selectedStatus, searchText]);

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

//   const downloadExcel = (data: IAccount[], filename: string) => {
//     const dataToExport = data.map(({ avatar, ...rest }) => rest);
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Accounts');
//     XLSX.writeFile(workbook, filename);
//   };

//  const columns: ColDef<IAccount>[] = [
//     {
//       headerName: 'S.NO',
//       valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
//       width: 90,
//     },
//     {
//       headerName: 'Name',
//       field: 'name',
//       sortable: true,
//       flex: 1,
//     },
//     {
//       headerName: 'Account No',
//       field: 'accountNo',
//       flex: 1,
//     },
//     {
//       headerName: 'Balance',
//       field: 'currentBalance',
//       valueFormatter: ({ value }) => `₹${Number(value).toLocaleString('en-IN')}`,
//       cellClass: 'text-right font-mono',
//       sortable: true,
//       flex: 1,
//     },
//     {
//       headerName: 'Status',
//       field: 'status',
//       // --- USE THE REACT COMPONENT HERE ---
//       cellRenderer: StatusCell,
//       // Center the component within the cell
//       cellClass: 'flex justify-center items-center', 
//       flex: 1,
//     },
//     {
//       headerName: 'Last Updated',
//       field: 'updatedAt',
//       valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
//       flex: 1,
//     },
//     {
//       headerName: 'Actions',
//       // --- USE THE REACT COMPONENT HERE ---
//       cellRenderer: ActionsCell,
//       width: 100,
//       // Disable sorting/filtering for the actions column
//       sortable: false,
//       filter: false,
//     },
//   ];

//   return (
//     <div className="flex flex-col h-[450px] shadow-md sm:rounded-lg bg-white">
//       <div className="flex items-center justify-between p-4 border-b">
//         <h1 className="text-xl md:text-2xl font-bold text-gray-800">{companyName} Dashboard</h1>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchText}
//             onChange={(e) => {
//               setSearchText(e.target.value);
//               setCurrentPage(1);
//             }}
//             className={`border px-2 py-1.5 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${searchText ? 'text-black' : 'text-gray-500'
//               }`}
//           />
//           <select
//             value={selectedStatus}
//             onChange={(e) => {
//               setSelectedStatus(e.target.value as IAccount['status'] | '');
//               setCurrentPage(1);
//             }}
//             className={`border px-2 py-1.5 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${selectedStatus ? 'text-black' : 'text-gray-500'
//               }`}
//           >
//             <option value="">All Statuses</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//             <option value="closed">Closed</option>
//           </select>
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => {
//               setSelectedDate(e.target.value);
//               setCurrentPage(1);
//             }}
//             className={`border px-2 py-1.5 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${selectedDate ? 'text-black' : 'text-gray-500'
//               }`}
//           />
//           <button
//             disabled={!selectedDate && !selectedStatus && !searchText}
//             onClick={() => {
//               setSelectedDate('');
//               setSelectedStatus('');
//               setSearchText('');
//               setCurrentPage(1);
//             }}
//             className="px-4 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300"
//           >
//             Clear
//           </button>
//           <button
//             onClick={() =>
//               downloadExcel(
//                 filteredData,
//                 `${companyName.replace(/\s+/g, '_')}_accounts.xlsx`
//               )
//             }
//             className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700"
//           >
//             <ArrowDownTrayIcon className="h-5 w-5" /> Export
//           </button>
//         </div>
//       </div>

//       <div className="ag-theme-alpine w-full flex-grow">
//         <AgGridReact
//           rowData={paginatedData}
//           columnDefs={columns}
//           domLayout="autoHeight"
//           headerHeight={40}
//           rowHeight={50}
//           pagination={false}
//           suppressRowDeselection
//         />
//       </div>

//       <div className="flex justify-between items-center p-4 border-t">
//         <strong className="text-sm text-gray-700">
//           Showing {paginatedData.length} of {filteredData.length} records
//         </strong>
//         <button
//           onClick={() => router.push('/dashboard')}
//           className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 font-semibold"
//         >
//           <ArrowUturnLeftIcon className="h-5 w-5" /> Back
//         </button>
//         <div className="flex items-center gap-4">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300"
//           >
//             Previous
//           </button>
//           <span className="text-sm font-medium text-gray-900">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             disabled={currentPage === totalPages || totalPages === 0}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountTable;













// import React, { useState, useEffect } from "react";
// import { useRouter } from 'next/navigation';

// const AccountTable = () => {
//     const router = useRouter(); 
//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // filter by date
//   const [selectedDate, setSelectedDate] = useState<string>("");

//   // Sort by
//   const [sortColumn, setSortColumn] = useState<string>(""); // "name" or "currentBalance"
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

//   // API data
//   const [accounts, setAccounts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("https://684fa5d6e7c42cfd17955990.mockapi.io/api/account-details/accountDetails");
//         if (!res.ok) {
//           throw new Error("Failed to fetch account details.");
//         }

//         const data = await res.json();
//         setAccounts(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Filter first by selectedDate
//   let filtered = selectedDate
//     ? accounts.filter((item) => {
//         return (
//           new Date(item.updatedAt).toLocaleDateString("en-US") ===
//           new Date(selectedDate).toLocaleDateString("en-US")
//         );
//       })
//     : accounts;

//   // Sort after filtering
//   if (sortColumn) {
//     filtered = [...filtered].sort((a, b) => {
//       let comparison = 0;

//       if (sortColumn === "name") {
//         comparison = a.name.localeCompare(b.name);
//       } else if (sortColumn === "currentBalance") {
//         comparison = a.currentBalance - b.currentBalance;
//       }

//       return sortDirection === "asc" ? comparison : -comparison;
//     });
//   }

//   // pagination controls
//   const totalRecords = filtered.length;
//   const totalPages = Math.ceil(totalRecords / itemsPerPage);
//   const startIdx = (currentPage - 1) * itemsPerPage;

//   // Apply pagination after filtering and sorting
//   const paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

//   // helper for color-coding statuses
//   const getStatusClasses = (status: string) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800";
//       case "inactive":
//         return "bg-yellow-100 text-yellow-800";
//       case "closed":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Sort handlers
//   const handleSort = (column: string) => {
//     if (sortColumn === column) {
//       setSortDirection((prev) =>
//         prev === "asc" ? "desc" : "asc"
//       );
//     } else {
//       setSortColumn(column);
//       setSortDirection("asc");

//       // Reset pagination to first page after a new sort
//       setCurrentPage(1);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
//       {/* Filter by Date picker */}
//       <div className="flex items-center justify-between p-4">
//         <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
//           Account Overview
//         </h1>

//         <div className="flex justify-end gap-2 p-4">
//           <label
//             htmlFor="filter-date"
//             className="text-gray-900 font-semibold">
//             Filter by Date
//           </label>
//           <input
//             id="filter-date"
//             type="date"
//             value={selectedDate}
//             onChange={(e) => {
//               setSelectedDate(e.target.value);
//               setCurrentPage(1);
//             }}
//             className={`border px-2 py-1 rounded ${
//               selectedDate ? "text-gray-900 font-semibold" : "text-gray-500"
//             }`}
//           />
//           <button
//             disabled={!selectedDate}
//             onClick={() => {
//               setSelectedDate('');
//               setCurrentPage(1);
//             }}
//             className="px-3 py-1 rounded disabled:bg-gray-300 disabled:cursor-not-allowed bg-blue-500 text-gray-50">
//             Clear Filter
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <table className="w-full text-sm text-left text-gray-500">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-100">
//           <tr>
//             <th
//               scope="col"
//               className="py-3 px-6 text-gray-900 font-semibold cursor-pointer"
//               onClick={() => handleSort("name")}>
//               Name{" "}
//               {sortColumn === "name" ? (
//                 <span className="text-gray-900">
//                     {sortDirection === "asc" ? "↑" : "↓"}
//                 </span>
//               ) : ""}
//             </th>

//             <th scope="col" className="py-3 px-6">
//               Account No
//             </th>
//             <th
//               scope="col"
//               className="py-3 px-6 text-gray-900 font-semibold cursor-pointer text-right"
//               onClick={() => handleSort("currentBalance")}>
//               Current Balance{" "}
//               {sortColumn === "currentBalance" ? (
//                 <span className="text-gray-900">
//                     {sortDirection === "asc" ? "↑" : "↓"}
//                 </span>
//               ) : ""}
//             </th>

//             <th scope="col" className="py-3 px-6 text-center">
//               Status
//             </th>
//             <th scope="col" className="py-3 px-6">
//               Last Updated
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginated.length > 0 ? (
//             paginated.map((account) => (
//               <tr
//                 key={account.id}
//                 className="bg-white border-b hover:bg-gray-50">
//                 <td className="py-4 px-6 font-semibold text-gray-900 whitespace-nowrap">
//                     {account.name}
//                 </td>
//                 <td className="py-4 px-6">
//                     {account.accountNo}
//                 </td>
//                 <td className="py-4 px-6 text-right font-mono">
//                     ${account.currentBalance.toLocaleString("en-US", {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })}
//                 </td>
//                 <td className="py-4 px-6 text-center">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(account.status)}`}
//                     >
//                       {account.status}
//                     </span>
//                 </td>
//                 <td className="py-4 px-6">
//                     {new Date(account.updatedAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td
//                 colSpan={5}
//                 className="py-4 px-6 text-center text-gray-500">
//                 No account data available.
//               </td>
//             </tr>
//           )}

//         </tbody>
//       </table>

//       {/* Pagination controls */}
//       <div className="flex justify-center items-center mt-4 gap-2">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           className="px-3 py-1 rounded disabled:bg-gray-300 disabled:cursor-not-allowed bg-blue-500 text-gray-50">
//           Previous
//         </button>
//         {Array.from({ length: totalPages },(_,i) => i + 1).map((page) => (
//           <button
//             key={page}
//             disabled={currentPage === page}
//             onClick={() => setCurrentPage(page)}
//             className={`px-3 py-1 rounded ${
//               currentPage === page
//                 ? "bg-blue-700 text-gray-50"
//                 : "bg-gray-200 text-gray-900 hover:bg-gray-300"
//             }`}
//           >
//             {page}
//           </button>
//         ))}
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           className="px-3 py-1 rounded disabled:bg-gray-300 disabled:cursor-not-allowed bg-blue-500 text-gray-50">
//           Next
//         </button>
//       </div>

//       {/* Overall Count */}
//       <div className="flex justify-end p-4">
//         <strong className="text-gray-900">
//           Total Records: {totalRecords}
//         </strong>
//       </div>

//     </div>
//   );
// };

// export default AccountTable;







// 'use client'; 

// import React, { useState } from "react";
// import { useRouter } from 'next/navigation';
// import { IAccount } from "@/types";
// import { motion, AnimatePresence } from 'framer-motion';

// interface AccountTableProps {
//   accounts: IAccount[];
// }

// const AccountTable = ({ accounts }: AccountTableProps) => {
//   const router = useRouter(); 

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [sortColumn, setSortColumn] = useState<string>("");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

//   let filtered = selectedDate
//     ? accounts.filter((item) => new Date(item.updatedAt).toLocaleDateString("en-US") === new Date(selectedDate).toLocaleDateString("en-US"))
//     : accounts;

//   if (sortColumn) {
//     filtered = [...filtered].sort((a, b) => {
//       let comparison = 0;
//       if (sortColumn === "name") {
//         comparison = a.name.localeCompare(b.name);
//       } else if (sortColumn === "currentBalance") {
//         comparison = a.currentBalance - b.currentBalance;
//       }
//       return sortDirection === "asc" ? comparison : -comparison;
//     });
//   }

//   const totalRecords = filtered.length;
//   const totalPages = Math.ceil(totalRecords / itemsPerPage);
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

//   const getStatusClasses = (status: IAccount['status']) => {
//     switch (status) {
//       case "active": return "bg-green-100 text-green-800";
//       case "inactive": return "bg-yellow-100 text-yellow-800";
//       case "closed": return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const handleSort = (column: string) => {
//     if (sortColumn === column) {
//       setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortColumn(column);
//       setSortDirection("asc");
//       setCurrentPage(1);
//     }
//   };
//  const rowVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.05, // Stagger the animation of each row
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     }),
//     exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
//   };

//   return (
//     // --- CHANGE 1: Main container now controls the overall height and layout ---
//     <div className="flex flex-col h-[500px] shadow-md sm:rounded-lg bg-white"> 
//       {/* Filter controls section (takes its natural height) */}
//       <div className="flex items-center justify-between p-4 border-b">
//         <h1 className="text-xl md:text-2xl font-bold text-gray-800">
//           Account Overview
//         </h1>
//         <div className="flex items-center gap-2">
//           <input
//             id="filter-date"
//             type="date"
//             value={selectedDate}
//             onChange={(e) => {
//               setSelectedDate(e.target.value);
//               setCurrentPage(1);
//             }}
//             className={`border px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
//               selectedDate ? "text-gray-900" : "text-gray-500"
//             }`}
//           />
//           <button
//             disabled={!selectedDate}
//             onClick={() => {
//               setSelectedDate('');
//               setCurrentPage(1);
//             }}
//             className="px-4 py-1.5 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed bg-red-500 text-white hover:bg-red-600"
//           >
//             Clear
//           </button>
//         </div>
//       </div>
      
//       {/* --- CHANGE 2: Table wrapper to handle overflow --- */}
//       <div className="flex-grow overflow-auto">
//         <table className="w-full text-sm text-left text-gray-500">
//           {/* --- CHANGE 3: Header is now sticky --- */}
//           <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
//             <tr>
//               {/* --- CHANGE 4: Explicit widths are now required for alignment --- */}
//               <th style={{ width: '25%' }} scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("name")}>
//                 Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
//               </th>
//               <th style={{ width: '20%' }} scope="col" className="py-3 px-6">Account No</th>
//               <th style={{ width: '20%' }} scope="col" className="py-3 px-6 text-right cursor-pointer" onClick={() => handleSort("currentBalance")}>
//                 Balance {sortColumn === "currentBalance" && (sortDirection === "asc" ? "↑" : "↓")}
//               </th>
//               <th style={{ width: '15%' }} scope="col" className="py-3 px-6 text-center">Status</th>
//               <th style={{ width: '20%' }} scope="col" className="py-3 px-6">Last Updated</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginated.length > 0 ? (
//               paginated.map((account) => (
//                 <tr
//                   key={account.id}
//                   onClick={() => router.push(`/dashboard/accounts/${account.id}`)}
//                   className="bg-white border-b hover:bg-gray-50 cursor-pointer"
//                 >
//                   {/* --- CHANGE 4 (Continued): Explicit widths on data cells --- */}
//                   <td style={{ width: '25%' }} className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{account.name}</td>
//                   <td style={{ width: '20%' }} className="py-4 px-6">{account.accountNo}</td>
//                   <td style={{ width: '20%' }} className="py-4 px-6 text-right font-mono">${Number(account.currentBalance).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
//                   <td style={{ width: '15%' }} className="py-4 px-6 text-center">
//                     <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(account.status)}`}>
//                       {account.status}
//                     </span>
//                   </td>
//                   <td style={{ width: '20%' }} className="py-4 px-6">{new Date(account.updatedAt).toLocaleDateString()}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="py-6 px-6 text-center text-gray-500">No matching accounts found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls section (takes its natural height) */}
//       <div className="flex justify-between items-center p-4 border-t">
//         <strong className="text-sm text-gray-700">
//           Showing {paginated.length} of {totalRecords} records
//         </strong>
//         <div className="flex items-center gap-4">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>
//           <span className="text-sm font-medium text-gray-900">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             disabled={currentPage === totalPages || totalPages === 0}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountTable;





// 'use client'; 

// import React, { useState } from "react";
// import { useRouter } from 'next/navigation';
// import { IAccount } from "@/types";
// import { motion, AnimatePresence, Variants } from "framer-motion";

// interface AccountTableProps {
//   accounts: IAccount[];
// }

// const AccountTable = ({ accounts }: AccountTableProps) => {
//   const router = useRouter(); 
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [sortColumn, setSortColumn] = useState<string>("");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
// const [selectedStatus, setSelectedStatus] = useState<IAccount['status'] | ''>('');

//   // let filtered = selectedDate
//   //   ? accounts.filter((item) => new Date(item.updatedAt).toLocaleDateString("en-US") === new Date(selectedDate).toLocaleDateString("en-US"))
//   //   : accounts;

//   // if (sortColumn) {
//   //   filtered = [...filtered].sort((a, b) => {
//   //     let comparison = 0;
//   //     if (sortColumn === "name") {
//   //       comparison = a.name.localeCompare(b.name);
//   //     } else if (sortColumn === "currentBalance") {
//   //       comparison = a.currentBalance - b.currentBalance;
//   //     }
//   //     return sortDirection === "asc" ? comparison : -comparison;
//   //   });
//   // }

//    let filtered = accounts;
//   if (selectedDate) {
//     filtered = filtered.filter((item) => new Date(item.updatedAt).toLocaleDateString("en-US") === new Date(selectedDate).toLocaleDateString("en-US"));
//   }
//   if (selectedStatus) {
//     filtered = filtered.filter((item) => item.status === selectedStatus);
//   }

//   // ... (The rest of your sorting and pagination logic is perfect and remains the same)
//   if (sortColumn) {
//     filtered = [...filtered].sort((a, b) => {
//       let comparison = 0;
//       if (sortColumn === "name") {
//         comparison = a.name.localeCompare(b.name);
//       } else if (sortColumn === "currentBalance") {
//         comparison = a.currentBalance - b.currentBalance;
//       }
//       return sortDirection === "asc" ? comparison : -comparison;
//     });
//   }
//   const totalRecords = filtered.length;
//   const totalPages = Math.ceil(totalRecords / itemsPerPage);
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

//   const getStatusClasses = (status: IAccount['status']) => {
//     switch (status) {
//       case "active": return "bg-green-100 text-green-800";
//       case "inactive": return "bg-yellow-100 text-yellow-800";
//       case "closed": return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const handleSort = (column: string) => {
//     if (sortColumn === column) {
//       setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortColumn(column);
//       setSortDirection("asc");
//       setCurrentPage(1);
//     }
//   };
  
//   const rowVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i: number) => ({ // Using 'i' for index is a common convention
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.05,
//         duration: 0.5,
//         ease: "easeOut", // This is now correctly typed
//       },
//     }),
//     exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
//   };


//   return (
//     <div className="flex flex-col h-[550px] shadow-md sm:rounded-lg bg-white"> 
//       <div className="flex items-center justify-between p-4 border-b">
//         <h1 className="text-xl md:text-2xl font-bold text-gray-800">Account Overview</h1>
//           <div className="flex items-center gap-4">
//           {/* Status Filter Dropdown */}
//           <select
//             id="filter-status"
//             value={selectedStatus}
//             onChange={(e) => {
//               setSelectedStatus(e.target.value as IAccount['status'] | '');
//               setCurrentPage(1);
//             }}
//             className="border px-2 py-1.5 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
//           >
//             <option value="">All Statuses</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//             <option value="closed">Closed</option>
//           </select>
//           <input id="filter-date" type="date" value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1); }} className={`border px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${selectedDate ? "text-gray-900" : "text-gray-500"}`}/>
//           <button disabled={!selectedDate} onClick={() => { setSelectedDate(''); setCurrentPage(1); }} className="px-4 py-1.5 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed bg-red-500 text-white hover:bg-red-600">Clear</button>
//         </div>
//       </div>
//       <div className="flex-grow overflow-auto">
//         <table className="w-full text-sm text-left text-gray-500">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
//             <tr>
//               <th style={{ width: '25%' }} scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("name")}>Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}</th>
//               <th style={{ width: '20%' }} scope="col" className="py-3 px-6">Account No</th>
//               <th style={{ width: '20%' }} scope="col" className="py-3 px-6 text-right cursor-pointer" onClick={() => handleSort("currentBalance")}>Balance {sortColumn === "currentBalance" && (sortDirection === "asc" ? "↑" : "↓")}</th>
//               <th style={{ width: '15%' }} scope="col" className="py-3 px-6 text-center">Status</th>
//               <th style={{ width: '20%' }} scope="col" className="py-3 px-6">Last Updated</th>
//             </tr>
//           </thead>
//           <AnimatePresence>
//             <motion.tbody>
//               {paginated.length > 0 ? (
//                 paginated.map((account, index) => (
//                   <motion.tr key={account.id} custom={index} variants={rowVariants} initial="hidden" animate="visible" exit="exit" onClick={() => router.push(`/dashboard/accounts/${account.id}`)} className="bg-white border-b hover:bg-gray-50 cursor-pointer">
//                     <td style={{ width: '25%' }} className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{account.name}</td>
//                     <td style={{ width: '20%' }} className="py-4 px-6">{account.accountNo}</td>
//                     <td style={{ width: '20%' }} className="py-4 px-6 text-right font-mono">${Number(account.currentBalance).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
//                     <td style={{ width: '15%' }} className="py-4 px-6 text-center"><span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(account.status)}`}>{account.status}</span></td>
//                     <td style={{ width: '20%' }} className="py-4 px-6">{new Date(account.updatedAt).toLocaleDateString()}</td>
//                   </motion.tr>
//                 ))
//               ) : (
//                 <tr><td colSpan={5} className="py-6 px-6 text-center text-gray-500">No matching accounts found.</td></tr>
//               )}
//             </motion.tbody>
//           </AnimatePresence>
//         </table>
//       </div>
//       <div className="flex justify-between items-center p-4 border-t">
//         <strong className="text-sm text-gray-700">Showing {paginated.length} of {totalRecords} records</strong>
//         <div className="flex items-center gap-4">
//           <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">Previous</button>
//           <span className="text-sm font-medium text-gray-900">Page {currentPage} of {totalPages}</span>
//           <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage((prev) => prev + 1)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AccountTable;





// 'use client';

// import React, { useState } from "react";
// import { useRouter } from 'next/navigation';
// import { IAccount } from "@/types";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import * as XLSX from 'xlsx';
// import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// interface AccountTableProps {
//   accounts: IAccount[];
// }

// const AccountTable = ({ accounts }: AccountTableProps) => {
//   const router = useRouter();
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const [selectedDate, setSelectedDate] = useState<string>("");

//   const [sortColumn, setSortColumn] = useState<string>("");

//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

//   const [selectedStatus, setSelectedStatus] = useState<IAccount['status'] | ''>("");

//   // --- NEW: Helper function to trigger Excel download --- 
//   const downloadExcel = (data: IAccount[], filename: string) => {
//     // Strip avatar
//     const dataToExport = data.map(({ avatar, ...rest }) => rest);
//     // Create sheet
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     // Create workbook
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Accounts");

//     // Save
//     XLSX.writeFile(workbook, filename);
//   };

//   // Filter by
//   let filtered = accounts;

//   if (selectedDate) {
//     filtered = filtered.filter((item) =>
//       new Date(item.updatedAt).toLocaleDateString("en-US") === new Date(selectedDate).toLocaleDateString("en-US")
//     );
//   }

//   if (selectedStatus) {
//     filtered = filtered.filter((item) => item.status === selectedStatus);
//   }

//   // Sort
//   if (sortColumn) {
//     filtered = [...filtered].sort((a, b) => {
//       let comparison = 0;

//       if (sortColumn === "name") {
//         comparison = a.name.localeCompare(b.name);
//       } else if (sortColumn === "currentBalance") {
//         comparison = a.currentBalance - b.currentBalance;
//       }

//       return sortDirection === "asc" ? comparison : -comparison;
//     });
//   }

//   // Pagination
//   const totalRecords = filtered.length;
//   const totalPages = Math.ceil(totalRecords / itemsPerPage);
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

//   const getStatusClasses = (status: IAccount['status']) => {
//     switch (status) {
//       case "active": return "bg-green-100 text-green-800";
//       case "inactive": return "bg-yellow-100 text-yellow-800";
//       case "closed": return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const handleSort = (column: string) => {
//     if (sortColumn === column) {
//       setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortColumn(column);
//       setSortDirection("asc");

//       setCurrentPage(1);
//     }
//   };

//   const rowVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" },
//     }),
//     exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
//   };

//   return (
//     <div className="flex flex-col shadow-md sm:rounded-lg bg-white">
//       <div className="flex items-center justify-between p-4 border-b">
//         <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
//           Account Overview
//         </h1>

//         <div className="flex flex-wrap gap-4">
//           {/* Filter by Status */}
//           <select
//             id="filter-status"
//             value={selectedStatus}
//             onChange={(e) => {
//               setSelectedStatus(e.target.value as IAccount['status'] | '');
//               setCurrentPage(1);
//             }}
//             className="border px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900">
//             <option value="">All</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//             <option value="closed">Closed</option>
//           </select>

//           {/* Filter by Date */}
//           <input
//             id="filter-date"
//             type="date"
//             value={selectedDate}
//             onChange={(e) => {
//               setSelectedDate(e.target.value);
//               setCurrentPage(1);
//             }}
//             className={`border px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${selectedDate ? "text-gray-900" : "text-gray-500"}`}
//           />

//           {/* Clear Filters */}
//           <button
//             disabled={!selectedDate && !selectedStatus}
//             onClick={() => {
//               setSelectedDate('');
//               setSelectedStatus('');
//               setCurrentPage(1);
//             }}
//             className="px-4 py-1.5 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed bg-red-500 text-gray-50 hover:bg-red-600">
//             Clear
//           </button>

//           {/* Export to Excel */}
//           <button
//             disabled={filtered.length === 0}
//             onClick={() => downloadExcel(filtered, "all_accounts_data.xlsx")} 
//             className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-green-600 text-gray-50 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
//             <ArrowDownTrayIcon className="h-5 w-5" />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="flex-grow overflow-x-auto">
//         <table className="min-w-full table-auto text-gray-500">
//           <thead className="text-gray-700 uppercase bg-gray-100 sticky top-0">
//             <tr>
//               <th className="py-3 px-6">S.NO</th>
//               <th
//                 onClick={() => handleSort("name")} 
//                 className="py-3 px-6 cursor-pointer">
//                 Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")} 
//               </th>
//               <th className="py-3 px-6">Account No</th>
//               <th
//                 onClick={() => handleSort("currentBalance")} 
//                 className="py-3 px-6 text-right cursor-pointer">
//                 Balance {sortColumn === "currentBalance" && (sortDirection === "asc" ? "↑" : "↓")} 
//               </th>
//               <th className="py-3 px-6 text-center">Status</th>
//               <th className="py-3 px-6">Last Updated</th>
//               <th className="py-3 px-6 text-center">Actions</th>
//             </tr>
//           </thead>
//           <AnimatePresence>
//             <motion.tbody>
//               {paginated.length > 0 ? (
//                 paginated.map((account, index) => (
//                     <motion.tr
//                     key={account.id}
//                     custom={index}
//                     variants={rowVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     onClick={() => router.push(`/dashboard/accounts/${account.id}`)}
//                     className="bg-gray-50 border-b hover:bg-gray-100 cursor-pointer">
//                     <td className="py-4 px-6 whitespace-nowrap">
//                       {account.id}
//                     </td>
//                     <td className="py-4 px-6 font-semibold whitespace-nowrap">
//                       {account.name}
//                     </td>
//                     <td className="py-4 px-6 whitespace-nowrap">
//                       {account.accountNo}
//                     </td>
//                     <td className="py-4 px-6 text-right font-mono whitespace-nowrap">
//                       ₹{Number(account.currentBalance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
//                     </td>
//                     <td className="py-4 px-6 text-center">
//                       <span
//                         className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(account.status)}`}>
//                         {account.status}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6 whitespace-nowrap">
//                       {new Date(account.updatedAt).toLocaleDateString()}
//                     </td>

//                     {/* Actions */}
//                     <td className="py-4 px-6 text-center">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           downloadExcel([account], `account_${account.accountNo}.xlsx`);
//                         }}
//                         className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800">
//                         <ArrowDownTrayIcon className="h-5 w-5" />
//                       </button>
//                     </td>
//                    </motion.tr>
//                 ))
//               ) : (
//                 <tr>
//                     <td colSpan={7} className="py-6 px-6 text-center text-gray-500">
//                     No matching accounts found.
//                     </td>
//                 </tr>
//               )}

//             </motion.tbody>
//           </AnimatePresence>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center p-4 border-t">
//         <strong className="text-sm text-gray-700">
//           Showing {paginated.length} of {totalRecords} records
//         </strong>

//         <div className="flex items-center gap-4">
//           <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="px-4 py-2 text-sm font-semibold text-gray-50 bg-indigo-500 rounded-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">
//             Previous
//           </button>
//           <span className="text-sm text-gray-700 font-semibold">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage((prev) => prev + 1)} className="px-4 py-2 text-sm font-semibold text-gray-50 bg-indigo-500 rounded-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountTable;




// --- Sample usage ---

// <AccountTable />



















// import { IAccount } from "@/models/Account";

// type AccountTableProps = {
//   accounts: IAccount[];
// };

// const getStatusClasses = (status: IAccount['status']) => {
//   switch (status) {
//     case 'active':
//       return 'bg-green-100 text-green-800';
//     case 'inactive':
//       return 'bg-yellow-100 text-yellow-800';
//     case 'closed':
//       return 'bg-red-100 text-red-800';
//     default:
//       return 'bg-gray-100 text-gray-800';
//   }
// };

// const AccountTable = ({ accounts }: AccountTableProps) => {
//   return (
//     <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
//       <table className="w-full text-sm text-left text-gray-500">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-100">
//           <tr>
//             <th scope="col" className="py-3 px-6">Name</th>
//             <th scope="col" className="py-3 px-6">Account No</th>
//             <th scope="col" className="py-3 px-6 text-right">Current Balance</th>
//             <th scope="col" className="py-3 px-6 text-center">Status</th>
//             <th scope="col" className="py-3 px-6">Last Updated</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* --- START: CONDITIONAL RENDERING LOGIC --- */}
//           {accounts.length > 0 ? (
//             // If there are accounts, map over them and render a row for each
//             accounts.map((account) => (
//               <tr key={account._id} className="bg-white border-b hover:bg-gray-50">
//                 <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
//                   {account.name}
//                 </td>
//                 <td className="py-4 px-6">{account.accountNo}</td>
//                 <td className="py-4 px-6 text-right font-mono">
//                   ${account.currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                 </td>
//                 <td className="py-4 px-6 text-center">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(account.status)}`}>
//                     {account.status}
//                   </span>
//                 </td>
//                 <td className="py-4 px-6">
//                   {new Date(account.updatedAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             // If the accounts array is empty, render this single row
//             <tr>
//               <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
//                 No account data available.
//               </td>
//             </tr>
//           )}
//           {/* --- END: CONDITIONAL RENDERING LOGIC --- */}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AccountTable;
