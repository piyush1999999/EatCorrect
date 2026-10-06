import type { Product } from "@/types";

/**
 * Core weight/price business logic. Kept separate from UI so a real backend can
 * reuse or replace it. All weights are handled internally in grams.
 */

/** Convert a weight in grams to a human label (e.g. 1250 -> "1.25 kg", 500 -> "500 g"). */
export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    const kg = grams / 1000;
    return `${Number(kg.toFixed(2))} kg`;
  }
  return `${Math.round(grams)} g`;
}

/** Price for a weight-based product given grams and price per kg. Rounded to rupee. */
export function priceForWeight(pricePerKg: number, grams: number): number {
  return Math.round((grams / 1000) * pricePerKg);
}

/** Normalize a user-entered value + unit into grams. */
export function toGrams(value: number, unit: "g" | "kg"): number {
  if (Number.isNaN(value) || value < 0) return 0;
  return unit === "kg" ? Math.round(value * 1000) : Math.round(value);
}

/** Clamp a weight to a sensible range (50 g – 10 kg) and snap to 50 g steps. */
export function clampWeight(grams: number): number {
  const snapped = Math.round(grams / 50) * 50;
  return Math.min(Math.max(snapped, 50), 10000);
}

/** Compute the line total for any product + selection. */
export function lineTotalFor(
  product: Pick<Product, "pricingMode" | "pricePerKg" | "price">,
  opts: { weight?: number; quantity: number }
): number {
  if (product.pricingMode === "weight") {
    return priceForWeight(product.pricePerKg, opts.weight ?? 0);
  }
  return product.price * opts.quantity;
}

/** Discount percentage from mrp and current price. */
export function discountPercent(mrp: number | undefined, price: number): number | null {
  if (!mrp || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}
