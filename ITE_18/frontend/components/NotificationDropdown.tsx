'use client';

import { useEffect, useRef } from 'react';
import { CheckCircle, Clock, Calendar, XCircle, Bell, FileText, Home, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useNotifications } from '../contexts/NotificationContext';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: 'admin' | 'adopter';
  userId?: number;
}

export function NotificationDropdown({ isOpen, onClose, userRole = 'adopter', userId = 1 }: NotificationDropdownProps) {
  const router = useRouter();
  const { notifications: allNotifications, markAsRead, markAllAsRead, getNotificationsByRole } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter notifications for the current user role
  const notifications = getNotificationsByRole(userRole, userId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.notification_id);
    
    if (userRole === 'admin') {
      // Admin notification redirects
      switch (notification.type) {
        case 'adoption_request':
          router.push('/admin/adoption-requests');
          break;
        case 'adoption_approved':
        case 'adoption_declined':
          router.push('/admin/adoption-requests');
          break;
        case 'pet_adopted':
          router.push('/admin/pets');
          break;
        case 'shelter_created':
        case 'shelter_updated':
          if (notification.related_id) {
            router.push(`/admin/shelter/${notification.related_id}`);
          } else {
            router.push('/admin/shelters');
          }
          break;
        case 'vet_visit':
          router.push('/admin/vet-visits');
          break;
        case 'profile_updated':
          router.push('/admin/dashboard');
          break;
        default:
          router.push('/admin/dashboard');
      }
    } else {
      // Adopter notification redirects
      switch (notification.type) {
        case 'approved':
        case 'pending':
        case 'declined':
        case 'interview_scheduled':
          // Redirect to pet detail page
          if (notification.pet_id) {
            router.push(`/pet/${notification.pet_id}`);
          }
          break;
        default:
          router.push('/browse-pets');
      }
    }
    
    onClose();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'approved':
      case 'adoption_approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'interview_scheduled':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'declined':
      case 'adoption_declined':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'adoption_request':
        return <FileText className="w-5 h-5 text-[#fd7e14]" />;
      case 'pet_adopted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'shelter_created':
      case 'shelter_updated':
        return <Home className="w-5 h-5 text-blue-500" />;
      case 'vet_visit':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'profile_updated':
        return <Users className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown time';
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      // Format as absolute time with date, time, and minutes
      // Example: "Dec 16, 2025 at 2:30 PM"
      const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
      
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      return `${formattedDate} at ${formattedTime}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-[calc(100%+8px)] right-0 w-[360px] bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] overflow-hidden animate-slideDown z-[200]"
      style={{
        animation: 'slideDown 0.3s ease-out forwards'
      }}
    >
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-['Poppins'] text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <p className="font-['Poppins'] text-xs text-gray-500 mt-0.5">
                {unreadCount} unread
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-2 py-1 text-xs text-[#fd7e14] hover:bg-[#fd7e14] hover:text-white rounded-md font-['Poppins'] transition-all duration-300 border border-[#fd7e14]"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[400px] overflow-y-auto overflow-x-hidden scrollbar-custom">
        <style>{`
          .scrollbar-custom::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar-custom::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .scrollbar-custom::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 3px;
          }
          .scrollbar-custom::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        `}</style>
        {notifications.length > 0 ? (
          <div>
            {notifications.map((notification, index) => (
              <div
                key={notification.notification_id}
                className={`px-4 py-3 cursor-pointer transition-all duration-200 relative ${
                  notification.is_read ? 'bg-white hover:bg-gray-50' : 'bg-[#fff5f0] hover:bg-[#ffe8d9]'
                } ${index !== notifications.length - 1 ? 'border-b border-gray-100' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-['Poppins'] text-xs ${notification.is_read ? 'text-gray-700' : 'text-black'} leading-relaxed`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="font-['Poppins'] text-[10px] text-[#fd7e14]">
                        {formatDate(notification.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Unread indicator dot */}
                  {!notification.is_read && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-[#fd7e14] rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 px-4">
            <Bell className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="font-['Poppins'] text-sm text-gray-600">No notifications yet</p>
            <p className="font-['Poppins'] text-xs text-gray-500 mt-1">
              {userRole === 'admin' 
                ? "You'll be notified about new adoption requests and updates"
                : "You'll be notified about updates to your adoption requests"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
