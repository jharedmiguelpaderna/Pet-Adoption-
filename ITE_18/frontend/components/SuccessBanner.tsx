import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessBannerProps {
  isOpen?: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

export function SuccessBanner({ isOpen = true, message, onClose }: SuccessBannerProps) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-5 duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-500 p-4 flex items-center gap-4 min-w-[350px]">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <p className="font-['Poppins'] text-black flex-1">{message}</p>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}