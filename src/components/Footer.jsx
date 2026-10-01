import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Phone, Mail, MapPin, Clock } from 'lucide-react';

/* Inline SVG social icons (lucide doesn't bundle these) */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M4 4l4.5 5.5L4 20h2l3.5-4.5L13 20h5l-4.5-5.5L18 4h-2l-3 4L9 4z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);

const quickLinks = ['Home', 'Menu', 'About', 'Gallery', 'Contact'];
const menuLinks = ['Masala Dosa', 'Ghee Roast', 'Neer Dosa', 'Pesarattu', 'Sambar & Chutneys'];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('https://dosadelight-backend.onrender.com/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #2D1A10 0%, #1A0E08 100%)' }}>
      {/* Top gold line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Kolam top decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 opacity-30">
        <div className="kolam-bg h-full" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 right-10 opacity-5 w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#D9A321" strokeWidth="1"/>
          <circle cx="50" cy="50" r="35" fill="none" stroke="#D9A321" strokeWidth="1"/>
          <circle cx="50" cy="50" r="22" fill="none" stroke="#D9A321" strokeWidth="1"/>
          <line x1="2" y1="50" x2="98" y2="50" stroke="#D9A321" strokeWidth="0.5"/>
          <line x1="50" y1="2" x2="50" y2="98" stroke="#D9A321" strokeWidth="0.5"/>
          <line x1="16" y1="16" x2="84" y2="84" stroke="#D9A321" strokeWidth="0.5"/>
          <line x1="84" y1="16" x2="16" y2="84" stroke="#D9A321" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center shadow-gold">
                <Leaf className="w-4 h-4 text-brown" fill="currentColor" />
              </div>
              <div>
                <p className="font-serif text-xl font-bold text-gold leading-none">Dosa Delight</p>
                <p className="text-[9px] tracking-[0.2em] text-gold/50 uppercase">Authentic South Indian</p>
              </div>
            </div>
            <p className="text-cream/50 text-sm leading-relaxed mb-5">
              Celebrating the timeless art of the South Indian dosa — crafted from stone-ground batter, 
              fermented overnight, and served with love since 2009.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
              { Icon: InstagramIcon, label: 'Instagram', url: 'https://www.instagram.com/dosa.delight_/' },
              { Icon: FacebookIcon, label: 'Facebook', url: '#' },
              { Icon: TwitterIcon, label: 'Twitter', url: '#' },
              { Icon: YoutubeIcon, label: 'YouTube', url: '#' },
            ].map(({ Icon, label, url }) => (
                <motion.a
                  key={label}
                  href={url}
                  target={url !== '#' ? '_blank' : undefined}
                  rel={url !== '#' ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-gold/25 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-gold font-semibold mb-5 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-cream/55 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Menu */}
          <div>
            <h4 className="font-serif text-gold font-semibold mb-5 text-sm tracking-wider uppercase">
              Popular Dishes
            </h4>
            <ul className="space-y-3">
              {menuLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#menu"
                    className="text-cream/55 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-serif text-gold font-semibold mb-5 text-sm tracking-wider uppercase">
              Find Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-cream/55 text-sm leading-relaxed">
                  12, Gandhi Nagar, 1st Cross,<br />Bangalore — 560 009
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+918097263504" className="text-cream/55 hover:text-gold text-sm transition-colors">
                  +91 80972 63504
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:dosa.delight28@gmail.com" className="text-cream/55 hover:text-gold text-sm transition-colors">
                  dosa.delight28@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <div className="text-cream/55 text-sm">
                  <p>Mon – Sat: 7:00 AM – 10:00 PM</p>
                  <p>Sun: 7:00 AM – 11:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter strip */}
        <div className="rounded-2xl border border-gold/20 bg-gold/5 px-6 py-5 mb-10 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div>
            <p className="font-serif text-gold font-semibold">Get ₹50 off your first order!</p>
            <p className="text-cream/50 text-xs mt-0.5">Subscribe for exclusive offers and new additions.</p>
          </div>
          <form 
            onSubmit={handleSubscribe} 
            className="flex flex-col md:flex-row gap-2 w-full md:w-auto"
          >
            <div className="flex gap-2 w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-full bg-white/10 border border-gold/25 text-cream placeholder-cream/30 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="btn-primary px-5 py-2.5 text-sm whitespace-nowrap disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Subscribe'}
              </button>
            </div>
            {status === 'success' && <p className="text-green-400 text-xs mt-1">Successfully subscribed!</p>}
            {status === 'error' && <p className="text-red-400 text-xs mt-1">Something went wrong. Try again.</p>}
          </form>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/35 text-xs text-center sm:text-left">
            © 2025 Dosa Delight. All rights reserved. Made with ❤️ in South India.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'FSSAI License'].map((item) => (
              <a key={item} href="#" className="text-cream/35 hover:text-gold/70 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
