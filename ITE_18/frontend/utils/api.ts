// API Configuration
// Automatically detects if accessing via network IP and adjusts backend URL accordingly
// For networked access (e.g., 192.168.1.7:3000), backend will be at 192.168.1.7:8000
// For localhost access, backend will be at localhost:8000 or 127.0.0.1:8000
const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, '');

// Export as a function so it's evaluated dynamically on each call
// This ensures network IP detection works correctly
export const getApiBaseUrl = (): string => {
  // If explicitly set via environment variable, use it
  if (process.env.NEXT_PUBLIC_API_URL) {
    return normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL);
  }
  
  // Detect if we're running in browser (client-side)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    // If accessing via network IP (not localhost/127.0.0.1), use same IP for backend
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && !hostname.includes('localhost')) {
      // Use the same hostname but port 8000 for backend
      return normalizeBaseUrl(`${protocol}//${hostname}:8000`);
    }
  }
  
  // Default to localhost for server-side rendering or localhost access
  return normalizeBaseUrl("http://127.0.0.1:8000");
};

// Helper to build endpoint URLs dynamically
const buildEndpoint = (path: string): string => {
  return `${getApiBaseUrl()}${path.startsWith('/') ? path : '/' + path}`;
};

// Helper to get network-specific error message
export const getNetworkErrorMessage = (endpoint?: string): string => {
  const baseUrl = getApiBaseUrl();
  const isNetworkAccess = typeof window !== 'undefined' && 
    window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1';
  
  if (isNetworkAccess) {
    return `Unable to connect to backend at ${baseUrl}${endpoint || ''}.\n\n` +
           `For network access, start your backend with:\n` +
           `  php artisan serve --host=0.0.0.0 --port=8000\n\n` +
           `This makes the backend accessible from:\n` +
           `  - http://localhost:8000 (same machine)\n` +
           `  - http://${window.location.hostname}:8000 (network devices)\n\n` +
           `Also check:\n` +
           `  1. Backend is running\n` +
           `  2. Firewall allows port 8000\n` +
           `  3. CORS is configured (already done)`;
  } else {
    return `Unable to connect to backend at ${baseUrl}${endpoint || ''}.\n\n` +
           `Please ensure:\n` +
           `  1. Laravel backend is running: php artisan serve\n` +
           `  2. Backend URL is correct: ${baseUrl}\n` +
           `  3. CORS is properly configured`;
  }
};

// Note: API_BASE_URL is no longer exported as a constant
// All endpoints now use dynamic getters that call getApiBaseUrl() on each access
// This ensures network IP detection works correctly
// If you need the base URL directly, use: getApiBaseUrl()

// Development mode - set to true to use mock responses (no backend required)
// When false: Frontend uses real backend API with seeded database data
// When true: Frontend uses mock data from frontend/data/ folder
// IMPORTANT: Backend is now the source of truth.
// You can override via NEXT_PUBLIC_USE_MOCK_API=true in .env.local
export const USE_MOCK_API = (process.env.NEXT_PUBLIC_USE_MOCK_API || 'false') === 'true';

