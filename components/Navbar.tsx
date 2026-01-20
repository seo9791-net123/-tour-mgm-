
import React from 'react';
import { Menu, User, Search, LogOut, ShieldCheck } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  onNav: (page: string) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  currentUser: UserType | null;
  visitorCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onNav, onOpenAuth, onLogout, isLoggedIn, currentUser }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={() => onNav('home')} className="flex items-center gap-3 cursor-pointer text-left group">
          {/* Logo Icon Area */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#008d62] rounded-xl flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
            <span className="text-white font-black text-2xl sm:text-2xl tracking-tighter">M</span>
          </div>
          
          {/* Logo Text Area */}
          <div className="flex flex-col justify-center">
            <h1 className="text-xl sm:text-[22px] font-black text-[#1a1c23] tracking-tighter leading-none mb-1">
              TOUR MGM
            </h1>
            <p className="text-[9px] sm:text-[10px] text-[#008d62] font-extrabold leading-none uppercase tracking-[0.05em]">
              PREMIUM GOLF & TRAVEL
            </p>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <div className="flex items-center gap-1.5">
                  {currentUser?.role === 'admin' && (
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-black rounded uppercase flex items-center gap-0.5">
                      <ShieldCheck className="w-2.5 h-2.5" /> ADMIN
                    </span>
                  )}
                  <span className="text-sm font-black text-gray-900">{currentUser?.nickname}님</span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Welcome Back</span>
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 transition-colors text-sm group"
              >
                <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 py-2 bg-[#008d62] text-white rounded-full font-bold hover:bg-[#007652] transition-colors shadow-sm text-sm"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">로그인 / 가입</span>
            </button>
          )}

          <button className="p-2 sm:hidden hover:bg-gray-100 rounded-full transition-colors">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
