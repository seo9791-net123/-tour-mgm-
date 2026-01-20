
import React, { useState, useEffect } from 'react';
import { X, Youtube, Type, Link as LinkIcon, Save, Plus, Tag, Image as ImageIcon } from 'lucide-react';
import { VideoItem } from '../types';

interface VideoWriteModalProps {
  onClose: () => void;
  onSave: (video: Omit<VideoItem, 'id'>) => void;
  editingVideo?: VideoItem;
}

const VideoWriteModal: React.FC<VideoWriteModalProps> = ({ onClose, onSave, editingVideo }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'GOLF',
    thumbnail: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800'
  });

  useEffect(() => {
    if (editingVideo) {
      setFormData({
        title: editingVideo.title,
        url: editingVideo.url,
        category: editingVideo.category,
        thumbnail: editingVideo.thumbnail
      });
    }
  }, [editingVideo]);

  const categories = [
    { id: 'BRAND', label: 'MGM 스토리' },
    { id: 'GOLF', label: '골프 코스' },
    { id: 'HOTEL', label: '숙소/빌라' },
    { id: 'FOOD', label: '베트남 미식' },
    { id: 'TOUR', label: '관광 현장' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    let processedUrl = formData.url;
    if (processedUrl.includes('watch?v=')) {
      processedUrl = processedUrl.replace('watch?v=', 'embed/').split('&')[0];
    } else if (processedUrl.includes('youtu.be/')) {
      processedUrl = processedUrl.replace('youtu.be/', 'youtube.com/embed/').split('?')[0];
    }

    onSave({
      ...formData,
      url: processedUrl
    });
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#1e293b] rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col">
        <div className="p-6 bg-emerald-600 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black">{editingVideo ? '영상 정보 수정' : '새 현장 영상 추가'}</h2>
              <p className="text-white/80 text-xs">유튜브 영상을 MGM 갤러리에 등록합니다.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto no-scrollbar max-h-[70vh]">
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
              className="w-full px-5 py-4 bg-[#0f172a] border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400">
              <LinkIcon className="w-4 h-4 text-emerald-500" /> 유튜브 URL
            </label>
            <input 
              required
              type="text" 
              placeholder="https://www.youtube.com/watch?v=..."
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              className="w-full px-5 py-4 bg-[#0f172a] border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400">
              <ImageIcon className="w-4 h-4 text-emerald-500" /> 썸네일 이미지 URL (3D 실사 권장)
            </label>
            <input 
              required
              type="text" 
              placeholder="https://images.unsplash.com/..."
              value={formData.thumbnail}
              onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
              className="w-full px-5 py-4 bg-[#0f172a] border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-white text-xs"
            />
            {formData.thumbnail && (
              <div className="mt-2 relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <img src={formData.thumbnail} className="w-full h-full object-cover" alt="Preview" />
              </div>
            )}
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
              {editingVideo ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {editingVideo ? '영상 정보 저장' : '새 영상 등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoWriteModal;
