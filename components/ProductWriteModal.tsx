
import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Package, MapPin, DollarSign, Image as ImageIcon, ClipboardList, Calendar, Tag } from 'lucide-react';
import { Product, CategoryType, ItineraryStep } from '../types';

interface ProductWriteModalProps {
  onClose: () => void;
  onSave: (product: Omit<Product, 'id' | 'createdAt' | 'popularity'>) => void;
  editingProduct?: Product;
}

const ProductWriteModal: React.FC<ProductWriteModalProps> = ({ onClose, onSave, editingProduct }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'GOLF' as CategoryType,
    location: '',
    price: 0,
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1470&auto=format&fit=crop',
    description: '',
    transport: '전용 리무진 차량',
    usageGuide: '티업 40분 전 도착 필수',
    refundPolicy: '21일 전 100% 환불',
    durationDays: 5,
  });

  const [inclusions, setInclusions] = useState<string[]>(['전 일정 숙박', '라운딩 비용']);
  const [exclusions, setExclusions] = useState<string[]>(['항공권', '캐디팁']);
  const [itinerary, setItinerary] = useState<ItineraryStep[]>([
    { day: 1, title: '호치민 도착', description: '가이드 미팅 및 호텔 이동' }
  ]);

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'GOLF', label: '골프' },
    { id: 'HOTEL', label: '호텔&빌라' },
    { id: 'TOUR', label: '관광' },
    { id: 'BUSINESS', label: '비지니스' },
    { id: 'CULTURE', label: '문화' },
    { id: 'FOOD', label: '먹거리' },
    { id: 'FOR_MEN', label: 'FOR MEN' },
  ];

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        title: editingProduct.title,
        category: editingProduct.category,
        location: editingProduct.location,
        price: editingProduct.price,
        image: editingProduct.image,
        description: editingProduct.description,
        transport: editingProduct.transport,
        usageGuide: editingProduct.usageGuide,
        refundPolicy: editingProduct.refundPolicy,
        durationDays: editingProduct.durationDays,
      });
      setInclusions(editingProduct.inclusions);
      setExclusions(editingProduct.exclusions);
      setItinerary(editingProduct.itinerary);
    }
  }, [editingProduct]);

  const addInclusion = () => setInclusions([...inclusions, '']);
  const removeInclusion = (index: number) => setInclusions(inclusions.filter((_, i) => i !== index));
  const updateInclusion = (index: number, val: string) => {
    const next = [...inclusions];
    next[index] = val;
    setInclusions(next);
  };

  const addExclusion = () => setExclusions([...exclusions, '']);
  const removeExclusion = (index: number) => setExclusions(exclusions.filter((_, i) => i !== index));
  const updateExclusion = (index: number, val: string) => {
    const next = [...exclusions];
    next[index] = val;
    setExclusions(next);
  };

  const addItinerary = () => setItinerary([...itinerary, { day: itinerary.length + 1, title: '', description: '' }]);
  const updateItinerary = (index: number, field: keyof ItineraryStep, val: any) => {
    const next = [...itinerary];
    next[index] = { ...next[index], [field]: val };
    setItinerary(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.location || formData.price <= 0) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }
    onSave({
      ...formData,
      inclusions: inclusions.filter(i => i.trim() !== ''),
      exclusions: exclusions.filter(e => e.trim() !== ''),
      itinerary: itinerary.map((step, idx) => ({ ...step, day: idx + 1 }))
    });
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-4xl bg-white sm:rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col h-full sm:h-auto sm:max-h-[90vh]">
        <div className="p-6 bg-emerald-600 flex items-center justify-between text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black">{editingProduct ? '상품 정보 수정' : '새 프리미엄 상품 등록'}</h2>
              <p className="text-white/80 text-xs">MGM의 가치를 담은 여행 상품을 기획합니다.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8 overflow-y-auto no-scrollbar flex-grow">
          {/* 카테고리 선택 */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-black text-gray-900 border-b pb-2">
              <Tag className="w-5 h-5 text-emerald-600" /> 상품 카테고리
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black border transition-all ${
                    formData.category === cat.id
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </section>

          {/* 기본 정보 */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-black text-gray-900 border-b pb-2">
              <ClipboardList className="w-5 h-5 text-emerald-600" /> 기본 정보
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500">상품명</label>
                <input 
                  required
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full p-4 bg-gray-50 border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold shadow-sm"
                  placeholder="예: [3박 5일] 호치민 명품 골프"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500">위치 (도시)</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                  <input 
                    required
                    type="text" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold shadow-sm"
                    placeholder="예: Ho Chi Minh"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500">시작 가격 (원)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                  <input 
                    required
                    type="number" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500">대표 이미지 URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                  <input 
                    required
                    type="text" 
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-xs shadow-sm"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500">상품 설명</label>
              <textarea 
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full p-4 bg-gray-50 border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none min-h-[100px] font-medium shadow-sm"
                placeholder="고객을 사로잡을 수 있는 매력적인 문구"
              />
            </div>
          </section>

          {/* 포함/불포함 사항 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-base font-black text-gray-900">포함 사항</h3>
                <button type="button" onClick={addInclusion} className="text-emerald-600 hover:bg-emerald-50 p-1 rounded-lg transition-colors"><Plus className="w-5 h-5" /></button>
              </div>
              <div className="space-y-2">
                {inclusions.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      value={item}
                      onChange={e => updateInclusion(idx, e.target.value)}
                      className="flex-grow p-3 bg-gray-50 rounded-xl text-sm font-medium border-none focus:ring-1 focus:ring-emerald-500 shadow-sm"
                      placeholder="항목 입력"
                    />
                    <button type="button" onClick={() => removeInclusion(idx)} className="p-2 text-rose-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </section>
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-base font-black text-gray-900">불포함 사항</h3>
                <button type="button" onClick={addExclusion} className="text-rose-600 hover:bg-rose-50 p-1 rounded-lg transition-colors"><Plus className="w-5 h-5" /></button>
              </div>
              <div className="space-y-2">
                {exclusions.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      value={item}
                      onChange={e => updateExclusion(idx, e.target.value)}
                      className="flex-grow p-3 bg-gray-50 rounded-xl text-sm font-medium border-none focus:ring-1 focus:ring-rose-500 shadow-sm"
                      placeholder="항목 입력"
                    />
                    <button type="button" onClick={() => removeExclusion(idx)} className="p-2 text-rose-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 일정표 */}
          <section className="space-y-4 pb-12">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="flex items-center gap-2 text-lg font-black text-gray-900">
                <Calendar className="w-5 h-5 text-emerald-600" /> 상세 일정표
              </h3>
              <button type="button" onClick={addItinerary} className="flex items-center gap-1 text-xs font-black bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-200 transition-all">
                <Plus className="w-3 h-3" /> 일자 추가
              </button>
            </div>
            <div className="space-y-4">
              {itinerary.map((step, idx) => (
                <div key={idx} className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 space-y-4 relative group shadow-sm">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 font-black shadow-sm">D{idx + 1}</span>
                    <input 
                      value={step.title}
                      onChange={e => updateItinerary(idx, 'title', e.target.value)}
                      className="flex-grow p-3 bg-white rounded-xl font-black text-gray-900 border-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="주요 일정 제목"
                    />
                  </div>
                  <textarea 
                    value={step.description}
                    onChange={e => updateItinerary(idx, 'description', e.target.value)}
                    className="w-full p-4 bg-white rounded-xl text-sm font-medium border-none focus:ring-1 focus:ring-emerald-500 min-h-[80px]"
                    placeholder="상세 활동 내용"
                  />
                  {itinerary.length > 1 && (
                    <button type="button" onClick={() => setItinerary(itinerary.filter((_, i) => i !== idx))} className="absolute top-4 right-4 text-gray-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </form>

        <div className="p-6 border-t bg-white flex gap-4 flex-shrink-0">
          <button type="button" onClick={onClose} className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-colors">취소</button>
          <button 
            onClick={handleSubmit}
            className="flex-[2] py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group"
          >
            <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {editingProduct ? '수정 내용 저장' : '새 상품 등록 완료'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductWriteModal;
