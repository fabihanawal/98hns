
import React from 'react';
import { CartItem } from '../types';
import { ShoppingBag, X, Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, optionLabel: string | undefined, delta: number) => void;
  onRemove: (id: string, optionLabel: string | undefined) => void;
  onClose: () => void;
  onCheckout: () => void;
  isOpen: boolean;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onClose, onCheckout, isOpen }) => {
  const total = items.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#121212] h-full shadow-2xl flex flex-col border-l border-white/10 animate-slide-in">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-[#FF4500]" />
            <h2 className="text-xl font-bold text-white">আপনার ব্যাগ ({items.length})</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag size={64} className="text-gray-700" />
              <p className="text-gray-500 font-bold">ব্যাগটি খালি।</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.selectedOptionLabel}`} className="flex gap-4 group bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-lg">{item.name}</h4>
                    <button onClick={() => onRemove(item.id, item.selectedOptionLabel)} className="text-gray-500 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                  {item.selectedOptionLabel && <p className="text-[#FF4500] text-sm font-medium mt-1">{item.selectedOptionLabel}</p>}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1">
                      <button onClick={() => onUpdateQuantity(item.id, item.selectedOptionLabel, -1)} className="w-8 h-8 flex items-center justify-center hover:text-[#FF4500]"><Minus size={14} /></button>
                      <span className="font-bold w-4 text-center text-white">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.selectedOptionLabel, 1)} className="w-8 h-8 flex items-center justify-center hover:text-[#FF4500]"><Plus size={14} /></button>
                    </div>
                    <div className="text-white font-black text-lg">৳{item.finalPrice * item.quantity}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#1a1a1a] space-y-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-gray-400">সর্বমোট বিল</span>
              <span className="text-[#FF4500] text-2xl">৳{total}</span>
            </div>
            <button onClick={onCheckout} className="w-full bg-gradient-to-r from-[#B22222] to-[#FF4500] text-white font-black py-4 rounded-xl text-lg flex items-center justify-center gap-2">
              <CheckCircle2 size={20} /> চেক আউট
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
