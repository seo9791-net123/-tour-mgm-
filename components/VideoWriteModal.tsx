
import React, { useState, useEffect, useRef } from 'react';
import { X, Youtube, Type, Link as LinkIcon, Save, Plus, Tag, Image as ImageIcon, Video, Upload, Trash2 } from 'lucide-react';
import { VideoItem } from '../types';

interface VideoWriteModalProps {
  onClose: () => void;
  onSave: (video: Omit<VideoItem, 'id'>) => void;
  editingVideo?: VideoItem;
}

const VideoWriteModal: React.FC<VideoWriteModalProps> = ({ onClose, onSave, editingVideo }) => {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'GOLF',
    thumbnail: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800'
  });
  const [isLocalVideo, setIsLocalVideo] = useState(false);

  useEffect(() => {
    if (editingVideo) {
      setFormData({
        title: editingVideo.title,
        url: editingVideo.url,
        category: editingVideo.category,
        thumbnail: editingVideo.thumbnail
      });
      // Check if URL is a Blob URL or standard embed
      if (editingVideo.url.startsWith('blob:') || editingVideo.url.startsWith('data:')) {
        setIsLocalVideo(true);
      }
    }
  }, [editingVideo]);

  const categories = [
    { id: 'BRAND', label: 'MGM 스토리' },
    { id: 'GOLF', label: '골프 코스' },
    { id: 'HOTEL', label: '숙소/빌라' },
    { id: 'FOOD', label: '베트남 미식' },
    { id: 'TOUR', label: '관광 현장' }
  ];

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB Limit
        alert('동영상 파일은 100MB를 초과할 수 없습니다.');
        return;
      }
      const blobUrl = URL.createObjectURL(file);
      setFormData({ ...formData, url: blobUrl });
      setIsLocalVideo(true);
    }
  };

  const clearLocalVideo = () => {
    if (formData.url.startsWith('blob:')) {
      URL.revokeObjectURL(formData.url);
    }
    setFormData({ ...formData, url: '' });
    setIsLocalVideo(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    let processedUrl = formData.url;
    // Youtube URL processing if not a local file
    if (!isLocalVideo) {
      if (processedUrl.includes('watch?v=')) {
        processedUrl = processedUrl.replace('watch?v=', 'embed/').split('&')[0];
      } else if (processedUrl.includes('youtu.be/')) {
        processedUrl = processedUrl.replace('youtu.be/', 'youtube.com/embed/').split('?')[0];
      }
    }

    onSave({
      ...formData,
      url: processedUrl
    });
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#1e293b] rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        <div className="p-6 bg-emerald-600 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black">{editingVideo ? '영상 정보 수정' : '현장 영상 업로드'}</h2>
              <p className="text-white/80 text-xs">최대 100MB 파일 또는 유튜브 링크 등록이 가능합니다.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto no-scrollbar">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400">
              <Type className="w-4 h-4 text-emerald-500" /> 영상 제목
            </label>
            <input 
              required
              type="text" 
              placeholder="예: 호치민 트윈도브스 라운딩 현장"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-5 py-4 bg-[#0f172a] border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-white shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400">
              <Video className="w-4 h-4 text-emerald-500" /> 동영상 업로드 / 링크
            </label>
            
            {isLocalVideo ? (
              <div className="flex items-center justify-between p-4 bg-emerald-600/10 border border-emerald-500/30 rounded-2xl animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold text-xs block">로컬 비디오 파일 선택됨</span>
                    <span className="text-gray-500 text-[10px] font-medium">업로드 준비 완료</span>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={clearLocalVideo}
                  className="p-2 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                <div 
                  onClick={() => videoInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 py-8 border-2 border-dashed border-white/10 rounded-2xl bg-[#0f172a] hover:bg-emerald-600/5 hover:border-emerald-500/30 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-emerald-600/20 transition-colors">
                    <Upload className="w-6 h-6 text-gray-500 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 group-hover:text-emerald-500 transition-colors">기기에서 동영상 파일 업로드</span>
                  <input 
                    type="file" 
                    ref={videoInputRef} 
                    className="hidden" 
                    accept="video/*" 
                    onChange={handleVideoUpload} 
                  />
                </div>
                
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="또는 유튜브 URL 입력"
                    value={formData.url}
                    onChange={(e) => {
                      setFormData({...formData, url: e.target.value});
                      setIsLocalVideo(false);
                    }}
                    className="w-full pl-11 pr-4 py-4 bg-[#0f172a] border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-white text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400">
              <ImageIcon className="w-4 h-4 text-emerald-500" /> 썸네일 이미지 URL
            </label>
            <input 
              required
              type="text" 
              placeholder="https://images.unsplash.com/..."
              value={formData.thumbnail}
              onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
              className="w-full px-5 py-4 bg-[#0f172a] border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-white text-xs"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400">
              <Tag className="w-4 h-4 text-emerald-500" /> 카테고리
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({...formData, category: cat.id})}
                  className={`px-4 py-3 rounded-xl text-xs font-black border transition-all ${
                    formData.category === cat.id 
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg' 
                      : 'bg-[#0f172a] border-white/5 text-gray-500 hover:border-white/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-colors">취소</button>
            <button 
              type="submit"
              className="flex-[2] py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group"
            >
              <Upload className="w-5 h-5 group-hover:scale-110" />
              {editingVideo ? '수정 내용 저장' : '현장 영상 업로드 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoWriteModal;
