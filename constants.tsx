
import React from 'react';
import { 
  Trophy, 
  Building2, 
  Palmtree, 
  Briefcase, 
  Gem, 
  Utensils, 
  Youtube, 
  UserCircle2 
} from 'lucide-react';
import { CategoryType, Product, Blog } from './types';

export const CATEGORIES = [
  { 
    id: 'GOLF' as CategoryType, 
    label: '골프', 
    icon: <Trophy className="w-6 h-6" />,
    url: 'https://mg420.my.canva.site/all-kinds-of-golf-m'
  },
  { 
    id: 'HOTEL' as CategoryType, 
    label: '호텔&빌라', 
    icon: <Building2 className="w-6 h-6" />,
    url: 'https://mg420.my.canva.site/hotel-main-m'
  },
  { 
    id: 'TOUR' as CategoryType, 
    label: '관광', 
    icon: <Palmtree className="w-6 h-6" />,
    url: 'https://aistudio.google.com/apps/drive/1jQHPmmRXWXKkUp2_vbIolTTtQPr1rQAu?showPreview=true&showAssistant=true'
  },
  { 
    id: 'BUSINESS' as CategoryType, 
    label: '비지니스', 
    icon: <Briefcase className="w-6 h-6" />,
    url: 'https://aistudio.google.com/apps/drive/16SUG1b-eMouM2TB6VtYbToE-RmySz9VX?showPreview=true&showAssistant=true'
  },
  { 
    id: 'CULTURE' as CategoryType, 
    label: '베트남 문화', 
    icon: <Gem className="w-6 h-6" />,
    url: 'https://mg420.my.canva.site/culture-m'
  },
  { 
    id: 'FOOD' as CategoryType, 
    label: '먹거리', 
    icon: <Utensils className="w-6 h-6" />,
    url: 'https://mg420.my.canva.site/foods-m'
  },
  { 
    id: 'VIDEO' as CategoryType, 
    label: '동영상', 
    icon: <Youtube className="w-6 h-6" />,
    url: 'https://mg420.my.canva.site/information-420-m'
  },
  { 
    id: 'FOR_MEN' as CategoryType, 
    label: 'FOR MEN', 
    icon: <UserCircle2 className="w-6 h-6" />,
    url: 'https://mg420.my.canva.site/for-men-m'
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    category: 'GOLF',
    title: '[3박 5일] 호치민 시티 3색 명품 골프 패키지',
    location: 'Ho Chi Minh',
    price: 890000,
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1470&auto=format&fit=crop',
    description: '호치민 최고의 명문 골프장(탄손넛, 트윈도브스, 롱탄)을 순회하는 프리미엄 3박 5일 코스입니다.',
    inclusions: ['전 일정 5성급 호텔 숙박', '그린피/캐디피/카트비', '전용 차량', '한국어 가이드'],
    exclusions: ['왕복 항공권', '캐디팁', '개인 매너팁'],
    transport: '16인승 또는 29인승 최신형 리무진 버스',
    usageGuide: '티업 시간 40분 전 클럽하우스 도착 필수입니다.',
    refundPolicy: '출발 21일 전 취소 시 100% 환불 가능합니다.',
    durationDays: 5,
    popularity: 95,
    createdAt: '2024-01-01',
    itinerary: [
      { day: 1, title: '호치민 도착 및 미팅', description: '가이드 미팅 및 호텔 이동.' },
      { day: 2, title: '탄손넛 CC 라운딩', description: '오전 라운딩 후 시내 관광.' }
    ]
  },
  {
    id: '2',
    category: 'GOLF',
    title: '[3박 5일] 붕따우 오션뷰 힐링 골프 & 휴양',
    location: 'Vung Tau',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop',
    description: '해변의 도시 붕따우에서 즐기는 파도 소리와 함께하는 시원한 라운딩 패키지입니다.',
    inclusions: ['더 블러프 붕따우 포함 라운딩 3회', '해변 리조트 3박', '가이드'],
    exclusions: ['항공권', '캐디팁'],
    transport: '럭셔리 리무진 밴 서비스',
    usageGuide: '해안가 바람이 강할 수 있으니 바람막이를 준비하세요.',
    refundPolicy: '현지 호텔 규정에 따라 취소 수수료가 적용됩니다.',
    durationDays: 5,
    popularity: 88,
    createdAt: '2024-02-15',
    itinerary: []
  },
  {
    id: '3',
    category: 'GOLF',
    title: '[3박 5일] 달랏 고원 시원한 쿨(Cool) 골프 투어',
    location: 'Da Lat',
    price: 920000,
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1470&auto=format&fit=crop',
    description: '연중 시원한 날씨! 베트남의 유럽 달랏에서 즐기는 고원 라운딩.',
    inclusions: ['달랏 팰리스 CC 포함', '특급 호텔 3박', '가이드'],
    exclusions: ['왕복 항공권'],
    transport: '달랏 전용 관광 차량',
    usageGuide: '고지대이므로 자외선이 강합니다.',
    refundPolicy: '특별 약관 적용 상품입니다.',
    durationDays: 5,
    popularity: 92,
    createdAt: '2024-03-10',
    itinerary: []
  },
  {
    id: '4',
    category: 'GOLF',
    title: '[3박 5일] 무이네 사막 & 오션뷰 시그니처 골프',
    location: 'Mui Ne',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1544431745-f938d925e59b?q=80&w=1470&auto=format&fit=crop',
    description: '아름다운 해변과 사막이 공존하는 무이네에서 즐기는 이색적인 골프 & 관광 패키지입니다.',
    inclusions: ['씨 링크 CC 포함 라운딩 3회', '비치 리조트 3박', '전용 차량/기사', '사막 지프 투어'],
    exclusions: ['왕복 항공권', '캐디팁', '개인 식사'],
    transport: '7인승 SUV 또는 16인승 럭셔리 밴',
    usageGuide: '무이네 이동은 호치민에서 약 2시간 30분 소요됩니다.',
    refundPolicy: '출발 15일 전까지 취소 시 70% 환불 가능.',
    durationDays: 5,
    popularity: 82,
    createdAt: '2024-04-12',
    itinerary: [
      { day: 1, title: '호치민 미팅 및 무이네 이동', description: '공항 픽업 후 무이네 리조트 체크인 및 휴식.' },
      { day: 2, title: '씨 링크 CC 18홀 라운딩', description: '오전 라운딩 후 오후 사막 지프 투어 관람.' }
    ]
  },
  {
    id: '5',
    category: 'GOLF',
    title: '[4박 6일] 베트남 남부 올인클루시브 골프 대장정',
    location: 'Mixed',
    price: 1550000,
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=1470&auto=format&fit=crop',
    description: '호치민부터 붕따우까지 최고의 골프장 5곳을 정복하는 프리미엄 투어.',
    inclusions: ['전 일정 식사 포함', '5성급 호텔/리조트', 'VIP 전용 차량'],
    exclusions: ['항공권'],
    transport: 'VIP 리무진 버스',
    usageGuide: '장거리 이동이 포함되어 있습니다.',
    refundPolicy: '출발 30일 전까지 전액 환불.',
    durationDays: 6,
    popularity: 75,
    createdAt: '2023-12-20',
    itinerary: []
  }
];

export const MOCK_VIDEOS = [
  { id: 'v1', title: 'TOUR MGM 호치민 홍보 영상 - 프리미엄 골프 투어', url: 'https://www.youtube.com/embed/S_8SNDjG9uI' },
  { id: 'v2', title: '베트남 호치민 골프 코스 미리보기', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 'v3', title: '무이네 사막 지프 투어 및 붕따우 해변 스케치', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
];

export const MOCK_BLOGS: Blog[] = [
  {
    id: 'b1',
    title: '베트남 골프 여행 전 필수 체크리스트',
    author: 'TOUR MGM 에디터',
    date: '2024.03.20',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=400',
    content: '베트남으로 골프 여행을 떠나기 전 챙겨야 할 필수 아이템들을 소개합니다...'
  },
  {
    id: 'b2',
    title: '호치민 로컬 맛집 Best 5',
    author: 'MGM 가이드',
    date: '2024.03.18',
    image: 'https://images.unsplash.com/photo-1567129937968-cdad8f0d5a3a?auto=format&fit=crop&q=80&w=400',
    content: '관광객은 잘 모르는 진짜 로컬 쌀국수 맛집을 공개합니다...'
  }
];
