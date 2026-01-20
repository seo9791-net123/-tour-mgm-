
import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';

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

  const sortLabels: Record<SortOption, string> = {
    'price-low': '가격 낮은순',
    'price-high': '가격 높은순',
    'popularity': '인기순',
    'newest': '신규 등록순'
  };

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

  return (
    <div className="sticky top-[64px] z-40 bg-white border-b border-gray-100 px-4 py-2">
      <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-colors whitespace-nowrap ${
              activeFilters.maxPrice < 2000000 || activeFilters.durations.length > 0 || activeFilters.inclusions.length > 0
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-white border-gray-200 text-gray-600'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            필터
            {(activeFilters.durations.length + activeFilters.inclusions.length > 0) && (
              <span className="bg-emerald-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                {activeFilters.durations.length + activeFilters.inclusions.length}
              </span>
            )}
          </button>

          <div className="h-4 w-px bg-gray-200 mx-1"></div>

          {(Object.keys(sortLabels) as SortOption[]).map((option) => (
            <button
              key={option}
              onClick={() => onSortChange(option)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                currentSort === option 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {sortLabels[option]}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in slide-in-from-bottom duration-300">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
              <h3 className="text-lg font-black text-gray-900">상세 필터</h3>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-8 flex-grow">
              {/* Price Range */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-800">최대 가격</h4>
                  <span className="text-emerald-600 font-black">{tempFilters.maxPrice.toLocaleString()}원</span>
                </div>
                <input 
                  type="range" 
                  min="300000" 
                  max="2000000" 
                  step="50000"
                  value={tempFilters.maxPrice}
                  onChange={(e) => setTempFilters({...tempFilters, maxPrice: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold uppercase">
                  <span>30만</span>
                  <span>100만</span>
                  <span>200만+</span>
                </div>
              </section>

              {/* Duration */}
              <section>
                <h4 className="font-bold text-gray-800 mb-4">여행 기간</h4>
                <div className="flex flex-wrap gap-2">
                  {[3, 4, 5, 6].map((days) => (
                    <button
                      key={days}
                      onClick={() => toggleDuration(days)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                        tempFilters.durations.includes(days)
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-200'
                      }`}
                    >
                      {days}일
                    </button>
                  ))}
                </div>
              </section>

              {/* Inclusion Tags */}
              <section>
                <h4 className="font-bold text-gray-800 mb-4">필수 포함 사항</h4>
                <div className="flex flex-wrap gap-2">
                  {['전용 차량', '가이드', '특식', '5성급 호텔', '그린피'].map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleInclusion(item)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                        tempFilters.inclusions.includes(item)
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                          : 'bg-white border-gray-100 text-gray-400 hover:border-emerald-100'
                      }`}
                    >
                      {tempFilters.inclusions.includes(item) && <Check className="w-3 h-3" />}
                      {item}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button 
                onClick={() => setTempFilters({ maxPrice: 2000000, durations: [], inclusions: [] })}
                className="flex-1 py-4 text-gray-500 font-bold text-sm hover:underline"
              >
                초기화
              </button>
              <button 
                onClick={handleApplyFilters}
                className="flex-[2] py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-lg hover:bg-emerald-700 transition-all"
              >
                필터 적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSortBar;
