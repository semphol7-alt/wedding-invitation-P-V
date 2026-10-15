import React, { useState, useEffect } from 'react';
import { Mail, ArrowUp, Share2, Heart } from 'lucide-react';
import { WeddingData, INITIAL_WEDDING_DATA, GuestWish, INITIAL_WISHES } from './types';
import { WeddingHeader } from './components/WeddingHeader';
import { EnvelopeModal } from './components/EnvelopeModal';
import { InvitationLetter } from './components/InvitationLetter';
import { CeremonyTimeline } from './components/CeremonyTimeline';
import { VenueMap } from './components/VenueMap';
import { CountdownSection } from './components/CountdownSection';
import { PhotoGallery } from './components/PhotoGallery';
import { RsvpForm } from './components/RsvpForm';
import { GiftEnvelope } from './components/GiftEnvelope';
import { HostEditorModal } from './components/HostEditorModal';
import { weddingAudio } from './utils/soundEffects';

export default function App() {
  const [lang, setLang] = useState<'km' | 'en'>('km');
  const [wedding, setWedding] = useState<WeddingData>(() => {
    try {
      const saved = localStorage.getItem('khmer_wedding_data');
      return saved ? JSON.parse(saved) : INITIAL_WEDDING_DATA;
    } catch {
      return INITIAL_WEDDING_DATA;
    }
  });

  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem('khmer_wedding_wishes');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch {
      return INITIAL_WISHES;
    }
  });

  const [guestName, setGuestName] = useState<string>('');
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Extract ?guest= from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gName = params.get('guest');
    if (gName) {
      setGuestName(gName);
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenEnvelope = () => {
    weddingAudio.playEnvelopeOpenSound();
    setEnvelopeOpen(true);
    // Start ambient gentle harmony
    weddingAudio.start();
    setIsPlayingMusic(true);
  };

  const handleToggleMusic = () => {
    const state = weddingAudio.togglePlay(setIsPlayingMusic);
    setIsPlayingMusic(state);
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'km' ? 'en' : 'km'));
  };

  const handleSaveWedding = (newData: WeddingData) => {
    setWedding(newData);
    try {
      localStorage.setItem('khmer_wedding_data', JSON.stringify(newData));
    } catch {
      // storage error
    }
  };

  const handleAddWish = (wishData: Omit<GuestWish, 'id' | 'createdAt'>) => {
    const newWish: GuestWish = {
      ...wishData,
      id: 'wish-' + Date.now(),
      createdAt: lang === 'km' ? 'អម្បាញ់មិញ' : 'Just now',
    };
    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('khmer_wedding_wishes', JSON.stringify(updated));
    } catch {
      // storage error
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    const shareText =
      lang === 'km'
        ? `សូមគោរពអញ្ជើញភ្ញៀវកិត្តិយសទាំងអស់ ចូលរួមពិធីមង្គលការ ${wedding.groomNameKhmer} & ${wedding.brideNameKhmer}`
        : `Wedding Invitation: ${wedding.groomNameEnglish} & ${wedding.brideNameEnglish}`;

    if (navigator.share) {
      navigator
        .share({
          title: shareText,
          text: shareText,
          url: shareUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert(lang === 'km' ? 'បានចម្លងតំណភ្ជាប់ធៀបការរួចរាល់!' : 'Invitation link copied!');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D241E] flex flex-col font-khmer selection:bg-[#E5C158]/30">
      <div id="top" />

      {/* Envelope Modal for incoming guest */}
      {!envelopeOpen && (
        <EnvelopeModal
          wedding={wedding}
          guestName={guestName}
          lang={lang}
          onOpen={handleOpenEnvelope}
        />
      )}

      {/* Top Bar Contract (Wordmark, Nav links, Primary Action) */}
      <WeddingHeader
        lang={lang}
        onToggleLang={handleToggleLang}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        onOpenEditor={() => setIsEditorOpen(true)}
        onScrollToRsvp={() => scrollToSection('rsvp')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Re-Open Envelope Floating Hint if user opened it */}
        <div className="max-w-5xl mx-auto px-4 pt-4 flex justify-between items-center text-xs text-[#7D6652]">
          <button
            onClick={() => setEnvelopeOpen(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border border-[#D4AF37]/40 hover:bg-white text-[#8E2818] font-medium transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{lang === 'km' ? 'មើលស្រោមសំបុត្រធៀប' : 'View Envelope'}</span>
          </button>

          {guestName && (
            <div className="bg-[#FAF4E8] px-3 py-1 rounded-full border border-[#D4AF37]/30 text-[#8E2818] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {lang === 'km' ? `សូមគោរពអញ្ជើញ៖ ${guestName}` : `Guest: ${guestName}`}
            </div>
          )}
        </div>

        {/* 1. Official Invitation Letter & Couple Portrait */}
        <InvitationLetter
          wedding={wedding}
          guestName={guestName}
          lang={lang}
          onScrollToMap={() => scrollToSection('venue')}
          onShare={handleShare}
        />

        {/* 2. Live Countdown */}
        <CountdownSection wedding={wedding} lang={lang} />

        {/* 3. Ceremonies & Traditional Program */}
        <CeremonyTimeline schedule={wedding.schedule} lang={lang} />

        {/* 4. Pre-Wedding Photo Gallery */}
        <PhotoGallery lang={lang} />

        {/* 5. Venue Location & Google Maps */}
        <VenueMap wedding={wedding} lang={lang} />

        {/* 6. RSVP & Live Wishes Guestbook */}
        <RsvpForm
          guestName={guestName}
          wishes={wishes}
          onAddWish={handleAddWish}
          lang={lang}
        />

        {/* 7. Gift Envelope & KHQR Bakong */}
        <GiftEnvelope wedding={wedding} lang={lang} />
      </main>

      {/* Host Customizer Modal */}
      <HostEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        wedding={wedding}
        onSave={handleSaveWedding}
        lang={lang}
      />

      {/* Floating Action Buttons: Scroll to top & Share */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/90 text-[#8E2818] shadow-lg border border-[#D4AF37]/50 hover:bg-white hover:scale-105 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#E3D6C1] bg-[#FAF4E8]/80 py-10 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#8E2818]">
            <Heart className="w-4 h-4 fill-[#8E2818]" />
            <span className="font-moul text-base sm:text-lg">
              {wedding.groomNameKhmer} & {wedding.brideNameKhmer}
            </span>
            <Heart className="w-4 h-4 fill-[#8E2818]" />
          </div>

          <p className="text-xs sm:text-sm text-[#7D6652] max-w-md mx-auto leading-relaxed">
            {lang === 'km'
              ? 'សូមគោរពថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះវត្តមាន និងពាក្យជូនពរដ៏ថ្លៃថ្លារបស់ភ្ញៀវកិត្តិយសទាំងអស់'
              : 'Our heartfelt gratitude to our families and friends for celebrating our auspicious union.'}
          </p>

          <div className="pt-4 border-t border-stone-200/60 text-[11px] text-[#A69382] flex flex-wrap items-center justify-center gap-4">
            <span>© 2026 {wedding.groomNameEnglish} & {wedding.brideNameEnglish}</span>
            <span>·</span>
            <span>ធៀបការរៀបអាពាហ៍ពិពាហ៍បែបឌីជីថល</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
