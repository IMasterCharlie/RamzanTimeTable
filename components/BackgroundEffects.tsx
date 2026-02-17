
import React, { useMemo } from 'react';
// @ts-ignore
import { motion as motionBase } from 'framer-motion';

// Casting motion to any to fix environment-specific type errors
const motion = motionBase as any;

export const BackgroundEffects: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Dynamic Main Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#0b1120] to-[#1e1b4b] opacity-90"></div>
      
      {/* Soft Glow Overlays */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-amber-900/5 blur-[150px] rounded-full"></div>
      
      {/* Subtle Islamic Geometric Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ 
          backgroundImage: `url('https://www.transparenttextures.com/patterns/black-orchid.png')`,
          backgroundSize: '400px'
        }}
      ></div>

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Floating Light Particles */}
      {particles.map((p) => (
        /* Fix: Property 'initial' not found on motion.div */
        <motion.div
          key={p.id}
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: [-20, -100], 
            opacity: [0, 0.4, 0],
            x: [0, Math.random() * 20 - 10]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 5
          }}
          className="absolute rounded-full bg-amber-300/30 blur-[2px]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: p.top,
            left: p.left,
          }}
        />
      ))}
    </div>
  );
};
