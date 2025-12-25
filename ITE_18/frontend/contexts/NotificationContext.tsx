'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { API_ENDPOINTS, getAuthHeaders, USE_MOCK_API } from '../utils/api';
import { getCurrentUser } from '../utils/api';

export interface Notification {
  notification_id: number;
  adopter_id?: number;
  admin_id?: number;
  pet_id?: number;
  pet_name?: string;
  type: 'approved' | 'pending' | 'interview_scheduled' | 'declined' | 'adoption_request' | 'adoption_approved' | 'adoption_declined' | 'pet_adopted' | 'shelter_created' | 'shelter_updated' | 'vet_visit' | 'profile_updated';
  message: string;
  created_at: string;
  is_read: boolean;
  related_id?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'notification_id' | 'created_at' | 'is_read'>) => void;
  markAsRead: (notificationId: number) => void;
  markAllAsRead: () => void;
  clearBadge: () => void;
  getNotificationsByRole: (role: 'admin' | 'adopter', userId: number) => Notification[];
  refreshNotifications: () => Promise<void>;
}

interface ShelterApi {
  shelter_id: number;
  admin_id: number;
}

interface AdoptionRequestApi {
  request_id: number;
  adopter_id: number;
  pet_id: number;
  adoption_status?: string;
  application_date?: string;
  created_at?: string;
  notes?: string | null;
  pet?: {
    shelter_id?: number;
    name?: string;
  } | null;
  adopter?: {
    name?: string | null;
  } | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [badgeCleared, setBadgeCleared] = useState(false);

  // --- Helpers for persisting read state per user (role + id) ---
  const getReadStorageKey = () => {
    const current = getCurrentUser();
    if (!current || !current.user) return null;
    const role = current.role;
    const userId = current.user?.admin_id || current.user?.adopter_id || current.user?.id;
    if (!userId) return null;
    return `notifications_read_${role}_${userId}`;
  };

