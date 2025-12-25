import { useEffect } from 'react';
import svgPaths from "../imports/svg-zgnmhjg9ix";

interface ProfileSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRedirect: () => void;
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon">
          <path d={svgPaths.p1e8f5000} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M18 22L24 28L44 8" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute bg-green-100 content-stretch flex items-center justify-center left-[184px] rounded-[2.68435e+07px] size-[80px] top-[32px]" data-name="Container">
      <Icon28 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute h-[31.988px] left-[32px] top-[136px] w-[384px]" data-name="Heading 3">
      <p className="absolute font-['Poppins'] leading-[32px] left-[192.16px] not-italic text-[24px] text-black text-center text-nowrap top-[0.4px] translate-x-[-50%] whitespace-pre">Success!</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[24px] left-[32px] top-[179.99px] w-[384px]" data-name="Paragraph">
      <p className="absolute font-['Poppins'] leading-[24px] left-[192.2px] not-italic text-[#4a5565] text-[16px] text-center text-nowrap top-[0.8px] translate-x-[-50%] whitespace-pre">Your profile has been updated successfully!</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[32px] top-[219.99px] w-[384px]" data-name="Paragraph">
      <p className="basis-0 font-['Poppins'] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center">Redirecting to home page...</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="bg-[#fd7e14] relative rounded-[2.68435e+07px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container58() {
  return (
    <div className="basis-0 bg-[#fd7e14] grow h-[8px] min-h-px min-w-px relative rounded-[2.68435e+07px] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[8px] items-start left-[204px] pb-0 pt-[-1.989px] px-0 top-[263.99px] w-[40px]" data-name="Container">
      {[...Array(2).keys()].map((_, i) => (
        <Container57 key={i} />
      ))}
      <Container58 />
    </div>
  );
}

function Container60() {
  return (
    <div className="bg-white h-[303.988px] relative rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-[448px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container56 />
        <Heading10 />
        <Paragraph18 />
        <Paragraph19 />
        <Container59 />
      </div>
    </div>
  );
}

export function ProfileSaveModal({ isOpen, onClose, onRedirect }: ProfileSaveModalProps) {
  useEffect(() => {
    console.log('ProfileSaveModal isOpen:', isOpen);
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
        onRedirect();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, onRedirect]);

  console.log('ProfileSaveModal render - isOpen:', isOpen);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50" data-name="SaveSuccessModal">
      <Container60 />
    </div>
  );
}