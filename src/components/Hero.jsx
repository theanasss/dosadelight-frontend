import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, Star, ChevronLeft, ChevronRight, Flame } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   ALL 10 MENU DOSAS — full data for the orbital carousel
═══════════════════════════════════════════════════════════════ */
const ALL_DOSAS = [
  {
    id: 0,
    name: 'Plain Dosa',
    subtitle: 'Sada / Khali',
    price: '₹79',
    rating: 4.7,
    reviews: '1.2K',
    tag: 'Classic',
    description: 'Classic thin crispy rice crepe, perfectly fermented batter cooked on a seasoned iron griddle. Light, crispy and golden.',
    image: '/images/plain_dosa.png',
    accent: '#3F7D3A',
    accentDark: '#2D5C29',
    spice: 0,
  },
  {
    id: 1,
    name: 'Masala Dosa',
    subtitle: 'With Potato Filling',
    price: '₹119',
    rating: 4.9,
    reviews: '3.8K',
    tag: 'Bestseller',
    description: 'Golden crispy dosa folded around a spiced potato & onion masala. Served with coconut chutney and sambar.',
    image: '/images/masala_dosa.png',
    accent: '#D9A321',
    accentDark: '#B8861A',
    spice: 1,
  },
  {
    id: 2,
    name: 'Mysore Masala Dosa',
    subtitle: 'Spicy Red Chutney',
    price: '₹139',
    rating: 4.8,
    reviews: '2.1K',
    tag: 'Spicy',
    description: 'Dosa smeared with fiery Mysore red chutney inside, filled with spiced potato masala. Bold Karnataka flavors.',
    image: '/images/mysore_masala_dosa.png',
    accent: '#C0392B',
    accentDark: '#922B21',
    spice: 3,
  },
  {
    id: 3,
    name: 'Ghee Roast Dosa',
    subtitle: 'Pure Desi Ghee',
    price: '₹149',
    rating: 4.9,
    reviews: '1.7K',
    tag: 'Premium',
    description: 'Roasted in generous pure desi ghee until irresistibly crispy. Rich, buttery and deeply aromatic.',
    image: '/images/ghee_roast_dosa.png',
    accent: '#7B2D26',
    accentDark: '#5A1F1A',
    spice: 0,
  },
  {
    id: 4,
    name: 'Neer Dosa',
    subtitle: 'Coastal Karnataka',
    price: '₹99',
    rating: 4.6,
    reviews: '870',
    tag: 'Light',
    description: 'Delicate paper-thin white rice crepes with soft lacy texture. A coastal Karnataka specialty.',
    image: '/images/neer_dosa.png',
    accent: '#1A8DA8',
    accentDark: '#147A91',
    spice: 0,
  },
  {
    id: 5,
    name: 'Benne Dosa',
    subtitle: 'Davangere Butter',
    price: '₹129',
    rating: 4.8,
    reviews: '1.3K',
    tag: 'Must Try',
    description: 'Thick, soft-inside crispy-outside dosa loaded with white butter. A Davangere classic.',
    image: '/images/benne_dosa.png',
    accent: '#C27C0E',
    accentDark: '#9A6309',
    spice: 1,
  },
  {
    id: 6,
    name: 'Adai Dosa',
    subtitle: 'Multi-Lentil Crepe',
    price: '₹109',
    rating: 4.5,
    reviews: '640',
    tag: 'Protein Rich',
    description: 'Thick protein-rich dosa from rice and multiple lentils, spiced with pepper, cumin and curry leaves.',
    image: '/images/adai_dosa.png',
    accent: '#E67E22',
    accentDark: '#CA6F1E',
    spice: 2,
  },
  {
    id: 7,
    name: 'Pesarattu',
    subtitle: 'Green Moong Dal',
    price: '₹109',
    rating: 4.6,
    reviews: '720',
    tag: 'Healthy',
    description: 'Vibrant green crepe from whole moong dal — earthy, nutritious and satisfying. An Andhra Pradesh classic.',
    image: '/images/pesarattu.png',
    accent: '#27AE60',
    accentDark: '#1E8449',
    spice: 1,
  },
  {
    id: 8,
    name: 'Cheese / Paneer Dosa',
    subtitle: 'Fusion Delight',
    price: '₹169',
    rating: 4.7,
    reviews: '1.5K',
    tag: 'Fusion',
    description: 'Crispy dosa filled with creamy melted cheese and spiced paneer stuffing. Modern twist on a classic.',
    image: '/images/cheese_paneer_dosa.png',
    accent: '#8E44AD',
    accentDark: '#6C3483',
    spice: 1,
  },
  {
    id: 9,
    name: 'Schezwan Dosa',
    subtitle: 'Indo-Chinese Fusion',
    price: '₹159',
    rating: 4.6,
    reviews: '980',
    tag: 'Spicy Fusion',
    description: 'Spicy Schezwan sauce slathered inside a crispy dosa with stir-fried veggies. Bold Indo-Chinese fusion.',
    image: '/images/onion_dosa.png',
    accent: '#E74C3C',
    accentDark: '#CB4335',
    spice: 3,
  },
];

