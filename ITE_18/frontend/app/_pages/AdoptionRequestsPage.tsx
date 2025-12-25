'use client';

import { Eye, Trash2, Calendar, User, CheckCircle, XCircle, Clock, PawPrint, Edit, AlertTriangle } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AdoptionRequest } from '../../data/adoptionRequests';
import { ViewAdoptionRequestModal } from '../../components/ViewAdoptionRequestModal';
import { EditStatusModal } from '../../components/EditStatusModal';
import { SuccessBanner } from '../../components/SuccessBanner';
import { NetworkErrorBanner } from '../../components/NetworkErrorBanner';
import { ConfirmModal } from '../../components/ConfirmModal';
import { ViewAdopterProfileModal } from '../../components/ViewAdopterProfileModal';
import { AdopterProfile } from '../../data/adopterProfiles';
import { useNotifications } from '../../contexts/NotificationContext';
import { API_ENDPOINTS, getAuthHeaders, getCurrentUser, USE_MOCK_API, handle401Error, getNetworkErrorMessage, getApiBaseUrl } from '../../utils/api';

// Backend data type interfaces
interface BackendShelter {
  shelter_id: number;
  admin_id: number;
  shelter_name: string;
}

interface BackendPet {
  pet_id: number;
  shelter_id?: number;
  name: string;
  species: string;
  photo_url?: string;
}

interface BackendAdopter {
  adopter_id: number;
  name?: string;
  first_name?: string;
  email: string;
}

// Backend adopter profile shape used when viewing adopter details
interface BackendAdopterProfile {
  adopter_id?: number;
  id?: number;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  birth_date?: string;
  occupation?: string;
  company_name?: string;
  pronouns?: string;
  social_media_url?: string;
  profile_picture?: string;
  home_type?: string;
  home_ownership?: string;
  yard_size?: string;
  household_members?: number;
  children_ages?: string;
  other_pets?: string;
  pet_experience?: string;
  veterinarian_name?: string;
  veterinarian_contact?: string;
  valid_id_url?: string;
  home_photos?: string[];
  alternate_contact_name?: string;
  alternate_contact_phone?: string;
  alternate_contact_relation?: string;
  registration_date?: string;
  total_applications?: number;
  approved_adoptions?: number;
}

interface BackendAdoptionRequest {
  request_id?: number;
  adoption_request_id?: number;
  adopter_id: number;
  adopter?: BackendAdopter;
  pet_id: number;
  pet?: BackendPet;
  application_date: string;
  online_interview_date: string | null;
  online_interview_time: string | null;
  meet_greet: 'Yes' | 'No';
  reason_for_adoption?: string;
  adoption_status: string;
  notes?: string | null;
}

