'use client';

import { useRouter } from 'next/navigation';
import { getCurrentUser, logout } from '../../utils/api';
import { Layout } from '../../components/Layout';
import { AdminDashboardPage } from '../_pages/AdminDashboardPage';
import { useEffect, useState } from 'react';
import type { UserRole } from '../../components/AuthPage';

export default function AdminPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole>('admin');

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      router.push('/');
    } else {
      setUserRole('admin');
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      router.push('/');
    }
  };

  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <Layout onLogout={handleLogout} userRole={userRole}>
      <AdminDashboardPage />
    </Layout>
  );
}
