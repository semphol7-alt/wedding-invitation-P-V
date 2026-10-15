import React from 'react';

/**
 * Traditional Khmer Floral (Kbach Phni Tes / Kbach Chan) & Lotus Ornaments
 */

export const KhmerCornerOrnament: React.FC<{
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}> = ({ className = 'w-12 h-12 text-[#C5A059]', position = 'top-left' }) => {
  let transform = '';
  if (position === 'top-right') transform = 'scale-x-[-1]';
  if (position === 'bottom-left') transform = 'scale-y-[-1]';
  if (position === 'bottom-right') transform = 'scale-[-1]';

  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={`${className} ${transform}`}
      aria-hidden="true"
    >
      <path d="M 0,0 L 45,0 C 45,15 35,28 20,32 C 34,35 48,46 50,62 C 38,58 28,68 25,82 C 22,65 12,54 0,52 Z" />
      <path d="M 0,0 L 0,45 C 15,45 28,35 32,20 C 35,34 46,48 62,50 C 58,38 68,28 82,25 C 65,22 54,12 52,0 Z" opacity="0.8" />
      <circle cx="18" cy="18" r="4" />
      <circle cx="34" cy="8" r="2.5" />
      <circle cx="8" cy="34" r="2.5" />
      <path d="M 0,90 C 8,75 14,45 45,14 C 75,8 90,0 90,0 C 90,0 72,18 64,48 C 58,68 45,84 0,90 Z" opacity="0.35" />
    </svg>
  );
};

export const KhmerFloralDivider: React.FC<{ className?: string }> = ({
  className = 'w-48 h-6 text-[#C5A059]',
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/60 to-[#C5A059]" />
      <svg
        viewBox="0 0 80 32"
        fill="currentColor"
        className="w-12 h-6 text-[#C5A059] shrink-0"
        aria-hidden="true"
      >
        {/* Central Lotus / Kbach Blossom */}
        <path d="M 40,2 C 43,10 49,16 56,16 C 48,19 43,26 40,31 C 37,26 32,19 24,16 C 31,16 37,10 40,2 Z" />
        <circle cx="40" cy="16" r="3" fill="#FFF8E7" />
        {/* Left scroll wing */}
        <path d="M 24,16 C 18,12 12,12 8,16 C 4,20 2,24 0,22 C 4,16 10,12 20,15 Z" opacity="0.85" />
        <circle cx="7" cy="15" r="1.5" />
        {/* Right scroll wing */}
        <path d="M 56,16 C 62,12 68,12 72,16 C 76,20 78,24 80,22 C 76,16 70,12 60,15 Z" opacity="0.85" />
        <circle cx="73" cy="15" r="1.5" />
      </svg>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/60 to-[#C5A059]" />
    </div>
  );
};

export const KhmerLotusSeal: React.FC<{ className?: string; text?: string }> = ({
  className = 'w-20 h-20',
  text = 'សិរីសួស្តី',
}) => {
  return (
    <div
      className={`relative rounded-full flex items-center justify-center bg-gradient-to-br from-[#E2B755] via-[#C59B36] to-[#996C1B] text-[#593907] shadow-lg border-2 border-[#FFF0BA] ${className}`}
    >
      <div className="absolute inset-1 rounded-full border border-dashed border-[#FFF3C4]/60 pointer-events-none" />
      <div className="text-center px-1">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-5 h-5 mx-auto text-[#FFF9E6]"
        >
          <path d="M12 2C13 6 17 9 20 9C16 12 15 17 12 21C9 17 8 12 4 9C7 9 11 6 12 2Z" fill="currentColor" fillOpacity="0.4" />
        </svg>
        <span className="block text-[11px] font-moul tracking-wide text-white drop-shadow">
          {text}
        </span>
      </div>
    </div>
  );
};
