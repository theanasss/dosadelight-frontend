import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const chutneys = [
  {
    id: 1,
    name: 'Coconut Chutney',
    nameLocal: 'தேங்காய் சட்னி',
    desc: 'Fresh grated coconut blended with roasted chana dal, green chillies, ginger, tempered with mustard seeds and curry leaves in coconut oil.',
    ingredients: ['Fresh Coconut', 'Roasted Chana', 'Green Chilli', 'Curry Leaves', 'Mustard'],
    color: '#F5F0E8',
    textColor: '#3B2418',
    accentColor: '#D9A321',
    emoji: '🥥',
    gradient: 'from-amber-50 to-yellow-50',
    borderColor: 'border-amber-200',
    tagBg: 'bg-amber-100 text-amber-800',
  },
  {
    id: 2,
    name: 'Tomato Chutney',
    nameLocal: 'தக்காளி சட்னி',
    desc: 'Tangy red tomatoes slow-cooked with onions, dried red chillies, garlic and tamarind, finished with a sizzling tempering of curry leaves.',
    ingredients: ['Roma Tomatoes', 'Red Chilli', 'Garlic', 'Tamarind', 'Curry Leaves'],
    color: '#C0392B',
    textColor: '#ffffff',
    accentColor: '#F0C84A',
    emoji: '🍅',
    gradient: 'from-red-900 to-maroon',
    borderColor: 'border-red-700',
    tagBg: 'bg-red-800/50 text-red-100',
    dark: true,
  },
  {
    id: 3,
    name: 'Mint Chutney',
    nameLocal: 'புதினா சட்னி',
    desc: 'Vibrant green chutney with fresh mint, coriander, coconut, lime juice and a hint of green chilli. Cool, refreshing and aromatic.',
    ingredients: ['Fresh Mint', 'Coriander', 'Coconut', 'Lime', 'Green Chilli'],
    color: '#3F7D3A',
    textColor: '#ffffff',
    accentColor: '#F0C84A',
    emoji: '🌿',
    gradient: 'from-green-900 to-green-700',
    borderColor: 'border-green-600',
    tagBg: 'bg-green-800/50 text-green-100',
    dark: true,
  },
  {
    id: 4,
    name: 'Sambar',
    nameLocal: 'சாம்பார்',
    desc: 'Slow-simmered toor dal with seasonal vegetables, tamarind, tomatoes and a house-blend sambar masala. Rich, tangy and deeply comforting.',
    ingredients: ['Toor Dal', 'Drumstick', 'Tomato', 'Tamarind', 'Sambar Masala'],
    color: '#8B4513',
    textColor: '#ffffff',
    accentColor: '#F0C84A',
    emoji: '🍲',
    gradient: 'from-amber-900 to-brown',
    borderColor: 'border-amber-700',
    tagBg: 'bg-amber-800/50 text-amber-100',
    dark: true,
  },
];

/* Decorative bowl SVG */
function BowlIllustration({ color, emoji }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 120, height: 100 }}>
      <svg viewBox="0 0 120 100" className="absolute inset-0 w-full h-full">
        {/* Shadow */}
        <ellipse cx="60" cy="92" rx="45" ry="7" fill="rgba(0,0,0,0.15)" />
        {/* Bowl body */}
        <path d="M15 48 Q15 90 60 90 Q105 90 105 48 Z" fill={color} opacity="0.9" />
        <path d="M15 48 Q15 90 60 90 Q105 90 105 48 Z" fill="url(#bowlShine)" />
        {/* Rim */}
        <ellipse cx="60" cy="48" rx="45" ry="13" fill={color} />
        <ellipse cx="60" cy="48" rx="45" ry="13" fill="none" stroke="#F0C84A" strokeWidth="1.5" opacity="0.6" />
        {/* Content surface */}
        <ellipse cx="60" cy="47" rx="38" ry="10" fill={color} opacity="0.7" />
        {/* Highlight */}
        <ellipse cx="45" cy="44" rx="12" ry="4" fill="white" opacity="0.08" transform="rotate(-15 45 44)" />
        {/* Handle suggestion */}
        <path d="M105 60 Q118 60 118 70 Q118 80 105 78" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
        <defs>
          <linearGradient id="bowlShine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="black" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      <span className="relative z-10 text-3xl mt-2">{emoji}</span>
    </div>
  );
}

export default function Chutneys() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="gallery" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #FFF8ED 0%, #FFF0D0 100%)' }}>
      {/* Kolam background */}
      <div className="absolute inset-0 kolam-bg-subtle opacity-50 pointer-events-none" />

      {/* Banana leaf decorations */}
      <div className="absolute top-0 left-0 w-48 h-96 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 300" className="w-full h-full" fill="#3F7D3A">
          <path d="M50 0 Q80 50 70 100 Q90 150 60 200 Q80 250 50 300 Q20 250 40 200 Q10 150 30 100 Q20 50 50 0Z" />
          <path d="M50 20 Q55 80 52 150 Q50 220 50 280" stroke="#5BA054" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-48 h-96 opacity-10 pointer-events-none" style={{ transform: 'scaleX(-1)' }}>
        <svg viewBox="0 0 100 300" className="w-full h-full" fill="#3F7D3A">
          <path d="M50 0 Q80 50 70 100 Q90 150 60 200 Q80 250 50 300 Q20 250 40 200 Q10 150 30 100 Q20 50 50 0Z" />
        </svg>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-green/10 text-green border border-green/25 mb-4"
          >
            🫙 Signature Accompaniments
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-brown mb-4"
          >
            The Art of <span className="text-gold-gradient">Chutneys</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-gold text-xl">✦</span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gold/50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-brown/60 max-w-xl mx-auto"
          >
            Every dosa is incomplete without its companions. Our chutneys are ground fresh 
            every morning using traditional recipes.
          </motion.p>
        </div>

        {/* Chutney Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chutneys.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -3 : 3 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, rotate: i % 2 === 0 ? -1 : 1, scale: 1.03 }}
              className={`group rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 ${c.dark ? '' : 'bg-white'} flex flex-col`}
              style={c.dark ? { background: c.color } : {}}
            >
              {/* Bowl visual */}
              <div className={`py-8 flex flex-col items-center bg-gradient-to-br ${c.dark ? 'from-black/20 to-transparent' : 'from-amber-50 to-cream'}`}>
                <BowlIllustration color={c.dark ? 'rgba(255,255,255,0.2)' : c.color} emoji={c.emoji} />
              </div>

              {/* Text content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className={`font-serif text-xl font-bold mb-0.5 ${c.dark ? 'text-white' : 'text-brown'}`}>
                    {c.name}
                  </h3>
                  <p className={`text-xs font-medium tracking-wider ${c.dark ? 'text-white/50' : 'text-gold-dark'}`}>
                    {c.nameLocal}
                  </p>
                </div>

                <p className={`text-sm leading-relaxed ${c.dark ? 'text-white/70' : 'text-brown/60'}`}>
                  {c.desc}
                </p>

                {/* Ingredients */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {c.ingredients.map((ing) => (
                    <span key={ing} className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${c.tagBg}`}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Serving note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center glass-card rounded-2xl px-8 py-5 max-w-2xl mx-auto border border-gold/20"
        >
          <p className="text-brown/80 text-sm">
            <span className="font-semibold text-gold">🪔 House Tradition:</span>{' '}
            Every dosa order is served with two chutneys and sambar complimentary.
            All chutneys are stone-ground fresh every morning.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