// API Endpoints - All endpoints are dynamically evaluated to support network access
// Each endpoint calls getApiBaseUrl() to detect the current hostname (localhost vs network IP)
export const API_ENDPOINTS = {
  // Auth endpoints
  get adminLogin() { return buildEndpoint('/api/auth/admin/login'); },
  get adopterLogin() { return buildEndpoint('/api/auth/adopter/login'); },
  get adminRegister() { return buildEndpoint('/api/auth/admin/register'); },
  get adopterRegister() { return buildEndpoint('/api/auth/adopter/register'); },
  get logout() { return buildEndpoint('/api/auth/logout'); },
  get logoutAll() { return buildEndpoint('/api/auth/logout-all'); },
  get me() { return buildEndpoint('/api/auth/me'); },
  get refresh() { return buildEndpoint('/api/auth/refresh'); },
  
  // Reports endpoints
  shelterSummary: (id: number) => buildEndpoint(`/api/reports/shelter/${id}`),
  get petsSummary() { return buildEndpoint('/api/reports/pets'); },
  
  // Pet endpoints
  get pets() { return buildEndpoint('/api/pets'); },
  pet: (id: number) => buildEndpoint(`/api/pets/${id}`),
  
  // Shelter endpoints
  get shelters() { return buildEndpoint('/api/shelters'); },
  shelter: (id: number) => buildEndpoint(`/api/shelters/${id}`),
  
  // Adoption endpoints
  get adoptionRequests() { return buildEndpoint('/api/adoption-requests'); },
  adoptionRequest: (id: number) => buildEndpoint(`/api/adoption-requests/${id}`),
  get adoptions() { return buildEndpoint('/api/adoptions'); }, // Backend uses /api/adoptions (admin only)
  get myAdoptions() { return buildEndpoint('/api/adoptions/me'); }, // Get own adoption requests (adopter only)
  adoption: (id: number) => buildEndpoint(`/api/adoptions/${id}`),
  
  // User profile update endpoints (self-update)
  get updateAdopterSelf() { return buildEndpoint('/api/adopters/me'); },
  get updateAdminSelf() { return buildEndpoint('/api/admins/me'); },
  
  // Adopter endpoints
  get adopters() { return buildEndpoint('/api/adopters'); },
  adopter: (id: number) => buildEndpoint(`/api/adopters/${id}`),
  
  // Vet visits endpoints
  get vetVisits() { return buildEndpoint('/api/vet-visits'); },
  vetVisit: (id: number) => buildEndpoint(`/api/vet-visits/${id}`),
  
  // Notifications endpoint
  get notifications() { return buildEndpoint('/api/notifications'); },
};

// Helper function to handle 401 errors globally
export const handle401Error = () => {
  console.warn('Authentication failed (401). Clearing auth data and redirecting to login.');
  console.log('Token before clear:', localStorage.getItem('auth_token') ? 'Present' : 'Missing');
  clearAuthData();
  // Redirect to login page
  if (typeof window !== 'undefined') {
    // Small delay to ensure localStorage is cleared
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  }
};

// Helper function to get auth headers
export const getAuthHeaders = (): HeadersInit => {
  try {
    const token = localStorage.getItem("auth_token");
    const tokenType = localStorage.getItem("token_type") || "Bearer";
    
    const baseHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    
    if (!token) {
      console.warn('No auth token found in localStorage');
      return baseHeaders;
    }
    
    return {
      ...baseHeaders,
      "Authorization": `${tokenType} ${token}`,
    };
  } catch (error) {
    console.error('Error getting auth headers:', error);
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
  }
};

