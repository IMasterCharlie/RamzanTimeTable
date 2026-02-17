
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore
import { motion, AnimatePresence } from 'framer-motion';

export const BackgroundAudio: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initial setup - try to play if user creates interaction, but usually auto-play is blocked
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;
            audio.loop = true;
        }

        // Cleanup
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <audio ref={audioRef} src="/ramadan.mp3" />

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all ${isPlaying ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-900/80 text-slate-500'
                    }`}
            >
                {isPlaying ? (
                    <div className="flex gap-1 items-end h-4">
                        <motion.div
                            animate={{ height: [4, 16, 8, 16, 4] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-1 bg-amber-400 rounded-full"
                        />
                        <motion.div
                            animate={{ height: [8, 4, 16, 4, 8] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            className="w-1 bg-amber-400 rounded-full"
                        />
                        <motion.div
                            animate={{ height: [12, 8, 4, 16, 12] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-1 bg-amber-400 rounded-full"
                        />
                    </div>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
                        <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
                        <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 8.025 8a3.49 3.49 0 0 1-1.025 2.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
                        <path d="M10.66 8.706l-1.414-1.415 1.414-1.414-1.414 1.414z" opacity="0" />
                        <rect x="0" y="0" width="16" height="16" fill="none" />
                        <line x1="1" y1="15" x2="15" y2="1" stroke="currentColor" strokeWidth="2" className={isPlaying ? "hidden" : "block"} />
                    </svg>
                )}
            </motion.button>
        </div>
    );
};
