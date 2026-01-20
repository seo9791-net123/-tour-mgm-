
import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Car, Calendar, Info, CornerDownRight, Clock, MapPin, MessageCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onConsultation: (message: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onConsultation }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'itinerary' | 'guide'>('info');

  const tabs = [
    { id: 'info', label: '상품정보', icon: <Info className="w-4 h-4" /> },
    { id: 'itinerary', label: '상세일정표', icon: <Calendar className="w-4 h-4" /> },
    { id: 'guide', label: '안내/환불', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  const handleConsultationClick = () => {
    onConsultation(`[${product.title}] 상품에 대한 상세 견적 및 예약 상담을 신청합니다.`);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-end sm:justify-center p-0 sm:p-4">
      <div className="w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[95vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header Image */}
        <div className="relative h-64 flex-shrink-0">
          <img src={product.image} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
            <div className="bg-emerald-500/90 self-start text-white text-[10px] font-black px-2 py-1 rounded-md mb-2 uppercase tracking-widest">
              Premium Package
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{product.title}</h2>
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <MapPin className="w-4 h-4" />
              <span>{product.location} 프리미엄 투어</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b sticky top-0 bg-white z-10 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold transition-colors border-b-2 ${
                activeTab === tab.id 
                  ? 'border-emerald-600 text-emerald-600' 
                  : 'border-transparent text-gray-400 hover:text-emerald-500'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto bg-gray-50 flex-grow no-scrollbar">
          {activeTab === 'info' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  포함 사항
                </h4>
                <ul className="space-y-2.5">
                  {product.inclusions.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2.5">
                      <div className="mt-1 w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2 text-rose-500">
                  <X className="w-5 h-5" />
                  불포함 사항
                </h4>
                <ul className="space-y-2.5">
                  {product.exclusions.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2.5">
                      <div className="mt-1 w-4 h-4 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-rose-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-500" />
                  교통편 안내
                </h4>
                <div className="p-4 bg-blue-50/50 rounded-xl">
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {product.transport}
                  </p>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 mb-4">
                <p className="text-xs text-emerald-700 font-bold flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  현지 사정에 따라 일정 및 식단이 다소 변경될 수 있습니다.
                </p>
              </div>
              {product.itinerary.map((step, idx) => (
                <div key={idx} className="relative pl-12">
                  {/* Timeline Line */}
                  {idx !== product.itinerary.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-[-32px] w-0.5 bg-gradient-to-b from-emerald-500 to-transparent"></div>
                  )}
                  {/* Day Badge */}
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-200 z-10">
                    <span className="text-[10px] font-black leading-none mb-0.5">DAY</span>
                    <span className="text-sm font-black leading-none">{step.day}</span>
                  </div>
                  
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-black text-gray-900 text-lg">{step.title}</h5>
                      {step.time && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-500">
                          <Clock className="w-3 h-3" />
                          {step.time}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap font-medium">
                      {step.description}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                       <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">#전용차량</span>
                       <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">#엄선된맛집</span>
                       <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">#가이드동행</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="h-4"></div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-amber-500" />
                  이용 안내
                </h4>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line font-medium bg-amber-50/30 p-4 rounded-xl border border-amber-100/50">
                  {product.usageGuide}
                </div>
              </section>

              <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2 text-rose-500">
                  <CornerDownRight className="w-5 h-5" />
                  취소 및 환불 규정
                </h4>
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line font-medium border-l-4 border-rose-200 pl-4">
                  {product.refundPolicy}
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-white flex items-center gap-4 flex-shrink-0 shadow-lg">
          <div className="flex-grow pl-2">
            <span className="text-[10px] text-gray-400 font-bold block mb-0.5">패키지 총 예상가 (1인)</span>
            <span className="text-2xl font-black text-emerald-700">{product.price.toLocaleString()}<span className="text-sm font-bold ml-0.5">원~</span></span>
          </div>
          <button 
            onClick={handleConsultationClick}
            className="flex-[1.5] py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            견적서 생성 및 상담
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
