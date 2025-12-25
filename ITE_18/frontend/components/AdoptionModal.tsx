'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import { SuccessModal } from './SuccessModal';
import { addAdoptionApplication } from '../utils/petStorage';
import { useNotifications } from '../contexts/NotificationContext';
import { getCurrentUser, getAuthHeaders, API_ENDPOINTS, USE_MOCK_API } from '../utils/api';
import { getAdminIdForPet, getPetInfo } from '../utils/adoptionNotifications';

interface AdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  petName: string;
  petId: number;
}

export function AdoptionModal({ isOpen, onClose, petName, petId }: AdoptionModalProps) {
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [meetGreet, setMeetGreet] = useState<'yes' | 'no'>('no');
  const [reasonForAdoption, setReasonForAdoption] = useState('');
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { refreshNotifications } = useNotifications();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      // Get current adopter info
      const currentUser = getCurrentUser();
      if (!currentUser || currentUser.role !== 'adopter') {
        setError('You must be logged in as an adopter to submit adoption requests.');
        setIsSubmitting(false);
        return;
      }

      const adopterId = currentUser.user?.id || currentUser.user?.adopter_id;
      if (!adopterId) {
        setError('Unable to identify your account. Please log in again.');
        setIsSubmitting(false);
        return;
      }

      // Prepare adoption data
      // Store full datetime for accurate timestamp tracking
      const now = new Date();
      const adoptionData = {
        adopter_id: adopterId,
        pet_id: petId,
        application_date: now.toISOString().split('T')[0], // Date only for backend compatibility
        online_interview_date: interviewDate || null,
        online_interview_time: interviewTime || null,
        meet_greet: meetGreet === 'yes' ? 'Yes' : 'No',
        reason_for_adoption: reasonForAdoption || null,
        adoption_status: 'Pending',
        notes: notes || null,
      };

      // Local/mock helpers

      if (USE_MOCK_API) {
        // Mock mode: use mock data (store application locally)
        addAdoptionApplication(petId, petName);
      } else {
        // Real API: Submit to backend
        const response = await fetch(API_ENDPOINTS.adoptions, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(adoptionData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to submit adoption request' }));
          throw new Error(errorData.message || 'Failed to submit adoption request');
        }

        await response.json();
      }

      // IMPORTANT: Do NOT create admin notification here when adopter submits
      // Admin notifications are fetched from backend when admin views their notifications
      
      // IMPORTANT: Do NOT add local notification here - let refreshNotifications fetch from backend
      // This ensures the notification uses the correct request_id from backend and matches
      // what will be shown on page refresh. The backend will return the newly created request
      // with status "Pending", which will be converted to a notification automatically.
      
      // Refresh notifications to fetch the newly created request from backend
      // This will create a notification for the adopter with the correct request_id
      await refreshNotifications();
      
      // Show success modal
      setShowSuccess(true);
      
      // Reset form
      setInterviewDate('');
      setInterviewTime('');
      setMeetGreet('no');
      setReasonForAdoption('');
      setNotes('');
    } catch (err: unknown) {
      console.error('Error submitting adoption request:', err);
      if (err instanceof Error) {
        setError(err.message || 'Failed to submit adoption request. Please try again.');
      } else {
        setError(String(err) || 'Failed to submit adoption request. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose(); // Close adoption modal
    // Don't redirect - keep user on the same page
  };

  // Validate that all required fields are filled
  const isFormValid = () => {
    return (
      interviewTime.trim() !== '' &&
      reasonForAdoption.trim() !== '' &&
      notes.trim() !== ''
    );
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-md p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-[700px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-['Poppins'] text-black">Adoption Application</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Interview Date */}
          <div>
            <label className="block font-['Poppins'] text-gray-700 mb-2">
              Interview Date
            </label>
            <DatePicker
              value={interviewDate}
              onChange={setInterviewDate}
              placeholder="mm/dd/yyyy"
            />
          </div>

          {/* Interview Time */}
          <div>
            <label className="block font-['Poppins'] text-gray-700 mb-2">
              Interview Time
            </label>
            <TimePicker
              value={interviewTime}
              onChange={setInterviewTime}
              placeholder="--:-- --"
            />
          </div>

          {/* Meet & Greet Preference */}
          <div>
            <label className="block font-['Poppins'] text-gray-700 mb-2">
              Meet & Greet Preference
            </label>
            <select
              value={meetGreet}
              onChange={(e) => setMeetGreet(e.target.value as 'yes' | 'no')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#fd7e14] font-['Poppins'] bg-white"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Reason for Adoption */}
          <div>
            <label className="block font-['Poppins'] text-gray-700 mb-2">
              Reason for Adoption
            </label>
            <textarea
              value={reasonForAdoption}
              onChange={(e) => setReasonForAdoption(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#fd7e14] font-['Poppins'] resize-none"
              placeholder="Tell us why you want to adopt this pet..."
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block font-['Poppins'] text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#fd7e14] font-['Poppins'] resize-none"
              placeholder="Any additional information you'd like to share..."
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-['Poppins'] text-red-600">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`w-full py-4 rounded-xl font-['Poppins'] transition-colors duration-300 shadow-lg ${
              isFormValid() && !isSubmitting
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        petName={petName}
      />
    </div>
  );
}