import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Plus, Check, Flame, Leaf, Tag } from 'lucide-react';

/* ═══════════════════════════════════════════
   ALL 10 DOSA MENU ITEMS
═══════════════════════════════════════════ */
const dosaItems = [
  {
    id: 1,
    name: 'Plain Dosa',
    subtitle: 'Sada / Khali',
    description: 'Classic thin crispy rice crepe, perfectly fermented batter cooked on a seasoned iron griddle. Light, crispy and golden.',
    price: 79,
    rating: 4.7,
    reviews: 1240,
    image: '/images/plain_dosa.png',
    badge: 'Classic',
    badgeColor: 'bg-green/15 text-green border-green/30',
    tags: ['Vegan', 'Light'],
    spice: 0,
  },
  {
    id: 2,
    name: 'Masala Dosa',
    subtitle: 'With Potato Filling',
    description: 'Golden crispy dosa folded around a spiced potato and onion masala filling. Served with coconut chutney and sambar.',
    price: 119,
    rating: 4.9,
    reviews: 3890,
    image: '/images/masala_dosa.png',
    badge: 'Bestseller',
    badgeColor: 'bg-gold/15 text-gold-dark border-gold/30',
    tags: ['Vegetarian', 'Classic'],
    spice: 1,
  },
  {
    id: 3,
    name: 'Mysore Masala Dosa',
    subtitle: 'Spicy Red Chutney',
    description: 'Dosa smeared with fiery Mysore red chutney inside, filled with spiced potato masala. Bold, intense flavors of Karnataka.',
    price: 139,
    rating: 4.8,
    reviews: 2150,
    image: '/images/mysore_masala_dosa.png',
    badge: 'Spicy',
    badgeColor: 'bg-maroon/15 text-maroon border-maroon/30',
    tags: ['Vegetarian', 'Spicy'],
    spice: 3,
  },
  {
    id: 4,
    name: 'Ghee Roast Dosa',
    subtitle: 'Pure Desi Ghee',
    description: 'Dosa roasted to perfection in generous amounts of pure desi ghee, giving it an irresistible crunch and rich buttery aroma.',
    price: 149,
    rating: 4.9,
    reviews: 1780,
    image: '/images/ghee_roast_dosa.png',
    badge: 'Premium',
    badgeColor: 'bg-gold/15 text-gold-dark border-gold/30',
    tags: ['Vegetarian', 'Rich'],
    spice: 0,
  },
  {
    id: 5,
    name: 'Neer Dosa',
    subtitle: 'Coastal Karnataka',
    description: 'Delicate, paper-thin white rice crepes with a soft lacy texture. A coastal Karnataka specialty, best enjoyed with coconut chutney.',
    price: 99,
    rating: 4.6,
    reviews: 870,
    image: '/images/neer_dosa.png',
    badge: 'Light',
    badgeColor: 'bg-green/15 text-green border-green/30',
    tags: ['Vegan', 'Soft'],
    spice: 0,
  },
  {
    id: 6,
    name: 'Benne Dosa',
    subtitle: 'Davangere Butter',
    description: 'Thick, soft-inside crispy-outside dosa loaded with white butter. A Davangere classic that melts in your mouth with every bite.',
    price: 129,
    rating: 4.8,
    reviews: 1340,
    image: '/images/benne_dosa.png',
    badge: 'Must Try',
    badgeColor: 'bg-maroon/15 text-maroon border-maroon/30',
    tags: ['Vegetarian', 'Buttery'],
    spice: 1,
  },
  {
    id: 7,
    name: 'Adai Dosa',
    subtitle: 'Multi-Lentil Crepe',
    description: 'Thick, protein-rich dosa made from a blend of rice and multiple lentils, spiced with pepper, cumin and curry leaves. Tamil Nadu classic.',
    price: 109,
    rating: 4.5,
    reviews: 640,
    image: '/images/adai_dosa.png',
    badge: 'Protein Rich',
    badgeColor: 'bg-green/15 text-green border-green/30',
    tags: ['Vegetarian', 'Healthy'],
    spice: 2,
  },
  {
    id: 8,
    name: 'Pesarattu',
    subtitle: 'Green Moong Dal',
    description: 'Vibrant green crepe made from whole green moong dal, naturally earthy and nutritious. An Andhra Pradesh breakfast staple served with upma.',
    price: 109,
    rating: 4.6,
    reviews: 720,
    image: '/images/pesarattu.png',
    badge: 'Healthy',
    badgeColor: 'bg-green/15 text-green border-green/30',
    tags: ['Vegan', 'Healthy'],
    spice: 1,
  },
  {
    id: 9,
    name: 'Cheese / Paneer Dosa',
    subtitle: 'Fusion Delight',
    description: 'Crispy dosa filled with creamy melted cheese and spiced paneer stuffing. A crowd-pleasing modern twist on a timeless South Indian classic.',
    price: 169,
    rating: 4.7,
    reviews: 1560,
    image: '/images/cheese_paneer_dosa.png',
    badge: 'Fusion',
    badgeColor: 'bg-gold/15 text-gold-dark border-gold/30',
    tags: ['Vegetarian', 'Kids Fav'],
    spice: 1,
  },
  {
    id: 10,
    name: 'Schezwan Dosa',
    subtitle: 'Indo-Chinese Fusion',
    description: 'Spicy Schezwan sauce slathered inside a crispy dosa with stir-fried vegetables. A bold Indo-Chinese fusion that packs a punch.',
    price: 159,
    rating: 4.6,
    reviews: 980,
    image: '/images/onion_dosa.png', // fallback image
    badge: 'Spicy Fusion',
    badgeColor: 'bg-maroon/15 text-maroon border-maroon/30',
    tags: ['Vegetarian', 'Spicy'],
    spice: 3,
  },
];

