import { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  placeholder?: string;
}

export function TimePicker({ value, onChange, placeholder = '--:--' }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const parseTime = (timeString: string) => {
    if (!timeString) return { hour: '10', minute: '00', period: 'AM' };
    const [hourMin] = timeString.split(':');
    const hour24 = parseInt(hourMin);
    const minute = timeString.split(':')[1] || '00';
    const period = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    return {
      hour: String(hour12).padStart(2, '0'),
      minute: minute,
      period: period
    };
  };

  const { hour, minute, period } = parseTime(value);
  const [selectedHour, setSelectedHour] = useState(hour);
  const [selectedMinute, setSelectedMinute] = useState(minute);
  const [selectedPeriod, setSelectedPeriod] = useState(period);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTimeSelect = (h: string, m: string, p: string) => {
    setSelectedHour(h);
    setSelectedMinute(m);
    setSelectedPeriod(p);

    let hour24 = parseInt(h);
    if (p === 'PM' && hour24 !== 12) hour24 += 12;
    if (p === 'AM' && hour24 === 12) hour24 = 0;

    const formattedTime = `${String(hour24).padStart(2, '0')}:${m}`;
    onChange(formattedTime);
  };

  const formatDisplayTime = (timeString: string) => {
    if (!timeString) return placeholder;
    const { hour, minute, period } = parseTime(timeString);
    return `${hour}:${minute} ${period}`;
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={formatDisplayTime(value)}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:border-[#fd7e14] font-['Poppins'] cursor-pointer"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#fd7e14] transition-colors"
        >
          <Clock className="w-5 h-5" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-3 w-[240px]">
          <div className="flex gap-2">
            {/* Hour Selector */}
            <div className="flex-1">
              <div className="bg-blue-600 text-white text-center py-2 rounded font-['Poppins'] font-medium mb-2">
                {selectedHour}
              </div>
              <div className="h-[150px] overflow-y-auto border border-gray-200 rounded scrollbar-hide">
                {hours.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => handleTimeSelect(h, selectedMinute, selectedPeriod)}
                    className={`
                      w-full py-2 text-center font-['Poppins'] hover:bg-blue-50 transition-colors
                      ${h === selectedHour ? 'bg-blue-100 text-blue-600' : ''}
                    `}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Minute Selector */}
            <div className="flex-1">
              <div className="bg-blue-600 text-white text-center py-2 rounded font-['Poppins'] font-medium mb-2">
                {selectedMinute}
              </div>
              <div className="h-[150px] overflow-y-auto border border-gray-200 rounded scrollbar-hide">
                {minutes.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleTimeSelect(selectedHour, m, selectedPeriod)}
                    className={`
                      w-full py-2 text-center font-['Poppins'] hover:bg-blue-50 transition-colors
                      ${m === selectedMinute ? 'bg-blue-100 text-blue-600' : ''}
                    `}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* AM/PM Selector */}
            <div className="w-20">
              <div className="bg-blue-600 text-white text-center py-2 rounded font-['Poppins'] font-medium mb-2">
                {selectedPeriod}
              </div>
              <div className="border border-gray-200 rounded overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleTimeSelect(selectedHour, selectedMinute, 'AM')}
                  className={`
                    w-full py-2 text-center font-['Poppins'] hover:bg-blue-50 transition-colors border-b border-gray-200
                    ${selectedPeriod === 'AM' ? 'bg-blue-100 text-blue-600' : ''}
                  `}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => handleTimeSelect(selectedHour, selectedMinute, 'PM')}
                  className={`
                    w-full py-2 text-center font-['Poppins'] hover:bg-blue-50 transition-colors
                    ${selectedPeriod === 'PM' ? 'bg-blue-100 text-blue-600' : ''}
                  `}
                >
                  PM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}