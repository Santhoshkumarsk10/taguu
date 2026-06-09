"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PARTICLE_EMOJIS = ["🐼", "🎋", "🐾", "🍃"];

interface Particle {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
  swayDistance: number;
}

export default function FloatingPandas() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on client-side mount
    const generated = Array.from({ length: 18 }).map((_, idx) => ({
      id: idx,
      emoji: PARTICLE_EMOJIS[idx % PARTICLE_EMOJIS.length],
      x: Math.random() * 100, // starting horizontal percentage
      delay: Math.random() * -15, // negative delay so they start pre-distributed across the screen height
      duration: Math.random() * 12 + 12, // 12s to 24s fall time
      size: Math.random() * 1.4 + 1.2, // 1.2rem to 2.6rem
      swayDistance: Math.random() * 30 + 15 // horizontal swing radius
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-10vh", x: `${p.x}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            x: [
              `${p.x}vw`, 
              `${p.x + p.swayDistance / 2}vw`, 
              `${p.x - p.swayDistance / 2}vw`, 
              `${p.x}vw`
            ],
            opacity: [0, 0.45, 0.45, 0],
            rotate: [0, 180, -180, 360]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          className="absolute text-center"
          style={{ fontSize: `${p.size}rem`, filter: "blur(0.5px)" }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
