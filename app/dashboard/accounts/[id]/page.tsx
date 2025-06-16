import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnimatedCard from '@/components/AnimatedCard';

// Define the shape of a single account for TypeScript
interface IAccount {
  id: string;
  name: string;
  avatar: string;
  accountNo: string;
  currentBalance: number;
  status: 'active' | 'inactive' | 'closed';
  updatedAt: string;
  createdAt: string;
}

// This async function fetches data for ONE specific account
async function getAccountDetails(id: string): Promise<IAccount | null> {
  // ... (your existing getAccountDetails function remains the same)
  try {
    const res = await fetch(`https://684fa5d6e7c42cfd17955990.mockapi.io/api/account-details/accountDetails/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch account details:", error);
    return null;
  }
}

// The page component receives `params` which contains the dynamic route segments
export default async function AccountDetailsPage({ params }: { params: { id: string } }) {
  const account = await getAccountDetails(params.id);

  if (!account) {
    notFound();
  }

  const getStatusClasses = (status: IAccount['status']) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-yellow-100 text-yellow-800";
      case "closed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <AnimatedCard>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4 mb-6">
            <img src={account.avatar} alt={account.name} className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{account.name}</h1>
              <p className="text-md text-gray-500">{account.accountNo}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold text-gray-600">Status:</span>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClasses(account.status)}`}>
                {account.status}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold text-gray-600">Current Balance:</span>
              <span className="text-lg font-mono text-gray-800">
                ${Number(account.currentBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold text-gray-600">Last Updated:</span>
              <span className="text-gray-800">
                {new Date(account.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-semibold">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
}