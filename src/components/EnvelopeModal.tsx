import React from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { KhmerCornerOrnament, KhmerLotusSeal } from '../utils/khmerOrnaments';
import { WeddingData } from '../types';

interface EnvelopeModalProps {
  wedding: WeddingData;
  guestName: string;
  lang: 'km' | 'en';
  onOpen: () => void;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({
  wedding,
  guestName,
  lang,
  onOpen,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231A14]/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF4E8] rounded-2xl p-6 sm:p-10 shadow-2xl border-2 border-[#D4AF37]/50 text-center overflow-hidden">
        {/* Subtle silk watermark pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8E2818_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Ornate Khmer Corners */}
        <KhmerCornerOrnament position="top-left" className="absolute top-2 left-2 w-14 h-14 text-[#C5A059]/70" />
        <KhmerCornerOrnament position="top-right" className="absolute top-2 right-2 w-14 h-14 text-[#C5A059]/70" />
        <KhmerCornerOrnament position="bottom-left" className="absolute bottom-2 left-2 w-14 h-14 text-[#C5A059]/70" />
        <KhmerCornerOrnament position="bottom-right" className="absolute bottom-2 right-2 w-14 h-14 text-[#C5A059]/70" />

        {/* Envelope Flap Accent Lines */}
        <div className="relative flex justify-center mb-6">
          <KhmerLotusSeal className="w-24 h-24 shadow-xl" text="សិរីមង្គល" />
        </div>

        {/* Auspicious Blessing Tag */}
        <div className="text-xs uppercase tracking-widest text-[#9C7026] font-semibold mb-2">
          {lang === 'km' ? 'សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ' : 'Auspicious Wedding Announcement'}
        </div>

        {/* Main Title */}
        <h1 className="font-moul text-2xl sm:text-3xl text-[#8E2818] mb-4 tracking-wide leading-relaxed">
          {lang === 'km' ? 'ធៀបការរៀបអាពាហ៍ពិពាហ៍' : 'Wedding Invitation'}
        </h1>

        {/* Groom & Bride Couple Names */}
        <div className="my-6 py-4 border-y border-[#C5A059]/30 bg-white/40 rounded-xl px-4">
          <p className="text-sm text-[#7D6652] mb-1">
            {lang === 'km' ? 'អាពាហ៍ពិពាហ៍រវាង' : 'The Wedding Celebration of'}
          </p>
          <div className="font-moul text-lg sm:text-xl text-[#2D241E] flex flex-wrap items-center justify-center gap-2">
            <span className="text-[#8E2818]">{wedding.groomNameKhmer}</span>
            <span className="text-xs font-sans text-[#C5A059] px-1 font-normal">&</span>
            <span className="text-[#8E2818]">{wedding.brideNameKhmer}</span>
          </div>
          <div className="text-xs text-stone-500 font-cinzel mt-1">
            {wedding.groomNameEnglish} & {wedding.brideNameEnglish}
          </div>
        </div>

        {/* Dedicated Guest Badge */}
        <div className="mb-8">
          <p className="text-xs text-[#8C7662] mb-1">
            {lang === 'km' ? 'សូមគោរពអញ្ជើញវត្តមានដ៏ខ្ពង់ខ្ពស់៖' : 'Cordially inviting our honored guest:'}
          </p>
          <div className="inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-[#8E2818]/10 via-[#C5A059]/20 to-[#8E2818]/10 border border-[#C5A059]/40 text-[#8E2818] font-bold text-base sm:text-lg">
            {guestName || (lang === 'km' ? 'ភ្ញៀវកិត្តិយសទាំងអស់' : 'Honored Guests')}
          </div>
        </div>

        {/* Action Button: Open Invitation */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onOpen}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#8E2818] to-[#AC2F1B] hover:from-[#781F12] hover:to-[#912515] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Mail className="w-5 h-5 text-[#FAD689] group-hover:scale-110 transition-transform" />
            <span className="font-semibold tracking-wide">
              {lang === 'km' ? 'បើកធៀបការ' : 'Open Invitation'}
            </span>
            <Sparkles className="w-4 h-4 text-[#FAD689]" />
          </button>
          <p className="text-[11px] text-[#A69382]">
            {lang === 'km'
              ? 'សូមចុចដើម្បីទស្សនាព័ត៌មានលម្អិតនៃកម្មវិធីមង្គលការ'
              : 'Click to reveal program details & directions'}
          </p>
        </div>
      </div>
    </div>
  );
};
