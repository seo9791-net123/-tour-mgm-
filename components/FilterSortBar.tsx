
import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, Check, X, ArrowUpDown, Clock, TrendingUp, CircleDollarSign } from 'lucide-react';

export type SortOption = 'price-low' | 'price-high' | 'popularity' | 'newest';

interface FilterSortBarProps {
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filters: Filters) => void;
  currentSort: SortOption;
  activeFilters: Filters;
}

export interface Filters {
  maxPrice: number;
  durations: number[];
  inclusions: string[];
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({ 
  onSortChange, 
  onFilterChange, 
  currentSort,
  activeFilters 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<Filters>(activeFilters);

  const sortOptions: { id: SortOption, label: string, icon: React.ReactNode }[] = [
    { id: 'popularity', label: '인기순', icon: <TrendingUp className="w-3 h-3" /> },
    { id: 'newest', label: '최신순', icon: <Clock className="w-3 h-3" /> },
    { id: 'price-low', label: '최저가순', icon: <ArrowUpDown className="w-3 h-3" /> },
    { id: 'price-high', label: '최고가순', icon: <ArrowUpDown className="w-3 h-3 rotate-180" /> },
  ];

  const handleApplyFilters = () => {
    onFilterChange(tempFilters);
    setIsFilterOpen(false);
  };

  const toggleDuration = (days: number) => {
    setTempFilters(prev => ({
      ...prev,
      durations: prev.durations.includes(days)
        ? prev.durations.filter(d => d !== days)
        : [...prev.durations, days]
    }));
  };

  const toggleInclusion = (item: string) => {
    setTempFilters(prev => ({
      ...prev,
      inclusions: prev.inclusions.includes(item)
        ? prev.inclusions.filter(i => i !== item)
        : [...prev.inclusions, item]
    }));
  };

  const activeFilterCount = activeFilters.durations.length + activeFilters.inclusions.length + (activeFilters.maxPrice < 2000000 ? 1 : 0);

  return (
    <div className="sticky top-[64px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Sort Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-grow">
          {sortOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSortChange(opt.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-black transition-all whitespace-nowrap border ${
                currentSort === opt.id 
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-200 hover:text-emerald-600'
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>

        {/* Filter Trigger */}
        <button 
          onClick={() => setIsFilterOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-black transition-all whitespace-nowrap shadow-sm ${
            activeFilterCount > 0
              ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          상세필터
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-4 h-4 bg-emerald-600 text-white rounded-full text-[9px]">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Enhanced Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-300">
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900">맞춤 상품 필터</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5 tracking-wider">Refine Your Search</p>
              </div>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-10 flex-grow no-scrollbar bg-gray-50/30">
              {/* Price Range Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                      <CircleDollarSign className="w-5 h-5" />
                    </div>
                    <h4 className="font-black text-gray-800">예산 범위 (1인 기준)</h4>
                  </div>
                  <span className="text-emerald-600 font-black text-lg">~ {tempFilters.maxPrice.toLocaleString()}원</span>
                </div>
                <div className="px-2">
                  <input 
                    type="range" 
                    min="300000" 
                    max="2000000" 
                    step="50000"
                    value={tempFilters.maxPrice}
                    onChange={(e) => setTempFilters({...tempFilters, maxPrice: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between mt-3 text-[10px] text-gray-400 font-black uppercase tracking-tighter">
                    <span>30만원</span>
                    <span>100만원</span>
                    <span>200만원+</span>
                  </div>
                </div>
              </section>

              {/* Duration Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-gray-800">여행 기간</h4>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 4, 5, 6].map((days) => (
                    <button
                      key={days}
                      onClick={() => toggleDuration(days)}
                      className={`py-3 rounded-2xl text-xs font-black border transition-all ${
                        tempFilters.durations.includes(days)
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                          : 'bg-white border-gray-100 text-gray-500 hover:border-blue-200'
                      }`}
                    >
                      {days}일
                    </button>
                  ))}
                </div>
              </section>

              {/* Inclusion Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-gray-800">필수 포함 옵션</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['전용 차량', '가이드', '특식 포함', '5성급 호텔', '그린피 포함', '전동카트', '여행자보험'].map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleInclusion(item)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[11px] font-black border transition-all ${
                        tempFilters.inclusions.includes(item)
                          ? 'bg-amber-50 border-amber-400 text-amber-700'
                          : 'bg-white border-gray-100 text-gray-500 hover:border-amber-100'
                      }`}
                    >
                      {tempFilters.inclusions.includes(item) ? <Check className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-200" />}
                      {item}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-gray-100 bg-white flex gap-4">
              <button 
                onClick={() => setTempFilters({ maxPrice: 2000000, durations: [], inclusions: [] })}
                className="flex-1 py-4 text-gray-400 font-black text-sm hover:text-gray-600 transition-colors"
              >
                필터 초기화
              </button>
              <button 
                onClick={handleApplyFilters}
                className="flex-[2.5] py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                검색 조건 적용하기
                <ChevronDown className="w-4 h-4 rotate-270" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSortBar;
