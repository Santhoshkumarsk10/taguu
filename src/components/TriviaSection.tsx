"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "../config";
import { Award } from "lucide-react";
import confetti from "canvas-confetti";

interface TriviaSectionProps {
  onComplete: (completed: boolean) => void;
}

export default function TriviaSection({ onComplete }: TriviaSectionProps) {
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<"correct" | "incorrect" | null>(null);
  const [feedback, setFeedback] = useState("");
  const [triviaFinished, setTriviaFinished] = useState(false);

  useEffect(() => {
    onComplete(triviaFinished);
  }, [triviaFinished, onComplete]);

  const handleTriviaAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return;

    const q = CONFIG.triviaQuestions[triviaIndex];
    setSelectedOption(optionIdx);

    if (optionIdx === q.correctAnswer) {
      setAnswerState("correct");
      setFeedback(q.successMessage || "That's correct! 🐼🎉");
      
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: 0.65 },
        colors: ["#558b2f", "#ffffff", "#2d2d2d"]
      });

      setTimeout(() => {
        if (triviaIndex < CONFIG.triviaQuestions.length - 1) {
          setTriviaIndex(triviaIndex + 1);
          setSelectedOption(null);
          setAnswerState(null);
          setFeedback("");
        } else {
          setTriviaFinished(true);
        }
      }, 2500);
    } else {
      setAnswerState("incorrect");
      setFeedback("Oh! Not quite. Try to remember! 😉🐼");
      setTimeout(() => {
        setSelectedOption(null);
        setAnswerState(null);
        setFeedback("");
      }, 2000);
    }
  };

  const currentQ = CONFIG.triviaQuestions[triviaIndex];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-b from-[#fdfdfb] to-[#f8f6f0] border border-emerald-800/10 p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(74,99,76,0.1),4px_4px_0px_#4f772d] flex flex-col justify-between overflow-visible"
      >
        {/* Sketchbook Bamboo Washi Tape on top */}
        <div className="absolute top-[-14px] left-[35%] right-[35%] h-6 bg-[#d4dfc7] border border-[#b8c9a5] shadow-[1px_2px_3px_rgba(0,0,0,0.08)] rotate-[-1.5deg] z-20 select-none flex items-center justify-center text-[9px] font-bold text-[#4f772d]/80 tracking-wider rounded-sm">
          BAMBOO TAPE 🎋
        </div>

        <div>
          <div className="flex items-center gap-3 border-b border-[#2d2d2d]/10 pb-4 mb-6 text-xl font-bold font-serif-custom text-[#2b3a2f]">
            <span>🧠</span> Friendship Trivia 🐼🐾
          </div>

          <AnimatePresence mode="wait">
            {!triviaFinished ? (
              <motion.div
                key={triviaIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-xs uppercase font-extrabold tracking-widest text-[#4f772d] mb-2">
                  Question {triviaIndex + 1} of {CONFIG.triviaQuestions.length}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-6 text-[#2b3a2f] min-h-[50px] leading-relaxed">
                  {currentQ.question}
                </h3>

                <div className="flex flex-col gap-3">
                  {currentQ.options.map((option, idx) => {
                    const letters = ["A", "B", "C", "D"];
                    let btnStyle = "bg-white/90 border border-stone-200 text-[#2b3a2f] hover:bg-emerald-50/40 hover:border-[#4f772d]/40 hover:translate-x-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)]";
                    
                    if (selectedOption === idx) {
                      btnStyle = answerState === "correct"
                        ? "bg-emerald-50/80 border-2 border-emerald-600 text-emerald-800 shadow-[0_4px_12px_rgba(16,185,129,0.15)]"
                        : "bg-red-50/80 border-2 border-red-500 text-red-800 shadow-[0_4px_12px_rgba(239,68,68,0.15)]";
                    } else if (selectedOption !== null && idx === currentQ.correctAnswer) {
                      btnStyle = "bg-emerald-50/50 border border-emerald-600/50 text-[#4f772d]";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedOption !== null}
                        onClick={() => handleTriviaAnswer(idx)}
                        className={`w-full py-4 px-6 rounded-2xl text-left text-sm md:text-base font-bold transition-all duration-300 flex items-center gap-4 ${btnStyle} disabled:cursor-not-allowed`}
                      >
                        {/* Option Letter indicator */}
                        <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-black ${
                          selectedOption === idx 
                            ? answerState === "correct" 
                              ? "border-emerald-600 bg-emerald-100 text-emerald-800" 
                              : "border-red-500 bg-red-100 text-red-800"
                            : "border-stone-200 bg-stone-50 text-stone-600"
                        }`}>
                          {letters[idx]}
                        </span>
                        <span className="flex-1">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10 flex flex-col items-center gap-4"
              >
                <div className="p-4 bg-emerald-100/50 border border-emerald-600/30 rounded-full text-emerald-700 mb-2 animate-bounce">
                  <Award className="w-12 h-12" />
                </div>
                <h3 className="font-serif-custom text-2xl text-[#2b3a2f] font-bold">Excellent Memory! 🐼🐾</h3>
                <p className="text-stone-500 text-sm leading-relaxed max-w-[320px] mx-auto font-medium">
                  You remember every single detail of our crazy times together. You are the absolute best!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-6 p-4 rounded-xl text-center font-bold text-sm border ${
              answerState === "correct" 
                ? "text-emerald-800 bg-emerald-50 border-emerald-600/20" 
                : "text-red-800 bg-red-50 border-red-500/20"
            }`}
          >
            {feedback}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
