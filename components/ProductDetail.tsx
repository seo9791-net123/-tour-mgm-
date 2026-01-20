
import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Car, Calendar, Info, CornerDownRight, Clock, MapPin, MessageCircle, ExternalLink, ShieldAlert, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onConsultation: (message: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onConsultation }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'itinerary' | 'guide'>('info');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const gallery = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  const tabs = [
    { id: 'info', label: '상품정보', icon: <Info className="w-4 h-4" /> },
    { id: 'itinerary', label: '상세일정표', icon: <Calendar className="w-4 h-4" /> },
    { id: 'guide', label: '안내/환불', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleConsultationClick = () => {
    onConsultation(`[${product.title}] 상품에 대한 상세 견적 및 예약 상담을 신청합니다.`);
  };

  const airlineLinks = [
    { name: '대한항공 (KE)', url: 'https://www.koreanair.com/contents/plan-your-travel/baggage/special-baggage' },
    { name: '아시아나항공 (OZ)', url: 'https://flyasiana.com/C/KR/KO/contents/free-baggage' },
    { name: '진에어 (LJ)', url: 'https://www.jinair.com/ready/freeBaggage' },
    { name: '에어부산 (BX)', url: 'https://m.airbusan.com/mc/common/service/baggage/special' },
    { name: '제주항공 (7C)', url: 'https://www.jejuair.net/ko/linkService/baggageGuide/checkedBaggage.do' },
    { name: '이스타항공 (ZE)', url: 'https://www.eastarjet.com/newstar/PGWIU00001' },
    { name: '티웨이항공 (TW)', url: 'https://www.twayair.com/app/serviceInfo/contents/1148' },
    { name: '에어서울 (RS)', url: 'https://flyairseoul.com/CW/ko/destinations.do' },
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-end sm:justify-center p-0 sm:p-4">
      <div className="w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[95vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Carousel Header Image Area */}
        <div className="relative h-72 sm:h-80 flex-shrink-0 group">
          {/* Main Image with Transition */}
          <div className="w-full h-full overflow-hidden">
             <img 
              key={currentImageIndex}
              src={gallery[currentImageIndex]} 
              className="w-full h-full object-cover animate-in fade-in duration-500" 
              alt={`${product.title} ${currentImageIndex + 1}`} 
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-end p-6">
            <div className="bg-emerald-500/90 self-start text-white text-[10px] font-black px-2 py-1 rounded-md mb-2 uppercase tracking-widest">
              Premium Package
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{product.title}</h2>
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <MapPin className="w-4 h-4" />
              <span>{product.location} 프리미엄 투어</span>
            </div>
          </div>

          {/* Navigation Controls (Only if gallery has more than 1 image) */}
          {gallery.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {gallery.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-1.5 h-1.5 rounded-full transition-all ${currentImageIndex === idx ? 'bg-emerald-500 w-4' : 'bg-white/50'}`}
                  ></div>
                ))}
              </div>

              {/* Counter Badge */}
              <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white/10">
                {currentImageIndex + 1} / {gallery.length}
              </div>
            </>
          )}

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-colors z-20"
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
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* 요금 안내사항 */}
              <section className="space-y-4">
                <h4 className="font-black text-gray-900 text-lg flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
                  요금 안내사항
                </h4>
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl space-y-2">
                  <p className="text-sm text-rose-600 font-black">● 본 상품은 골프상품으로 홈페이지를 통한 온라인 예약이 출발 확정을 의미하는 것은 아닙니다.</p>
                  <p className="text-sm text-rose-600 font-black">● 예약 후 담당자가 항공과 숙박의 실시간 가능 여부를 확인 후, 출발 확정 안내 전화를 드립니다.</p>
                  <p className="text-sm text-rose-600 font-black">● 예약 시점에 따라 기본 좌석의 만석으로 인해 항공료 추가 차액이 발생될 수 있습니다.</p>
                </div>
                <ul className="space-y-2 pl-2 text-sm text-gray-600 font-medium">
                  <li>- 상기 회원 요금은 퍼시픽링스 멤버십 입회하신 회원님들 대상 기준 요금입니다.</li>
                  <li>- 상기 회원요금은 PLK회원 골프장 이용 횟수만큼 해외 횟수 &lt;3회&gt; 차감 기준 요금입니다. (블러프CC는 년간 4회 이용 기준)</li>
                  <li>- 밴드회원 및 일반 멤버십과 무관한 고객님들은 비회원이 기준입니다.</li>
                  <li>- 문의주신 일정에 따라 좌석 그룹좌석 마감시 금액 인상 될 수 있습니다.</li>
                  <li>- 상기 요금은 인천 출발 3박5일 기준이며, 그 외 체류기간 여행문의는 별도 문의바랍니다.</li>
                  <li>- 김해출발은 별도 문의 바랍니다.</li>
                </ul>
              </section>

              {/* 참고 사항 */}
              <section className="space-y-4">
                <h4 className="font-black text-gray-900 text-lg flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
                  참고 사항
                </h4>
                <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-2.5 text-sm text-gray-600 font-medium">
                  <p>- 여권 유효기간은 6개월 이상 있어야 합니다.</p>
                  <p>- 4인 이상 출발 가능한 상품입니다.</p>
                  <p>- 2인 진행시 현지에서 조인 라운드 진행될 수 있습니다.</p>
                  <p>- 2인 진행시 불포함 부분에 미팅&샌딩비는 인상됩니다.</p>
                  <p>- 홀수 인원 진행시 싱글카트비용, 싱글차지비용 발생됩니다.</p>
                  <p>- 상기기간에는 일자별 8석씩 그룹좌석이 확보된 기간입니다.</p>
                  <p>- 좌석 마감시 금액인상 또는 마감될 수 있습니다.</p>
                  <p>- 해외 패키지 상품은 천재지변, 개인사정에 의해 라운드를 못하셔도 여행비용에서 환불 되지 않습니다.</p>
                </div>
              </section>

              {/* 항공 관련 안내 */}
              <section className="space-y-4">
                <h4 className="font-black text-gray-900 text-lg flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
                  항공 및 수하물 안내
                </h4>
                <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl space-y-3">
                  <p className="text-sm font-bold text-blue-800">베트남항공 무료 위탁 수하물 규정:</p>
                  <ul className="text-sm text-blue-700 space-y-1 ml-2">
                    <li>• 1인 / 20KG(캐리어) + 1인 / 15KG(골프백) 가능</li>
                    <li>• 기내 수하물: 삼면의 합이 115cm 이내, 10kg 이하 1개 가능</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-xs font-black text-gray-400 mb-1 ml-1 uppercase tracking-wider">항공사별 수화물 규정 확인</p>
                  {airlineLinks.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-emerald-500 hover:text-emerald-600 transition-all text-sm font-bold text-gray-600 shadow-sm group"
                    >
                      {link.name}
                      <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-emerald-500" />
                    </a>
                  ))}
                </div>
              </section>

              {/* 예약 및 결제방법 */}
              <section className="space-y-4">
                <h4 className="font-black text-gray-900 text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  예약 및 결제방법
                </h4>
                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 space-y-3 text-sm text-emerald-900 font-medium">
                  <p>1. 해피콜, 전화예약 또는 온라인 및 모바일 예약 시 항공좌석 및 호텔 가능여부를 담당자와 확인 후 확약이 됩니다.</p>
                  <p>2. 예약과 동시에 <span className="font-black text-emerald-700">예약금 1인당 30만원</span> 입금(결제)하셔야 예약이 확약됩니다.</p>
                  <p>3. 출발확정 받으신 뒤, 출발일 기준 4주전까지 완불 입금 부탁드립니다.</p>
                  <p className="text-xs text-emerald-600 font-bold">* 일부 여행상품의 경우 위 기간내에 완불되지 않을 경우 예약이 취소될 수 있음을 알려드립니다.</p>
                </div>
              </section>

              {/* 약관 및 취소환불규정 */}
              <section className="space-y-4">
                <h4 className="font-black text-gray-900 text-lg flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-500" />
                  취소 및 환불 규정 (특별약관)
                </h4>
                <div className="bg-white border border-rose-100 p-5 rounded-2xl shadow-sm space-y-4">
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    상기 상품은 국외여행표준약관(소비자분쟁해결기준)과 달리 <span className="text-rose-600 font-bold underline">특별약관이 적용</span>되어 별도로 아래와 같은 취소수수료 특약이 적용되며, 별도의 동의 절차를 거치게 됩니다.
                  </p>
                  
                  <div className="space-y-2">
                    <h5 className="font-black text-gray-900 text-sm">■ 기간에 따른 취소 환불 규정</h5>
                    <div className="space-y-1.5">
                      <div className="flex justify-between p-2.5 bg-gray-50 rounded-lg text-sm">
                        <span className="text-gray-500 font-bold">여행 개시 31일전까지</span>
                        <span className="text-emerald-600 font-black">위약금 없음</span>
                      </div>
                      <div className="flex justify-between p-2.5 bg-rose-50/30 rounded-lg text-sm">
                        <span className="text-gray-600 font-bold">30 ~ 22일전까지 취소</span>
                        <span className="text-rose-600 font-black">여행 경비의 40% 배상</span>
                      </div>
                      <div className="flex justify-between p-2.5 bg-rose-50/50 rounded-lg text-sm">
                        <span className="text-gray-600 font-bold">21 ~ 15일전까지 취소</span>
                        <span className="text-rose-600 font-black">여행 경비의 60% 배상</span>
                      </div>
                      <div className="flex justify-between p-2.5 bg-rose-50/70 rounded-lg text-sm">
                        <span className="text-gray-600 font-bold">14 ~ 8일전까지 취소</span>
                        <span className="text-rose-600 font-black">여행 경비의 80% 배상</span>
                      </div>
                      <div className="flex justify-between p-2.5 bg-rose-600 text-white rounded-lg text-sm">
                        <span className="font-bold">7일 전 ~ 당일 취소</span>
                        <span className="font-black">여행 경비의 100% 배상</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-400 font-medium space-y-1 border-t pt-4">
                    <p>※ 항공권 발권이후에는 기간에 따른 규정 외 항공권취소패널티가 부가됩니다.</p>
                    <p>※ 모든 취소 및 변경 접수는 업무시간(평일 09:00~17:00) 내에만 가능합니다.</p>
                  </div>
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
