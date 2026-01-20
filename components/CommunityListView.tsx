
import React, { useState } from 'react';
import { X, MessageSquare, Plus, ThumbsUp, Search, User, Edit3, Trash2, Filter, ChevronLeft } from 'lucide-react';
import { Post } from '../types';

interface CommunityListViewProps {
  posts: Post[];
  isAdmin: boolean;
  onClose: () => void;
  onAddPost: () => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
}

const CommunityListView: React.FC<CommunityListViewProps> = ({ 
  posts, isAdmin, onClose, onAddPost, onEditPost, onDeletePost 
}) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'ALL', label: '전체' },
    { id: 'REVIEW', label: '여행후기' },
    { id: 'QNA', label: '질의응답' },
    { id: 'TALK', label: '수다' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesFilter = activeFilter === 'ALL' || post.category === activeFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryStyle = (cat: string) => {
    switch(cat) {
      case 'REVIEW': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'QNA': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    }
  };

  const getCategoryLabel = (cat: string) => {
    return filters.find(f => f.id === cat)?.label || '수다';
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-right duration-300 overflow-hidden">
      {/* Responsive Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={onClose} className="p-1 -ml-1 sm:hidden text-gray-400">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="hidden sm:flex w-10 h-10 bg-emerald-600 rounded-xl items-center justify-center text-white">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-gray-900 font-black tracking-tight text-base sm:text-lg">커뮤니티</h2>
            <p className="hidden sm:block text-[10px] text-gray-400 font-bold mt-0.5 uppercase tracking-wider">Live Travel Talk</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onAddPost}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/10"
          >
            <Plus className="w-4 h-4" /> 글쓰기
          </button>
          <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 transition-all">
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </header>

      <div className="flex-grow overflow-y-auto no-scrollbar bg-gray-50/30">
        {/* Search & Filter Bar */}
        <div className="max-w-6xl mx-auto w-full p-4 sm:p-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="제목, 내용으로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap border ${
                  activeFilter === filter.id 
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-md' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid System */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article key={post.id} className="relative group flex flex-col bg-white border border-gray-100 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all border-l-4 border-l-transparent hover:border-l-emerald-500">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border uppercase ${getCategoryStyle(post.category)}`}>
                    {getCategoryLabel(post.category)}
                  </span>
                  <time className="text-[10px] font-bold text-gray-400">{post.date}</time>
                </div>
                
                <h3 className="text-base font-black text-gray-900 mb-2 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3 mb-6 font-medium leading-relaxed flex-grow">
                  {post.content}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                    <div className="w-7 h-7 bg-emerald-50 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 font-black text-xs">
                    <ThumbsUp className="w-4 h-4" />
                    {post.likes}
                  </div>
                </div>

                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-1.5 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-sm">
                    <button 
                      onClick={() => onEditPost(post)}
                      className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => onDeletePost(post.id)}
                      className="p-2 bg-rose-50 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-gray-300">
              <MessageSquare className="w-16 h-16 mb-4 opacity-10" />
              <p className="font-black text-lg">검색 결과가 없어요</p>
              <p className="text-sm font-medium mt-1">다른 키워드로 검색해보시겠어요?</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <button 
        onClick={onAddPost}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-20"
      >
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
};

export default CommunityListView;
