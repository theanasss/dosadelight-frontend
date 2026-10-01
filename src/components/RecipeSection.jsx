import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChefHat, Clock, Users, Star, ChevronDown, ChevronUp, Flame, Leaf } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   DOSA RECIPE DATA
═══════════════════════════════════════════════════════════════ */
const recipes = [
  {
    id: 1,
    name: 'Classic Masala Dosa',
    subtitle: 'The South Indian Icon',
    image: '/images/masala_dosa.png',
    time: '40 min',
    serves: '4',
    difficulty: 'Medium',
    rating: 4.9,
    accent: '#D9A321',
    badge: 'Bestseller',
    spice: 2,
    special: 'SPECIAL INHOUSE MASALA WITH INHOUSE CHUTNEY',
    ingredients: {
      batter: ['2 cups raw rice', '½ cup urad dal (split black gram)', '¼ tsp fenugreek seeds', 'Salt to taste', 'Water for grinding'],
      filling: ['4 medium potatoes (boiled & mashed)', '2 onions (finely sliced)', '2 green chillies (slit)', '1 tsp mustard seeds', '8–10 curry leaves', '½ tsp turmeric', '1 tsp ginger (grated)', 'Salt to taste', '2 tbsp oil'],
    },
    steps: [
      'Soak rice + urad dal + fenugreek overnight (8 hrs). Drain & grind to a smooth, fluffy batter. Ferment 8–12 hrs.',
      'Heat oil in a pan. Splutter mustard seeds, add curry leaves, green chillies, onions. Sauté until golden.',
      'Add ginger, turmeric, mashed potatoes. Mix well and cook 3 minutes. Season with salt. Filling ready.',
      'Heat a cast-iron tawa. Pour a ladle of batter, spread in a thin circle from center outward.',
      'Drizzle oil/ghee on edges. Cook until golden & crispy on underside (2–3 min).',
      'Place potato filling on one half. Fold the dosa. Serve hot with coconut chutney & sambar.',
    ],
  },
  {
    id: 2,
    name: 'Ghee Roast Dosa',
    subtitle: 'Butter & Crispy Perfection',
    image: '/images/ghee_roast_dosa.png',
    time: '25 min',
    serves: '2',
    difficulty: 'Easy',
    rating: 4.9,
    accent: '#7B2D26',
    badge: 'Premium',
    spice: 0,
    special: 'SPECIAL INHOUSE MASALA WITH INHOUSE CHUTNEY',
    ingredients: {
      batter: ['2 cups dosa batter (fermented)', 'Salt to taste'],
      extras: ['3–4 tbsp pure desi ghee', 'Pinch of salt', 'Few curry leaves (optional)'],
    },
    steps: [
      'Prepare or use ready fermented dosa batter. Season with salt.',
      'Heat a cast-iron tawa on medium-high heat. Wipe with a damp cloth between dosas.',
      'Pour a ladle of batter. Spread very thin — almost translucent.',
      'Add 1 tbsp ghee all around the edges and on top of the dosa.',
      'Let cook 3–4 minutes until the edges turn golden and the center is crispy.',
      'Flip briefly for 30 seconds if desired. Remove. Serve immediately with coconut chutney.',
    ],
  },
  {
    id: 3,
    name: 'Mysore Masala Dosa',
    subtitle: 'Spicy Red Chutney Special',
    image: '/images/mysore_masala_dosa.png',
    time: '45 min',
    serves: '4',
    difficulty: 'Medium',
    rating: 4.8,
    accent: '#C0392B',
    badge: 'Spicy',
    spice: 3,
    special: 'SPECIAL INHOUSE MASALA WITH INHOUSE CHUTNEY',
    ingredients: {
      'red chutney': ['6 dry red chillies', '4 garlic cloves', '1 small onion', '1 tsp tamarind paste', 'Salt to taste'],
      filling: ['3 boiled potatoes (mashed)', '1 onion (sliced)', 'Mustard seeds, curry leaves', '½ tsp turmeric', 'Salt & oil'],
    },
    steps: [
      'Grind red chillies, garlic, onion, tamarind & salt into a thick spicy paste (red chutney).',
      'Make potato masala filling: sauté mustard, curry leaves, onion; add turmeric & potatoes.',
      'Heat tawa. Spread thin dosa batter into a large circle.',
      'Spread 1 tsp red chutney evenly over the dosa while it cooks.',
      'Add potato masala on half the dosa. Cook until crispy golden underneath.',
      'Fold and serve hot. The red chutney soaked into the dosa is what makes Mysore style iconic.',
    ],
  },
  {
    id: 4,
    name: 'Neer Dosa',
    subtitle: 'Coastal Karnataka Delicacy',
    image: '/images/neer_dosa.png',
    time: '20 min',
    serves: '4',
    difficulty: 'Easy',
    rating: 4.7,
    accent: '#3F7D3A',
    badge: 'Healthy',
    spice: 0,
    special: 'SPECIAL INHOUSE MASALA WITH INHOUSE CHUTNEY',
    ingredients: {
      batter: ['1 cup raw rice (soaked 4–5 hrs)', '1½ cups water', '½ tsp salt', '1 tbsp grated coconut (optional)'],
    },
    steps: [
      'Soak raw rice for 4–5 hours. Drain and grind with water into a very thin, watery batter (neer = water).',
      'Add salt and mix well. Batter should be thinner than regular dosa batter.',
      'Heat a non-stick pan on medium-high. Grease lightly with oil.',
      'Pour a ladle of batter. Do NOT spread — let it spread naturally by tilting the pan.',
      'Cover with a lid and cook 1–2 minutes. Neer dosa is not flipped — cook on one side only.',
      'Remove gently when edges lift. Serve immediately with coconut chutney or chicken curry.',
    ],
  },
  {
    id: 5,
    name: 'Pesarattu',
    subtitle: 'Green Moong Dal Crepe',
    image: '/images/pesarattu.png',
    time: '30 min',
    serves: '4',
    difficulty: 'Easy',
    rating: 4.6,
    accent: '#2ECC71',
    badge: 'Healthy',
    spice: 1,
    special: 'SPECIAL INHOUSE MASALA WITH INHOUSE CHUTNEY',
    ingredients: {
      batter: ['1 cup whole green moong dal (soaked 6 hrs)', '1–2 green chillies', '1 inch ginger', '¼ tsp cumin seeds', 'Salt to taste', 'Water to grind'],
      topping: ['Finely chopped onions', 'Ginger juliennes', 'Cumin seeds', 'Fresh coriander'],
    },
    steps: [
      'Soak whole green moong overnight or minimum 6 hours. No fermentation required.',
      'Grind soaked moong with green chillies, ginger, cumin and salt — add water to get semi-thick batter.',
      'Heat iron tawa on medium. Grease with oil.',
      'Pour batter and spread into a medium-thin circle (slightly thicker than regular dosa).',
      'Sprinkle onions, ginger juliennes and cumin on top. Press lightly.',
      'Cook 3–4 mins until underside is golden. Flip and cook 1 min. Serve with ginger chutney.',
    ],
  },
  {
    id: 6,
    name: 'Adai Dosa',
    subtitle: 'Multi-Lentil Power Crepe',
    image: '/images/adai_dosa.png',
    time: '35 min',
    serves: '4',
    difficulty: 'Medium',
    rating: 4.7,
    accent: '#E67E22',
    badge: 'Nutritious',
    spice: 2,
    special: 'SPECIAL INHOUSE MASALA WITH INHOUSE CHUTNEY',
    ingredients: {
      batter: ['½ cup raw rice', '¼ cup chana dal', '¼ cup toor dal', '¼ cup urad dal', '3 dry red chillies', '1 tsp cumin', '¼ tsp asafoetida', 'Salt to taste', 'Curry leaves'],
    },
    steps: [
      'Soak rice and all lentils together for 3–4 hours. No overnight fermentation needed.',
      'Drain and grind coarsely with red chillies, cumin, asafoetida and salt — keep slightly rough texture.',
      'Add curry leaves, mix well. Batter should be thick (not runny).',
      'Heat tawa. Pour thick batter and spread to a medium circle (thicker than regular dosa).',
      'Make a small hole in center for even cooking. Drizzle oil generously on edges.',
      'Cook 4–5 mins on medium. Flip and cook other side. Serve with avial or coconut chutney.',
    ],
  },
];