const categories = ['All', 'Classic', 'Premium', 'Spicy', 'Healthy', 'Fusion'];

/* Spice indicator */
function SpiceLevel({ level }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3].map((i) => (
        <Flame
          key={i}
          className={`w-3 h-3 ${i <= level ? 'text-maroon' : 'text-brown/20'}`}
          fill={i <= level ? '#7B2D26' : 'none'}
        />
      ))}
    </div>
  );
}

/* Individual Dosa Card */
function DosaCard({ item, onAdd, added, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-gradient-to-br from-cream to-amber-50">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brown/30 via-transparent to-transparent" />

        {/* Badge */}
        <span className={`absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold tracking-wide rounded-full border ${item.badgeColor}`}>
          {item.badge}
        </span>

        {/* Veg dot */}
        <div className="absolute top-3 right-3 w-5 h-5 rounded-sm border-2 border-green bg-white flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Name + subtitle */}
        <div>
          <h3 className="font-serif font-bold text-brown text-lg leading-tight">{item.name}</h3>
          <p className="text-green-dark text-xs font-semibold tracking-wide mt-0.5">{item.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-brown/60 text-sm leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-cream text-brown/70 border border-brown/10">
              {tag}
            </span>
          ))}
          {item.spice > 0 && <SpiceLevel level={item.spice} />}
        </div>

        {/* Divider */}
        <div className="border-t border-brown/8" />

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(item.rating) ? 'star' : 'text-brown/20'}`}
                fill={i < Math.floor(item.rating) ? '#D9A321' : 'none'}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-brown">{item.rating}</span>
          <span className="text-xs text-brown/40">({item.reviews.toLocaleString()})</span>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-serif text-2xl font-bold text-brown">₹{item.price}</span>
            <span className="text-xs text-brown/40 ml-1">onwards</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => onAdd(item.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              added
                ? 'bg-green text-white shadow-lg'
                : 'bg-maroon text-white hover:bg-maroon-dark shadow-maroon/30 shadow-md'
            }`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuSection({ onAddToCart, cartItems }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // 1. Send our static items to the backend to seed the database (if it's empty)
        await fetch('https://dosadelight-backend.onrender.com/api/seed-menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: dosaItems })
        });
        
        // 2. Fetch the items from the database!
        const res = await fetch('https://dosadelight-backend.onrender.com/api/menu');
        const data = await res.json();
        
        if (data && data.length > 0) {
           setItems(data);
        } else {
           setItems(dosaItems); // Fallback just in case
        }
      } catch (err) {
        console.error('Error fetching menu from backend:', err);
        setItems(dosaItems); // Fallback if backend is offline
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenu();
  }, []);

  const filtered = activeCategory === 'All'
    ? items
    : items.filter((d) =>
        d.badge.toLowerCase().includes(activeCategory.toLowerCase()) ||
        d.tags.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()))
      );

  return (
    <section id="menu" className="py-24 relative" style={{ background: '#FFF8ED' }}>
      {/* Subtle kolam bg */}
      <div className="absolute inset-0 kolam-bg-subtle opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-maroon/10 text-maroon border border-maroon/20 mb-4"
          >
            🍛 Our Menu
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-brown mb-4"
          >
            The <span className="text-gold-gradient">Dosa</span> Collection
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-green-dark/50" />
            <span className="text-green-dark text-xl">✦</span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-green-dark/50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-brown/60 max-w-xl mx-auto leading-relaxed"
          >
            From the humble plain dosa to the bold Schezwan fusion — every variety crafted with
            stone-ground batter, fermented overnight for the perfect tang.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-maroon text-white border-maroon shadow-maroon/30 shadow-md scale-105'
                  : 'bg-white text-brown/70 border-brown/15 hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((item, i) => (
              <DosaCard
                key={item.id}
                item={item}
                index={i}
                onAdd={onAddToCart}
                added={cartItems.includes(item.id)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2 text-sm text-brown/50">
            <Leaf className="w-4 h-4 text-green" />
            All items are 100% vegetarian
            <Leaf className="w-4 h-4 text-green" />
          </div>
          <p className="text-xs text-brown/40">
            Served with coconut chutney, tomato chutney & sambar | Extra chutneys ₹15
          </p>
        </motion.div>
      </div>
    </section>
  );
}
