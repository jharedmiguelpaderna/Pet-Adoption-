'use client';

import { ArrowLeft, Save, Home } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SuccessBanner } from '../../components/SuccessBanner';
import { API_ENDPOINTS, getAuthHeaders, USE_MOCK_API, getCurrentUser } from '../../utils/api';

interface ShelterFormData {
  shelter_name: string;
  staff_name: string;
  staff_email: string;
  staff_phone: string;
  location: string;
  contact_info: string;
}

export function AddShelterPage() {
  const router = useRouter();
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const initialForm = useMemo<ShelterFormData>(() => ({
    shelter_name: '',
    staff_name: '',
    staff_email: '',
    staff_phone: '',
    location: '',
    contact_info: ''
  }), []);

  const [formData, setFormData] = useState<ShelterFormData>(() => ({ ...initialForm }));
  const [initialSnapshot, setInitialSnapshot] = useState<ShelterFormData>(() => ({ ...initialForm }));

  const hasChanges = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialSnapshot);
  }, [formData, initialSnapshot]);

  type ShelterCreatePayload = {
    admin_id: number;
    shelter_name: string;
    staff_name: string | null;
    staff_email: string | null;
    staff_phone: string | null;
    location: string | null;
    contact_info: string | null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasChanges) {
      return;
    }

    try {
      // Get current admin user to set admin_id
      const currentUser = getCurrentUser();
      if (!currentUser || currentUser.role !== 'admin') {
        alert('You must be logged in as an admin to create a shelter.');
        return;
      }

      const backendData: ShelterCreatePayload = {
        admin_id: currentUser.user.admin_id || currentUser.user.id,
        shelter_name: formData.shelter_name,
        staff_name: formData.staff_name || null,
        staff_email: formData.staff_email || null,
        staff_phone: formData.staff_phone || null,
        location: formData.location || null,
        contact_info: formData.contact_info || null,
      };

      if (!USE_MOCK_API) {
        const response = await fetch(API_ENDPOINTS.shelters, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(backendData),
        });

        if (!response.ok) {
          throw new Error(`Failed to create shelter: ${response.statusText}`);
        }

        // Shelter created successfully
      } else {
        // Mock mode - just log
        console.log('New shelter data:', formData);
      }
      
      // Show success banner
      setShowSuccessBanner(true);

      // Prevent further edits while redirecting
      setInitialSnapshot({ ...formData });
      
      // Redirect to shelters page after a short delay
      setTimeout(() => {
        router.push('/admin/shelters');
      }, 1500);
    } catch (error) {
      console.error('Error creating shelter:', error);
      alert('Failed to create shelter. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#fd7e14] to-[#ff9247] opacity-3 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Home Icon Pattern Decorations */}
      <div className="absolute top-20 left-10 text-[#fd7e14] opacity-10 pointer-events-none">
        <Home className="w-16 h-16" />
      </div>
      <div className="absolute top-40 right-20 text-[#fd7e14] opacity-10 pointer-events-none">
        <Home className="w-12 h-12" />
      </div>
      <div className="absolute bottom-40 left-1/4 text-[#fd7e14] opacity-10 pointer-events-none">
        <Home className="w-20 h-20" />
      </div>

      {/* Success Banner */}
      {showSuccessBanner && (
        <SuccessBanner
          message="Shelter added successfully!"
          onClose={() => setShowSuccessBanner(false)}
        />
      )}

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/admin/shelters')}
              className="flex items-center gap-2 text-gray-600 hover:text-[#fd7e14] transition-colors duration-300 font-['Poppins'] mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Manage Shelters
            </button>
            <h1 className="font-['Poppins'] text-4xl text-black mb-2">Add New Shelter</h1>
            <p className="font-['Poppins'] text-gray-600">Fill in the information to register a new shelter in the system</p>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="font-['Poppins'] text-xl text-black mb-4">Shelter Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="shelter_name" className="font-['Poppins'] text-black mb-2 block">
                        Shelter Name *
                      </label>
                      <input
                        type="text"
                        id="shelter_name"
                        name="shelter_name"
                        value={formData.shelter_name}
                        onChange={handleChange}
                        required
                        maxLength={255}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                        placeholder="e.g., Happy Paws Animal Shelter"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="location" className="font-['Poppins'] text-black mb-2 block">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        maxLength={255}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                        placeholder="e.g., 123 Main Street, San Francisco, CA 94102"
                      />
                    </div>
                  </div>
                </div>

                {/* Staff Information */}
                <div>
                  <h3 className="font-['Poppins'] text-xl text-black mb-4">Staff Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="staff_name" className="font-['Poppins'] text-black mb-2 block">
                        Staff Name
                      </label>
                      <input
                        type="text"
                        id="staff_name"
                        name="staff_name"
                        value={formData.staff_name}
                        onChange={handleChange}
                        maxLength={255}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                        placeholder="e.g., John Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="staff_email" className="font-['Poppins'] text-black mb-2 block">
                        Staff Email
                      </label>
                      <input
                        type="email"
                        id="staff_email"
                        name="staff_email"
                        value={formData.staff_email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                        placeholder="e.g., john@shelter.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="staff_phone" className="font-['Poppins'] text-black mb-2 block">
                        Staff Phone
                      </label>
                      <input
                        type="tel"
                        id="staff_phone"
                        name="staff_phone"
                        value={formData.staff_phone}
                        onChange={handleChange}
                        maxLength={30}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                        placeholder="e.g., (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <label htmlFor="contact_info" className="font-['Poppins'] text-black mb-2 block">
                    Additional Contact Information
                  </label>
                  <textarea
                    id="contact_info"
                    name="contact_info"
                    value={formData.contact_info}
                    onChange={handleChange}
                    maxLength={255}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] resize-none"
                    placeholder="e.g., Open Monday-Friday 9am-5pm, Saturday 10am-4pm"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => router.push('/admin/shelters')}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-['Poppins'] hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!hasChanges}
                  className={`flex-1 py-3 rounded-xl font-['Poppins'] transition-all duration-300 flex items-center justify-center gap-2 ${
                    hasChanges
                      ? 'bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Save className="w-5 h-5" />
                  Add Shelter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}





