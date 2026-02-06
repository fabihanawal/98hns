
import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { X, Phone, User, MapPin, Clock, CreditCard, CheckCircle2, Home } from 'lucide-react';

interface BookingFormProps {
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onSubmit: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ cart, total, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    houseNumber: '',
    phone: '',
    timing: '',
    paymentMethod: 'bKash'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Combining house number into address for the Order type or keeping it separate if type updated
    // For now, let's just combine for the existing Order type or update Order type in types.ts
    const fullAddress = `বাসা নং: ${formData.houseNumber}, ঠিকানা: ${formData.address}`;
    onSubmit({
      customerName: formData.customerName,
      address: fullAddress,
      phone: formData.phone,
      items: cart,
      total,
      timing: formData.timing,
      paymentMethod: formData.paymentMethod
    });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#121212] w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#FF4500]/30 shadow-2xl animate-scale-in">
        <div className="sticky top-0 bg-[#121212] z-10 p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-black italic fire-text">অর্ডার বুকিং ফর্ম</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <h3 className="text-sm font-black uppercase text-gray-500 mb-3 tracking-widest text-center">আপনার অর্ডার</h3>
            <div className="space-y-2 mb-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.name} (x{item.quantity})</span>
                  <span className="font-bold">৳{item.finalPrice * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between font-black text-lg">
              <span>সর্বমোট বিল</span>
              <span className="text-[#FF4500]">৳{total}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase text-gray-400">
                <User size={14} className="text-[#FF4500]" /> নাম
              </label>
              <input
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-[#FF4500] outline-none text-white"
                placeholder="আপনার নাম"
                value={formData.customerName}
                onChange={e => setFormData({ ...formData, customerName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase text-gray-400">
                <Phone size={14} className="text-[#FF4500]" /> মোবাইল নাম্বার
              </label>
              <input
                required
                type="tel"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-[#FF4500] outline-none text-white"
                placeholder="০১৭xxxxxxxx"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase text-gray-400">
                <Home size={14} className="text-[#FF4500]" /> বাসা নাম্বার
              </label>
              <input
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-[#FF4500] outline-none text-white"
                placeholder="বাসা নং লিখুন"
                value={formData.houseNumber}
                onChange={e => setFormData({ ...formData, houseNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase text-gray-400">
                <Clock size={14} className="text-[#FF4500]" /> কখন প্রয়োজন?
              </label>
              <input
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-[#FF4500] outline-none text-white"
                placeholder="যেমন: রাত ৮টা"
                value={formData.timing}
                onChange={e => setFormData({ ...formData, timing: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-black uppercase text-gray-400">
              <MapPin size={14} className="text-[#FF4500]" /> ঠিকানা
            </label>
            <textarea
              required
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-[#FF4500] outline-none text-white"
              placeholder="রোড নং, এলাকা বা ল্যান্ডমার্ক..."
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-black uppercase text-gray-400">
              <CreditCard size={14} className="text-[#FF4500]" /> পেমেন্ট মেথড
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['bKash', 'Nagad', 'mCash', 'Islami Bank'].map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: method })}
                  className={`py-3 px-1 rounded-xl border text-[10px] font-black uppercase transition-all ${
                    formData.paymentMethod === method
                      ? 'bg-[#FF4500] border-[#FF4500] text-white'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#B22222] to-[#FF4500] text-white font-black py-4 rounded-2xl text-lg hover:shadow-[0_0_30px_rgba(255,69,0,0.5)] transition-all flex items-center justify-center gap-2 mt-4"
          >
            <CheckCircle2 size={24} /> সাবমিট করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
