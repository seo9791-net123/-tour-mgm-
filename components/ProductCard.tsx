
import React from 'react';
import { MapPin } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs font-medium">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase tracking-wider mb-1">
          <MapPin className="w-3 h-3" />
          {product.location}
        </div>
        <h3 className="font-bold text-gray-900 line-clamp-1 mb-2">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm font-medium text-gray-400">시작가</div>
          <div className="text-lg font-extrabold text-emerald-700">
            {product.price.toLocaleString()}원~
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
