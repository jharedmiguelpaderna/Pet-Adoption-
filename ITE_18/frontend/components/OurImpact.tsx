import { useState, useEffect, useRef } from "react";

interface Stat {
  id: number;
  number: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  {
    id: 1,
    number: 150,
    suffix: "+",
    label: "Pets Available"
  },
  {
    id: 2,
    number: 500,
    suffix: "+",
    label: "Successfully Adopted"
  },
  {
    id: 3,
    number: 75,
    suffix: "",
    label: "Looking for Homes"
  }
];

export function OurImpact() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);

    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      setCounts(stats.map((stat) => {
        return Math.min(
          Math.round(stat.number * easeOutQuart(progress)),
          stat.number
        );
      }));

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [isVisible]);

  // Easing function for smooth animation
  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  };

  return (
    <div ref={sectionRef} className="w-full bg-[#f8f9fa] py-[80px]">
      <div className="max-w-[1536px] mx-auto px-[80px]">
        <h2 className="font-['Poppins:Bold',sans-serif] text-[42px] text-black text-center mb-[60px]">
          Our Impact
        </h2>

        <div className="grid grid-cols-3 gap-[32px]">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="bg-white rounded-[16px] p-[48px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1"
            >
              <div className="font-['Poppins:Bold',sans-serif] text-[56px] text-[#fd7e14] mb-[16px]">
                {counts[index]}{stat.suffix}
              </div>
              <p className="font-['Inter:Medium',sans-serif] text-[18px] text-[rgba(0,0,0,0.7)] text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
