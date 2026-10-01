import React, { useRef, useEffect } from 'react';

/* ══════════════════════════════════════════════════════════════
   HeroCircle — The premium rotating circular showcase
   
   HOW TO ADD YOUR DOSA IMAGE:
   ────────────────────────────
   Place your transparent PNG file at:
     public/images/my_dosa.png
   
   Then uncomment the <img> tag inside the "center-slot" div below.
   The center is completely empty right now — just drop the image in!
══════════════════════════════════════════════════════════════ */

/* Curry leaf SVG */
const CurryLeaf = ({ className = '' }) => (
  <svg viewBox="0 0 40 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 75 C20 75 2 55 2 35 C2 15 12 5 20 5 C28 5 38 15 38 35 C38 55 20 75 20 75Z"
      fill="#3F7D3A" opacity="0.9"
    />
    <path
      d="M20 10 C20 10 6 28 6 38 C6 48 12 56 20 70"
      stroke="#5BA054" strokeWidth="1.5" strokeLinecap="round" fill="none"
    />
    <path d="M20 20 C20 20 10 30 8 36" stroke="#5BA054" strokeWidth="1" strokeLinecap="round" fill="none"/>
    <path d="M20 30 C20 30 12 38 11 43" stroke="#5BA054" strokeWidth="1" strokeLinecap="round" fill="none"/>
    <path d="M20 20 C20 20 30 30 32 36" stroke="#5BA054" strokeWidth="1" strokeLinecap="round" fill="none"/>
    <path d="M20 30 C20 30 28 38 29 43" stroke="#5BA054" strokeWidth="1" strokeLinecap="round" fill="none"/>
  </svg>
);

/* Chutney Bowl SVG */
const ChutneyBowl = ({ color = '#D9A321', label = '', className = '' }) => (
  <div className={`flex flex-col items-center gap-1 ${className}`}>
    <svg viewBox="0 0 60 50" className="w-12 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bowl body */}
      <ellipse cx="30" cy="38" rx="26" ry="10" fill="#B8861A" opacity="0.6"/>
      <path d="M4 28 Q4 48 30 48 Q56 48 56 28 Z" fill="#D9A321"/>
      <path d="M4 28 Q4 48 30 48 Q56 48 56 28 Z" fill="url(#bowlGrad)"/>
      <ellipse cx="30" cy="28" rx="26" ry="8" fill={color}/>
      <ellipse cx="30" cy="27" rx="22" ry="6" fill={color} opacity="0.85"/>
      {/* Rim highlight */}
      <ellipse cx="30" cy="28" rx="26" ry="8" fill="none" stroke="#F0C84A" strokeWidth="1" opacity="0.6"/>
      <defs>
        <linearGradient id="bowlGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0C84A" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#B8861A" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
    </svg>
    {label && <span className="text-[9px] font-semibold text-green-dark tracking-wide">{label}</span>}
  </div>
);

/* Mustard Seed */
const MustardSeed = ({ className = '', style = {} }) => (
  <div
    className={`rounded-full ${className}`}
    style={{ background: 'radial-gradient(circle at 35% 35%, #F0C84A, #B8861A)', ...style }}
  />
);

/* Steam particle */
const Steam = ({ className = '' }) => (
  <div className={`absolute rounded-full bg-white/30 blur-sm ${className}`} style={{ width: 8, height: 14 }} />
);

