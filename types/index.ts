export type Unit = "g" | "kg" | "pack" | "piece" | "litre" | "ml" | "dozen";

export type PricingMode = "weight" | "pack";

export interface QualityChecks {
  qualityChecked: boolean;
  sourceVerified: boolean;
  freshnessChecked: boolean;
  labTested: boolean;
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
}

export interface EatCorrectScore {
  total: number; // 0 - 100
  freshness: number;
  quality: number;
  sourceTransparency: number;
  nutrition: number;
  processing: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  images: string[];
  /** Pack price when pricingMode === "pack" */
  price: number;
  /** Price per kilogram when pricingMode === "weight" */
  pricePerKg: number;
  pricingMode: PricingMode;
  unit: Unit;
  /** Predefined quick-pick weights in grams (weight-based products) */
  weightOptions: number[];
  defaultWeight: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  eatCorrectScore: EatCorrectScore;
  nutrition: Nutrition;
  ingredients: string[];
  origin: string;
  storage: string;
  deliveryEstimate: string;
  qualityChecks: QualityChecks;
  tags: string[];
  stock: number;
  mrp?: number; // original price for discount display
  badge?: string; // e.g. "Better Choice", "Fresh Today"
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  pricingMode: PricingMode;
  /** grams for weight products, undefined for pack */
  weight?: number;
  unit: Unit;
  /** number of packs for pack products */
  quantity: number;
  /** computed line total */
  lineTotal: number;
  pricePerKg: number;
  price: number;
}

export interface Address {
  id: string;
  label: "Home" | "Work" | "Other";
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  pincode: string;
}

export type OrderStatus =
  | "Order Confirmed"
  | "Preparing"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export interface OrderLine {
  name: string;
  weightLabel: string;
  lineTotal: number;
}

export interface Order {
  id: string;
  date: string;
  lines: OrderLine[];
  total: number;
  status: OrderStatus;
  tab: "active" | "completed" | "cancelled";
}

export interface Reward {
  id: string;
  title: string;
  points: number;
  description: string;
}

export interface Membership {
  tier: "EatCorrect+";
  active: boolean;
  priceMonthly: number;
  benefits: string[];
}

export interface User {
  name: string;
  phone: string;
  email: string;
  points: number;
  member: boolean;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  image: string;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  group: "Today's Deals" | "Member Offers" | "Buy More Save More" | "Fresh Deals" | "Under ₹199";
  accent: string;
}
