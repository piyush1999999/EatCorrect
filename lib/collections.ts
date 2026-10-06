import { PRODUCTS } from "@/data/products";
import type { Product } from "@/types";

export const popularNearYou: Product[] = [...PRODUCTS].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6);

export const eatCorrectPicks: Product[] = PRODUCTS.filter((p) => p.badge === "EatCorrect Pick");

export const freshToday: Product[] = PRODUCTS.filter((p) => p.badge === "Fresh Today");

export const trending: Product[] = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 6);

export const betterChoice: Product[] = PRODUCTS.filter((p) => p.eatCorrectScore.total >= 88);

export const onOffer: Product[] = PRODUCTS.filter((p) => p.mrp && p.mrp > (p.price || p.pricePerKg));

/** Mock personalised recommendations. */
export function recommendedFor(): Product[] {
  return [...PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, 6);
}

export function becauseYouBought(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category).slice(0, 4);
}

export function frequentlyBoughtTogether(productId: string): Product[] {
  return PRODUCTS.filter((p) => p.id !== productId).slice(0, 3);
}

export function youMayAlsoLike(productId: string): Product[] {
  const base = PRODUCTS.find((p) => p.id === productId);
  return PRODUCTS.filter((p) => p.id !== productId && p.category === base?.category)
    .concat(PRODUCTS.filter((p) => p.id !== productId))
    .slice(0, 6);
}
