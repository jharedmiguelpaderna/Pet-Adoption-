import { useState, FormEvent } from 'react';
import { X, CheckCircle2, Mail } from 'lucide-react';
import type { UserRole } from './AuthPage';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
  onLoginSuccess?: (role: UserRole, email: string, userData: any, token: string) => void;
}

type Step = 'verification' | 'reset';

export function ForgotPasswordModal({ isOpen, onClose, role, onLoginSuccess }: ForgotPasswordModalProps) {
  const [step, setStep] = useState<Step>('verification');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  if (!isOpen) return null;

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendCode = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!email) {
      setError('Please enter your email');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Check if email exists for the specific role
      const storageKey = role === 'admin' ? 'registered_admins' : 'registered_adopters';
      const usersData = localStorage.getItem(storageKey);
      
      if (!usersData) {
        setError('No account found with this email');
        setIsLoading(false);
        return;
      }

      const users = JSON.parse(usersData);
      const userExists = users.some((u: any) => u.email === email);

      if (!userExists) {
        setError('No account found with this email');
        setIsLoading(false);
        return;
      }

      // Generate and "send" verification code
      const verificationCode = generateVerificationCode();
      setGeneratedCode(verificationCode);

      // In a real app, this would send an email
      // For demo purposes, we'll show it in console
      console.log(`[${role.toUpperCase()}] Verification code for ${email}: ${verificationCode}`);
      
      // Show alert with the code (simulating email)
      alert(`✅ Verification code sent!\n\nFor demo purposes, your code is: ${verificationCode}\n\n(In production, this would be sent to your email)`);

      // Move to next step
      setStep('reset');
      setIsLoading(false);

    } catch (err) {
      console.error('Send code error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSaveAndLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!code) {
      setError('Please enter the verification code');
      setIsLoading(false);
      return;
    }

    if (code !== generatedCode) {
      setError('Invalid verification code. Please try again.');
      setIsLoading(false);
      return;
    }

    if (!newPassword) {
      setError('Please enter a new password');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Update password in localStorage
      const storageKey = role === 'admin' ? 'registered_admins' : 'registered_adopters';
      const usersData = localStorage.getItem(storageKey);
      
      if (!usersData) {
        setError('An error occurred. Please try again.');
        setIsLoading(false);
        return;
      }

      const users = JSON.parse(usersData);
      const userIndex = users.findIndex((u: any) => u.email === email);

      if (userIndex === -1) {
        setError('An error occurred. Please try again.');
        setIsLoading(false);
        return;
      }

      // Update the password
      users[userIndex].password = newPassword;
      localStorage.setItem(storageKey, JSON.stringify(users));

      // Auto-login: Generate mock token and user data
      const userData = users[userIndex];
      const token = `mock_${role}_token_` + Math.random().toString(36).substr(2, 9);

      // Call the login success callback to log them in
      if (onLoginSuccess) {
        onLoginSuccess(role, email, userData, token);
      }

      // Reset modal state
      setStep('verification');
      setEmail('');
      setCode('');
      setNewPassword('');
      setGeneratedCode('');
      setError('');
      setIsLoading(false);
      onClose();

    } catch (err) {
      console.error('Password reset error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setStep('verification');
      setEmail('');
      setCode('');
      setNewPassword('');
      setGeneratedCode('');
      setError('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[1000]">
      <div className="bg-white rounded-[24px] max-w-md w-full shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-['Poppins'] text-2xl text-black">
            {step === 'verification' ? 'Reset Password' : 'Verify & Reset'}
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step 1: Verification Request */}
        {step === 'verification' && (
          <form onSubmit={handleSendCode} className="p-8 space-y-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#fd7e14]/10 rounded-full p-3">
                <Mail className="w-6 h-6 text-[#fd7e14]" />
              </div>
              <p className="font-['Poppins'] text-[#6a7282] text-sm">
                Enter your {role} email to receive a verification code.
              </p>
            </div>

            {/* Email Input */}
            <div>
              <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-red-600">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-[12px] font-['Poppins:SemiBold',sans-serif] hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#fd7e14] hover:bg-[#e96d0f] disabled:bg-[rgba(253,126,20,0.5)] text-white py-3 rounded-[12px] font-['Poppins:SemiBold',sans-serif] transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Code'
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Reset & Login */}
        {step === 'reset' && (
          <form onSubmit={handleSaveAndLogin} className="p-8 space-y-5">
            <div className="bg-green-50 border border-green-200 rounded-[12px] px-4 py-3 mb-4">
              <p className="font-['Poppins:Medium',sans-serif] text-green-700 text-sm">
                ✓ Code sent to {email}
              </p>
              <p className="font-['Poppins:Regular',sans-serif] text-green-600 text-xs mt-1">
                Check your email for the 6-digit verification code
              </p>
            </div>

            {/* Verification Code Input */}
            <div>
              <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                disabled={isLoading}
                maxLength={6}
                className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 font-['Poppins:Regular',sans-serif] text-black text-center text-2xl tracking-widest placeholder:text-[rgba(0,0,0,0.4)] placeholder:text-base placeholder:tracking-normal focus:border-[#fd7e14] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* New Password Input */}
            <div>
              <label className="block font-['Poppins:Medium',sans-serif] text-black mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  disabled={isLoading}
                  className="w-full bg-[#f8f9fa] border-2 border-transparent rounded-[12px] px-4 py-3 pr-12 font-['Poppins:Regular',sans-serif] text-black placeholder:text-[rgba(0,0,0,0.4)] focus:border-[#fd7e14] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.6)] transition-colors disabled:opacity-50"
                >
                  {showNewPassword ? (
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

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStep('verification');
                  setCode('');
                  setNewPassword('');
                  setError('');
                }}
                disabled={isLoading}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-[12px] font-['Poppins:SemiBold',sans-serif] hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#fd7e14] hover:bg-[#e96d0f] disabled:bg-[rgba(253,126,20,0.5)] text-white py-3 rounded-[12px] font-['Poppins:SemiBold',sans-serif] transition-colors flex items-center justify-center gap-2"
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
                  'Save & Login'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
