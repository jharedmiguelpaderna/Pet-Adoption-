'use client';

import { Phone, Send, MessageCircle, PawPrint } from 'lucide-react';
import { useState } from 'react';
import { SuccessBanner } from '../../components/SuccessBanner';

export function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setShowSuccessBanner(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#fd7e14] to-[#ff9247] opacity-3 rounded-full blur-3xl"></div>

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

      <div className="relative z-10 py-16">
        <div className="px-[312px]">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-['Poppins'] text-5xl text-black mb-4">Get In Touch</h1>
            <p className="font-['Poppins'] text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about pet adoption? We&apos;re here to help! Reach out to us through any of the channels below.
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#fd7e14] to-[#ff9247] flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-['Poppins'] text-3xl text-black mb-3">Send Us a Message</h2>
              <p className="font-['Poppins'] text-gray-600">
                Fill out the form below and our team will get back to you as soon as possible
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="font-['Poppins'] text-black mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none transition-colors font-['Poppins']"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="font-['Poppins'] text-black mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none transition-colors font-['Poppins']"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="font-['Poppins'] text-black mb-2 block">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none transition-colors font-['Poppins']"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="font-['Poppins'] text-black mb-2 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none transition-colors font-['Poppins'] resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white py-4 px-8 rounded-xl font-['Poppins'] hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 bg-gradient-to-r from-[#fd7e14] to-[#ff9247] rounded-3xl p-12 text-center text-white">
            <h3 className="font-['Poppins'] text-3xl mb-4">Emergency Pet Adoption Inquiries?</h3>
            <p className="font-['Poppins'] text-lg mb-6 opacity-90">
              For urgent adoption matters or if you&apos;ve found a stray animal that needs immediate care, please call our 24/7 hotline
            </p>
            <a 
              href="tel:+3798718371" 
              className="inline-flex items-center gap-3 bg-white text-[#fd7e14] px-8 py-4 rounded-xl font-['Poppins'] hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-6 h-6" />
              <span className="text-xl">+379 871-8371</span>
            </a>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      <SuccessBanner
        isOpen={showSuccessBanner}
        message="Your message has been sent successfully! We'll get back to you soon."
        onClose={() => setShowSuccessBanner(false)}
      />
    </div>
  );
}




