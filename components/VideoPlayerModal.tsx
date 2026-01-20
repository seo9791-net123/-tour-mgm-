
import React from 'react';
import { X, Share2, Play } from 'lucide-react';

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

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: `TOUR MGM에서 추천하는 베트남 현지 영상: ${video.title}`,
        url: shareUrl,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };

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
        
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
          <iframe 
            src={embedUrl}
            className="w-full h-full"
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          
          {/* Persistent Play Overlay Indicator (Visual Only, passthrough clicks) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 group-hover:opacity-70 transition-opacity duration-500">
            <div className="w-20 h-20 bg-emerald-600/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Play className="w-10 h-10 text-white fill-white translate-x-1" />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
                <span className="text-white text-xs font-black italic">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-white tracking-tight leading-none mb-1">TOUR MGM 공식 채널</span>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Premium Video Content</span>
              </div>
            </div>
            <p className="hidden lg:block text-xs font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5">
              영상 우측 하단의 [전체화면] 버튼을 누르면 더 크게 감상할 수 있습니다.
            </p>
          </div>

          <button 
            onClick={handleShare}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-[#fee500] text-[#1a1c23] rounded-2xl font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all animate-pulse-subtle group"
          >
            <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            친구에게 영상 공유
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
