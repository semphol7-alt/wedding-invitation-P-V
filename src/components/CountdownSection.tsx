import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { WeddingData } from '../types';

interface CountdownSectionProps {
  wedding: WeddingData;
  lang: 'km' | 'en';
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ wedding, lang }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(wedding.weddingTimestamp).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [wedding.weddingTimestamp]);

  // Convert numbers to Khmer numerals if language is Khmer
  const toKhmerNumeral = (num: number): string => {
    if (lang !== 'km') return String(num).padStart(2, '0');
    const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    return String(num)
      .padStart(2, '0')
      .split('')
      .map((d) => (d >= '0' && d <= '9' ? khmerDigits[parseInt(d, 10)] : d))
      .join('');
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#FAF4E8] to-[#FFFDF9] border border-[#E3D6C1] shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 text-[#8E2818] mb-3">
          <Heart className="w-5 h-5 fill-[#8E2818]" />
          <span className="font-moul text-sm sm:text-base text-[#8E2818]">
            {lang === 'km' ? 'រាប់ថយក្រោយដល់ថ្ងៃសិរីមង្គល' : 'Counting Down to Our Special Day'}
          </span>
          <Heart className="w-5 h-5 fill-[#8E2818]" />
        </div>

        <p className="text-xs sm:text-sm text-[#7D6652] max-w-md mx-auto mb-8">
          {lang === 'km'
            ? 'ក្តីរំភើប និងការទន្ទឹងរង់ចាំវត្តមានដ៏មានតម្លៃរបស់ភ្ញៀវកិត្តិយសគ្រប់ៗរូប'
            : 'Looking forward to celebrating our sacred marriage in your warm company'}
        </p>

        {timeLeft.isPast ? (
          <div className="py-6 text-xl font-moul text-[#8E2818]">
            {lang === 'km' ? 'ពិធីមង្គលការបានប្រារព្ធឡើងដោយជោគជ័យ និងសិរីសួស្តី' : 'The Wedding Celebration is Happening Today!'}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
            {/* Days */}
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E3D6C1] shadow-sm">
              <span className="block font-moul text-2xl sm:text-4xl text-[#8E2818] tabular-nums">
                {toKhmerNumeral(timeLeft.days)}
              </span>
              <span className="block text-[11px] sm:text-xs text-[#7D6652] font-medium mt-1">
                {lang === 'km' ? 'ថ្ងៃ' : 'Days'}
              </span>
            </div>

            {/* Hours */}
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E3D6C1] shadow-sm">
              <span className="block font-moul text-2xl sm:text-4xl text-[#8E2818] tabular-nums">
                {toKhmerNumeral(timeLeft.hours)}
              </span>
              <span className="block text-[11px] sm:text-xs text-[#7D6652] font-medium mt-1">
                {lang === 'km' ? 'ម៉ោង' : 'Hours'}
              </span>
            </div>

            {/* Minutes */}
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E3D6C1] shadow-sm">
              <span className="block font-moul text-2xl sm:text-4xl text-[#8E2818] tabular-nums">
                {toKhmerNumeral(timeLeft.minutes)}
              </span>
              <span className="block text-[11px] sm:text-xs text-[#7D6652] font-medium mt-1">
                {lang === 'km' ? 'នាទី' : 'Minutes'}
              </span>
            </div>

            {/* Seconds */}
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E3D6C1] shadow-sm">
              <span className="block font-moul text-2xl sm:text-4xl text-[#9C7026] tabular-nums">
                {toKhmerNumeral(timeLeft.seconds)}
              </span>
              <span className="block text-[11px] sm:text-xs text-[#7D6652] font-medium mt-1">
                {lang === 'km' ? 'វិនាទី' : 'Seconds'}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
