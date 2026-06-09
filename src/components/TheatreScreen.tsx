"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "../config";
import FloatingPandas from "./FloatingPandas";

interface TheatreScreenProps {
  onStartShow: () => void;
  isUnlocked: boolean;
}

export default function TheatreScreen({ onStartShow, isUnlocked }: TheatreScreenProps) {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [showMarquee, setShowMarquee] = useState(false);
  const [showTheatre, setShowTheatre] = useState(false);

  useEffect(() => {
    if (isUnlocked) {
      setShowTheatre(true);
      // Wait a moment, then start countdown
      const startTimer = setTimeout(() => {
        setCountdown(3);
      }, 500);
      return () => clearTimeout(startTimer);
    }
  }, [isUnlocked]);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Countdown complete, part curtains
      setCurtainsOpen(true);
      // Fade in the presentation board after curtains start opening
      const marqueeTimer = setTimeout(() => {
        setShowMarquee(true);
        setCountdown(null);
      }, 1200);
      return () => clearTimeout(marqueeTimer);
    }
  }, [countdown]);

  const handleStart = () => {
    setShowTheatre(false);
    setTimeout(() => {
      onStartShow();
    }, 1000);
  };

  if (!showTheatre) return null;

  return (
    <div className="fixed inset-0 z-[8000] bg-black overflow-hidden flex items-center justify-center">
      {/* Background Animated Pandas */}
      <FloatingPandas />

      {/* Spotlight Effect */}
      {curtainsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 pointer-events-none z-[1] bg-radial from-white/15 via-transparent to-transparent origin-top"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(255, 240, 180, 0.15) 0%, rgba(0,0,0,0) 65%)" }}
        />
      )}

      {/* Velvet Curtains */}
      <div className="absolute inset-0 flex z-10 pointer-events-none">
        {/* Left Curtain */}
        <motion.div
          animate={curtainsOpen ? { x: "-100%" } : { x: 0 }}
          transition={{ duration: 2.5, ease: [0.77, 0, 0.175, 1] }}
          className="w-1/2 h-full bg-gradient-to-r from-[#3f0011] via-[#58021c] to-[#200008] border-r-4 border-black/80 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.6),10px_0_15px_rgba(0,0,0,0.5)]"
          style={{
            backgroundSize: "60px 100%",
            backgroundImage: "repeating-linear-gradient(90deg, #58021c, #58021c 30px, #3f0011 60px)"
          }}
        />

        {/* Right Curtain */}
        <motion.div
          animate={curtainsOpen ? { x: "100%" } : { x: 0 }}
          transition={{ duration: 2.5, ease: [0.77, 0, 0.175, 1] }}
          className="w-1/2 h-full bg-gradient-to-l from-[#3f0011] via-[#58021c] to-[#200008] border-l-4 border-black/80 shadow-[inset_20px_0_40px_rgba(0,0,0,0.6),-10px_0_15px_rgba(0,0,0,0.5)]"
          style={{
            backgroundSize: "60px 100%",
            backgroundImage: "repeating-linear-gradient(90deg, #58021c, #58021c 30px, #3f0011 60px)"
          }}
        />
      </div>

      {/* Countdown overlay */}
      <AnimatePresence>
        {countdown !== null && countdown > 0 && (
          <motion.div
            key={countdown}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="z-20 font-serif-custom text-[8rem] md:text-[10rem] text-[#d4af37] font-bold text-shadow-xl"
            style={{ textShadow: "0 0 30px rgba(212, 175, 55, 0.8)" }}
          >
            {countdown}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Presentation Marquee */}
      <AnimatePresence>
        {showMarquee && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="z-20 w-[90%] max-w-[700px] text-center px-4"
          >
            <div className="relative border-8 border-double border-[#d4af37] p-8 md:p-12 bg-black/95 shadow-[0_0_50px_rgba(212,175,55,0.4),inset_0_0_30px_rgba(0,0,0,0.95)] rounded-lg animate-marquee-blink">
              <span className="block text-xs uppercase tracking-[0.25em] text-[#c9b5be] mb-4">
                Tonight's Special Presentation 🐼🎋
              </span>
              <h1 className="font-serif-custom text-4xl md:text-5xl text-white font-bold leading-tight mb-4">
                A Birthday Celebration <br />
                <span className="font-handwritten text-5xl md:text-6xl text-[#d4af37] mt-3 block">
                  for {CONFIG.friendName}
                </span>
              </h1>
              <p className="text-[#c9b5be] text-sm md:text-base tracking-widest mt-6">
                Grab some popcorn. The show is about to begin...
              </p>
              
              <button
                onClick={handleStart}
                className="mt-10 px-8 py-4 bg-gradient-to-r from-[#aa8410] via-[#d4af37] to-[#aa8410] text-[#12020a] font-extrabold text-sm md:text-base uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:shadow-[0_0_45px_rgba(212,175,55,0.75)] hover:scale-105 active:scale-100 transition-all duration-300 cursor-pointer pointer-events-auto"
              >
                Start the Show 🎬
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
