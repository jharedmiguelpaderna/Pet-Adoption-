'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Plus, Search, Calendar, PawPrint, Edit, Trash2, X, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { vetVisits as initialVetVisits, isUpcomingVisit, formatVisitDate, VetVisit } from '../../data/vetVisitsData';
import { usePets } from '../../contexts/PetsContext';
import { ConfirmModal } from '../../components/ConfirmModal';
import { SuccessBanner } from '../../components/SuccessBanner';
import { API_ENDPOINTS, getAuthHeaders, USE_MOCK_API } from '../../utils/api';

export function VetVisitsPage() {
  const router = useRouter();
  const { pets, getPetById } = usePets();
  const [vetVisits, setVetVisits] = useState<VetVisit[]>(initialVetVisits);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<VetVisit | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; vetId: number | null }>({
    isOpen: false,
    vetId: null
  });
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch vet visits from backend (filtered by admin's pets)
  const fetchVetVisits = useCallback(async () => {
    if (USE_MOCK_API) {
      setVetVisits(initialVetVisits);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.vetVisits, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const backendVisits = await response.json();
        // Backend now filters by admin's pets automatically
        setVetVisits(backendVisits);
      } else {
        console.error('Failed to fetch vet visits:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching vet visits:', error);
    }
  }, []);

  // Fetch vet visits on mount
  useEffect(() => {
    fetchVetVisits();
  }, [fetchVetVisits]);
  
  // Helper function to get pet name by ID
  const getPetNameById = (petId: number): string => {
    const pet = getPetById(petId);
    return pet ? pet.name : 'Unknown Pet';
  };
  
  // Form state
  const [formData, setFormData] = useState({
    pet_id: 0,
    pet_name: '',
    vet_name: '',
    visit_date: '',
    purpose: '',
    diagnosis: '',
    treatment: '',
    remarks: '',
    next_visit_due: ''
  });

  // Filter visits based on search and active tab
  const filteredVisits = vetVisits.filter(visit => {
    const petName = getPetNameById(visit.pet_id);
    const matchesSearch = petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         visit.vet_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         visit.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'upcoming') {
      return matchesSearch && isUpcomingVisit(visit.visit_date);
    } else if (activeTab === 'past') {
      return matchesSearch && !isUpcomingVisit(visit.visit_date);
    }
    return matchesSearch;
  }).sort((a, b) => new Date(b.visit_date).getTime() - new Date(a.visit_date).getTime());

  // Count upcoming and past visits
  const upcomingCount = vetVisits.filter(v => isUpcomingVisit(v.visit_date)).length;
  const pastCount = vetVisits.filter(v => !isUpcomingVisit(v.visit_date)).length;

  const openModal = (visit?: VetVisit) => {
    if (visit) {
      setEditingVisit(visit);
      const petName = getPetNameById(visit.pet_id);
      setFormData({
        pet_id: visit.pet_id,
        pet_name: petName,
        vet_name: visit.vet_name,
        visit_date: visit.visit_date,
        purpose: visit.purpose,
        diagnosis: visit.diagnosis,
        treatment: visit.treatment,
        remarks: visit.remarks,
        next_visit_due: visit.next_visit_due || ''
      });
    } else {
      setEditingVisit(null);
      setFormData({
        pet_id: 0,
        pet_name: '',
        vet_name: '',
        visit_date: '',
        purpose: '',
        diagnosis: '',
        treatment: '',
        remarks: '',
        next_visit_due: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVisit(null);
    setFormData({
      pet_id: 0,
      pet_name: '',
      vet_name: '',
      visit_date: '',
      purpose: '',
      diagnosis: '',
      treatment: '',
      remarks: '',
      next_visit_due: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const visitData = {
        pet_id: formData.pet_id,
        vet_name: formData.vet_name,
        visit_date: formData.visit_date,
        purpose: formData.purpose || null,
        diagnosis: formData.diagnosis || null,
        treatment: formData.treatment || null,
        remarks: formData.remarks || null,
        next_visit_due: formData.next_visit_due || null,
      };

      if (editingVisit) {
        // Update existing visit
        if (!USE_MOCK_API) {
          const response = await fetch(API_ENDPOINTS.vetVisit(editingVisit.vet_id), {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(visitData),
          });

          if (!response.ok) {
            throw new Error(`Failed to update vet visit: ${response.statusText}`);
          }

          await response.json();
          await fetchVetVisits();
        } else {
          setVetVisits(vetVisits.map(visit => 
            visit.vet_id === editingVisit.vet_id
              ? {
                  ...visit,
                  ...formData,
                  next_visit_due: formData.next_visit_due || null
                }
              : visit
          ));
        }
        setSuccessMessage('Vet visit record has been successfully updated.');
      } else {
        // Add new visit
        if (!USE_MOCK_API) {
          const response = await fetch(API_ENDPOINTS.vetVisits, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(visitData),
          });

          if (!response.ok) {
            throw new Error(`Failed to create vet visit: ${response.statusText}`);
          }

          await response.json();
          await fetchVetVisits();
        } else {
          const newVisit: VetVisit = {
            vet_id: Math.max(...vetVisits.map(v => v.vet_id), 0) + 1,
            ...formData,
            next_visit_due: formData.next_visit_due || null
          };
          setVetVisits([newVisit, ...vetVisits]);
        }
        setSuccessMessage('Vet visit record has been successfully saved.');
      }
      
      closeModal();
      setShowSuccessBanner(true);
    } catch (error) {
      console.error('Error saving vet visit:', error);
      setSuccessMessage('Failed to save vet visit. Please try again.');
      setShowSuccessBanner(true);
    }
  };

  const handleDelete = (vetId: number) => {
    setDeleteConfirm({ isOpen: true, vetId });
  };

  const confirmDelete = async () => {
    if (deleteConfirm.vetId !== null) {
      try {
        if (!USE_MOCK_API) {
          const response = await fetch(API_ENDPOINTS.vetVisit(deleteConfirm.vetId), {
            method: 'DELETE',
            headers: getAuthHeaders(),
          });

          if (!response.ok) {
            throw new Error(`Failed to delete vet visit: ${response.statusText}`);
          }

          // Refresh from backend to ensure consistency
          await fetchVetVisits();
        } else {
          setVetVisits(vetVisits.filter(visit => visit.vet_id !== deleteConfirm.vetId));
        }

        setSuccessMessage('Vet visit record has been successfully deleted.');
        setShowSuccessBanner(true);
      } catch (error) {
        console.error('Error deleting vet visit:', error);
        setSuccessMessage('Failed to delete vet visit. Please try again.');
        setShowSuccessBanner(true);
      }
    }
    setDeleteConfirm({ isOpen: false, vetId: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, vetId: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative Elements */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-[#fd7e14] transition-colors mb-4 font-['Poppins']"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-['Poppins'] text-4xl text-black">Vet Visits</h1>
              <p className="font-['Poppins'] text-gray-600">Track and manage pet medical appointments</p>
            </div>
            
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-[#fd7e14] hover:bg-[#e8590c] text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl font-['Poppins']"
            >
              <Plus className="w-5 h-5" />
              Record New Visit
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-['Poppins'] text-gray-600 mb-1">Total Visits</p>
                <p className="font-['Poppins'] text-3xl text-[#fd7e14]">{vetVisits.length}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-2xl">
                <FileText className="w-6 h-6 text-[#fd7e14]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-['Poppins'] text-gray-600 mb-1">Upcoming</p>
                <p className="font-['Poppins'] text-3xl text-blue-600">{upcomingCount}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-['Poppins'] text-gray-600 mb-1">Past Visits</p>
                <p className="font-['Poppins'] text-3xl text-green-600">{pastCount}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-2xl">
                <PawPrint className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by pet name, vet, or purpose..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins']"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 bg-gray-100 p-2 rounded-2xl">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2 rounded-xl font-['Poppins'] transition-all duration-300 ${
                  activeTab === 'all'
                    ? 'bg-[#fd7e14] text-white shadow-md'
                    : 'bg-transparent text-gray-600 hover:text-[#fd7e14]'
                }`}
              >
                All ({vetVisits.length})
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2 rounded-xl font-['Poppins'] transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-[#fd7e14] text-white shadow-md'
                    : 'bg-transparent text-gray-600 hover:text-[#fd7e14]'
                }`}
              >
                Upcoming ({upcomingCount})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-2 rounded-xl font-['Poppins'] transition-all duration-300 ${
                  activeTab === 'past'
                    ? 'bg-[#fd7e14] text-white shadow-md'
                    : 'bg-transparent text-gray-600 hover:text-[#fd7e14]'
                }`}
              >
                Past ({pastCount})
              </button>
            </div>
          </div>
        </div>

        {/* Visits Table */}
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 overflow-hidden">
          {filteredVisits.length === 0 ? (
            <div className="text-center py-16">
              <PawPrint className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="font-['Poppins'] text-xl text-gray-500">No vet visits found</p>
              <p className="font-['Poppins'] text-gray-400 mt-2">
                {searchQuery ? 'Try adjusting your search' : 'Click "Record New Visit" to add one'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-['Poppins'] text-gray-600">Pet Name</th>
                    <th className="text-left py-4 px-6 font-['Poppins'] text-gray-600">Visit Date</th>
                    <th className="text-left py-4 px-6 font-['Poppins'] text-gray-600">Veterinarian</th>
                    <th className="text-left py-4 px-6 font-['Poppins'] text-gray-600">Purpose</th>
                    <th className="text-left py-4 px-6 font-['Poppins'] text-gray-600">Diagnosis</th>
                    <th className="text-left py-4 px-6 font-['Poppins'] text-gray-600">Next Visit</th>
                    <th className="text-center py-4 px-6 font-['Poppins'] text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisits.map((visit) => {
                    const upcoming = isUpcomingVisit(visit.visit_date);
                    const currentPetName = getPetNameById(visit.pet_id);
                    return (
                      <tr key={visit.vet_id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <PawPrint className="w-4 h-4 text-[#fd7e14]" />
                            <span className="font-['Poppins'] text-black">{currentPetName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="font-['Poppins'] text-black">{formatVisitDate(visit.visit_date)}</p>
                              {upcoming && (
                                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-['Poppins'] mt-1">
                                  Upcoming
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-['Poppins'] text-gray-700">{visit.vet_name}</td>
                        <td className="py-4 px-6">
                          <span className="inline-block px-3 py-1 bg-orange-100 text-[#fd7e14] rounded-full font-['Poppins'] text-sm">
                            {visit.purpose}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-['Poppins'] text-gray-600 max-w-xs truncate">
                          {visit.diagnosis}
                        </td>
                        <td className="py-4 px-6 font-['Poppins'] text-gray-600">
                          {visit.next_visit_due ? formatVisitDate(visit.next_visit_due) : 'Not scheduled'}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openModal(visit)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(visit.vet_id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-3 rounded-2xl">
                    <PawPrint className="w-6 h-6 text-[#fd7e14]" />
                  </div>
                  <h2 className="font-['Poppins'] text-2xl text-black">
                    {editingVisit ? 'Edit Vet Visit' : 'Record New Vet Visit'}
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Select Pet */}
                  <div>
                    <label className="block font-['Poppins'] text-gray-700 mb-2">
                      Select Pet *
                    </label>
                    <select
                      required
                      value={formData.pet_id}
                      onChange={(e) => {
                        const petId = Number(e.target.value);
                        const petName = getPetNameById(petId);
                        setFormData({ ...formData, pet_id: petId, pet_name: petName });
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins'] bg-white"
                    >
                      <option value="0">Select a pet...</option>
                      {pets.map(pet => (
                        <option key={pet.pet_id} value={pet.pet_id}>
                          {pet.name} ({pet.species})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Veterinarian Name */}
                  <div>
                    <label className="block font-['Poppins'] text-gray-700 mb-2">
                      Veterinarian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.vet_name}
                      onChange={(e) => setFormData({ ...formData, vet_name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins']"
                      placeholder="e.g., Dr. Sarah Johnson"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Visit Date */}
                  <div>
                    <label className="block font-['Poppins'] text-gray-700 mb-2">
                      Visit Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.visit_date}
                      onChange={(e) => setFormData({ ...formData, visit_date: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins']"
                    />
                  </div>

                  {/* Next Visit Due */}
                  <div>
                    <label className="block font-['Poppins'] text-gray-700 mb-2">
                      Next Visit Due
                    </label>
                    <input
                      type="date"
                      value={formData.next_visit_due}
                      onChange={(e) => setFormData({ ...formData, next_visit_due: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins']"
                    />
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <label className="block font-['Poppins'] text-gray-700 mb-2">
                    Purpose *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins']"
                    placeholder="e.g., Annual Checkup, Vaccination, Surgery"
                  />
                </div>

                {/* Diagnosis */}
                <div>
                  <label className="block font-['Poppins'] text-gray-700 mb-2">
                    Diagnosis *
                  </label>
                  <textarea
                    required
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins'] resize-none"
                    placeholder="Enter diagnosis details..."
                  />
                </div>

                {/* Treatment */}
                <div>
                  <label className="block font-['Poppins'] text-gray-700 mb-2">
                    Treatment *
                  </label>
                  <textarea
                    required
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins'] resize-none"
                    placeholder="Enter treatment details, medications, procedures..."
                  />
                </div>

                {/* Remarks */}
                <div>
                  <label className="block font-['Poppins'] text-gray-700 mb-2">
                    Remarks *
                  </label>
                  <textarea
                    required
                    value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#fd7e14] font-['Poppins'] resize-none"
                    placeholder="Additional notes, observations, follow-up instructions..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors font-['Poppins']"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#fd7e14] hover:bg-[#e8590c] text-white rounded-2xl transition-colors shadow-lg hover:shadow-xl font-['Poppins']"
                  >
                    {editingVisit ? 'Update Visit' : 'Save Visit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Vet Visit"
        message="Are you sure you want to delete this vet visit record? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />

      {/* Success Banner */}
      <SuccessBanner
        isOpen={showSuccessBanner}
        message={successMessage}
        onClose={() => setShowSuccessBanner(false)}
      />
    </div>
  );
}