// Helper function to check if user is authenticated (with error handling)
export const isAuthenticated = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem("auth_token");
    return !!token && token.trim() !== '';
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Helper function to get current user data (with error handling)
export const getCurrentUser = () => {
  try {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem("user_data");
    const userRole = localStorage.getItem("user_role");
    
    if (userData && userRole) {
      try {
        const parsedUser = JSON.parse(userData);
        return {
          user: parsedUser,
          role: userRole as "admin" | "adopter",
        };
      } catch (parseError) {
        console.error('Error parsing user data:', parseError);
        return null;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Robust authentication check that verifies all required data exists
export const checkAuthentication = (): { authenticated: boolean; user: { user: unknown; role: "admin" | "adopter" } | null } => {
  try {
    if (typeof window === 'undefined') {
      return { authenticated: false, user: null };
    }

    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");
    const userRole = localStorage.getItem("user_role");

    if (!token || !userData || !userRole) {
      return { authenticated: false, user: null };
    }

    try {
      const parsedUser = JSON.parse(userData);
      return {
        authenticated: true,
        user: {
          user: parsedUser,
          role: userRole as "admin" | "adopter",
        }
      };
    } catch (parseError) {
      console.error('Error parsing user data:', parseError);
      return { authenticated: false, user: null };
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    return { authenticated: false, user: null };
  }
};

// Real API login functions
export const loginAdmin = async (email: string, password: string) => {
  try {
    const response = await fetch(API_ENDPOINTS.adminLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if response is JSON
    let data;
    try {
      data = await response.json();
    } catch {
      // If response is not JSON, it's likely a network/server error
      throw {
        isNetworkError: true,
        errors: {
          email: ['Unable to connect to the server. Please check if your backend is running.']
        }
      };
    }

    if (!response.ok) {
      // Handle validation errors from Laravel
      if (data.errors) {
        // Laravel returns "The provided credentials are incorrect." for both account not found and wrong password
        // We'll show a user-friendly message
        const errorMessage = data.errors.email?.[0] || data.errors.password?.[0] || data.message || 'Login failed';
        throw {
          errors: {
            email: [errorMessage.includes('credentials') || errorMessage.includes('incorrect') 
              ? 'Account not found or incorrect password.' 
              : errorMessage]
          }
        };
      }
      throw {
        errors: {
          email: [data.message || 'Login failed']
        }
      };
    }

    // Store authentication data
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('token_type', data.token_type || 'Bearer');
      localStorage.setItem('user_role', 'admin');
      localStorage.setItem('user_data', JSON.stringify(data.admin));
    }

    return data;
  } catch (error: unknown) {
    // Re-throw validation errors as-is
    if (error && typeof error === 'object' && 'errors' in error) {
      throw error;
    }
    // Handle network errors (fetch failed, no response, etc.)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw {
        isNetworkError: true,
        errors: {
          email: [getNetworkErrorMessage('/api/auth/admin/login')]
        }
      };
    }
    // Handle other errors
    const errorMessage = error instanceof Error ? error.message : 'Network error. Please check your connection.';
    throw {
      isNetworkError: true,
      errors: {
        email: [errorMessage]
      }
    };
  }
};

export const loginAdopter = async (email: string, password: string) => {
  try {
    const response = await fetch(API_ENDPOINTS.adopterLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if response is JSON
    let data;
    try {
      data = await response.json();
    } catch {
      // If response is not JSON, it's likely a network/server error
      throw {
        isNetworkError: true,
        errors: {
          email: ['Unable to connect to the server. Please check if your backend is running.']
        }
      };
    }

    if (!response.ok) {
      // Handle validation errors from Laravel
      if (data.errors) {
        // Laravel returns "The provided credentials are incorrect." for both account not found and wrong password
        // We'll show a user-friendly message
        const errorMessage = data.errors.email?.[0] || data.errors.password?.[0] || data.message || 'Login failed';
        throw {
          errors: {
            email: [errorMessage.includes('credentials') || errorMessage.includes('incorrect') 
              ? 'Account not found or incorrect password.' 
              : errorMessage]
          }
        };
      }
      throw {
        errors: {
          email: [data.message || 'Login failed']
        }
      };
    }

    // Store authentication data
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('token_type', data.token_type || 'Bearer');
      localStorage.setItem('user_role', 'adopter');
      localStorage.setItem('user_data', JSON.stringify(data.adopter));
    }

    return data;
  } catch (error: unknown) {
    // Re-throw validation errors as-is
    if (error && typeof error === 'object' && 'errors' in error) {
      throw error;
    }
    // Handle network errors (fetch failed, no response, etc.)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw {
        isNetworkError: true,
        errors: {
          email: [getNetworkErrorMessage('/api/auth/admin/login')]
        }
      };
    }
    // Handle other errors
    const errorMessage = error instanceof Error ? error.message : 'Network error. Please check your connection.';
    throw {
      isNetworkError: true,
      errors: {
        email: [errorMessage]
      }
    };
  }
};

// Logout function (calls backend to revoke token)
export const logout = async (): Promise<void> => {
  try {
    if (!USE_MOCK_API) {
      // Call backend logout endpoint
      const response = await fetch(API_ENDPOINTS.logout, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      
      // Check if logout was successful (200-299 status codes)
      if (!response.ok) {
        console.warn('Backend logout returned non-OK status:', response.status);
        // Continue with local logout even if backend fails
      }
    }
  } catch (error) {
    console.error('Error during logout:', error);
    // Continue with local logout even if API call fails
    // This ensures user can always logout locally even if backend is down
  } finally {
    // Always clear local storage
    clearAuthData();
  }
};

// Helper function to clear auth data
export const clearAuthData = () => {
  // Get user info BEFORE clearing localStorage
  const currentUser = getCurrentUser();
  const userEmail = currentUser?.user?.email;
  const userRole = currentUser?.role;
  
  // Clear all auth-related localStorage items
  localStorage.removeItem("auth_token");
  localStorage.removeItem("token_type");
  localStorage.removeItem("user_role");
  localStorage.removeItem("user_data");
  
  // Clear user-specific profile picture (using saved values)
  if (userEmail && userRole) {
    const emailKey = userEmail.replace(/[^a-zA-Z0-9]/g, '_');
    const profilePictureKey = `user_profile_picture_${emailKey}_${userRole}`;
    localStorage.removeItem(profilePictureKey);
  }
  
  // Clear all profile picture keys (fallback - in case email/role weren't captured)
  // This ensures we don't leave orphaned profile pictures
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('user_profile_picture_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    // Ignore errors in cleanup
    console.warn('Error cleaning up profile pictures:', error);
  }
};

// Helper function to get user-specific profile picture key
// Uses email + role as unique identifier since email is unique per user
export const getUserProfilePictureKey = (): string | null => {
  const currentUser = getCurrentUser();
  if (currentUser?.user?.email && currentUser?.role) {
    // Use email as the unique identifier (more reliable than ID in mock data)
    const emailKey = currentUser.user.email.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize email for localStorage key
    return `user_profile_picture_${emailKey}_${currentUser.role}`;
  }
  return null;
};

// Helper function to get user profile picture
export const getUserProfilePicture = (): string | null => {
  const key = getUserProfilePictureKey();
  if (!key || typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error getting profile picture:', error);
    return null;
  }
};

// Helper function to set user profile picture
export const setUserProfilePicture = (picture: string | null): void => {
  const key = getUserProfilePictureKey();
  if (!key || typeof window === 'undefined') return;
  try {
    if (picture) {
      localStorage.setItem(key, picture);
    } else {
      localStorage.removeItem(key);
    }
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('profilePictureUpdated'));
  } catch (error) {
    console.error('Error setting profile picture:', error);
  }
};

// Helper function to clean up old profile picture keys (ID-based format)
// This should be called on login to migrate from old key format to new email-based format
export const cleanupOldProfilePictures = (): void => {
  if (typeof window === 'undefined') return;
  try {
    // Get current user to check their email-based key
    const currentUser = getCurrentUser();
    if (!currentUser?.user?.email || !currentUser?.role) return;
    
    // Clean up old ID-based keys (if they exist)
    // Old format: user_profile_picture_${id}_${role}
    // New format: user_profile_picture_${emailKey}_${role}
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('user_profile_picture_') && key.includes(`_${currentUser.role}`)) {
        // Check if it's the old ID-based format (contains only numbers before the role)
        const parts = key.split('_');
        if (parts.length >= 4) {
          const idPart = parts[3]; // The ID part
          // If it's a number (old format), mark for removal
          if (!isNaN(Number(idPart)) && idPart !== currentUser.user.email.replace(/[^a-zA-Z0-9]/g, '_')) {
            keysToRemove.push(key);
          }
        }
      }
    }
    
    // Remove old keys
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error cleaning up old profile pictures:', error);
  }
};