const N = ALL_DOSAS.length; // 10

/* ── Spice dots ── */
const SpiceDots = ({ level, accent }) => (
  <div className="flex items-center gap-0.5">
    {[0, 1, 2].map(i => (
      <Flame key={i} className="w-3 h-3"
        style={{ color: i < level ? accent : '#d0c8b8', opacity: i < level ? 1 : 0.4 }}
        fill={i < level ? accent : 'none'} />
    ))}
  </div>
);

/* ── Curry leaf SVG ── */
const CurryLeaf = ({ style = {}, size = 28 }) => (
  <svg viewBox="0 0 40 80" style={{ width: size, height: size * 2, ...style }} fill="none">
    <path d="M20 75C20 75 2 55 2 35C2 15 12 5 20 5C28 5 38 15 38 35C38 55 20 75 20 75Z"
      fill="#3F7D3A" opacity="0.85" />
    <path d="M20 10C20 10 6 28 6 38C6 48 12 56 20 70" stroke="#5BA054"
      strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M20 20C20 20 28 30 30 36" stroke="#5BA054" strokeWidth="1" strokeLinecap="round" fill="none" />
    <path d="M20 30C20 30 10 38 9 44" stroke="#5BA054" strokeWidth="1" strokeLinecap="round" fill="none" />
  </svg>
);

