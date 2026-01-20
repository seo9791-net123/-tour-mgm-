
import React, { useState } from 'react';
import { X, Play, Youtube, LayoutGrid, ChevronRight, Share2, Edit3, Trash2, PlusCircle } from 'lucide-react';
import { VideoItem } from '../types';

interface VideoGalleryViewProps {
  videos: VideoItem[];
  isAdmin: boolean;
  onClose: () => void;
  onEditVideo: (video: VideoItem) => void;
  onDeleteVideo: (id: string) => void;
  onAddVideo: () => void;
}

const VideoGalleryView: React.FC<VideoGalleryViewProps> = ({ 
  videos, isAdmin, onClose, onEditVideo, onDeleteVideo, onAddVideo 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [featuredVideo, setFeaturedVideo] = useState<VideoItem>(videos[0]);

  const categories = [
    { id: 'ALL', label: '전체보기' },
    { id: 'BRAND', label: 'MGM 스토리' },
    { id: 'GOLF', label: '골프 코스' },
    { id: 'HOTEL', label: '숙소/빌라' },
    { id: 'FOOD', label: '베트남 미식' },
    { id: 'TOUR', label: '관광 현장' }
  ];

  const filteredVideos = selectedCategory === 'ALL' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

  return (
    <div className="h-[calc(100vh-64px)] w-full flex flex-col bg-[#0f172a] animate-in slide-in-from-right duration-300 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
            <Youtube className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white font-black tracking-tight leading-none">MGM LIVE!</h2>
            <p className="text-[10px] text-emerald-400 font-bold mt-1 uppercase">Cinematic Gallery</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button 
              onClick={onAddVideo}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black hover:bg-emerald-700 transition-all shadow-lg"
            >
              <PlusCircle className="w-4 h-4" /> 영상 추가
            </button>
          )}
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full p-6 space-y-10">
        {/* Featured Video Player */}
        <section className="animate-in fade-in zoom-in duration-700">
          <div className="relative aspect-video w-full bg-black rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] ring-1 ring-white/10 group">
            <iframe 
              src={`${featuredVideo.url}?autoplay=0&rel=0&modestbranding=1`}
              className="w-full h-full"
              title={featuredVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-grow">
              <span className="px-4 py-1.5 bg-emerald-600/20 text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-500/20">Now Playing</span>
              <h1 className="text-3xl md:text-4xl font-black text-white mt-4 leading-tight tracking-tight">{featuredVideo.title}</h1>
              <p className="text-white/50 text-base mt-3 max-w-3xl leading-relaxed font-medium">TOUR MGM이 전하는 베트남 현지 실시간 현황입니다. 최고의 화질과 생생한 사운드로 미리 여행을 즐겨보세요.</p>
            </div>
            <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-[20px] font-black text-sm transition-all border border-white/10 hover:scale-105 active:scale-95">
              <Share2 className="w-5 h-5" /> 친구에게 공유
            </button>
          </div>
        </section>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-2xl text-[11px] font-black transition-all whitespace-nowrap border ${
                selectedCategory === cat.id 
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl shadow-emerald-900/40 scale-105' 
                  : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <LayoutGrid className="w-4 h-4" />
            Collection Highlights ({filteredVideos.length})
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-12">
            {filteredVideos.map((video) => (
              <div 
                key={video.id}
                onClick={() => { setFeaturedVideo(video); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`group relative bg-white/5 rounded-[32px] overflow-hidden border transition-all cursor-pointer ${
                  featuredVideo.id === video.id ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-white/5 hover:border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="" 
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                      <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
                    </div>
                  </div>
                  {featuredVideo.id === video.id && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-600 text-white text-[9px] font-black rounded-lg shadow-lg">PLAYING</div>
                  )}
                  
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onEditVideo(video); }}
                        className="p-2 bg-white/20 hover:bg-emerald-600 text-white rounded-full transition-all backdrop-blur-md"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteVideo(video.id); }}
                        className="p-2 bg-white/20 hover:bg-rose-600 text-white rounded-full transition-all backdrop-blur-md"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-400 text-[9px] font-black uppercase tracking-widest">#{video.category}</span>
                  </div>
                  <h3 className="text-white font-black text-sm line-clamp-2 leading-relaxed tracking-tight group-hover:text-emerald-400 transition-colors">{video.title}</h3>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <span className="text-white/30 text-[10px] font-bold">TOUR MGM</span>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VideoGalleryView;
