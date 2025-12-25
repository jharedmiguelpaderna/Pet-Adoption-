import { X, Calendar, Clock, User, Mail, FileText, MessageSquare, CheckCircle, XCircle, AlertCircle, Edit, Eye } from 'lucide-react';
import type { AdoptionRequest } from '../data/adoptionRequests';

interface ViewAdoptionRequestModalProps {
  request: AdoptionRequest;
  onClose: () => void;
  onEditStatus?: () => void;
  onViewAdopterProfile?: () => void;
}

export function ViewAdoptionRequestModal({ request, onClose, onEditStatus, onViewAdopterProfile }: ViewAdoptionRequestModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Approved':
        return 'bg-green-500';
      case 'Declined':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <AlertCircle className="w-5 h-5" />;
      case 'Approved':
        return <CheckCircle className="w-5 h-5" />;
      case 'Declined':
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not scheduled';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
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
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8 text-white" />
            <div>
              <h2 className="font-['Poppins'] text-2xl text-white">Adoption Application</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-center">
            <div className={`${getStatusColor(request.adoption_status)} text-white px-6 py-3 rounded-2xl font-['Poppins'] flex items-center gap-2 text-lg`}>
              {getStatusIcon(request.adoption_status)}
              Status: {request.adoption_status}
            </div>
          </div>

          {/* Pet and Adopter Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pet Information */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border-2 border-orange-100">
              <h3 className="font-['Poppins'] text-xl text-black mb-4 flex items-center gap-2">
                <img src={request.pet_photo_url} alt={request.pet_name} className="w-10 h-10 rounded-full object-cover" />
                Pet Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-['Poppins'] text-sm text-gray-500">Pet Name</p>
                  <p className="font-['Poppins'] text-black">{request.pet_name}</p>
                </div>
                <div>
                  <p className="font-['Poppins'] text-sm text-gray-500">Species</p>
                  <p className="font-['Poppins'] text-black">{request.pet_species}</p>
                </div>
              </div>
            </div>

            {/* Adopter Information */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-2 border-blue-100">
              <h3 className="font-['Poppins'] text-xl text-black mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-blue-600" />
                Adopter Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-['Poppins'] text-sm text-gray-500">Adopter Name</p>
                  <p className="font-['Poppins'] text-black">{request.adopter_name}</p>
                </div>
                <div>
                  <p className="font-['Poppins'] text-sm text-gray-500">Email</p>
                  <p className="font-['Poppins'] text-black">{request.adopter_email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <h3 className="font-['Poppins'] text-xl text-black mb-4">Application Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-['Poppins'] text-sm text-gray-500 mb-1 block flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#fd7e14]" />
                  Application Date
                </label>
                <p className="font-['Poppins'] text-black">{formatDate(request.application_date)}</p>
              </div>

              <div>
                <label className="font-['Poppins'] text-sm text-gray-500 mb-1 block flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#fd7e14]" />
                  Online Interview Date
                </label>
                <p className="font-['Poppins'] text-black">{formatDate(request.online_interview_date)}</p>
              </div>

              <div>
                <label className="font-['Poppins'] text-sm text-gray-500 mb-1 block flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#fd7e14]" />
                  Interview Time
                </label>
                <p className="font-['Poppins'] text-black">{formatTime(request.online_interview_time)}</p>
              </div>

              <div>
                <label className="font-['Poppins'] text-sm text-gray-500 mb-1 block">
                  Meet & Greet Required
                </label>
                <p className="font-['Poppins'] text-black">
                  <span className={`px-3 py-1 rounded-full text-sm ${request.meet_greet === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {request.meet_greet}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Reason for Adoption */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <h3 className="font-['Poppins'] text-xl text-black mb-3 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-[#fd7e14]" />
              Reason for Adoption
            </h3>
            <p className="font-['Poppins'] text-gray-700 leading-relaxed whitespace-pre-wrap">
              {request.reason_for_adoption}
            </p>
          </div>

          {/* Status Message */}
          {request.notes && (
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <h3 className="font-['Poppins'] text-xl text-black mb-3 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                Status Message for Adopter
              </h3>
              <p className="font-['Poppins'] text-gray-700 leading-relaxed whitespace-pre-wrap">
                {request.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-end gap-3">
          {onViewAdopterProfile && (
            <button
              onClick={onViewAdopterProfile}
              className="flex items-center gap-2 px-6 py-3 bg-[#fd7e14] text-white rounded-xl font-['Poppins'] hover:bg-[#e8590c] transition-colors"
            >
              <Eye className="w-5 h-5" />
              View Adopter Profile
            </button>
          )}
          {onEditStatus && (
            <button
              onClick={onEditStatus}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl font-['Poppins'] hover:bg-blue-600 transition-colors"
            >
              Edit Status
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 text-white rounded-xl font-['Poppins'] hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}