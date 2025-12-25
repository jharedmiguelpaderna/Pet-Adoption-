'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Phone, Lock, Bell, Building, Shield, Activity, Camera, Save, PawPrint, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProfileSaveModal } from '../../components/ProfileSaveModal';
import { getUserProfilePicture, setUserProfilePicture, getCurrentUser, getAuthHeaders, API_ENDPOINTS, USE_MOCK_API } from '../../utils/api';

export function AdminAccountSettings() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Default initial form data (same for SSR and client initial render)
  const defaultFormData = {
    profilePicture: '',
    fullName: '',
    email: '',
    phone: '',
    role: 'Admin',
    emailNotifications: true,
    smsNotifications: true,
    systemAlerts: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  const [initialFormData, setInitialFormData] = useState(defaultFormData);
  const [formData, setFormData] = useState(defaultFormData);
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Set mounted flag on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load profile picture and user data from localStorage after component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Update form data with actual user data if available
      const currentUser = getCurrentUser();
      if (currentUser?.user) {
        const user = currentUser.user;
        const loadedData = {
          profilePicture: user.profile_picture || '',
          fullName: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          role: 'Admin',
          emailNotifications: true,
          smsNotifications: true,
          systemAlerts: true,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
        
        // Update both formData and initialFormData so comparison works correctly
        setFormData(loadedData);
        setInitialFormData(loadedData);
      }
    }
  }, []);

  // Check if form has changes
  useEffect(() => {
    const changed = Object.keys(formData).some(key => {
      // Skip password fields and role in change detection (but include profile picture)
      if (key === 'currentPassword' || key === 'newPassword' || key === 'confirmPassword' || key === 'role') {
        return false;
      }
      return formData[key as keyof typeof formData] !== initialFormData[key as keyof typeof initialFormData];
    });
    setHasChanges(changed);
  }, [formData, initialFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Create canvas to resize image
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Convert to compressed JPEG
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setFormData(prev => ({ ...prev, profilePicture: compressedDataUrl }));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Get current user
      const currentUser = getCurrentUser();
      if (!currentUser || currentUser.role !== 'admin') {
        alert('You must be logged in as an admin to update your profile.');
        return;
      }

      // Prepare update data - ALWAYS send all editable fields to backend
      const updateData: any = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone && formData.phone.trim() ? formData.phone.trim() : null,
        profile_picture: formData.profilePicture || null,
      };

      if (!USE_MOCK_API) {
        // Save to backend (self-update endpoint)
        let response;
        try {
          response = await fetch(API_ENDPOINTS.updateAdminSelf, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(updateData),
          });
        } catch (fetchError: any) {
          throw new Error(`Network error: ${fetchError.message || 'Unable to connect to server. Please check if your backend is running.'}`);
        }

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = { message: `Server error: ${response.status} ${response.statusText}` };
          }
          throw new Error(errorData.message || 'Failed to update profile');
        }

        // Update localStorage with new data
        const updatedUser = await response.json();
        localStorage.setItem('user_data', JSON.stringify(updatedUser));
      }
      
      // Update initialFormData to reflect saved state (works for both mock and real API)
      // This ensures hasChanges detection works correctly after save
      setInitialFormData({
        ...formData,
        // Reset password fields after save
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      // Show success modal
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error('Error saving profile:', error);
      alert(error.message || 'Failed to save profile. Please try again.');
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setIsEditingPassword(false);
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  // Mock managed shelters
  const managedShelters = [
    { id: 1, name: 'Happy Paws Animal Shelter', location: 'San Francisco, CA', pets: 45 },
    { id: 2, name: 'Loving Hearts Rescue', location: 'Los Angeles, CA', pets: 32 },
    { id: 3, name: 'Safe Haven Pet Sanctuary', location: 'San Diego, CA', pets: 28 }
  ];

  // Mock activity log
  const activityLog = [
    { id: 1, action: 'Updated pet information', details: 'Modified details for Max', timestamp: '2024-12-15 14:30' },
    { id: 2, action: 'Approved adoption request', details: 'Approved request #1234 for Luna', timestamp: '2024-12-15 12:15' },
    { id: 3, action: 'Added new pet', details: 'Registered Charlie to the system', timestamp: '2024-12-14 16:45' },
    { id: 4, action: 'Logged vet visit', details: 'Recorded vet visit for Bella', timestamp: '2024-12-14 10:20' },
    { id: 5, action: 'Updated shelter info', details: 'Modified Happy Paws shelter details', timestamp: '2024-12-13 09:00' }
  ];

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-lg font-['Poppins']">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-100 rounded-full blur-2xl opacity-40"></div>

      {/* Paw Print Decorations */}
      <div className="absolute top-40 right-20 text-orange-200 opacity-20">
        <PawPrint className="w-16 h-16" />
      </div>
      <div className="absolute bottom-40 left-20 text-orange-200 opacity-20">
        <PawPrint className="w-12 h-12" />
      </div>
      <div className="absolute top-60 left-1/3 text-orange-200 opacity-15">
        <PawPrint className="w-10 h-10" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 text-orange-200 opacity-15">
        <PawPrint className="w-14 h-14" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-[#fd7e14] transition-colors mb-4 font-['Poppins']"
            suppressHydrationWarning
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-[#fd7e14] to-[#ff9247] p-4 rounded-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-['Poppins'] text-4xl text-black">Admin Account Settings</h1>
              <p className="font-['Poppins'] text-gray-600">Manage your administrative account and preferences</p>
            </div>
          </div>
        </div>

        {/* Account Status Banner */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-3xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-full">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-['Poppins'] text-black">Account Status</p>
                <p className="font-['Poppins'] text-sm text-green-700">Active - Full Administrative Access</p>
              </div>
            </div>
            <span className="px-4 py-2 bg-green-500 text-white rounded-full font-['Poppins'] text-sm">
              Active
            </span>
          </div>
        </div>

        {/* Profile Picture Section */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 mb-6">
          <h2 className="font-['Poppins'] text-2xl text-black mb-6">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              {formData.profilePicture ? (
                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#fd7e14]"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-[#fd7e14] flex items-center justify-center border-4 border-[#fd7e14]">
                  <User className="w-16 h-16 text-white" />
                </div>
              )}
              <button 
                type="button"
                onClick={() => document.getElementById('adminProfilePictureInput')?.click()}
                className="absolute bottom-0 right-0 bg-[#fd7e14] p-2 rounded-full text-white hover:bg-[#e8590c] transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div>
              <p className="font-['Poppins'] text-gray-700 mb-2">Upload a new profile picture</p>
              <input
                id="adminProfilePictureInput"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="text-sm font-['Poppins'] text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 mb-6">
            <h2 className="font-['Poppins'] text-2xl text-black mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 font-['Poppins'] text-gray-700 mb-2">
                  <User className="w-4 h-4 text-[#fd7e14]" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins']"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-['Poppins'] text-gray-700 mb-2">
                  <Mail className="w-4 h-4 text-[#fd7e14]" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins']"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-['Poppins'] text-gray-700 mb-2">
                  <Phone className="w-4 h-4 text-[#fd7e14]" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins']"
                  suppressHydrationWarning
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-['Poppins'] text-gray-700 mb-2">
                  <Shield className="w-4 h-4 text-[#fd7e14]" />
                  Role / Permissions (View Only)
                </label>
                <input
                  type="text"
                  value={formData.role}
                  disabled
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl bg-gray-50 text-gray-600 font-['Poppins'] cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={!hasChanges}
                className={`flex items-center gap-2 px-8 py-3 rounded-2xl transition-all duration-300 shadow-lg font-['Poppins'] ${
                  hasChanges
                    ? 'bg-[#fd7e14] hover:bg-[#e8590c] text-white hover:shadow-xl cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </form>

        {/* Security Settings */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Poppins'] text-2xl text-black">Security</h2>
            {!isEditingPassword && (
              <button
                onClick={() => setIsEditingPassword(true)}
                className="flex items-center gap-2 text-[#fd7e14] hover:text-[#e8590c] font-['Poppins'] transition-colors"
                suppressHydrationWarning
              >
                <Lock className="w-4 h-4" />
                Change Password
              </button>
            )}
          </div>

          {isEditingPassword && (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 font-['Poppins'] text-gray-700 mb-2">
                  <Lock className="w-4 h-4 text-[#fd7e14]" />
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins']"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-['Poppins'] text-gray-700 mb-2">
                  <Lock className="w-4 h-4 text-[#fd7e14]" />
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins']"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-['Poppins'] text-gray-700 mb-2">
                  <Lock className="w-4 h-4 text-[#fd7e14]" />
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins']"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingPassword(false);
                    setFormData(prev => ({
                      ...prev,
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    }));
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl hover:bg-gray-300 transition-colors font-['Poppins']"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#fd7e14] hover:bg-[#e8590c] text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl font-['Poppins']"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 mb-6">
          <h2 className="flex items-center gap-2 font-['Poppins'] text-2xl text-black mb-6">
            <Bell className="w-6 h-6 text-[#fd7e14]" />
            Notification Preferences
          </h2>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#fd7e14]" />
                <div>
                  <p className="font-['Poppins'] text-black">Email Notifications</p>
                  <p className="font-['Poppins'] text-sm text-gray-600">Receive updates about system activities via email</p>
                </div>
              </div>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleChange}
                className="w-6 h-6 text-[#fd7e14] rounded focus:ring-[#fd7e14]"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#fd7e14]" />
                <div>
                  <p className="font-['Poppins'] text-black">System Alerts</p>
                  <p className="font-['Poppins'] text-sm text-gray-600">Get notified about critical system events and errors</p>
                </div>
              </div>
              <input
                type="checkbox"
                name="systemAlerts"
                checked={formData.systemAlerts}
                onChange={handleChange}
                className="w-6 h-6 text-[#fd7e14] rounded focus:ring-[#fd7e14]"
              />
            </label>
          </div>
        </div>

        {/* Managed Shelters */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 mb-6">
          <h2 className="flex items-center gap-2 font-['Poppins'] text-2xl text-black mb-6">
            <Building className="w-6 h-6 text-[#fd7e14]" />
            Managed Shelters
          </h2>

          <div className="space-y-4">
            {managedShelters.map((shelter) => (
              <div
                key={shelter.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => router.push(`/admin/shelter/${shelter.id}`)}
              >
                <div>
                  <p className="font-['Poppins'] text-black">{shelter.name}</p>
                  <p className="font-['Poppins'] text-sm text-gray-600">{shelter.location}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 bg-orange-100 text-[#fd7e14] rounded-full font-['Poppins'] text-sm">
                    {shelter.pets} pets
                  </span>
                  <Eye className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
          <h2 className="flex items-center gap-2 font-['Poppins'] text-2xl text-black mb-6">
            <Activity className="w-6 h-6 text-[#fd7e14]" />
            Recent Activity
          </h2>

          <div className="space-y-3">
            {activityLog.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="bg-[#fd7e14] p-2 rounded-full mt-1">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-['Poppins'] text-black">{log.action}</p>
                  <p className="font-['Poppins'] text-sm text-gray-600">{log.details}</p>
                  <p className="font-['Poppins'] text-xs text-gray-500 mt-1">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Success Modal */}
      <ProfileSaveModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onRedirect={() => router.push('/admin')}
      />
    </div>
  );
}





