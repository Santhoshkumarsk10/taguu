"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "../config";

export default function MessageSection() {
  const [isOpen, setIsOpen] = useState(false);

  // Divide messages: first item is header, last is signature/closing, middle are paragraphs
  const messageHeader = CONFIG.personalMessages[0];
  const messageBody = CONFIG.personalMessages.slice(1, CONFIG.personalMessages.length - 1);
  const messageClosing = CONFIG.personalMessages[CONFIG.personalMessages.length - 1];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[500px]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Sealed Envelope Screen */
          <motion.div
            key="sealed-envelope"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -30 }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsOpen(true)}
            className="group relative w-full max-w-md aspect-[1.4] bg-gradient-to-b from-[#fdfdfb] to-[#f8f6f0] border border-emerald-800/10 rounded-2xl shadow-[0_20px_50px_rgba(74,99,76,0.1),4px_4px_0px_#4f772d] cursor-pointer flex flex-col items-center justify-center p-6 overflow-hidden select-none hover:translate-y-[-4px] transition-all duration-300"
          >
            {/* Stamp Detail in top-right corner */}
            <div className="absolute top-4 right-4 w-12 h-14 bg-white/80 border border-dashed border-[#4f772d]/40 rounded-md flex items-center justify-center text-xl select-none rotate-6 group-hover:rotate-12 transition-transform shadow-sm">
              🐼
            </div>

            {/* Back Flap Diagonal Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="50" y2="45" stroke="#2d2d2d" strokeWidth="2" />
                <line x1="100" y1="0" x2="50" y2="45" stroke="#2d2d2d" strokeWidth="2" />
                <line x1="0" y1="100" x2="50" y2="45" stroke="#2d2d2d" strokeWidth="2" />
                <line x1="100" y1="100" x2="50" y2="45" stroke="#2d2d2d" strokeWidth="2" />
              </svg>
            </div>

            {/* Envelope Centered Address Info */}
            <div className="text-center z-10 flex flex-col items-center">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-stone-500 mb-2">
                A Letter For
              </span>
              <h2 className="font-handwritten text-5xl font-bold text-[#2b3a2f] leading-none mb-1">
                {CONFIG.friendName}
              </h2>
              <p className="text-[11px] font-bold text-[#4f772d] tracking-wide mt-2">
                FROM YOUR CLOSEST FRIEND 🐾
              </p>
            </div>

            {/* Glowing Red Wax Seal */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 flex flex-col items-center justify-center gap-1 z-20"
            >
              <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 border border-red-700/30 rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_rgba(220,38,38,0.4)] hover:scale-105 transition-transform select-none font-bold">
                🐾
              </div>
              <span className="text-[9px] uppercase font-black tracking-widest text-[#2b3a2f] mt-2 group-hover:text-[#4f772d] transition-colors">
                Click Wax Seal to Open
              </span>
            </motion.div>
          </motion.div>
        ) : (
          /* Opened Envelope and Letter Slideout Screen */
          <motion.div
            key="opened-letter"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full relative flex flex-col items-center"
          >
            {/* Lined Notebook Paper Card Letter */}
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 80, damping: 15 }}
              className="relative w-full bg-[#fdfcf9] border border-[#e5dfd0] rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(74,99,76,0.08),4px_4px_0px_#4f772d] overflow-visible"
              style={{
                backgroundImage: "linear-gradient(#f3efe6 1px, transparent 1px)",
                backgroundSize: "100% 2.2rem",
                lineHeight: "2.2rem"
              }}
            >
              {/* Notebook binding rings SVG on left */}
              <div className="absolute left-[-10px] top-6 bottom-6 flex flex-col justify-between w-4 pointer-events-none select-none">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300/40 rounded-full shadow-sm" />
                ))}
              </div>

              {/* Heart Stamp in corner */}
              <div className="absolute top-4 right-4 z-10 w-12 h-12 border border-[#4f772d]/10 rounded-full flex items-center justify-center text-2xl text-[#4f772d]/25 select-none rotate-[-12deg] pointer-events-none">
                ❤️
              </div>

              {/* Letter Content */}
              <div className="pl-6 text-[#2b3a2f] text-base md:text-lg">
                {/* Header */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="font-serif-custom font-black border-b border-[#2d2d2d]/10 pb-2 mb-6"
                >
                  {messageHeader}
                </motion.h3>

                {/* Paragraphs */}
                <div className="flex flex-col gap-6 text-[#3d4d3d] font-medium leading-[2.2rem]">
                  {messageBody.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.4, duration: 0.6 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Closing signature */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + messageBody.length * 0.4 + 0.5, duration: 0.8 }}
                  className="mt-8 border-t border-[#2d2d2d]/10 pt-6"
                >
                  <p className="font-handwritten text-4xl text-[#4f772d] leading-relaxed text-center md:text-left">
                    {messageClosing}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Back to Envelope Option */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              onClick={() => setIsOpen(false)}
              className="mt-6 px-5 py-2.5 border border-[#2d2d2d]/20 text-xs font-bold uppercase tracking-widest text-[#2b3a2f] rounded-full hover:bg-black/5 active:scale-95 transition-all cursor-pointer bg-white shadow-sm"
            >
              ✉️ Close Envelope
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
