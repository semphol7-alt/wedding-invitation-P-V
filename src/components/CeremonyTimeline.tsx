import React from 'react';
import { Clock, Flower2, Scissors, Sparkles, Utensils } from 'lucide-react';
import { CeremonyEvent } from '../types';
import { KhmerFloralDivider } from '../utils/khmerOrnaments';

interface CeremonyTimelineProps {
  schedule: CeremonyEvent[];
  lang: 'km' | 'en';
}

export const CeremonyTimeline: React.FC<CeremonyTimelineProps> = ({ schedule, lang }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'procession':
        return <Flower2 className="w-5 h-5 text-[#9C7026]" />;
      case 'haircut':
        return <Scissors className="w-5 h-5 text-[#9C7026]" />;
      case 'tying':
        return <Sparkles className="w-5 h-5 text-[#9C7026]" />;
      case 'banquet':
        return <Utensils className="w-5 h-5 text-[#9C7026]" />;
      default:
        return <Clock className="w-5 h-5 text-[#9C7026]" />;
    }
  };

  return (
    <section id="schedule" className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#9C7026]">
          {lang === 'km' ? 'កម្មវិធីប្រពៃណីខ្មែរ' : 'Ceremonial Program'}
        </span>
        <h2 className="font-moul text-2xl sm:text-3xl text-[#8E2818] mt-1 mb-2">
          {lang === 'km' ? 'កម្មវិធីសិរីសួស្តីមង្គលការ' : 'Wedding Schedule & Ceremonies'}
        </h2>
        <p className="text-xs sm:text-sm text-[#7D6652] max-w-lg mx-auto">
          {lang === 'km'
            ? 'កម្មវិធីប្រារព្ធឡើងតាមគន្លងប្រពៃណី និងទំនៀមទម្លាប់ព្រះពុទ្ធសាសនាខ្មែរ'
            : 'Traditional Cambodian wedding customs and celebratory events'}
        </p>
        <KhmerFloralDivider className="max-w-xs mx-auto" />
      </div>

      {/* Grid with visual ceremony scene and timeline items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Ceremony Photo Spotlight */}
        <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#E3D6C1] shadow-lg bg-white">
          <div className="relative">
            <img
              src="/src/assets/images/khmer_wedding_ceremony_1792070535446.jpg"
              alt="Traditional Cambodian Wedding Ceremony Blessing"
              className="w-full h-72 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-5">
              <div className="text-white">
                <span className="text-[11px] font-semibold text-[#F7E7A9] uppercase tracking-wider block">
                  {lang === 'km' ? 'ទំនៀមទម្លាប់បុរាណ' : 'Sacred Heritage'}
                </span>
                <p className="font-moul text-base text-white">
                  {lang === 'km' ? 'ពិធីសូត្រមន្ត និងសំពះផ្ទឹម' : 'Blessing Ceremonies & Rituals'}
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 text-xs text-[#7D6652] leading-relaxed space-y-2">
            <p>
              {lang === 'km'
                ? 'ពិធីមង្គលការខ្មែរ ត្រូវបានប្រារព្ធឡើងយ៉ាងឧឡារិក ជាមួយនឹងគ្រឿងរណ្ដាប់ស្លាត្រួយ ផ្កាឈូក កម្រងផ្កាម្លិះ និងអំបោះចងដៃពណ៌ក្រហមសូត្រ ដើម្បីប្រសិទ្ធពរជ័យឱ្យស្វាមីភរិយាថ្មី រកស៊ីមានបាន សុខក្សេមក្សាន្ត។'
                : 'Cambodian weddings are rich in symbolic meaning: fresh lotus blossoms, jasmine garlands, and sacred red thread tying to bestow lifelong prosperity and harmony upon the new union.'}
            </p>
          </div>
        </div>

        {/* Right Column: Timeline Cards */}
        <div className="lg:col-span-7 space-y-4">
          {schedule.map((item, index) => (
            <div
              key={item.id}
              className="group p-5 rounded-2xl bg-white border border-[#E3D6C1] shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAF4E8] border border-[#D4AF37]/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {getIcon(item.iconType)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-moul text-base text-[#8E2818] tracking-wide">
                    {lang === 'km' ? item.khmerTitle : item.englishTitle}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF4E8] text-[#9C7026] border border-[#D4AF37]/40 whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4A3A] leading-relaxed">
                  {lang === 'km' ? item.khmerDesc : item.englishDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
