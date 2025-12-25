'use client';

import { Bell, User } from "lucide-react";
import { Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { NotificationDropdown } from "./NotificationDropdown";
import { UserDropdown } from "./UserDropdown";
import { Footer } from "./Footer";
import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import logoImage from "../public/assets/71d71154ec44d1a48b190e4183283985e91e2442.png";
import { useNotifications } from "../contexts/NotificationContext";
import { getCurrentUser } from "../utils/api";

type UserRole = 'admin' | 'adopter';

function Group() {
  return (
    <div className="h-[100px] w-[400px] relative shrink-0" data-name="Logo">
      <Image 
        src={logoImage} 
        alt="Pet Adoption" 
        className="h-full w-full object-contain"
        width={400}
        height={100}
        unoptimized
      />
    </div>
  );
}

function Logo() {
  // Home page (landing) is the same for both roles
  const homePath = '/home';
  
  return (
    <Link
      href={homePath}
      className="content-stretch flex gap-[8px] items-center relative shrink-0 cursor-pointer"
      data-name="Logo"
    >
      <Group />
    </Link>
  );
}

function NavLink({ label, path }: { label: string; path: string }) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className="box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative shrink-0 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105"
      data-name="NavLink"
    >
      {isActive && (
        <div
          aria-hidden="true"
          className="absolute border-[#fd7e14] border-[0px_0px_2px] border-solid inset-0 pointer-events-none"
        />
      )}
      <p
        className={`font-['Poppins:${isActive ? 'SemiBold' : 'Medium'}',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] ${
          isActive ? 'text-[#fd7e14]' : 'text-black'
        } text-nowrap whitespace-pre`}
      >
        {label}
      </p>
    </Link>
  );
}

function Text() {
  const homePath = '/home';
  return <NavLink label="Home" path={homePath} />;
}

const Text1 = () => <NavLink label="Browse Pets" path="/browse-pets" />;
const Text1a = () => <NavLink label="Shelters" path="/shelters" />;
const Text2 = () => <NavLink label="About Us" path="/about-us" />;
const Text3 = () => <NavLink label="Contact Us" path="/contact-us" />;

// Admin Dashboard Menu Item
function DashboardMenuItem() {
  return <NavLink label="Dashboard" path="/admin/dashboard" />;
}

function PetsMenuItem() {
  return <NavLink label="Pets" path="/admin/pets" />;
}

// Admin Shelters Menu Item
function SheltersMenuItem() {
  return <NavLink label="Shelters" path="/admin/shelters" />;
}

// Admin Adoption Requests Menu Item
function AdoptionRequestsMenuItem() {
  return <NavLink label="Adoption Requests" path="/admin/adoption-requests" />;
}

// Admin Vet Visits Menu Item
function VetVisitsMenuItem() {
  return <NavLink label="Vet Visits" path="/admin/vet-visits" />;
}

// Admin Menu (no Browse Pets, Shelters, About Us, Contact Us)
function AdminMenu() {
  return (
    <div className="flex content-stretch gap-[16px] items-center justify-center relative shrink-0 z-10" data-name="Menu">
      <Text />
      <DashboardMenuItem />
      <PetsMenuItem />
      <SheltersMenuItem />
      <AdoptionRequestsMenuItem />
      <VetVisitsMenuItem />
    </div>
  );
}

// Adopter Menu (the original menu)
function AdopterMenu() {
  return (
    <div className="flex content-stretch gap-[16px] items-center justify-center relative shrink-0 z-10" data-name="Menu">
      <Text />
      <Text1 />
      <Text1a />
      <Text2 />
      <Text3 />
    </div>
  );
}

function Menu({ userRole }: { userRole: UserRole }) {
  return userRole === 'admin' ? <AdminMenu /> : <AdopterMenu />;
}

function NotificationBadge({ count }: { count: number }) {
  if (count === 0) return null;
  
  return (
    <div className="absolute bg-[#fd7e14] -top-1 -right-1 rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-full" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[12px] not-italic text-[10px] text-center text-white">{count}</p>
    </div>
  );
}