export default function HeroCircle() {
  const containerRef = useRef(null);

  // Subtle mouse parallax on the whole container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      el.style.transform = `perspective(1200px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg)`;
    };
    const handleLeave = () => {
      el.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center select-none"
      style={{
        width: 'min(520px, 90vw)',
        height: 'min(520px, 90vw)',
        transition: 'transform 0.12s ease-out',
        willChange: 'transform',
      }}
    >

      {/* ── GLOW behind everything ─────────────────── */}
      <div
        className="absolute rounded-full pulse-glow"
        style={{
          width: '85%', height: '85%',
          background: 'radial-gradient(circle, rgba(217,163,33,0.15) 0%, rgba(217,163,33,0.05) 60%, transparent 100%)',
          filter: 'blur(20px)',
        }}
      />

      {/* ── RING 1 — Outermost slow CW rotation ───── */}
      <div
        className="ring-outer absolute rounded-full"
        style={{
          width: '100%', height: '100%',
          border: '2px dashed rgba(217,163,33,0.45)',
        }}
      >
        {/* Dots on the outer ring */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className="absolute rounded-full bg-gold"
            style={{
              width: 6, height: 6,
              top: '50%', left: '50%',
              transform: `rotate(${deg}deg) translateX(calc(50vw * 0.43)) translate(-50%, -50%)`,
              boxShadow: '0 0 6px rgba(217,163,33,0.8)',
            }}
          />
        ))}
      </div>

      {/* ── RING 2 — CCW medium rotation ──────────── */}
      <div
        className="ring-middle absolute rounded-full"
        style={{
          width: '88%', height: '88%',
          border: '1.5px solid rgba(123,45,38,0.5)',
          borderStyle: 'dotted',
        }}
      >
        {/* Small temple arch ornaments */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={deg}
            className="absolute"
            style={{
              width: 10, height: 10,
              top: '50%', left: '50%',
              transform: `rotate(${deg}deg) translateX(calc(50vw * 0.38)) translate(-50%, -50%)`,
            }}
          >
            <svg viewBox="0 0 10 10" className="w-full h-full">
              <polygon points="5,0 10,10 0,10" fill="#7B2D26" opacity="0.7"/>
            </svg>
          </div>
        ))}
      </div>

      {/* ── RING 3 — Inner CW rotation (brass plate rim) ── */}
      <div
        className="ring-inner absolute rounded-full"
        style={{
          width: '76%', height: '76%',
          background: 'conic-gradient(from 0deg, #D9A321, #F0C84A, #B8861A, #D9A321, #F0C84A, #D9A321)',
          padding: '3px',
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'linear-gradient(135deg, #FFF8ED 0%, #FFF0D6 100%)' }}
        />
      </div>

      {/* ── PLATE INNER SHADOW RING ────────────────── */}
      <div
        className="breathe-anim absolute rounded-full"
        style={{
          width: '68%', height: '68%',
          background: 'radial-gradient(circle, rgba(217,163,33,0.08) 0%, rgba(217,163,33,0.04) 50%, transparent 100%)',
          border: '1px solid rgba(217,163,33,0.3)',
          boxShadow: 'inset 0 0 30px rgba(217,163,33,0.15), 0 0 40px rgba(217,163,33,0.2)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════
         CENTER SLOT — Place your dosa PNG here!
         ──────────────────────────────────────────────────────────
         To use your dosa image:
         1. Copy your transparent dosa PNG to: public/images/my_dosa.png
         2. Uncomment the <img> tag below
      ═══════════════════════════════════════════════════════════ */}
      <div
        id="dosa-center-slot"
        className="absolute rounded-full overflow-hidden flex items-center justify-center"
        style={{
          width: '62%', height: '62%',
          /* Your dosa PNG goes here — just drop it in! */
        }}
      >
        {/* ↓ UNCOMMENT THIS when your dosa PNG is ready ↓ */}
        {/* <img
          src="/images/my_dosa.png"
          alt="Signature Dosa"
          className="w-full h-full object-contain drop-shadow-2xl"
        /> */}

        {/* Placeholder text — remove once you add your PNG */}
        <div className="text-center opacity-40">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-gold mx-auto mb-2 flex items-center justify-center">
            <span className="text-gold text-2xl">🍽</span>
          </div>
          <p className="text-brown text-[10px] font-medium tracking-wider">YOUR DOSA</p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
         FLOATING ELEMENTS — positioned around the circle
      ══════════════════════════════════════════════════════ */}

      {/* Curry Leaf — Top Left */}
      <div className="float-1 absolute" style={{ top: '-2%', left: '4%' }}>
        <CurryLeaf className="w-7 h-14 opacity-90 drop-shadow-md" />
      </div>
      {/* Curry Leaf — Top Right */}
      <div className="float-2 absolute" style={{ top: '5%', right: '0%' }}>
        <CurryLeaf className="w-6 h-12 opacity-85 drop-shadow-md" style={{ transform: 'scaleX(-1) rotate(20deg)' }} />
      </div>
      {/* Curry Leaf — Bottom Left */}
      <div className="float-3 absolute" style={{ bottom: '5%', left: '-2%' }}>
        <CurryLeaf className="w-6 h-12 opacity-80 drop-shadow-md" style={{ transform: 'rotate(140deg)' }} />
      </div>
      {/* Curry Leaf — Bottom Right */}
      <div className="float-4 absolute" style={{ bottom: '-2%', right: '6%' }}>
        <CurryLeaf className="w-7 h-14 opacity-90 drop-shadow-md" style={{ transform: 'scaleX(-1) rotate(-30deg)' }} />
      </div>

      {/* Chutney Bowls */}
      <div className="float-5 absolute" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)' }}>
        <ChutneyBowl color="#F5F5F0" label="Coconut" />
      </div>
      <div className="float-6 absolute" style={{ right: '-12%', top: '50%', transform: 'translateY(-50%)' }}>
        <ChutneyBowl color="#C0392B" label="Tomato" />
      </div>
      <div className="float-7 absolute" style={{ bottom: '-12%', left: '50%', transform: 'translateX(-50%)' }}>
        <ChutneyBowl color="#6B4226" label="Sambar" />
      </div>
      <div className="float-8 absolute" style={{ left: '-12%', top: '50%', transform: 'translateY(-50%)' }}>
        <ChutneyBowl color="#27AE60" label="Mint" />
      </div>

      {/* Mustard Seeds cluster — scattered */}
      <div className="seed-anim absolute" style={{ top: '18%', right: '6%' }}>
        <div className="flex gap-1 flex-wrap" style={{ width: 24 }}>
          {[...Array(6)].map((_, i) => (
            <MustardSeed key={i} className="w-2 h-2" />
          ))}
        </div>
      </div>
      <div className="seed-anim-2 absolute" style={{ bottom: '20%', left: '8%' }}>
        <div className="flex gap-1 flex-wrap" style={{ width: 20 }}>
          {[...Array(5)].map((_, i) => (
            <MustardSeed key={i} className="w-1.5 h-1.5" />
          ))}
        </div>
      </div>
      <div className="seed-anim-3 absolute" style={{ top: '55%', right: '3%' }}>
        <div className="flex gap-0.5 flex-wrap" style={{ width: 14 }}>
          {[...Array(4)].map((_, i) => (
            <MustardSeed key={i} className="w-1.5 h-1.5" />
          ))}
        </div>
      </div>

      {/* Steam Particles — rising from center */}
      <div className="absolute" style={{ top: '20%', left: '48%' }}>
        <Steam className="steam-1" />
      </div>
      <div className="absolute" style={{ top: '22%', left: '51%' }}>
        <Steam className="steam-2" style={{ width: 6, height: 10 }} />
      </div>
      <div className="absolute" style={{ top: '18%', left: '45%' }}>
        <Steam className="steam-3" style={{ width: 5, height: 8 }} />
      </div>

      {/* Small spice dots scattered */}
      {[
        { top: '30%', left: '6%', size: 5, color: '#D9A321' },
        { top: '70%', right: '8%', size: 4, color: '#7B2D26' },
        { top: '15%', right: '18%', size: 6, color: '#3F7D3A' },
        { bottom: '30%', left: '12%', size: 4, color: '#D9A321' },
      ].map((dot, i) => (
        <div
          key={i}
          className={`absolute rounded-full float-${(i % 4) + 1}`}
          style={{
            width: dot.size, height: dot.size,
            background: dot.color,
            top: dot.top, left: dot.left,
            right: dot.right, bottom: dot.bottom,
            boxShadow: `0 0 8px ${dot.color}80`,
          }}
        />
      ))}
    </div>
  );
}
