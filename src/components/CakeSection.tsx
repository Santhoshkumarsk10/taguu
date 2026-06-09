"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CakeSectionProps {
  onReplay?: () => void;
}

export default function CakeSection({ onReplay }: CakeSectionProps) {
  // Birthday cake candles state
  const [extinguishedCandles, setExtinguishedCandles] = useState<boolean[]>([false, false, false]);

  const extinguishCandle = (idx: number) => {
    if (extinguishedCandles[idx]) return;

    const next = [...extinguishedCandles];
    next[idx] = true;
    setExtinguishedCandles(next);

    // Tiny flame puff
    confetti({
      particleCount: 15,
      spread: 20,
      origin: { y: 0.7 },
      colors: ["#ff7f00", "#ffdf7a"]
    });

    // Check if all blown out
    if (next.every(c => c)) {
      setTimeout(() => {
        // Grand finale burst!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#4f772d", "#d4af37", "#d85c83", "#2d2d2d"]
        });
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center relative min-h-[500px]">
      
      {/* Floating red hearts and stars in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-500/10 select-none text-2xl"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%",
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: "-10%",
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            ❤️
          </motion.div>
        ))}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-500/10 select-none text-xl"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%",
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: "-10%",
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 8 + Math.random() * 8, 
              repeat: Infinity, 
              delay: Math.random() * 8,
              ease: "linear"
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full flex flex-col items-center gap-12 relative z-10"
      >
        {/* Celebration Wish Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[750px] bg-gradient-to-b from-[#fdfdfb] to-[#f8f6f0] border border-emerald-800/10 p-8 md:p-12 rounded-3xl text-center shadow-[0_20px_50px_rgba(74,99,76,0.08),4px_4px_0px_#4f772d] relative overflow-hidden"
        >
          <h2 className="font-serif-custom text-4xl md:text-5xl text-[#2b3a2f] font-extrabold mb-6 tracking-wide">
            Happy Birthday Priya Harshana 🐼🎂
          </h2>

          <p className="text-[#3d4d3d] text-base md:text-lg leading-relaxed max-w-[620px] mx-auto mb-10 font-medium">
            Wishing you endless happiness, good health, beautiful memories, and a wonderful parenting journey ahead. Happy Birthday once again!
          </p>

          {/* Interactive Birthday Cake */}
          <div className="relative w-[200px] h-[170px] mx-auto mb-4 cursor-pointer select-none">
            {/* Candles Row */}
            <div className="absolute top-[-36px] left-0 right-0 flex justify-center gap-5">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  onClick={() => extinguishCandle(idx)}
                  className={`relative w-2.5 h-10 rounded-t-sm shadow-sm transition-opacity duration-500 cursor-pointer ${
                    idx === 0 
                      ? "bg-gradient-to-b from-pink-300 to-pink-500" 
                      : idx === 1 
                      ? "bg-gradient-to-b from-yellow-300 to-yellow-500" 
                      : "bg-gradient-to-b from-blue-300 to-blue-500"
                  }`}
                >
                  {/* Flame */}
                  {!extinguishedCandles[idx] && (
                    <div className="absolute top-[-15px] left-1/2 w-2.5 h-4 bg-orange-500 rounded-full animate-flicker origin-bottom shadow-[0_0_10px_#ff7f00,0_0_20px_#ff3f00]" />
                  )}
                </div>
              ))}
            </div>

            {/* Cake Body */}
            <div className="absolute bottom-0 w-full h-28 bg-[#f1d3b3] rounded-t-2xl border-b-8 border-[#c8a381] shadow-lg border border-stone-200">
              {/* Chocolate Dripping */}
              <div className="absolute top-0 w-full h-6 bg-[#5c3c21] rounded-t-2xl">
                <div className="absolute bottom-[-10px] left-0 right-0 h-4 bg-[#5c3c21]" style={{ clipPath: "polygon(0% 0%, 10% 0%, 10% 80%, 20% 0%, 30% 0%, 30% 100%, 40% 0%, 50% 0%, 50% 60%, 60% 0%, 70% 0%, 70% 90%, 80% 0%, 90% 0%, 90% 50%, 100% 0%)" }} />
              </div>
              {/* Decorative frosting */}
              <div className="absolute top-1/2 left-0 right-0 h-3 bg-pink-400/80 rounded-full border-t border-b border-pink-300" />
            </div>
          </div>
          
          <span className="block text-xs uppercase font-extrabold tracking-widest text-[#4f772d] mt-4">
            🎂 Click on the candles to blow them out! 🐼🎋
          </span>

          {/* Replay Option */}
          {onReplay && (
            <div className="flex justify-center mt-10 pt-8 border-t border-[#2d2d2d]/10">
              <button
                onClick={onReplay}
                className="px-8 py-3.5 bg-white border border-stone-200 text-stone-700 font-bold text-sm uppercase tracking-widest rounded-full hover:bg-stone-50 active:scale-95 shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                🔄 Replay Experience
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
