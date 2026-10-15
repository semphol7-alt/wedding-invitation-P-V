import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { KhmerFloralDivider } from '../utils/khmerOrnaments';

interface PhotoGalleryProps {
  lang: 'km' | 'en';
}

interface GalleryItem {
  id: string;
  src: string;
  titleKhmer: string;
  titleEnglish: string;
  captionKhmer: string;
  captionEnglish: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ lang }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const photos: GalleryItem[] = [
    {
      id: 'photo-1',
      src: '/src/assets/images/khmer_wedding_couple_1792070534570.jpg',
      titleKhmer: 'សម្លៀកបំពាក់ក្សត្របុរាណខ្មែរ',
      titleEnglish: 'Royal Khmer Traditional Silk',
      captionKhmer: 'ថតអនុស្សាវរីយ៍មុខប្រាសាទបុរាណ ក្នុងសម្លៀកបំពាក់សូត្រមាសប្រពៃណីខ្មែរ',
      captionEnglish: 'Pre-wedding moments in traditional gold silk sampot chong kben at ancient Angkor.',
    },
    {
      id: 'photo-2',
      src: '/src/assets/images/khmer_wedding_ceremony_1792070535446.jpg',
      titleKhmer: 'គ្រឿងរណ្ដាប់សិរីសួស្តីពិធីការ',
      titleEnglish: 'Sacred Blessing & Offerings',
      captionKhmer: 'ផ្កាឈូក កម្រងផ្កាម្លិះ ស្លាត្រួយ និងទៀនពពិលមង្គល',
      captionEnglish: 'Lotus blossoms, jasmine garlands, and sacred blessings by family and monks.',
    },
    {
      id: 'photo-3',
      src: '/src/assets/images/khmer_wedding_reception_1792070534776.jpg',
      titleKhmer: 'ក្លោងទ្វារផ្កាស្វាគមន៍ភ្ញៀវកិត្តិយស',
      titleEnglish: 'Grand Reception Floral Arch',
      captionKhmer: 'ក្លោងទ្វារផ្កាស្រស់ និងបរិយាកាសកក់ក្តៅត្រៀមទទួលភ្ញៀវកិត្តិយស',
      captionEnglish: 'Luxurious floral ballroom entrance prepared to welcome our cherished guests.',
    },
  ];

  const handleNext = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  };

  const handlePrev = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section id="gallery" className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#9C7026]">
          {lang === 'km' ? 'អនុស្សាវរីយ៍ស្នេហ៍' : 'Our Memories'}
        </span>
        <h2 className="font-moul text-2xl sm:text-3xl text-[#8E2818] mt-1 mb-2">
          {lang === 'km' ? 'អាល់ប៊ុមរូបថតអនុស្សាវរីយ៍' : 'Pre-Wedding Photo Gallery'}
        </h2>
        <p className="text-xs sm:text-sm text-[#7D6652] max-w-lg mx-auto">
          {lang === 'km'
            ? 'រូបថតនៃក្តីស្រឡាញ់ និងការចងចាំដ៏ស្រស់បំព្រងរបស់គូស្វាមីភរិយា'
            : 'Precious glimpses of our shared journey towards marriage'}
        </p>
        <KhmerFloralDivider className="max-w-xs mx-auto" />
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setActivePhotoIndex(index)}
            className="group relative rounded-2xl overflow-hidden bg-stone-100 border border-[#E3D6C1] shadow-md hover:shadow-xl transition-all cursor-pointer aspect-[4/5]"
          >
            <img
              src={photo.src}
              alt={photo.titleEnglish}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
              <span className="text-[11px] font-semibold text-[#F7E7A9] uppercase tracking-wider mb-0.5">
                {lang === 'km' ? photo.titleKhmer : photo.titleEnglish}
              </span>
              <p className="text-xs text-stone-200 line-clamp-2">
                {lang === 'km' ? photo.captionKhmer : photo.captionEnglish}
              </p>
            </div>
            <div className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all z-10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[90vh] flex flex-col items-center">
            <img
              src={photos[activePhotoIndex].src}
              alt={photos[activePhotoIndex].titleEnglish}
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center text-white max-w-xl px-4">
              <h4 className="font-moul text-lg text-[#F7E7A9]">
                {lang === 'km'
                  ? photos[activePhotoIndex].titleKhmer
                  : photos[activePhotoIndex].titleEnglish}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                {lang === 'km'
                  ? photos[activePhotoIndex].captionKhmer
                  : photos[activePhotoIndex].captionEnglish}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