/* ── Helper Components ── */
const SpiceLevel = ({ level, accent }) => (
  <div className="flex items-center gap-1">
    {[...Array(3)].map((_, i) => (
      <Flame key={i} className="w-3 h-3" style={{ color: i < level ? accent : '#e0e0e0' }}
        fill={i < level ? accent : 'none'} />
    ))}
  </div>
);

const DifficultyBadge = ({ difficulty }) => {
  const colors = { Easy: '#3F7D3A', Medium: '#D9A321', Hard: '#7B2D26' };
  return (
    <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
      style={{ background: colors[difficulty] + '18', color: colors[difficulty], border: `1px solid ${colors[difficulty]}40` }}>
      {difficulty}
    </span>
  );
};

/* ── Single Recipe Card ── */
function RecipeCard({ recipe, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl overflow-hidden shadow-card"
      style={{ background: '#FFFDF8', border: `1px solid ${recipe.accent}20` }}
    >
      {/* ── Card Header ── */}
      <div className="relative h-48 overflow-hidden">
        <img src={recipe.image} alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${recipe.accent}cc 0%, transparent 60%)` }} />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-widest uppercase shadow-md"
            style={{ background: recipe.accent }}>
            {recipe.badge}
          </span>
        </div>

        {/* Spice & rating */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          <div className="glass-card rounded-full px-2.5 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 text-gold" fill="#D9A321" />
            <span className="text-xs font-bold text-brown">{recipe.rating}</span>
          </div>
          <SpiceLevel level={recipe.spice} accent={recipe.accent} />
        </div>

        {/* Title over image */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-serif text-xl font-bold text-white leading-tight drop-shadow-lg">
            {recipe.name}
          </h3>
          <p className="text-white/80 text-xs mt-0.5">{recipe.subtitle}</p>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-5 flex flex-col gap-4">
        {/* Meta row */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-brown/60 text-xs">
            <Clock className="w-3.5 h-3.5" style={{ color: recipe.accent }} />
            <span>{recipe.time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-brown/60 text-xs">
            <Users className="w-3.5 h-3.5" style={{ color: recipe.accent }} />
            <span>Serves {recipe.serves}</span>
          </div>
          <DifficultyBadge difficulty={recipe.difficulty} />
        </div>

        {/* ⭐ SPECIAL INHOUSE line — always visible */}
        <div className="flex items-center gap-2 rounded-xl px-4 py-2.5"
          style={{ background: `${recipe.accent}12`, border: `1px solid ${recipe.accent}30` }}>
          <span className="text-base">🏮</span>
          <p className="text-[11px] font-bold tracking-widest uppercase leading-snug"
            style={{ color: recipe.accent }}>
            {recipe.special}
          </p>
        </div>

        {/* Expand / Collapse button */}
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center justify-between w-full py-2 border-t font-semibold text-sm transition-colors"
          style={{ borderColor: recipe.accent + '30', color: recipe.accent }}
        >
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4" />
            <span>{open ? 'Hide Recipe' : 'View Full Recipe'}</span>
          </div>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* ── Expanded Recipe Content ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-1 flex flex-col gap-5">
                {/* Ingredients */}
                <div>
                  <h4 className="font-serif text-base font-bold text-brown mb-3 flex items-center gap-2">
                    <Leaf className="w-4 h-4" style={{ color: recipe.accent }} /> Ingredients
                  </h4>
                  {Object.entries(recipe.ingredients).map(([group, items]) => (
                    <div key={group} className="mb-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
                        style={{ color: recipe.accent }}>
                        {group}
                      </p>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-brown/70">
                            <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0"
                              style={{ background: recipe.accent }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Steps */}
                <div>
                  <h4 className="font-serif text-base font-bold text-brown mb-3 flex items-center gap-2">
                    <ChefHat className="w-4 h-4" style={{ color: recipe.accent }} /> Method
                  </h4>
                  <ol className="flex flex-col gap-3">
                    {recipe.steps.map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white mt-0.5"
                          style={{ background: recipe.accent }}>
                          {i + 1}
                        </span>
                        <p className="text-xs text-brown/70 leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════ */
export default function RecipeSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="recipe" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF8ED 0%, #FFF3DA 100%)' }}>

      {/* Kolam BG */}
      <div className="absolute inset-0 kolam-bg-subtle opacity-50 pointer-events-none" />

      {/* Section heading */}
      <div ref={titleRef} className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Decorative top line */}
          <div className="flex items-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-dark/60" />
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-maroon/10 text-maroon border border-maroon/20">
              🍳 Our Secret Kitchen
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-dark/60" />
          </div>

          <h2 className="font-serif text-5xl md:text-6xl font-bold text-brown leading-tight">
            Dosa <span className="text-gold-gradient">Recipes</span>
          </h2>
          <p className="text-brown/60 text-lg max-w-xl leading-relaxed">
            Authentic recipes passed down through generations — now shared with love.
            Every recipe uses our special inhouse masala crafted fresh daily.
          </p>

          {/* Special badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl mt-2"
            style={{ background: 'linear-gradient(135deg, #155D27, #2E7D32)', boxShadow: '0 8px 24px rgba(21,93,39,0.3)' }}
          >
            <span className="text-2xl">🏮</span>
            <div className="text-left">
              <p className="text-white font-black text-sm tracking-widest uppercase">Special Inhouse Masala</p>
              <p className="text-white/80 text-[11px] font-medium">with Inhouse Chutney — Made Fresh Daily</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Recipe grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {recipes.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-brown/40 text-sm mt-12 italic"
        >
          * All recipes use authentic stone-ground batter fermented overnight at our kitchen.
          The inhouse masala blend is our chef's secret — not available anywhere else. 🌿
        </motion.p>
      </div>
    </section>
  );
}
