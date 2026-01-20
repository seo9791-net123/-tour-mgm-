
import React from 'react';
import { MOCK_VIDEOS } from '../constants';
import { Play } from 'lucide-react';

interface VideoSectionProps {
  onVideoClick: (video: { title: string, url: string }) => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({ onVideoClick }) => {
  // Helper to get YouTube thumbnail from embed URL
  const getThumbnail = (url: string) => {
    const id = url.split('/').pop()?.split('?')[0];
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-black text-gray-900">MGM LIVE! 현장 영상</h2>
        <button className="text-emerald-600 text-xs font-bold hover:underline">유튜브로 보기</button>
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar">
        {MOCK_VIDEOS.map((video) => (
          <div 
            key={video.id} 
            onClick={() => onVideoClick(video)}
            className="min-w-[280px] w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={getThumbnail(video.url)} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt={video.title} 
                onError={(e) => {
                  // Fallback to smaller thumbnail if maxresdefault doesn't exist
                  (e.target as HTMLImageElement).src = getThumbnail(video.url).replace('maxresdefault', 'hqdefault');
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">{video.title}</h3>
              <p className="text-[10px] text-gray-400 mt-1">TOUR MGM 베트남 채널</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
