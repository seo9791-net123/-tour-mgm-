
import React from 'react';
import { CategoryType, Product, Blog, Post, VideoItem } from './types';

export const CATEGORIES = [
  { 
    id: 'GOLF' as CategoryType, 
    label: '골프', 
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=200',
    url: 'https://mg420.my.canva.site/all-kinds-of-golf-m'
  },
  { 
    id: 'HOTEL' as CategoryType, 
    label: '호텔&빌라', 
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=200',
    url: 'https://mg420.my.canva.site/hotel-main-m'
  },
  { 
    id: 'TOUR' as CategoryType, 
    label: '관광', 
    image: 'https://images.unsplash.com/photo-1506126279646-a697353d3166?auto=format&fit=crop&q=80&w=200',
    url: 'https://aistudio.google.com/apps/drive/1jQHPmmRXWXKkUp2_vbIolTTtQPr1rQAu?showPreview=true&showAssistant=true'
  },
  { 
    id: 'BUSINESS' as CategoryType, 
    label: '비지니스', 
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200',
    url: 'https://aistudio.google.com/apps/drive/16SUG1b-eMouM2TB6VtYbToE-RmySz9VX?showPreview=true&showAssistant=true'
  },
  { 
    id: 'CULTURE' as CategoryType, 
    label: '베트남 문화', 
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=200',
    url: 'https://mg420.my.canva.site/culture-m'
  },
  { 
    id: 'FOOD' as CategoryType, 
    label: '먹거리', 
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=200',
    url: 'https://mg420.my.canva.site/foods-m'
  },
  { 
    id: 'VIDEO' as CategoryType, 
    label: '동영상', 
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=400&auto=format&fit=crop',
    url: null 
  },
  { 
    id: 'FOR_MEN' as CategoryType, 
    label: 'FOR MEN', 
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=200',
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
    inclusions: ['전 일정 5성급 호텔 숙박', '그린피/캐디피/카트 포함', '전용 리무진 차량', '현지 가이드'],
    exclusions: ['왕복 항공권', '캐디팁', '개인 비용'],
    transport: '29인승 최신형 리무진 버스',
    usageGuide: '티업 40분 전 도착 필수',
    refundPolicy: '21일 전 취소 시 100% 환불',
    durationDays: 5,
    popularity: 98,
    createdAt: '2024-01-01',
    itinerary: [
      { day: 1, title: '호치민 도착', description: '가이드 미팅 및 호텔 이동' },
      { day: 2, title: '탄손넛 CC 라운딩', description: '도심 속 명문 코스 라운딩' },
      { day: 3, title: '트윈도브스 CC 라운딩', description: 'KLPGA 개최 명문 코스' },
      { day: 4, title: '롱탄 CC 라운딩 후 출국', description: '베트남 최고 경관 코스' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
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
    inclusions: ['리조트 3박', '라운딩 3회', '전용 리무진', '조식 포함'],
    exclusions: ['항공권', '캐디팁', '석식'],
    transport: '최신형 리무진 버스',
    usageGuide: '바람막이 지참 권장',
    refundPolicy: '14일 전 취소 시 50% 환불',
    durationDays: 5,
    popularity: 92,
    createdAt: '2024-02-15',
    itinerary: [
      { day: 1, title: '붕따우 이동', description: '리무진으로 해변 도시 이동' },
      { day: 2, title: '더 블러프 라운딩', description: '세계 100대 골프장' },
      { day: 3, title: '파라다이스 CC 라운딩', description: '해안가 힐링 라운딩' },
      { day: 4, title: '자유시간 및 출국', description: '시내 투어 후 공항 이동' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
    ]
  },
  {
    id: '3',
    category: 'HOTEL',
    title: '[3박 5일] 호치민 풀빌라 프라이빗 파티 & 스테이',
    location: 'Ho Chi Minh',
    price: 680000,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1470&auto=format&fit=crop',
    description: '대형 럭셔리 풀빌라에서 우리만의 프라이빗한 휴식과 파티를 즐기는 패키지입니다.',
    inclusions: ['4베드룸 풀빌라 3박', 'BBQ 파티 1회', '전용 차량', '가사 서비스'],
    exclusions: ['개인 용돈', '관광지 입장료'],
    transport: '16인승 럭셔리 리무진',
    usageGuide: '빌라 내 파티 가능',
    refundPolicy: '21일 전 100% 환불',
    durationDays: 5,
    popularity: 95,
    createdAt: '2024-03-01',
    itinerary: [
      { day: 1, title: '빌라 입성', description: '공항 픽업 및 체크인' },
      { day: 2, title: '자유 휴식', description: '수영장 및 프라이빗 휴식' },
      { day: 3, title: 'BBQ 나이트', description: '풀사이드 바베큐 파티' },
      { day: 4, title: '쇼핑 및 샌딩', description: '벤탄시장 관광 후 이동' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
    ]
  },
  {
    id: '4',
    category: 'HOTEL',
    title: '[3박 5일] 호치민 도심 럭셔리 호캉스 & 쇼핑 투어',
    location: 'Ho Chi Minh',
    price: 620000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop',
    description: '호치민 1군 중심가 5성급 호텔에서 즐기는 세련된 도시 휴양과 쇼핑 패키지입니다.',
    inclusions: ['5성급 호텔 3박', '조식 포함', '백화점 쇼핑 가이드', '라운지 이용권'],
    exclusions: ['항공권', '개인 쇼핑 비용'],
    transport: '전용 세단 서비스',
    usageGuide: '쇼핑 동선 맞춤형 조정 가능',
    refundPolicy: '7일 전 취소 시 30% 수수료',
    durationDays: 5,
    popularity: 88,
    createdAt: '2024-04-01',
    itinerary: [
      { day: 1, title: '호텔 체크인', description: '1군 럭셔리 호텔 입성' },
      { day: 2, title: '명품관 쇼핑', description: '유니온 스퀘어 및 다카시마야 투어' },
      { day: 3, title: '루프탑 다이닝', description: '야경과 함께하는 디너' },
      { day: 4, title: '스파 및 마무리', description: '전신 마사지 후 공항 이동' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
    ]
  },
  {
    id: '5',
    category: 'CULTURE',
    title: '[3박 5일] 호치민 정통 마사지 & 테라피 힐링 패키지',
    location: 'Ho Chi Minh',
    price: 550000,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1470&auto=format&fit=crop',
    description: '지친 몸과 마음을 달래주는 프리미엄 스파와 베트남 정통 테라피 집중 힐링 투어입니다.',
    inclusions: ['부티크 호텔 3박', '1일 1회 프리미엄 스파', '채식 건강식 2회', '전용 리무진'],
    exclusions: ['가이드 팁', '추가 마사지 옵션'],
    transport: '쾌적한 리무진 차량',
    usageGuide: '임산부 사전 고지 필수',
    refundPolicy: '10일 전 100% 환불',
    durationDays: 5,
    popularity: 91,
    createdAt: '2024-04-02',
    itinerary: [
      { day: 1, title: '테라피 시작', description: '아로마 웰컴 마사지' },
      { day: 2, title: '핫스톤 집중 케어', description: '전신 피로 회복 투어' },
      { day: 3, title: '명상 및 요가', description: '심신 안정을 위한 클래스' },
      { day: 4, title: '허브 스파 및 샌딩', description: '전통 약초 스파 후 이동' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
    ]
  },
  {
    id: '6',
    category: 'CULTURE',
    title: '[3박 5일] 베트남 전통 문화 & 미식 탐방 투어',
    location: 'Ho Chi Minh',
    price: 520000,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop',
    description: '베트남의 숨겨진 문화와 진짜 맛을 찾아서! 쿠킹클래스가 포함된 감성 투어입니다.',
    inclusions: ['전통 스타일 호텔 3박', '미슐랭 맛집 탐방', '쿠킹클래스 체험', '전용 리무진'],
    exclusions: ['개인 음료', '매너팁'],
    transport: '리무진 차량',
    usageGuide: '편한 복장 권장',
    refundPolicy: '14일 전 100% 환불',
    durationDays: 5,
    popularity: 89,
    createdAt: '2024-03-12',
    itinerary: [
      { day: 1, title: '문화 탐방', description: '역사 박물관 관람' },
      { day: 2, title: '미식 로드', description: '로컬 맛집 투어' },
      { day: 3, title: '쿠킹 클래스', description: '전통 요리 직접 만들기' },
      { day: 4, title: '공연 관람 및 출국', description: '아오쇼 관람 후 이동' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
    ]
  },
  {
    id: '7',
    category: 'FOOD',
    title: '[3박 5일] 호치민 리얼 스트릿 푸드 & 커피 로드',
    location: 'Ho Chi Minh',
    price: 480000,
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1470&auto=format&fit=crop',
    description: '카페 쓰어다부터 반미, 쌀국수까지 호치민 먹거리 완전 정복 패키지입니다.',
    inclusions: ['부티크 호텔 3박', '식비 쿠폰 제공', '커피 투어 가이드', '전용 차량'],
    exclusions: ['주류 비용', '추가 간식'],
    transport: '푸드 트립 전용 차량',
    usageGuide: '식욕 장착 필수',
    refundPolicy: '10일 전 100% 환불',
    durationDays: 5,
    popularity: 91,
    createdAt: '2024-03-14',
    itinerary: [
      { day: 1, title: '커피 로드', description: '유명 카페 투어' },
      { day: 2, title: '쌀국수 정복', description: '종류별 쌀국수 탐방' },
      { day: 3, title: '스트릿 푸드 나이트', description: '야시장 먹거리 체험' },
      { day: 4, title: '디저트 및 샌딩', description: '반미 맛집 후 이동' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
    ]
  },
  {
    id: '8',
    category: 'FOR_MEN',
    title: '[3박 5일] 호치민 VIP 황제 투어 & 럭셔리 나이트',
    location: 'Ho Chi Minh',
    price: 1200000,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1470&auto=format&fit=crop',
    description: '당신만을 위한 최고의 밤과 휴식. VIP 전용 라운지와 고품격 서비스를 보장합니다.',
    inclusions: ['스위트룸 3박', 'VIP 클럽 예약', '전용 가이드/기사', '풀케어 서비스'],
    exclusions: ['주류 결제', '개인 유흥비'],
    transport: '벤츠 S클래스 또는 리무진',
    usageGuide: '성인 남성 전용',
    refundPolicy: '보안상 별도 유선 문의',
    durationDays: 5,
    popularity: 99,
    createdAt: '2024-03-15',
    itinerary: [
      { day: 1, title: 'VIP 의전', description: '공항 영접 및 체크인' },
      { day: 2, title: '럭셔리 라운딩', description: '명문 골프장 프라이빗 라운딩' },
      { day: 3, title: 'VIP 나이트', description: '최고급 핫플레이스 의전' },
      { day: 4, title: '해장 코스 및 샌딩', description: '명품 보양식 후 이동' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
    ]
  },
  {
    id: '9',
    category: 'GOLF',
    title: '[3박 5일] 달랏 고원 쿨(Cool) 골프 투어',
    location: 'Da Lat',
    price: 820000,
    image: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=1470&auto=format&fit=crop',
    description: '베트남의 알프스 달랏에서 즐기는 시원한 골프! 평균 기온 20도의 최적 날씨입니다.',
    inclusions: ['최고급 골프 리조트 3박', '라운딩 3회', '국내선 왕복', '전용 리무진'],
    exclusions: ['캐디팁', '석식'],
    transport: 'SUV 리무진',
    usageGuide: '가벼운 외투 지참',
    refundPolicy: '21일 전 100% 환불',
    durationDays: 5,
    popularity: 90,
    createdAt: '2024-03-18',
    itinerary: [
      { day: 1, title: '달랏 도착', description: '공항 픽업 및 리조트 이동' },
      { day: 2, title: '팰리스 CC 라운딩', description: '역사적인 명문 코스' },
      { day: 3, title: 'SAM 투옌람 라운딩', description: '호수 배경의 환상적 코스' },
      { day: 4, title: '시내 투어 및 샌딩', description: '야시장 구경 후 이동' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
    ]
  },
  {
    id: '10',
    category: 'TOUR',
    title: '[3박 5일] 베트남 중부의 보석, 판티엣 힐링 투어',
    location: 'Phan Thiet',
    price: 630000,
    image: 'https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=1470&auto=format&fit=crop',
    description: '새롭게 부상하는 핫플레이스 판티엣! 대규모 워터파크와 끝없는 해변 힐링 패키지입니다.',
    inclusions: ['해변 리조트 3박', '테마파크 입장권', '전용 리무진', '조식 포함'],
    exclusions: ['가이드 팁', '개인 비용'],
    transport: '장거리용 리무진 버스',
    usageGuide: '가족 단위 강력 추천',
    refundPolicy: '14일 전 100% 환불',
    durationDays: 5,
    popularity: 88,
    createdAt: '2024-03-20',
    itinerary: [
      { day: 1, title: '판티엣 이동', description: '해안 도로 리무진 여행' },
      { day: 2, title: '리조트 힐링', description: '전용 비치 및 해양 스포츠' },
      { day: 3, title: '노바월드 어드벤처', description: '대규모 테마파크 즐기기' },
      { day: 4, title: '호치민 복귀 및 샌딩', description: '기념품 쇼핑 후 이동' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
    ]
  },
  {
    id: '12',
    category: 'GOLF',
    title: '[3박 5일] 호치민 시티 4색 메이저 골프 마스터즈',
    location: 'Ho Chi Minh',
    price: 980000,
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=1470&auto=format&fit=crop',
    description: '매일 다른 4개의 명문 골프장에서 라운딩을 즐기는 진정한 골프 마니아를 위한 도전입니다.',
    inclusions: ['5성급 골프 호텔 3박', '4색 라운딩(72홀)', '전용 리무진', '특식 제공'],
    exclusions: ['항공권', '캐디팁', '개인 비용'],
    transport: 'VIP 골프 전용 리무진',
    usageGuide: '체력 소모가 큼으로 컨디션 조절 요망',
    refundPolicy: '21일 전 100% 환불',
    durationDays: 5,
    popularity: 96,
    createdAt: '2024-04-10',
    itinerary: [
      { day: 1, title: '도착 및 1차 라운딩', description: '공항 근처 탄손넛 CC 라운딩' },
      { day: 2, title: '트윈도브스 라운딩', description: '명품 KLPGA 코스' },
      { day: 3, title: '롱탄 CC 라운딩', description: '최고의 레이아웃 경험' },
      { day: 4, title: '동나이 CC 및 출국', description: '마지막 라운딩 후 샌딩' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
    ]
  },
  {
    id: '13',
    category: 'HOTEL',
    title: '[3박 5일] 붕따우 럭셔리 풀빌라 & 요트 투어',
    location: 'Vung Tau',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1470&auto=format&fit=crop',
    description: '프라이빗 풀빌라 스테이와 해질녘 럭셔리 요트 투어가 포함된 최고의 로맨틱 패키지입니다.',
    inclusions: ['프라이빗 풀빌라 3박', '전용 요트 렌탈', '와인/카나페 제공', '공항 리무진'],
    exclusions: ['개인 식비', '추가 액티비티'],
    transport: '고급 세단/리무진',
    usageGuide: '요트 투어 시 선글라스 필수',
    refundPolicy: '15일 전 50% 환불',
    durationDays: 5,
    popularity: 94,
    createdAt: '2024-04-12',
    itinerary: [
      { day: 1, title: '빌라 체크인', description: '붕따우 프라이빗 휴식' },
      { day: 2, title: '요트 선셋 투어', description: '바다 위 샴페인 파티' },
      { day: 3, title: '해변 자유 시간', description: '수상 레포츠 및 휴식' },
      { day: 4, title: '카페 투어 및 샌딩', description: '인생샷 스팟 방문 후 이동' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
    ]
  },
  {
    id: '17',
    category: 'FOR_MEN',
    title: '[3박 5일] 호치민 나이트 라이프 클러빙 & 펍 크롤',
    location: 'Ho Chi Minh',
    price: 880000,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1470&auto=format&fit=crop',
    description: '잠들지 않는 도시 호치민의 가장 뜨거운 밤! 최고급 클럽 VIP 테이블과 펍 투어를 즐기세요.',
    inclusions: ['럭셔리 호텔 3박', '클럽 VIP 입장권', '보디가드 기사 대기', '숙취 해소 케어'],
    exclusions: ['추가 양주 결제', '개인 유흥비'],
    transport: '대형 리무진 상시 대기',
    usageGuide: '드레스코드 준수 요망',
    refundPolicy: '상세 규정 별도 안내',
    durationDays: 5,
    popularity: 97,
    createdAt: '2024-04-20',
    itinerary: [
      { day: 1, title: '클러빙 시작', description: '부이비엔 여행자 거리 펍' },
      { day: 2, title: 'VIP 클럽 나이트', description: '1군 메인 클럽 의전' },
      { day: 3, title: '크래프트 비어 투어', description: '다양한 수제 맥주 탐방' },
      { day: 4, title: '휴식 후 샌딩', description: '해장 코스 및 공항 이동' },
      { day: 5, title: '인천 도착', description: '여행 종료' }
    ]
  }
];

export const MOCK_VIDEOS: VideoItem[] = [
  { 
    id: 'v1', 
    title: 'TOUR MGM 호치민 홍보 영상 - 프리미엄 골프 투어', 
    url: 'https://www.youtube.com/embed/S_8SNDjG9uI', 
    category: 'BRAND',
    thumbnail: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 'v2', 
    title: '베트남 호치민 명문 골프 코스 트윈도브스 미리보기', 
    url: 'https://www.youtube.com/embed/S_8SNDjG9uI', 
    category: 'GOLF',
    thumbnail: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 'v3', 
    title: '호치민 풀빌라 & 숙소 현장 가이드', 
    url: 'https://www.youtube.com/embed/S_8SNDjG9uI', 
    category: 'HOTEL',
    thumbnail: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop'
  }
];

export const MOCK_BLOGS: Blog[] = [
  {
    id: 'b1',
    title: '베트남 골프 여행 전 필수 체크리스트',
    author: 'TOUR MGM 에디터',
    date: '2024.03.20',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=400',
    content: '베트남으로 골프 여행을 떠나기 전 챙겨야 할 필수 아이템들을 소개합니다...'
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    title: '탄손넛 골프장 캐디분들 너무 친절하시네요!',
    content: '지난주에 TOUR MGM 통해서 다녀왔는데 너무 만족스러웠습니다. 특히 캐디분들이 라이도 잘 봐주시고 엄청 유쾌하셔서 라운딩 내내 즐거웠어요.',
    author: '싱글골퍼',
    date: '2024.03.22',
    category: 'REVIEW',
    likes: 12
  },
  {
    id: 'p2',
    title: '호치민 4월 날씨 어떤가요? 반바지 라운딩 가능한가요?',
    content: '4월 중순에 예약했는데 날씨가 많이 더울까요? 반바지 착용 가능한 골프장들이 어딘지 궁금합니다.',
    author: '골린이예비생',
    date: '2024.03.21',
    category: 'QNA',
    likes: 3
  },
  {
    id: 'p3',
    title: '무이네 투어 갔다가 만난 일몰 인생샷 공유합니다.',
    content: '지프투어 꼭 하세요 두 번 하세요! 화이트 샌드듄에서 본 일몰은 평생 못 잊을 것 같아요.',
    author: '여행홀릭',
    date: '2024.03.20',
    category: 'REVIEW',
    likes: 25
  }
];
