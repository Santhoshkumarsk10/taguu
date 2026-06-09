"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioControlProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function AudioControl({ isPlaying, setIsPlaying }: AudioControlProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button
        onClick={togglePlay}
        className="flex items-center gap-3 px-4 py-2.5 bg-black/85 backdrop-blur-md border border-[#d4af37] text-[#d4af37] rounded-full hover:bg-black/95 transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-[#c9b5be] uppercase">Playing</span>
          </>
        ) : (
          <>
            <VolumeX className="w-5 h-5" />
            <span className="text-xs font-bold tracking-widest text-[#c9b5be] uppercase">Muted</span>
          </>
        )}
      </button>
    </div>
  );
}
