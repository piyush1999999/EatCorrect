"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { cn } from "@/lib/utils";

export function FavoriteButton({ productId, className }: { productId: string; className?: string }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(productId);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur transition-transform active:scale-90",
        className
      )}
    >
      <Heart
        size={18}
        className={cn(
          active ? "fill-rose-500 text-rose-500 animate-heart" : "text-ink-muted"
        )}
      />
    </button>
  );
}
