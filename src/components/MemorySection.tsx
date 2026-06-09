"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface MemorySectionProps {
  onComplete: (completed: boolean) => void;
}

export default function MemorySection({ onComplete }: MemorySectionProps) {
  const [cards, setCards] = useState<{ id: number; icon: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [memoryFinished, setMemoryFinished] = useState(false);

  const initialIcons = ["🎋", "🎂", "💖", "👭"];

  useEffect(() => {
    resetMemory();
  }, []);

  useEffect(() => {
    onComplete(memoryFinished);
  }, [memoryFinished, onComplete]);

  const resetMemory = () => {
    const doubleIcons = [...initialIcons, ...initialIcons];
    const shuffled = doubleIcons
      .map((icon, idx) => ({ id: idx, icon, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setMemoryFinished(false);
  };

  const handleCardClick = (cardIndex: number) => {
    if (selectedCards.length >= 2) return;
    const card = cards[cardIndex];
    if (card.isFlipped || card.isMatched) return;

    // Flip card
    const updatedCards = [...cards];
    updatedCards[cardIndex].isFlipped = true;
    setCards(updatedCards);

    const newSelected = [...selectedCards, cardIndex];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const firstIdx = newSelected[0];
      const secondIdx = newSelected[1];

      if (cards[firstIdx].icon === cards[secondIdx].icon) {
        // Matched
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setCards(matchedCards);
          setSelectedCards([]);

          if (matchedCards.every((c) => c.isMatched)) {
            setMemoryFinished(true);
            confetti({
              particleCount: 50,
              spread: 60,
              colors: ["#558b2f", "#d4af37", "#2d2d2d"]
            });
          }
        }, 500);
      } else {
        // Unflip cards after delay
        setTimeout(() => {
          const resetFlippedCards = [...cards];
          resetFlippedCards[firstIdx].isFlipped = false;
          resetFlippedCards[secondIdx].isFlipped = false;
          setCards(resetFlippedCards);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-b from-[#fdfdfb] to-[#f8f6f0] border border-emerald-800/10 p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(74,99,76,0.1),4px_4px_0px_#4f772d] flex flex-col justify-between overflow-visible"
      >
        {/* Sketchbook Washi Tape */}
        <div className="absolute top-[-14px] left-[35%] right-[35%] h-6 bg-[#fcd5b5] border border-[#d9bfab] shadow-[1px_2px_3px_rgba(0,0,0,0.08)] rotate-[1deg] z-20 select-none flex items-center justify-center text-[9px] font-bold text-[#b97a47] tracking-wider rounded-sm">
          MEMORY GRID 🐾
        </div>

        <div>
          <div className="flex items-center justify-between border-b border-[#2d2d2d]/10 pb-4 mb-6">
            <div className="text-xl font-bold font-serif-custom text-[#2b3a2f] flex items-center gap-3">
              <span>🃏</span> Memory Matcher 🎋
            </div>
            <button
              onClick={resetMemory}
              className="p-2 bg-white border border-stone-200 text-[#2b3a2f] rounded-xl hover:bg-emerald-50 active:scale-90 transition-all duration-300 cursor-pointer shadow-sm"
              title="Reset Grid"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!memoryFinished ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-4 gap-3 max-w-[320px] mx-auto"
              >
                {cards.map((card, idx) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(idx)}
                    className="relative aspect-square w-full rounded-xl cursor-pointer perspective-1000 select-none active:scale-95 transition-transform duration-200"
                  >
                    <div
                      className={`absolute inset-0 w-full h-full duration-500 transform-style-3d transition-transform ${
                        card.isFlipped || card.isMatched ? "rotate-y-180" : ""
                      }`}
                    >
                      {/* Back face (unflipped) - Cute Panda! */}
                      <div className="absolute inset-0 w-full h-full bg-[#fcfbfa] border border-stone-200 text-2xl flex items-center justify-center rounded-xl backface-hidden shadow-sm">
                        🐼
                      </div>

                      {/* Front face (flipped) */}
                      <div className="absolute inset-0 w-full h-full bg-emerald-50/80 border border-emerald-200 text-3xl flex items-center justify-center rounded-xl rotate-y-180 backface-hidden shadow-inner">
                        {card.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10 flex flex-col items-center gap-4"
              >
                <div className="p-4 bg-emerald-100/50 border border-emerald-600/30 rounded-full text-[#4f772d] mb-2 animate-bounce">
                  <Heart className="w-12 h-12 fill-emerald-600/10" />
                </div>
                <h3 className="font-serif-custom text-2xl text-[#2b3a2f] font-bold">Perfect Match! 🐼🎋</h3>
                <p className="text-stone-500 text-sm leading-relaxed max-w-[300px] mx-auto font-medium">
                  Just like our beautiful friendship. You matched all the memories in record time!
                  Now click the next button to view memories.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filler footer */}
        <div className="mt-8 text-center text-xs text-stone-500 font-bold">
          {!memoryFinished ? "Find the matching card pairs!" : "Memory game complete! Go next."}
        </div>
      </motion.div>
    </div>
  );
}
