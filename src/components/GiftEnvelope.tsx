import React, { useState } from 'react';
import { Gift, Copy, Check, QrCode, Heart, Sparkles } from 'lucide-react';
import { WeddingData } from '../types';
import { KhmerFloralDivider, KhmerLotusSeal } from '../utils/khmerOrnaments';

interface GiftEnvelopeProps {
  wedding: WeddingData;
  lang: 'km' | 'en';
}

export const GiftEnvelope: React.FC<GiftEnvelopeProps> = ({ wedding, lang }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(wedding.khqrAccountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="gift" className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#9C7026]">
          {lang === 'km' ? 'ចំណងដៃមង្គលការ' : 'Wedding Gift & Blessings'}
        </span>
        <h2 className="font-moul text-2xl sm:text-3xl text-[#8E2818] mt-1 mb-2">
          {lang === 'km' ? 'ចំណងដៃ និងអាំងប៉ាវឌីជីថល' : 'Digital Gift Envelope (KHQR)'}
        </h2>
        <p className="text-xs sm:text-sm text-[#7D6652] max-w-lg mx-auto">
          {lang === 'km'
            ? 'វត្តមានដ៏ឧត្តុង្គឧត្តមរបស់លោកអ្នក គឺជាកិត្តិយស និងកាដូដ៏មានតម្លៃបំផុតសម្រាប់គូស្វាមីភរិយាថ្មី'
            : 'Your esteemed presence is our greatest gift; for guests wishing to send a token of love:'}
        </p>
        <KhmerFloralDivider className="max-w-xs mx-auto" />
      </div>

      {/* Luxury Red & Gold Envelope Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#8E2818] via-[#7A1E11] to-[#541208] text-white p-6 sm:p-10 shadow-2xl border-2 border-[#D4AF37]/60 overflow-hidden">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F7E7A9_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
          {/* Left Side: Explanatory and Cultural Text */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-[#F7E7A9]/40 text-xs font-medium text-[#F7E7A9]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'km' ? 'អាំងប៉ាវ & ចំណងដៃ' : 'Digital Red Packet'}</span>
            </div>

            <h3 className="font-moul text-xl sm:text-2xl text-[#F7E7A9] tracking-wide">
              {wedding.khqrBankName}
            </h3>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-md">
              {lang === 'km'
                ? 'លោកអ្នកអាចស្កេន KHQR តាមរយៈកម្មវិធីធនាគារនានាក្នុងប្រទេសកម្ពុជា (ABA, Wing, ACLEDA, Bakong...) ដើម្បីផ្ញើចំណងដៃ និងពាក្យជូនពរដល់គូស្វាមីភរិយាថ្មី។'
                : 'You may scan via Bakong KHQR with any Cambodian banking application (ABA, Wing, ACLEDA, etc.) to present your wedding gift and well-wishes.'}
            </p>

            {/* Account Details Box */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 space-y-2 max-w-md">
              <div className="text-[11px] uppercase tracking-wider text-[#F7E7A9]">
                {lang === 'km' ? 'ឈ្មោះគណនី (Account Name)' : 'Account Name'}
              </div>
              <div className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                {wedding.khqrAccountName}
              </div>

              <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-3">
                <div className="font-mono text-xs sm:text-sm text-stone-200 tracking-wider">
                  {wedding.khqrAccountNumber}
                </div>
                <button
                  onClick={handleCopyAccount}
                  className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium flex items-center gap-1.5 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span className="text-emerald-300">{lang === 'km' ? 'បានចម្លង' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#F7E7A9]" />
                      <span>{lang === 'km' ? 'ចម្លងលេខ' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: KHQR Code Display Card */}
          <div className="bg-white p-5 rounded-2xl shadow-xl text-center border-4 border-[#D4AF37] max-w-[260px] w-full shrink-0">
            {/* Bakong KHQR Header Banner */}
            <div className="bg-[#E21A22] text-white py-1.5 px-3 rounded-lg text-xs font-bold tracking-wider mb-3 flex items-center justify-center gap-1.5">
              <span>KHQR</span>
              <span className="text-[10px] font-normal opacity-90">| BAKONG</span>
            </div>

            {/* Simulated high-fidelity QR Code with centerpiece */}
            <div className="relative p-2 bg-stone-50 rounded-xl border border-stone-200">
              <svg viewBox="0 0 160 160" className="w-full h-auto text-[#2D241E]">
                {/* QR Pattern Representation */}
                {/* Corner Positioning Squares */}
                <rect x="10" y="10" width="40" height="40" fill="currentColor" rx="4" />
                <rect x="16" y="16" width="28" height="28" fill="white" rx="2" />
                <rect x="22" y="22" width="16" height="16" fill="currentColor" rx="1" />

                <rect x="110" y="10" width="40" height="40" fill="currentColor" rx="4" />
                <rect x="116" y="16" width="28" height="28" fill="white" rx="2" />
                <rect x="122" y="22" width="16" height="16" fill="currentColor" rx="1" />

                <rect x="10" y="110" width="40" height="40" fill="currentColor" rx="4" />
                <rect x="16" y="116" width="28" height="28" fill="white" rx="2" />
                <rect x="22" y="122" width="16" height="16" fill="currentColor" rx="1" />

                {/* Data Matrix Dots */}
                <rect x="60" y="15" width="8" height="8" fill="currentColor" />
                <rect x="75" y="15" width="8" height="8" fill="currentColor" />
                <rect x="90" y="25" width="8" height="8" fill="currentColor" />
                <rect x="60" y="35" width="12" height="8" fill="currentColor" />
                <rect x="80" y="45" width="16" height="8" fill="currentColor" />

                <rect x="15" y="60" width="8" height="12" fill="currentColor" />
                <rect x="30" y="70" width="8" height="8" fill="currentColor" />
                <rect x="15" y="85" width="12" height="8" fill="currentColor" />
                <rect x="35" y="90" width="8" height="8" fill="currentColor" />

                <rect x="115" y="60" width="12" height="8" fill="currentColor" />
                <rect x="135" y="70" width="8" height="12" fill="currentColor" />
                <rect x="120" y="85" width="8" height="8" fill="currentColor" />
                <rect x="135" y="95" width="12" height="8" fill="currentColor" />

                <rect x="60" y="115" width="8" height="8" fill="currentColor" />
                <rect x="75" y="125" width="14" height="8" fill="currentColor" />
                <rect x="95" y="115" width="8" height="12" fill="currentColor" />
                <rect x="60" y="135" width="12" height="8" fill="currentColor" />
                <rect x="85" y="140" width="8" height="8" fill="currentColor" />
                <rect x="110" y="130" width="8" height="8" fill="currentColor" />
                <rect x="125" y="120" width="12" height="8" fill="currentColor" />
                <rect x="130" y="135" width="15" height="15" fill="currentColor" />

                {/* Center Badge */}
                <circle cx="80" cy="80" r="18" fill="white" stroke="#D4AF37" strokeWidth="2" />
                <path d="M80 70 C83 75 87 78 91 78 C86 80 82 85 80 89 C78 85 74 80 69 78 C73 78 77 75 80 70 Z" fill="#8E2818" />
              </svg>
            </div>

            <p className="text-[11px] text-stone-500 mt-2 font-medium">
              {lang === 'km' ? 'ស្កេនដើម្បីជូនចំណងដៃ' : 'Scan to send gift'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
