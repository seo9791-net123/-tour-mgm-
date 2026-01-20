
import React from 'react';
import { Menu, User, Search, Users } from 'lucide-react';

interface NavbarProps {
  onNav: (page: string) => void;
  onOpenAuth: () => void;
  visitorCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onNav, onOpenAuth, visitorCount }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={() => onNav('home')} className="flex items-center gap-2 cursor-pointer text-left">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none mb-0.5">TOUR MGM</h1>
            <p className="text-[10px] text-emerald-600 font-medium leading-none uppercase">Premium Golf & Travel</p>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Visitor Counter - Right Side */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full mr-1">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter hidden md:inline">일일 방문자수</span>
          <div className="flex items-center gap-1 text-emerald-800 font-black text-xs">
            <Users className="w-3 h-3" />
            {visitorCount.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">로그인 / 가입</span>
          </button>
          <button className="p-2 sm:hidden hover:bg-gray-100 rounded-full transition-colors">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
