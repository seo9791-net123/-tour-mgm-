
import React from 'react';
import { VideoItem } from '../types';
import { Play, Edit3, Trash2, PlusCircle, ChevronRight, Users } from 'lucide-react';

interface VideoSectionProps {
  videos: VideoItem[];
  isAdmin: boolean;
  visitorCount: number;
  onVideoClick: (video: { title: string, url: string }) => void;
  onEditVideo: (video: VideoItem) => void;
  onDeleteVideo: (id: string) => void;
  onSeeAll: () => void;
  onAddVideo: () => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({ 
  videos, 
  isAdmin, 
  visitorCount,
  onVideoClick, 
  onEditVideo, 
  onDeleteVideo,
  onSeeAll,
  onAddVideo
}) => {
  return (
    <div className="my-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
            MGM LIVE! 현장 영상
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1 ml-3">Real-time Vietnam Status</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Visitor Counter moved from Navbar */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full mr-1">
            <div className="w-1.5 h-1.5 bg-[#008d62] rounded-full animate-pulse"></div>
            <span className="text-[9px] font-black text-[#008d62] uppercase tracking-tighter hidden xs:inline">Today Visitors</span>
            <div className="flex items-center gap-1 text-emerald-800 font-black text-xs">
              <Users className="w-3 h-3" />
              {visitorCount.toLocaleString()}
            </div>
          </div>

          {isAdmin && (
            <button 
              onClick={onAddVideo}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-black hover:bg-emerald-100 transition-all border border-emerald-200"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              영상 등록
            </button>
          )}
          <button 
            onClick={onSeeAll}
            className="text-emerald-600 text-xs font-black hover:underline flex items-center gap-0.5 bg-emerald-50/50 px-3 py-1.5 rounded-full"
          >
            전체보기
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div 
              key={video.id} 
              className="min-w-[280px] w-[280px] bg-white rounded-[28px] overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-lg transition-all relative"
            >
              <div className="relative aspect-video overflow-hidden" onClick={() => onVideoClick(video)}>
                {/* High Quality 3D Style Thumbnail */}
                <img 
                  src={video.thumbnail} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={video.title} 
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
                  </div>
                </div>
                
                {/* Glossy Overlay */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
              </div>

              {isAdmin && (
                <div className="absolute top-3 right-3 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 backdrop-blur-sm p-1 rounded-full">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onEditVideo(video); }}
                    className="p-2 bg-white/90 text-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white transition-all shadow-md backdrop-blur-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteVideo(video.id); }}
                    className="p-2 bg-white/90 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-all shadow-md backdrop-blur-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="p-4" onClick={() => onVideoClick(video)}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-black rounded-md uppercase tracking-tighter">@{video.category}</span>
                </div>
                <h3 className="text-sm font-black text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">{video.title}</h3>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full py-12 flex flex-col items-center justify-center bg-white rounded-[32px] border border-dashed border-gray-200 text-gray-400">
             <Play className="w-12 h-12 mb-3 opacity-10" />
             <p className="text-sm font-bold">등록된 영상이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
