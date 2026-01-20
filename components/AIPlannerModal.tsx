
import React, { useState } from 'react';
import { X, Sparkles, MapPin, Target, Hotel, Calendar, Users, Send, Loader2, Plus, Minus } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AIPlannerModalProps {
  onClose: () => void;
  onConsultation: (message: string) => void;
}

const AIPlannerModal: React.FC<AIPlannerModalProps> = ({ onClose, onConsultation }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    destination: '호치민',
    theme: '골프',
    hotelGrade: '5성급 럭셔리',
    duration: '3박 4일',
    guests: 4
  });

  const generateItinerary = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        당신은 베트남 전문 여행사 'TOUR MGM'의 베테랑 시니어 여행 플래너입니다. 
        고객님의 요청에 따라 아주 상세하고 전문적인 '시간대별' 여행 일정표를 한국어로 작성해주세요.
        
        요청 조건:
        - 여행지: ${formData.destination} (주변 명소 포함 가능)
        - 테마: ${formData.theme}
        - 숙소 등급: ${formData.hotelGrade}
        - 일정: ${formData.duration}
        - 인원: 총 ${formData.guests}명
        
        일정표 작성 가이드라인 (매우 상세하게):
        1. **매력적인 상품명**: 고객의 설렘을 자극하는 고급스러운 제목.
        2. **핵심 포인트**: 이 여행 상품만의 독보적인 장점 3가지를 구체적으로 설명.
        3. **초정밀 일정표**:
           - 각 일자별로 [오전 / 점심 / 오후 / 저녁 / 야간 / 숙박]으로 세분화하여 작성.
           - 단순히 '식사'가 아닌, 구체적인 현지 맛집 이름과 추천 메뉴(예: 분짜, 반세오 전문점 등)를 포함.
           - 골프 테마인 경우, 특정 골프장(예: 탄손넛, 트윈도브스 등)의 코스 특징과 티업 시간 예시를 포함.
           - 관광지의 경우, 역사적 배경이나 즐길 거리를 2~3문장으로 상세히 설명.
           - 이동 수단과 이동 시간(예: 전용 리무진으로 약 40분 이동)을 명시.
        4. **포함/불포함 사항**: 실제 예약 시 필요한 항목을 꼼꼼하게 리스트업.
        5. **플래너 한마디**: 현지 날씨 팁, 복장 매너, 매너팁 정보 등 유용한 조언.
        6. **예상 견적**: 1인당 합리적인 가격대 제안.
        
        출력 형식: 마크다운(Markdown)을 활용하여 가독성이 뛰어나고 전문적인 여행사 제안서처럼 풍부한 표현을 사용하여 작성해주세요.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: prompt }] }],
      });

      setResult(response.text || "일정을 생성할 수 없습니다. 다시 시도해주세요.");
      setStep(3);
    } catch (error) {
      console.error("AI Generation Error:", error);
      alert("AI 일정 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleConsultationClick = () => {
    if (result) {
      onConsultation(result);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const adjustGuests = (amount: number) => {
    const newCount = Math.max(1, formData.guests + amount);
    updateField('guests', newCount);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-emerald-600 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            <h2 className="text-xl font-bold tracking-tight">AI 맞춤 여행 설계</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 sm:p-10 bg-gray-50/50">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-gray-900 leading-tight">어떤 베트남 여행을<br/>꿈꾸고 계신가요?</h3>
                <p className="text-gray-500 mt-2">입력하신 정보를 바탕으로 전문가 수준의 상세 일정을 제안합니다.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <MapPin className="w-4 h-4 text-emerald-600" /> 여행지 선택
                  </label>
                  <select 
                    value={formData.destination}
                    onChange={(e) => updateField('destination', e.target.value)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer"
                  >
                    <option>호치민</option>
                    <option>붕따우</option>
                    <option>무이네</option>
                    <option>달랏</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <Target className="w-4 h-4 text-emerald-600" /> 여행 테마
                  </label>
                  <select 
                    value={formData.theme}
                    onChange={(e) => updateField('theme', e.target.value)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer"
                  >
                    <option>골프</option>
                    <option>힐링&관광</option>
                    <option>비지니스</option>
                    <option>먹거리 탐방</option>
                    <option>문화 투어</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <Hotel className="w-4 h-4 text-emerald-600" /> 숙소 등급
                  </label>
                  <select 
                    value={formData.hotelGrade}
                    onChange={(e) => updateField('hotelGrade', e.target.value)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer"
                  >
                    <option>3성급 실속형</option>
                    <option>4성급 준특급</option>
                    <option>5성급 럭셔리</option>
                    <option>프라이빗 풀빌라</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <Calendar className="w-4 h-4 text-emerald-600" /> 여행 일정
                  </label>
                  <select 
                    value={formData.duration}
                    onChange={(e) => updateField('duration', e.target.value)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer"
                  >
                    <option>2박 3일</option>
                    <option>3박 4일</option>
                    <option>3박 5일</option>
                    <option>4박 5일</option>
                    <option>일주일 살기</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-3">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <Users className="w-4 h-4 text-emerald-600" /> 여행 인원
                  </label>
                  <div className="flex items-center justify-between bg-white border border-gray-200 p-2 rounded-2xl shadow-sm">
                    <button 
                      onClick={() => adjustGuests(-1)}
                      className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 rounded-xl transition-colors"
                      disabled={formData.guests <= 1}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <div className="text-center">
                      <span className="text-2xl font-black text-gray-900">{formData.guests}</span>
                      <span className="ml-1 text-gray-500 font-bold">명</span>
                    </div>
                    <button 
                      onClick={() => adjustGuests(1)}
                      className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 rounded-xl transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-5 bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 group mt-8"
              >
                상품 생성하기
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-12 h-12 text-emerald-600" />
                </div>
                <div className="absolute -top-2 -right-2">
                   <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 text-center">현지 전문가 AI가<br/>최적의 일정을 설계 중입니다...</h3>
              <p className="text-gray-500 mt-4 text-center max-w-sm">
                최신 골프장 컨디션, 최고의 로컬 맛집, 그리고 효율적인 이동 동선을 분석하여 초정밀 일정표를 만들고 있습니다.
              </p>
              
              {!loading && (
                 <button 
                  onClick={generateItinerary}
                  className="mt-8 px-10 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-700 transition-colors"
                 >
                   설계 시작하기
                 </button>
              )}
            </div>
          )}

          {step === 3 && result && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-inner prose prose-emerald max-w-none">
                <div className="flex items-center gap-2 text-emerald-600 font-black mb-8 border-b pb-4 text-xl">
                  <Sparkles className="w-7 h-7" />
                  MGM AI 추천 맞춤 일정
                </div>
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed font-medium text-base space-y-4">
                  {result}
                </div>
              </div>
              
              <div className="flex gap-4 mt-8 sticky bottom-0 bg-gray-50/90 backdrop-blur-sm py-4 border-t border-gray-200">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  수정하기
                </button>
                <button 
                  onClick={handleConsultationClick}
                  className="flex-[2] py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  이 일정으로 카톡 상담
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlannerModal;
