import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShoppingBag, Star, ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react';

const shopItems = [
  {
    id: 'sp1',
    name: 'Dosa Batter Mix',
    subtitle: 'Stone-Ground & Fermented',
    price: '₹199',
    oldPrice: '₹249',
    image: '/images/masala_dosa.png',
    rating: 4.8,
    badge: 'Top Seller',
    accent: '#D9A321',
    desc: 'Ready-to-use authentic dosa batter mix. Just add water, ferment & pour. No grinding needed.',
  },
  {
    id: 'sp2',
    name: 'Inhouse Masala Pack',
    subtitle: 'Secret Spice Blend',
    price: '₹149',
    oldPrice: '₹199',
    image: '/images/ghee_roast_dosa.png',
    rating: 4.9,
    badge: '🏮 Exclusive',
    accent: '#7B2D26',
    desc: 'Our signature spice blend used in every masala dosa. 100% natural, no preservatives.',
  },
  {
    id: 'sp3',
    name: 'Coconut Chutney Powder',
    subtitle: 'Traditional Kerala Style',
    price: '₹99',
    oldPrice: '₹129',
    image: '/images/neer_dosa.png',
    rating: 4.7,
    badge: 'Healthy',
    accent: '#3F7D3A',
    desc: 'Dry chutney powder — mix with coconut oil or water. Perfect with any dosa or idli.',
  },
  {
    id: 'sp4',
    name: 'Ghee Roast Kit',
    subtitle: 'Pure Desi Ghee + Spices',
    price: '₹349',
    oldPrice: '₹429',
    image: '/images/ghee_roast_dosa.png',
    rating: 4.9,
    badge: 'Premium',
    accent: '#B8861A',
    desc: 'Premium ghee roast starter kit — pure desi ghee + our roast masala. Makes 20+ dosas.',
  },
];

const perks = [
  { icon: Truck, label: 'Free Delivery', sub: 'Orders above ₹499', color: '#D9A321' },
  { icon: Shield, label: 'Quality Assured', sub: '100% authentic & natural', color: '#7B2D26' },
  { icon: RefreshCw, label: 'Easy Returns', sub: '7-day return policy', color: '#3F7D3A' },
];

export default function ShopSection({ onAddToCart, cartItems = [] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="shop" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF0D0 0%, #FFF8ED 100%)' }}>

      <div className="absolute inset-0 kolam-bg-subtle opacity-40 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-green-dark/60" />
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-maroon/10 text-maroon border border-maroon/20">
              🛍️ Our Store
            </span>
            <div className="h-px w-12 bg-green-dark/60" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-brown">
            Shop <span className="text-gold-gradient">Online</span>
          </h2>
          <p className="text-brown/60 text-lg mt-4 max-w-md mx-auto">
            Bring Dosa Delight home. Authentic batters, masalas and chutneys — delivered fresh to your door.
          </p>
        </motion.div>

        {/* Perks strip */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: p.color + '12', border: `1px solid ${p.color}25` }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" style={{ color: p.color }} />
                <div>
                  <p className="font-bold text-sm text-brown">{p.label}</p>
                  <p className="text-xs text-brown/50">{p.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shopItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group rounded-3xl overflow-hidden shadow-card flex flex-col"
              style={{ background: '#FFFDF8', border: `1px solid ${item.accent}20` }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img src={item.image} alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${item.accent}aa 0%, transparent 55%)` }} />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-[10px] font-bold shadow"
                  style={{ background: item.accent }}>
                  {item.badge}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className="font-serif font-bold text-brown text-base leading-tight">{item.name}</h3>
                  <p className="text-[11px] text-brown/50 mt-0.5">{item.subtitle}</p>
                </div>
                <p className="text-xs text-brown/60 leading-relaxed">{item.desc}</p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold" fill="#D9A321" />
                  <span className="text-xs font-bold text-brown">{item.rating}</span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="font-serif font-bold text-xl" style={{ color: item.accent }}>{item.price}</span>
                    <span className="text-xs text-brown/35 line-through ml-2">{item.oldPrice}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddToCart && onAddToCart(item)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-bold shadow hover:shadow-md transition-all"
                    style={{ background: `linear-gradient(135deg, ${item.accent}, ${item.accent}bb)` }}
                  >
                    <ShoppingBag className="w-3 h-3" />
                    {cartItems.some(c => c.id === item.id) ? 'Added ✓' : 'Add'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
