import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, ShoppingCart, Sparkles } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'upi',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
  });

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = typeof item.price === 'number' 
      ? item.price 
      : parseInt(String(item.price).replace(/[^0-9]/g, '')) || 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + deliveryFee + tax;
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'card') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setOrderPlaced(true);
        setTimeout(() => {
          onClearCart();
        }, 400);
      }, 2000);
    } else {
      setOrderPlaced(true);
      setTimeout(() => {
        onClearCart();
      }, 400);
    }
  };

  const handleCloseAll = () => {
    setIsCheckingOut(false);
    setOrderPlaced(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseAll}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998]"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-warm-white z-[99999] shadow-2xl flex flex-col justify-between overflow-hidden border-l border-green-dark/20"
          >
            {/* Header */}
            <div className="p-5 border-b border-brown/10 bg-cream flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-dark to-leaf flex items-center justify-center text-white shadow-md">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-brown leading-tight">Your Cart</h2>
                  <p className="text-xs text-brown/60">
                    {totalItemsCount === 0 ? 'Empty basket' : `${totalItemsCount} item${totalItemsCount > 1 ? 's' : ''} added`}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseAll}
                className="p-2 rounded-full hover:bg-brown/10 text-brown/60 hover:text-brown transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {orderPlaced ? (
                /* Order Placed Success Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center h-full gap-4"
                >
                  <div className="w-20 h-20 rounded-full bg-green/15 text-green flex items-center justify-center border-2 border-green/30 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brown">Payment Successful! 🎉<br/>Order Placed!</h3>
                  <p className="text-sm text-brown/70 max-w-xs leading-relaxed">
                    Thank you for ordering with Dosa Delight! Your delicious meal is being prepared fresh on our griddle.
                  </p>
                  <div className="p-4 bg-cream rounded-2xl border border-green-dark/20 text-xs text-brown/80 space-y-1 w-full max-w-xs mt-2">
                    <p className="font-semibold text-green-dark">Estimated Delivery: 25 - 35 mins</p>
                    <p>Order ID: #DD-{Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>
                  <button
                    onClick={handleCloseAll}
                    className="btn-primary mt-4 py-2.5 px-8 text-sm"
                  >
                    Back to Menu
                  </button>
                </motion.div>
              ) : isProcessing ? (
                /* Processing Payment Screen */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center h-full gap-6"
                >
                  <div className="w-16 h-16 border-4 border-brown/20 border-t-green-dark rounded-full animate-spin"></div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brown mb-2">Processing Payment...</h3>
                    <p className="text-sm text-brown/70">Please do not close this window.</p>
                  </div>
                </motion.div>
              ) : isCheckingOut ? (
                /* Checkout Form */
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleCheckoutSubmit}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-brown/10">
                    <h3 className="font-serif font-bold text-lg text-brown">Delivery Details</h3>
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="text-xs font-semibold text-green-dark hover:underline"
                    >
                      ← Back to Cart
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-brown/70 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brown/20 focus:border-green-dark focus:ring-2 focus:ring-green-dark/20 outline-none text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-brown/70 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brown/20 focus:border-green-dark focus:ring-2 focus:ring-green-dark/20 outline-none text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-brown/70 mb-1">Delivery Address</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Street address, landmark, city..."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brown/20 focus:border-green-dark focus:ring-2 focus:ring-green-dark/20 outline-none text-sm bg-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-brown/70 mb-2">Payment Method</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'upi', label: '📱 UPI' },
                        { id: 'card', label: '💳 Card' },
                        { id: 'cod', label: '💵 COD' },
                      ].map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                          className={`p-3 rounded-xl text-xs font-bold border transition-all text-center ${
                            formData.paymentMethod === pm.id
                              ? 'bg-green-dark text-white border-green-dark shadow-sm'
                              : 'bg-white text-brown/80 border-brown/20 hover:border-green-dark/40'
                          }`}
                        >
                          {pm.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Details form - conditionally rendered */}
                  {formData.paymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 p-4 border border-brown/20 rounded-xl bg-white/50"
                    >
                      <div>
                        <label className="block text-xs font-bold uppercase text-brown/70 mb-1">Card Number</label>
                        <input
                          type="text"
                          required
                          maxLength="19"
                          placeholder="0000 0000 0000 0000"
                          value={formData.cardNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                            setFormData({ ...formData, cardNumber: formatted });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-brown/20 focus:border-green-dark focus:ring-2 focus:ring-green-dark/20 outline-none text-sm bg-white font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-brown/70 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            required
                            maxLength="5"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, '');
                              if (val.length >= 2) val = val.substring(0,2) + '/' + val.substring(2,4);
                              setFormData({ ...formData, expiry: val });
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-brown/20 focus:border-green-dark focus:ring-2 focus:ring-green-dark/20 outline-none text-sm bg-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-brown/70 mb-1">CVV</label>
                          <input
                            type="password"
                            required
                            maxLength="3"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-brown/20 focus:border-green-dark focus:ring-2 focus:ring-green-dark/20 outline-none text-sm bg-white font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-brown/70 mb-1">Name on Card</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.cardName}
                          onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-brown/20 focus:border-green-dark focus:ring-2 focus:ring-green-dark/20 outline-none text-sm bg-white"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="p-3 bg-cream rounded-xl border border-brown/10 text-xs space-y-1.5 mt-4">
                    <div className="flex justify-between text-brown/70">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-brown/70">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? <strong className="text-green-dark">FREE</strong> : `₹${deliveryFee}`}</span>
                    </div>
                    <div className="flex justify-between text-brown/70">
                      <span>Taxes & Charges (5%)</span>
                      <span>₹{tax}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-brown pt-1.5 border-t border-brown/10">
                      <span>Total Amount</span>
                      <span className="text-green-dark">₹{grandTotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-green-dark to-leaf text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    Confirm & Place Order • ₹{grandTotal}
                  </button>
                </motion.form>
              ) : cartItems.length === 0 ? (
                /* Empty Cart State */
                <div className="py-16 text-center flex flex-col items-center justify-center h-full gap-4">
                  <div className="w-20 h-20 rounded-full bg-cream border border-brown/10 flex items-center justify-center text-brown/40">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brown">Your basket is empty</h3>
                  <p className="text-xs text-brown/60 max-w-xs leading-relaxed">
                    Looks like you haven't added any delicious dosas or chutneys yet.
                  </p>
                  <a
                    href="#menu"
                    onClick={onClose}
                    className="btn-primary py-2.5 px-6 text-xs mt-2"
                  >
                    Explore Menu
                  </a>
                </div>
              ) : (
                /* Cart Items List */
                cartItems.map((item) => {
                  const numPrice = typeof item.price === 'number'
                    ? item.price
                    : parseInt(String(item.price).replace(/[^0-9]/g, '')) || 0;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-3.5 rounded-2xl bg-white border border-brown/10 shadow-sm flex items-center gap-3"
                    >
                      <img
                        src={item.image || '/images/masala_dosa.png'}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-brown/10 bg-cream shrink-0"
                        onError={(e) => { e.target.src = '/images/masala_dosa.png'; }}
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-brown text-sm truncate">{item.name}</h4>
                        {item.subtitle && (
                          <p className="text-[11px] text-green-dark font-medium truncate">{item.subtitle}</p>
                        )}
                        <p className="font-bold text-brown text-xs mt-1">₹{numPrice}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 bg-cream px-2 py-1 rounded-full border border-brown/15">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded-full bg-white text-brown hover:bg-brown/10 flex items-center justify-center transition-colors text-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-brown w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded-full bg-white text-brown hover:bg-brown/10 flex items-center justify-center transition-colors text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 rounded-full text-maroon/60 hover:text-maroon hover:bg-maroon/10 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer Summary & Action */}
            {cartItems.length > 0 && !orderPlaced && !isCheckingOut && (
              <div className="p-5 bg-cream border-t border-brown/10 space-y-3">
                <div className="space-y-1.5 text-xs text-brown/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? <strong className="text-green-dark">FREE</strong> : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-brown pt-2 border-t border-brown/10">
                    <span>Total</span>
                    <span className="text-green-dark">₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-green-dark to-leaf text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
                >
                  <span>Proceed to Checkout</span>
                  <span className="flex items-center gap-1">
                    ₹{grandTotal} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
