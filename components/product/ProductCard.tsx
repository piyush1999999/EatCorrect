"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { FavoriteButton } from "./FavoriteButton";
import { WeightSelector } from "./WeightSelector";
import { useCart } from "@/components/providers/CartProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { formatINR, cn } from "@/lib/utils";
import { discountPercent } from "@/lib/pricing";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { show } = useToast();
  const [weight, setWeight] = useState(product.defaultWeight);
  const [added, setAdded] = useState(false);

  const isWeight = product.pricingMode === "weight";
  const displayPrice = isWeight ? product.pricePerKg : product.price;
  const discount = discountPercent(product.mrp, displayPrice);

  const handleAdd = () => {
    addToCart({ product, weight: isWeight ? weight : undefined, quantity: 1 });
    show(`${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-float">
      <Link href={`/product/${product.slug}`} className="relative block">
        <div className="relative aspect-[4/3] overflow-hidden bg-sand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.badge && <Badge tone="white">{product.badge}</Badge>}
            {discount && <Badge tone="danger">{discount}% OFF</Badge>}
          </div>
          <FavoriteButton productId={product.id} className="absolute right-2 top-2" />
          {product.stock === 0 && (
            <div className="absolute inset-0 grid place-items-center bg-ink/40 text-sm font-bold text-white">
              Out of stock
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/product/${product.slug}`} className="min-w-0">
            <h3 className="truncate text-sm font-bold text-ink">{product.name}</h3>
            <p className="truncate text-xs text-ink-soft">{product.shortDescription}</p>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Rating value={product.rating} size={12} />
          <span className="ml-auto flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-700">
            {product.eatCorrectScore.total}
            <span className="text-[9px] font-semibold text-brand-500">EC</span>
          </span>
        </div>

        <div className="mt-auto">
          {isWeight ? (
            <WeightSelector
              pricePerKg={product.pricePerKg}
              weightOptions={product.weightOptions.slice(0, 4)}
              value={weight}
              onChange={setWeight}
              compact
            />
          ) : (
            <div className="flex items-baseline gap-2 py-1">
              <span className="text-lg font-extrabold text-ink">{formatINR(product.price)}</span>
              {product.mrp && (
                <span className="text-xs text-ink-soft line-through">{formatINR(product.mrp)}</span>
              )}
              <span className="text-xs text-ink-soft">/ {product.unit}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={cn(
              "btn mt-2 w-full py-2.5 text-sm",
              added ? "bg-brand-700 text-white" : "btn-primary"
            )}
          >
            {added ? (
              <>
                <Check size={16} strokeWidth={3} /> Added
              </>
            ) : (
              <>
                <Plus size={16} strokeWidth={2.5} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
