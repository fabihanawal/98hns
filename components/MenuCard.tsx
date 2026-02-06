
import React, { useState } from 'react';
import { MenuItem, MenuItemOption } from '../types';
import { Plus, Flame, Star, ShoppingCart, ImageIcon } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, option?: MenuItemOption) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart }) => {
  const [selectedOption, setSelectedOption] = useState<MenuItemOption | undefined>(
    item.options ? item.options[0] : undefined
  );

  return (
    <div className="group relative bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/5 hover:border-[#FF4500]/50 transition-all duration-300 fire-shadow flex flex-col h-full">
      {/* Item Image Section */}
      <div className="relative h-48 bg-black/50 overflow-hidden">
        {item.image ? (
          <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={item.name} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-800 space-y-2">
            <ImageIcon size={48} />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-30">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
        
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {item.isBestSeller && (
            <span className="flex items-center gap-1 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              <Star size={10} fill="currentColor" /> Best Seller
            </span>
          )}
          {item.isSpicy && (
            <span className="flex items-center gap-1 bg-[#B22222] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              <Flame size={10} fill="currentColor" /> Extra Spicy
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white group-hover:text-[#FF4500] transition-colors mb-2">
          {item.name}
        </h3>
        
        {item.description && (
          <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="mt-auto">
          {item.options ? (
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar">
              {item.options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setSelectedOption(opt)}
                  className={`flex-shrink-0 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                    selectedOption?.label === opt.label
                      ? 'bg-[#FF4500] border-[#FF4500] text-white'
                      : 'bg-transparent border-white/20 text-gray-400 hover:border-white/40'
                  }`}
                >
                  {opt.label} (৳{opt.price})
                </button>
              ))}
            </div>
          ) : (
            <div className="text-2xl font-bold text-[#FF4500] mb-4">
              ৳{item.price}
            </div>
          )}

          <button
            onClick={() => onAddToCart(item, selectedOption)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#B22222] to-[#FF4500] hover:from-[#FF4500] hover:to-[#B22222] text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg"
          >
            <ShoppingCart size={18} />
            অর্ডার করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
