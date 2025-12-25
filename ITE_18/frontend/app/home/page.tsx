'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Homepage from '../../imports/Homepage';
import { Layout } from '../../components/Layout';
import { checkAuthentication, logout } from '../../utils/api';
import type { UserRole } from '../../components/AuthPage';
import { useNotifications } from '../../contexts/NotificationContext';

export default function HomeLanding() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { refreshNotifications } = useNotifications();

  useEffect(() => {
    const { authenticated, user } = checkAuthentication();

    if (authenticated && user) {
      setUserRole(user.role);
      setIsAuthenticated(true);
      // Immediately refresh notifications when user logs in or navigates to home
      refreshNotifications();
    } else {
      // Not authenticated - go back to login
      router.push('/');
      return;
    }
    setIsLoading(false);
  }, [router, refreshNotifications]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      window.location.href = '/';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !userRole) {
    return null; // will redirect to login
  }

  return (
    <Layout onLogout={handleLogout} userRole={userRole}>
      <Homepage userRole={userRole} />
    </Layout>
  );
}
