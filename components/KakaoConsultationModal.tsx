
import React, { useState } from 'react';
import { X, User, Phone, Mail, MessageSquare, MessageCircle } from 'lucide-react';

interface KakaoConsultationModalProps {
  onClose: () => void;
  onFinalSubmit?: (data: any) => void;
  initialInquiry?: string;
}

const KakaoConsultationModal: React.FC<KakaoConsultationModalProps> = ({ onClose, onFinalSubmit, initialInquiry = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: initialInquiry
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFinalSubmit) {
      onFinalSubmit(formData);
    } else {
      alert(`성함: ${formData.name}\n연락처: ${formData.phone}\n견적서 정보가 복사되었습니다. 카카오톡 채팅방(ID: vnseen)에 붙여넣기 해주세요.`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-white rounded-[24px] overflow-hidden shadow-2xl animate-in zoom-in duration-200">
        
        {/* Header: Dark Blue/Black */}
        <div className="bg-[#1a1c23] p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#fee500] rounded-full flex items-center justify-center shadow-inner">
              <MessageCircle className="w-6 h-6 text-[#1a1c23] fill-[#1a1c23]" />
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">카카오톡 예약 문의</h2>
              <p className="text-gray-400 text-sm mt-0.5">
                카카오톡 ID: <span className="text-[#fee500] font-bold tracking-wider">vnseen</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* 성함 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">성함</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                required
                type="text" 
                placeholder="홍길동"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fee500] focus:border-[#fee500] text-gray-900 transition-all"
              />
            </div>
          </div>

          {/* 연락처 & 이메일 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">연락처</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  required
                  type="text" 
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fee500] focus:border-[#fee500] text-sm text-gray-900 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">이메일 (선택)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fee500] focus:border-[#fee500] text-sm text-gray-900 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 문의 내용 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">문의 내용</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <textarea 
                placeholder="궁금하신 점이나 요청사항을 적어주세요."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fee500] focus:border-[#fee500] min-h-[140px] text-gray-900 transition-all resize-none"
              />
            </div>
          </div>

          {/* Guide Box */}
          <div className="bg-[#fffbe6] border border-[#ffe58f] rounded-xl p-4">
            <h4 className="flex items-center gap-1.5 text-[#d48806] font-bold text-sm mb-1">
              <span>💡</span> 전송 안내
            </h4>
            <p className="text-[#856404] text-xs leading-relaxed">
              버튼을 누르면 <span className="font-bold">견적서 상세 정보가 생성</span>됩니다.<br />
              카카오톡 <span className="font-bold">vnseen</span>으로 문의하시면 즉시 연결됩니다.
            </p>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full py-4 bg-[#fee500] text-[#1a1c23] font-bold rounded-2xl shadow-lg hover:brightness-95 transition-all flex items-center justify-center gap-2 group mt-2"
          >
            <MessageSquare className="w-5 h-5 fill-[#1a1c23]" />
            견적 확인 및 상담 연결
          </button>
        </form>
      </div>
    </div>
  );
};

export default KakaoConsultationModal;
