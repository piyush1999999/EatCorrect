"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";

export default function FavoritesPage() {
  const { ids } = useFavorites();
  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="container-app py-5">
      <h1 className="text-2xl font-extrabold text-ink">Your Favorites</h1>
      <p className="text-sm text-ink-soft">{products.length} saved item{products.length === 1 ? "" : "s"}</p>

      {products.length === 0 ? (
        <div className="mt-6 grid place-items-center rounded-2xl bg-white py-16 text-center shadow-card">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
            <Heart size={28} className="text-rose-400" />
          </div>
          <p className="text-sm font-semibold text-ink">No favorites yet</p>
          <p className="text-xs text-ink-soft">Tap the heart on any product to save it here.</p>
          <Button href="/explore" className="mt-4">Browse products</Button>
        </div>
      ) : (
        <div className="mt-5">
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  );
}
