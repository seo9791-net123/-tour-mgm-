
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
    id: 'FOR_MEN' as CategoryType, 
    label: 'FOR MEN', 
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=200',
    url: 'https://mg420.my.canva.site/for-men-m'
  },
];

export const MOCK_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: '호치민 탄손넛 CC 라운딩 현장 스케치',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=800&auto=format&fit=crop',
    category: 'GOLF'
  },
  {
    id: 'v2',
    title: '붕따우 더 블러프 CC 링크스 코스 전경',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=800&auto=format&fit=crop',
    category: 'TOUR'
  },
  {
    id: 'v3',
    title: 'MGM 프라이빗 풀빌라 내부 투어',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop',
    category: 'HOTEL'
  }
];

const TRANSPORT_GUIDE = "인원별 맞춤형 7인승 / 16인승 / 26인승 고급 리무진 버스 제공 (전용 기사, 유류비, 통행료 포함)";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    category: 'GOLF',
    title: '[3박 5일] 호치민 시티 3색 명품 골프 패키지',
    location: 'Ho Chi Minh',
    price: 890000,
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1470&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=1470&auto=format&fit=crop'
    ],
    description: '호치민 최고의 명문 골프장(탄손넛, 트윈도브스, 롱탄)을 순회하며 도심의 럭셔리를 만끽하는 패키지입니다.',
    inclusions: ['호텔 숙박', '그린피/캐디피/카트 포함', '7/16/26인승 고급 리무진 버스', '전 일정 조식 포함'],
    exclusions: ['왕복 항공권', '캐디팁', '점심 및 저녁 식사', '개인 비용'],
    transport: TRANSPORT_GUIDE,
    usageGuide: '티업 40분 전 도착 필수. 복장 규정 준수.',
    refundPolicy: '21일 전 취소 시 100% 환불',
    durationDays: 5,
    popularity: 98,
    createdAt: '2024-01-01',
    itinerary: [
      { day: 1, title: '호치민 공항 미팅 및 호텔 체크인', description: '탄손넛 국제공항 가이드 미팅 후 전용 리무진 이동. 럭셔리 호텔 체크인 후 자유 시간.' },
      { day: 2, title: '탄손넛 CC 라운딩 및 시내 관광', description: '오전: 탄손넛 CC 18홀 라운딩. 오후: 통일궁, 노트르담 성당 등 호치민 주요 명소 관광.' },
      { day: 3, title: '트윈도브스 CC 라운딩 및 야경 투어', description: '오전: 국제 표준 코스 트윈도브스 CC 라운딩. 오후: 사이공 강 유람선 또는 루프탑 바 야경 투어.' },
      { day: 4, title: '롱탄 CC 라운딩 및 공항 샌딩', description: '오전: 롱탄 CC 라운딩. 오후: 벤탄 시장 쇼핑 및 발마사지 체험 후 공항으로 이동.' },
      { day: 5, title: '한국 공항 도착', description: '인천/부산 공항 도착 및 여행 종료.' }
    ]
  },
  {
    id: '10',
    category: 'GOLF',
    title: '[4박 5일] 호치민 근교 명문 3색 골프 (정산, 롱탄, 탄손넛)',
    location: 'Ho Chi Minh',
    price: 1050000,
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1470&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=1470&auto=format&fit=crop'
    ],
    description: '한국인 골퍼들이 가장 선호하는 정산 CC와 롱탄 CC를 포함한 호치민 최고의 가성비 & 퀄리티 패키지입니다.',
    inclusions: ['호텔 숙박', '그린피/캐디피/카트 3회', '전용 리무진 차량 서비스', '한국어 가이드 의전'],
    exclusions: ['왕복 항공권', '중/석식', '캐디팁 (약 $15/18홀)', '매너팁'],
    transport: TRANSPORT_GUIDE,
    usageGuide: '정산 CC는 보트 이동 시간이 포함되니 미팅 시간을 엄수해 주세요.',
    refundPolicy: '14일 전 취소 시 50% 환불, 7일 전 환불 불가',
    durationDays: 5,
    popularity: 95,
    createdAt: '2024-06-01',
    itinerary: [
      { day: 1, title: '호치민 도착 및 호텔 체크인', description: '탄손넛 국제공항 도착 후 가이드 피켓 미팅. 전용 리무진으로 시내 4성급 호텔 이동 후 휴식 및 자유 일정.' },
      { day: 2, title: '정산 CC 18홀 라운딩 (보트 이동)', description: '오전: 호텔 조식 후 선착장으로 이동. 전용 보트를 타고 대나이 섬 내 정산 CC 입장 및 라운딩. 오후: 라운딩 후 호텔 복귀 및 1군 중심가 자유 시간.' },
      { day: 3, title: '롱탄 CC 18홀 라운딩', description: '오전: 베트남 최고의 조경을 자랑하는 롱탄 CC 라운딩. 오후: 사이공 스퀘어 쇼핑 투어 및 90분 전신 마사지 체험.' },
      { day: 4, title: '탄손넛 CC 18홀 라운딩 후 공항 이동', description: '오전: 호텔 체크아웃 후 시내 중심 탄손넛 CC 라운딩. 오후: 한식 특식 후 카페 투어 및 쇼핑 센터 방문. 저녁: 공항으로 이동 및 출국 수속.' },
      { day: 5, title: '한국 도착', description: '인천/부산 도착 및 여행 종료.' }
    ]
  },
  {
    id: '11',
    category: 'GOLF',
    title: '[3박 4일] 호치민 레이디스 럭셔리 골프 & 스파',
    location: 'Ho Chi Minh',
    price: 820000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop',
    description: '여성 골퍼들을 위한 세심한 일정. 최고급 스파와 애프터눈 티, 그리고 아름다운 조경의 트윈도브스 CC 라운딩.',
    inclusions: ['호텔 숙박', '트윈도브스 CC 18홀 라운딩 2회', '프리미엄 전신 스파 90분 2회', '고급 호텔 애프터눈 티 세트'],
    exclusions: ['항공권', '중/석식', '캐디팁', '개인 비용'],
    transport: TRANSPORT_GUIDE,
    usageGuide: '스파 예약 시간을 위해 라운딩 후 가이드 안내를 따라주세요. 복장 규정은 스마트 캐주얼입니다.',
    refundPolicy: '20일 전 전액 환불',
    durationDays: 4,
    popularity: 90,
    createdAt: '2024-06-05',
    itinerary: [
      { day: 1, title: '호치민 입국 및 웰컴 디너', description: '공항 영접 후 5성급 호텔 체크인. 저녁: 사이공 강변 럭셔리 프랑스 레스토랑에서 웰컴 디너.' },
      { day: 2, title: '트윈도브스 CC 라운딩 & 애프터눈 티', description: '오전: 트윈도브스 CC 18홀 라운딩. 오후: 호텔 복귀 후 수영장 휴식 또는 5성급 호텔 라운지 애프터눈 티 세트 즐기기.' },
      { day: 3, title: '시내 쇼핑 투어 및 프리미엄 스파', description: '오전: 유니온 스퀘어, 다카시마야 백화점 등 명품 쇼핑 투어. 오후: 90분 프리미엄 아로마 스파 체험 및 1군 카페 거리 방문.' },
      { day: 4, title: '브런치 후 공항 이동', description: '오전: 호텔 내 뷔페 조식 후 여유로운 체크아웃. 오후: 마지막 쌀국수 맛집 방문 후 공항 샌딩.' }
    ]
  },
  {
    id: '12',
    category: 'GOLF',
    title: '[4박 6일] 호치민 올인원 무제한 골프 (송베 CC)',
    location: 'Binh Duong',
    price: 1180000,
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=1470&auto=format&fit=crop',
    description: '이동 시간을 최소화하고 라운딩에 집중하고 싶은 열혈 골퍼를 위한 송베 CC 스테이 앤 플레이 상품입니다.',
    inclusions: ['호텔 숙박', '매일 27홀~36홀 무제한 라운딩', '리조트 내 전 일정 식사 포함', '공항 왕복 셔틀'],
    exclusions: ['항공권', '캐디팁', '음료 및 주류'],
    transport: "공항-골프 리조트 전용 프라이빗 셔틀",
    usageGuide: '무제한 라운딩은 현지 티업 현황에 따라 유동적으로 운영되며, 사전에 티타임을 지정해야 합니다.',
    refundPolicy: '15일 전 취소 시 70% 환불',
    durationDays: 6,
    popularity: 87,
    createdAt: '2024-06-10',
    itinerary: [
      { day: 1, title: '호치민 도착 및 송베 이동', description: '공항 도착 후 송베 전용 차량으로 리조트 이동 (약 40분). 리조트 체크인 후 석식 및 휴식.' },
      { day: 2, title: '송베 CC 27홀 집중 라운딩', description: '오전/오후: 송베 CC의 3개 코스(사막, 팜, 오션)를 넘나들며 즐기는 27홀 집중 라운딩.' },
      { day: 3, title: '송베 CC 27홀 집중 라운딩', description: '어제의 부족했던 홀을 공략하는 무제한 라운딩 서비스.' },
      { day: 4, title: '송베 CC 27홀 집중 라운딩 및 석식', description: '라운딩 후 리조트 내 마사지(추가 비용) 또는 수영장 이용.' },
      { day: 5, title: '오전 라운딩 후 공항 샌딩', description: '오전: 마지막 18홀 라운딩 및 체크아웃. 오후: 호치민 시내 잠시 경유 후 공항으로 이동.' },
      { day: 6, title: '한국 도착', description: '이른 아침 한국 공항 도착 및 여행 종료.' }
    ]
  },
  {
    id: '13',
    category: 'GOLF',
    title: '[3박 5일] 호치민 직장인 주말 특급 (야간 라운딩 포함)',
    location: 'Ho Chi Minh',
    price: 790000,
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1470&auto=format&fit=crop',
    description: '목요일 밤 출발! 연차 1일로 즐기는 호치민 도심형 골프 투어. 탄손넛 야간 라운딩의 묘미를 느껴보세요.',
    inclusions: ['호텔 숙박', '탄손넛 야간 1회 + 주간 2회 라운딩', '전 일정 전용 리무진'],
    exclusions: ['항공권', '식사 비용', '캐디팁'],
    transport: TRANSPORT_GUIDE,
    usageGuide: '야간 라운딩은 화려한 조명 아래 진행되어 시원하고 쾌적합니다. 모기가 있을 수 있으니 패치를 준비하세요.',
    refundPolicy: '10일 전 취소 시 환불 불가',
    durationDays: 5,
    popularity: 92,
    createdAt: '2024-06-15',
    itinerary: [
      { day: 1, title: '목요일 밤 호치민 도착', description: '밤 비행기 이용, 탄손넛 공항 입국 및 호텔 체크인(새벽).' },
      { day: 2, title: '오전 자유 휴식 및 야간 라운딩', description: '오전: 늦잠 및 호텔 수영장 휴식. 오후 3시: 탄손넛 CC 이동 및 석양과 함께 시작하는 18홀 야간 라운딩.' },
      { day: 3, title: '롱탄 CC 주간 라운딩', description: '오전: 롱탄 CC 라운딩. 오후: 라운딩 후 시내 마사지 샵 및 로컬 맥주 거리 투어.' },
      { day: 4, title: '오전 정산 CC 라운딩 및 샌딩', description: '오전: 정산 CC 라운딩 후 체크아웃. 오후: 롯데마트 쇼핑 및 이른 석식 후 공항 샌딩.' },
      { day: 5, title: '월요일 아침 한국 도착', description: '한국 도착 후 바로 출근 가능한 스케줄.' }
    ]
  },
  {
    id: '14',
    category: 'GOLF',
    title: '[5박 7일] 베트남 남부 원정 골프 (호치민+붕따우)',
    location: 'Ho Chi Minh & Vung Tau',
    price: 1450000,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop',
    description: '호치민의 도심 골프와 붕따우의 환상적인 오션뷰 링크스 코스(더 블러프)를 동시에 경험하는 원정 패키지입니다.',
    inclusions: ['호텔 숙박', '더 블러프 포함 총 4회 라운딩', '도시 간 이동 리무진 서비스', '해산물 특식 1회'],
    exclusions: ['항공권', '중/석식', '캐디팁', '관광지 입장료'],
    transport: TRANSPORT_GUIDE,
    usageGuide: '붕따우 더 블러프 CC는 바람이 매우 강하므로 여분의 골프공을 넉넉히 준비하시는 것을 권장합니다.',
    refundPolicy: '30일 전 100% 환불',
    durationDays: 7,
    popularity: 97,
    createdAt: '2024-06-20',
    itinerary: [
      { day: 1, title: '호치민 도착 및 붕따우 이동', description: '공항 가이드 영접 후 즉시 붕따우 해변 도시로 이동 (약 2시간). 붕따우 리조트 체크인.' },
      { day: 2, title: '더 블러프 CC 라운딩 (세계 100대 코스)', description: '전 일정의 하이라이트. 그렉 노먼 설계의 링크스 코스 더 블러프에서 18홀 라운딩. 저녁: 붕따우 해산물 특식.' },
      { day: 3, title: '붕따우 파라다이스 CC 라운딩', description: '오전: 해변을 끼고 있는 파라다이스 CC 라운딩. 오후: 거대 예수상 관광 또는 리조트 수영장 휴식.' },
      { day: 4, title: '호치민 복귀 및 트윈도브스 라운딩', description: '오전: 붕따우 체크아웃 및 호치민 이동. 오후: 트윈도브스 CC 라운딩 및 시내 호텔 체크인.' },
      { day: 5, title: '정산 CC 라운딩 및 시내 투어', description: '오전: 사이공 강 위 보트로 정산 CC 이동 및 라운딩. 오후: 호치민 시내 핫플레이스 투어.' },
      { day: 6, title: '오전 자유 시간 및 공항 샌딩', description: '오전: 벤탄시장 기념품 쇼핑 및 현지 카페 이용. 오후: 전신 마사지 후 공항으로 이동 및 출국.' },
      { day: 7, title: '한국 도착', description: '여행 종료.' }
    ]
  },
  {
    id: '5',
    category: 'GOLF',
    title: '[3박 5일] 무이네 해변 라운딩 & 지프 사막 투어',
    location: 'Mui Ne',
    price: 950000,
    image: 'https://images.unsplash.com/photo-1506126279646-a697353d3166?q=80&w=1470&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506126279646-a697353d3166?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1470&auto=format&fit=crop'
    ],
    description: '환상적인 해안 코스인 씨링크 CC 라운딩과 화이트 샌드듄 지프 투어가 포함된 액티브 패키지입니다.',
    inclusions: ['호텔 숙박', '그린피/캐디피/카트 포함', '7/16/26인승 고급 리무진 버스', '조식 포함', '지프 사막 투어 비용'],
    exclusions: ['항공권', '캐디팁', '점심 및 저녁 식사'],
    transport: TRANSPORT_GUIDE,
    usageGuide: '사막 투어 시 선글라스 필수. 씨링크 CC는 링크스 코스로 바람 대비 필요.',
    refundPolicy: '21일 전 취소 시 전액 환불',
    durationDays: 5,
    popularity: 94,
    createdAt: '2024-05-10',
    itinerary: [
      { day: 1, title: '호치민 도착 및 무이네 이동', description: '공항 가이드 미팅 후 고급 리무진 버스 탑승. 무이네 해변 리조트로 이동(약 2시간 30분). 체크인 후 휴식.' },
      { day: 2, title: '씨링크 CC 라운딩 및 리조트 휴양', description: '오전: 씨링크 CC 18홀 라운딩. 오후: 리조트 내 프라이빗 비치 및 수영장 자유 시간.' },
      { day: 3, title: '지프 투어 및 씨링크 CC 라운딩', description: '새벽: 화이트 샌드듄 일출 감상 지프 투어. 오전: 조식 후 씨링크 CC 2회차 라운딩. 오후: 요정의 샘물 산책.' },
      { day: 4, title: '무이네 시내 관광 및 호치민 복귀', description: '오전: 와인캐슬 방문 및 기념품 쇼핑. 오후: 리무진 버스로 호치민 복귀 및 공항 이동.' },
      { day: 5, title: '한국 공항 도착', description: '여행 종료.' }
    ]
  },
  {
    id: '6',
    category: 'GOLF',
    title: '[3박 5일] 달랏 영원한 봄의 도시 시원한 3색 골프',
    location: 'Da Lat',
    price: 990000,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1470&auto=format&fit=crop'
    ],
    description: '연중 18-24도의 시원한 날씨! 베트남의 스위스 달랏에서 즐기는 최고의 명문 코스 투어입니다.',
    inclusions: ['호텔 숙박', '그린피/캐디피/카트 포함', '7/16/26인승 고급 리무진 버스', '조식 포함'],
    exclusions: ['항공권', '점심 및 저녁 식사', '캐디팁'],
    transport: TRANSPORT_GUIDE,
    usageGuide: '고산 지대로 얇은 바람막이 필수. 달랏 팰리스 CC는 전통적인 코스 레이아웃.',
    refundPolicy: '15일 전 취소 시 수수료 발생',
    durationDays: 5,
    popularity: 96,
    createdAt: '2024-05-12',
    itinerary: [
      { day: 1, title: '달랏 공항 미팅 및 숙소 이동', description: '달랏 공항 가이드 미팅 후 호텔 체크인 및 휴식.' },
      { day: 2, title: '달랏 1200 CC 라운딩 및 야시장', description: '오전: 상쾌한 고원 공기의 달랏 1200 CC 라운딩. 저녁: 달랏 야시장 투어.' },
      { day: 3, title: 'SAM 뚜옌람 CC 라운딩 및 호수 휴양', description: '오전: SAM 뚜옌람 CC 라운딩. 오후: 죽림 선원 관광 및 케이블카 탑승.' },
      { day: 4, title: '달랏 팰리스 CC 라운딩 및 복귀 준비', description: '오전: 정통 코스 달랏 팰리스 CC 라운딩. 오후: 전신 스파 및 공항 샌딩.' },
      { day: 5, title: '한국 공항 도착', description: '여행 종료.' }
    ]
  },
  {
    id: '7',
    category: 'GOLF',
    title: '[3박 5일] 호치민 VIP 황제 골프 & 프라이빗 풀빌라',
    location: 'Ho Chi Minh',
    price: 1250000,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1470&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1470',
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1470&auto=format&fit=crop'
    ],
    description: '오직 우리 팀만을 위한 프라이빗 풀빌라와 호치민 최고 명문 골프장 라운딩이 결합된 VIP 패키지입니다.',
    inclusions: ['호텔 숙박', '명문 CC 3회 라운딩', '전용 리무진 버스', '조식 포함'],
    exclusions: ['항공권', '캐디팁', '점심 및 저녁 식사'],
    transport: TRANSPORT_GUIDE,
    usageGuide: 'VIP 의전 서비스 포함. 풀빌라 내 셰프 초빙 서비스 가능(사전 예약).',
    refundPolicy: '30일 전 취소 시 전액 환불',
    durationDays: 5,
    popularity: 99,
    createdAt: '2024-05-15',
    itinerary: [
      { day: 1, title: 'VIP 의전 입국 및 빌라 체크인', description: '공항 도착 즉시 VIP 가이드 영접 및 프라이빗 풀빌라 이동.' },
      { day: 2, title: '트윈도브스 CC 라운딩 및 빌라 휴식', description: '오전: 트윈도브스 CC 라운딩. 오후: 풀빌라 내 전용 수영장 휴양.' },
      { day: 3, title: '롱탄 CC 라운딩 및 야경 감상', description: '오전: 롱탄 CC 라운딩. 오후: 랜드마크 81 관람 및 스파 투어.' },
      { day: 4, title: '탄손넛 CC 라운딩 및 공항 이동', description: '오전: 탄손넛 CC 라운딩. 저녁: 마지막 쇼핑 및 공항 이동.' },
      { day: 5, title: '한국 공항 도착', description: '여행 종료.' }
    ]
  },
  {
    id: '2',
    category: 'GOLF',
    title: '[3박 5일] 붕따우 오션뷰 힐링 골프 & 휴양',
    location: 'Vung Tau',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=1470&auto=format&fit=crop'
    ],
    description: '해변의 도시 붕따우에서 즐기는 파도 소리와 함께하는 시원한 라운딩 패키지입니다.',
    inclusions: ['호텔 숙박', '그린피/캐디피/카트 포함', '전용 리무진 버스', '조식 포함'],
    exclusions: ['항공권', '캐디팁', '점심 및 저녁 식사'],
    transport: TRANSPORT_GUIDE,
    usageGuide: '바람막이 지참 권장. 더 블러프 CC는 강한 바람이 변수.',
    refundPolicy: '14일 전 취소 시 수수료 발생',
    durationDays: 5,
    popularity: 92,
    createdAt: '2024-02-15',
    itinerary: [
      { day: 1, title: '호치민 도착 및 붕따우 이동', description: '공항 영접 후 붕따우 해변 리조트 이동.' },
      { day: 2, title: '더 블러프 라운딩 및 해안도로 관광', description: '오전: 더 블러프 CC 라운딩. 오후: 예수상 및 해안도로 드라이브.' },
      { day: 3, title: '파라다이스 CC 라운딩 및 야경', description: '오전: 붕따우 파라다이스 CC 라운딩. 오후: 호마이 파크 야경 감상.' },
      { day: 4, title: '호치민 경유 공항 이동', description: '오전: 호치민 이동 시내 쇼핑. 저녁: 공항 이동.' },
      { day: 5, title: '한국 공항 도착', description: '여행 종료.' }
    ]
  },
  {
    id: '4',
    category: 'HOTEL',
    title: '[3박 5일] 호치민 도심 럭셔리 호캉스 & 쇼핑 투어',
    location: 'Ho Chi Minh',
    price: 620000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop',
    description: '호치민 1군 중심가 호텔에서 즐기는 세련된 도시 휴양과 쇼핑 패키지입니다.',
    inclusions: ['호텔 숙박', '조식 포함', '전용 리무진 버스', '쇼핑 가이드'],
    exclusions: ['항공권', '식사 비용', '개인 쇼핑 비용'],
    transport: TRANSPORT_GUIDE,
    usageGuide: '쇼핑 동선 맞춤형 조정 가능.',
    refundPolicy: '7일 전 취소 시 30% 수수료',
    durationDays: 5,
    popularity: 88,
    createdAt: '2024-04-01',
    itinerary: [
      { day: 1, title: '호텔 체크인', description: '1군 럭셔리 호텔 체크인 후 자유 시간.' },
      { day: 2, title: '명품 쇼핑 투어', description: '다카시마야 및 유니온 스퀘어 쇼핑 가이드.' },
      { day: 3, title: '자유 일정 및 다이닝', description: '호텔 수영장 이용 및 개별 다이닝 투어.' },
      { day: 4, title: '스파 및 공항 샌딩', description: '체크아웃 후 최고급 스파 체험 및 공항 이동.' },
      { day: 5, title: '한국 도착', description: '여행 종료.' }
    ]
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
  }
];
