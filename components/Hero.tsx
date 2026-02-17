
import React, { useState, useEffect } from 'react';
// @ts-ignore
import { motion as motionBase } from 'framer-motion';

// Casting motion to any to fix environment-specific type errors
const motion = motionBase as any;

// Ramadan 2026 starts on February 17, 2026
const RAMADAN_2026_START = new Date(2026, 1, 17, 0, 0, 0); // Month is 0-indexed

export const Hero: React.FC<{ onOpenDuas: () => void }> = ({ onOpenDuas }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRamadan: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = RAMADAN_2026_START.getTime() - now.getTime();

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isRamadan: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds, isRamadan: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);
  const ramzan = "Ramzan".split("");
  const mubarak = "Mubarak".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Decorative Scene Elements */}
      <div className="absolute inset-0 z-0">

        {/* Cinematic Realistic Crescent Moon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -50, y: -50, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[8%] left-[5%] md:top-[10%] md:left-[12%] pointer-events-none select-none"
        >
          <div className="relative w-56 h-56 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-amber-200/5 blur-[100px] rounded-full scale-150"></div>
            <div className="absolute inset-0 bg-amber-100/10 blur-[40px] rounded-full scale-110 animate-pulse" style={{ animationDuration: '4s' }}></div>

            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <radialGradient id="moonBody" cx="35%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#FFFDF5" />
                  <stop offset="60%" stopColor="#FDE68A" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0.8" />
                </radialGradient>
                <radialGradient id="earthshine" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
                <filter id="craterNoise" x="0" y="0" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 0.5" />
                  <feComposite operator="in" in2="SourceGraphic" />
                </filter>
                <mask id="crescentMask">
                  <rect width="100" height="100" fill="black" />
                  <circle cx="50" cy="50" r="40" fill="white" />
                  <circle cx="62" cy="46" r="38" fill="black" />
                </mask>
              </defs>
              <circle cx="50" cy="50" r="40" fill="url(#earthshine)" opacity="0.4" />
              <circle cx="50" cy="50" r="40" fill="url(#moonBody)" mask="url(#crescentMask)" />
              <circle cx="50" cy="50" r="40" fill="white" opacity="0.07" filter="url(#craterNoise)" mask="url(#crescentMask)" />
              <path d="M17 31.5 A 40 40 0 0 0 17 68.5" stroke="white" strokeWidth="0.4" strokeLinecap="round" opacity="0.8" filter="blur(0.5px)" />
            </svg>
          </div>
        </motion.div>

        {/* Hanging Lanterns */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-10 md:px-32 pointer-events-none">
          <div className="flex gap-8 md:gap-16">
            <Lantern size="w-16" stringHeight="h-48" delay={0.2} />
            <Lantern size="w-12" stringHeight="h-72" delay={0.7} className="opacity-70" />
          </div>
          <div className="flex gap-8 md:gap-16">
            <Lantern size="w-14" stringHeight="h-64" delay={0.9} className="hidden lg:flex" />
            <Lantern size="w-12" stringHeight="h-40" delay={1.3} className="opacity-60" />
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="perspective-1000"
        >
          <motion.h2
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 0.8, letterSpacing: '0.2em' }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="font-amiri text-4xl md:text-5xl text-white mb-6 italic"
          >
            رمضان مبارك
          </motion.h2>

          <h1 className="font-cinzel text-6xl sm:text-7xl md:text-9xl font-bold text-white mb-8 relative inline-flex flex-wrap justify-center gap-x-6 md:gap-x-10">
            {/* Animated Word: Ramzan */}
            <span className="flex">
              {ramzan.map((char, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  className="inline-block hover:text-amber-300 transition-colors cursor-default"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Animated Word: Mubarak */}
            <span className="flex text-amber-400">
              {mubarak.map((char, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  className="inline-block shimmer-text hover:text-white transition-colors cursor-default"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Cinematic Glow Underneath Text */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.15, scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute -bottom-4 left-0 right-0 h-12 bg-amber-500/30 blur-[60px] rounded-full"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="text-lg md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed mb-8"
          >
            May this holy month bring you peace, prosperity, and spiritual growth.
            Embrace the blessings of the night and the serenity of prayer.
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.3 }}
            className="mb-12"
          >
            {countdown.isRamadan ? (
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-cinzel text-amber-400 animate-pulse">
                  ✨ Ramadan Mubarak! ✨
                </p>
                <p className="text-slate-400 mt-2">The blessed month has begun</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-amber-500/70 font-bold mb-4">
                  Countdown to Ramadan 2026
                </p>
                <div className="flex gap-3 md:gap-6">
                  <CountdownBox value={countdown.days} label="Days" />
                  <CountdownBox value={countdown.hours} label="Hours" />
                  <CountdownBox value={countdown.minutes} label="Minutes" />
                  <CountdownBox value={countdown.seconds} label="Seconds" />
                </div>
                <p className="text-slate-500 text-sm mt-4">February 17, 2026</p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245,158,11,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-amber-500 text-slate-950 rounded-full font-bold text-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
              onClick={() => document.getElementById('timetable')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ramadan Schedule
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-transparent border-2 border-amber-500/50 text-amber-400 rounded-full font-bold text-xl transition-all flex items-center gap-3"
              onClick={onOpenDuas}
            >
              <span>Explore Duas</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-indigo-950/40 to-transparent pointer-events-none"></div>

      <style>{`
        .shimmer-text {
          background: linear-gradient(
            to right,
            #FCD34D 0%,
            #FBBF24 40%,
            #FFF 50%,
            #FBBF24 60%,
            #FCD34D 100%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        @keyframes shimmer {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
};

interface LanternProps {
  size: string;
  delay: number;
  stringHeight: string;
  className?: string;
}

const Lantern: React.FC<LanternProps> = ({ size, delay, stringHeight, className = '' }) => (
  <motion.div
    initial={{ y: -600 }}
    animate={{ y: 0 }}
    transition={{ type: 'spring', damping: 25, stiffness: 60, delay }}
    className={`flex flex-col items-center animate-swing ${className}`}
    style={{ transformOrigin: 'top center' }}
  >
    <div className={`w-[1px] ${stringHeight} bg-gradient-to-b from-transparent via-amber-800/40 to-amber-700/60`}></div>

    <div className={`relative ${size} aspect-[2/3] glow-pulse -mt-0.5`}>
      <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]">
        <circle cx="50" cy="10" r="5" stroke="#F59E0B" strokeWidth="2" />
        <path d="M30 35 L50 15 L70 35 H30Z" fill="#B45309" stroke="#F59E0B" strokeWidth="2" />
        <path d="M20 35 H80 L90 80 L80 125 H20 L10 80 L20 35Z" fill="rgba(245, 158, 11, 0.25)" stroke="#F59E0B" strokeWidth="2" />
        <path d="M50 35 V125 M10 80 H90" stroke="#F59E0B" strokeWidth="1" opacity="0.4" />
        <rect x="42" y="65" width="16" height="35" rx="4" fill="#FBBF24" className="animate-pulse opacity-90" />
        <path d="M25 125 H75 L70 140 H30 L25 125Z" fill="#B45309" stroke="#F59E0B" strokeWidth="2" />
      </svg>
    </div>
  </motion.div>
);

// Countdown Box Component
const CountdownBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl glass-morphism border border-amber-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.15)]">
      <span className="text-2xl md:text-4xl font-cinzel font-bold text-amber-400">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 mt-2 font-bold">{label}</span>
  </div>
);
