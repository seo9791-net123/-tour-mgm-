
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import CategoryGrid from './components/CategoryGrid';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import VideoSection from './components/VideoSection';
import VideoPlayerModal from './components/VideoPlayerModal';
import AuthModal from './components/AuthModal';
import AIPlannerModal from './components/AIPlannerModal';
import KakaoConsultationModal from './components/KakaoConsultationModal';
import QuotationView from './components/QuotationView';
import BlogWriteModal from './components/BlogWriteModal';
import FilterSortBar, { SortOption, Filters } from './components/FilterSortBar';
import { MOCK_PRODUCTS, MOCK_BLOGS, CATEGORIES } from './constants';
import { CategoryType, Product, Blog } from './types';
import { ChevronRight, Plane, Globe2, BookOpen, X, Sparkles, Wand2, Loader2, ExternalLink, SearchX, PenLine } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{title: string, url: string} | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState(false);
  const [isBlogWriteOpen, setIsBlogWriteOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>(MOCK_BLOGS);
  const [visitorCount, setVisitorCount] = useState(1248);
  
  // Hero Carousel State
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1470&auto=format&fit=crop", // 명문 골프장
    "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop", // 베트남 절경
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1470&auto=format&fit=crop", // 럭셔리 리조트
    "https://images.unsplash.com/photo-1544431745-f938d925e59b?q=80&w=1470&auto=format&fit=crop", // 무이네 사막/해변
    "https://images.unsplash.com/photo-1558997519-53bb890929a3?q=80&w=1548&auto=format&fit=crop"  // 골프 디테일
  ];

  // External Web View States
  const [externalUrl, setExternalUrl] = useState<string | null>(null);
  const [webViewTitle, setWebViewTitle] = useState('');
  const [isIframeLoading, setIsIframeLoading] = useState(false);

  // Filter and Sort States
  const [currentSort, setCurrentSort] = useState<SortOption>('popularity');
  const [activeFilters, setActiveFilters] = useState<Filters>({
    maxPrice: 2000000,
    durations: [],
    inclusions: []
  });

  const [pendingAiPlan, setPendingAiPlan] = useState<string | null>(null);

  const [kakaoModalInfo, setKakaoModalInfo] = useState<{isOpen: boolean, initialMessage?: string}>({
    isOpen: false,
    initialMessage: ''
  });

  const [quotationData, setQuotationData] = useState<any>(null);

  // Hero Carousel Timer
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

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    result = result.filter(p => p.price <= activeFilters.maxPrice);
    if (activeFilters.durations.length > 0) {
      result = result.filter(p => activeFilters.durations.includes(p.durationDays));
    }
    if (activeFilters.inclusions.length > 0) {
      result = result.filter(p => 
        activeFilters.inclusions.every(inc => 
          p.inclusions.some(pi => pi.includes(inc))
        )
      );
    }
    result.sort((a, b) => {
      switch (currentSort) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'popularity': return b.popularity - a.popularity;
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default: return 0;
      }
    });
    return result;
  }, [selectedCategory, activeFilters, currentSort]);

  const handleCategorySelect = (catId: CategoryType) => {
    const catData = CATEGORIES.find(c => c.id === catId);
    if (catData?.url) {
      setWebViewTitle(catData.label);
      setExternalUrl(catData.url);
      setIsIframeLoading(true);
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

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const openKakaoModal = (message?: string) => {
    setKakaoModalInfo({ isOpen: true, initialMessage: message });
  };

  const handleAiConsultation = (aiText: string) => {
    setPendingAiPlan(aiText);
    openKakaoModal("AI가 설계한 맞춤 일정으로 상세 상담 및 견적 확인을 원합니다.");
  };

  const handleKakaoSubmit = (formData: any) => {
    if (pendingAiPlan) {
      setQuotationData({
        reservor: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          guests: 4 
        },
        quote: {
          pricePerPerson: 950000, 
          totalPrice: 950000 * 4
        },
        product: {
          title: "AI 맞춤 설계 프리미엄 베트남 투어",
          description: "고객님의 요청사항을 바탕으로 AI가 설계한 최적의 일정 제안서입니다."
        },
        inquiry: formData.message,
        aiContent: pendingAiPlan 
      });
      setPendingAiPlan(null);
    } else {
      const contextProduct = selectedProduct || MOCK_PRODUCTS[0];
      setQuotationData({
        reservor: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          guests: 2
        },
        quote: {
          pricePerPerson: contextProduct.price,
          totalPrice: contextProduct.price * 2
        },
        product: {
          title: contextProduct.title,
          description: contextProduct.description
        },
        inquiry: formData.message,
        itinerary: contextProduct.itinerary
      });
    }
    setKakaoModalInfo({ isOpen: false });
    setIsAIPlannerOpen(false); 
    setSelectedProduct(null);
  };

  const handleSaveBlog = (newBlogData: Omit<Blog, 'id'>) => {
    const newBlog: Blog = {
      ...newBlogData,
      id: `b${blogs.length + 1}`
    };
    setBlogs([newBlog, ...blogs]);
    setIsBlogWriteOpen(false);
    alert('블로그 매거진이 성공적으로 발행되었습니다!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0 flex flex-col">
      <Navbar 
        onNav={resetToHome} 
        onOpenAuth={() => setIsAuthOpen(true)} 
        visitorCount={visitorCount}
      />

      <main className={`flex-grow ${currentPage === 'webview' ? 'overflow-hidden' : 'max-w-4xl mx-auto pb-12 w-full'}`}>
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-500 w-full">
            {/* Flash Effect Hero Section */}
            <div className="relative h-72 sm:h-[450px] mx-4 mt-6 rounded-[40px] overflow-hidden shadow-2xl">
              {heroImages.map((img, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    currentHeroIndex === idx ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={img} 
                    className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out ${
                      currentHeroIndex === idx ? 'scale-110' : 'scale-100'
                    }`} 
                    alt={`Vietnam Luxury ${idx}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent"></div>
                </div>
              ))}
              
              <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
                <div className="animate-in slide-in-from-left duration-700">
                  <span className="inline-block px-3 py-1 bg-emerald-500/30 backdrop-blur-md text-emerald-300 font-black tracking-widest text-[10px] sm:text-xs uppercase rounded-full mb-4 border border-emerald-400/20">
                    Premium Vietnam Experience
                  </span>
                  <h2 className="text-3xl sm:text-6xl font-black text-white leading-[1.1] mb-6 drop-shadow-lg">
                    베트남의 푸른 필드,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">TOUR MGM</span>과 함께
                  </h2>
                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-3 overflow-hidden">
                      <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://picsum.photos/100/100?random=11" alt=""/>
                      <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://picsum.photos/100/100?random=12" alt=""/>
                      <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://picsum.photos/100/100?random=13" alt=""/>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Real-time Happy Travelers</p>
                      <p className="text-emerald-300 text-xs font-medium">이번 달 1.2k+ 명이 선택했습니다.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Dots Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {heroImages.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentHeroIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentHeroIndex === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="px-4">
              <CategoryGrid onCategoryClick={handleCategorySelect} />
            </div>

            {/* AI Planner Banner */}
            <div className="px-4 mb-8">
              <button 
                onClick={() => setIsAIPlannerOpen(true)}
                className="w-full relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-700 p-8 rounded-3xl shadow-lg group hover:shadow-emerald-200 transition-all text-left"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
                      <Wand2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-emerald-100 font-bold tracking-widest text-xs uppercase">AI Magic Planner</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">나만의 여행 상품 생성하기</h3>
                  <p className="text-emerald-50/80 text-sm max-w-xs mb-6">원하는 도시와 테마만 골라보세요. AI가 10초 만에 완벽한 견적과 일정을 만들어 드립니다.</p>
                  <div className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-black text-sm group-hover:bg-emerald-50 transition-colors">
                    지금 바로 설계하기
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
                <Sparkles className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
                <Globe2 className="absolute right-12 top-[-10px] w-32 h-32 text-white/5" />
              </button>
            </div>

            {/* Popular Products */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-gray-900">실시간 인기 골프 상품</h2>
                <button 
                  onClick={() => setCurrentPage('products')}
                  className="text-emerald-600 text-xs font-bold flex items-center gap-1"
                >
                  전체보기 <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_PRODUCTS.sort((a,b) => b.popularity - a.popularity).slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} onClick={handleProductSelect} />
                ))}
              </div>
            </div>

            <VideoSection onVideoClick={setSelectedVideo} />

            {/* Blogs */}
            <div className="px-4 mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  MGM 여행 매거진
                </h2>
              </div>
              <div className="space-y-4">
                {blogs.map(blog => (
                  <div key={blog.id} className="flex gap-4 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-gray-900 line-clamp-1 mb-1">{blog.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-2">{blog.content}</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                        <span>{blog.author}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{blog.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setIsBlogWriteOpen(true)}
                  className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <PenLine className="w-4 h-4" />
                  블로그 작성하기
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'webview' && externalUrl && (
          <div className="h-[calc(100vh-64px)] w-full flex flex-col animate-in slide-in-from-right duration-300 bg-white">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                   <Globe2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-none">{webViewTitle}</h3>
                  <p className="text-[10px] text-gray-400 mt-1 truncate max-w-[150px] sm:max-w-xs">{externalUrl}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={externalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                  title="새 탭에서 열기"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => resetToHome()}
                  className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="flex-grow relative bg-slate-100">
              {isIframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                  <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
                  <p className="text-sm font-bold text-gray-500">페이지를 불러오는 중입니다...</p>
                </div>
              )}
              <iframe 
                src={externalUrl}
                className="w-full h-full border-none"
                onLoad={() => setIsIframeLoading(false)}
                title={webViewTitle}
              />
            </div>
          </div>
        )}

        {currentPage === 'products' && (
          <div className="animate-in slide-in-from-right duration-300 flex flex-col min-h-screen bg-white sm:bg-gray-50">
            <div className="px-4 py-6 bg-white sm:rounded-b-3xl sm:mb-2 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">
                    {selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.label : '전체 상품 탐색'}
                  </h2>
                  <p className="text-sm text-gray-500">조건에 맞는 최적의 베트남 투어를 만나보세요.</p>
                </div>
                <button 
                  onClick={() => resetToHome()}
                  className="text-gray-400 hover:text-emerald-600 p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <FilterSortBar 
              currentSort={currentSort}
              onSortChange={setCurrentSort}
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
            />

            <div className="px-4 py-6 max-w-4xl mx-auto w-full">
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredAndSortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} onClick={handleProductSelect} />
                  ))}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <SearchX className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">조건에 맞는 상품이 없습니다</h3>
                  <p className="text-sm text-gray-500 mt-2">필터를 변경하거나 초기화하여 다른 상품을 찾아보세요.</p>
                  <button 
                    onClick={() => setActiveFilters({ maxPrice: 2000000, durations: [], inclusions: [] })}
                    className="mt-6 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-md"
                  >
                    필터 초기화하기
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onConsultation={(msg) => openKakaoModal(msg)}
        />
      )}

      {selectedVideo && (
        <VideoPlayerModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}

      {isAuthOpen && (
        <AuthModal onClose={() => setIsAuthOpen(false)} />
      )}

      {isAIPlannerOpen && (
        <AIPlannerModal 
          onClose={() => { setIsAIPlannerOpen(false); setPendingAiPlan(null); }} 
          onConsultation={handleAiConsultation}
        />
      )}

      {isBlogWriteOpen && (
        <BlogWriteModal 
          onClose={() => setIsBlogWriteOpen(false)} 
          onSave={handleSaveBlog}
        />
      )}

      {kakaoModalInfo.isOpen && (
        <KakaoConsultationModal 
          initialInquiry={kakaoModalInfo.initialMessage}
          onClose={() => setKakaoModalInfo({ isOpen: false, initialMessage: '' })} 
          onFinalSubmit={handleKakaoSubmit}
        />
      )}

      {quotationData && (
        <QuotationView data={quotationData} onClose={() => setQuotationData(null)} />
      )}

      {/* Mobile Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex items-center justify-around px-6 z-40">
        <button onClick={() => resetToHome('home')} className={`flex flex-col items-center gap-1 ${currentPage === 'home' ? 'text-emerald-600' : 'text-gray-400'}`}>
          <div className="w-1 h-1 rounded-full bg-current mb-0.5"></div>
          <span className="text-[10px] font-bold">홈</span>
        </button>
        <button onClick={() => resetToHome('products')} className={`flex flex-col items-center gap-1 ${currentPage === 'products' ? 'text-emerald-600' : 'text-gray-400'}`}>
          <div className="w-1 h-1 rounded-full bg-current mb-0.5"></div>
          <span className="text-[10px] font-bold">탐색</span>
        </button>
        <button onClick={() => setIsAIPlannerOpen(true)} className={`flex flex-col items-center gap-1 ${isAIPlannerOpen ? 'text-emerald-600' : 'text-gray-400'}`}>
           <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">AI추천</span>
        </button>
        <button onClick={() => setIsAuthOpen(true)} className="flex flex-col items-center gap-1 text-gray-400">
          <div className="w-1 h-1 rounded-full bg-current mb-0.5"></div>
          <span className="text-[10px] font-bold">마이페이지</span>
        </button>
      </div>

      {currentPage !== 'webview' && (
        <footer className="bg-gray-900 text-white py-12 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TOUR MGM</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                베트남 호치민 현지 법인 여행사입니다. 골프, 비지니스, 관광 등 고객님의 니즈에 맞는 맞춤형 럭셔리 투어를 제안합니다.
              </p>
              <div className="space-y-1.5 text-xs text-gray-400">
                <p><span className="text-gray-300 font-bold">대표이사:</span> 호치민 TOURMGM</p>
                <p><span className="text-gray-300 font-bold">주소:</span> 59-61 Lê Văn Thiêm, Quận 7, TP. HCM</p>
                <p><span className="text-gray-300 font-bold">전화번호:</span> +84 77 803 8743</p>
                <p><span className="text-gray-300 font-bold">카카오톡 ID:</span> vnseen</p>
              </div>
            </div>
            <div className="flex flex-col justify-end items-start sm:items-end">
               <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-emerald-600 transition-colors">YT</div>
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-emerald-600 transition-colors">IG</div>
               </div>
               <p className="text-[10px] text-gray-600">© 2024 TOUR MGM. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
