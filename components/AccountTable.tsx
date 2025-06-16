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


'use client'; 

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { IAccount } from "@/types";
import { motion, AnimatePresence, Variants } from "framer-motion";
import * as XLSX from 'xlsx';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface AccountTableProps {
  accounts: IAccount[];
}

const AccountTable = ({ accounts }: AccountTableProps) => {
  const router = useRouter(); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedStatus, setSelectedStatus] = useState<IAccount['status'] | ''>('');

  // --- NEW: Helper function to trigger Excel download ---
  const downloadExcel = (data: IAccount[], filename: string) => {
    // 1. We don't want to include the avatar URL in the Excel sheet
    const dataToExport = data.map(({ avatar, ...rest }) => rest);
    // 2. Convert the array of JSON objects to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    // 3. Create a new workbook
    const workbook = XLSX.utils.book_new();
    // 4. Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Accounts");
    // 5. Trigger the download of the Excel file
    XLSX.writeFile(workbook, filename);
  };

  // Your filtering logic remains the same
  let filtered = accounts;
  if (selectedDate) {
    filtered = filtered.filter((item) => new Date(item.updatedAt).toLocaleDateString("en-US") === new Date(selectedDate).toLocaleDateString("en-US"));
  }
  if (selectedStatus) {
    filtered = filtered.filter((item) => item.status === selectedStatus);
  }

  // Your sorting logic remains the same
  if (sortColumn) {
    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortColumn === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortColumn === "currentBalance") {
        comparison = a.currentBalance - b.currentBalance;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }

  const totalRecords = filtered.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

  const getStatusClasses = (status: IAccount['status']) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-yellow-100 text-yellow-800";
      case "closed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
      setCurrentPage(1);
    }
  };
  
  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col h-[530px] shadow-md sm:rounded-lg bg-white"> 
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Account Overview</h1>
        <div className="flex items-center gap-4">
          <select id="filter-status" value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value as IAccount['status'] | ''); setCurrentPage(1); }} className="border px-2 py-1.5 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="closed">Closed</option>
          </select>
          <input id="filter-date" type="date" value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1); }} className={`border px-2 py-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${selectedDate ? "text-gray-900" : "text-gray-500"}`}/>
          <button disabled={!selectedDate && !selectedStatus} onClick={() => { setSelectedDate(''); setSelectedStatus(''); setCurrentPage(1); }} className="px-4 py-1.5 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed bg-red-500 text-white hover:bg-red-600">Clear</button>
          {/* --- NEW: Download All Button --- */}
          <button
            onClick={() => downloadExcel(filtered, "all_accounts_data.xlsx")}
            className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300"
            disabled={filtered.length === 0}
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            Export
          </button>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
            <tr>
              {/* --- UPDATED: Adjusted widths for new column --- */}
              <th style={{ width: '10%' }} scope="col" className="py-3 px-6">S.NO</th>
              <th style={{ width: '25%' }} scope="col" className="py-3 px-6 cursor-pointer" onClick={() => handleSort("name")}>Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}</th>
              <th style={{ width: '20%' }} scope="col" className="py-3 px-6">Account No</th>
              <th style={{ width: '15%' }} scope="col" className="py-3 px-6 text-right cursor-pointer" onClick={() => handleSort("currentBalance")}>Balance {sortColumn === "currentBalance" && (sortDirection === "asc" ? "↑" : "↓")}</th>
              <th style={{ width: '15%' }} scope="col" className="py-3 px-6 text-center">Status</th>
              <th style={{ width: '15%' }} scope="col" className="py-3 px-6">Last Updated</th>
              {/* --- NEW: Actions column header --- */}
              <th style={{ width: '10%' }} scope="col" className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <AnimatePresence>
            <motion.tbody>
              {paginated.length > 0 ? (
                paginated.map((account, index) => (
                  <motion.tr
                    key={account.id}
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => router.push(`/dashboard/accounts/${account.id}`)}
                    className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td style={{ width: '10%' }} className="py-4 px-6">{account.id}</td>
                    <td style={{ width: '25%' }} className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{account.name}</td>
                    <td style={{ width: '20%' }} className="py-4 px-6">{account.accountNo}</td>
                    <td style={{ width: '15%' }} className="py-4 px-6 text-right font-mono">₹{Number(account.currentBalance).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                    <td style={{ width: '15%' }} className="py-4 px-6 text-center"><span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(account.status)}`}>{account.status}</span></td>
                    <td style={{ width: '15%' }} className="py-4 px-6">{new Date(account.updatedAt).toLocaleDateString()}</td>
                    
                    {/* --- NEW: Actions column cell with download icon --- */}
                    <td style={{ width: '10%' }} className="py-4 px-6 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from navigating
                          downloadExcel([account], `account_${account.accountNo}.xlsx`);
                        }}
                        className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                        title="Download as Excel"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr><td colSpan={6} className="py-6 px-6 text-center text-gray-500">No matching accounts found.</td></tr>
              )}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>

      <div className="flex justify-between items-center p-4 border-t">
        <strong className="text-sm text-gray-700">Showing {paginated.length} of {totalRecords} records</strong>
        <div className="flex items-center gap-4">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">Previous</button>
          <span className="text-sm font-medium text-gray-900">Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage((prev) => prev + 1)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AccountTable;


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
