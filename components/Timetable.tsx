
import React, { useState, useEffect } from 'react';
// @ts-ignore
import { motion as motionBase, AnimatePresence } from 'framer-motion';

const motion = motionBase as any;

// Ramadan 2026 dates
const RAMADAN_2026_START = new Date(2026, 1, 17); // February 17, 2026

interface DayTiming {
  day: number;
  date: string;
  weekday: string;
  sehri: string;
  iftar: string;
}

interface LocationInfo {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

// Elegant SVG Icons
const Icons = {
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
  ),
  Sunset: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10V2" /><path d="m4.93 10.93 1.41 1.41" /><path d="M2 18h2" /><path d="M20 18h2" /><path d="m19.07 10.93-1.41 1.41" /><path d="M22 22H2" /><path d="m16 6-4 4-4-4" /><path d="M16 18a4 4 0 0 0-8 0" /></svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
  ),
  Loading: () => (
    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
  ),
};

// Add minutes to a 24-hour time string
const addMinutesToTime = (time24: string, minutesToAdd: number): string => {
  if (!time24 || time24 === '--:--') return time24;
  const [hours, minutes] = time24.split(':').map(Number);
  let totalMinutes = hours * 60 + minutes + minutesToAdd;

  // Handle day overflow/underflow
  if (totalMinutes < 0) totalMinutes += 24 * 60;
  if (totalMinutes >= 24 * 60) totalMinutes -= 24 * 60;

  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
};

// Convert 24-hour time to 12-hour format
const convertTo12Hour = (time24: string): string => {
  if (!time24 || time24 === '--:--') return '--:--';
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
};

