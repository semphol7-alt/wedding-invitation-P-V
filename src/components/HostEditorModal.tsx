import React, { useState } from 'react';
import { X, Save, Link2, Copy, Check, Send, RotateCcw } from 'lucide-react';
import { WeddingData, INITIAL_WEDDING_DATA } from '../types';

interface HostEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  wedding: WeddingData;
  onSave: (data: WeddingData) => void;
  lang: 'km' | 'en';
}

export const HostEditorModal: React.FC<HostEditorModalProps> = ({
  isOpen,
  onClose,
  wedding,
  onSave,
  lang,
}) => {
  const [formData, setFormData] = useState<WeddingData>(wedding);
  const [guestInput, setGuestInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const generatedGuestUrl = (() => {
    const origin = window.location.origin + window.location.pathname;
    if (!guestInput.trim()) return origin;
    return `${origin}?guest=${encodeURIComponent(guestInput.trim())}`;
  })();

  const handleCopyGuestLink = () => {
    navigator.clipboard.writeText(generatedGuestUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent(
      lang === 'km'
        ? `សូមគោរពអញ្ជើញ ${guestInput || 'ភ្ញៀវកិត្តិយស'} ចូលរួមពិធីមង្គលការ ${formData.groomNameKhmer} & ${formData.brideNameKhmer}៖\n${generatedGuestUrl}`
        : `Cordially inviting ${guestInput || 'you'} to the wedding celebration of ${formData.groomNameEnglish} & ${formData.brideNameEnglish}:\n${generatedGuestUrl}`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(generatedGuestUrl)}&text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm(lang === 'km' ? 'តើអ្នកពិតជាចង់កំណត់ទិន្នន័យឡើងវិញមែនទេ?' : 'Reset to default wedding details?')) {
      setFormData(INITIAL_WEDDING_DATA);
      onSave(INITIAL_WEDDING_DATA);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
          <div>
            <h2 className="font-moul text-xl text-[#8E2818]">
              {lang === 'km' ? 'ផ្ទាំងគ្រប់គ្រង & កែប្រែព័ត៌មានធៀបការ' : 'Wedding Invitation Studio'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {lang === 'km'
                ? 'កែប្រែព័ត៌មានកូនកំលោះ កូនក្រមុំ ទីតាំង ផែនទី និងបង្កើតតំណភ្ជាប់អញ្ជើញភ្ញៀវ'
                : 'Customize details, venue, map link, and generate personalized guest links'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guest Link Generator Box */}
        <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#D4AF37]/50 mb-8 space-y-3">
          <div className="flex items-center gap-2 text-[#8E2818] font-bold text-sm">
            <Link2 className="w-4 h-4 text-[#C5A059]" />
            <span>{lang === 'km' ? 'បង្កើតតំណភ្ជាប់ធៀបការអញ្ជើញភ្ញៀវផ្ទាល់ខ្លួន' : 'Personalized Guest Invitation Link'}</span>
          </div>
          <p className="text-xs text-[#5C4A3A]">
            {lang === 'km'
              ? 'បញ្ចូលឈ្មោះភ្ញៀវ ឬគោត្តនាមដើម្បីបង្កើតតំណភ្ជាប់ធៀបការផ្ទាល់ខ្លួន (ផ្ញើតាម Telegram ឬ Messenger)៖'
              : 'Enter guest name to generate a tailored invitation link (ready to share via Telegram or WhatsApp):'}
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={guestInput}
              onChange={(e) => setGuestInput(e.target.value)}
              placeholder={lang === 'km' ? 'ឧ. ឯកឧត្តម ជា សុវណ្ណ និងលោកជំទាវ' : 'e.g., H.E. Chea Sovann & Spouse'}
              className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
            />
            <button
              onClick={handleCopyGuestLink}
              className="px-4 py-2 rounded-xl bg-[#8E2818] text-white text-xs font-semibold hover:bg-[#721E12] transition-colors flex items-center justify-center gap-1.5 shrink-0"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? (lang === 'km' ? 'បានចម្លង!' : 'Copied!') : (lang === 'km' ? 'ចម្លងតំណ' : 'Copy Link')}</span>
            </button>
            <button
              onClick={handleShareTelegram}
              className="px-4 py-2 rounded-xl bg-[#2AABEE] text-white text-xs font-semibold hover:bg-[#229ED9] transition-colors flex items-center justify-center gap-1.5 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </button>
          </div>
          {guestInput.trim() && (
            <div className="text-[11px] text-[#7D6652] truncate font-mono bg-white/70 p-2 rounded-lg border border-stone-200">
              {generatedGuestUrl}
            </div>
          )}
        </div>

        {/* Wedding Details Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Couple Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 p-4 rounded-xl border border-stone-200 bg-[#FAF7F2]">
              <span className="text-xs font-bold text-[#8E2818] block">
                {lang === 'km' ? 'ព័ត៌មានកូនប្រុស (Groom)' : 'Groom Information'}
              </span>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'ឈ្មោះកូនប្រុស (ខ្មែរ)' : 'Groom Name (Khmer)'}
                </label>
                <input
                  type="text"
                  value={formData.groomNameKhmer}
                  onChange={(e) => setFormData({ ...formData, groomNameKhmer: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'ឈ្មោះកូនប្រុស (អង់គ្លេស)' : 'Groom Name (English)'}
                </label>
                <input
                  type="text"
                  value={formData.groomNameEnglish}
                  onChange={(e) => setFormData({ ...formData, groomNameEnglish: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'ឪពុកខាងកូនប្រុស' : "Groom's Father"}
                </label>
                <input
                  type="text"
                  value={formData.groomFatherKhmer}
                  onChange={(e) => setFormData({ ...formData, groomFatherKhmer: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'ម្តាយខាងកូនប្រុស' : "Groom's Mother"}
                </label>
                <input
                  type="text"
                  value={formData.groomMotherKhmer}
                  onChange={(e) => setFormData({ ...formData, groomMotherKhmer: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-xl border border-stone-200 bg-[#FAF7F2]">
              <span className="text-xs font-bold text-[#8E2818] block">
                {lang === 'km' ? 'ព័ត៌មានកូនស្រី (Bride)' : 'Bride Information'}
              </span>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'ឈ្មោះកូនស្រី (ខ្មែរ)' : 'Bride Name (Khmer)'}
                </label>
                <input
                  type="text"
                  value={formData.brideNameKhmer}
                  onChange={(e) => setFormData({ ...formData, brideNameKhmer: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'ឈ្មោះកូនស្រី (អង់គ្លេស)' : 'Bride Name (English)'}
                </label>
                <input
                  type="text"
                  value={formData.brideNameEnglish}
                  onChange={(e) => setFormData({ ...formData, brideNameEnglish: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'ឪពុកខាងកូនស្រី' : "Bride's Father"}
                </label>
                <input
                  type="text"
                  value={formData.brideFatherKhmer}
                  onChange={(e) => setFormData({ ...formData, brideFatherKhmer: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'ម្តាយខាងកូនស្រី' : "Bride's Mother"}
                </label>
                <input
                  type="text"
                  value={formData.brideMotherKhmer}
                  onChange={(e) => setFormData({ ...formData, brideMotherKhmer: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
            </div>
          </div>

          {/* Venue & Date */}
          <div className="space-y-3 p-4 rounded-xl border border-stone-200 bg-[#FAF7F2]">
            <span className="text-xs font-bold text-[#8E2818] block">
              {lang === 'km' ? 'ទីតាំង & កាលបរិច្ឆេទ' : 'Date & Venue Details'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'កាលបរិច្ឆេទ (ខ្មែរ)' : 'Date (Khmer)'}
                </label>
                <input
                  type="text"
                  value={formData.weddingDateFormattedKhmer}
                  onChange={(e) => setFormData({ ...formData, weddingDateFormattedKhmer: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'កាលបរិច្ឆេទចន្ទគតិ' : 'Lunar Calendar Date'}
                </label>
                <input
                  type="text"
                  value={formData.lunarDateKhmer}
                  onChange={(e) => setFormData({ ...formData, lunarDateKhmer: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'ឈ្មោះទីកន្លែង / មណ្ឌល' : 'Venue Name'}
                </label>
                <input
                  type="text"
                  value={formData.venueNameKhmer}
                  onChange={(e) => setFormData({ ...formData, venueNameKhmer: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'អគារ / សាល' : 'Hall / Building'}
                </label>
                <input
                  type="text"
                  value={formData.venueHall}
                  onChange={(e) => setFormData({ ...formData, venueHall: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                {lang === 'km' ? 'អាសយដ្ឋានទីតាំង' : 'Full Address'}
              </label>
              <input
                type="text"
                value={formData.venueAddressKhmer}
                onChange={(e) => setFormData({ ...formData, venueAddressKhmer: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                {lang === 'km' ? 'តំណភ្ជាប់ Google Maps (URL)' : 'Google Maps URL'}
              </label>
              <input
                type="text"
                value={formData.googleMapsUrl}
                onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white font-mono"
              />
            </div>
          </div>

          {/* Bank / KHQR Details */}
          <div className="space-y-3 p-4 rounded-xl border border-stone-200 bg-[#FAF7F2]">
            <span className="text-xs font-bold text-[#8E2818] block">
              {lang === 'km' ? 'ព័ត៌មានអាំងប៉ាវ & ធនាគារ (KHQR Gift)' : 'KHQR Gift Details'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'ឈ្មោះគណនី' : 'Account Name'}
                </label>
                <input
                  type="text"
                  value={formData.khqrAccountName}
                  onChange={(e) => setFormData({ ...formData, khqrAccountName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">
                  {lang === 'km' ? 'លេខគណនី និងធនាគារ' : 'Account Number & Bank'}
                </label>
                <input
                  type="text"
                  value={formData.khqrAccountNumber}
                  onChange={(e) => setFormData({ ...formData, khqrAccountNumber: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'km' ? 'កំណត់ឡើងវិញ' : 'Reset to Default'}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl"
              >
                {lang === 'km' ? 'បោះបង់' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#8E2818] hover:bg-[#721E12] rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{lang === 'km' ? 'រក្សាទុកការកែប្រែ' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