function UserIcons({ onLogout, userRole }: { onLogout: () => void; userRole: UserRole }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { getNotificationsByRole, clearBadge } = useNotifications();
  const [userId] = useState<number>(() => {
    const currentUser = getCurrentUser();
    if (!currentUser?.user) return 1;
    // Use admin_id for admin, adopter_id for adopter
    if (userRole === 'admin') {
      return currentUser.user.admin_id ?? currentUser.user.id ?? 1;
    } else {
      return currentUser.user.adopter_id ?? currentUser.user.id ?? 1;
    }
  });
  const unreadCount = useMemo(() => {
    const userNotifications = getNotificationsByRole(userRole, userId);
    return userNotifications.filter(n => !n.is_read).length;
  }, [getNotificationsByRole, userRole, userId]);
  
  // Get user profile picture from localStorage
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(null);
  
  // Load profile picture on mount and listen for changes
  useEffect(() => {
    const loadProfilePicture = () => {
      const currentUser = getCurrentUser();
      const profilePic = currentUser?.user?.profile_picture || '';
      setUserProfilePicture(profilePic);
    };
    
    loadProfilePicture();
    
    // Custom event for same-tab updates
    const handleProfileUpdate = () => loadProfilePicture();
    window.addEventListener('profilePictureUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('profilePictureUpdated', handleProfileUpdate);
    };
  }, []);

  // Handle notification icon click - clear badge immediately
  const handleNotificationClick = () => {
    if (!isNotificationOpen) {
      clearBadge(); // Clear badge immediately when opening
    }
    setIsNotificationOpen(!isNotificationOpen);
  };
  
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 px-[35px] py-[0px]" data-name="User Icons">
      {/* Notification Icon */}
      <div className="relative">
        <div 
          className="relative cursor-pointer hover:opacity-70 transition-opacity"
          onClick={handleNotificationClick}
        >
          <Bell className={`w-6 h-6 ${isNotificationOpen ? 'text-[#fd7e14]' : 'text-black'}`} />
          <NotificationBadge count={unreadCount} />
        </div>
        
        {/* Notification Dropdown */}
        <NotificationDropdown 
          isOpen={isNotificationOpen} 
          onClose={() => setIsNotificationOpen(false)}
          userRole={userRole}
          userId={userId}
        />
      </div>

      {/* User Profile */}
      <div className="relative">
        <div 
          className="cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
        >
          {userProfilePicture ? (
            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${isUserDropdownOpen ? 'border-[#e56b0f]' : 'border-[#fd7e14]'} transition-colors relative`}>
              <Image 
                src={userProfilePicture}
                alt="User Profile"
                fill
                className="object-cover"
                sizes="40px"
                unoptimized
              />
            </div>
          ) : (
            <div className={`w-10 h-10 rounded-full ${isUserDropdownOpen ? 'bg-[#e56b0f]' : 'bg-[#fd7e14]'} flex items-center justify-center transition-colors`}>
              <User className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
        
        {/* User Dropdown */}
        <UserDropdown 
          isOpen={isUserDropdownOpen} 
          onClose={() => setIsUserDropdownOpen(false)} 
          onLogout={onLogout}
          userRole={userRole}
        />
      </div>
    </div>
  );
}

// Mobile Menu Component
function MobileMenu({ userRole, isOpen, onClose }: { userRole: UserRole; isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };
  
  if (!isOpen) return null;
  
  const menuItems = userRole === 'admin' ? [
    { label: 'Home', path: '/home' },
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Pets', path: '/admin/pets' },
    { label: 'Shelters', path: '/admin/shelters' },
    { label: 'Adoption Requests', path: '/admin/adoption-requests' },
    { label: 'Vet Visits', path: '/admin/vet-visits' },
  ] : [
    { label: 'Home', path: '/home' },
    { label: 'Browse Pets', path: '/browse-pets' },
    { label: 'Shelters', path: '/shelters' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Contact Us', path: '/contact-us' },
  ];
  
  return (
    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div 
        className="bg-white w-[280px] h-full shadow-xl p-6" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-['Poppins']">Menu</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`text-left px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#fd7e14] bg-opacity-10 text-[#fd7e14]' 
                    : 'hover:bg-gray-100 text-black'
                }`}
              >
                <span className="font-['Poppins']">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  userRole: UserRole;
}

export function Layout({ children, onLogout, userRole }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { refreshNotifications } = useNotifications();
  const prevPathnameRef = useRef<string | null>(null);

  // Refresh notifications when route changes (navigation between pages)
  useEffect(() => {
    // Skip on initial mount (pathname will be set but prevPathnameRef is null)
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      // Route changed - refresh notifications
      const user = getCurrentUser();
      if (user) {
        refreshNotifications();
      }
    }
    // Update ref for next comparison
    prevPathnameRef.current = pathname;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Only depend on pathname, refreshNotifications is stable

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white sticky top-0 rounded-[20px] shadow-[0px_8px_12px_0px_rgba(0,0,0,0.03)] shrink-0 w-full z-[100]" data-name="Header 2">
        <div className="flex flex-row items-center size-full">
          <div className="box-border content-stretch flex items-center justify-between relative w-full mx-[0px] my-[-7px] z-10">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            
            <Logo />
            <Menu userRole={userRole} />
            <UserIcons onLogout={onLogout} userRole={userRole} />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu 
        userRole={userRole} 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}

// Export the UserRole type so it can be used in App.tsx
export type { UserRole };