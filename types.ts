
export interface PrayerTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
  Sunset: string;
  Imsak: string;
  Midnight: string;
}

export interface DateInfo {
  readable: string;
  timestamp: string;
  gregorian: {
    date: string;
    day: string;
    month: { number: number; en: string };
    year: string;
  };
  hijri: {
    date: string;
    day: string;
    month: { number: number; en: string; ar: string };
    year: string;
  };
}

export interface PrayerData {
  timings: PrayerTimings;
  date: DateInfo;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  url?: string;
  mrp?: string;
  savings?: string;
}
