
import React, { useState, useEffect } from 'react';
import { X, Send, User, Type, AlignLeft, Tag, Save } from 'lucide-react';
import { Post } from '../types';

interface PostWriteModalProps {
  onClose: () => void;
  onSave: (post: Omit<Post, 'id' | 'likes' | 'date'>) => void;
  editingPost?: Post;
}

const PostWriteModal: React.FC<PostWriteModalProps> = ({ onClose, onSave, editingPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: 'TALK' as Post['category']
  });

  useEffect(() => {
    if (editingPost) {
      setFormData({
        title: editingPost.title,
        content: editingPost.content,
        author: editingPost.author,
        category: editingPost.category
      });
    }
  }, [editingPost]);

  const categories: {id: Post['category'], label: string}[] = [
    { id: 'TALK', label: '자유수다' },
    { id: 'REVIEW', label: '여행후기' },
    { id: 'QNA', label: '질의응답' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.author) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-xl bg-white rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in slide-in-from-bottom-4 duration-500">
        {/* Responsive Header */}
        <div className="p-5 sm:p-6 bg-emerald-600 flex items-center justify-between text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">{editingPost ? '글 수정하기' : '새로운 글 작성'}</h2>
              <p className="text-white/80 text-[10px] sm:text-xs">함께 나눌수록 여행의 즐거움은 커집니다.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto no-scrollbar flex-grow bg-gray-50/30">
          {/* Category Selection - Horizontal Scroll on Mobile */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-black text-gray-700">
              <Tag className="w-4 h-4 text-emerald-600" /> 게시판 선택
            </label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({...formData, category: cat.id})}
                  className={`flex-1 min-w-[100px] py-3 rounded-xl text-xs font-black border transition-all ${
                    formData.category === cat.id 
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-md' 
                      : 'bg-white border-gray-100 text-gray-500 hover:border-emerald-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-black text-gray-700">
              <User className="w-4 h-4 text-emerald-600" /> 닉네임
            </label>
            <input 
              required
              type="text" 
              placeholder="자유롭게 입력 (예: 호치민탐험가)"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-gray-900 shadow-sm"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-black text-gray-700">
              <Type className="w-4 h-4 text-emerald-600" /> 제목
            </label>
            <input 
              required
              type="text" 
              placeholder="게시글의 제목을 입력하세요"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-gray-900 shadow-sm"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-black text-gray-700">
              <AlignLeft className="w-4 h-4 text-emerald-600" /> 내용
            </label>
            <textarea 
              required
              placeholder="베트남 여행 팁이나 궁금한 점을 적어보세요..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all min-h-[180px] sm:min-h-[220px] font-medium text-gray-800 resize-none leading-relaxed shadow-sm"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={onClose} className="order-2 sm:order-1 flex-1 py-4 bg-white border border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-colors">취소</button>
            <button 
              type="submit"
              className="order-1 sm:order-2 flex-[2] py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group"
            >
              {editingPost ? (
                <>
                  <Save className="w-5 h-5 group-hover:scale-110" />
                  저장하기
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1" />
                  게시글 올리기
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostWriteModal;
