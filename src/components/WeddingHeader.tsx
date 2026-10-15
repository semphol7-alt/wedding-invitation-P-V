import React from 'react';
import { Music, VolumeX, Edit3 } from 'lucide-react';

interface WeddingHeaderProps {
  lang: 'km' | 'en';
  onToggleLang: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenEditor: () => void;
  onScrollToRsvp: () => void;
}

export const WeddingHeader: React.FC<WeddingHeaderProps> = ({
  lang,
  onToggleLang,
  isPlayingMusic,
  onToggleMusic,
  onOpenEditor,
  onScrollToRsvp,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#C5A059]/25 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#top"
          className="font-moul text-lg sm:text-xl text-[#8E2818] tracking-wider whitespace-nowrap shrink-0 hover:text-[#AA2E1B] transition-colors"
        >
          {lang === 'km' ? 'ពិធីមង្គលការ' : 'Khmer Wedding'}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C4A3A]">
          <a
            href="#invitation"
            className="hover:text-[#8E2818] transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'km' ? 'ធៀបការ' : 'Invitation'}
          </a>
          <a
            href="#schedule"
            className="hover:text-[#8E2818] transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'km' ? 'កម្មវិធីមង្គល' : 'Ceremonies'}
          </a>
          <a
            href="#venue"
            className="hover:text-[#8E2818] transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'km' ? 'ទីតាំង & ផែនទី' : 'Venue & Map'}
          </a>
          <a
            href="#gallery"
            className="hover:text-[#8E2818] transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'km' ? 'រូបថតអនុស្សាវរីយ៍' : 'Gallery'}
          </a>
          <a
            href="#gift"
            className="hover:text-[#8E2818] transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'km' ? 'ជូនពរ & អាំងប៉ាវ' : 'Gifts & Wishes'}
          </a>
        </nav>

        {/* Zone 3: Primary Action and Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Ambient Music Toggle */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? (lang === 'km' ? 'បិទតន្ត្រី' : 'Mute music') : (lang === 'km' ? 'បើកតន្ត្រី' : 'Play melody')}
            className={`p-2 rounded-full border transition-all ${
              isPlayingMusic
                ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#8E2818] animate-pulse'
                : 'border-stone-300 text-stone-600 hover:border-[#C5A059]'
            }`}
            aria-label="Toggle traditional wedding melody"
          >
            {isPlayingMusic ? <Music className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1 text-xs font-semibold rounded-md border border-[#C5A059]/40 bg-white/70 text-[#5C4A3A] hover:bg-white transition-all whitespace-nowrap shrink-0"
            title="Switch Language"
          >
            {lang === 'km' ? 'EN' : 'ខ្មែរ'}
          </button>

          {/* Host Editor Quick Trigger */}
          <button
            onClick={onOpenEditor}
            title={lang === 'km' ? 'កែប្រែព័ត៌មានធៀបការ' : 'Edit Wedding Card'}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-700 hover:border-[#C5A059] transition-all whitespace-nowrap shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{lang === 'km' ? 'កែប្រែធៀប' : 'Edit Info'}</span>
          </button>

          {/* Primary CTA: RSVP */}
          <button
            onClick={onScrollToRsvp}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#8E2818] rounded-lg hover:bg-[#731E12] shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            {lang === 'km' ? 'បញ្ជាក់ចូលរួម (RSVP)' : 'RSVP Now'}
          </button>
        </div>
      </div>
    </header>
  );
};
