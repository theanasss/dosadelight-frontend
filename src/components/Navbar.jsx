import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react';
import { usePageTransition } from './PageTransition';

const navLinks = [
  { label: 'Home',    id: 'home' },
  { label: 'Menu',    id: 'menu' },
  { label: 'Shop',    id: 'shop' },
  { label: 'Recipe',  id: 'recipe' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar({ cartCount, onOpenCart }) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const { navigateTo }              = usePageTransition();

  /* Track scroll position for active link highlight */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Detect which section is in view
      const sections = navLinks.map(l => document.getElementById(l.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveLink(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveLink(id);
    navigateTo(id);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-xl shadow-md py-3 border-b border-gold/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <motion.a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.03 }}
        >
          <div className="relative w-11 h-11 bg-gradient-to-br from-green-dark to-leaf rounded-full flex items-center justify-center shadow-md">
            <Leaf className="w-5 h-5 text-white" fill="currentColor" />
            <div className="absolute inset-0 rounded-full border-2 border-green-dark/40 animate-spin-slow" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-gold-gradient block leading-none">
              Dosa Delight
            </span>
            <span className="text-[10px] tracking-[0.25em] text-green-dark/90 uppercase font-semibold">
              Authentic South Indian
            </span>
          </div>
        </motion.a>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => {
            const isActive = activeLink === link.id;
            return (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className={`relative px-4 py-2 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 group ${
                  isActive ? 'text-white' : 'text-brown/80 hover:text-green-dark'
                }`}
              >
                {/* Active pill background */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-green-dark"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {link.label}

                {/* Hover underline for non-active */}
                {!isActive && (
                  <span className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-green-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* ── Cart + Mobile toggle ── */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            aria-label="Open Shopping Cart"
            className="relative p-2.5 rounded-full bg-green-dark/10 border border-green-dark/30 transition-all hover:bg-green-dark/20 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 text-green-dark" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-maroon text-white text-xs rounded-full flex items-center justify-center font-bold shadow"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(p => !p)}
          >
            {mobileOpen
              ? <X className="w-6 h-6 text-brown" />
              : <Menu className="w-6 h-6 text-brown" />
            }
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-cream/95 backdrop-blur-xl border-t border-gold/20 shadow-xl"
          >
            <div className="px-6 py-5 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeLink === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all ${
                      isActive
                        ? 'bg-green-dark text-white'
                        : 'text-brown/80 hover:text-green-dark hover:bg-green-dark/5'
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    {link.label}
                  </a>
                );
              })}

              {/* Mobile View Cart Button */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCart && onOpenCart();
                }}
                className="flex items-center justify-between py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-green-dark to-leaf text-white shadow-lg mt-2 transition-transform active:scale-98"
              >
                <span className="flex items-center gap-2 text-sm">
                  <ShoppingCart className="w-4 h-4" /> View Shopping Cart
                </span>
                <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full text-xs font-extrabold">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
