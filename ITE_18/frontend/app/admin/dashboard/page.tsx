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
  // Initialize from local auth snapshot to avoid calling setState during effect
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const u = getCurrentUser();
    return (u && u.role) ? u.role : 'admin';
  });
  const { refreshNotifications } = useNotifications();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }
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

