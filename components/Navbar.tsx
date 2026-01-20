
import React from 'react';
import { Menu, User, Search, Users } from 'lucide-react';

interface NavbarProps {
  onNav: (page: string) => void;
  onOpenAuth: () => void;
  visitorCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onNav, onOpenAuth, visitorCount }) => {
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
        {/* Visitor Counter */}
        <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full mr-1">
          <div className="w-1.5 h-1.5 bg-[#008d62] rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-[#008d62] uppercase tracking-tighter hidden md:inline">Today Visitors</span>
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
            className="flex items-center gap-2 px-4 py-2 bg-[#008d62] text-white rounded-full font-bold hover:bg-[#007652] transition-colors shadow-sm text-sm"
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
