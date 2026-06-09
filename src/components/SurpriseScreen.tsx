"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "../config";
import Image from "next/image";
import confetti from "canvas-confetti";

export default function SurpriseScreen() {
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Baby prediction state
  const [votedGender, setVotedGender] = useState<"boy" | "girl" | null>(null);

  const handleUnwrap = () => {
    setIsExploding(true);
    setCountdown(3);

    // Suspense countdown before explosion
    const countInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return null;
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(countInterval);
          setCountdown(null);
          triggerExplosion();
          return null;
        }
      });
    }, 800);
  };

  const triggerExplosion = () => {
    setIsUnwrapped(true);
    setIsExploding(false);

    // Firework Confetti Explosion
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti burst from random locations
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleVote = (gender: "boy" | "girl") => {
    setVotedGender(gender);

    // Confetti shower matching gender colors
    const colors = gender === "boy" 
      ? ["#5fa8d3", "#a8dadc", "#2d2d2d", "#ffffff"] 
      : ["#d85c83", "#ffb3c1", "#2d2d2d", "#ffffff"];

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center relative min-h-[600px]">
      
      {/* Floating red hearts and stars in background once unwrapped */}
      {isUnwrapped && (
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
      )}

      <AnimatePresence mode="wait">
        {!isUnwrapped ? (
          <motion.div
            key="gift-box-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center flex flex-col items-center gap-6 bg-gradient-to-b from-[#fdfdfb] to-[#f8f6f0] border border-emerald-800/10 p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(74,99,76,0.1),4px_4px_0px_#4f772d] relative z-10"
          >
            <h2 className="font-serif-custom text-3xl md:text-4xl text-[#2b3a2f] font-bold leading-tight">
              A BIG SURPRISE IS WAITING... 🐼🎁
            </h2>
            <p className="text-stone-500 text-sm md:text-base max-w-[450px] leading-relaxed mb-6 font-bold">
              You've unlocked every section. Now, it's time for the ultimate grand surprise. Click the box below to open the panda vault! 🎋
            </p>

            <div className="relative w-40 h-40 flex items-center justify-center cursor-pointer select-none">
              {countdown !== null ? (
                <motion.div
                  key={countdown}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  exit={{ scale: 1.6, opacity: 0 }}
                  className="font-serif-custom text-6xl text-[#2b3a2f] font-bold"
                >
                  {countdown}
                </motion.div>
              ) : (
                <div
                  onClick={handleUnwrap}
                  className={`text-8xl select-none leading-none ${isExploding ? "animate-gift-shake scale-110" : "animate-float hover:scale-105"}`}
                  style={{ transition: "transform 0.3s" }}
                >
                  🎁
                </div>
              )}
            </div>

            <button
              onClick={handleUnwrap}
              disabled={isExploding}
              className="mt-6 px-10 py-4.5 bg-[#4f772d] border border-emerald-900 text-white font-extrabold text-sm md:text-base uppercase tracking-widest rounded-full shadow-[0_4px_14px_rgba(79,119,45,0.2),4px_4px_0px_#22c55e] hover:bg-emerald-900 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed cursor-pointer"
            >
              {isExploding ? "Unveiling..." : "Unwrap the Panda Magic 🎋"}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="revealed-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full flex flex-col items-center gap-12 relative z-10"
          >
            {/* Part 1: Baby Gender Prediction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-[650px] bg-gradient-to-b from-[#fdfdfb] to-[#f8f6f0] border border-emerald-800/10 p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(74,99,76,0.08),4px_4px_0px_#4f772d] text-center"
            >
              <h3 className="font-serif-custom text-2xl text-[#2b3a2f] font-bold mb-2">
                What do you think it will be? 🐼🍼
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-6 font-bold">
                Since a little cub is on the way to complete your beautiful family, place your vote!
              </p>

              {/* Dream big illustration */}
              <div className="relative w-full max-w-[320px] aspect-square mx-auto mb-8 rounded-2xl overflow-hidden border border-dashed border-emerald-800/20 p-1 bg-[#fcfcfc]">
                <Image
                  src={CONFIG.babyPrediction.imageUrl}
                  alt="Baby Shower Prediction"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-6 max-w-[350px] mx-auto mb-8">
                <button
                  onClick={() => handleVote("boy")}
                  className={`flex flex-col items-center gap-2 p-4 border rounded-2xl transition-all duration-300 cursor-pointer ${
                    votedGender === "boy"
                      ? "border-blue-500 bg-blue-100/80 shadow-[0_8px_20px_rgba(59,130,246,0.15)] scale-105"
                      : "border-blue-200 bg-blue-50/50 hover:bg-blue-100 hover:border-blue-300 text-blue-800"
                  }`}
                >
                  <span className="text-4xl">👦</span>
                  <span className="text-sm font-bold uppercase tracking-wider">Boy Cub</span>
                </button>

                <button
                  onClick={() => handleVote("girl")}
                  className={`flex flex-col items-center gap-2 p-4 border rounded-2xl transition-all duration-300 cursor-pointer ${
                    votedGender === "girl"
                      ? "border-pink-500 bg-pink-100/80 shadow-[0_8px_20px_rgba(236,72,153,0.15)] scale-105"
                      : "border-pink-200 bg-pink-50/50 hover:bg-pink-100 hover:border-pink-300 text-pink-800"
                  }`}
                >
                  <span className="text-4xl">👧</span>
                  <span className="text-sm font-bold uppercase tracking-wider">Girl Cub</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {votedGender && (
                  <motion.div
                    key={votedGender}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 rounded-2xl text-left text-sm md:text-base border border-stone-200 bg-[#fdfcf9] text-stone-700 shadow-inner"
                  >
                    {votedGender === "boy" ? CONFIG.babyPrediction.boyResponse : CONFIG.babyPrediction.girlResponse}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
