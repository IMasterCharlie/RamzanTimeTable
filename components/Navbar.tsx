
import React, { useState } from 'react';

// @ts-ignore
import { motion as motionBase, AnimatePresence } from 'framer-motion';

// Casting motion to any to fix type issues with motion components
const motion = motionBase as any;

interface NavbarProps {
  isScrolled: boolean;
  setView?: (view: 'home' | 'book') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showGreetingModal, setShowGreetingModal] = useState(false);

  const greetingMessage = "🌙 Ramadan Mubarak! May this holy month bring you peace, prosperity, and spiritual growth. May your fasts be accepted and your prayers answered. رمضان مبارك 🤲";

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (setView) setView('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBookClick = () => {
    setIsMobileMenuOpen(false);
    setView?.('book');
  };

  const handleSendGreeting = () => {
    setIsMobileMenuOpen(false);
    setShowGreetingModal(true);
  };

  const shareViaWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(greetingMessage)}`;
    window.open(url, '_blank');
  };

  const shareViaTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(greetingMessage)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(greetingMessage);
      alert('Greeting copied to clipboard! 🌙');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${isScrolled ? 'glass-morphism py-3 shadow-lg' : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
            <img src="/AL-HUDA.jpeg" alt="Logo" width={50} height={50} className="rounded-lg" />
            <span className="font-cinzel font-bold text-xl tracking-wider text-amber-400">
              AL-HUDA
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink label="Home" onClick={() => scrollTo('home')} />
            <NavLink label="Timetable" onClick={() => scrollTo('timetable')} />
            <NavLink label="Duas" onClick={() => setView?.('book')} />
            <NavLink label="Collection" onClick={() => scrollTo('offers')} />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(251, 191, 36, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendGreeting}
              className="px-6 py-2 rounded-full bg-amber-500 text-slate-950 font-semibold text-sm transition-all"
            >
              Send Greetings
            </motion.button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-amber-400 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <img src="/AL-HUDA.jpeg" alt="Logo" width={50} height={50} className="rounded-lg" />
                <span className="font-cinzel font-bold text-xl tracking-wider text-amber-400">
                  AL-HUDA
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-amber-400 p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-8">
              <MobileNavLink label="Home" onClick={() => scrollTo('home')} />
              <MobileNavLink label="Timetable" onClick={() => scrollTo('timetable')} />
              <MobileNavLink label="Duas" onClick={handleBookClick} />
              <MobileNavLink label="Collection" onClick={() => scrollTo('offers')} />

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSendGreeting}
                className="mt-4 px-6 py-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-lg uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                Send Greetings
              </motion.button>
            </div>

            <div className="mt-auto text-center">
              <p className="font-amiri text-amber-500/60 italic text-xl">رمضان مبارك</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting Modal */}
      <AnimatePresence>
        {showGreetingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setShowGreetingModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="bg-slate-900 border border-amber-500/20 rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <span className="text-5xl mb-4 block">🌙</span>
                <h3 className="text-2xl font-cinzel font-bold text-amber-400 mb-2">Send Ramadan Greetings</h3>
                <p className="text-slate-400 text-sm">Share blessings with your loved ones</p>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700">
                <p className="text-slate-300 text-sm leading-relaxed">{greetingMessage}</p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={shareViaWhatsApp}
                  className="w-full py-3 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold flex items-center justify-center gap-3 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                  </svg>
                  Share via WhatsApp
                </button>

                <button
                  onClick={shareViaTwitter}
                  className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold flex items-center justify-center gap-3 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                  Share on X (Twitter)
                </button>

                <button
                  onClick={copyToClipboard}
                  className="w-full py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center gap-3 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                  </svg>
                  Copy to Clipboard
                </button>
              </div>

              <button
                onClick={() => setShowGreetingModal(false)}
                className="mt-6 w-full py-2 text-slate-500 hover:text-amber-400 text-sm font-bold uppercase tracking-widest transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="text-slate-300 hover:text-amber-400 font-medium transition-colors relative group uppercase text-[10px] tracking-[0.2em] font-bold"
  >
    {label}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full"></span>
  </button>
);

const MobileNavLink: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="text-left text-3xl font-cinzel font-bold text-slate-100 hover:text-amber-400 transition-colors py-2 border-b border-white/5"
  >
    {label}
  </button>
);
