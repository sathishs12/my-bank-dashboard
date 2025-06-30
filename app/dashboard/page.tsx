// import { IAccount } from '@/models/Account';
// import DashboardClientPage from '@/components/DashboardClientPage';

// // This server component still fetches data...
// async function getAccounts(): Promise<IAccount[]> {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/accounts`, { cache: "no-store" });
//     if (!res.ok) return [];
//     return res.json();
//   } catch (error) {
//     console.error("Error fetching accounts:", error);
//     return [];
//   }
// }

// // ...but it now passes the data to a client component for rendering and protection.
// export default async function DashboardPage() {
//   const accounts = await getAccounts();
//   return <DashboardClientPage accounts={accounts} />;
// }


import AccountTable from '@/components/AccountTable';
import CompanySummaryTable from '@/components/CompanySummaryTable';
import { IAccount } from '@/types';
import AgGridModules from '@/components/AgGridModules'; 

const getCompanyName = (id: string): string => {
  const numericId = parseInt(id, 10);
  if (numericId <= 10) return "Innovate Inc.";
  if (numericId <= 20) return "Quantum Solutions";
  if (numericId <= 30) return "Nexa Technologies";
  if (numericId <= 40) return "Pioneer Corp.";
  if (numericId <= 50) return "Vertex Systems";
  if (numericId <= 60) return "Zenith Dynamics";
  if (numericId <= 70) return "Apex Innovations";
  if (numericId <= 80) return "Omega Enterprises";
  if (numericId <= 90) return "Nova Labs";
  if (numericId <= 100) return "Stellar Global";
  return "Unknown Company";
};

async function getAccountsFromApi(): Promise<IAccount[]> {
  const apiEndpoint = "https://684fa5d6e7c42cfd17955990.mockapi.io/api/account-details/accountDetails";
  try {
    const res = await fetch(apiEndpoint, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`Failed to fetch from MockAPI: ${res.status} ${res.statusText}`);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("An error occurred while fetching accounts:", error);
    return [];
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { company?: string };
}) {
  const allAccounts = await getAccountsFromApi();
  const selectedCompany = searchParams?.company;

  if (selectedCompany) {
    const companyAccounts = allAccounts.filter(
      (account) => getCompanyName(account.id) === selectedCompany
    );
    // --- UPDATED: Pass the companyName prop ---
    return <AccountTable   />;
    // <AccountTable accounts={companyAccounts} companyName={selectedCompany} />;
  } else {
    // return <CompanySummaryTable accounts={allAccounts} />;
    return <CompanySummaryTable />;

  }
}



// import AccountTable from '@/components/AccountTable';
// import { IAccount } from '@/types/index'; // Import our shared type

// // This async function runs on the server to fetch data from your MockAPI
// async function getAccountsFromApi(): Promise<IAccount[]> {
//   const apiEndpoint = "https://684fa5d6e7c42cfd17955990.mockapi.io/api/account-details/accountDetails";

//   try {
//     const res = await fetch(apiEndpoint, {
//       // 'no-store' ensures you always get the latest data from the API
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       console.error(`Failed to fetch from MockAPI: ${res.status} ${res.statusText}`);
//       return []; // Return an empty array on failure
//     }

//     const data: any[] = await res.json();
//     return data;

//   } catch (error) {
//     console.error("An error occurred while fetching accounts:", error);
//     return []; // Return empty array on network or other errors
//   }
// }

// // This is the main Server Component for the dashboard page
// export default async function DashboardPage() {
//   // Call the server function to get the data
//   const accounts = await getAccountsFromApi();

//   // Render the interactive table component, passing the fetched data as a prop
//   return <AccountTable accounts={accounts} />;
// }