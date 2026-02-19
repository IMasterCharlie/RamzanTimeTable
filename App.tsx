
import React, { useState, useEffect } from 'react';
// @ts-ignore
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { Timetable } from './components/Timetable';
import { Offers } from './components/Offers';
import { DuaBook } from './components/DuaBook';
import { Navbar } from './components/Navbar';
import { BackgroundEffects } from './components/BackgroundEffects';

const motion = motionBase as any;

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState<'home' | 'book'>('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // Custom slow scroll function with easing
  const smoothScrollTo = (targetY: number, duration: number) => {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + difference * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // Auto-scroll to prayer timings section after showing hero for 5.5 seconds
  useEffect(() => {
    if (view === 'home') {
      const autoScrollTimer = setTimeout(() => {
        const timetableSection = document.getElementById('timetable');
        if (timetableSection) {
          const targetY = timetableSection.offsetTop - 80; // Account for navbar
          smoothScrollTo(targetY, 2000); // 2 second scroll duration
        }
      }, 5500); // 5.5 seconds delay

      return () => clearTimeout(autoScrollTimer);
    }
  }, [view]);

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans selection:bg-amber-500/30">
      <BackgroundEffects />


      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            <Navbar isScrolled={isScrolled} setView={setView} />

            <main className="relative z-10">
              <section id="home">
                <Hero onOpenDuas={() => setView('book')} />
              </section>

              <section id="timetable" className="py-4 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-4"
                  >
                    <h2 className="text-4xl md:text-5xl font-cinzel text-amber-400 mb-4 uppercase tracking-widest">Ramzan Timings</h2>
                  </motion.div>
                  <Timetable />
                </div>
              </section>

              <section id="offers" className="py-4 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                  >
                    <h2 className="text-4xl md:text-5xl font-cinzel text-amber-400 mb-4 uppercase tracking-widest">Ramadan Collection</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                      Premium skincare and organic essentials for your Ramadan journey.
                    </p>
                  </motion.div>
                  <Offers />
                </div>
              </section>
            </main>

            <footer className="relative z-10 py-12 px-8 border-t border-slate-800 bg-[#020617]">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                  <h3 className="font-cinzel text-xl text-amber-400 mb-2">AL-HUDA Cosmetics</h3>
                  <p className="text-slate-500 text-sm">© 2026. All Rights Reserved.</p>
                </div>

                <div className="text-center md:text-right space-y-2">
                  <div className="flex flex-col items-center md:items-end gap-1">
                    <a
                      href="https://wa.me/919032372136"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-bold text-sm bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                      </svg>
                      <span>+91 90323 72136</span>
                    </a>
                    <div className="flex flex-col md:items-end text-xs text-slate-500 mt-2">
                      <p>Owned by <span className="text-amber-500 font-bold">Abdul Hakeem</span> <span className="text-slate-600">· 90323 72136</span></p>
                      <p>Developed by <span className="text-slate-400">Mohammed Mehraj</span> <span className="text-slate-600">· 83096 64356</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="book-view"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <DuaBook onBack={() => setView('home')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
