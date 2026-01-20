
import React from 'react';
// Fix: Import ShieldAlert instead of ShieldCheck
import { Phone, Mail, MapPin, MessageCircle, ShieldAlert, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6 sm:px-10 mt-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg italic">M</span>
              </div>
              <h2 className="text-white text-xl font-black tracking-tighter">TOUR MGM <span className="text-emerald-500">VIETNAM</span></h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                <p className="text-sm leading-relaxed">
                  Vietnam, Ho Chi Minh City, District 7, Phu My Hung,<br />
                  Phường Tân Phong, Căn Hộ Scenic Valley 1
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <p className="text-sm">+84 077 803 8743 (현지직통)</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <p className="text-sm">seo9791@gmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#fee500] flex-shrink-0" />
                <p className="text-sm font-bold">카카오톡 ID: <span className="text-white">vnseen1</span></p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div className="space-y-4">
              <h3 className="text-white text-sm font-black uppercase tracking-widest">Customer</h3>
              <ul className="space-y-2 text-xs font-bold">
                <li><a href="#" className="hover:text-emerald-500 transition-colors">이용약관</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">취소 및 환불규정</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">고객센터</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-white text-sm font-black uppercase tracking-widest">Partners</h3>
              <ul className="space-y-2 text-xs font-bold">
                <li><a href="#" className="hover:text-emerald-500 transition-colors">제휴 문의</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">현지 가이드 신청</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">B2B 견적 문의</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 space-y-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-medium opacity-60">
            <p>상호명: TOUR MGM (투어 엠지엠)</p>
            <p>대표자: 홍길동</p>
            <p>사업자등록번호: [현지 법인 번호 또는 국내 대행 번호]</p>
            <p>통신판매업신고: 제 2024-호치민-0000호</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[10px] opacity-40 font-bold tracking-[0.2em] uppercase">
              © 2024 TOUR MGM VIETNAM GOLF & TOUR. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10">
                <ShieldAlert className="w-3 h-3 text-emerald-500" />
                <span>100% 보증보험 가입</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10">
                <Globe className="w-3 h-3 text-emerald-500" />
                <span>English Support Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/5 text-[10px] leading-relaxed opacity-50 italic">
          TOUR MGM은 베트남 현지 합법 법인을 통해 운영되는 프리미엄 골프 & 투어 전문 여행사입니다. 
          모든 여행 상품은 현지 가이드와 전용 차량 시스템을 통해 안전하고 투명하게 진행됩니다. 
          호치민, 붕따우, 무이네, 달랏 지역의 최고급 호텔 및 명문 골프장과의 직접 계약을 통해 합리적인 가격을 보장합니다.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
