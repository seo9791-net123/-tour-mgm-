
import React from 'react';
import { CATEGORIES } from '../constants';
import { CategoryType } from '../types';

interface CategoryGridProps {
  onCategoryClick: (category: CategoryType) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick }) => {
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-[32px] shadow-xl my-6 border border-gray-100/50 backdrop-blur-sm">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryClick(cat.id)}
          className="flex flex-col items-center justify-center p-1 rounded-2xl hover:bg-emerald-50 transition-all group relative"
        >
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-2">
            {/* Glossy Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-md border border-gray-200 group-hover:shadow-lg transition-shadow"></div>
            
            {/* 3D Image Icon */}
            <div className="absolute inset-0 p-1.5 overflow-hidden rounded-2xl">
              <img 
                src={(cat as any).image} 
                alt={cat.label}
                className="w-full h-full object-cover rounded-xl shadow-inner group-hover:scale-115 transition-transform duration-500 ease-out"
              />
            </div>
            
            {/* Reflection Overlay */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl pointer-events-none"></div>
          </div>
          
          <span className="text-[10px] sm:text-[11px] font-black text-gray-800 text-center whitespace-nowrap tracking-tighter group-hover:text-emerald-700 transition-colors">
            {cat.label}
          </span>
          
          {/* Subtle Hover Glow */}
          <div className="absolute -inset-1 bg-emerald-400/0 group-hover:bg-emerald-400/5 rounded-2xl -z-10 transition-colors"></div>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;
