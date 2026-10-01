import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Trash2, ArrowLeft, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('menu');
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: '',
    subtitle: '',
    description: '',
    price: '',
    image: '/images/plain_dosa.png',
    badge: 'New',
    badgeColor: 'bg-green/15 text-green border-green/30',
    tags: 'Vegetarian',
    spice: 1
  });

  const fetchMenu = async () => {
    try {
      const res = await fetch('https://dosadelight-backend.onrender.com/api/menu');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      toast.error('Error fetching menu items');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('https://dosadelight-backend.onrender.com/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      toast.error('Error fetching orders');
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchOrders();
    // Refresh orders every 10 seconds
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      price: Number(formData.price),
      spice: Number(formData.spice),
      tags: formData.tags.split(',').map(tag => tag.trim()),
      rating: 5.0,
      reviews: 0
    };

    try {
      const res = await fetch('https://dosadelight-backend.onrender.com/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      if (res.ok) {
        toast.success('Dosa added to menu!');
        fetchMenu();
        setFormData({ ...formData, id: Date.now(), name: '', subtitle: '', description: '', price: '' });
      }
    } catch (err) {
      toast.error('Error adding item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`https://dosadelight-backend.onrender.com/api/menu/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Dosa removed from menu!');
        fetchMenu();
      }
    } catch (err) {
      toast.error('Error deleting item');
    }
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-3xl font-bold text-brown">Dosa Delight Admin</h1>
          <Link to="/" className="text-maroon hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Website
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'menu' ? 'bg-brown text-white shadow-lg' : 'bg-white text-brown/70 hover:bg-brown/5'
            }`}
          >
            <UtensilsCrossed className="w-5 h-5" /> Menu Items
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'orders' ? 'bg-maroon text-white shadow-lg' : 'bg-white text-brown/70 hover:bg-brown/5'
            }`}
          >
            <ShoppingBag className="w-5 h-5" /> Live Orders 
            {orders.length > 0 && (
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{orders.length}</span>
            )}
          </button>
        </div>

        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Form */}
            <div className="bg-white p-6 rounded-2xl shadow-card h-fit">
              <h2 className="font-serif text-xl font-bold text-brown mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-green" /> Add New Dish
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="name" required placeholder="Dish Name (e.g. Cheese Dosa)" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-brown/20 focus:outline-none focus:border-gold" />
                <input type="text" name="subtitle" required placeholder="Subtitle (e.g. Extra Cheesy)" value={formData.subtitle} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-brown/20 focus:outline-none focus:border-gold" />
                <textarea name="description" required placeholder="Description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-brown/20 focus:outline-none focus:border-gold" rows="3" />
                <input type="number" name="price" required placeholder="Price (₹)" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-brown/20 focus:outline-none focus:border-gold" />
                <input type="text" name="tags" required placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-brown/20 focus:outline-none focus:border-gold" />
                
                <div className="flex items-center justify-between mt-2">
                  <label className="text-sm text-brown/70 font-semibold">Spice Level (0-3)</label>
                  <input type="number" min="0" max="3" name="spice" value={formData.spice} onChange={handleChange} className="w-20 px-4 py-1 rounded-lg border border-brown/20 focus:outline-none focus:border-gold text-center" />
                </div>

                <button type="submit" className="w-full bg-green text-white font-bold rounded-lg py-3 mt-4 hover:bg-green-dark transition-colors">
                  Save to Menu
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-xl font-bold text-brown mb-4">Current Live Menu ({items.length})</h2>
              {loading ? <p>Loading menu...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map(item => (
                    <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm border border-brown/10 flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-cream" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-brown truncate">{item.name}</h3>
                        <p className="text-xs text-brown/50 line-clamp-1">{item.description}</p>
                        <p className="font-bold text-gold mt-1">₹{item.price}</p>
                      </div>
                      <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="font-serif text-xl font-bold text-brown mb-4">Live Orders Tracker</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.length === 0 ? (
                <p className="text-brown/60">No orders yet. Waiting for hungry customers...</p>
              ) : (
                orders.map(order => (
                  <div key={order._id} className="bg-white rounded-2xl shadow-card overflow-hidden border border-brown/10 flex flex-col">
                    <div className="bg-maroon/5 border-b border-maroon/10 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-brown text-lg">{order.customerName}</h3>
                        <span className="bg-maroon text-white text-xs font-bold px-2 py-1 rounded">New</span>
                      </div>
                      <p className="text-sm text-brown/70">📱 {order.phone}</p>
                      <p className="text-sm text-brown/70 mt-1 line-clamp-2">📍 {order.address}</p>
                    </div>
                    
                    <div className="p-4 flex-1">
                      <h4 className="text-xs font-bold text-brown/50 uppercase tracking-wider mb-3">Order Items</h4>
                      <ul className="space-y-2 mb-4">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between text-sm">
                            <span className="text-brown"><span className="font-bold">{item.quantity}x</span> {item.name}</span>
                            <span className="text-brown/70">₹{item.price * item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-cream/50 border-t border-brown/10 flex justify-between items-center">
                      <span className="text-sm font-bold text-brown/70">Total Paid:</span>
                      <span className="text-lg font-bold text-green-dark">₹{order.totalAmount}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
