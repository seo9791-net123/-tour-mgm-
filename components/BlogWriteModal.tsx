
import React, { useState, useRef, useEffect } from 'react';
import { X, PenLine, User, Type, AlignLeft, Image as ImageIcon, Send, Sparkles, Upload, ImagePlus, Save } from 'lucide-react';
import { Blog } from '../types';

interface BlogWriteModalProps {
  onClose: () => void;
  onSave: (blog: Omit<Blog, 'id'>) => void;
  editingBlog?: Blog;
}

const BlogWriteModal: React.FC<BlogWriteModalProps> = ({ onClose, onSave, editingBlog }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop'
  });
  const [isCustomImage, setIsCustomImage] = useState(false);

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title,
        content: editingBlog.content,
        author: editingBlog.author,
        image: editingBlog.image
      });
      // Check if current image is one of the presets
      const isPreset = imageOptions.some(opt => opt.url === editingBlog.image);
      setIsCustomImage(!isPreset);
    }
  }, [editingBlog]);

  const imageOptions = [
    { label: '베트남 풍경', url: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop' },
    { label: '럭셔리 골프', url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1470&auto=format&fit=crop' },
    { label: '현지 맛집', url: 'https://images.unsplash.com/photo-1567129937968-cdad8f0d5a3a?q=80&w=1470&auto=format&fit=crop' },
    { label: '프라이빗 휴양', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB를 초과할 수 없습니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
        setIsCustomImage(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.author) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const today = new Date();
    const dateStr = editingBlog ? editingBlog.date : `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    
    onSave({
      ...formData,
      date: dateStr
    });
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className={`p-6 flex items-center justify-between text-white flex-shrink-0 transition-colors ${editingBlog ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              {editingBlog ? <Save className="w-6 h-6" /> : <PenLine className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-black">{editingBlog ? '매거진 수정하기' : '매거진 스토리 작성'}</h2>
              <p className="text-white/80 text-xs">{editingBlog ? '기존 게시물의 내용을 수정합니다.' : '당신의 소중한 베트남 여행기를 공유해주세요.'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto no-scrollbar flex-grow bg-gray-50/30">
          {/* Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-black text-gray-700">
              <Type className={`w-4 h-4 ${editingBlog ? 'text-indigo-600' : 'text-emerald-600'}`} /> 제목
            </label>
            <input 
              required
              type="text" 
              placeholder="여행의 감동을 한 줄로 표현해주세요"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-gray-900 shadow-sm"
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-black text-gray-700">
              <User className={`w-4 h-4 ${editingBlog ? 'text-indigo-600' : 'text-emerald-600'}`} /> 작성자
            </label>
            <input 
              required
              type="text" 
              placeholder="닉네임 또는 성함"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-gray-900 shadow-sm"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-black text-gray-700">
              <AlignLeft className={`w-4 h-4 ${editingBlog ? 'text-indigo-600' : 'text-emerald-600'}`} /> 본문 내용
            </label>
            <textarea 
              required
              placeholder="베트남에서의 특별한 경험을 자유롭게 적어주세요..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all min-h-[160px] font-medium text-gray-800 resize-none leading-relaxed shadow-sm"
            />
          </div>

          {/* Image Upload & Selection */}
          <div className="space-y-3">
            <label className="flex items-center justify-between text-sm font-black text-gray-700">
              <div className="flex items-center gap-2">
                <ImageIcon className={`w-4 h-4 ${editingBlog ? 'text-indigo-600' : 'text-emerald-600'}`} /> 사진 추가
              </div>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div 
                onClick={triggerFileInput}
                className={`relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isCustomImage ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-200 bg-gray-50 text-gray-400 hover:bg-gray-100'
                }`}
              >
                {isCustomImage ? (
                  <div className="w-full h-full p-1">
                    <img src={formData.image} className="w-full h-full object-cover rounded-xl" alt="Custom" />
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <>
                    <ImagePlus className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-bold">사진 업로드</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>

              {imageOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => { setFormData({...formData, image: opt.url}); setIsCustomImage(false); }}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-4 transition-all ${
                    !isCustomImage && formData.image === opt.url ? 'border-emerald-500 scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={opt.url} className="w-full h-full object-cover" alt={opt.label} />
                  <div className="absolute inset-0 bg-black/20 flex items-end p-2"><span className="text-[10px] text-white font-black">{opt.label}</span></div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex gap-4 bg-gray-50/80 sticky bottom-0">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-white border border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-colors">취소</button>
            <button 
              type="submit"
              className={`flex-[2] py-4 text-white font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group ${editingBlog ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
            >
              {editingBlog ? (
                <>
                  <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  수정 내용 저장하기
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  매거진 발행하기
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogWriteModal;
