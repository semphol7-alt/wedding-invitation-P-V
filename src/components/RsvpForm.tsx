import React, { useState } from 'react';
import { CheckCircle2, Heart, MessageSquare, Send, Users, UserCheck, XCircle } from 'lucide-react';
import { GuestWish } from '../types';
import { KhmerFloralDivider } from '../utils/khmerOrnaments';

interface RsvpFormProps {
  guestName: string;
  wishes: GuestWish[];
  onAddWish: (wish: Omit<GuestWish, 'id' | 'createdAt'>) => void;
  lang: 'km' | 'en';
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ guestName, wishes, onAddWish, lang }) => {
  const [name, setName] = useState(guestName || '');
  const [attendance, setAttendance] = useState<'attending' | 'not_attending'>('attending');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddWish({
      guestName: name.trim(),
      attendance,
      guestCount: attendance === 'attending' ? guestCount : 0,
      message: message.trim() || (lang === 'km' ? 'សូមជូនពរឱ្យគូស្វាមីភរិយាថ្មី សុខសាន្តត្រជាក់ត្រជុំជានិច្ច!' : 'Wishing you both a lifetime of love and happiness!'),
    });

    setSubmitted(true);
    setTimeout(() => {
      setMessage('');
    }, 1000);
  };

  const totalAttending = wishes
    .filter((w) => w.attendance === 'attending')
    .reduce((sum, w) => sum + (w.guestCount || 1), 0);

  return (
    <section id="rsvp" className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#9C7026]">
          {lang === 'km' ? 'ការបញ្ជាក់ចូលរួម & សៀវភៅជូនពរ' : 'RSVP & Guestbook'}
        </span>
        <h2 className="font-moul text-2xl sm:text-3xl text-[#8E2818] mt-1 mb-2">
          {lang === 'km' ? 'បញ្ជាក់ការចូលរួម & ជូនពរ' : 'RSVP & Best Wishes for the Couple'}
        </h2>
        <p className="text-xs sm:text-sm text-[#7D6652] max-w-lg mx-auto">
          {lang === 'km'
            ? 'សូមជួយបញ្ជាក់ការចូលរួម ដើម្បីជួយសម្រួលដល់ការរៀបចំតុ និងម្ហូបអាហារទទួលបដិសណ្ឋារកិច្ច'
            : 'Please confirm your attendance to help us arrange seating and hospitality'}
        </p>
        <KhmerFloralDivider className="max-w-xs mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* RSVP Form Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D6C1] shadow-xl">
          <div className="flex items-center gap-2 mb-6 text-[#8E2818]">
            <UserCheck className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-moul text-lg text-[#8E2818]">
              {lang === 'km' ? 'ទម្រង់បែបបទបញ្ជាក់ការចូលរួម' : 'Attendance Confirmation Form'}
            </h3>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D4AF37]/50 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-moul text-lg text-[#8E2818]">
                {lang === 'km' ? 'សូមអរគុណយ៉ាងជ្រាលជ្រៅ!' : 'Thank You Warmly!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#5C4A3A]">
                {lang === 'km'
                  ? 'ព័ត៌មានបញ្ជាក់ការចូលរួម និងពាក្យជូនពររបស់អ្នកត្រូវបានកត់ត្រាទុកដោយក្តីរីករាយ។'
                  : 'Your attendance response and heartfelt blessings have been joyfully received.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 text-xs text-[#8E2818] underline font-medium hover:text-[#AA2E1B]"
              >
                {lang === 'km' ? 'ផ្ញើសារជូនពរបន្ថែមទៀត' : 'Send another wish'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-semibold text-[#5C4A3A] uppercase tracking-wider mb-1.5">
                  {lang === 'km' ? 'គោត្តនាម & នាម ឬ តួនាទី' : 'Your Name / Title'} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'km' ? 'ឧ. លោក សុខ ជា និងភរិយា' : 'e.g., Mr. & Mrs. Sok'}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] bg-[#FAF7F2] text-sm"
                />
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-semibold text-[#5C4A3A] uppercase tracking-wider mb-2">
                  {lang === 'km' ? 'ស្ថានភាពចូលរួម' : 'Will you attend?'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                      attendance === 'attending'
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-800 shadow-sm font-semibold'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'km' ? 'រីករាយនឹងចូលរួម' : 'Joyfully Attend'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('not_attending')}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                      attendance === 'not_attending'
                        ? 'border-stone-500 bg-stone-100 text-stone-800 font-semibold'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <XCircle className="w-4 h-4 text-stone-500" />
                    <span>{lang === 'km' ? 'អធ្យាស្រ័យមិនអាចចូល' : 'Regretfully Decline'}</span>
                  </button>
                </div>
              </div>

              {/* Number of Guests */}
              {attendance === 'attending' && (
                <div>
                  <label className="block text-xs font-semibold text-[#5C4A3A] uppercase tracking-wider mb-1.5">
                    {lang === 'km' ? 'ចំនួនភ្ញៀវចូលរួម (រួមទាំងអ្នក)' : 'Total Guests Attending'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setGuestCount(count)}
                        className={`w-10 h-10 rounded-xl border text-sm font-semibold transition-all ${
                          guestCount === count
                            ? 'bg-[#8E2818] border-[#8E2818] text-white shadow-sm'
                            : 'bg-[#FAF7F2] border-stone-200 text-[#5C4A3A] hover:border-[#C5A059]'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                    <span className="text-xs text-[#7D6652] ml-1">
                      {lang === 'km' ? 'នាក់' : 'person(s)'}
                    </span>
                  </div>
                </div>
              )}

              {/* Message / Blessings */}
              <div>
                <label className="block text-xs font-semibold text-[#5C4A3A] uppercase tracking-wider mb-1.5">
                  {lang === 'km' ? 'ពាក្យប្រសិទ្ធពរជ័យជូនគូស្វាមីភរិយា' : 'Your Blessings & Wishes'}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === 'km'
                      ? 'សូមជូនពរឱ្យក្មួយទាំងពីរ ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង រកស៊ីមានបាន ត្រជាក់ត្រជុំ...'
                      : 'Share your warm wedding wishes for the bride and groom...'
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] bg-[#FAF7F2] text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#8E2818] to-[#AC2F1B] hover:from-[#781F12] hover:to-[#912515] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#F7E7A9]" />
                <span>{lang === 'km' ? 'ផ្ញើការបញ្ជាក់ & ពរជ័យ' : 'Send RSVP & Blessing'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Live Guestbook Wall */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D6C1] shadow-xl flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-moul text-lg text-[#8E2818]">
                {lang === 'km' ? 'សៀវភៅជូនពរឌីជីថល' : 'Live Guest Wishes'}
              </h3>
            </div>
            <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF4E8] text-[#9C7026] border border-[#D4AF37]/40 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>
                {lang === 'km' ? `ចូលរួម: ${totalAttending} នាក់` : `${totalAttending} Attending`}
              </span>
            </div>
          </div>

          {/* List of Wishes */}
          <div className="flex-1 overflow-y-auto pt-4 space-y-3.5 pr-1">
            {wishes.length === 0 ? (
              <div className="text-center py-12 text-stone-400 text-xs">
                {lang === 'km' ? 'មិនទាន់មានពាក្យជូនពរនៅឡើយទេ។ សូមក្លាយជាអ្នកដំបូង!' : 'No wishes yet. Be the first to congratulate the couple!'}
              </div>
            ) : (
              wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DAC2] text-xs sm:text-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[#8E2818] flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
                      {wish.guestName}
                    </span>
                    <span className="text-[11px] text-stone-400">{wish.createdAt}</span>
                  </div>
                  <p className="text-[#4E3F32] leading-relaxed italic">
                    "{wish.message}"
                  </p>
                  {wish.attendance === 'attending' && (
                    <div className="text-[11px] text-emerald-700 font-medium pt-1">
                      ✓ {lang === 'km' ? `ចូលរួម ${wish.guestCount} នាក់` : `Attending (${wish.guestCount} guests)`}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
