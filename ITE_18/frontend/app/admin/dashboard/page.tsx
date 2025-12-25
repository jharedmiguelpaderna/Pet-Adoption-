'use client';

import { AdminDashboardPage } from '../../_pages/AdminDashboardPage';
import { Layout } from '../../../components/Layout';
import { getCurrentUser, logout } from '../../../utils/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { UserRole } from '../../../components/AuthPage';
import { useNotifications } from '../../../contexts/NotificationContext';

export default function AdminDashboard() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const { refreshNotifications } = useNotifications();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }
    setUserRole(user.role);
    // Immediately refresh notifications when admin navigates to dashboard
    refreshNotifications();
  }, [router, refreshNotifications]);

  const handleLogout = async () => {
    try {
      await logout();
      // Use window.location for a full page reload to clear all state
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local data and redirect
      window.location.href = '/';
    }
  };

  return (
    <Layout onLogout={handleLogout} userRole={userRole}>
      <AdminDashboardPage />
    </Layout>
  );
}

