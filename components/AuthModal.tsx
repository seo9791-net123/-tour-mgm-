
import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Fingerprint, LogIn, Loader2 } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: UserType) => void;
}

// 구글 앱스 스크립트 배포 후 생성된 웹 앱 URL을 여기에 입력하세요
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby_XXXXXXXXXXXX/exec"; 

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    name: '',
    email: '',
    password: ''
  });

  const saveToGoogleSheet = async () => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // CORS 정책 우회를 위해 no-cors 사용 (전송 전용)
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log("Data sent to Google Sheet");
    } catch (error) {
      console.error("Spreadsheet Error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 회원가입 모드일 때만 스프레드시트에 저장
    if (mode === 'signup') {
      await saveToGoogleSheet();
    }
    
    // 관리자 계정 체크
    const isAdmin = formData.email === 'admin' && formData.password === 'rlathdud1~';
    
    const user: UserType = {
      id: isAdmin ? 'admin-id' : `u-${Date.now()}`,
      nickname: isAdmin ? 'MGM 관리자' : (formData.nickname || (mode === 'login' ? 'VIP 골퍼' : '새친구')),
      name: isAdmin ? '관리자' : (formData.name || '방문자'),
      email: formData.email,
      role: isAdmin ? 'admin' : 'user'
    };

    if (mode === 'login' && formData.email === 'admin' && formData.password !== 'rlathdud1~') {
      alert('관리자 비밀번호가 일치하지 않습니다.');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      onLogin(user);
      if (isAdmin) {
        alert('관리자 계정으로 로그인되었습니다. 관리 권한이 활성화됩니다.');
      } else if (mode === 'signup') {
        alert('회원가입이 완료되었습니다! 정보가 MGM DB에 안전하게 기록되었습니다.');
      }
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden relative shadow-2xl animate-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-8">
          <div className="mb-8 text-center sm:text-left">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 mx-auto sm:mx-0">
              <LogIn className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">
              {mode === 'login' ? '다시 오신걸 환영해요!' : '함께 떠나볼까요?'}
            </h2>
            <p className="text-gray-500 mt-2">베트남 여행의 명가, TOUR MGM</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-400 ml-1 uppercase tracking-widest">Nickname (닉네임)</label>
                  <div className="relative">
                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    <input 
                      required
                      type="text" 
                      placeholder="라운지에서 사용할 닉네임"
                      value={formData.nickname}
                      onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-400 ml-1 uppercase tracking-widest">Full Name (성함)</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-bold"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-400 ml-1 uppercase tracking-widest">Email Address / ID</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="text" 
                  placeholder="이메일 또는 관리자 ID"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-bold"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-400 ml-1 uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="password" 
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-bold"
                />
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              type="submit" 
              className={`w-full py-4 ${isSubmitting ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  처리 중...
                </>
              ) : (
                <>
                  {mode === 'login' ? '로그인' : '회원 가입'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-2">
            <span className="text-sm text-gray-500">
              {mode === 'login' ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'}
            </span>
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-sm font-black text-emerald-600 hover:underline"
            >
              {mode === 'login' ? '회원가입' : '로그인'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
