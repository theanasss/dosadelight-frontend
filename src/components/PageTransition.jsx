import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   PAGE TRANSITION CONTEXT
   Used by Navbar to trigger cinematic wipe transitions
   when clicking nav links
═══════════════════════════════════════════════════════════════ */
const TransitionCtx = createContext(null);

export function usePageTransition() {
  return useContext(TransitionCtx);
}

/* The full-screen wipe overlay — slides in from left, then out to right */
const wipeVariants = {
  initial: { scaleX: 0, originX: 0 },
  enter:   { scaleX: 1, originX: 0, transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] } },
  exit:    { scaleX: 0, originX: 1, transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1], delay: 0.08 } },
};

export function PageTransitionProvider({ children }) {
  const [transitioning, setTransitioning] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  /* Call this from the Navbar instead of normal anchor behavior */
  const navigateTo = useCallback((sectionId) => {
    if (transitioning) return;
    setTransitioning(true);
    setActiveSection(sectionId);

    // Wait for wipe to fully cover screen (300ms), then jump-scroll instantly
    setTimeout(() => {
      // Disable smooth-scroll temporarily so the jump is instant
      document.documentElement.classList.add('instant-scroll');
      const el = document.getElementById(sectionId);
      if (el) {
        window.scrollTo({ top: el.offsetTop, behavior: 'instant' });
      }
      // Re-enable smooth-scroll after jump completes
      setTimeout(() => document.documentElement.classList.remove('instant-scroll'), 50);
    }, 300);

    // Wipe reveals the new section (slides away)
    setTimeout(() => {
      setTransitioning(false);
    }, 820);
  }, [transitioning]);

  return (
    <TransitionCtx.Provider value={{ navigateTo, activeSection, transitioning }}>
      {children}

      {/* ── Full-screen cinematic wipe overlay ── */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="page-wipe"
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{ originX: 0 }}
          >
            {/* Main wipe — gold */}
            <motion.div
              className="absolute inset-0"
              variants={wipeVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              style={{
                background: 'linear-gradient(135deg, #3B2418 0%, #5C3A2A 40%, #D9A321 100%)',
                transformOrigin: 'left center',
              }}
            />
            {/* Secondary wipe — maroon, slightly delayed */}
            <motion.div
              className="absolute inset-0"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1, originX: 0, transition: { duration: 0.32, ease: [0.76, 0, 0.24, 1], delay: 0.06 } }}
              exit={{ scaleX: 0, originX: 1, transition: { duration: 0.32, ease: [0.76, 0, 0.24, 1], delay: 0.04 } }}
              style={{
                background: 'linear-gradient(135deg, #7B2D26 0%, #A03D35 60%, #D9A321 100%)',
                transformOrigin: 'left center',
                mixBlendMode: 'multiply',
                opacity: 0.7,
              }}
            />
            {/* Logo / Brand flash in center during wipe */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.2 } }}
              exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.15 } }}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold mx-auto mb-3 flex items-center justify-center shadow-gold-lg"
                  style={{ boxShadow: '0 0 40px rgba(217,163,33,0.8)' }}>
                  <span className="text-3xl">🍽</span>
                </div>
                <p className="font-serif text-2xl font-bold text-gold tracking-wide">Dosa Delight</p>
                <p className="text-gold/60 text-xs tracking-[0.3em] uppercase mt-1">Authentic South Indian</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionCtx.Provider>
  );
}
