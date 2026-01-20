
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import CategoryGrid from './components/CategoryGrid';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import ProductListView from './components/ProductListView';
import VideoSection from './components/VideoSection';
import VideoGalleryView from './components/VideoGalleryView';
import VideoPlayerModal from './components/VideoPlayerModal';
import VideoWriteModal from './components/VideoWriteModal';
import ProductWriteModal from './components/ProductWriteModal';
import AuthModal from './components/AuthModal';
import AIPlannerModal from './components/AIPlannerModal';
import KakaoConsultationModal from './components/KakaoConsultationModal';
import QuotationView from './components/QuotationView';
import BlogWriteModal from './components/BlogWriteModal';
import CommunitySection from './components/CommunitySection';
import CommunityListView from './components/CommunityListView';
import PostWriteModal from './components/PostWriteModal';
import { MOCK_PRODUCTS, MOCK_BLOGS, MOCK_VIDEOS, MOCK_POSTS, CATEGORIES } from './constants';
import { CategoryType, Product, Blog, VideoItem, Post } from './types';
import { ChevronRight, BookOpen, X, Sparkles, Wand2, PenLine, Settings2, Edit3, Trash2, PlusCircle, Youtube, MessageSquare, LayoutGrid } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{title: string, url: string} | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState(false);
  const [isBlogWriteOpen, setIsBlogWriteOpen] = useState(false);
  const [isVideoWriteOpen, setIsVideoWriteOpen] = useState(false);
  const [isProductWriteOpen, setIsProductWriteOpen] = useState(false);
  const [isPostWriteOpen, setIsPostWriteOpen] = useState(false);
  
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [blogs, setBlogs] = useState<Blog[]>(MOCK_BLOGS);
  const [videos, setVideos] = useState<VideoItem[]>(MOCK_VIDEOS);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  
  const [visitorCount, setVisitorCount] = useState(1248);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1470&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1470&auto=format&fit=crop"
  ];

  const [externalUrl, setExternalUrl] = useState<string | null>(null);
  const [webViewTitle, setWebViewTitle] = useState('');

  const [kakaoModalInfo, setKakaoModalInfo] = useState<{isOpen: boolean, initialMessage?: string}>({
    isOpen: false,
    initialMessage: ''
  });
  const [quotationData, setQuotationData] = useState<any>(null);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(heroTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 2));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleCategorySelect = (catId: CategoryType) => {
    const catData = CATEGORIES.find(c => c.id === catId);
    if (catId === 'VIDEO') {
      setCurrentPage('videos');
      return;
    }
    if (catData?.url) {
      setWebViewTitle(catData.label);
      setExternalUrl(catData.url);
      setCurrentPage('webview');
    } else {
      setSelectedCategory(catId);
      setCurrentPage('products');
    }
  };

  const resetToHome = (page: string = 'home') => {
    setExternalUrl(null);
    setSelectedCategory(null);
    setCurrentPage(page);
  };

  const openKakaoModal = (message?: string) => {
    setKakaoModalInfo({ isOpen: true, initialMessage: message });
  };

  const handleKakaoSubmit = (formData: any) => {
    const contextProduct = selectedProduct || products[0];
    setQuotationData({
      reservor: { name: formData.name, phone: formData.phone, email: formData.email, guests: 2 },
      quote: { pricePerPerson: contextProduct.price, totalPrice: contextProduct.price * 2 },
      product: { title: contextProduct.title, description: contextProduct.description },
      inquiry: formData.message,
      itinerary: contextProduct.itinerary
    });
    setKakaoModalInfo({ isOpen: false });
    setIsAIPlannerOpen(false); 
    setSelectedProduct(null);
  };

  // Product CRUD
  const handleSaveProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'popularity'>) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
    } else {
      const newProduct: Product = {
        ...productData,
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString(),
        popularity: 50
      };
      setProducts([newProduct, ...products]);
    }
    setIsProductWriteOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('정말 이 상품을 삭제하시겠습니까?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Blog CRUD
  const handleSaveBlog = (blogData: Omit<Blog, 'id'>) => {
    if (editingBlog) {
      setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...blogData, id: b.id } : b));
    } else {
      setBlogs([{ ...blogData, id: `b${Date.now()}` }, ...blogs]);
    }
    setIsBlogWriteOpen(false);
    setEditingBlog(null);
  };

  // Video CRUD
  const handleSaveVideo = (videoData: Omit<VideoItem, 'id'>) => {
    if (editingVideo) {
      setVideos(videos.map(v => v.id === editingVideo.id ? { ...videoData, id: v.id } : v));
    } else {
      setVideos([{ ...videoData, id: `v${Date.now()}` }, ...videos]);
    }
    setIsVideoWriteOpen(false);
    setEditingVideo(null);
  };

  // Post CRUD
  const handleSavePost = (postData: Omit<Post, 'id' | 'likes' | 'date'>) => {
    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...postData } : p));
    } else {
      const today = new Date();
      const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
      setPosts([{ ...postData, id: `p${Date.now()}`, likes: 0, date: dateStr }, ...posts]);
    }
    setIsPostWriteOpen(false);
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0 flex flex-col">
      <Navbar onNav={resetToHome} onOpenAuth={() => setIsAuthOpen(true)} visitorCount={visitorCount} />

      <main className={`flex-grow ${currentPage === 'webview' || currentPage === 'videos' || currentPage === 'community' || currentPage === 'products' ? 'overflow-hidden' : 'max-w-4xl mx-auto pb-12 w-full'}`}>
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-500 w-full">
            {/* Hero Section */}
            <div className="relative h-72 sm:h-[450px] mx-4 mt-6 rounded-[40px] overflow-hidden shadow-2xl">
              {heroImages.map((img, idx) => (
                <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentHeroIndex === idx ? 'opacity-100' : 'opacity-0'}`}>
                  <img src={img} className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out ${currentHeroIndex === idx ? 'scale-110' : 'scale-100'}`} alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent"></div>
                </div>
              ))}
              <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
                <span className="inline-block px-3 py-1 bg-emerald-500/30 backdrop-blur-md text-emerald-300 font-black tracking-widest text-[10px] sm:text-xs uppercase rounded-full mb-4 border border-emerald-400/20 w-fit">Premium Vietnam Experience</span>
                <h2 className="text-3xl sm:text-6xl font-black text-white leading-[1.1] mb-6 drop-shadow-lg">베트남의 푸른 필드,<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">TOUR MGM</span>과 함께</h2>
              </div>
            </div>

            <div className="px-4"><CategoryGrid onCategoryClick={handleCategorySelect} /></div>

            {/* AI Planner Banner */}
            <div className="px-4 mb-10">
              <button onClick={() => setIsAIPlannerOpen(true)} className="w-full relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-700 p-8 rounded-3xl shadow-lg group hover:shadow-emerald-200 transition-all text-left">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg"><Wand2 className="w-6 h-6 text-white" /></div>
                    <span className="text-emerald-100 font-bold tracking-widest text-xs uppercase">AI Magic Planner</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">나만의 여행 상품 생성하기</h3>
                  <p className="text-emerald-50/80 text-sm max-w-xs mb-6">원하는 도시와 테마만 골라보세요. AI가 10초 만에 완벽한 견적과 일정을 만들어 드립니다.</p>
                  <div className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-black text-sm group-hover:bg-emerald-50 transition-colors">지금 바로 설계하기<ChevronRight className="w-4 h-4" /></div>
                </div>
                <Sparkles className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
              </button>
            </div>

            {/* Featured Products Section */}
            <div className="px-4 mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  MGM 추천 베스트 상품
                </h2>
                <button 
                  onClick={() => setCurrentPage('products')}
                  className="text-emerald-600 text-xs font-bold flex items-center gap-1"
                >
                  전체보기 <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
                ))}
              </div>
            </div>

            <VideoSection 
              videos={videos} 
              isAdmin={isAdminMode}
              onVideoClick={setSelectedVideo}
              onEditVideo={(v) => { setEditingVideo(v); setIsVideoWriteOpen(true); }}
              onDeleteVideo={(id) => setVideos(videos.filter(v => v.id !== id))}
              onSeeAll={() => setCurrentPage('videos')}
              onAddVideo={() => { setEditingVideo(null); setIsVideoWriteOpen(true); }}
            />

            <CommunitySection posts={posts} onSeeAll={() => setCurrentPage('community')} />

            {/* Magazine Blogs Section */}
            <div className={`px-4 mt-8 py-8 rounded-[40px] transition-all ${isAdminMode ? 'bg-emerald-50/50' : ''}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  MGM 여행 매거진
                </h2>
                <button 
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all shadow-sm ${
                    isAdminMode ? 'bg-emerald-600 text-white' : 'bg-white text-gray-500 border border-gray-200'
                  }`}
                >
                  <Settings2 className="w-4 h-4" />
                  {isAdminMode ? '관리 종료' : '관리자 모드'}
                </button>
              </div>

              {isAdminMode && (
                <button 
                  onClick={() => { setEditingBlog(null); setIsBlogWriteOpen(true); }}
                  className="w-full py-6 mb-6 border-2 border-dashed border-emerald-300 rounded-[2rem] bg-white text-emerald-600 font-black hover:bg-emerald-50 transition-all flex items-center justify-center gap-3 animate-in fade-in"
                >
                  <PlusCircle className="w-6 h-6" />
                  새로운 매거진 포스트 발행하기
                </button>
              )}

              <div className="space-y-4">
                {blogs.map(blog => (
                  <div key={blog.id} className="relative group">
                    <div className="flex gap-4 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                      </div>
                      <div className="flex flex-col justify-center flex-grow pr-10">
                        <h3 className="font-bold text-gray-900 line-clamp-1 mb-1">{blog.title}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-relaxed">{blog.content}</p>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                          <span className="text-emerald-600">@{blog.author}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span>{blog.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'products' && (
          <ProductListView 
            products={products} 
            category={selectedCategory} 
            isAdmin={isAdminMode}
            onBack={() => resetToHome()} 
            onProductClick={setSelectedProduct}
            onAddProduct={() => { setEditingProduct(null); setIsProductWriteOpen(true); }}
            onEditProduct={(p) => { setEditingProduct(p); setIsProductWriteOpen(true); }}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {currentPage === 'videos' && (
          <VideoGalleryView 
            videos={videos} isAdmin={isAdminMode} onClose={() => resetToHome()} 
            onEditVideo={(v) => { setEditingVideo(v); setIsVideoWriteOpen(true); }}
            onDeleteVideo={(id) => setVideos(videos.filter(v => v.id !== id))}
            onAddVideo={() => { setEditingVideo(null); setIsVideoWriteOpen(true); }}
          />
        )}

        {currentPage === 'community' && (
          <CommunityListView 
            posts={posts} isAdmin={isAdminMode} onClose={() => resetToHome()} 
            onAddPost={() => { setEditingPost(null); setIsPostWriteOpen(true); }}
            onEditPost={(p) => { setEditingPost(p); setIsPostWriteOpen(true); }}
            onDeletePost={(id) => setPosts(posts.filter(p => p.id !== id))}
          />
        )}

        {currentPage === 'webview' && externalUrl && (
          <div className="h-[calc(100vh-64px)] w-full flex flex-col animate-in slide-in-from-right duration-300 bg-white">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center"><Sparkles className="w-4 h-4 text-emerald-600" /></div>
                 <h3 className="text-sm font-bold text-gray-900 leading-none">{webViewTitle}</h3>
              </div>
              <button onClick={() => resetToHome()} className="p-2 hover:bg-gray-200 rounded-full text-gray-500"><X className="w-6 h-6" /></button>
            </div>
            <iframe src={externalUrl} className="w-full h-full border-none" />
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} onConsultation={openKakaoModal} />}
      {selectedVideo && <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
      {isAIPlannerOpen && <AIPlannerModal onClose={() => setIsAIPlannerOpen(false)} onConsultation={openKakaoModal} />}
      {isBlogWriteOpen && <BlogWriteModal editingBlog={editingBlog || undefined} onClose={() => setIsBlogWriteOpen(false)} onSave={handleSaveBlog} />}
      {isVideoWriteOpen && <VideoWriteModal editingVideo={editingVideo || undefined} onClose={() => setIsVideoWriteOpen(false)} onSave={handleSaveVideo} />}
      {isProductWriteOpen && <ProductWriteModal editingProduct={editingProduct || undefined} onClose={() => setIsProductWriteOpen(false)} onSave={handleSaveProduct} />}
      {isPostWriteOpen && <PostWriteModal editingPost={editingPost || undefined} onClose={() => setIsPostWriteOpen(false)} onSave={handleSavePost} />}
      {kakaoModalInfo.isOpen && <KakaoConsultationModal initialInquiry={kakaoModalInfo.initialMessage} onClose={() => setKakaoModalInfo({ isOpen: false })} onFinalSubmit={handleKakaoSubmit} />}
      {quotationData && <QuotationView data={quotationData} onClose={() => setQuotationData(null)} />}

      {/* Footer Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-t flex items-center justify-around px-6 z-40">
        <button onClick={() => resetToHome('home')} className={`flex flex-col items-center gap-1 ${currentPage === 'home' ? 'text-emerald-600' : 'text-gray-400'}`}><LayoutGrid className="w-5 h-5 mb-0.5" /><span className="text-[10px] font-bold">홈</span></button>
        <button onClick={() => setCurrentPage('community')} className={`flex flex-col items-center gap-1 ${currentPage === 'community' ? 'text-emerald-600' : 'text-gray-400'}`}><MessageSquare className="w-5 h-5 mb-0.5" /><span className="text-[10px] font-bold">게시판</span></button>
        <button onClick={() => setIsAIPlannerOpen(true)} className={`flex flex-col items-center gap-1 text-gray-400`}><Sparkles className="w-5 h-5 mb-0.5" /><span className="text-[10px] font-bold">AI추천</span></button>
        <button onClick={() => setIsAuthOpen(true)} className="flex flex-col items-center gap-1 text-gray-400"><span className="text-[10px] font-bold">MY</span></button>
      </div>
    </div>
  );
};

export default App;
