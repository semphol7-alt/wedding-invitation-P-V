import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, Car, Building2, ExternalLink } from 'lucide-react';
import { WeddingData } from '../types';
import { KhmerFloralDivider } from '../utils/khmerOrnaments';

interface VenueMapProps {
  wedding: WeddingData;
  lang: 'km' | 'en';
}

export const VenueMap: React.FC<VenueMapProps> = ({ wedding, lang }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const text = `${wedding.venueNameEnglish}, ${wedding.venueHall}, ${wedding.venueAddressEnglish}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Google Maps embed query for The Premier Centre Sen Sok or dynamic location
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(wedding.venueNameEnglish + ', Phnom Penh')}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="venue" className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#9C7026]">
          {lang === 'km' ? 'ទីតាំងប្រារព្ធពិធី & ផែនទី' : 'Venue & Directions'}
        </span>
        <h2 className="font-moul text-2xl sm:text-3xl text-[#8E2818] mt-1 mb-2">
          {lang === 'km' ? 'ទីកន្លែងរៀបចំពិធីមង្គលការ' : 'Wedding Reception & Banquet Venue'}
        </h2>
        <p className="text-xs sm:text-sm text-[#7D6652] max-w-lg mx-auto">
          {lang === 'km'
            ? 'សូមពិនិត្យមើលផែនទី និងទីតាំងងាយស្រួលធ្វើដំណើរមកកាន់មណ្ឌលប្រារព្ធពិធី'
            : 'Find your route and venue directions to celebrate with us'}
        </p>
        <KhmerFloralDivider className="max-w-xs mx-auto" />
      </div>

      <div className="bg-white rounded-3xl border border-[#E3D6C1] shadow-xl overflow-hidden">
        {/* Reception Venue Banner Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src="/src/assets/images/khmer_wedding_reception_1792070534776.jpg"
            alt="Wedding Reception Grand Ballroom"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
            <span className="text-xs uppercase tracking-widest text-[#F7E7A9] font-semibold mb-1">
              {wedding.venueHall}
            </span>
            <h3 className="font-moul text-xl sm:text-2xl text-white">
              {lang === 'km' ? wedding.venueNameKhmer : wedding.venueNameEnglish}
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#F7E7A9] shrink-0" />
              <span>{lang === 'km' ? wedding.venueAddressKhmer : wedding.venueAddressEnglish}</span>
            </p>
          </div>
        </div>

        {/* Map & Venue Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-[#E3D6C1]">
          {/* Left Column: Embed Map Viewer */}
          <div className="lg:col-span-7 h-72 sm:h-96 relative bg-stone-100">
            <iframe
              title="Google Map Venue Preview"
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

          {/* Right Column: Direction Details & Direct Button */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF7F2] space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#9C7026] uppercase tracking-wider block mb-1">
                  {lang === 'km' ? 'ព័ត៌មានអគារ' : 'Hall Information'}
                </span>
                <div className="flex items-center gap-2 text-sm text-[#2D241E] font-medium">
                  <Building2 className="w-4 h-4 text-[#8E2818]" />
                  <span>{wedding.venueHall}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#9C7026] uppercase tracking-wider block mb-1">
                  {lang === 'km' ? 'ចំណតរថយន្ត និងទោចក្រយានយន្ត' : 'Parking Information'}
                </span>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#5C4A3A]">
                  <Car className="w-4 h-4 text-[#8E2818] shrink-0" />
                  <span>
                    {lang === 'km'
                      ? 'មានចំណតធំទូលាយ សុវត្ថិភាពខ្ពស់ និងឥតគិតថ្លៃសម្រាប់ភ្ញៀវកិត្តិយស'
                      : 'Spacious, secure, and complimentary parking available for all guests'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#9C7026] uppercase tracking-wider block mb-1">
                  {lang === 'km' ? 'អាសយដ្ឋានពេញលេញ' : 'Full Address'}
                </span>
                <p className="text-xs sm:text-sm text-[#5C4A3A] bg-white p-3 rounded-xl border border-[#E3D6C1] leading-relaxed">
                  {lang === 'km' ? wedding.venueAddressKhmer : wedding.venueAddressEnglish}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={wedding.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-btn w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#8E2818] hover:bg-[#721E12] text-white font-semibold rounded-xl shadow-md transition-all text-sm group"
              >
                <Navigation className="w-4 h-4 text-[#F7E7A9] group-hover:scale-110 transition-transform" />
                <span>{lang === 'km' ? 'មើលទីកន្លែងរៀបចំពិធី (Google Maps)' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-4 h-4 text-white/70" />
              </a>

              <button
                onClick={handleCopyAddress}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-[#FAF4E8] text-[#5C4A3A] font-medium border border-[#D4AF37]/50 rounded-xl transition-all text-xs sm:text-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">
                      {lang === 'km' ? 'បានចម្លងអាសយដ្ឋានជោគជ័យ' : 'Address Copied!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#9C7026]" />
                    <span>{lang === 'km' ? 'ចម្លងអាសយដ្ឋាន' : 'Copy Address'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
