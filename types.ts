
export interface Product {
  id: string;
  category: CategoryType;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryStep[];
  transport: string;
  usageGuide: string;
  refundPolicy: string;
  durationDays: number;
  popularity: number;
  createdAt: string;
}

export interface ItineraryStep {
  day: number;
  time?: string;
  title: string;
  description: string;
}

export type CategoryType = 
  | 'GOLF' 
  | 'HOTEL' 
  | 'TOUR' 
  | 'BUSINESS' 
  | 'CULTURE' 
  | 'FOOD' 
  | 'VIDEO' 
  | 'FOR_MEN';

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
}

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  category: string;
  thumbnail: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: 'REVIEW' | 'QNA' | 'TALK';
  likes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
