import { CheckCircle, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  petName: string;
}

export function SuccessModal({ isOpen, onClose, petName }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center backdrop-blur-md p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-[450px] w-full p-8 text-center relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h3 className="font-['Poppins'] text-gray-900 mb-3">
          Application Submitted Successfully!
        </h3>

        <p className="font-['Poppins'] text-gray-600 mb-6">
          Your adoption application for <span className="text-[#fd7e14]">{petName}</span> has been submitted. We'll review your application and contact you soon!
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#fd7e14] text-white rounded-xl font-['Poppins'] hover:bg-[#e66d0a] transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Continue
        </button>
      </div>
    </div>
  );
}