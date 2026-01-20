
import React from 'react';
import { X } from 'lucide-react';

interface VideoPlayerModalProps {
  video: {
    title: string;
    url: string;
  };
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  // Add autoplay and rel=0 for better experience
  const embedUrl = video.url.includes('?') 
    ? `${video.url}&autoplay=1&rel=0` 
    : `${video.url}?autoplay=1&rel=0`;

  return (
    <div className="fixed inset-0 z-[110] bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-5xl relative">
        <div className="flex items-center justify-between mb-4 text-white">
          <h3 className="text-lg font-bold truncate pr-8">{video.title}</h3>
          <button 
            onClick={onClose}
            className="absolute -top-12 -right-2 sm:-right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
        
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          <iframe 
            src={embedUrl}
            className="w-full h-full"
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-black italic">M</span>
            </div>
            <span className="text-sm font-bold text-gray-300 tracking-tight">TOUR MGM 공식 채널</span>
          </div>
          <p className="text-xs font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5">
            영상 우측 하단의 [전체화면] 버튼을 누르면 더 크게 감상할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
