import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ShopSection from './components/ShopSection';
import RecipeSection from './components/RecipeSection';
import ContactSection from './components/ContactSection';
import WhyChooseUs from './components/WhyChooseUs';
import Chutneys from './components/Chutneys';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import { PageTransitionProvider } from './components/PageTransition';

const MENU_ITEMS_CATALOG = [
  { id: 1, name: 'Plain Dosa', subtitle: 'Sada / Khali', price: 79, image: '/images/plain_dosa.png' },
  { id: 2, name: 'Masala Dosa', subtitle: 'With Potato Filling', price: 119, image: '/images/masala_dosa.png' },
  { id: 3, name: 'Mysore Masala Dosa', subtitle: 'Spicy Red Chutney', price: 139, image: '/images/mysore_masala_dosa.png' },
  { id: 4, name: 'Ghee Roast Dosa', subtitle: 'Pure Desi Ghee', price: 149, image: '/images/ghee_roast_dosa.png' },
  { id: 5, name: 'Neer Dosa', subtitle: 'Coastal Karnataka', price: 99, image: '/images/neer_dosa.png' },
  { id: 6, name: 'Benne Dosa', subtitle: 'Davangere Butter', price: 129, image: '/images/benne_dosa.png' },
  { id: 7, name: 'Adai Dosa', subtitle: 'Multi-Lentil Crepe', price: 109, image: '/images/adai_dosa.png' },
  { id: 8, name: 'Pesarattu', subtitle: 'Green Moong Dal', price: 109, image: '/images/pesarattu.png' },
  { id: 9, name: 'Cheese / Paneer Dosa', subtitle: 'Fusion Delight', price: 169, image: '/images/cheese_paneer_dosa.png' },
  { id: 10, name: 'Schezwan Dosa', subtitle: 'Indo-Chinese Fusion', price: 159, image: '/images/onion_dosa.png' },
];

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (itemOrId) => {
    let targetItem = null;

    if (typeof itemOrId === 'object' && itemOrId !== null) {
      targetItem = itemOrId;
    } else {
      targetItem = MENU_ITEMS_CATALOG.find((m) => m.id === itemOrId);
    }

    if (!targetItem) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === targetItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === targetItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...targetItem, quantity: 1 }];
      }
    });

    // Automatically open the cart drawer when adding an item for quick feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Extract list of item IDs in cart for components checking active status
  const cartItemIds = cartItems.map((item) => item.id);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Routes>
      <Route path="/" element={
        <PageTransitionProvider>
          <div className="min-h-screen overflow-x-hidden">
            <Navbar
              cartCount={totalCartCount}
              onOpenCart={() => setIsCartOpen(true)}
            />

        <main>
          {/* 1. Home / Hero */}
          <Hero onAddToCart={handleAddToCart} cartItems={cartItemIds} />

          {/* 2. Menu — All 10 Dosa Items */}
          <MenuSection onAddToCart={handleAddToCart} cartItems={cartItemIds} />

          {/* 3. Why Choose Us (between menu and shop) */}
          <WhyChooseUs />

          {/* 4. Shop */}
          <ShopSection onAddToCart={handleAddToCart} cartItems={cartItems} />

          {/* 5. Chutneys showcase */}
          <Chutneys />

          {/* 6. Recipe */}
          <RecipeSection />

          {/* 7. Reviews */}
          <Reviews />

          {/* 8. Contact */}
          <ContactSection />
        </main>

          {/* Shopping Cart Slide-over Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />

          {/* Footer */}
          <Footer />
        </div>
      </PageTransitionProvider>
    } />
    <Route path="/admin" element={<AdminDashboard />} />
  </Routes>
  );
}
