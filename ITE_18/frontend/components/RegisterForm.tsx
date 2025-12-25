import { useState, FormEvent } from "react";
import type { UserRole } from "./AuthPage";
import { API_ENDPOINTS } from "../utils/api";

interface RegisterFormProps {
  role: UserRole;
  onSuccess?: (role: UserRole, email: string, userData?: any, token?: string) => void;
}

export function RegisterForm({ role, onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    // Basic Info - Adopter
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    birth_date: "",
    pronouns: "",
    status: "",
    
    // Professional Info - Adopter
    occupation: "",
    company_name: "",
    social_media_profile: "",
    
    // Emergency Contact - Adopter
    alternate_contact_name: "",
    alternate_contact_relationship: "",
    alternate_contact_phone: "",
    alternate_contact_email: "",
    
    // Documents - Adopter
    valid_id: "",
    home_photos: "",
    
    // Admin Basic Info
    name: "",
    password: "",
    confirmPassword: "",
    
    // Shelter Info - Admin
    shelter_name: "",
    shelter_location: "",
    shelter_contact_info: "",
    staff_name: "",
    staff_email: "",
    staff_phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDraggingValidId, setIsDraggingValidId] = useState(false);
  const [isDraggingHomePhotos, setIsDraggingHomePhotos] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDragOver = (e: React.DragEvent, field: 'valid_id' | 'home_photos') => {
    e.preventDefault();
    e.stopPropagation();
    if (field === 'valid_id') {
      setIsDraggingValidId(true);
    } else {
      setIsDraggingHomePhotos(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent, field: 'valid_id' | 'home_photos') => {
    e.preventDefault();
    e.stopPropagation();
    if (field === 'valid_id') {
      setIsDraggingValidId(false);
    } else {
      setIsDraggingHomePhotos(false);
    }
  };

  const handleDrop = (e: React.DragEvent, field: 'valid_id' | 'home_photos') => {
    e.preventDefault();
    e.stopPropagation();
    
    if (field === 'valid_id') {
      setIsDraggingValidId(false);
    } else {
      setIsDraggingHomePhotos(false);
    }

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      
      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        setError('Please drop an image file (PNG, JPG, etc.)');
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleChange(field, event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validation for adopters
      if (role === "adopter") {
        if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
          setError("Please fill in all required fields (First Name, Last Name, Email, Password)");
          setIsLoading(false);
          return;
        }

        if (!formData.email.includes("@")) {
          setError("Please enter a valid email");
          setIsLoading(false);
          return;
        }

        if (formData.password.length < 8) {
          setError("Password must be at least 8 characters");
          setIsLoading(false);
          return;
        }

        // Call backend API to register adopter
        const response = await fetch(API_ENDPOINTS.adopterRegister, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone || null,
            address: formData.address || null,
            birth_date: formData.birth_date || null,
            pronouns: formData.pronouns || null,
            status: formData.status || null,
            occupation: formData.occupation || null,
            company_name: formData.company_name || null,
            social_media_profile: formData.social_media_profile || null,
            alternate_contact_name: formData.alternate_contact_name || null,
            alternate_contact_relationship: formData.alternate_contact_relationship || null,
            alternate_contact_phone: formData.alternate_contact_phone || null,
            alternate_contact_email: formData.alternate_contact_email || null,
            valid_id: formData.valid_id || null,
            home_photos: formData.home_photos || null,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }

        // Auto-login after successful registration
        const loginResponse = await fetch(API_ENDPOINTS.adopterLogin, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          // Success with authentication
          if (onSuccess) {
            onSuccess(role, formData.email, loginData.user, loginData.token);
          }
        } else {
          // Registration succeeded but auto-login failed - still call success
          if (onSuccess) {
            onSuccess(role, formData.email);
          }
        }
      } else {
        // Admin validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.shelter_name) {
          setError("Please fill in all required fields (Name, Email, Password, Shelter Name)");
          setIsLoading(false);
          return;
        }

        if (!formData.email.includes("@")) {
          setError("Please enter a valid email");
          setIsLoading(false);
          return;
        }

        if (formData.password.length < 8) {
          setError("Password must be at least 8 characters");
          setIsLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }

        // Call backend API to register admin
        const response = await fetch(API_ENDPOINTS.adminRegister, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone || null,
            shelter: {
              shelter_name: formData.shelter_name,
              location: formData.shelter_location || null,
              contact_info: formData.shelter_contact_info || null,
              staff_name: formData.staff_name || null,
              staff_email: formData.staff_email || null,
              staff_phone: formData.staff_phone || null,
            },
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }

        // Auto-login after successful registration
        const loginResponse = await fetch(API_ENDPOINTS.adminLogin, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          // Success with authentication
          if (onSuccess) {
            onSuccess(role, formData.email, loginData.user, loginData.token);
          }
        } else {
          // Registration succeeded but auto-login failed - still call success
          if (onSuccess) {
            onSuccess(role, formData.email);
          }
        }
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic Information Section */}
      <div>
        <h3 className="font-['Poppins:SemiBold',sans-serif] text-black mb-3 text-base">Basic Information</h3>
        <div className="space-y-3">
          {/* Adopter: First Name & Last Name */}
          {role === "adopter" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-1.5 text-sm">
                  First Name <span className="text-[#fd7e14]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => handleChange("first_name", e.target.value)}
                  placeholder="First name"
                  className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-2.5 text-sm font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-1.5 text-sm">
                  Last Name <span className="text-[#fd7e14]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => handleChange("last_name", e.target.value)}
                  placeholder="Last name"
                  className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-2.5 text-sm font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* Admin: Full Name */}
          {role === "admin" && (
            <div>
              <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                Full Name <span className="text-[#fd7e14]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block font-['Poppins:Medium',sans-serif] text-black mb-1.5 text-sm">
              Email <span className="text-[#fd7e14]">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-2.5 text-sm font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
            />
          </div>

          {/* Password - Required for both Adopter and Admin */}
          {role === "adopter" && (
            <>
              {/* Password */}
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-1.5 text-sm">
                  Password <span className="text-[#fd7e14]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Create a password (min 8 characters)"
                    className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-2.5 pr-12 text-sm font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.6)] transition-colors"
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Phone Number */}
          <div>
            <label className="block font-['Poppins:Medium',sans-serif] text-black mb-1.5 text-sm">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-2.5 text-sm font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
            />
          </div>

          {/* Password fields for Admin */}
          {role === "admin" && (
            <>
              {/* Password */}
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-1.5 text-sm">
                  Password <span className="text-[#fd7e14]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Create a password (min 8 characters)"
                    className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-2.5 pr-12 text-sm font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.6)] transition-colors"
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-1.5 text-sm">
                  Confirm Password <span className="text-[#fd7e14]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-2.5 pr-12 text-sm font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.6)] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {role === "adopter" && (
            <>
              {/* Birth Date & Pronouns */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => handleChange("birth_date", e.target.value)}
                    className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                    Pronouns
                  </label>
                  <input
                    type="text"
                    value={formData.pronouns}
                    onChange={(e) => handleChange("pronouns", e.target.value)}
                    placeholder="e.g., he/him, she/her"
                    className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                  Marital Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black focus:border-[#fd7e14] focus:outline-none transition-colors"
                >
                  <option value="">Select marital status (optional)</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter your full address"
                  rows={3}
                  className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors resize-none"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Professional Information (Adopter only) */}
      {role === "adopter" && (
        <div>
          <h3 className="font-['Poppins:SemiBold',sans-serif] text-black mb-4">Professional Information</h3>
          <div className="space-y-4">
            {/* Occupation & Company */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                  Occupation
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                  placeholder="Your occupation"
                  className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                  placeholder="Company name"
                  className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Social Media Profile */}
            <div>
              <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                Social Media Profile
              </label>
              <input
                type="url"
                value={formData.social_media_profile}
                onChange={(e) => handleChange("social_media_profile", e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contact (Adopter only) */}
      {role === "adopter" && (
        <div>
          <h3 className="font-['Poppins:SemiBold',sans-serif] text-black mb-4">Emergency Contact</h3>
          <div className="space-y-4">
            {/* Contact Name & Relationship */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                  Contact Name
                </label>
                <input
                  type="text"
                  value={formData.alternate_contact_name}
                  onChange={(e) => handleChange("alternate_contact_name", e.target.value)}
                  placeholder="Full name"
                  className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                  Relationship
                </label>
                <input
                  type="text"
                  value={formData.alternate_contact_relationship}
                  onChange={(e) => handleChange("alternate_contact_relationship", e.target.value)}
                  placeholder="e.g., Spouse, Parent"
                  className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Contact Phone & Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.alternate_contact_phone}
                  onChange={(e) => handleChange("alternate_contact_phone", e.target.value)}
                  placeholder="Phone number"
                  className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.alternate_contact_email}
                  onChange={(e) => handleChange("alternate_contact_email", e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents (Adopter only) */}
      {role === "adopter" && (
        <div>
          <h3 className="font-['Poppins:SemiBold',sans-serif] text-black mb-4">Documents (Optional)</h3>
          <div className="space-y-4">
            {/* Valid ID URL */}
            <div
              onDragOver={(e) => handleDragOver(e, 'valid_id')}
              onDragLeave={(e) => handleDragLeave(e, 'valid_id')}
              onDrop={(e) => handleDrop(e, 'valid_id')}
            >
              <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                Valid ID (URL)
              </label>
              <input
                type="url"
                value={formData.valid_id}
                onChange={(e) => handleChange("valid_id", e.target.value)}
                placeholder="https://... (link to your ID) or drag & drop image"
                className={`w-full bg-[#f8f9fa] border-2 ${isDraggingValidId ? 'border-[#fd7e14]' : 'border-transparent'} rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors`}
              />
            </div>

            {/* Home Photos URL */}
            <div
              onDragOver={(e) => handleDragOver(e, 'home_photos')}
              onDragLeave={(e) => handleDragLeave(e, 'home_photos')}
              onDrop={(e) => handleDrop(e, 'home_photos')}
            >
              <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                Home Photos (URL)
              </label>
              <input
                type="url"
                value={formData.home_photos}
                onChange={(e) => handleChange("home_photos", e.target.value)}
                placeholder="https://... (link to your home photos) or drag & drop image"
                className={`w-full bg-[#f8f9fa] border-2 ${isDraggingHomePhotos ? 'border-[#fd7e14]' : 'border-transparent'} rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Shelter Information (Admin only) */}
      {role === "admin" && (
        <div>
          <h3 className="font-['Poppins:SemiBold',sans-serif] text-black mb-4">Shelter Information</h3>
          <div className="space-y-4">
            {/* Shelter Name */}
            <div>
              <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                Shelter Name <span className="text-[#fd7e14]">*</span>
              </label>
              <input
                type="text"
                value={formData.shelter_name}
                onChange={(e) => handleChange("shelter_name", e.target.value)}
                placeholder="Enter shelter name"
                className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
              />
            </div>

            {/* Shelter Location */}
            <div>
              <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                Shelter Location
              </label>
              <input
                type="text"
                value={formData.shelter_location}
                onChange={(e) => handleChange("shelter_location", e.target.value)}
                placeholder="Enter shelter location/address"
                className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
              />
            </div>

            {/* Shelter Contact Info */}
            <div>
              <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                Shelter Contact Info
              </label>
              <input
                type="text"
                value={formData.shelter_contact_info}
                onChange={(e) => handleChange("shelter_contact_info", e.target.value)}
                placeholder="Enter contact information"
                className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
              />
            </div>

            {/* Staff Information */}
            <div className="pt-2">
              <p className="font-['Poppins:Medium',sans-serif] text-black mb-3">Staff Contact (Optional)</p>
              <div className="space-y-4">
                {/* Staff Name */}
                <div>
                  <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    value={formData.staff_name}
                    onChange={(e) => handleChange("staff_name", e.target.value)}
                    placeholder="Enter staff name"
                    className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                  />
                </div>

                {/* Staff Email & Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                      Staff Email
                    </label>
                    <input
                      type="email"
                      value={formData.staff_email}
                      onChange={(e) => handleChange("staff_email", e.target.value)}
                      placeholder="staff@email.com"
                      className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                      Staff Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.staff_phone}
                      onChange={(e) => handleChange("staff_phone", e.target.value)}
                      placeholder="Phone number"
                      className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          className="mt-1 w-4 h-4 accent-[#fd7e14] cursor-pointer"
          required
        />
        <label htmlFor="terms" className="font-['Poppins:Regular',sans-serif] text-[rgba(0,0,0,0.8)] cursor-pointer">
          I agree to the{" "}
          <button type="button" className="font-['Poppins:SemiBold',sans-serif] text-[#fd7e14] hover:underline">
            Terms and Conditions
          </button>{" "}
          and{" "}
          <button type="button" className="font-['Poppins:SemiBold',sans-serif] text-[#fd7e14] hover:underline">
            Privacy Policy
          </button>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-red-600">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#fd7e14] hover:bg-[#e96d0f] disabled:bg-[rgba(253,126,20,0.5)] rounded-[12px] px-6 py-3 font-['Poppins:SemiBold',sans-serif] text-white transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </>
        ) : (
          `Register as ${role.charAt(0).toUpperCase() + role.slice(1)}`
        )}
      </button>
    </form>
  );
}