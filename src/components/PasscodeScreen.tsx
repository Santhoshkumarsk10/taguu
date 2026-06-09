  "use client";

import React, { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "../config";
import Image from "next/image";
import FloatingPandas from "./FloatingPandas";

interface PasscodeScreenProps {
  onUnlock: () => void;
  onCorrectPasscode: () => void;
}

export default function PasscodeScreen({ onUnlock, onCorrectPasscode }: PasscodeScreenProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const maxDigits = 8;
  const correctPass = CONFIG.birthDatePasscode.replace(/\D/g, "");

  // Listen to physical keyboard typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocked) return;

      if (e.key >= "0" && e.key <= "9") {
        handleKeyPress(e.key);
      } else if (e.key === "Backspace") {
        handleKeyPress("⌫");
      } else if (e.key === "Escape") {
        handleKeyPress("•");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [passcode, isUnlocked]);

  const handleKeyPress = (key: string) => {
    if (key === "•") {
      setPasscode("");
      setError("");
    } else if (key === "⌫") {
      setPasscode((prev) => prev.slice(0, -1));
      setError("");
    } else {
      if (passcode.length < maxDigits) {
        const nextPass = passcode + key;
        setPasscode(nextPass);
        setError("");

        // Auto check passcode when code reaches length
        if (nextPass.length === maxDigits) {
          verifyPasscode(nextPass);
        }
      }
    }
  };

  const verifyPasscode = (code: string) => {
    if (code === correctPass) {
      setIsUnlocked(true);
      onCorrectPasscode(); // Play audio synchronously inside the user interaction event loop tick
      setTimeout(() => {
        onUnlock();
      }, 800);
    } else {
      setIsShaking(true);
      setError("Incorrect passcode. Try again! 🤫🐼");
      setTimeout(() => {
        setPasscode("");
        setIsShaking(false);
      }, 1200);
    }
  };

  const keypadKeys = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "•", "0", "⌫"
  ];

  return (
    <AnimatePresence>
      {!isUnlocked && ( 
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -1000 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[9999] bg-gradient-to-b from-[#223326] via-[#131f16] to-[#0a110c] flex items-center justify-center p-4 md:p-8"
        >
          {/* Subtle Golden Ambient Glow in the Center */}
          <div className="absolute inset-0 bg-radial from-[rgba(212,175,55,0.06)] via-transparent to-transparent pointer-events-none" />
          
          <FloatingPandas />
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 relative z-10">
            
            {/* Left Side: Polaroid Card with red bow */}
            <motion.div 
              initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
              animate={{ rotate: -3, scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative bg-gradient-to-b from-[#fcfbf9] to-[#f6f3e8] p-5 pb-8 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.5)] w-[260px] md:w-[320px] select-none border border-[#e5dfd0]/60"
            >
              {/* Cute SVG Red Bow in the top-left corner */}
              <div className="absolute top-[-15px] left-[-15px] z-30 drop-shadow-lg">
                <svg viewBox="0 0 100 100" className="w-16 h-16">
                  {/* Left Loop */}
                  <path d="M 50 50 C 25 15, 5 25, 20 48 C 30 58, 42 53, 50 50 Z" fill="#b91c1c" />
                  {/* Right Loop */}
                  <path d="M 50 50 C 75 15, 95 25, 80 48 C 70 58, 58 53, 50 50 Z" fill="#b91c1c" />
                  {/* Center Knot */}
                  <circle cx="50" cy="50" r="9" fill="#7f1d1d" />
                  {/* Left Ribbon Tail */}
                  <path d="M 46 51 C 38 65, 25 75, 28 88 C 29 93, 40 82, 45 70 Z" fill="#b91c1c" />
                  {/* Right Ribbon Tail */}
                  <path d="M 54 51 C 62 65, 75 75, 72 88 C 71 93, 60 82, 55 70 Z" fill="#b91c1c" />
                </svg>
              </div>

              {/* Photo Frame */}
              <div className="relative aspect-square w-full bg-[#ebe7dc] border border-black/5 overflow-hidden rounded-lg">
                <Image
                  src="/panda_passcode.png"
                  alt="Panda Birthday Greeting"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Polaroid Cursive Handwriting */}
              <div className="font-handwritten text-4xl text-center text-[#2b3a2f] mt-5 leading-none">
                Happy Birthday! 🐼🎋
              </div>
              <div className="text-[10px] uppercase font-extrabold tracking-widest text-[#859688] text-center mt-2">
                {CONFIG.friendName}
              </div>
            </motion.div>

            {/* Right Side: Passcode Numeric Keypad */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`flex flex-col items-center justify-center ${isShaking ? "animate-shake" : ""}`}
            >
              {/* Lock Icon */}
              <div className="mb-4 text-[#ffdf7a]">
                <Lock className="w-5 h-5 stroke-[2.5]" />
              </div>

              {/* Spaced Header */}
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/80 mb-8 select-none">
                Enter a Passcode
              </h2>

              {/* 8 Passcode dots */}
              <div className="flex gap-2.5 mb-8">
                {Array.from({ length: maxDigits }).map((_, idx) => {
                  const isFilled = idx < passcode.length;
                  return (
                    <div
                      key={idx}
                      className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center bg-white/5 transition-all duration-300"
                    >
                      {isFilled && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3.5 h-3.5 bg-[#90a955] rounded-full shadow-[0_0_8px_#90a955]"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Keypad Layout */}
              <div className="grid grid-cols-3 gap-4 max-w-[280px]">
                {keypadKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    className="w-16 h-16 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-sm hover:bg-white/10 active:scale-90 transition-all duration-200 text-xl font-bold flex items-center justify-center text-white cursor-pointer select-none"
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Error messages */}
              <div className="h-6 mt-6">
                {error && (
                  <p className="text-sm text-red-400 font-bold text-center" role="alert">
                    {error}
                  </p>
                )}
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
