
import React, { useState, useMemo } from 'react';
import { ChevronLeft, LayoutGrid, PlusCircle, Edit3, Trash2, Plus } from 'lucide-react';
import { Product, CategoryType } from '../types';
import ProductCard from './ProductCard';
import FilterSortBar, { SortOption, Filters } from './FilterSortBar';

interface ProductListViewProps {
  products: Product[];
  category: CategoryType | null;
  isAdmin: boolean;
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const ProductListView: React.FC<ProductListViewProps> = ({ 
  products, category, isAdmin, onBack, onProductClick, onAddProduct, onEditProduct, onDeleteProduct 
}) => {
  const [sort, setSort] = useState<SortOption>('popularity');
  const [filters, setFilters] = useState<Filters>({
    maxPrice: 2000000,
    durations: [],
    inclusions: []
  });

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    if (category) {
      result = result.filter(p => p.category === category);
    }

    result = result.filter(p => p.price <= filters.maxPrice);

    if (filters.durations.length > 0) {
      result = result.filter(p => filters.durations.includes(p.durationDays));
    }

    if (filters.inclusions.length > 0) {
      result = result.filter(p => 
        filters.inclusions.every(inc => p.inclusions.some(pi => pi.includes(inc)))
      );
    }

    return [...result].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return b.popularity - a.popularity;
    });
  }, [products, category, sort, filters]);

  return (
    <div className="min-h-screen bg-gray-50 animate-in slide-in-from-right duration-300 relative">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              {category ? `${category} 패키지` : '전체 상품 목록'}
            </h2>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-0.5">Premium Selection</p>
          </div>
        </div>
        
        {isAdmin && (
          <button 
            onClick={onAddProduct}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-2xl text-xs font-black hover:bg-emerald-700 transition-all shadow-lg"
          >
            <PlusCircle className="w-4 h-4" /> 상품 등록
          </button>
        )}
      </div>

      <FilterSortBar 
        currentSort={sort} 
        activeFilters={filters} 
        onSortChange={setSort} 
        onFilterChange={setFilters} 
      />

      <div className="p-4 sm:p-6 max-w-4xl mx-auto pb-24">
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredAndSortedProducts.map(product => (
              <div key={product.id} className="relative group">
                <ProductCard 
                  product={product} 
                  onClick={onProductClick} 
                />
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onEditProduct(product); }}
                      className="p-2.5 bg-white text-emerald-600 rounded-full shadow-lg hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDeleteProduct(product.id); }}
                      className="p-2.5 bg-white text-rose-600 rounded-full shadow-lg hover:bg-rose-600 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <LayoutGrid className="w-10 h-10 opacity-20" />
            </div>
            <p className="font-black text-lg">조건에 맞는 상품이 없습니다</p>
          </div>
        )}
      </div>

      {/* Admin Floating Action Button for Mobile */}
      {isAdmin && (
        <button 
          onClick={onAddProduct}
          className="sm:hidden fixed bottom-20 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
        >
          <Plus className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default ProductListView;
