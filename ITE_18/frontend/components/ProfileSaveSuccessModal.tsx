import { useEffect } from 'react';
import svgPaths from '../imports/svg-qka8t3cpip';

interface ProfileSaveSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onRedirect?: () => void;
}

function CheckmarkIcon() {
  return (
    <div className="relative shrink-0 size-[48px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g>
          <path d={svgPaths.p1e8f5000} stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M18 22L24 28L44 8" stroke="#00A63E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function LoadingDot({ delay = 0 }: { delay?: number }) {
  return (
    <div 
      className="bg-[#fd7e14] rounded-full size-[8px] animate-bounce"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

export function ProfileSaveSuccessModal({ isOpen, onClose, message, onRedirect }: ProfileSaveSuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
      if (onRedirect) {
        onRedirect();
      }
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [isOpen, onClose, onRedirect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[1000]">
      <div className="bg-white h-[303.988px] rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-[448px] relative">
        <div className="relative size-full">
          {/* Green checkmark icon */}
          <div className="absolute bg-green-100 flex items-center justify-center left-[184px] rounded-full size-[80px] top-[32px]">
            <CheckmarkIcon />
          </div>

          {/* Success heading */}
          <div className="absolute h-[31.988px] left-[32px] top-[136px] w-[384px]">
            <p className="absolute font-['Poppins'] leading-[32px] left-[192.16px] not-italic text-[24px] text-black text-center text-nowrap top-[0.4px] translate-x-[-50%] whitespace-pre">
              Success!
            </p>
          </div>

          {/* Success message */}
          <div className="absolute h-[24px] left-[32px] top-[179.99px] w-[384px]">
            <p className="absolute font-['Poppins'] leading-[24px] left-[192.2px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[0.8px] translate-x-[-50%] whitespace-pre">
              {message}
            </p>
          </div>

          {/* Redirecting text */}
          <div className="absolute flex h-[20px] items-start left-[32px] top-[219.99px] w-[384px]">
            <p className="basis-0 font-['Poppins'] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center">
              Redirecting to home page...
            </p>
          </div>

          {/* Loading dots */}
          <div className="absolute flex gap-[8px] h-[8px] items-start left-[204px] top-[263.99px] w-[40px]">
            <LoadingDot delay={0} />
            <LoadingDot delay={150} />
            <LoadingDot delay={300} />
          </div>
        </div>
      </div>
    </div>
  );
}