import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Priya Nair',
    location: 'Bangalore',
    avatar: '👩',
    rating: 5,
    text: 'The Mysore Masala Dosa here is absolutely life-changing! The red chutney inside is perfectly spiced and the potato filling is just like how my grandmother used to make it. Worth every rupee!',
    dish: 'Mysore Masala Dosa',
    date: 'July 2025',
  },
  {
    id: 2,
    name: 'Arjun Ramachandran',
    location: 'Chennai',
    avatar: '👨',
    rating: 5,
    text: 'As a Tamilian, I was skeptical — but their Adai Dosa is absolutely authentic! The batter ratio is perfect and the tempering with curry leaves brings back childhood memories. Outstanding!',
    dish: 'Adai Dosa',
    date: 'June 2025',
  },
  {
    id: 3,
    name: 'Deepa Krishnamurthy',
    location: 'Hyderabad',
    avatar: '👩',
    rating: 5,
    text: 'Ordered the Ghee Roast Dosa for delivery and it arrived perfectly crispy. The ghee aroma was intoxicating! The packaging is brilliant — it keeps the dosa crispy even after 20 minutes.',
    dish: 'Ghee Roast Dosa',
    date: 'July 2025',
  },
  {
    id: 4,
    name: 'Karthik Subramanian',
    location: 'Mumbai',
    avatar: '👨',
    rating: 5,
    text: 'The Neer Dosa is pure art — so delicate, thin and perfectly white. I moved to Mumbai from Mangalore and this is the closest I\'ve found to home. Coconut chutney pairing is spot on!',
    dish: 'Neer Dosa',
    date: 'May 2025',
  },
  {
    id: 5,
    name: 'Sneha Pillai',
    location: 'Kochi',
    avatar: '👩',
    rating: 5,
    text: 'Brought my family here last weekend. Kids loved the Cheese Paneer Dosa and us adults went for the traditional Benne Dosa. The sambar is thick and flavorful — truly restaurant quality.',
    dish: 'Benne Dosa',
    date: 'July 2025',
  },
  {
    id: 6,
    name: 'Vikram Menon',
    location: 'Pune',
    avatar: '👨',
    rating: 4,
    text: 'Tried the Pesarattu for the first time here and I\'m addicted! The green moong dal gives it a distinct earthy flavour. Paired with ginger chutney it\'s absolutely heavenly. Will be back!',
    dish: 'Pesarattu',
    date: 'June 2025',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-brown/20'}`}
          fill={i < rating ? '#D9A321' : 'none'}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(reviews.length / perPage);

  const visible = reviews.slice(current * perPage, current * perPage + perPage);

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF8ED 0%, #FFF0D0 100%)' }}>
      <div className="absolute inset-0 kolam-bg-subtle opacity-40 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-green-dark/10 text-green-dark border border-green-dark/30 mb-4"
          >
            ⭐ Customer Love
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-brown mb-4"
          >
            What Our <span className="text-gold-gradient">Guests Say</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-green-dark/50" />
            <span className="text-green-dark text-xl">✦</span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-green-dark/50" />
          </motion.div>

          {/* Overall rating bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 mt-4"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold" fill="#D9A321" />
              ))}
            </div>
            <span className="font-serif text-2xl font-bold text-brown">4.9</span>
            <span className="text-brown/50 text-sm">from 15,000+ reviews</span>
          </motion.div>
        </div>

        {/* Review Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {visible.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl p-7 shadow-card hover:shadow-card-hover transition-all duration-400 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Quote icon */}
                <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-gold" fill="#D9A321" />
                </div>

                {/* Dish tag */}
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wide bg-maroon/10 text-maroon border border-maroon/20 mb-4">
                  🍽 {r.dish}
                </span>

                {/* Rating */}
                <StarRating rating={r.rating} />

                {/* Text */}
                <p className="text-brown/70 text-sm leading-relaxed mt-4 mb-5 relative z-10">
                  "{r.text}"
                </p>

                {/* Divider */}
                <div className="border-t border-brown/8 mb-4" />

                {/* Reviewer */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-lg shadow-sm">
                    {r.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-brown text-sm">{r.name}</p>
                    <p className="text-brown/50 text-xs">{r.location} · {r.date}</p>
                  </div>
                </div>

                {/* Bottom gold accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrent((p) => Math.max(0, p - 1))}
            disabled={current === 0}
            className="w-10 h-10 rounded-full border-2 border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-brown transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 h-3 bg-gold' : 'w-3 h-3 bg-gold/30 hover:bg-gold/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent((p) => Math.min(pages - 1, p + 1))}
            disabled={current === pages - 1}
            className="w-10 h-10 rounded-full border-2 border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-brown transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
