'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
// --- THIS IS THE FIX ---
// Import the IAccount type from the shared types file.
import { IAccount } from '@/types'; 
import AccountTable from './AccountTable';

interface DashboardClientPageProps {
  accounts: IAccount[];
}

export default function DashboardClientPage({ accounts }: DashboardClientPageProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; 
  }

  // If authenticated, render the dashboard
  return (
    <div>
      {/* 
        This component no longer needs the h1, as it's now inside the AccountTable 
        for better layout control with the fixed height.
      */}
      {/* <AccountTable accounts={accounts} companyName={''} /> */}
      <AccountTable  />
    </div>
  );
}