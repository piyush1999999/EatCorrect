"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, Check } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORY_NAMES } from "@/data/categories";
import { ProductGrid } from "@/components/product/ProductGrid";
import { cn, formatINR } from "@/lib/utils";

type Sort = "popular" | "priceLow" | "priceHigh" | "newest" | "score";

const SORTS: { key: Sort; label: string }[] = [
  { key: "popular", label: "Popularity" },
  { key: "priceLow", label: "Price: Low to High" },
  { key: "priceHigh", label: "Price: High to Low" },
  { key: "newest", label: "Newest" },
  { key: "score", label: "EatCorrect Score" },
];

const POPULAR_SEARCHES = ["Paneer", "Mango", "Organic", "Eggs", "Almonds", "Rice"];

function unitPrice(pId: string) {
  const p = PRODUCTS.find((x) => x.id === pId)!;
  return p.pricingMode === "weight" ? p.pricePerKg : p.price;
}

export function ExploreClient() {
  const params = useSearchParams();
  const initialCategory = params.get("category") ?? "All";

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<Sort>("popular");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [weightOnly, setWeightOnly] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const suggestions = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q));
      const matchesCategory = category === "All" || p.category === category;
      const matchesPrice = unitPrice(p.id) <= maxPrice;
      const matchesStock = !inStockOnly || p.stock > 0;
      const matchesWeight = !weightOnly || p.pricingMode === "weight";
      return matchesQuery && matchesCategory && matchesPrice && matchesStock && matchesWeight;
    });

    switch (sort) {
      case "priceLow":
        list = [...list].sort((a, b) => unitPrice(a.id) - unitPrice(b.id));
        break;
      case "priceHigh":
        list = [...list].sort((a, b) => unitPrice(b.id) - unitPrice(a.id));
        break;
      case "score":
        list = [...list].sort((a, b) => b.eatCorrectScore.total - a.eatCorrectScore.total);
        break;
      case "newest":
        list = [...list].reverse();
        break;
      default:
        list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return list;
  }, [query, category, sort, maxPrice, inStockOnly, weightOnly]);

  const activeFilterCount = (inStockOnly ? 1 : 0) + (weightOnly ? 1 : 0) + (maxPrice < 1000 ? 1 : 0);

  return (
    <div className="container-app py-5">
      {/* Search */}
      <div className="relative z-20">
        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 shadow-soft focus-within:border-brand-500">
          <Search size={18} className="text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Search for paneer, mango, organic…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink-soft"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear">
              <X size={16} className="text-ink-soft" />
            </button>
          )}
        </div>

        {focused && (
          <div className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-float animate-scale-in">
            {query && suggestions.length > 0 ? (
              suggestions.map((s) => (
                <button
                  key={s.id}
                  onMouseDown={() => setQuery(s.name)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-sand"
                >
                  <Search size={14} className="text-ink-soft" />
                  <span className="font-medium text-ink">{s.name}</span>
                  <span className="ml-auto text-xs text-ink-soft">{s.category}</span>
                </button>
              ))
            ) : (
              <div className="p-3">
                <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((s) => (
                    <button
                      key={s}
                      onMouseDown={() => setQuery(s)}
                      className="chip border border-black/10 bg-cream text-xs text-ink-muted hover:border-brand-500/40"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category chips + sort/filter controls */}
      <div className="mt-4 flex items-center gap-2">
        <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
          {CATEGORY_NAMES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "chip shrink-0 border text-xs",
                category === c
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-black/10 bg-white text-ink-muted hover:border-brand-500/40"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="relative flex shrink-0 items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs font-semibold text-ink-muted"
        >
          <SlidersHorizontal size={15} /> Filters
          {activeFilterCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[9px] text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Sort pills (desktop) */}
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
        {SORTS.map((s) => (
          <button
            key={s.key}
            onClick={() => setSort(s.key)}
            className={cn(
              "chip shrink-0 text-xs",
              sort === s.key ? "bg-brand-50 text-brand-700" : "bg-white text-ink-soft"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-ink-soft">
        {results.length} product{results.length === 1 ? "" : "s"}
        {category !== "All" && ` in ${category}`}
      </p>

      <div className="mt-3">
        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="grid place-items-center rounded-2xl bg-white py-16 text-center shadow-card">
            <p className="text-sm font-semibold text-ink">No products found</p>
            <p className="text-xs text-ink-soft">Try a different search or clear your filters.</p>
          </div>
        )}
      </div>

      {/* Filter drawer / bottom sheet */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-full rounded-t-3xl bg-white p-5 shadow-float animate-slide-up sm:max-w-md sm:rounded-3xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-ink">Filters</h3>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close">
                <X size={20} className="text-ink-muted" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm font-semibold text-ink">
                  <span>Max price</span>
                  <span className="text-brand-700">{formatINR(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={1000}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
              </div>

              <ToggleRow label="In stock only" checked={inStockOnly} onChange={setInStockOnly} />
              <ToggleRow label="Sold by weight" checked={weightOnly} onChange={setWeightOnly} />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setMaxPrice(1000);
                  setInStockOnly(false);
                  setWeightOnly(false);
                }}
                className="btn-ghost flex-1 py-3"
              >
                Reset
              </button>
              <button onClick={() => setDrawerOpen(false)} className="btn-primary flex-1 py-3">
                Show {results.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-xl border border-black/5 bg-cream px-4 py-3 text-left"
    >
      <span className="text-sm font-medium text-ink">{label}</span>
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-md border transition-colors",
          checked ? "border-brand-500 bg-brand-500 text-white" : "border-black/15 bg-white"
        )}
      >
        {checked && <Check size={14} strokeWidth={3} />}
      </span>
    </button>
  );
}
