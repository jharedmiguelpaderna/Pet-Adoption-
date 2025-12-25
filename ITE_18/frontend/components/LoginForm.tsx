import { useState, FormEvent } from "react";
import type { UserRole } from "./AuthPage";
import { API_ENDPOINTS, USE_MOCK_API, cleanupOldProfilePictures, loginAdmin, loginAdopter } from "../utils/api";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

interface LoginFormProps {
  role: UserRole;
  onSuccess?: (role: UserRole, email: string, userData: any, token: string) => void;
}

// Mock API response for development (only used when USE_MOCK_API = true)
// When USE_MOCK_API = false, the frontend will use real backend API with seeded database data
const mockLogin = async (role: UserRole, email: string, password?: string): Promise<any> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // For mock mode, accept any email/password combination
  // In production (USE_MOCK_API = false), this will use real backend authentication
  const userId = Math.abs(email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 1000;
  const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Mock successful response matching Laravel structure
  if (role === "admin") {
    return {
      message: "Login successful",
      admin: {
        id: userId,
        name: name || "Admin User",
        email: email,
        phone: "+1234567890",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      token: "mock_admin_token_" + Math.random().toString(36).substr(2, 9),
      token_type: "Bearer"
    };
  } else {
    return {
      message: "Login successful",
      adopter: {
        id: userId,
        first_name: name.split(' ')[0] || name || "Adopter",
        last_name: name.split(' ').slice(1).join(' ') || "User",
        name: name || "Adopter User",
        email: email,
        phone: "+1234567890",
        date_of_birth: "1990-01-01",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      token: "mock_adopter_token_" + Math.random().toString(36).substr(2, 9),
      token_type: "Bearer"
    };
  }
};

export function LoginForm({ role, onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate email
      if (!email) {
        setError("Please enter your email");
        setIsLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email");
        setIsLoading(false);
        return;
      }

      // Admin requires password validation
      if (role === "admin") {
        if (!password) {
          setError("Please enter your password");
          setIsLoading(false);
          return;
        }
      }

      // Adopter also requires password validation
      if (role === "adopter") {
        if (!password) {
          setError("Please enter your password");
          setIsLoading(false);
          return;
        }
      }

      let data;

      if (USE_MOCK_API) {
        // Use mock API for development
        try {
          data = await mockLogin(role, email, password);

          // In mock mode we must manually persist auth state so checkAuthentication()
          // and the protected /home route see the user as logged in.
          const userData = role === "admin" ? data.admin : data.adopter;
          const token = data.token || `mock_${role}_token`;
          const tokenType = data.token_type || "Bearer";

          if (typeof window !== "undefined") {
            localStorage.setItem("auth_token", token);
            localStorage.setItem("token_type", tokenType);
            localStorage.setItem("user_role", role);
            localStorage.setItem("user_data", JSON.stringify(userData));
          }
        } catch (mockError: any) {
          if (mockError.errors) {
            const errorMessages = Object.values(mockError.errors).flat();
            setError(errorMessages[0] as string);
          } else {
            setError("The provided credentials are incorrect.");
          }
          setIsLoading(false);
          return;
        }
      } else {
        // Use real API
        try {
          if (role === "admin") {
            data = await loginAdmin(email, password);
          } else {
            data = await loginAdopter(email, password);
          }
        } catch (apiError: any) {
          // Handle validation errors from Laravel
          if (apiError.errors) {
            const errorMessages = Object.values(apiError.errors).flat();
            setError(errorMessages[0] as string);
          } else if (apiError.isNetworkError) {
            // Network error - backend not reachable
            setError(
              "Unable to connect to the server. Please check:\n" +
              "1. Your Laravel backend is running (php artisan serve)\n" +
              "2. The API_BASE_URL in /utils/api.ts is correct\n" +
              "3. CORS is configured on your backend\n\n" +
              "Or set USE_MOCK_API = true in /utils/api.ts to test without backend."
            );
          } else {
            setError("An unexpected error occurred. Please try again.");
          }
          setIsLoading(false);
          return;
        }
      }

      // Authentication data is stored either by loginAdmin/loginAdopter (real API)
      // or by the mock branch above. Get user data for callback:
      const userData = role === "admin" ? data.admin : data.adopter;

      // Clean up old profile picture keys (migrate from ID-based to email-based)
      cleanupOldProfilePictures();

      // Success callback
      if (onSuccess) {
        onSuccess(role, email, userData, data.token);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email Input */}
        <div>
          <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
            suppressHydrationWarning
          />
        </div>

        {/* Password Input - For both Admin and Adopter */}
        <div>
          <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 pr-12 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors"
              suppressHydrationWarning
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.6)] transition-colors"
              suppressHydrationWarning
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

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-red-600">
            {error}
          </div>
        )}

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="font-['Poppins:Medium',sans-serif] text-[#fd7e14] hover:text-[#e56d0e] hover:underline transition-colors cursor-pointer"
            suppressHydrationWarning
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#fd7e14] hover:bg-[#e96d0f] disabled:bg-[rgba(253,126,20,0.5)] rounded-[12px] px-6 py-3 font-['Poppins:SemiBold',sans-serif] text-white transition-colors flex items-center justify-center gap-2"
          suppressHydrationWarning
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`
          )}
        </button>
      </form>

      {/* Forgot Password Modal - Outside form to avoid nesting */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        role={role}
        onLoginSuccess={onSuccess}
      />
    </>
  );
}