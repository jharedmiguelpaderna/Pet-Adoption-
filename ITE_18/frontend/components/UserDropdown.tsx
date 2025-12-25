'use client';

import { useEffect, useRef, useState } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getUserProfilePicture, getCurrentUser } from '../utils/api';

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  userEmail?: string;
  userRole?: 'admin' | 'adopter';
}

export function UserDropdown({ isOpen, onClose, onLogout, userEmail = "user@example.com", userRole = 'adopter' }: UserDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(null);
  const [displayEmail, setDisplayEmail] = useState<string>(userEmail);

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

  // Load profile picture on mount and listen for changes
  useEffect(() => {
    const loadProfilePicture = () => {
      const currentUser = getCurrentUser();
      const profilePic = currentUser?.user?.profile_picture || '';
      setUserProfilePicture(profilePic);
    };

    loadProfilePicture();

    // Listen for profile picture updates from other components
    window.addEventListener('profilePictureUpdated', loadProfilePicture);
    return () => {
      window.removeEventListener('profilePictureUpdated', loadProfilePicture);
    };
  }, []);

  // Get current user email
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser?.user?.email) {
      setDisplayEmail(currentUser.user.email);
    }
  }, []);

  if (!isOpen) return null;

  const handleAccountSettings = () => {
    if (userRole === 'admin') {
      router.push('/admin/account-settings');
    } else {
      router.push('/adopter/account-settings');
    }
    onClose();
  };

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-[calc(100%+12px)] w-[280px] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-slideDown"
      style={{
        animation: 'slideDown 0.2s ease-out'
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

      {/* User Info Header */}
      <div className="bg-gradient-to-r from-[#fd7e14] to-[#ff9247] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
            {userProfilePicture ? (
              <img
                src={userProfilePicture}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-[#fd7e14]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-['Poppins'] text-white truncate">Welcome!</p>
            <p className="font-['Poppins'] text-white text-sm opacity-90 truncate">{displayEmail}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {/* Profile Settings */}
        <button
          onClick={handleAccountSettings}
          className="w-full px-5 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-['Poppins'] text-black">Account Settings</p>
            <p className="font-['Poppins'] text-gray-500 text-xs">Manage your profile</p>
          </div>
        </button>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-2"></div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full px-5 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors duration-200 group"
        >
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
            <LogOut className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-['Poppins'] text-red-600">Logout</p>
            <p className="font-['Poppins'] text-red-500 text-xs">Sign out of your account</p>
          </div>
        </button>
      </div>
    </div>
  );
}