/* ── Vinyl groove overlay ── */
const DiscGrooves = () => (
  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
    {[20, 40, 60, 75, 88].map(r => (
      <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
    ))}
    <circle cx="100" cy="100" r="8" fill="rgba(255,255,255,0.25)" />
    <circle cx="100" cy="100" r="3" fill="rgba(255,255,255,0.5)" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   HERO COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Hero({ onAddToCart, cartItems = [] }) {
  // Start at Masala Dosa (index 1) as default "featured"
  const [active, setActive]           = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [wheelAngle, setWheelAngle]   = useState(0);
  const [discAngle, setDiscAngle]     = useState(0);
  const [spinSpeed, setSpinSpeed]     = useState(22);
  const [textDir, setTextDir]         = useState(1);

  const animFrameRef  = useRef(null);
  const lastTimeRef   = useRef(null);
  const spinRef       = useRef(spinSpeed);
  spinRef.current     = spinSpeed;

  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  /* ── Continuous disc spin via rAF ── */
  useEffect(() => {
    let running = true;
    const tick = (ts) => {
      if (!running) return;
      if (lastTimeRef.current) {
        const dt = ts - lastTimeRef.current;
        setDiscAngle(prev => prev + (360 / (spinRef.current * 1000)) * dt);
      }
      lastTimeRef.current = ts;
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(animFrameRef.current); };
  }, []);

  /* ── Burst spin on switch ── */
  const burstSpin = () => {
    setSpinSpeed(1.2);
    setTimeout(() => setSpinSpeed(22), 900);
  };

  /* ── Select a specific dosa by index ── */
  const selectDosa = useCallback((nextIdx) => {
    if (isAnimating) return;
    nextIdx = ((nextIdx % N) + N) % N;
    if (nextIdx === active) return;

    setIsAnimating(true);
    const diff = ((nextIdx - active) + N) % N;
    const dir  = diff <= N / 2 ? 1 : -1;
    setTextDir(dir);
    // Rotate wheel so the chosen item moves to "bottom" (the featured slot)
    setWheelAngle(prev => prev - dir * diff * (360 / N));
    burstSpin();
    setActive(nextIdx);
    setTimeout(() => setIsAnimating(false), 900);
  }, [active, isAnimating]);

  /* ── Tap thumbnail → go to NEXT dosa in sequence ── */
  const handleThumbnailTap = useCallback((tappedIdx) => {
    // Go to the next one after this tap, cycling through all
    const nextIdx = (tappedIdx + 1) % N;
    selectDosa(nextIdx);
  }, [selectDosa]);

  const goNext = () => selectDosa((active + 1) % N);
  const goPrev = () => selectDosa((active - 1 + N) % N);

  const dosa = ALL_DOSAS[active];

  /* ── Thumbnail positions on orbit ring ── */
  // ORBIT_R drives positioning via inline style, responsive to container size
  const ORBIT_R = 185;
  const thumbPositions = ALL_DOSAS.map((_, i) => {
    const angleDeg = (i * 360) / N + wheelAngle;
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: ORBIT_R * Math.sin(rad),
      y: -ORBIT_R * Math.cos(rad),
    };
  });

  /* How close each thumb is to the "bottom" (featured) position */
  const thumbScale = ALL_DOSAS.map((_, i) => {
    const normalised = ((i - active) + N) % N;
    const dist = Math.min(normalised, N - normalised); // 0 = active, up to N/2
    return i === active ? 0 : Math.max(0.7, 1 - dist * 0.04);
  });

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF8ED 0%, #FFF0D0 55%, #FFE8B8 100%)' }}
    >
      {/* Kolam BG */}
      <div className="absolute inset-0 kolam-bg opacity-30 pointer-events-none" />

      {/* Colour blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
          animate={{ background: `radial-gradient(circle, ${dosa.accent}28 0%, transparent 70%)` }}
          transition={{ duration: 0.9 }}
          style={{ filter: 'blur(50px)' }}
        />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-12"
          style={{ background: 'radial-gradient(circle, #7B2D26 0%, transparent 70%)' }} />

        {/* Kolam accent top-left */}
        <svg className="absolute top-16 left-6 opacity-10 w-24 h-24" viewBox="0 0 100 100">
          {[42, 30, 18, 6].map(r => (
            <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#D9A321" strokeWidth="0.7" />
          ))}
          <line x1="50" y1="8" x2="50" y2="92" stroke="#D9A321" strokeWidth="0.5" />
          <line x1="8" y1="50" x2="92" y2="50" stroke="#D9A321" strokeWidth="0.5" />
          <line x1="21" y1="21" x2="79" y2="79" stroke="#D9A321" strokeWidth="0.5" />
          <line x1="79" y1="21" x2="21" y2="79" stroke="#D9A321" strokeWidth="0.5" />
        </svg>
      </div>

      {/* ════════════════════════════════════════════
          MAIN GRID
      ════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 py-28 w-full grid lg:grid-cols-2 gap-8 items-center">

        {/* ══ LEFT TEXT PANEL ══ */}
        <div className="flex flex-col gap-5 z-10">

          {/* Top badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block self-start px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-maroon/10 text-maroon border border-maroon/20"
          >
            🌿 Authentic South Indian Cuisine
          </motion.span>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] text-brown"
          >
            Taste the{' '}
            <span className="text-gold-gradient">Soul of</span>
            <br />
            <motion.span
              className="italic"
              animate={{ color: dosa.accent }}
              transition={{ duration: 0.5 }}
            >
              South India
            </motion.span>
          </motion.h1>

          {/* ── Animated dish info block ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`panel-${active}`}
              initial={{ opacity: 0, x: textDir < 0 ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: textDir < 0 ? 40 : -40 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3"
            >
              {/* Name + tag */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-serif text-2xl font-bold" style={{ color: dosa.accent }}>
                  {dosa.name}
                </span>
                <span className="px-3 py-0.5 rounded-full text-[11px] font-bold border"
                  style={{ borderColor: dosa.accent + '55', color: dosa.accent, background: dosa.accent + '14' }}>
                  {dosa.tag}
                </span>
              </div>

              {/* Subtitle + spice */}
              <div className="flex items-center gap-3">
                <span className="text-brown/50 text-sm">{dosa.subtitle}</span>
                <SpiceDots level={dosa.spice} accent={dosa.accent} />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4"
                    fill={i < Math.round(dosa.rating) ? '#D9A321' : 'none'}
                    style={{ color: i < Math.round(dosa.rating) ? '#D9A321' : '#ccc' }} />
                ))}
                <span className="text-sm font-bold text-brown ml-1">{dosa.rating}</span>
                <span className="text-xs text-brown/40">({dosa.reviews} reviews)</span>
              </div>

              {/* Description */}
              <p className="text-brown/60 text-sm leading-relaxed max-w-md">{dosa.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold" style={{ color: dosa.accentDark }}>
                  {dosa.price}
                </span>
                <span className="text-brown/40 text-sm">per plate</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stats */}
          <div className="flex gap-8 py-3 border-y border-brown/10">
            {[{ num: '10+', label: 'Varieties' }, { num: '15K+', label: 'Guests' }, { num: '4.9★', label: 'Rating' }].map(({ num, label }) => (
              <div key={label}>
                <p className="font-serif text-2xl font-bold text-green-dark">{num}</p>
                <p className="text-brown/50 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={() => onAddToCart && onAddToCart(dosa.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary flex items-center gap-2 cursor-pointer"
            >
              Order Now <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.a href="#menu" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="btn-outline">
              Explore Menu
            </motion.a>
          </div>

          {/* ── Dosa counter + prev/next ── */}
          <div className="flex items-center gap-3 mt-1">
            <button onClick={goPrev}
              className="w-8 h-8 rounded-full border-2 border-green-dark/30 flex items-center justify-center text-green-dark hover:border-green-dark hover:bg-green-dark/10 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dot strip — shows all 10 as tiny dots with active pill */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-[180px] py-1">
              {ALL_DOSAS.map((d, i) => (
                <button key={i} onClick={() => selectDosa(i)}
                  title={d.name}
                  className="flex-shrink-0 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 24 : 7,
                    height: 7,
                    background: i === active ? dosa.accent : '#155D2730',
                    border: `1.5px solid ${i === active ? dosa.accent : 'transparent'}`,
                  }}
                />
              ))}
            </div>

            <button onClick={goNext}
              className="w-8 h-8 rounded-full border-2 border-green-dark/30 flex items-center justify-center text-green-dark hover:border-green-dark hover:bg-green-dark/10 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="text-xs text-brown/40 ml-1 whitespace-nowrap">{active + 1} / {N}</span>
          </div>
        </div>

        {/* ══ RIGHT: Spinning Disc + Orbital Ring ══ */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.85 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="flex items-center justify-center lg:justify-end z-10"
        >
          <div
            className="relative flex items-center justify-center select-none"
            style={{ width: 'min(480px, 88vw)', height: 'min(480px, 88vw)' }}
          >
            {/* Ambient glow */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              animate={{ background: `radial-gradient(circle, ${dosa.accent}26 0%, transparent 68%)` }}
              transition={{ duration: 0.8 }}
              style={{ width: '85%', height: '85%', filter: 'blur(35px)' }}
            />

            {/* ── ORBIT DASHED RING — rotates with wheel ── */}
            <motion.div
              className="absolute rounded-full"
              animate={{ rotate: wheelAngle }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '93%', height: '93%',
                border: '1.5px dashed rgba(217,163,33,0.4)',
              }}
            >
              {/* Accent dots evenly around ring */}
              {[...Array(10)].map((_, k) => (
                <div key={k}
                  className="absolute rounded-full bg-gold"
                  style={{
                    width: 4, height: 4,
                    top: '50%', left: '50%',
                    transform: `rotate(${k * 36}deg) translateY(-46.5%) translate(-50%, -50%)`,
                    boxShadow: '0 0 5px rgba(217,163,33,0.7)',
                  }}
                />
              ))}
            </motion.div>

            {/* ── COUNTER-ROTATING INNER RING ── */}
            <motion.div
              className="absolute rounded-full"
              animate={{ rotate: -wheelAngle * 0.4 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '79%', height: '79%',
                border: '1px dotted rgba(123,45,38,0.3)',
              }}
            />

            {/* ── GOLD PLATE RIM (spinning) ── */}
            <div className="ring-inner absolute rounded-full"
              style={{
                width: '68%', height: '68%',
                background: 'conic-gradient(from 0deg, #D9A321, #F0C84A, #B8861A, #F0C84A, #D9A321)',
                padding: '4px',
              }}>
              <div className="w-full h-full rounded-full"
                style={{ background: 'linear-gradient(135deg, #FFF8ED, #FFF0D0)' }} />
            </div>

            {/* ══════════════════════════════════════════
                CENTER DISC — spinning dosa plate
            ══════════════════════════════════════════ */}
            <div
              className="absolute rounded-full overflow-hidden z-20"
              style={{
                width: '61%', height: '61%',
                boxShadow: `0 8px 50px ${dosa.accent}45, 0 2px 16px rgba(0,0,0,0.12), inset 0 0 0 3px rgba(217,163,33,0.25)`,
                transition: 'box-shadow 0.7s ease',
              }}
            >
              {/* Continuous rotation wrapper */}
              <motion.div
                className="w-full h-full rounded-full relative"
                animate={{ rotate: discAngle }}
                transition={{ ease: 'linear', duration: 0 }}
                style={{ willChange: 'transform' }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`disc-${active}`}
                    src={dosa.image}
                    alt={dosa.name}
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.4, rotate: 90 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover rounded-full"
                  />
                </AnimatePresence>
                {/* Vinyl grooves */}
                <DiscGrooves />
              </motion.div>
              {/* Centre spindle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                <div className="w-4 h-4 rounded-full bg-gold/80 border-2 border-white/50 shadow-md" />
              </div>
            </div>

            {/* ══════════════════════════════════════════
                ORBITING THUMBNAILS — ALL 10 DOSAS
                Tap any → cycles to next in sequence
            ══════════════════════════════════════════ */}
            {ALL_DOSAS.map((d, i) => {
              const isActive = i === active;
              const pos = thumbPositions[i];
              const scale = thumbScale[i];

              return (
                <motion.button
                  key={d.id}
                  onClick={() => handleThumbnailTap(i)}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    scale: isActive ? 0 : scale,
                    opacity: isActive ? 0 : scale,
                  }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: isActive ? 0 : scale * 1.22, zIndex: 40 }}
                  whileTap={{ scale: isActive ? 0 : scale * 0.9 }}
                  className="absolute rounded-full overflow-hidden z-30 cursor-pointer group"
                  style={{
                    width: 56, height: 56,
                    border: `2.5px solid ${d.accent}70`,
                    boxShadow: `0 3px 16px ${d.accent}28, 0 1px 6px rgba(0,0,0,0.12)`,
                    background: '#FFF8ED',
                    left: '50%', top: '50%',
                    marginLeft: -28, marginTop: -28,
                  }}
                >
                  <img
                    src={d.image} alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Hover tooltip with name */}
                  <div className="absolute inset-0 bg-brown/80 opacity-0 group-hover:opacity-100
                    transition-opacity flex flex-col items-center justify-center rounded-full p-1">
                    <span className="text-white text-[7px] font-bold text-center leading-tight line-clamp-2 px-1">
                      {d.name}
                    </span>
                    <span className="text-gold text-[8px] font-bold">{d.price}</span>
                  </div>
                </motion.button>
              );
            })}

            {/* ── Floating curry leaves ── */}
            <div className="float-1 absolute pointer-events-none" style={{ top: '0%', left: '3%' }}>
              <CurryLeaf size={24} />
            </div>
            <div className="float-3 absolute pointer-events-none" style={{ bottom: '2%', right: '2%' }}>
              <CurryLeaf size={22} style={{ transform: 'rotate(145deg) scaleX(-1)' }} />
            </div>
            <div className="float-5 absolute pointer-events-none" style={{ top: '10%', right: '-1%' }}>
              <CurryLeaf size={18} style={{ transform: 'rotate(25deg)' }} />
            </div>

            {/* ── Steam particles ── */}
            {[
              { top: '17%', left: '46%', cls: 'steam-1', w: 8, h: 16 },
              { top: '14%', left: '51%', cls: 'steam-2', w: 6, h: 12 },
            ].map((s, i) => (
              <div key={i} className="absolute pointer-events-none z-25"
                style={{ top: s.top, left: s.left }}>
                <div className={`${s.cls} rounded-full bg-white/20 blur-sm`}
                  style={{ width: s.w, height: s.h }} />
              </div>
            ))}

            {/* ── Price float card ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`price-${active}`}
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: -10 }}
                transition={{ duration: 0.35 }}
                className="absolute z-30 glass-card rounded-2xl px-4 py-2.5 shadow-card"
                style={{
                  bottom: '8%', right: '-2%',
                  border: `1px solid ${dosa.accent}35`,
                  boxShadow: `0 8px 24px ${dosa.accent}18`,
                }}
              >
                <p className="font-serif text-base font-bold" style={{ color: dosa.accentDark }}>{dosa.price}</p>
                <p className="text-[10px] text-brown/50 tracking-wide">{dosa.tag}</p>
              </motion.div>
            </AnimatePresence>

            {/* ── Hint label ── */}
            <div className="absolute z-30 glass-card rounded-xl px-3 py-1.5"
              style={{ top: '3%', left: '-5%', border: '1px solid rgba(217,163,33,0.2)' }}>
              <p className="text-[9px] text-brown/50 font-medium flex items-center gap-1">
                <span>⟳</span> Tap circle → next dosa
              </p>
            </div>

            {/* Counter badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`counter-${active}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="absolute z-30 glass-card rounded-full px-3 py-1"
                style={{ top: '3%', right: '-4%', border: `1px solid ${dosa.accent}40` }}
              >
                <p className="text-[10px] font-bold" style={{ color: dosa.accent }}>
                  {active + 1} / {N}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Mustard seed clusters */}
            <div className="seed-anim absolute pointer-events-none" style={{ top: '22%', right: '4%' }}>
              <div className="flex gap-1 flex-wrap" style={{ width: 20 }}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full"
                    style={{ background: 'radial-gradient(circle at 35% 35%, #F0C84A, #B8861A)' }} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40"
      >
        <span className="text-brown/50 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-gold" />
      </motion.div>
    </section>
  );
}