// ==================== REPORTS API ====================

/**
 * Fetch summary for a specific shelter
 * Endpoint: GET /api/reports/shelter/{id}
 * Returns: { shelter: {...}, counts: {...} }
 */
export const fetchShelterSummary = async (shelterId: number) => {
  if (USE_MOCK_API) {
    // Return mock data
    const { shelterSummaries } = await import('../data/reportsData');
    const shelter = shelterSummaries.find(s => s.shelter.shelter_id === shelterId);
    if (!shelter) {
      throw new Error('Shelter not found');
    }
    return shelter;
  }

  const response = await fetch(API_ENDPOINTS.shelterSummary(shelterId), {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch shelter summary: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch overall pets summary
 * Endpoint: GET /api/reports/pets
 * Returns: { total, available, reserved, adopted }
 */
export const fetchPetsSummary = async () => {
  if (USE_MOCK_API) {
    // Return mock data
    const { petsSummary } = await import('../data/reportsData');
    return petsSummary;
  }

  const response = await fetch(API_ENDPOINTS.petsSummary, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch pets summary: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch all shelter summaries (calls shelterSummary for each shelter)
 * This is a helper that fetches multiple shelter summaries
 */
export const fetchAllShelterSummaries = async (shelterIds: number[]) => {
  if (USE_MOCK_API) {
    // Return all mock data
    const { shelterSummaries } = await import('../data/reportsData');
    return shelterSummaries;
  }

  const promises = shelterIds.map(id => fetchShelterSummary(id));
  return Promise.all(promises);
};