  const loadReadIds = (): number[] => {
    try {
      const key = getReadStorageKey();
      if (!key || typeof window === 'undefined') return [];
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((id) => typeof id === 'number');
      }
      return [];
    } catch (error) {
      console.error('Error loading read notification IDs:', error);
      return [];
    }
  };

  const saveReadIds = (ids: number[]) => {
    try {
      const key = getReadStorageKey();
      if (!key || typeof window === 'undefined') return;
      const uniqueIds = Array.from(new Set(ids.filter((id) => typeof id === 'number')));
      localStorage.setItem(key, JSON.stringify(uniqueIds));
    } catch (error) {
      console.error('Error saving read notification IDs:', error);
    }
  };

  // Fetch notifications from backend
  const fetchNotifications = useCallback(async () => {
    if (USE_MOCK_API) {
      // Load from localStorage for mock mode
      const storedNotifications = localStorage.getItem('app_notifications');
      if (storedNotifications) {
        try {
          setNotifications(JSON.parse(storedNotifications));
        } catch (error) {
          console.error('Error loading notifications:', error);
        }
      }
      return;
    }

    try {
      const user = getCurrentUser();
      if (!user) {
        // No user logged in, clear notifications
        setNotifications([]);
        return;
      }

      let transformedNotifications: Notification[] = [];
      const readIds = loadReadIds();

      if (user.role === 'admin') {
        // Admin: Fetch adoption requests as notifications (only for their shelters)
        const adminId = user.user?.admin_id || user.user?.id;
        
        // First, fetch admin's shelters
        const sheltersResponse = await fetch(API_ENDPOINTS.shelters, {
          method: 'GET',
          headers: getAuthHeaders(),
        });

        if (!sheltersResponse.ok) {
          return;
        }

        const allShelters: ShelterApi[] = await sheltersResponse.json();
        const adminShelters = allShelters.filter((shelter) => shelter.admin_id === adminId);
        const adminShelterIds = adminShelters.map((shelter) => shelter.shelter_id);

        // Fetch all adoption requests
        const response = await fetch(API_ENDPOINTS.adoptions, {
          method: 'GET',
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          if (response.status === 404 || response.status === 401) {
            return;
          }
          throw new Error('Failed to fetch notifications');
        }

        const allRequests: AdoptionRequestApi[] = await response.json();
        
        // Filter requests to only show those for pets in admin's shelters
        const adminRequests = allRequests.filter((request) => {
          return request.pet?.shelter_id && adminShelterIds.includes(request.pet.shelter_id);
        });
        
        transformedNotifications = adminRequests.map((request) => {
          const status = (request.adoption_status || '').toLowerCase();
          let type: Notification['type'] = 'adoption_request';
          let message = '';

          // Admin notifications: Show when someone requests to adopt their pet
          if (status === 'pending' || !status) {
            // New adoption request - this is what admin should see
            type = 'adoption_request';
            const adopterName = request.adopter?.name || 'An adopter';
            message = `${adopterName} wants to adopt ${request.pet?.name || 'your pet'}. Review their application and respond.`;
          } else if (status === 'approved') {
            // Request was approved (admin already knows this since they approved it)
            type = 'adoption_approved';
            message = `You approved the adoption request for ${request.pet?.name || 'a pet'}.`;
          } else if (status === 'declined' || status === 'rejected') {
            // Request was declined (admin already knows this since they declined it)
            type = 'adoption_declined';
            message = `You declined the adoption request for ${request.pet?.name || 'a pet'}.`;
          }

          const notificationId = request.request_id;

          // Use application_date as the base timestamp
          // If it's just a date (YYYY-MM-DD), convert it to a full datetime
          let notificationTimestamp = request.application_date || request.created_at || new Date().toISOString();
          
          // If the timestamp is just a date (no time component), add a default time
          if (notificationTimestamp && notificationTimestamp.length === 10 && notificationTimestamp.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // It's a date-only string, convert to full datetime (use start of day)
            notificationTimestamp = `${notificationTimestamp}T00:00:00.000Z`;
          }

          return {
            notification_id: notificationId,
            adopter_id: request.adopter_id,
            admin_id: adminId,
            pet_id: request.pet_id,
            pet_name: request.pet?.name || 'Unknown Pet',
            type,
            message,
            created_at: notificationTimestamp,
            is_read: readIds.includes(notificationId),
            related_id: request.request_id,
          };
        });
      } else if (user.role === 'adopter') {
        // Adopter: Fetch their own adoption requests using the adopter-specific endpoint
        const adopterId = user.user?.adopter_id || user.user?.id;
        if (!adopterId) {
          console.log('NotificationContext: No adopter ID found');
          return;
        }

        // Use the adopter-specific endpoint to get only their own requests
        const response = await fetch(API_ENDPOINTS.myAdoptions, {
          method: 'GET',
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          // Silently fail for adopters - they might not have any requests yet
          console.log('NotificationContext: Failed to fetch adoption requests for adopter:', response.status);
          return;
        }

        const adopterRequests: AdoptionRequestApi[] = await response.json();
        
        console.log('NotificationContext: Found', adopterRequests.length, 'adoption requests for adopter', adopterId);
        
        transformedNotifications = adopterRequests.map((request) => {
          const status = request.adoption_status?.toLowerCase();
          let type: Notification['type'] = 'pending';
          let message = '';

          // Adopter notifications: Show updates about their own requests
          if (status === 'approved') {
            type = 'adoption_approved';
            message = `🎉 Great news! Your adoption request for ${request.pet?.name || 'a pet'} has been approved!`;
            if (request.notes) {
              message += ` ${request.notes}`;
            }
          } else if (status === 'declined' || status === 'rejected') {
            type = 'adoption_declined';
            message = `Your adoption request for ${request.pet?.name || 'a pet'} was not approved at this time.`;
            if (request.notes) {
              message += ` Reason: ${request.notes}`;
            }
          } else {
            // Pending status
            type = 'pending';
            message = `Your adoption request for ${request.pet?.name || 'a pet'} is being reviewed by the shelter.`;
            if (request.notes) {
              message += ` Note: ${request.notes}`;
            }
          }

          const notificationId = request.request_id;

          // Use application_date as the base timestamp
          // If it's just a date (YYYY-MM-DD), convert it to a full datetime
          let notificationTimestamp = request.application_date || request.created_at || new Date().toISOString();
          
          // If the timestamp is just a date (no time component), add a default time
          if (notificationTimestamp && notificationTimestamp.length === 10 && notificationTimestamp.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // It's a date-only string, convert to full datetime (use start of day)
            notificationTimestamp = `${notificationTimestamp}T00:00:00.000Z`;
          }

          return {
            notification_id: notificationId,
            adopter_id: request.adopter_id,
            pet_id: request.pet_id,
            pet_name: request.pet?.name || 'Unknown Pet',
            type: type,
            message: message,
            created_at: notificationTimestamp,
            is_read: readIds.includes(notificationId),
            related_id: request.request_id,
          };
        });
      }

      setNotifications(transformedNotifications);
    } catch (error) {
      // Silently handle errors - don't crash the app
      console.log('Notifications fetch skipped or failed:', error instanceof Error ? error.message : 'Unknown error');
      // Don't throw or show errors to user - notifications are not critical
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Refresh notifications when tab becomes visible (user switches back to the tab)
  // This ensures admins see new notifications when they return to the browser
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const currentUser = getCurrentUser();
        if (currentUser) {
          fetchNotifications();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchNotifications]);

  // Save notifications to localStorage whenever they change (for mock mode)
  useEffect(() => {
    if (USE_MOCK_API) {
      localStorage.setItem('app_notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'notification_id' | 'created_at' | 'is_read'>) => {
    const newNotification: Notification = {
      ...notification,
      notification_id: Date.now(), // Use timestamp as unique ID (not persisted on backend)
      created_at: new Date().toISOString(),
      is_read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
    setBadgeCleared(false); // Reset badge cleared state when new notification arrives
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(prev => {
      const updated = prev.map(n =>
        n.notification_id === notificationId ? { ...n, is_read: true } : n
      );
      // Persist read IDs
      const currentRead = loadReadIds();
      if (!currentRead.includes(notificationId)) {
        saveReadIds([...currentRead, notificationId]);
      }
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, is_read: true }));
      const allIds = updated.map(n => n.notification_id);
      saveReadIds(allIds);
      return updated;
    });
  };

  const clearBadge = () => {
    setBadgeCleared(true);
  };

  // Memoize refreshNotifications to prevent unnecessary re-renders
  const refreshNotifications = useCallback(async () => {
    await fetchNotifications();
  }, [fetchNotifications]);

  const getNotificationsByRole = (role: 'admin' | 'adopter', userId: number) => {
    if (role === 'admin') {
      // Admin should only see notifications explicitly targeted to them (matching admin_id)
      // Exclude notifications that have adopter_id but no admin_id (those are for adopters)
      return notifications.filter(n => n.admin_id === userId && (!n.adopter_id || n.admin_id === userId));
    }
    
    // Adopter sees only their own notifications (matching adopter_id)
    // Exclude notifications that have admin_id but no adopter_id (those are for admins)
    return notifications.filter(n => n.adopter_id === userId && !n.admin_id);
  };

  // Calculate unread count - if badge was cleared, count is 0 until new notification arrives
  // Note: This is a global count. For user-specific counts, use getNotificationsByRole and filter
  const unreadCount = badgeCleared ? 0 : notifications.filter(n => !n.is_read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearBadge,
        getNotificationsByRole,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