// Fetch prayer times for a specific date and location from Aladhan API
const fetchPrayerTimesForDate = async (lat: number, lon: number, date: Date): Promise<{ sehri: string; iftar: string } | null> => {
  try {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lon}&method=2`
    );
    const data = await response.json();

    if (data.code === 200) {
      const fajr24 = data.data.timings.Fajr.replace(' (IST)', '').replace(' (PKT)', '').split(' ')[0];
      const maghrib24 = data.data.timings.Maghrib.replace(' (IST)', '').replace(' (PKT)', '').split(' ')[0];

      // Apply hardcoded adjustments: -20 minutes for Sehri, +5 minutes for Iftar
      const adjustedFajr = addMinutesToTime(fajr24, -20);
      const adjustedMaghrib = addMinutesToTime(maghrib24, 5);

      return {
        sehri: convertTo12Hour(adjustedFajr),
        iftar: convertTo12Hour(adjustedMaghrib),
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
};

// Fetch 30 days of Ramadan timings
const fetch30DayTimings = async (lat: number, lon: number): Promise<DayTiming[]> => {
  const timings: DayTiming[] = [];

  // Fetch all 30 days in parallel for speed
  const promises = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(RAMADAN_2026_START);
    date.setDate(RAMADAN_2026_START.getDate() + i);
    promises.push(fetchPrayerTimesForDate(lat, lon, date));
  }

  const results = await Promise.all(promises);

  for (let i = 0; i < 30; i++) {
    const date = new Date(RAMADAN_2026_START);
    date.setDate(RAMADAN_2026_START.getDate() + i);

    const timing = results[i];
    timings.push({
      day: i + 1,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
      sehri: timing?.sehri || '--:--',
      iftar: timing?.iftar || '--:--',
    });
  }

  return timings;
};

// Get city name from coordinates using reverse geocoding
const getCityFromCoords = async (lat: number, lon: number): Promise<{ city: string; country: string }> => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    const data = await response.json();
    return {
      city: data.city || data.locality || data.principalSubdivision || 'Your Location',
      country: data.countryName || '',
    };
  } catch (error) {
    return { city: 'Your Location', country: '' };
  }
};

export const Timetable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadingTimings, setLoadingTimings] = useState(false);
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [timings, setTimings] = useState<DayTiming[]>([]);
  const [todayData, setTodayData] = useState<DayTiming | null>(null);
  const [todaysActualTiming, setTodaysActualTiming] = useState<{ sehri: string; iftar: string; date: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Get user's location and fetch timings
  useEffect(() => {
    const initLocation = async () => {
      setLoading(true);
      setError(null);

      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Get city name
          const cityInfo = await getCityFromCoords(latitude, longitude);
          setLocation({
            latitude,
            longitude,
            city: cityInfo.city,
            country: cityInfo.country,
          });

          // Fetch TODAY's actual prayer times
          const today = new Date();
          const todayTiming = await fetchPrayerTimesForDate(latitude, longitude, today);
          if (todayTiming) {
            setTodaysActualTiming({
              sehri: todayTiming.sehri,
              iftar: todayTiming.iftar,
              date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            });
          }

          // Fetch 30-day Ramadan timings
          setLoadingTimings(true);
          const fetchedTimings = await fetch30DayTimings(latitude, longitude);
          setTimings(fetchedTimings);
          setTodayData(fetchedTimings[0]);
          setLoadingTimings(false);
          setLoading(false);
        },
        async (err) => {
          console.error('Geolocation error:', err);

          // Check if permission was denied
          if (err.code === err.PERMISSION_DENIED) {
            setLocationDenied(true);
            setShowModal(true);
          }

          // Fallback to Hyderabad coordinates
          const defaultLat = 17.3850;
          const defaultLon = 78.4867;

          setLocation({
            latitude: defaultLat,
            longitude: defaultLon,
            city: 'Hyderabad',
            country: 'India',
          });

          // Fetch TODAY's actual prayer times for fallback location
          const today = new Date();
          const todayTiming = await fetchPrayerTimesForDate(defaultLat, defaultLon, today);
          if (todayTiming) {
            setTodaysActualTiming({
              sehri: todayTiming.sehri,
              iftar: todayTiming.iftar,
              date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            });
          }

          setLoadingTimings(true);
          const fetchedTimings = await fetch30DayTimings(defaultLat, defaultLon);
          setTimings(fetchedTimings);
          setTodayData(fetchedTimings[0]);
          setLoadingTimings(false);
          setLoading(false);
        },
        { timeout: 10000, enableHighAccuracy: false }
      );
    };

    initLocation();
  }, []);

  // Refresh location
  const refreshLocation = () => {
    setLoading(true);
    setTimings([]);
    setTodayData(null);
    setTodaysActualTiming(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const cityInfo = await getCityFromCoords(latitude, longitude);
        setLocation({
          latitude,
          longitude,
          city: cityInfo.city,
          country: cityInfo.country,
        });

        // Fetch TODAY's actual prayer times
        const today = new Date();
        const todayTiming = await fetchPrayerTimesForDate(latitude, longitude, today);
        if (todayTiming) {
          setTodaysActualTiming({
            sehri: todayTiming.sehri,
            iftar: todayTiming.iftar,
            date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          });
        }

        setLoadingTimings(true);
        const fetchedTimings = await fetch30DayTimings(latitude, longitude);
        setTimings(fetchedTimings);
        setTodayData(fetchedTimings[0]);
        setLoadingTimings(false);
        setLoading(false);
      },
      () => setLoading(false),
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Retry location permission request
  const retryLocationPermission = () => {
    setShowModal(false);
    setLocationDenied(false);
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const cityInfo = await getCityFromCoords(latitude, longitude);
        setLocation({
          latitude,
          longitude,
          city: cityInfo.city,
          country: cityInfo.country,
        });

        // Fetch TODAY's actual prayer times
        const today = new Date();
        const todayTiming = await fetchPrayerTimesForDate(latitude, longitude, today);
        if (todayTiming) {
          setTodaysActualTiming({
            sehri: todayTiming.sehri,
            iftar: todayTiming.iftar,
            date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          });
        }

        setLoadingTimings(true);
        const fetchedTimings = await fetch30DayTimings(latitude, longitude);
        setTimings(fetchedTimings);
        setTodayData(fetchedTimings[0]);
        setLoadingTimings(false);
        setLoading(false);
      },
      async (err) => {
        console.error('Geolocation retry error:', err);

        // If denied again, show modal again
        if (err.code === err.PERMISSION_DENIED) {
          setLocationDenied(true);
          setShowModal(true);
        }

        // Fallback to Hyderabad coordinates
        const defaultLat = 17.3850;
        const defaultLon = 78.4867;

        setLocation({
          latitude: defaultLat,
          longitude: defaultLon,
          city: 'Hyderabad',
          country: 'India',
        });

        const today = new Date();
        const todayTiming = await fetchPrayerTimesForDate(defaultLat, defaultLon, today);
        if (todayTiming) {
          setTodaysActualTiming({
            sehri: todayTiming.sehri,
            iftar: todayTiming.iftar,
            date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          });
        }

        setLoadingTimings(true);
        const fetchedTimings = await fetch30DayTimings(defaultLat, defaultLon);
        setTimings(fetchedTimings);
        setTodayData(fetchedTimings[0]);
        setLoadingTimings(false);
        setLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 flex flex-col items-center justify-center py-20"
      >
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 border-4 border-amber-500/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-amber-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-amber-400 font-cinzel tracking-[0.3em] uppercase text-sm animate-pulse">
          Detecting Your Location...
        </p>
        <p className="text-slate-500 text-sm mt-2">Fetching prayer times for your area</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="relative z-10"
    >
      {/* Location Permission Denied Modal */}
      <AnimatePresence>
        {showModal && locationDenied && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-amber-500/30 p-8 shadow-2xl"
            >
              {/* Warning Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-amber-500/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
              </div>

              {/* Modal Content */}
              <h3 className="text-2xl font-cinzel font-bold text-white text-center mb-4">
                Location Permission Denied
              </h3>

              <p className="text-slate-300 text-center mb-6 leading-relaxed">
                Without your location, we're showing prayer times for <span className="text-amber-400 font-bold">Hyderabad, India</span>.
                These timings may not be accurate for your area.
              </p>

              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-6">
                <p className="text-amber-400 text-sm text-center font-semibold">
                  ⚠️ To get accurate prayer times for your location, please enable location access in your browser settings.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={retryLocationPermission}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg hover:shadow-amber-500/50"
                >
                  Enable Location & Reload
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-all border border-slate-600"
                >
                  Continue with Hyderabad Timings
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Location Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 px-2">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-2xl font-cinzel text-white flex items-center gap-3">
            <span className="text-amber-400"><Icons.MapPin /></span>
            {location?.city || 'Your Location'}
            {location?.country && <span className="text-slate-500 text-lg font-normal">, {location.country}</span>}
          </h3>
          <p className="text-slate-400 mt-1 font-medium tracking-wide">
            Ramzan 2026 (Feb 17 - Mar 18) • <span className="text-amber-500/80">30 Days Timetable</span>
          </p>
          {location && (
            <p className="text-slate-600 text-xs mt-1 flex items-center gap-1">
              <Icons.Globe />
              {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
            </p>
          )}
        </div>

        <button
          onClick={refreshLocation}
          disabled={loadingTimings}
          className="flex items-center gap-2 bg-slate-900/40 border border-slate-800 rounded-2xl px-6 py-3 hover:border-amber-500/30 transition-all disabled:opacity-50"
        >
          {loadingTimings ? (
            <Icons.Loading />
          ) : (
            <Icons.MapPin />
          )}
          <span className="text-amber-400 font-bold text-sm">
            {loadingTimings ? 'Loading...' : 'Refresh Location'}
          </span>
        </button>
      </div>

      {/* Today's Sehri & Iftar Combined Card */}
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" }}
        className="relative overflow-hidden rounded-[2rem] p-6 md:p-8 border transition-all duration-500 border-amber-500/20 bg-gradient-to-br from-indigo-950/30 via-slate-900/50 to-amber-950/30 mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 relative z-10">
          {/* Sehri Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:pr-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shadow-inner">
                <Icons.Moon />
              </div>
              <p className="text-slate-400 font-cinzel text-xs uppercase tracking-[0.3em] font-bold">Today's Sehri</p>
            </div>
            <span className="text-4xl md:text-5xl font-cinzel font-bold tracking-tighter text-indigo-300 mb-2">
              {todaysActualTiming?.sehri || '--:--'}
            </span>
            {/* Sehri Dua */}
            <div className="mt-4 pt-4 border-t border-indigo-500/20 w-full">
              <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-400/60 font-bold mb-2">Dua for Sehri</p>
              <p className="font-amiri text-base md:text-lg text-indigo-200/90 leading-relaxed text-right dir-rtl">
                نَوَيْتُ أَنْ أَصُومَ غَدًا لِلّٰهِ تَعَالَى مِنْ صَوْمِ رَمَضَانَ
              </p>
            </div>
          </div>

          {/* Vertical Divider (Desktop) / Horizontal Divider (Mobile) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-indigo-500/30 via-amber-500/50 to-amber-500/30"></div>
          <div className="md:hidden w-full h-px bg-gradient-to-r from-indigo-500/30 via-amber-500/50 to-amber-500/30"></div>

          {/* Iftar Section */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right md:pl-8">
            <div className="flex items-center gap-3 mb-3">
              <p className="text-slate-400 font-cinzel text-xs uppercase tracking-[0.3em] font-bold">Today's Iftar</p>
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shadow-inner">
                <Icons.Sunset />
              </div>
            </div>
            <span className="text-4xl md:text-5xl font-cinzel font-bold tracking-tighter text-amber-400 mb-2">
              {todaysActualTiming?.iftar || '--:--'}
            </span>
            {/* Iftar Dua */}
            <div className="mt-4 pt-4 border-t border-amber-500/20 w-full">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/60 font-bold mb-2 text-right">Dua for Iftar</p>
              <p className="font-amiri text-base md:text-lg text-amber-200/90 leading-relaxed text-right dir-rtl">
                اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَىٰ رِزْقِكَ أَفْطَرْتُ
              </p>
            </div>
          </div>
        </div>

        {/* Date Footer */}
        <div className="text-center mt-6 pt-4 border-t border-slate-700/50">
          <p className="text-slate-500 text-sm">{todaysActualTiming?.date || 'Loading...'}</p>
        </div>

        {/* Decorative Watermarks */}
        <div className="absolute -left-4 -bottom-6 text-8xl opacity-[0.02] select-none font-bold italic font-amiri pointer-events-none">
          سحور
        </div>
        <div className="absolute -right-4 -bottom-6 text-8xl opacity-[0.02] select-none font-bold italic font-amiri pointer-events-none">
          إفطار
        </div>
      </motion.div>



      {/* AL-HUDA Brand Advertisement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        className="mb-12 relative overflow-hidden rounded-[2rem] border border-amber-500/30 bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 group cursor-pointer"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>

        <div className="relative z-10 p-8 md:p-10 flex flex-col items-center justify-center gap-6">
          <div className="text-center max-w-xl mx-auto">

            <div className="relative inline-block mb-4">
              <h3 className="text-3xl md:text-4xl font-cinzel font-bold text-center text-white relative z-10">
                AL-HUDA <span className="text-amber-500">COSMETICS</span>
              </h3>
              <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
            </div>
            <p className="text-slate-300 mb-6 text-lg text-center">Skin Care - Hair Care</p>
            <p className="text-slate-300 mb-6 text-lg text-center">
              100% Original and Multi Brand Cosmetic ,<span className="text-amber-500">Skin and Hair Care</span> Products Trusted Quality Genuine Care.
            </p>
            <button className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] mx-auto block">
              Discover Products
            </button>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-amber-500/20 bg-amber-500/10 flex items-center justify-center p-6 backdrop-blur-sm">
              <span className="font-cinzel text-5xl font-bold text-amber-500">AH</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 30 Days Timetable */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-morphism rounded-3xl p-6 md:p-8 border border-slate-800/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Icons.Calendar />
          </div>
          <div>
            <h3 className="text-xl font-cinzel font-bold text-white">30 Days Ramzan Timetable</h3>
            <p className="text-slate-500 text-sm">
              {location?.city}{location?.country ? `, ${location.country}` : ''}
            </p>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-5 gap-2 md:gap-4 mb-4 px-2 md:px-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Day</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:block">Weekday</div>
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider text-center">Sehri</div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider text-center">Iftar</div>
        </div>

        {/* Scrollable Table Body */}
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar space-y-2">
          {timings.length > 0 ? (
            timings.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ backgroundColor: 'rgba(251, 191, 36, 0.05)' }}
                className={`grid grid-cols-5 gap-2 md:gap-4 px-2 md:px-4 py-3 rounded-xl transition-all ${index === 0 ? 'bg-amber-500/10 border border-amber-500/20' : 'hover:bg-slate-800/30'
                  }`}
              >
                <div className="flex items-center">
                  <span className={`font-cinzel font-bold ${index === 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                    {day.day}
                  </span>
                  {index === 0 && (
                    <span className="ml-2 text-[8px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-full font-bold uppercase">Day 1</span>
                  )}
                </div>
                <div className="text-slate-300 text-sm font-medium">{day.date}</div>
                <div className="text-slate-500 text-sm hidden md:block">{day.weekday}</div>
                <div className="text-center">
                  <span className="font-cinzel font-bold text-indigo-300">{day.sehri}</span>
                </div>
                <div className="text-center">
                  <span className="font-cinzel font-bold text-amber-400">{day.iftar}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-500">
              <Icons.Loading />
              <p className="mt-4">Loading timings...</p>
            </div>
          )}

          {/* Eid Greeting Row */}
          {timings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-4 relative overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 p-6 text-center group"
            >
              <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                <span className="text-3xl mb-1">🌙</span>
                <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-amber-400">Eid Mubarak!</h3>
                <p className="font-amiri text-xl text-amber-500/80">تَقَبَّلَ اللهُ مِنَّا وَمِنكُم</p>
                <p className="text-slate-400 text-sm mt-1">May Allah accept good deeds from us and for you</p>
              </div>

              {/* Decorative Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:animate-shimmer" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Footer Note */}
      <div className="flex justify-center mt-8">
        <div className="inline-flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-full px-8 py-3 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            Powered by Aladhan API • Times based on your GPS location
          </span>
        </div>
      </div>
    </motion.div >
  );
};
