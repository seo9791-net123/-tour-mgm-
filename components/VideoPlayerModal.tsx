
import React from 'react';
import { X, Share2, Play, Pause, Video } from 'lucide-react';

interface VideoPlayerModalProps {
  video: {
    title: string;
    url: string;
  };
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  const isEmbed = video.url.includes('youtube.com') || video.url.includes('youtu.be');
  const isLocal = video.url.startsWith('blob:') || video.url.startsWith('data:') || video.url.endsWith('.mp4');

  const getWatchUrl = (url: string) => {
    if (url.includes('youtube.com/embed/')) {
      const id = url.split('youtube.com/embed/')[1]?.split(/[?&]/)[0];
      return id ? `https://www.youtube.com/watch?v=${id}` : url;
    }
    return url;
  };

  const handleShare = () => {
    if (isLocal) {
      alert('로컬 파일은 공유할 수 없습니다. 유튜브 링크를 이용해주세요.');
      return;
    }
    
    const currentUrl = window.location.href;
    const watchUrl = getWatchUrl(video.url);
    
    let safeShareUrl = '';
    try {
      const parsed = new URL(currentUrl);
      if (parsed.protocol.startsWith('http')) {
        safeShareUrl = currentUrl;
      } else {
        safeShareUrl = watchUrl;
      }
    } catch (e) {
      safeShareUrl = watchUrl;
    }

    if (navigator.share && safeShareUrl.startsWith('http')) {
      navigator.share({
        title: video.title,
        text: `TOUR MGM에서 추천하는 베트남 현지 영상: ${video.title}`,
        url: safeShareUrl,
      }).catch((err) => {
        console.error('Share failed:', err);
        navigator.clipboard.writeText(safeShareUrl);
        alert('링크가 클립보드에 복사되었습니다.');
      });
    } else {
      navigator.clipboard.writeText(safeShareUrl);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500 backdrop-blur-md">
      <div className="w-full max-w-5xl relative">
        <div className="flex items-center justify-between mb-6 text-white px-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-1">MGM Exclusive Live</span>
            <h3 className="text-xl sm:text-2xl font-black truncate max-w-[80vw]">{video.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:rotate-90"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.2)] ring-1 ring-white/10 group">
          {isEmbed ? (
            <iframe 
              src={`${video.url}${video.url.includes('?') ? '&' : '?'}autoplay=1&rel=0`}
              className="w-full h-full"
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : isLocal ? (
            <video 
              src={video.url}
              className="w-full h-full"
              controls
              autoPlay
              controlsList="nodownload"
            ></video>
          ) : (
             <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                <Video className="w-16 h-16 opacity-20" />
                <p className="font-bold">지원되지 않는 영상 형식입니다.</p>
             </div>
          )}
          
          {/* Glossy Overlay */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-gray-400">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <span className="text-white text-xl font-black italic">M</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white tracking-tight leading-none">TOUR MGM 베트남 지사</span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              </div>
              <span className="text-[11px] font-bold text-gray-500 mt-1 uppercase tracking-tighter">Verified Premium Content • {isLocal ? 'Local File' : '4K Quality'}</span>
            </div>
          </div>

          {!isLocal && (
            <button 
              onClick={handleShare}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-[#fee500] text-[#1a1c23] rounded-2xl font-black text-base shadow-[0_10px_30px_rgba(254,229,0,0.3)] hover:scale-105 active:scale-95 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
              <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              현지 감동 영상 공유하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
