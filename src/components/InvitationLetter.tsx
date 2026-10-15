import React from 'react';
import { MapPin, Calendar, Heart, Share2, Download } from 'lucide-react';
import { WeddingData } from '../types';
import { KhmerCornerOrnament, KhmerFloralDivider } from '../utils/khmerOrnaments';

interface InvitationLetterProps {
  wedding: WeddingData;
  guestName: string;
  lang: 'km' | 'en';
  onScrollToMap: () => void;
  onShare: () => void;
}

export const InvitationLetter: React.FC<InvitationLetterProps> = ({
  wedding,
  guestName,
  lang,
  onScrollToMap,
  onShare,
}) => {
  // Generate Google Calendar Link
  const googleCalendarUrl = (() => {
    const title = encodeURIComponent(
      lang === 'km'
        ? `ពិធីមង្គលការ ${wedding.groomNameKhmer} & ${wedding.brideNameKhmer}`
        : `Wedding of ${wedding.groomNameEnglish} & ${wedding.brideNameEnglish}`
    );
    const details = encodeURIComponent(
      lang === 'km'
        ? `សូមគោរពអញ្ជើញចូលរួមពិធីមង្គលការ នៅ ${wedding.venueNameKhmer} (${wedding.venueHall})`
        : `Wedding ceremony & banquet at ${wedding.venueNameEnglish} (${wedding.venueHall})`
    );
    const location = encodeURIComponent(`${wedding.venueNameEnglish}, ${wedding.venueAddressEnglish}`);
    // 2026-11-15T070000 / 20261115T220000
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261115T000000Z/20261115T160000Z`;
  })();

  return (
    <section id="invitation" className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Outer Card Container with Paper Luxury Shadow and Gold Edge */}
      <div className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-12 lg:p-16 border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden">
        {/* Ornate Corner Elements */}
        <KhmerCornerOrnament position="top-left" className="absolute top-3 left-3 w-16 h-16 text-[#C5A059]/60 pointer-events-none" />
        <KhmerCornerOrnament position="top-right" className="absolute top-3 right-3 w-16 h-16 text-[#C5A059]/60 pointer-events-none" />
        <KhmerCornerOrnament position="bottom-left" className="absolute bottom-3 left-3 w-16 h-16 text-[#C5A059]/60 pointer-events-none" />
        <KhmerCornerOrnament position="bottom-right" className="absolute bottom-3 right-3 w-16 h-16 text-[#C5A059]/60 pointer-events-none" />

        {/* Top Auspicious Khmer Stanza */}
        <div className="text-center space-y-2 mb-8">
          <p className="font-moul text-sm sm:text-base text-[#9C7026] tracking-wider">
            {lang === 'km' ? 'សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ' : 'Auspicious Blessings & Happiness'}
          </p>
          <h1 className="font-moul text-3xl sm:text-4xl lg:text-5xl text-[#8E2818] tracking-wide py-1">
            {lang === 'km' ? 'ពិធីមង្គលការ' : 'The Holy Matrimony'}
          </h1>
          <p className="text-xs sm:text-sm font-cinzel text-stone-500 uppercase tracking-widest">
            {wedding.groomNameEnglish} & {wedding.brideNameEnglish}
          </p>
          <KhmerFloralDivider className="max-w-xs mx-auto" />
        </div>

        {/* Dedicated Guest Salutation Box */}
        <div className="max-w-2xl mx-auto text-center mb-10 py-4 px-6 rounded-2xl bg-[#FAF4E8]/90 border border-[#D4AF37]/40 shadow-inner">
          <p className="text-xs sm:text-sm text-[#7D6652] mb-1.5 font-medium">
            {lang === 'km'
              ? 'យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា៖'
              : 'Together with our families, we cordially invite:'}
          </p>
          <div className="font-moul text-xl sm:text-2xl text-[#8E2818] tracking-wide">
            {guestName || (lang === 'km' ? 'ភ្ញៀវកិត្តិយសទាំងអស់' : 'Our Valued Honored Guest')}
          </div>
          <p className="text-xs text-[#8C7560] mt-1.5 leading-relaxed">
            {lang === 'km'
              ? 'ចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យសិរីសួស្តី ក្នុងពិធីមង្គលការកូនប្រុស-កូនស្រីរបស់យើងខ្ញុំ'
              : 'To witness the marriage vows and celebrate the joyous union of our beloved children.'}
          </p>
        </div>

        {/* Parents Names - Khmer Cultural Protocol Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-10 text-center">
          {/* Groom Parents */}
          <div className="p-5 rounded-2xl bg-white/70 border border-[#E8DAC2] shadow-sm">
            <span className="text-xs uppercase tracking-wider text-[#9C7026] font-semibold block mb-2">
              {lang === 'km' ? 'មាតាបិតាខាងកូនប្រុស' : "Groom's Parents"}
            </span>
            <div className="space-y-1 font-medium text-[#3A2F27] text-sm sm:text-base">
              <div>{wedding.groomFatherKhmer}</div>
              <div>{wedding.groomMotherKhmer}</div>
            </div>
            <div className="mt-3 pt-3 border-t border-stone-200">
              <span className="text-xs text-[#8E2818] font-semibold block">
                {lang === 'km' ? 'កូនប្រុសនាម' : 'Groom'}
              </span>
              <div className="font-moul text-lg text-[#8E2818] mt-0.5">
                {wedding.groomNameKhmer}
              </div>
            </div>
          </div>

          {/* Bride Parents */}
          <div className="p-5 rounded-2xl bg-white/70 border border-[#E8DAC2] shadow-sm">
            <span className="text-xs uppercase tracking-wider text-[#9C7026] font-semibold block mb-2">
              {lang === 'km' ? 'មាតាបិតាខាងកូនស្រី' : "Bride's Parents"}
            </span>
            <div className="space-y-1 font-medium text-[#3A2F27] text-sm sm:text-base">
              <div>{wedding.brideFatherKhmer}</div>
              <div>{wedding.brideMotherKhmer}</div>
            </div>
            <div className="mt-3 pt-3 border-t border-stone-200">
              <span className="text-xs text-[#8E2818] font-semibold block">
                {lang === 'km' ? 'កូនស្រីនាម' : 'Bride'}
              </span>
              <div className="font-moul text-lg text-[#8E2818] mt-0.5">
                {wedding.brideNameKhmer}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Wedding Couple Portrait */}
        <div className="relative max-w-xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
          <img
            src="/src/assets/images/khmer_wedding_couple_1792070534570.jpg"
            alt="Khmer Wedding Couple in Royal Golden Silk"
            className="w-full h-auto object-cover max-h-[500px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white text-center">
            <p className="font-moul text-xl sm:text-2xl drop-shadow-md">
              {wedding.groomNameKhmer} & {wedding.brideNameKhmer}
            </p>
            <p className="text-xs sm:text-sm text-[#F7E7A9] font-cinzel tracking-wider mt-1 drop-shadow">
              {wedding.groomNameEnglish} & {wedding.brideNameEnglish}
            </p>
            <p className="text-xs italic text-stone-200 mt-2 max-w-md mx-auto line-clamp-2">
              {lang === 'km' ? wedding.coupleQuoteKhmer : wedding.coupleQuoteEnglish}
            </p>
          </div>
        </div>

        {/* Date, Lunar Calendar & Venue Highlights */}
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          {/* Date Information */}
          <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E3D6C1]">
            <div className="flex items-center justify-center gap-2 text-[#9C7026] mb-1 font-semibold text-xs tracking-wider uppercase">
              <Calendar className="w-4 h-4" />
              <span>{lang === 'km' ? 'កាលបរិច្ឆេទនៃពិធីមង្គលការ' : 'Wedding Date'}</span>
            </div>
            <div className="font-moul text-xl sm:text-2xl text-[#8E2818] my-1">
              {lang === 'km' ? wedding.weddingDateFormattedKhmer : wedding.weddingDateFormattedEnglish}
            </div>
            <div className="text-xs sm:text-sm text-[#6C5846]">
              {wedding.lunarDateKhmer}
            </div>
          </div>

          {/* Venue & Direct Map Link (Mandatory Requirement from User Brief) */}
          <div className="p-6 rounded-2xl bg-white border border-[#E3D6C1] shadow-sm">
            <div className="flex items-center justify-center gap-2 text-[#9C7026] mb-1 font-semibold text-xs tracking-wider uppercase">
              <MapPin className="w-4 h-4" />
              <span>{lang === 'km' ? 'ទីកន្លែងរៀបចំពិធី' : 'Wedding Location'}</span>
            </div>
            <div className="font-moul text-lg sm:text-xl text-[#2D241E] my-1">
              {lang === 'km' ? wedding.venueNameKhmer : wedding.venueNameEnglish}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#8E2818] mb-2">
              {wedding.venueHall}
            </p>
            <p className="text-xs sm:text-sm text-[#7D6652] max-w-lg mx-auto mb-6">
              {lang === 'km' ? wedding.venueAddressKhmer : wedding.venueAddressEnglish}
            </p>

            {/* Direct Map Button requested by user */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={wedding.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-btn inline-flex items-center gap-2 px-6 py-3 bg-[#8E2818] hover:bg-[#721E12] text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <MapPin className="w-4 h-4 text-[#F7E7A9]" />
                <span>{lang === 'km' ? 'មើលទីកន្លែងរៀបចំពិធី' : 'Open in Google Maps'}</span>
              </a>

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#FAF4E8] hover:bg-[#F3E8D0] text-[#784719] border border-[#D4AF37]/60 rounded-xl text-sm font-semibold transition-all"
              >
                <Calendar className="w-4 h-4 text-[#9C7026]" />
                <span>{lang === 'km' ? 'រក្សាទុកក្នុងប្រតិទិន' : 'Add to Calendar'}</span>
              </a>

              <button
                onClick={onShare}
                className="inline-flex items-center gap-2 px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-sm font-medium transition-all"
                title="Share Invitation Link"
              >
                <Share2 className="w-4 h-4" />
                <span>{lang === 'km' ? 'ចែករំលែកធៀប' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
