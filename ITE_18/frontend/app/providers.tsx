'use client';

import { PetsProvider } from '../contexts/PetsContext';
import { NotificationProvider } from '../contexts/NotificationContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PetsProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </PetsProvider>
  );
}

