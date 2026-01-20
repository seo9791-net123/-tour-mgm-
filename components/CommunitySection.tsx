
import React from 'react';
import { Post } from '../types';
import { MessageSquare, ThumbsUp, ChevronRight, User } from 'lucide-react';

interface CommunitySectionProps {
  posts: Post[];
  onSeeAll: () => void;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ posts, onSeeAll }) => {
  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'REVIEW': return '여행후기';
      case 'QNA': return '질의응답';
      default: return '수다';
    }
  };

  return (
    <div className="px-4 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          MGM 커뮤니티
        </h2>
        <button 
          onClick={onSeeAll}
          className="text-emerald-600 text-xs font-bold flex items-center gap-1"
        >
          더 많은 이야기 보기 <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-3">
        {posts.slice(0, 3).map((post) => (
          <div 
            key={post.id}
            onClick={onSeeAll}
            className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                post.category === 'REVIEW' ? 'bg-blue-50 text-blue-600' :
                post.category === 'QNA' ? 'bg-rose-50 text-rose-600' :
                'bg-emerald-50 text-emerald-600'
              }`}>
                {getCategoryLabel(post.category)}
              </span>
              <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                {post.title}
              </h3>
            </div>
            <p className="text-xs text-gray-500 line-clamp-1 mb-3 font-medium">
              {post.content}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                <User className="w-3 h-3" />
                <span>{post.author}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 font-black text-[10px]">
                <ThumbsUp className="w-3 h-3" />
                {post.likes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunitySection;
