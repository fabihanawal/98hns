
import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-24 h-24 text-4xl',
    lg: 'w-40 h-40 text-7xl'
  };

  return (
    <div className={`relative flex items-center justify-center rounded-full border-4 border-[#B22222] bg-[#121212] ${sizes[size]} fire-shadow overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-t from-[#B22222]/20 to-transparent"></div>
      <span className="font-black italic fire-text tracking-tighter drop-shadow-lg">98</span>
      <div className="absolute bottom-2 text-[8px] md:text-[10px] text-orange-400 font-bold tracking-widest uppercase">
        Hot & Spicy
      </div>
    </div>
  );
};

export default Logo;
