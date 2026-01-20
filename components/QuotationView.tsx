
import React, { useState } from 'react';
import { X, Printer, Copy, Check, Calendar, MapPin, Coffee, Utensils, Moon, FileText } from 'lucide-react';
import { ItineraryStep } from '../types';

interface QuotationViewProps {
  data: {
    reservor: {
      name: string;
      phone: string;
      email: string;
      guests: number;
    };
    quote: {
      pricePerPerson: number;
      totalPrice: number;
    };
    product: {
      title: string;
      description: string;
    };
    inquiry: string;
    itinerary?: ItineraryStep[];
    aiContent?: string; 
  };
  onClose: () => void;
}

const QuotationView: React.FC<QuotationViewProps> = ({ data, onClose }) => {
  const [copied, setCopied] = useState(false);
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const copyToClipboard = async () => {
    let itineraryText = "";
    if (data.itinerary && data.itinerary.length > 0) {
      itineraryText = data.itinerary
        .map(s => {
          return `[Day ${s.day}] ${s.title}\n - 오전: 호텔 조식 후 전용 차량 픽업 및 이동\n - 오후: ${s.description}\n - 저녁: 시내 자유 시간 및 현지 특식 만찬`;
        })
        .join('\n\n');
    } else if (data.aiContent) {
      itineraryText = data.aiContent;
    }

    const textToCopy = `
[TOUR MGM 프리미엄 견적서]
발행일: ${dateStr}
문의 담당: vnseen (Kakao)

■ 예약자 정보
- 성함: ${data.reservor.name}
- 연락처: ${data.reservor.phone}
- 인원: ${data.reservor.guests}명

■ 상품 견적
- 상품명: ${data.product.title}
- 1인 예상가: ₩${data.quote.pricePerPerson.toLocaleString()}
- 총 예상 견적: ₩${data.quote.totalPrice.toLocaleString()}
* 항공권 별도 / 전용 차량 및 가이드 포함

■ 상세 일정 안내
${itineraryText}

■ 안내 사항
- 본 견적서는 현지 사정 및 예약 시점에 따라 변동될 수 있습니다.
- 카카오톡 ID 'vnseen'으로 문의하시면 즉시 예약을 도와드립니다.
    `.trim();

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('복사에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-slate-900/70 backdrop-blur-md flex items-start justify-center overflow-y-auto p-4 py-8 sm:p-10">
      <div className="w-full max-w-[850px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
        
        <div className="sticky top-0 z-[160] bg-white/95 backdrop-blur-sm border-b border-slate-100 p-4 flex items-center justify-between no-print shadow-sm">
          <div className="flex items-center gap-2">
             <button 
              onClick={copyToClipboard}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md ${
                copied ? 'bg-emerald-500 text-white' : 'bg-[#fee500] text-[#1a1c23] hover:brightness-95'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? '복사 완료' : '카톡으로 복사하기'}
            </button>
            <button 
              onClick={() => window.print()} 
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-full font-bold text-sm hover:bg-slate-200 transition-all shadow-sm"
            >
              <Printer className="w-4 h-4" />
              PDF/인쇄
            </button>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-full transition-all border border-slate-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white p-8 sm:p-20 text-slate-900 min-h-screen relative">
          
          <div className="flex flex-col sm:flex-row justify-between items-start mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <span className="text-white font-black text-xl italic">M</span>
                </div>
                <h1 className="text-blue-600 text-4xl font-black tracking-tighter italic">TOUR MGM</h1>
              </div>
              <p className="text-slate-400 font-bold text-sm tracking-[0.2em] uppercase ml-12">Travel Quotation & Itinerary</p>
            </div>
            <div className="text-right text-xs text-slate-400 space-y-1 sm:mt-4">
              <p className="font-medium tracking-wider">문서번호: MGM-QT-{today.getTime().toString().slice(-6)}</p>
              <p className="font-medium tracking-wider">발행일자: {dateStr}</p>
              <p className="text-slate-600 font-black mt-2">담당 플래너: vnseen (KakaoTalk)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2 bg-slate-50 p-8 rounded-[32px] border border-slate-100 shadow-inner">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
                <Calendar className="w-5 h-5 text-blue-500" />
                <h3 className="font-black text-slate-800 text-base uppercase tracking-tight">예약자 상세 정보</h3>
              </div>
              <div className="space-y-4 text-[15px]">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">고객 성함</span>
                  <span className="font-black text-slate-900">{data.reservor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">연락처</span>
                  <span className="font-bold text-slate-900">{data.reservor.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">인원</span>
                  <span className="font-black text-blue-600">{data.reservor.guests}명</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 bg-blue-600 p-8 rounded-[32px] shadow-xl text-white flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <Check className="w-5 h-5 text-blue-200 stroke-[3]" />
                <h3 className="font-black text-blue-100 text-base uppercase tracking-tight">최종 견적 제안</h3>
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-end mb-6">
                   <div className="text-right w-full space-y-1">
                      <span className="text-xs text-blue-200 font-bold uppercase tracking-widest">합계 견적액</span>
                      <p className="text-5xl font-black tracking-tighter">₩{data.quote.totalPrice.toLocaleString()}</p>
                   </div>
                </div>
                <div className="pt-4 border-t border-white/20 text-[11px] text-blue-100 font-medium">
                  <span>* 항공권/개인팁/일정외 식사 불포함</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-slate-100 rounded-[32px] p-8 mb-10 bg-slate-50/50 border-l-8 border-l-blue-600">
            <h2 className="text-2xl font-black text-slate-900 mb-2">{data.product.title}</h2>
            <p className="text-[15px] text-slate-500 leading-relaxed font-medium">
              {data.product.description}
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">상세 일정 정보</h3>
              <div className="h-[3px] flex-grow bg-slate-900 rounded-full"></div>
            </div>

            {data.itinerary && data.itinerary.length > 0 ? (
              data.itinerary.map((step) => (
                <div key={step.day} className="flex flex-col md:flex-row bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-sm">
                  <div className="w-full md:w-36 bg-slate-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 py-8 md:py-0">
                    <span className="text-4xl font-black text-blue-600 tracking-tighter">Day {step.day}</span>
                  </div>
                  <div className="flex-grow p-10 md:p-12 space-y-8">
                    <h4 className="font-black text-slate-900 text-2xl tracking-tight">{step.title}</h4>
                    <div className="grid grid-cols-1 gap-8 relative pl-8">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                      <div className="relative">
                        <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white"></div>
                        <span className="text-xs font-black text-blue-600 uppercase mb-1 block">오전 (Morning)</span>
                        <p className="text-slate-600 font-bold">호텔 조식 후 전용 차량 픽업 및 이동</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white"></div>
                        <span className="text-xs font-black text-blue-600 uppercase mb-1 block">오후 (Afternoon)</span>
                        <p className="text-slate-600 font-bold">{step.description}</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-slate-800 border-4 border-white"></div>
                        <span className="text-xs font-black text-slate-800 uppercase mb-1 block">저녁 (Evening)</span>
                        <p className="text-slate-600 font-bold">현지 명소 관광 및 MGM 추천 맛집 석식 만찬</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100">
                <div className="flex items-center gap-3 mb-6 text-blue-600">
                  <FileText className="w-6 h-6" />
                  <span className="font-black text-lg">AI 플래너 맞춤 제안 상세 일정</span>
                </div>
                <div className="whitespace-pre-wrap text-slate-700 font-medium leading-relaxed text-base">
                  {data.aiContent}
                </div>
              </div>
            )}
          </div>

          <div className="mt-24 pt-12 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-300 font-bold tracking-[0.4em] uppercase">
              © {today.getFullYear()} TOUR MGM Vietnam. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationView;
