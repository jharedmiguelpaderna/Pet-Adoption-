'use client';

import { useState } from "react";
import Image from "next/image";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import petAdoptionLogo from "../public/assets/71d71154ec44d1a48b190e4183283985e91e2442.png";
import { PawPrint } from "lucide-react";

function Logo() {
  return (
    <div className="flex justify-center mb-1" data-name="Logo">
      <Image
        src={petAdoptionLogo}
        alt="Pet Adoption"
        className="w-[280px] h-auto -my-[50px]"
        width={280}
        height={60}
        unoptimized
      />
    </div>
  );
}

export type UserRole = "admin" | "adopter";
export type AuthMode = "login" | "register";

// User data structure from API response
interface AdminUserData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

interface AdopterUserData {
  id: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  created_at?: string;
  updated_at?: string;
}

type UserData = AdminUserData | AdopterUserData;

interface AuthPageProps {
  onAuthSuccess?: (role: UserRole, email: string, userData?: UserData, token?: string) => void;
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [userRole, setUserRole] = useState<UserRole>("adopter");

  const handleLoginSuccess = (role: UserRole, email: string, userData: UserData, token: string) => {
    if (onAuthSuccess) {
      onAuthSuccess(role, email, userData, token);
    }
  };

  const handleRegisterSuccess = (role: UserRole, email: string, userData?: UserData, token?: string) => {
    if (onAuthSuccess) {
      onAuthSuccess(role, email, userData, token);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden flex flex-col items-center justify-center px-4"
      suppressHydrationWarning
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#fd7e14] to-[#ff9247] opacity-3 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Paw Print Pattern Decorations - Unsynchronized */}
      <div className="absolute top-20 left-10 text-[#fd7e14] opacity-0 animate-[fadeInOut_3.8s_0.2s_infinite] pointer-events-none">
        <PawPrint className="w-16 h-16" />
      </div>
      <div className="absolute bottom-32 right-16 text-[#fd7e14] opacity-0 animate-[fadeInOut_6.3s_1.7s_infinite] pointer-events-none">
        <PawPrint className="w-20 h-20" />
      </div>
      <div className="absolute top-1/3 right-20 text-[#fd7e14] opacity-0 animate-[fadeInOut_4.6s_2.9s_infinite] pointer-events-none">
        <PawPrint className="w-12 h-12" />
      </div>
      <div className="absolute bottom-20 left-1/4 text-[#fd7e14] opacity-0 animate-[fadeInOut_5.4s_0.6s_infinite] pointer-events-none">
        <PawPrint className="w-10 h-10" />
      </div>
      <div className="absolute top-1/2 left-12 text-[#fd7e14] opacity-0 animate-[fadeInOut_7.2s_1.4s_infinite] pointer-events-none">
        <PawPrint className="w-14 h-14" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 text-[#fd7e14] opacity-0 animate-[fadeInOut_3.4s_3.1s_infinite] pointer-events-none">
        <PawPrint className="w-18 h-18" />
      </div>
      <div className="absolute top-[15%] right-[35%] text-[#fd7e14] opacity-0 animate-[fadeInOut_6.1s_0.8s_infinite] pointer-events-none">
        <PawPrint className="w-11 h-11" />
      </div>
      <div className="absolute bottom-[15%] left-[35%] text-[#fd7e14] opacity-0 animate-[fadeInOut_4.2s_2.3s_infinite] pointer-events-none">
        <PawPrint className="w-13 h-13" />
      </div>
      
      <div className="w-full max-w-[420px] relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Logo />
        </div>

        {/* Auth Container */}
        <div className="bg-white rounded-[20px] shadow-[0px_16px_24px_0px_rgba(0,0,0,0.08)] p-6">
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-4 bg-[#f8f9fa] rounded-[12px] p-1">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className={`flex-1 py-3 px-4 rounded-[10px] transition-all cursor-pointer select-none text-sm ${
                authMode === "login"
                  ? "bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)] font-['Poppins:SemiBold',sans-serif] text-black"
                  : "font-['Poppins:Medium',sans-serif] text-[rgba(0,0,0,0.6)] hover:bg-white/50 hover:text-black"
              }`}
              suppressHydrationWarning
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("register")}
              className={`flex-1 py-3 px-4 rounded-[10px] transition-all cursor-pointer select-none text-sm ${
                authMode === "register"
                  ? "bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)] font-['Poppins:SemiBold',sans-serif] text-black"
                  : "font-['Poppins:Medium',sans-serif] text-[rgba(0,0,0,0.6)] hover:bg-white/50 hover:text-black"
              }`}
              suppressHydrationWarning
            >
              Register
            </button>
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <p className="font-['Poppins:Medium',sans-serif] text-black mb-2 text-sm">I am a:</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setUserRole("adopter")}
                className={`flex-1 py-3 px-4 rounded-[12px] border-2 transition-all cursor-pointer select-none text-sm ${
                  userRole === "adopter"
                    ? "border-[#fd7e14] bg-[#fd7e14]/5 font-['Poppins:SemiBold',sans-serif] text-[#fd7e14]"
                    : "border-[#e9ecef] font-['Poppins:Medium',sans-serif] text-[rgba(0,0,0,0.6)] hover:border-[#fd7e14]/50 hover:bg-[#fd7e14]/5 hover:text-[#fd7e14]"
                }`}
                suppressHydrationWarning
              >
                Adopter
              </button>
              <button
                type="button"
                onClick={() => setUserRole("admin")}
                className={`flex-1 py-3 px-4 rounded-[12px] border-2 transition-all cursor-pointer select-none text-sm ${
                  userRole === "admin"
                    ? "border-[#fd7e14] bg-[#fd7e14]/5 font-['Poppins:SemiBold',sans-serif] text-[#fd7e14]"
                    : "border-[#e9ecef] font-['Poppins:Medium',sans-serif] text-[rgba(0,0,0,0.6)] hover:border-[#fd7e14]/50 hover:bg-[#fd7e14]/5 hover:text-[#fd7e14]"
                }`}
                suppressHydrationWarning
              >
                Admin
              </button>
            </div>
          </div>

          {/* Form */}
          {authMode === "login" ? (
            <LoginForm role={userRole} onSuccess={handleLoginSuccess} />
          ) : (
            <RegisterForm role={userRole} onSuccess={handleRegisterSuccess} />
          )}
        </div>

        {/* Footer Text */}
        <p className="text-center mt-6 font-['Poppins:Regular',sans-serif] text-[rgba(0,0,0,0.6)]">
          {authMode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className="inline-block font-['Poppins:SemiBold',sans-serif] text-[#fd7e14] hover:text-[#e56d0e] hover:underline transition-all cursor-pointer select-none px-1"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="inline-block font-['Poppins:SemiBold',sans-serif] text-[#fd7e14] hover:text-[#e56d0e] hover:underline transition-all cursor-pointer select-none px-1"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}