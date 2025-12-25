'use client';

import image_cf57da5a8275a0cfd8f7b70ae320e8c92753603b from '../../public/assets/cf57da5a8275a0cfd8f7b70ae320e8c92753603b.png';
import { Users, Shield, CheckCircle, PawPrint, Search, Bell, HandHeart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export function AboutUsPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden w-full py-12">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#fd7e14] to-[#ff9247] opacity-3 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Paw Print Pattern Decorations */}
      <div className="absolute top-20 left-10 text-[#fd7e14] opacity-25 pointer-events-none">
        <PawPrint className="w-16 h-16" />
      </div>
      <div className="absolute top-40 right-20 text-[#fd7e14] opacity-20 pointer-events-none">
        <PawPrint className="w-12 h-12" />
      </div>
      <div className="absolute bottom-40 left-1/4 text-[#fd7e14] opacity-25 pointer-events-none">
        <PawPrint className="w-20 h-20" />
      </div>
      <div className="absolute bottom-20 right-1/3 text-[#fd7e14] opacity-20 pointer-events-none">
        <PawPrint className="w-14 h-14" />
      </div>

      <div className="relative z-10 px-[312px]">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <ImageWithFallback 
            src={image_cf57da5a8275a0cfd8f7b70ae320e8c92753603b}
            alt="Pet Adoption Logo"
            className="w-48 h-48 object-contain mx-auto mb-8"
          />
          <p className="text-[rgba(0,0,0,0.7)] max-w-2xl mx-auto">
            Connecting loving families with pets in need of a forever home
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
          <h2 className="font-['Poppins'] text-black mb-4 text-center">Our Mission</h2>
          <p className="font-['Poppins'] text-gray-700 text-center leading-relaxed text-lg">
            Pet Adoption is a comprehensive platform dedicated to making pet adoption simple, transparent, and accessible for everyone. 
            We bridge the gap between animal shelters and potential adopters, ensuring every pet finds a loving home and every family 
            finds their perfect companion.
          </p>
        </div>

        {/* What We Do Section */}
        <div className="mb-12">
          <h2 className="font-['Poppins'] text-black mb-8 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-[#fd7e14] rounded-full flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-['Poppins'] text-black mb-3">Connect Adopters & Shelters</h3>
              <p className="font-['Poppins'] text-gray-600 leading-relaxed">
                We provide a seamless platform where animal shelters can showcase their pets and adopters can easily browse, 
                filter, and find their perfect match.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-[#fd7e14] rounded-full flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-['Poppins'] text-black mb-3">Verified Shelters</h3>
              <p className="font-['Poppins'] text-gray-600 leading-relaxed">
                All shelters on our platform are verified and trusted organizations committed to animal welfare and 
                responsible adoption practices.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-[#fd7e14] rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-['Poppins'] text-black mb-3">Streamlined Process</h3>
              <p className="font-['Poppins'] text-gray-600 leading-relaxed">
                Our intuitive adoption application system makes it easy to apply, schedule interviews, and track your 
                adoption journey from start to finish.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-[#fd7e14] rounded-full flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-['Poppins'] text-black mb-3">Find Your Perfect Pet</h3>
              <p className="font-['Poppins'] text-gray-600 leading-relaxed">
                Browse through detailed pet profiles with photos, descriptions, health information, and personality traits 
                to find the pet that&apos;s right for you.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-[#fd7e14] rounded-full flex items-center justify-center mb-4">
                <Bell className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-['Poppins'] text-black mb-3">Real-Time Updates</h3>
              <p className="font-['Poppins'] text-gray-600 leading-relaxed">
                Stay informed with instant notifications about your adoption requests, interview schedules, and messages 
                from shelters.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-[#fd7e14] rounded-full flex items-center justify-center mb-4">
                <HandHeart className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-['Poppins'] text-black mb-3">Supporting Animal Welfare</h3>
              <p className="font-['Poppins'] text-gray-600 leading-relaxed">
                Every successful adoption through our platform helps reduce shelter overcrowding and gives animals a 
                second chance at a happy life.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gradient-to-r from-[#fd7e14] to-[#ff9247] rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="font-['Poppins'] text-white mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-['Poppins'] text-[#fd7e14] text-2xl">1</span>
              </div>
              <h3 className="font-['Poppins'] text-white mb-2">Browse Pets</h3>
              <p className="font-['Poppins'] text-white text-sm opacity-90">
                Search and filter through available pets from verified shelters
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-['Poppins'] text-[#fd7e14] text-2xl">2</span>
              </div>
              <h3 className="font-['Poppins'] text-white mb-2">Submit Application</h3>
              <p className="font-['Poppins'] text-white text-sm opacity-90">
                Fill out a simple adoption application for your chosen pet
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-['Poppins'] text-[#fd7e14] text-2xl">3</span>
              </div>
              <h3 className="font-['Poppins'] text-white mb-2">Interview & Review</h3>
              <p className="font-['Poppins'] text-white text-sm opacity-90">
                Schedule an interview with the shelter and wait for approval
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-['Poppins'] text-[#fd7e14] text-2xl">4</span>
              </div>
              <h3 className="font-['Poppins'] text-white mb-2">Welcome Home</h3>
              <p className="font-['Poppins'] text-white text-sm opacity-90">
                Complete the adoption process and bring your new friend home
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 text-center">
          <h2 className="font-['Poppins'] text-black mb-4">Ready to Find Your New Best Friend?</h2>
          <p className="font-['Poppins'] text-gray-600 mb-8 max-w-[600px] mx-auto">
            Thousands of loving pets are waiting for their forever homes. Start your adoption journey today and 
            make a difference in a pet&apos;s life.
          </p>
          <button 
            onClick={() => router.push('/browse-pets')}
            className="bg-[#fd7e14] text-white px-8 py-3 rounded-full font-['Poppins'] hover:bg-[#e56b0f] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Browse Available Pets
          </button>
        </div>
      </div>
    </div>
  );
}





