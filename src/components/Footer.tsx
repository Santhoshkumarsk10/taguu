"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-4 relative z-20 mt-auto border-t border-stone-200/50 bg-[#fdfcf9]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Author / Copy Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col md:flex-row items-center gap-2 md:gap-4 select-none"
        >
          <p className="text-stone-500 text-sm flex items-center gap-2 font-bold">
            Developed with <Heart size={14} className="text-pink-500 fill-current animate-pulse" /> by 
            <span className="text-stone-800 font-extrabold tracking-wide">Santhoshkumar B</span>
          </p>
          <span className="hidden md:inline text-stone-300">|</span>
          <p className="text-stone-400 text-xs font-bold">
            © {currentYear} All Rights Reserved
          </p>
        </motion.div>

        {/* Social Icons (SVGs replacing react-icons with matching outline style) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex items-center gap-6"
        >
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/itzsandy05" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-pink-500 transition-colors hover:scale-110 transform duration-300"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* Facebook */}
          <a 
            href="https://www.facebook.com/santhoshkumar2510" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-blue-600 transition-colors hover:scale-110 transform duration-300"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/santhoshkumar-b-18213b129" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-blue-500 transition-colors hover:scale-110 transform duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/919677909533"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-green-500 transition-colors hover:scale-110 transform duration-300"
            aria-label="WhatsApp"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M17.49 15.3a15.5 15.5 0 0 1-1.5 1.5 1.52 1.52 0 0 1-2.2 0l-2.1-2.1a1.52 1.52 0 0 1 0-2.2l.9-.9a.75.75 0 0 0 0-1L10 8a.75.75 0 0 0-1 0l-.9.9a2.72 2.72 0 0 0 0 3.8 23 23 0 0 0 5.6 5.6 2.72 2.72 0 0 0 3.8 0l.9-.9a.75.75 0 0 0 0-1l-2.6-2.6a.77.77 0 0 0-1.1 0z" />
              <path d="M22 12A10 10 0 0 0 12 2 10 10 0 0 0 2 12a9.9 9.9 0 0 0 1.94 5.86L2.5 21.5l3.8-1.4A9.9 9.9 0 0 0 12 22a10 10 0 0 0 10-10z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
