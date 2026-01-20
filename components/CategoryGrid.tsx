
import React from 'react';
import { CATEGORIES } from '../constants';
import { CategoryType } from '../types';

interface CategoryGridProps {
  onCategoryClick: (category: CategoryType) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick }) => {
  const handleItemClick = (cat: typeof CATEGORIES[0]) => {
    // We now always call onCategoryClick and let the App handle logic
    onCategoryClick(cat.id);
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-2xl shadow-sm my-6 border border-gray-100">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleItemClick(cat)}
          className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-emerald-50 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-2 group-hover:bg-emerald-100 group-hover:scale-110 transition-transform">
            <span className="text-gray-600 group-hover:text-emerald-700">
              {cat.icon}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-700 text-center whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;
