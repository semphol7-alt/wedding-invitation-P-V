export interface CeremonyEvent {
  id: string;
  time: string;
  khmerTitle: string;
  englishTitle: string;
  khmerDesc: string;
  englishDesc: string;
  iconType: 'procession' | 'haircut' | 'tying' | 'banquet' | 'ring';
}

export interface GuestWish {
  id: string;
  guestName: string;
  attendance: 'attending' | 'not_attending';
  guestCount: number;
  message: string;
  createdAt: string;
}

export interface WeddingData {
  groomNameKhmer: string;
  groomNameEnglish: string;
  brideNameKhmer: string;
  brideNameEnglish: string;
  groomFatherKhmer: string;
  groomMotherKhmer: string;
  brideFatherKhmer: string;
  brideMotherKhmer: string;
  weddingDateFormattedKhmer: string;
  weddingDateFormattedEnglish: string;
  lunarDateKhmer: string;
  weddingTimestamp: string; // ISO date string for countdown
  venueNameKhmer: string;
  venueNameEnglish: string;
  venueHall: string;
  venueAddressKhmer: string;
  venueAddressEnglish: string;
  googleMapsUrl: string;
  khqrAccountName: string;
  khqrAccountNumber: string;
  khqrBankName: string;
  coupleQuoteKhmer: string;
  coupleQuoteEnglish: string;
  schedule: CeremonyEvent[];
}

export const INITIAL_WEDDING_DATA: WeddingData = {
  groomNameKhmer: 'សុខ ចាន់រិទ្ធិ',
  groomNameEnglish: 'Sok Chanrith',
  brideNameKhmer: 'ជា រស្មី',
  brideNameEnglish: 'Chea Reaksmey',
  groomFatherKhmer: 'លោក សុខ គឹមហេង',
  groomMotherKhmer: 'លោកស្រី ម៉ៅ សុភា',
  brideFatherKhmer: 'លោក ជា សុផល',
  brideMotherKhmer: 'លោកស្រី កែវ ចិន្តា',
  weddingDateFormattedKhmer: 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦',
  weddingDateFormattedEnglish: 'Sunday, November 15, 2026',
  lunarDateKhmer: 'ត្រូវនឹងថ្ងៃ ៧កើត ខែកត្តិក ឆ្នាំមមី អដ្ឋស័ក ព.ស. ២៥៧០',
  weddingTimestamp: '2026-11-15T07:00:00+07:00',
  venueNameKhmer: 'ដឺ ព្រីមៀ សេនធ័រ សែនសុខ (The Premier Centre Sen Sok)',
  venueNameEnglish: 'The Premier Centre Sen Sok',
  venueHall: 'អគារ C & D (Building C & D)',
  venueAddressKhmer: 'ផ្លូវលេខ ១០០៣ សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ',
  venueAddressEnglish: 'Street 1003, Sangkat Phnom Penh Thmey, Khan Sen Sok, Phnom Penh',
  googleMapsUrl: 'https://maps.app.goo.gl/g278wEdfiQfomdDdA',
  khqrAccountName: 'SOK CHANRITH & CHEA REAKSMEY',
  khqrAccountNumber: '001 234 567 (ABA Bank)',
  khqrBankName: 'ABA Bank / Bakong KHQR',
  coupleQuoteKhmer: '«ក្តីស្រឡាញ់ គឺការរួមដំណើរជាមួយគ្នាដោយការគោរព យោគយល់ និងផ្តល់តម្លៃឱ្យគ្នាជារៀងរហូត»',
  coupleQuoteEnglish: '"Two souls intertwined in mutual respect, devotion and lifelong harmony."',
  schedule: [
    {
      id: '1',
      time: '០៧:០០ ព្រឹក (07:00 AM)',
      khmerTitle: 'ពិធីហែជំនូន & សែនក្រុងពាលី',
      englishTitle: 'Groom Procession & Ancestral Blessings',
      khmerDesc: 'ក្បួនហែផ្លែឈើជំនូន និងគ្រឿងបណ្ណាការ ឆ្ពោះទៅកាន់គេហដ្ឋានខាងស្រី ប្រកបដោយភាពរីករាយ។',
      englishDesc: 'Traditional procession of fruit trays and gifts presented to the bride’s residence.',
      iconType: 'procession',
    },
    {
      id: '2',
      time: '០៨:៣០ ព្រឹក (08:30 AM)',
      khmerTitle: 'ពិធីកាត់សក់បង្កក់សិរី',
      englishTitle: 'Gaat Sah (Hair Cutting & Cleansing Ceremony)',
      khmerDesc: 'ពិធីកាត់សក់ដើម្បីជម្រះរឿងអពមង្គល និងប្រសិទ្ធពរជ័យសិរីសួស្តីដល់គូស្វាមីភរិយាថ្មី។',
      englishDesc: 'Symbolic cleansing and theatrical comedic blessings by parents and elders.',
      iconType: 'haircut',
    },
    {
      id: '3',
      time: '១០:៣០ ព្រឹក (10:30 AM)',
      khmerTitle: 'ពិធីសំពះផ្ទឹម ចងដៃ & បង្វិលពពិល',
      englishTitle: 'Sompeah Phtim (Knot-Tying & Passing of Blessings)',
      khmerDesc: 'ពិធីចងអំបោះក្រហមសូត្រលើកដៃ និងបង្វិលពពិល ៧ ជុំ ដើម្បីទទួលពរជ័យពីមាតាបិតា និងចាស់ទុំ។',
      englishDesc: 'The sacred red-thread wrist-tying ceremony and sacred candle rotation.',
      iconType: 'tying',
    },
    {
      id: '4',
      time: '០៥:០០ ល្ងាច (05:00 PM)',
      khmerTitle: 'ពិធីពិសាភោជនាហារ និងរាំកម្សាន្ត',
      englishTitle: 'Wedding Banquet Dinner & Evening Reception',
      khmerDesc: 'សូមគោរពអញ្ជើញភ្ញៀវកិត្តិយសទាំងអស់ ពិសាភោជនាហារ និងចូលរួមរាំកម្សាន្តអបអរសាទរ។',
      englishDesc: 'Honored guests are cordially invited to enjoy the formal banquet, toasts, and music celebration.',
      iconType: 'banquet',
    },
  ],
};

export const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'w-1',
    guestName: 'លោកពូ សុខជា និងក្រុមគ្រួសារ',
    attendance: 'attending',
    guestCount: 2,
    message: 'សូមជូនពរក្មួយទាំងពីរ ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង រកស៊ីមានបាន ត្រជាក់ត្រជុំដូចទឹកអង្គរ!',
    createdAt: '2 ម៉ោងមុន',
  },
  {
    id: 'w-2',
    guestName: 'សេង វិបុល (មិត្តភក្តិវិទ្យាល័យ)',
    attendance: 'attending',
    guestCount: 1,
    message: 'Happy Wedding my friend! សូមឱ្យជីវិតអាពាហ៍ពិពាហ៍ពោរពេញដោយស្នាមញញឹម និងសុភមង្គលគ្រប់វេលា។',
    createdAt: '5 ម៉ោងមុន',
  },
  {
    id: 'w-3',
    guestName: 'អ្នកមីង ចិន្តា',
    attendance: 'attending',
    guestCount: 2,
    message: 'សិរីសួស្តី ជ័យមង្គល វិបុលសុខ កើតមានដល់ក្មួយទាំងពីរក្នុងថ្ងៃមង្គលដ៏ឧត្តុង្គឧត្តមនេះ!',
    createdAt: 'ម្សិលមិញ',
  },
];
