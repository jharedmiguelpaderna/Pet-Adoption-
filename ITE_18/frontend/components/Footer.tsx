'use client';

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-[#2c2c2c] text-white w-full">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-['Poppins'] text-white mb-4">Pet Adoption</h3>
            <p className="font-['Poppins'] text-gray-400 text-sm leading-relaxed mb-4">
              Connecting loving families with pets in need of a forever home. Every adoption makes a difference.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-[#fd7e14] rounded-full flex items-center justify-center hover:bg-[#e56b0f] transition-colors duration-300">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-9 h-9 bg-[#fd7e14] rounded-full flex items-center justify-center hover:bg-[#e56b0f] transition-colors duration-300">
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-9 h-9 bg-[#fd7e14] rounded-full flex items-center justify-center hover:bg-[#e56b0f] transition-colors duration-300">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-9 h-9 bg-[#fd7e14] rounded-full flex items-center justify-center hover:bg-[#e56b0f] transition-colors duration-300">
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-['Poppins'] text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => router.push('/')}
                  className="font-['Poppins'] text-gray-400 hover:text-[#fd7e14] transition-colors duration-300 text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/browse-pets')}
                  className="font-['Poppins'] text-gray-400 hover:text-[#fd7e14] transition-colors duration-300 text-sm"
                >
                  Browse Pets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/shelters')}
                  className="font-['Poppins'] text-gray-400 hover:text-[#fd7e14] transition-colors duration-300 text-sm"
                >
                  Shelters
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/about-us')}
                  className="font-['Poppins'] text-gray-400 hover:text-[#fd7e14] transition-colors duration-300 text-sm"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-['Poppins'] text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li className="font-['Poppins'] text-gray-400 text-sm">Help Center</li>
              <li className="font-['Poppins'] text-gray-400 text-sm">Adoption Process</li>
              <li className="font-['Poppins'] text-gray-400 text-sm">FAQs</li>
              <li className="font-['Poppins'] text-gray-400 text-sm">Pet Care Tips</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-['Poppins'] text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#fd7e14] flex-shrink-0 mt-1" />
                <p className="font-['Poppins'] text-gray-400 text-sm">
                  123 Pet Adoption Lane<br />
                  New York, NY 10001
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#fd7e14] flex-shrink-0" />
                <p className="font-['Poppins'] text-gray-400 text-sm">+379 871-8371</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#fd7e14] flex-shrink-0" />
                <p className="font-['Poppins'] text-gray-400 text-sm">adopt@petadoption.com</p>
              </div>
              <button
                onClick={() => router.push('/contact-us')}
                className="mt-3 w-full bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white py-2 px-4 rounded-lg font-['Poppins'] text-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-['Poppins'] text-gray-400 text-sm text-center md:text-left">
              © 2025 Pet Adoption. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-['Poppins'] text-gray-400 hover:text-[#fd7e14] transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="font-['Poppins'] text-gray-400 hover:text-[#fd7e14] transition-colors duration-300 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}