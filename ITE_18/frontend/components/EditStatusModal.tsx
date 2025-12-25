import { X, CheckCircle, XCircle, Clock, Save, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { AdoptionRequest } from '../data/adoptionRequests';

interface EditStatusModalProps {
  request: AdoptionRequest;
  onClose: () => void;
  onUpdateStatus: (newStatus: 'Pending' | 'Approved' | 'Declined', notes: string) => void;
}

export function EditStatusModal({ request, onClose, onUpdateStatus }: EditStatusModalProps) {
  const [status, setStatus] = useState<'Pending' | 'Approved' | 'Declined'>(request.adoption_status);
  const hasChanges = status !== request.adoption_status;

  useEffect(() => {
    setStatus(request.adoption_status);
  }, [request]);

  const getStatusMessage = (statusValue: 'Pending' | 'Approved' | 'Declined') => {
    switch (statusValue) {
      case 'Pending':
        return 'Your application is currently being processed. We will get back to you soon with an update.';
      case 'Approved':
        return 'Congratulations! Your adoption application has been approved. We will contact you shortly to schedule the next steps.';
      case 'Declined':
        return 'Thank you for your interest. Unfortunately, your application has not been approved at this time. We encourage you to browse other available pets.';
      default:
        return '';
    }
  };

  const handleSave = () => {
    if (!hasChanges) {
      return;
    }
    onUpdateStatus(status, getStatusMessage(status));
    onClose();
  };

  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case 'Pending':
        return 'border-yellow-500 bg-yellow-50';
      case 'Approved':
        return 'border-green-500 bg-green-50';
      case 'Declined':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
      case 'Pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'Approved':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'Declined':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-slideUp">
        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#fd7e14] to-[#ff9247] p-6 flex items-center justify-between">
          <div>
            <h2 className="font-['Poppins'] text-2xl text-white">Update Adoption Status</h2>
            <p className="font-['Poppins'] text-white/90 text-sm">
              {request.adopter_name} → {request.pet_name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Current Request Info */}
          <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
            <div className="flex items-center gap-4">
              <img
                src={request.pet_photo_url}
                alt={request.pet_name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="font-['Poppins'] text-lg text-black">{request.pet_name}</p>
                <p className="font-['Poppins'] text-sm text-gray-600">{request.adopter_email}</p>
              </div>
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className="font-['Poppins'] text-black mb-3 block">
              Select Status
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pending Option */}
              <div
                onClick={() => setStatus('Pending')}
                className={`p-4 rounded-2xl border-3 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  status === 'Pending'
                    ? 'border-yellow-500 bg-yellow-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-yellow-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Clock className={`w-8 h-8 ${status === 'Pending' ? 'text-yellow-500' : 'text-gray-400'}`} />
                  <p className={`font-['Poppins'] ${status === 'Pending' ? 'text-yellow-700' : 'text-gray-600'}`}>
                    Pending
                  </p>
                  {status === 'Pending' && (
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Approved Option */}
              <div
                onClick={() => setStatus('Approved')}
                className={`p-4 rounded-2xl border-3 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  status === 'Approved'
                    ? 'border-green-500 bg-green-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className={`w-8 h-8 ${status === 'Approved' ? 'text-green-500' : 'text-gray-400'}`} />
                  <p className={`font-['Poppins'] ${status === 'Approved' ? 'text-green-700' : 'text-gray-600'}`}>
                    Approved
                  </p>
                  {status === 'Approved' && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Declined Option */}
              <div
                onClick={() => setStatus('Declined')}
                className={`p-4 rounded-2xl border-3 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  status === 'Declined'
                    ? 'border-red-500 bg-red-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-red-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <XCircle className={`w-8 h-8 ${status === 'Declined' ? 'text-red-500' : 'text-gray-400'}`} />
                  <p className={`font-['Poppins'] ${status === 'Declined' ? 'text-red-700' : 'text-gray-600'}`}>
                    Declined
                  </p>
                  {status === 'Declined' && (
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status Change Preview */}
          <div className={`p-4 rounded-2xl border-2 ${getStatusColor(status)}`}>
            <div className="flex items-center gap-3">
              {getStatusIcon(status)}
              <div className="flex-1">
                <p className="font-['Poppins'] text-sm text-gray-600">New Status</p>
                <p className="font-['Poppins'] text-lg text-black">{status}</p>
              </div>
            </div>
          </div>

          {/* Message Preview */}
          <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
            <h3 className="font-['Poppins'] text-black mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Message to Adopter
            </h3>
            <p className="font-['Poppins'] text-gray-700 leading-relaxed">
              {getStatusMessage(status)}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 text-white rounded-xl font-['Poppins'] hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-6 py-3 rounded-xl font-['Poppins'] transition-all duration-300 flex items-center gap-2 ${
              hasChanges
                ? 'bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white hover:shadow-lg hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}