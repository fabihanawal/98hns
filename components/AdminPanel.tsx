
import React, { useState } from 'react';
import { MenuItem, Order } from '../types';
import { X, Plus, Trash2, Edit2, Save, Image as ImageIcon, Layout, List, LogOut, Package, PhoneCall, Check, Calendar } from 'lucide-react';

interface AdminPanelProps {
  menu: MenuItem[];
  categories: string[];
  heroImages: string[];
  orders: Order[];
  onUpdateMenu: (menu: MenuItem[]) => void;
  onUpdateCategories: (categories: string[]) => void;
  onUpdateHeroImages: (images: string[]) => void;
  onUpdateOrders: (orders: Order[]) => void;
  onClose: () => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  menu, categories, heroImages, orders, onUpdateMenu, onUpdateCategories, onUpdateHeroImages, onUpdateOrders, onClose, onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'categories' | 'slideshow' | 'bookings'>('bookings');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Menu Handlers
  const handleAddMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: "নতুন খাবার",
      price: 0,
      category: categories[0] || "সাধারণ",
      description: "বিস্তারিত এখানে লিখুন",
      image: ""
    };
    onUpdateMenu([newItem, ...menu]);
    setEditingItem(newItem);
  };

  const handleDeleteMenuItem = (id: string) => {
    if(confirm('এই আইটেমটি ডিলিট করতে চান?')) {
      onUpdateMenu(menu.filter(i => i.id !== id));
    }
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    onUpdateMenu(menu.map(i => i.id === editingItem.id ? editingItem : i));
    setEditingItem(null);
  };

  // Order Handlers
  const handleConfirmOrder = (id: string) => {
    onUpdateOrders(orders.map(o => o.id === id ? { ...o, status: 'confirmed' as const } : o));
  };

  const handleDeleteOrder = (id: string) => {
    if(confirm('বুকিংটি ডিলিট করতে চান?')) {
      onUpdateOrders(orders.filter(o => o.id !== id));
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  // Category Handlers
  // Fix for error in file components/AdminPanel.tsx on line 237: Cannot find name 'handleAddCategory'.
  const handleAddCategory = () => {
    const newCat = prompt('নতুন ক্যাটাগরির নাম লিখুন:');
    if (newCat && !categories.includes(newCat)) {
      onUpdateCategories([...categories, newCat]);
    }
  };

  // Fix for error in file components/AdminPanel.tsx on line 245: Cannot find name 'handleDeleteCategory'.
  const handleDeleteCategory = (cat: string) => {
    if (confirm(`'${cat}' ক্যাটাগরি ডিলিট করতে চান?`)) {
      onUpdateCategories(categories.filter(c => c !== cat));
    }
  };

  // Slideshow Handlers
  // Fix for error in file components/AdminPanel.tsx on line 258: Cannot find name 'handleAddSlide'.
  const handleAddSlide = () => {
    const newUrl = prompt('নতুন ইমেজ URL দিন:');
    if (newUrl) {
      onUpdateHeroImages([...heroImages, newUrl]);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="bg-[#121212] w-full max-w-7xl h-[90vh] rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#1a1a1a]">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black italic fire-text">অ্যাডমিন প্যানেল</h2>
            <div className="flex bg-black/40 rounded-xl p-1 border border-white/5 overflow-x-auto max-w-[50vw]">
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'bookings' ? 'bg-[#FF4500] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Package size={16} /> বুকিংস
              </button>
              <button 
                onClick={() => setActiveTab('menu')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'menu' ? 'bg-[#FF4500] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <List size={16} /> মেনু
              </button>
              <button 
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'categories' ? 'bg-[#FF4500] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Layout size={16} /> ক্যাটাগরি
              </button>
              <button 
                onClick={() => setActiveTab('slideshow')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'slideshow' ? 'bg-[#FF4500] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <ImageIcon size={16} /> স্লাইডশো
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onLogout} className="p-3 hover:bg-red-500/10 text-red-500 rounded-xl transition-all flex items-center gap-2 font-bold text-sm">
              <LogOut size={18} /> লগআউট
            </button>
            <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-xl text-gray-400 transition-all">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">কাস্টমার বুকিংস ({orders.length})</h3>
              </div>
              
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="p-20 text-center text-gray-600 font-bold border-2 border-dashed border-white/5 rounded-3xl">
                    এখনও কোনো বুকিং নেই।
                  </div>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#FF4500]/50 transition-all">
                      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-1 border-r border-white/5 pr-4">
                          <h4 className="font-black text-lg text-white flex items-center gap-2">
                            <Check className={order.status === 'confirmed' ? 'text-green-500' : 'text-gray-500'} size={18} />
                            {order.customerName}
                          </h4>
                          <p className="text-sm text-gray-400 mt-1">{order.phone}</p>
                          <p className="text-xs text-[#FF4500] font-black mt-2 uppercase flex items-center gap-1">
                            <Calendar size={12} /> {new Date(order.createdAt).toLocaleString()}
                          </p>
                          <div className="mt-4 flex gap-2">
                            <button onClick={() => handleCall(order.phone)} className="p-2 bg-blue-500 text-white rounded-lg flex-1 flex items-center justify-center gap-2 text-xs font-bold">
                              <PhoneCall size={14} /> কল করুন
                            </button>
                            {order.status === 'pending' && (
                              <button onClick={() => handleConfirmOrder(order.id)} className="p-2 bg-green-600 text-white rounded-lg flex-1 flex items-center justify-center gap-2 text-xs font-bold">
                                কনফার্ম
                              </button>
                            )}
                            <button onClick={() => handleDeleteOrder(order.id)} className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="md:col-span-2 space-y-3">
                          <div className="bg-black/20 p-3 rounded-xl">
                            <p className="text-xs uppercase font-black text-gray-500 mb-1">ঠিকানা:</p>
                            <p className="text-sm">{order.address}</p>
                          </div>
                          <div className="bg-black/20 p-3 rounded-xl">
                            <p className="text-xs uppercase font-black text-gray-500 mb-1">সময় ও পরিমাণ:</p>
                            <p className="text-sm font-bold text-[#FF4500]">{order.timing}</p>
                          </div>
                          <div className="bg-black/20 p-3 rounded-xl">
                            <p className="text-xs uppercase font-black text-gray-500 mb-1">পেমেন্ট সিস্টেম:</p>
                            <p className="text-sm font-black text-[#FFD700]">{order.paymentMethod}</p>
                          </div>
                        </div>

                        <div className="md:col-span-1 bg-black/40 p-4 rounded-2xl">
                          <h5 className="text-xs font-black uppercase text-gray-500 mb-3 tracking-widest">অর্ডার আইটেম</h5>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-xs font-bold">
                                <span>{item.name} x{item.quantity}</span>
                                <span>৳{item.finalPrice * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t border-white/10 flex justify-between font-black text-lg text-[#FF4500]">
                            <span>টোটাল:</span>
                            <span>৳{order.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">মেনু আইটেম লিস্ট ({menu.length})</h3>
                <button onClick={handleAddMenuItem} className="bg-[#FF4500] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all">
                  <Plus size={18} /> নতুন যোগ করুন
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menu.map(item => (
                  <div key={item.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:border-[#FF4500]/30 transition-all flex flex-col h-full">
                    <div className="relative h-40 bg-black/50 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-all" alt={item.name} />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-700"><ImageIcon size={48} /></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button onClick={() => setEditingItem(item)} className="p-2 bg-blue-500 text-white rounded-lg shadow-lg">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDeleteMenuItem(item.id)} className="p-2 bg-red-500 text-white rounded-lg shadow-lg">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase font-black text-[#FF4500] tracking-widest">{item.category}</span>
                        <p className="text-lg font-black">৳{item.price}</p>
                      </div>
                      <h4 className="text-lg font-bold mb-2">{item.name}</h4>
                      <p className="text-gray-500 text-xs line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs remain similar logic */}
          {activeTab === 'categories' && (
            <div className="space-y-6 max-w-2xl">
               <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">ক্যাটাগরি ম্যানেজমেন্ট</h3>
                <button onClick={handleAddCategory} className="bg-[#FF4500] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2">
                  <Plus size={18} /> নতুন ক্যাটাগরি
                </button>
              </div>
              <div className="space-y-2">
                {categories.map(cat => (
                  <div key={cat} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="font-bold text-lg">{cat}</span>
                    <button onClick={() => handleDeleteCategory(cat)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'slideshow' && (
            <div className="space-y-6">
               <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">স্লাইডশো ইমেজ</h3>
                <button onClick={handleAddSlide} className="bg-[#FF4500] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2">
                  <Plus size={18} /> ইমেজ যোগ করুন
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {heroImages.map((img, idx) => (
                  <div key={idx} className="relative group aspect-video rounded-xl overflow-hidden border border-white/10">
                    <img src={img} className="w-full h-full object-cover" alt="Slide" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <button onClick={() => onUpdateHeroImages(heroImages.filter((_, i) => i !== idx))} className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-all">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleSaveItem} className="bg-[#1a1a1a] p-8 rounded-3xl border border-[#FF4500]/30 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-black italic mb-6">আইটেম এডিট করুন</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-black text-gray-500 mb-1 block">নাম</label>
                  <input 
                    required
                    value={editingItem.name} 
                    onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 p-3 rounded-xl focus:border-[#FF4500] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-black text-gray-500 mb-1 block">ইমেজ URL (আপলোড)</label>
                  <input 
                    placeholder="https://..."
                    value={editingItem.image || ''} 
                    onChange={e => setEditingItem({...editingItem, image: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 p-3 rounded-xl focus:border-[#FF4500] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-black text-gray-500 mb-1 block">দাম (৳)</label>
                  <input 
                    required
                    value={editingItem.price} 
                    onChange={e => setEditingItem({...editingItem, price: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 p-3 rounded-xl focus:border-[#FF4500] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-black text-gray-500 mb-1 block">ক্যাটাগরি</label>
                  <select 
                    value={editingItem.category}
                    onChange={e => setEditingItem({...editingItem, category: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 p-3 rounded-xl focus:border-[#FF4500] outline-none"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-black text-gray-500 mb-1 block">বিবরণ</label>
                <textarea 
                  value={editingItem.description} 
                  onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 p-3 rounded-xl focus:border-[#FF4500] outline-none h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 bg-black/40 p-3 rounded-xl cursor-pointer">
                  <input type="checkbox" checked={editingItem.isSpicy} onChange={e => setEditingItem({...editingItem, isSpicy: e.target.checked})} />
                  <span className="text-xs font-bold text-gray-400">Extra Spicy?</span>
                </label>
                <label className="flex items-center gap-3 bg-black/40 p-3 rounded-xl cursor-pointer">
                  <input type="checkbox" checked={editingItem.isBestSeller} onChange={e => setEditingItem({...editingItem, isBestSeller: e.target.checked})} />
                  <span className="text-xs font-bold text-gray-400">Best Seller?</span>
                </label>
              </div>

              {editingItem.image && (
                <div className="mt-4 border border-white/10 rounded-2xl overflow-hidden h-32">
                  <img src={editingItem.image} className="w-full h-full object-cover" alt="Preview" />
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setEditingItem(null)} className="flex-1 py-3 bg-white/5 rounded-xl font-bold">বাতিল</button>
                <button type="submit" className="flex-1 py-3 bg-[#FF4500] text-white rounded-xl font-bold flex items-center justify-center gap-2">
                  <Save size={18} /> সেভ করুন
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
