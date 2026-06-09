"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG, GalleryPhoto } from "../config";
import { X, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function GallerySection() {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play interval for the slideshow
  useEffect(() => {
    if (activePhotoIdx === null || !isPlaying) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [activePhotoIdx, isPlaying]);

  const handlePrev = () => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((prev) => 
      prev === 0 ? CONFIG.galleryPhotos.length - 1 : (prev as number) - 1
    );
  };

  const handleNext = () => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((prev) => 
      (prev as number) === CONFIG.galleryPhotos.length - 1 ? 0 : (prev as number) + 1
    );
  };

  // Staggered animation layout for polaroids
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const polaroidVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 80, damping: 12 }
    }
  };

  // Preset tilt rotations to randomize polaroids
  const tilts = [-4, 3, -2, 5, -3, 2];

  const activePhoto = activePhotoIdx !== null ? CONFIG.galleryPhotos[activePhotoIdx] : null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Grid of Polaroid Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {CONFIG.galleryPhotos.map((photo, idx) => {
          const tilt = tilts[idx % tilts.length];
          return (
            <motion.div
              key={idx}
              variants={polaroidVariants}
              whileHover={{ 
                rotate: 0, 
                scale: 1.05, 
                y: -10,
                boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)"
              }}
              style={{ rotate: `${tilt}deg` }}
              onClick={() => {
                setActivePhotoIdx(idx);
                setIsPlaying(true);
              }}
              className="relative bg-gradient-to-b from-[#fcfbf9] to-[#f7f4e9] p-4 pb-8 rounded-lg border border-[#e5dfd0] shadow-[0_12px_30px_rgba(74,99,76,0.06),0_2px_4px_rgba(0,0,0,0.02)] cursor-pointer text-[#2b3a2f] transition-all duration-300 select-none hover:z-20 w-full"
            >
              {/* Cute 3D Red Pushpin at the top center of each Polaroid */}
              <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 z-30 drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)] select-none pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-7 h-7">
                  <circle cx="50" cy="35" r="13" fill="#b91c1c" />
                  <circle cx="46" cy="31" r="5" fill="#fca5a5" /> {/* highlight */}
                  <polygon points="46,47 54,47 50,75" fill="#9ca3af" /> {/* needle */}
                </svg>
              </div>

              {/* Photo wrapper */}
              <div className="relative aspect-square w-full bg-[#ebe7dc] border border-black/5 overflow-hidden rounded-md">
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority={idx < 2}
                />
              </div>

              {/* Polaroid Caption */}
              <div className="font-handwritten text-2xl text-center text-[#2b3a2f] mt-4 overflow-hidden text-ellipsis whitespace-nowrap px-1">
                {photo.caption}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Lightbox / Slideshow Overlay (Incorporated from wife's project) */}
      <AnimatePresence>
        {activePhotoIdx !== null && activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Blurred background image for cinema look */}
            <div
              className="absolute inset-0 bg-cover bg-center blur-3xl opacity-35 scale-110 pointer-events-none"
              style={{ backgroundImage: `url(${activePhoto.url})` }}
            />

            {/* Timing Progress Bar at the top edge */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-white/10 z-[10000] overflow-hidden">
              <motion.div
                key={activePhotoIdx + "-" + isPlaying}
                initial={{ width: "0%" }}
                animate={isPlaying ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#4f772d] via-white to-[#4f772d]"
              />
            </div>

            {/* Top Control Bar */}
            <div className="absolute top-6 inset-x-6 flex items-center justify-between z-[10000] px-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-5 py-2.5 rounded-full text-white bg-white/10 border border-white/20 hover:bg-white/20 flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>
              
              <div className="text-white/80 text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-5 py-2.5 rounded-full select-none">
                {activePhotoIdx + 1} / {CONFIG.galleryPhotos.length}
              </div>

              <button
                onClick={() => setActivePhotoIdx(null)}
                className="p-2.5 text-white bg-white/10 border border-white/20 hover:bg-white/20 rounded-full transition-all cursor-pointer active:scale-95"
                aria-label="Close Slideshow"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left/Right Navigation Chevrons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 flex items-center justify-center text-white/80 hover:scale-105 active:scale-95 transition-all z-[10000] cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft size={32} />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 flex items-center justify-center text-white/80 hover:scale-105 active:scale-95 transition-all z-[10000] cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight size={32} />
            </button>

            {/* Polaroid Lightbox Content in Sketchbook theme */}
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on click inside
              className="relative bg-gradient-to-b from-[#fcfbf9] to-[#f7f4e9] p-5 pb-10 rounded-2xl border border-[#e5dfd0]/80 shadow-[0_30px_60px_rgba(0,0,0,0.4)] max-w-full w-[460px] text-[#2b3a2f] flex flex-col z-10"
            >
              {/* Pushpin at top */}
              <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 z-30 drop-shadow-md select-none pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  <circle cx="50" cy="35" r="13" fill="#b91c1c" />
                  <circle cx="46" cy="31" r="5" fill="#fca5a5" />
                  <polygon points="46,47 54,47 50,75" fill="#9ca3af" />
                </svg>
              </div>

              {/* Image Container */}
              <div className="relative aspect-square w-full bg-[#ebe7dc] border border-black/5 overflow-hidden rounded-lg">
                <Image
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Caption */}
              <div className="font-handwritten text-4xl text-center text-[#2b3a2f] mt-6 leading-tight">
                {activePhoto.caption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
