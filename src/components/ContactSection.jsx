import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

/* ── Inline SVG social icons ── */
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const contactDetails = [
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 80972 63504',
    sub: 'Open daily 7 AM – 11 PM',
    href: 'tel:+918097263504',
    accent: '#D9A321',
    emoji: '📞',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'dosa.delight28@gmail.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:dosa.delight28@gmail.com',
    accent: '#7B2D26',
    emoji: '✉️',
  },
  {
    icon: MapPin,
    label: 'Find Us',
    value: '12, Anna Nagar, Chennai – 600 040',
    sub: 'Tamil Nadu, India',
    href: 'https://maps.google.com',
    accent: '#3F7D3A',
    emoji: '📍',
  },
];

const socialLinks = [
  {
    Icon: FacebookIcon,
    label: 'Facebook',
    handle: '@DosaDelightOfficial',
    href: 'https://facebook.com',
    color: '#1877F2',
    bg: '#E8F0FE',
  },
  {
    Icon: InstagramIcon,
    label: 'Instagram',
    handle: '@dosa.delight_',
    href: 'https://www.instagram.com/dosa.delight_/',
    color: '#E1306C',
    bg: '#FDE8EF',
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="contact" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #3B2418 0%, #2A1810 100%)' }}>

      {/* Kolam BG subtle */}
      <div className="absolute inset-0 kolam-bg opacity-5 pointer-events-none" />

      {/* Gold accent blob top */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(217,163,33,0.15) 0%, transparent 70%)' }} />

      <div ref={ref} className="max-w-5xl mx-auto px-6">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold/40" />
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold/10 text-gold border border-gold/25">
              🌿 Get In Touch
            </span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-cream leading-tight">
            Contact <span className="text-gold-gradient">Us</span>
          </h2>
          <p className="text-cream/50 text-lg mt-4 max-w-md mx-auto">
            We'd love to hear from you — visit us, call us, or follow us on social media.
          </p>
        </motion.div>

        {/* ── Contact Cards ── */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactDetails.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6, boxShadow: `0 20px 40px ${item.accent}25` }}
                className="group flex flex-col items-center text-center gap-4 p-8 rounded-3xl cursor-pointer transition-all duration-300"
                style={{
                  background: 'rgba(255,248,237,0.05)',
                  border: `1px solid ${item.accent}25`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${item.accent}20`, border: `2px solid ${item.accent}40` }}>
                  {item.emoji}
                </div>

                {/* Label */}
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: item.accent }}>
                    {item.label}
                  </p>
                  <p className="font-serif text-base font-semibold text-cream leading-snug">
                    {item.value}
                  </p>
                  <p className="text-cream/40 text-xs mt-1">{item.sub}</p>
                </div>

                {/* Hover underline */}
                <div className="h-0.5 w-0 group-hover:w-12 rounded-full transition-all duration-300"
                  style={{ background: item.accent }} />
              </motion.a>
            );
          })}
        </div>

        {/* ── Social Media ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-16 bg-gold/30" />
            <span className="text-cream/40 text-xs tracking-widest uppercase font-medium">Follow Us</span>
            <div className="h-px w-16 bg-gold/30" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {socialLinks.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 min-w-[220px]"
                style={{
                  background: 'rgba(255,248,237,0.07)',
                  border: `1px solid ${s.color}30`,
                }}
              >
                {/* Platform icon circle */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: s.color, color: '#fff' }}>
                  <s.Icon />
                </div>
                <div>
                  <p className="text-cream font-bold text-sm">{s.label}</p>
                  <p className="text-cream/50 text-xs">{s.handle}</p>
                </div>
                {/* Arrow */}
                <div className="ml-auto text-cream/30 text-lg">→</div>
              </motion.a>
            ))}
          </div>

          {/* Decorative bottom divider */}
          <div className="mt-8 flex items-center gap-4 opacity-30">
            <div className="h-px flex-1 bg-gold/30" />
            <svg viewBox="0 0 60 20" className="w-16 h-5 fill-gold opacity-60">
              <path d="M30 0 L35 10 L60 10 L40 14 L47 20 L30 13 L13 20 L20 14 L0 10 L25 10 Z"/>
            </svg>
            <div className="h-px flex-1 bg-gold/30" />
          </div>

          <p className="text-cream/25 text-xs text-center">
            © 2025 Dosa Delight. All rights reserved.
            Crafted with ❤️ in South India.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
