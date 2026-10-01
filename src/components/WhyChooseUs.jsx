import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Clock, Star, Truck, Award } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    emoji: '🌿',
    title: 'Fresh Stone-Ground Batter',
    desc: 'Our batter is ground fresh daily on traditional granite stone mills. Naturally fermented for 12–16 hours for the perfect sour tang and crispy texture.',
    color: 'from-green/20 to-green/5',
    border: 'border-green/30',
    iconColor: 'text-green',
    iconBg: 'bg-green/15',
  },
  {
    icon: Award,
    emoji: '🏆',
    title: 'Traditional Taste',
    desc: 'Recipes passed down through three generations of South Indian culinary tradition. Authentic spices sourced directly from Kerala and Tamil Nadu.',
    color: 'from-gold/20 to-gold/5',
    border: 'border-gold/30',
    iconColor: 'text-gold-dark',
    iconBg: 'bg-gold/15',
  },
  {
    icon: Truck,
    emoji: '🛵',
    title: 'Fast Delivery',
    desc: 'Hot dosas delivered to your doorstep within 30 minutes. Our insulated packaging keeps your food crispy and warm, just like it came off the tawa.',
    color: 'from-maroon/15 to-maroon/5',
    border: 'border-maroon/20',
    iconColor: 'text-maroon',
    iconBg: 'bg-maroon/10',
  },
  {
    icon: Star,
    emoji: '⭐',
    title: 'Authentic South Indian',
    desc: 'Coconut oil tempering, curry leaf seasoning, hand-rolled idlis and pure ghee roasting. Every element is unmistakably, unapologetically South Indian.',
    color: 'from-brown/10 to-brown/3',
    border: 'border-brown/20',
    iconColor: 'text-brown',
    iconBg: 'bg-brown/10',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3B2418 0%, #5C3A2A 100%)' }}>
      {/* Decorative kolam overlay */}
      <div className="absolute inset-0 kolam-bg opacity-10 pointer-events-none" />

      {/* Top ornament */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Floating background elements */}
      <div className="absolute top-10 right-20 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #D9A321, transparent)' }} />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #3F7D3A, transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold/15 text-gold border border-gold/30 mb-4"
          >
            ✦ Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4"
          >
            Crafted with <span className="text-shimmer">Love & Heritage</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-gold text-xl">✦</span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gold/50" />
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative rounded-3xl p-7 border glass-dark backdrop-blur-sm ${f.border} overflow-hidden group cursor-default`}
            >
              {/* Gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${f.iconBg} flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {f.emoji}
                </div>

                <h3 className="font-serif text-lg font-bold text-cream mb-3 leading-tight">
                  {f.title}
                </h3>
                <p className="text-cream/55 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>

              {/* Corner ornament */}
              <div className="absolute bottom-3 right-3 opacity-20">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="#D9A321" strokeWidth="1"/>
                  <circle cx="12" cy="12" r="6" fill="none" stroke="#D9A321" strokeWidth="1"/>
                  <line x1="12" y1="2" x2="12" y2="22" stroke="#D9A321" strokeWidth="0.5"/>
                  <line x1="2" y1="12" x2="22" y2="12" stroke="#D9A321" strokeWidth="0.5"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats band */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '15+', label: 'Years of Excellence' },
            { value: '50+', label: 'Dosa Varieties' },
            { value: '15K+', label: 'Happy Customers' },
            { value: '100%', label: 'Pure Vegetarian' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center py-5 px-4 rounded-2xl border border-gold/20 bg-white/5">
              <p className="font-serif text-3xl font-bold text-gold mb-1">{value}</p>
              <p className="text-cream/60 text-sm">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom ornament */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </section>
  );
}
