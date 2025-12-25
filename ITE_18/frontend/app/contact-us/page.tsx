'use client';

import { ContactUsPage } from '../_pages/ContactUsPage';
import { Layout } from '../../components/Layout';
import { checkAuthentication, logout } from '../../utils/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { UserRole } from '../../components/AuthPage';

export default function ContactUs() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { authenticated, user } = checkAuthentication();
    
    if (authenticated && user) {
      setUserRole(user.role);
      setIsAuthenticated(true);
    } else {
      router.push('/');
      return;
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
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
    return null; // Will redirect to login
  }

  return (
    <Layout onLogout={handleLogout} userRole={userRole}>
      <ContactUsPage />
    </Layout>
  );
}

