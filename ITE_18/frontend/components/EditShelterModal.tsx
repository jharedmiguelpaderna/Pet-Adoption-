import { X, Save } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface Shelter {
  shelter_id: number;
  admin_id: number;
  shelter_name: string;
  staff_name: string | null;
  staff_email: string | null;
  staff_phone: string | null;
  location: string | null;
  contact_info: string | null;
  description?: string | null;
  image_url?: string | null;
  pet_count?: number;
}

interface EditShelterModalProps {
  shelter: Shelter;
  onClose: () => void;
  onSave: (shelter: Shelter) => void;
}

export function EditShelterModal({ shelter, onClose, onSave }: EditShelterModalProps) {
  const [formData, setFormData] = useState<Shelter>(shelter);

  useEffect(() => {
    setFormData(shelter);
  }, [shelter]);

  const hasChanges = useMemo(() => {
    const normalize = (value: Shelter) => ({
      ...value,
      staff_name: value.staff_name ?? null,
      staff_email: value.staff_email ?? null,
      staff_phone: value.staff_phone ?? null,
      location: value.location ?? null,
      contact_info: value.contact_info ?? null,
    });

    return JSON.stringify(normalize(formData)) !== JSON.stringify(normalize(shelter));
  }, [formData, shelter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'admin_id') {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges) {
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[1000] overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] shadow-2xl my-8 animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between bg-white rounded-t-3xl flex-shrink-0">
          <h2 className="font-['Poppins'] text-2xl text-black">Edit Shelter</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Shelter Information */}
              <div>
                <h3 className="font-['Poppins'] text-lg text-black mb-4">Shelter Information</h3>
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
                      value={formData.location || ''}
                      onChange={handleChange}
                      maxLength={255}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                    />
                  </div>

                  <div>
                    <label htmlFor="admin_id" className="font-['Poppins'] text-black mb-2 block">
                      Admin ID *
                    </label>
                    <input
                      type="number"
                      id="admin_id"
                      name="admin_id"
                      value={formData.admin_id}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                    />
                  </div>
                </div>
              </div>

              {/* Staff Information */}
              <div>
                <h3 className="font-['Poppins'] text-lg text-black mb-4">Staff Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="staff_name" className="font-['Poppins'] text-black mb-2 block">
                      Staff Name
                    </label>
                    <input
                      type="text"
                      id="staff_name"
                      name="staff_name"
                      value={formData.staff_name || ''}
                      onChange={handleChange}
                      maxLength={255}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
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
                      value={formData.staff_email || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
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
                      value={formData.staff_phone || ''}
                      onChange={handleChange}
                      maxLength={30}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
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
                  value={formData.contact_info || ''}
                  onChange={handleChange}
                  maxLength={255}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] resize-none"
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
                disabled={!hasChanges}
                className={`flex-1 bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white py-3 rounded-xl font-['Poppins'] transition-all duration-300 flex items-center justify-center gap-2 ${
                  hasChanges ? 'hover:shadow-lg' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}