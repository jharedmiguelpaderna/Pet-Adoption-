import { X, User, Mail, Phone, MapPin, Calendar, Briefcase, Building, Home, Users, PawPrint, Heart, FileText, AlertCircle, CheckCircle, Image as ImageIcon, Link as LinkIcon, IdCard, UserPlus } from 'lucide-react';
import { AdopterProfile } from '../data/adopterProfiles';
import { AdoptionRequest } from '../data/adoptionRequests';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ViewAdopterProfileModalProps {
  profile: AdopterProfile;
  adoptionRequest?: AdoptionRequest;
  onClose: () => void;
}

export function ViewAdopterProfileModal({ profile, adoptionRequest, onClose }: ViewAdopterProfileModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
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

  const homePhotos = profile.home_photos ?? [];
  const profilePictureSrc =
    profile.profile_picture && profile.profile_picture.trim() !== ''
      ? profile.profile_picture
      : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
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
        <div className="bg-gradient-to-r from-[#fd7e14] to-[#ff9247] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={profilePictureSrc} 
                alt={profile.full_name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h2 className="font-['Poppins'] text-2xl text-white">Adopter Profile</h2>
                <p className="font-['Poppins'] text-white/90 text-sm">{profile.full_name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Full Name and Contact Info */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <h3 className="font-['Poppins'] text-xl text-black mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-[#fd7e14]" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-['Poppins'] text-sm text-gray-500">Full Name</p>
                <p className="font-['Poppins'] text-black">{profile.full_name}</p>
              </div>
              <div>
                <p className="font-['Poppins'] text-sm text-gray-500">Email</p>
                <p className="font-['Poppins'] text-black">{profile.email}</p>
              </div>
              <div>
                <p className="font-['Poppins'] text-sm text-gray-500">Phone</p>
                <p className="font-['Poppins'] text-black">{profile.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-['Poppins'] text-sm text-gray-500">Address</p>
                <p className="font-['Poppins'] text-black">{profile.address}</p>
              </div>
            </div>
          </div>

          {/* Birth date, occupation, company, social media, pronouns */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-2 border-blue-100">
            <h3 className="font-['Poppins'] text-xl text-black mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-['Poppins'] text-sm text-gray-500">Birth Date</p>
                <p className="font-['Poppins'] text-black">{formatDate(profile.birth_date)}</p>
              </div>
              <div>
                <p className="font-['Poppins'] text-sm text-gray-500">Status/Pronouns</p>
                <p className="font-['Poppins'] text-black">{profile.pronouns}</p>
              </div>
              <div>
                <p className="font-['Poppins'] text-sm text-gray-500">Occupation</p>
                <p className="font-['Poppins'] text-black">{profile.occupation}</p>
              </div>
              <div>
                <p className="font-['Poppins'] text-sm text-gray-500">Company</p>
                <p className="font-['Poppins'] text-black">{profile.company_name}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-['Poppins'] text-sm text-gray-500">Social Media Profile</p>
                <a 
                  href={profile.social_media_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-['Poppins'] text-[#fd7e14] hover:underline flex items-center gap-1"
                >
                  <LinkIcon className="w-4 h-4" />
                  {profile.social_media_url}
                </a>
              </div>
            </div>
          </div>

          {/* Alternate Contact Details */}
          <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-6 border-2 border-teal-100">
            <h3 className="font-['Poppins'] text-xl text-black mb-4 flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-teal-600" />
              Alternate Contact Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="font-['Poppins'] text-sm text-gray-500">Contact Name</p>
                <p className="font-['Poppins'] text-black">{profile.alternate_contact_name}</p>
              </div>
              <div>
                <p className="font-['Poppins'] text-sm text-gray-500">Contact Phone</p>
                <p className="font-['Poppins'] text-black">{profile.alternate_contact_phone}</p>
              </div>
              <div>
                <p className="font-['Poppins'] text-sm text-gray-500">Relation</p>
                <p className="font-['Poppins'] text-black">{profile.alternate_contact_relation}</p>
              </div>
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 border-2 border-indigo-100">
            <h3 className="font-['Poppins'] text-xl text-black mb-4 flex items-center gap-2">
              <IdCard className="w-6 h-6 text-indigo-600" />
              Uploaded Documents
            </h3>
            <div className="space-y-6">
              {/* Valid ID */}
              <div>
                <p className="font-['Poppins'] text-sm text-gray-500 mb-2">Valid ID</p>
                <div className="relative group w-full md:w-64">
                  <ImageWithFallback
                    src={profile.valid_id_url}
                    alt="Valid ID"
                    className="w-full h-40 object-cover rounded-xl border-2 border-indigo-200 group-hover:border-indigo-400 transition-colors"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors"></div>
                </div>
              </div>

              {/* Home Photos */}
              <div>
                <p className="font-['Poppins'] text-sm text-gray-500 mb-2">Home Photos</p>
                {homePhotos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {homePhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <ImageWithFallback
                          src={photo}
                          alt={`Home photo ${index + 1}`}
                          className="w-full h-40 object-cover rounded-xl border-2 border-indigo-200 group-hover:border-indigo-400 transition-colors"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <p className="font-['Poppins'] text-sm text-amber-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      No home photos provided
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Adoption Request Details */}
          {adoptionRequest && (
            <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl p-6 border-2 border-rose-200">
              <h3 className="font-['Poppins'] text-xl text-black mb-4 flex items-center gap-2">
                <Heart className="w-6 h-6 text-rose-600" />
                Adoption Request Details
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-500">Pet Requested</p>
                    <div className="flex items-center gap-2">
                      <img src={adoptionRequest.pet_photo_url} alt={adoptionRequest.pet_name} className="w-8 h-8 rounded-full object-cover" />
                      <p className="font-['Poppins'] text-black">{adoptionRequest.pet_name} ({adoptionRequest.pet_species})</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-500">Online Interview Schedule</p>
                    <p className="font-['Poppins'] text-black">
                      {adoptionRequest.online_interview_date 
                        ? `${formatDate(adoptionRequest.online_interview_date)} at ${formatTime(adoptionRequest.online_interview_time)}` 
                        : 'Not scheduled'}
                    </p>
                  </div>
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-500">Meet & Greet Preference</p>
                    <span className={`px-3 py-1 rounded-full text-sm ${adoptionRequest.meet_greet === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {adoptionRequest.meet_greet}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="font-['Poppins'] text-sm text-gray-500 mb-2">Reason for Adoption</p>
                  <p className="font-['Poppins'] text-gray-700 leading-relaxed bg-white rounded-xl p-4 border border-rose-200">
                    {adoptionRequest.reason_for_adoption}
                  </p>
                </div>

                {adoptionRequest.notes && (
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-500 mb-2">Notes</p>
                    <p className="font-['Poppins'] text-gray-700 leading-relaxed bg-white rounded-xl p-4 border border-rose-200">
                      {adoptionRequest.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gray-600 text-white rounded-xl font-['Poppins'] hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}