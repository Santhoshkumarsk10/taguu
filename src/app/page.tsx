"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PasscodeScreen from "@/components/PasscodeScreen";
import TriviaSection from "@/components/TriviaSection";
import MemorySection from "@/components/MemorySection";
import GallerySection from "@/components/GallerySection";
import MessageSection from "@/components/MessageSection";
import SurpriseScreen from "@/components/SurpriseScreen";
import CakeSection from "@/components/CakeSection";
import AudioControl from "@/components/AudioControl";
import FloatingPandas from "@/components/FloatingPandas";
import Footer from "@/components/Footer";
import { CONFIG } from "@/config";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Individual chapter completion gates
  const [triviaCompleted, setTriviaCompleted] = useState(false);
  const [memoryCompleted, setMemoryCompleted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(CONFIG.musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (audioPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play blocked or load error:", err);
        setAudioPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [audioPlaying]);

  // Setup callbacks
  const handleUnlock = () => {
    setIsUnlocked(true);
    setShowMain(true);
  };

  const playAudioSync = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play blocked:", err);
      });
      setAudioPlaying(true);
    }
  };

  const handleReplay = () => {
    setTriviaCompleted(false);
    setMemoryCompleted(false);
    setActiveChapter(1);
  };

  // Chapter details
  const chapters = [
    { id: 1, label: "Friendship Trivia", component: <TriviaSection onComplete={setTriviaCompleted} /> },
    { id: 2, label: "Memory Matcher", component: <MemorySection onComplete={setMemoryCompleted} /> },
    { id: 3, label: "Memories", component: <GallerySection /> },
    { id: 4, label: "For You", component: <MessageSection /> },
    { id: 5, label: "Baby Prediction", component: <SurpriseScreen /> },
    { id: 6, label: "Make a Wish", component: <CakeSection onReplay={handleReplay} /> }
  ];

  const currentChapter = chapters.find((c) => c.id === activeChapter);

  // Check if current chapter's gate is satisfied
  const isGateSatisfied = () => {
    if (activeChapter === 1) return triviaCompleted;
    if (activeChapter === 2) return memoryCompleted;
    return true; // Other chapters have no answers/games
  };

  const getButtonText = () => {
    if (activeChapter === 1 && !triviaCompleted) return "Solve Trivia to proceed! 🐼🎋";
    if (activeChapter === 2 && !memoryCompleted) return "Match all cards to proceed! 🃏🐼";
    return "Next Chapter";
  };

  return (
    <div className="flex flex-col flex-1 relative min-h-screen">
      {/* Warm, soft, celebratory sketchbook background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#fff4f4] via-[#fcfbf9] to-[#eef7ec] pointer-events-none z-0" />
      <FloatingPandas />

      {/* Screen 1: Lock passcode input */}
      <PasscodeScreen 
        onUnlock={handleUnlock} 
        onCorrectPasscode={playAudioSync} 
      />

      {/* Music play control and WhatsApp */}
      {showMain && (
        <>
          <AudioControl 
            isPlaying={audioPlaying} 
            setIsPlaying={setAudioPlaying} 
          />
        </>
      )}

      {/* Screen 2: Main Surprise Presentation Dashboard */}
      {showMain && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col min-h-screen pt-16 pb-0 px-4"
        >
          {/* Header Title */}
          <header className="text-center mb-6 select-none">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-serif-custom text-4xl md:text-5xl font-extrabold text-[#2b3a2f] tracking-wide"
            >
              Happy Birthday Priya Harshana! 🐼🎂
            </motion.h1>
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs font-bold tracking-widest text-[#4f772d] uppercase mt-2"
            >
              Taguu 🎋
            </motion.p>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col justify-center items-center py-4 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full flex flex-col items-center"
              >
                {currentChapter?.component}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Chapter navigation footer */}
          <footer className="w-full max-w-lg mx-auto flex items-center justify-center mt-8 px-4 select-none">
            {activeChapter < chapters.length && (
              <button
                disabled={!isGateSatisfied()}
                onClick={() => {
                  setActiveChapter((prev) => prev + 1);
                }}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                  !isGateSatisfied()
                    ? "bg-stone-200 border-stone-300 text-stone-400 cursor-not-allowed opacity-60"
                    : "bg-emerald-800 border-emerald-900 text-white hover:bg-emerald-950 active:scale-95 shadow-[0_4px_14px_rgba(16,185,129,0.2),4px_4px_0px_#22c55e]"
                }`}
              >
                <span>{getButtonText()}</span>
                {isGateSatisfied() && <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />}
              </button>
            )}
          </footer>

          {/* Developer Links Footer */}
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