export function AdoptionRequestsPage() {
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingRequest, setViewingRequest] = useState<AdoptionRequest | null>(null);
  const [editingRequest, setEditingRequest] = useState<AdoptionRequest | null>(null);
  const [deleteRequestId, setDeleteRequestId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [networkError, setNetworkError] = useState<{ message: string; backendUrl: string } | null>(null);
  const [authError, setAuthError] = useState(false);
  const [viewingAdopterId, setViewingAdopterId] = useState<number | null>(null);
  const [adopterProfiles, setAdopterProfiles] = useState<Map<number, AdopterProfile>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const { addNotification, refreshNotifications } = useNotifications();

  const mapBackendProfileToAdopterProfile = useCallback((data: BackendAdopterProfile): AdopterProfile => {
    const fullName = data.full_name || `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'Unknown';
    return {
      adopter_id: data.adopter_id ?? data.id ?? 0,
      full_name: fullName,
      email: data.email ?? '',
      phone: data.phone ?? '',
      address: data.address ?? '',
      birth_date: data.birth_date ?? '',
      occupation: data.occupation ?? '',
      company_name: data.company_name ?? '',
      pronouns: data.pronouns ?? '',
      social_media_url: data.social_media_url ?? '',
      profile_picture: data.profile_picture ?? '',
      home_type: data.home_type ?? 'House',
      home_ownership: data.home_ownership ?? 'Rent',
      yard_size: data.yard_size ?? '',
      household_members: data.household_members ?? 0,
      children_ages: data.children_ages ?? '',
      other_pets: data.other_pets ?? '',
      pet_experience: data.pet_experience ?? '',
      veterinarian_name: data.veterinarian_name ?? '',
      veterinarian_contact: data.veterinarian_contact ?? '',
      valid_id_url: data.valid_id_url ?? '',
      home_photos: data.home_photos ?? [],
      alternate_contact_name: data.alternate_contact_name ?? '',
      alternate_contact_phone: data.alternate_contact_phone ?? '',
      alternate_contact_relation: data.alternate_contact_relation ?? '',
      registration_date: data.registration_date ?? '',
      total_applications: data.total_applications ?? 0,
      approved_adoptions: data.approved_adoptions ?? 0,
    };
  }, []);

  // Fetch adoption requests from backend
  const fetchAdoptionRequests = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }
      
      // Skip API calls if using mock data
      if (USE_MOCK_API) {
        setIsLoading(false);
        return;
      }
      
      // Get current admin info (support multiple possible shapes)
      const currentUser = getCurrentUser();
      const adminId =
        currentUser?.user?.admin_id ??
        currentUser?.user?.id ??
        currentUser?.user?.admin?.admin_id ??
        currentUser?.user?.admin?.id ??
        currentUser?.user?.user_id;
      
      // Fetch admin's shelters first
      let sheltersResponse: Response;
      try {
        sheltersResponse = await fetch(API_ENDPOINTS.shelters, {
          method: 'GET',
          headers: getAuthHeaders(),
        });
      } catch (fetchError) {
        // Handle network errors (backend not running, CORS, etc.)
        if (fetchError instanceof TypeError && fetchError.message === 'Failed to fetch') {
          const errorMsg = getNetworkErrorMessage('/api/shelters');
          console.error('Network error:', errorMsg, fetchError);
          setNetworkError({
            message: errorMsg,
            backendUrl: getApiBaseUrl()
          });
          setSuccessMessage('');
        } else {
          console.error('Error fetching shelters:', fetchError);
          setSuccessMessage('Failed to load shelters. Please try again.');
          setNetworkError(null);
        }
        setIsLoading(false);
        return;
      }

      if (!sheltersResponse.ok) {
        const errorText = await sheltersResponse.text().catch(() => 'Unknown error');
        console.error('Failed to fetch shelters:', sheltersResponse.status, sheltersResponse.statusText, errorText);
        
        // Handle 401 Unauthorized - token expired or invalid
        if (sheltersResponse.status === 401) {
          handle401Error();
          setIsLoading(false);
          return;
        }
        
        setSuccessMessage(`Failed to load shelters: ${sheltersResponse.status} ${sheltersResponse.statusText}`);
        setIsLoading(false);
        return;
      }

      const allShelters: BackendShelter[] = await sheltersResponse.json();
        const adminShelters = adminId
          ? allShelters.filter((shelter) => shelter.admin_id === adminId)
          : allShelters;
        const adminShelterIds = adminShelters.map((shelter) => shelter.shelter_id);
      
      // Fetch all adoption requests
      let response: Response;
      try {
        response = await fetch(API_ENDPOINTS.adoptions, {
          method: 'GET',
          headers: getAuthHeaders(),
        });
      } catch (fetchError) {
        // Handle network errors (backend not running, CORS, etc.)
        if (fetchError instanceof TypeError && fetchError.message === 'Failed to fetch') {
          const errorMsg = getNetworkErrorMessage('/api/adoptions');
          console.error('Network error:', errorMsg, fetchError);
          setNetworkError({
            message: errorMsg,
            backendUrl: getApiBaseUrl()
          });
          setSuccessMessage('');
        } else {
          console.error('Error fetching adoption requests:', fetchError);
          setSuccessMessage('Failed to load adoption requests. Please try again.');
          setNetworkError(null);
        }
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        const backendRequests: BackendAdoptionRequest[] = await response.json();
        
          // Filter requests to only show those for pets in admin's shelters
          // If no shelters are associated, show all to avoid empty UI
          const adminRequests =
            adminShelterIds.length > 0
              ? backendRequests.filter((req) => req.pet?.shelter_id && adminShelterIds.includes(req.pet.shelter_id))
              : backendRequests;
        
        // Map backend data to frontend format
        const formattedRequests: AdoptionRequest[] = adminRequests.map((req) => {
          // Map backend status to frontend status (case-insensitive)
          const backendStatus = (req.adoption_status || '').toLowerCase();
          let status: 'Pending' | 'Approved' | 'Declined' = 'Pending';
          if (backendStatus.includes('reject') || backendStatus.includes('declin')) {
            status = 'Declined';
          } else if (backendStatus.includes('approve')) {
            status = 'Approved';
          } else {
            status = 'Pending';
          }
          
          return {
            request_id: req.request_id || req.adoption_request_id || 0,
            adopter_id: req.adopter_id,
            adopter_name: req.adopter?.name || req.adopter?.first_name || 'Unknown',
            adopter_email: req.adopter?.email || 'Unknown',
            pet_id: req.pet_id,
            pet_name: req.pet?.name || 'Unknown',
            pet_species: req.pet?.species || 'Unknown',
            pet_photo_url: req.pet?.photo_url || '',
            application_date: req.application_date,
            online_interview_date: req.online_interview_date,
            online_interview_time: req.online_interview_time,
            meet_greet: req.meet_greet,
            reason_for_adoption: req.reason_for_adoption || '',
            adoption_status: status,
            notes: req.notes || '',
          };
        });
        setRequests(formattedRequests);
        // Clear any previous error messages on success
        setSuccessMessage('');
        setNetworkError(null);
      } else {
        // Handle non-OK responses
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error('Failed to fetch adoption requests:', response.status, response.statusText, errorText);
        
        // Handle 401 Unauthorized - token expired or invalid
        if (response.status === 401) {
          console.warn('Authentication failed (401). Token may be expired or invalid.');
          console.log('Current token:', localStorage.getItem('auth_token') ? 'Present' : 'Missing');
          handle401Error();
          return;
        }
        
        setSuccessMessage(`Failed to load adoption requests: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Error fetching adoption requests:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        const errorMsg = getNetworkErrorMessage('/api/adoptions');
        console.error('Network error:', errorMsg);
        setNetworkError({
          message: errorMsg,
          backendUrl: getApiBaseUrl()
        });
        setSuccessMessage('');
      } else {
        setSuccessMessage('Failed to load adoption requests. Please try again.');
        setNetworkError(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdoptionRequests();
  }, [fetchAdoptionRequests]);

  // Note: Auto-refresh removed to prevent system lag
  // Notifications refresh on navigation (handled by Layout component)
  // This page refreshes on mount and when manually navigating here

  // Filter requests
  const filteredRequests = requests.filter(request => {
    const matchesStatus = statusFilter === 'All' || request.adoption_status === statusFilter;
    const matchesSearch = 
      request.adopter_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.pet_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.adopter_email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Get counts for each status (handle both Declined and Rejected)
  const pendingCount = requests.filter(r => r.adoption_status?.toLowerCase() === 'pending').length;
  const approvedCount = requests.filter(r => r.adoption_status?.toLowerCase() === 'approved').length;
  const declinedCount = requests.filter(r => {
    const status = r.adoption_status?.toLowerCase();
    return status === 'declined' || status === 'rejected';
  }).length;

  const handleDeleteRequest = (requestId: number) => {
    setDeleteRequestId(requestId);
  };

  const confirmDeleteRequest = async () => {
    if (deleteRequestId !== null) {
      try {
        const response = await fetch(API_ENDPOINTS.adoption(deleteRequestId), {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error(`Failed to delete adoption request: ${response.statusText}`);
        }

        // Remove from local state
        setRequests(prevRequests => prevRequests.filter(req => req.request_id !== deleteRequestId));
        setSuccessMessage('Adoption request deleted successfully!');
        setDeleteRequestId(null);
        
        // Refresh from backend to ensure consistency
        fetchAdoptionRequests();
      } catch (error) {
        console.error('Error deleting adoption request:', error);
        setSuccessMessage('Failed to delete adoption request. Please try again.');
      }
    }
  };

  const handleStatusUpdate = async (requestId: number, newStatus: 'Pending' | 'Approved' | 'Declined', notes: string) => {
    const request = requests.find(req => req.request_id === requestId);
    if (!request) return;
    
    // Store original request for potential rollback
    const originalRequest = { ...request };
    
    // Use all possible id fields to ensure correct backend target
    const backendId =
      request.request_id ??
      (request as any).adoption_request_id ??
      requestId;
    
    // Optimistically update local state immediately for instant UI feedback
    // This ensures the UI updates right away, including counts
    setRequests(prevRequests => prevRequests.map(req => 
      req.request_id === requestId 
        ? { ...req, adoption_status: newStatus, notes: notes || req.notes || '' }
        : req
    ));
    
    try {
      // Update status in backend
      // Backend expects updating the adoption request resource (use PUT on /api/adoptions/{id})
      const backendStatus = newStatus === 'Declined' ? 'Rejected' : newStatus;
      const response = await fetch(API_ENDPOINTS.adoption(backendId), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          adoption_status: backendStatus,
          notes: notes || null,
        }),
      });

      if (!response.ok) {
        // If backend update fails, revert the optimistic update
        setRequests(prevRequests => prevRequests.map(req => 
          req.request_id === requestId ? originalRequest : req
        ));
        throw new Error(`Failed to update adoption request status: ${response.statusText}`);
      }

      const updatedRequest = await response.json();
      
      // IMPORTANT: Always use newStatus (what the admin selected) instead of mapping from backend
      // The backend should have saved it correctly, so we trust the user's selection
      // This prevents any issues with backend response mapping or timing
      
      // Update with backend response data, preserving all existing request data
      // But ALWAYS use newStatus for the adoption_status field
      const formattedRequest: AdoptionRequest = {
        ...request, // Preserve all original request data
        request_id: updatedRequest.request_id || updatedRequest.adoption_request_id || request.request_id,
        adopter_id: updatedRequest.adopter_id ?? request.adopter_id,
        pet_id: updatedRequest.pet_id ?? request.pet_id,
        application_date: updatedRequest.application_date || request.application_date,
        online_interview_date: updatedRequest.online_interview_date ?? request.online_interview_date,
        online_interview_time: updatedRequest.online_interview_time ?? request.online_interview_time,
        meet_greet: updatedRequest.meet_greet || request.meet_greet,
        reason_for_adoption: updatedRequest.reason_for_adoption || request.reason_for_adoption,
        adoption_status: newStatus, // ALWAYS use the status the admin selected, not backend response
        notes: updatedRequest.notes ?? notes ?? request.notes ?? '',
        // Update relationship data if available from backend
        adopter_name: updatedRequest.adopter?.name || updatedRequest.adopter?.first_name || request.adopter_name,
        adopter_email: updatedRequest.adopter?.email || request.adopter_email,
        pet_name: updatedRequest.pet?.name || request.pet_name,
        pet_species: updatedRequest.pet?.species || request.pet_species,
        pet_photo_url: updatedRequest.pet?.photo_url || request.pet_photo_url,
      };
      
      // Update local state with backend response data, but keep the status as newStatus
      setRequests(prevRequests => prevRequests.map(req => {
        if (req.request_id === requestId) {
          return formattedRequest; // This already has newStatus as adoption_status
        }
        return req;
      }));
      
      // Show success after confirming backend update
      setSuccessMessage(`Adoption request status updated to ${newStatus}!`);
      
      // IMPORTANT: Notifications for adopters are fetched from the backend adoption requests
      // When admin updates status, the backend is updated, and adopters will see the notification
      // when they refresh their page. The notification is derived from the adoption request status.
      // 
      // The notification will appear for the adopter because:
      // 1. Backend adoption request status is updated (Approved/Declined/Pending)
      // 2. When adopter refreshes, NotificationContext fetches their adoption requests
      // 3. NotificationContext maps the status to a notification (adoption_approved/adoption_declined/pending)
      // 4. The notification appears in the adopter's notification dropdown
      
      // Note: We don't call addNotification here because:
      // - addNotification only adds to the current user's (admin's) local state
      // - Adopters fetch notifications from backend, so they'll see it on refresh
      // - The backend has been updated with the new status, so the adopter's next fetch will show it
      
      // Don't refresh from backend - the optimistic update + backend response update is sufficient
      // This prevents the refresh from overwriting the correct state
    } catch (error) {
      console.error('Error updating adoption request status:', error);
      setSuccessMessage('Failed to update adoption request status. Please try again.');
      // Revert to original state on error
      setRequests(prevRequests => prevRequests.map(req => 
        req.request_id === requestId ? originalRequest : req
      ));
      // Refresh from backend on error to restore correct state
      fetchAdoptionRequests();
    }
  };

  const getStatusColor = (status: string) => {
    const normalizedStatus = status?.toLowerCase() || '';
    if (normalizedStatus.includes('pending')) return 'bg-yellow-500';
    if (normalizedStatus.includes('approved')) return 'bg-green-500';
    if (normalizedStatus.includes('declined') || normalizedStatus.includes('rejected')) return 'bg-red-500';
    return 'bg-gray-500';
  };

  const getStatusIcon = (status: string) => {
    const normalizedStatus = status?.toLowerCase() || '';
    if (normalizedStatus.includes('pending')) return <Clock className="w-4 h-4" />;
    if (normalizedStatus.includes('approved')) return <CheckCircle className="w-4 h-4" />;
    if (normalizedStatus.includes('declined') || normalizedStatus.includes('rejected')) return <XCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#fd7e14] to-[#ff9247] opacity-3 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Paw Print Pattern Decorations */}
      <div className="absolute top-20 left-10 text-[#fd7e14] opacity-10 pointer-events-none">
        <PawPrint className="w-16 h-16" />
      </div>
      <div className="absolute top-40 right-20 text-[#fd7e14] opacity-10 pointer-events-none">
        <PawPrint className="w-12 h-12" />
      </div>
      <div className="absolute bottom-40 left-1/4 text-[#fd7e14] opacity-10 pointer-events-none">
        <PawPrint className="w-20 h-20" />
      </div>

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">
            <div className="mb-6">
              <h1 className="font-['Poppins'] text-black mb-2">Adoption Requests</h1>
              <p className="font-['Poppins'] text-gray-600">
                Review and manage all adoption applications submitted by potential adopters
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-4 border-2 border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-600">Pending</p>
                    <p className="font-['Poppins'] text-3xl text-black">{pendingCount}</p>
                  </div>
                  <Clock className="w-10 h-10 text-yellow-500" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-4 border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-600">Approved</p>
                    <p className="font-['Poppins'] text-3xl text-black">{approvedCount}</p>
                  </div>
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-4 border-2 border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-600">Declined</p>
                    <p className="font-['Poppins'] text-3xl text-black">{declinedCount}</p>
                  </div>
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search by adopter name, pet name, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                suppressHydrationWarning
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] bg-white min-w-[200px]"
                suppressHydrationWarning
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
              </select>
            </div>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <p className="font-['Poppins'] text-gray-600">Loading adoption requests...</p>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <p className="font-['Poppins'] text-gray-600">No adoption requests found matching your criteria.</p>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div
                  key={request.request_id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 hover:scale-[1.01]"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Pet Image */}
                    <div className="w-full lg:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 relative">
                      {request.pet_photo_url ? (
                        <Image
                          src={request.pet_photo_url}
                          alt={request.pet_name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 128px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Photo</span>
                        </div>
                      )}
                    </div>

                    {/* Request Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-['Poppins'] text-xl text-black mb-1">
                            {request.adopter_name} → {request.pet_name}
                          </h3>
                          <p className="font-['Poppins'] text-sm text-gray-600">{request.adopter_email}</p>
                        </div>
                        <div className={`${getStatusColor(request.adoption_status)} text-white px-4 py-2 rounded-full font-['Poppins'] text-sm flex items-center gap-2`}>
                          {getStatusIcon(request.adoption_status)}
                          {request.adoption_status}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#fd7e14]" />
                          <div>
                            <p className="font-['Poppins'] text-xs text-gray-500">Applied</p>
                            <p className="font-['Poppins'] text-sm text-black">{formatDate(request.application_date)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#fd7e14]" />
                          <div>
                            <p className="font-['Poppins'] text-xs text-gray-500">Interview Date</p>
                            <p className="font-['Poppins'] text-sm text-black">
                              {request.online_interview_date ? formatDate(request.online_interview_date) : 'Not scheduled'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#fd7e14]" />
                          <div>
                            <p className="font-['Poppins'] text-xs text-gray-500">Meet & Greet</p>
                            <p className="font-['Poppins'] text-sm text-black">{request.meet_greet}</p>
                          </div>
                        </div>
                      </div>

                      {/* Reason Preview */}
                      <div className="bg-gray-50 rounded-xl p-3 mb-4">
                        <p className="font-['Poppins'] text-sm text-gray-700 line-clamp-2">
                          <span className="font-medium">Reason:</span> {request.reason_for_adoption}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewingRequest(request)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-['Poppins'] text-sm hover:bg-blue-700 transition-colors hover:scale-105"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => setEditingRequest(request)}
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg font-['Poppins'] text-sm hover:bg-yellow-700 transition-colors hover:scale-105"
                        >
                          <Edit className="w-4 h-4" />
                          Edit Status
                        </button>
                        <button
                          onClick={() => handleDeleteRequest(request.request_id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-['Poppins'] text-sm hover:bg-red-700 transition-colors hover:scale-105"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* View Request Modal */}
      {viewingRequest && (
        <ViewAdoptionRequestModal
          request={viewingRequest}
          onClose={() => setViewingRequest(null)}
          onEditStatus={() => {
            setEditingRequest(viewingRequest);
            setViewingRequest(null);
          }}
          onViewAdopterProfile={() => {
            setViewingAdopterId(viewingRequest.adopter_id);
            setViewingRequest(null);
          }}
        />
      )}

      {/* Edit Status Modal */}
      {editingRequest && (
        <EditStatusModal
          request={editingRequest}
          onClose={() => setEditingRequest(null)}
          onUpdateStatus={(newStatus, notes) => handleStatusUpdate(editingRequest.request_id, newStatus, notes)}
        />
      )}

      {/* Network Error Banner */}
      {networkError && (
        <NetworkErrorBanner
          message={networkError.message}
          backendUrl={networkError.backendUrl}
          onClose={() => setNetworkError(null)}
        />
      )}

      {/* Auth Error Banner */}
      {authError && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] animate-in slide-in-from-top-5 duration-300 max-w-2xl w-full px-4">
          <div className="bg-yellow-50 border-2 border-yellow-500 rounded-2xl shadow-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-['Poppins'] text-yellow-900 font-bold text-lg mb-2">
                  Authentication Required
                </h3>
                <p className="font-['Poppins'] text-yellow-800 mb-2">
                  Your session has expired or you need to log in again for network access.
                </p>
                <p className="font-['Poppins'] text-sm text-yellow-700">
                  <strong>Tip:</strong> If you logged in via localhost, you need to log in again when accessing via network IP ({window.location.hostname}).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Banner */}
      {successMessage && (
        <SuccessBanner
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}

      {/* Confirm Delete Modal */}
      {deleteRequestId !== null && (
        <ConfirmModal
          title="Delete Adoption Request"
          message="Are you sure you want to delete this adoption request? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDeleteRequest}
          onCancel={() => setDeleteRequestId(null)}
          type="danger"
        />
      )}

      {/* View Adopter Profile Modal */}
      {viewingAdopterId !== null && (() => {
        const profile = adopterProfiles.get(viewingAdopterId);
        const adoptionRequest = requests.find(r => r.adopter_id === viewingAdopterId);
        
        // Fetch profile from backend if not in cache
        if (!profile) {
          fetch(API_ENDPOINTS.adopter(viewingAdopterId), {
            headers: getAuthHeaders(),
          })
            .then(res => (res.ok ? res.json() : null))
            .then(data => {
              if (data) {
                const mapped = mapBackendProfileToAdopterProfile(data);
                setAdopterProfiles(prev => new Map(prev).set(viewingAdopterId, mapped));
              }
            })
            .catch(err => console.error('Error fetching adopter profile:', err));
          
          return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[1000]">
              <div className="bg-white rounded-3xl p-8">
                <p className="font-['Poppins'] text-gray-600">Loading adopter profile...</p>
              </div>
            </div>
          );
        }
        
        return profile ? (
          <ViewAdopterProfileModal
            profile={profile}
            adoptionRequest={adoptionRequest}
            onClose={() => setViewingAdopterId(null)}
          />
        ) : null;
      })()}
    </div>
  );
}




