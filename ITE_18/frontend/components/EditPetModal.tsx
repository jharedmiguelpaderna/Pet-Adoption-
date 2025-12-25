import { X, Save, Upload, Image as ImageIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Pet {
  pet_id: number;
  shelter_id: number;
  name: string;
  species: string;
  breed: string | null;
  age: number | null;
  gender: string | null;
  weight: number | null;
  health_status: string | null;
  food_preferences: string | null;
  last_vet_visit: string | null;
  next_vet_visit_due: string | null;
  adoption_status: 'available' | 'reserved' | 'adopted';
  date_admitted: string | null;
  description: string | null;
  photo_url: string | null;
  location?: string;
}

interface EditPetModalProps {
  pet: Pet;
  onClose: () => void;
  onSave: (updatedPet: Pet) => void;
}

export function EditPetModal({ pet, onClose, onSave }: EditPetModalProps) {
  const [formData, setFormData] = useState<Pet>(pet);
  const [imagePreview, setImagePreview] = useState<string | null>(pet.photo_url || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Update form data and preview when pet prop changes
  useEffect(() => {
    setFormData(pet);
    setImagePreview(pet.photo_url || null);
  }, [pet]);
  
  // Mock shelters data
  const shelters = [
    { shelter_id: 1, shelter_name: 'Happy Paws Animal Shelter' },
    { shelter_id: 2, shelter_name: 'Loving Hearts Rescue' },
    { shelter_id: 3, shelter_name: 'Safe Haven Pet Sanctuary' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'age' || name === 'weight' || name === 'shelter_id') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? null : Number(value)
      }));
    } else if (name === 'photo_url') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? null : value
      }));
      setImagePreview(value || null);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? null : value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({
          ...prev,
          photo_url: result // Store as data URL for now
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[1000] overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="font-['Poppins'] text-3xl text-black">Edit Pet Information</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Pet Image */}
            <div>
              <label className="font-['Poppins'] text-black mb-2 block">Pet Image</label>
              <div className="relative h-64 rounded-2xl overflow-hidden mb-3 border-2 border-gray-200">
                {imagePreview ? (
                <img
                    src={imagePreview}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                {/* Edit Photo Overlay Button */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100 group">
                  <button
                    type="button"
                    onClick={handleEditPhotoClick}
                    className="px-6 py-3 bg-white text-[#fd7e14] rounded-xl font-['Poppins'] font-semibold shadow-lg hover:bg-[#fd7e14] hover:text-white transition-all duration-300 flex items-center gap-2 transform scale-0 group-hover:scale-100"
                  >
                    <Upload className="w-5 h-5" />
                    Edit Photo
                  </button>
                </div>
              </div>
              
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {/* Edit Photo Button (Alternative) */}
              <button
                type="button"
                onClick={handleEditPhotoClick}
                className="w-full mb-3 px-4 py-3 bg-[#fd7e14] text-white rounded-xl font-['Poppins'] hover:bg-[#e56d0e] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload New Photo
              </button>
              
              {/* Image URL Input (Alternative method) */}
              <div className="relative">
              <input
                type="text"
                name="photo_url"
                value={formData.photo_url || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                  placeholder="Or enter image URL"
              />
                <p className="text-xs text-gray-500 mt-1 font-['Poppins']">You can upload a file or paste an image URL</p>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="font-['Poppins'] text-black mb-2 block">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                />
              </div>

              <div>
                <label htmlFor="breed" className="font-['Poppins'] text-black mb-2 block">
                  Breed
                </label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={formData.breed || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                />
              </div>

              <div>
                <label htmlFor="species" className="font-['Poppins'] text-black mb-2 block">
                  Species *
                </label>
                <select
                  id="species"
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] bg-white"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Snake">Snake</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="age" className="font-['Poppins'] text-black mb-2 block">
                  Age (years)
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age === null ? '' : formData.age}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  placeholder="e.g., 2"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                />
              </div>

              <div>
                <label htmlFor="gender" className="font-['Poppins'] text-black mb-2 block">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] bg-white"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label htmlFor="weight" className="font-['Poppins'] text-black mb-2 block">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight === null ? '' : formData.weight}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  placeholder="e.g., 32.5"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                />
              </div>

              <div>
                <label htmlFor="health_status" className="font-['Poppins'] text-black mb-2 block">
                  Health Status
                </label>
                <select
                  id="health_status"
                  name="health_status"
                  value={formData.health_status || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] bg-white"
                >
                  <option value="">Select health status</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Needs Medical Attention">Needs Medical Attention</option>
                </select>
              </div>

              <div>
                <label htmlFor="adoption_status" className="font-['Poppins'] text-black mb-2 block">
                  Adoption Status *
                </label>
                <select
                  id="adoption_status"
                  name="adoption_status"
                  value={formData.adoption_status}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] bg-white"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="adopted">Adopted</option>
                </select>
              </div>

              <div>
                <label htmlFor="shelter_id" className="font-['Poppins'] text-black mb-2 block">
                  Shelter ID *
                </label>
                <select
                  id="shelter_id"
                  name="shelter_id"
                  value={formData.shelter_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] bg-white"
                >
                  {shelters.map(shelter => (
                    <option key={shelter.shelter_id} value={shelter.shelter_id}>
                      {shelter.shelter_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="font-['Poppins'] text-black mb-2 block">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
              />
            </div>

            {/* Food Preferences */}
            <div>
              <label htmlFor="food_preferences" className="font-['Poppins'] text-black mb-2 block">
                Food Preferences
              </label>
              <textarea
                id="food_preferences"
                name="food_preferences"
                value={formData.food_preferences || ''}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] resize-none"
                placeholder="e.g., Grain-free dry food, loves chicken treats"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="last_vet_visit" className="font-['Poppins'] text-black mb-2 block">
                  Last Vet Visit
                </label>
                <input
                  type="date"
                  id="last_vet_visit"
                  name="last_vet_visit"
                  value={formData.last_vet_visit || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                />
              </div>

              <div>
                <label htmlFor="next_vet_visit_due" className="font-['Poppins'] text-black mb-2 block">
                  Next Vet Visit Due
                </label>
                <input
                  type="date"
                  id="next_vet_visit_due"
                  name="next_vet_visit_due"
                  value={formData.next_vet_visit_due || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                />
              </div>

              <div>
                <label htmlFor="date_admitted" className="font-['Poppins'] text-black mb-2 block">
                  Date Admitted
                </label>
                <input
                  type="date"
                  id="date_admitted"
                  name="date_admitted"
                  value={formData.date_admitted || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="font-['Poppins'] text-black mb-2 block">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] resize-none"
                placeholder="Tell us about this pet..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-['Poppins'] hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white py-3 rounded-xl font-['Poppins'] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}