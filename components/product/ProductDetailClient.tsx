"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  MapPin,
  Snowflake,
  Truck,
  Check,
  Leaf,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import type { Product } from "@/types";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { ScoreRing, ScoreBreakdown } from "@/components/product/EatCorrectScore";
import { WeightSelector, QuantityStepper } from "@/components/product/WeightSelector";
import { FavoriteButton } from "@/components/product/FavoriteButton";
import { ProductRail } from "@/components/product/ProductGrid";
import { useCart } from "@/components/providers/CartProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { youMayAlsoLike, frequentlyBoughtTogether } from "@/lib/collections";
import { lineTotalFor } from "@/lib/pricing";
import { formatINR, cn } from "@/lib/utils";

export function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { show } = useToast();

  const isWeight = product.pricingMode === "weight";
  const [weight, setWeight] = useState(product.defaultWeight);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const total = lineTotalFor(product, { weight, quantity: qty });

  const add = () => {
    addToCart({ product, weight: isWeight ? weight : undefined, quantity: qty });
    show(`${product.name} added to cart`);
  };
  const buyNow = () => {
    add();
    router.push("/cart");
  };

  return (
    <div className="container-app py-5">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-sand shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.images[activeImg]} alt={product.name} className="h-full w-full object-cover" />
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.badge && <Badge tone="white">{product.badge}</Badge>}
            </div>
            <FavoriteButton productId={product.id} className="absolute right-3 top-3 h-10 w-10" />
          </div>
          <div className="flex gap-2">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "h-16 w-16 overflow-hidden rounded-xl border-2 transition-colors",
                  activeImg === i ? "border-brand-500" : "border-transparent"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-brand-600">{product.category}</p>
            <h1 className="font-display text-3xl font-black text-ink">{product.name}</h1>
            <p className="mt-1 text-ink-muted">{product.shortDescription}</p>
            <div className="mt-2 flex items-center gap-3">
              <Rating value={product.rating} count={product.reviewCount} />
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                EatCorrect Score {product.eatCorrectScore.total}
              </span>
            </div>
          </div>

          <div className="card space-y-4 p-4">
            {isWeight ? (
              <>
                <p className="text-sm font-semibold text-ink">Choose your weight</p>
                <WeightSelector
                  pricePerKg={product.pricePerKg}
                  weightOptions={product.weightOptions}
                  value={weight}
                  onChange={setWeight}
                />
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-ink">{formatINR(product.price)}</span>
                  {product.mrp && (
                    <span className="text-sm text-ink-soft line-through">{formatINR(product.mrp)}</span>
                  )}
                  <span className="text-sm text-ink-soft">/ {product.unit}</span>
                </div>
                <QuantityStepper value={qty} onChange={setQty} />
              </div>
            )}

            <div className="flex items-center justify-between border-t border-black/5 pt-3">
              <span className="text-sm text-ink-muted">Total</span>
              <span key={total} className="text-xl font-extrabold text-ink animate-scale-in">
                {formatINR(total)}
              </span>
            </div>

            <div className="flex gap-3">
              <button onClick={add} className="btn-outline flex-1 py-3.5">
                Add to Cart
              </button>
              <button onClick={buyNow} className="btn-primary flex-1 py-3.5">
                Buy Now
              </button>
            </div>
          </div>

          {/* Quality chips */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { ok: product.qualityChecks.qualityChecked, label: "Quality Checked", icon: ShieldCheck },
              { ok: product.qualityChecks.sourceVerified, label: "Source Verified", icon: Leaf },
              { ok: product.qualityChecks.freshnessChecked, label: "Freshness Checked", icon: Check },
              { ok: product.qualityChecks.labTested, label: "Lab Tested", icon: FlaskConical },
            ]
              .filter((q) => q.ok)
              .map((q) => (
                <div key={q.label} className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2.5">
                  <q.icon size={16} className="shrink-0 text-brand-600" />
                  <span className="text-xs font-semibold text-brand-700">{q.label}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Details sections */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Product Information">
            <p className="text-sm leading-relaxed text-ink-muted">{product.description}</p>
          </Panel>

          <Panel title="Ingredients">
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((i) => (
                <span key={i} className="chip bg-sand text-xs text-ink-muted">{i}</span>
              ))}
            </div>
          </Panel>

          <Panel title="Nutrition (per 100g)">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                { label: "Calories", value: `${product.nutrition.calories}` },
                { label: "Protein", value: `${product.nutrition.protein} g` },
                { label: "Carbs", value: `${product.nutrition.carbohydrates} g` },
                { label: "Fat", value: `${product.nutrition.fat} g` },
                { label: "Fiber", value: `${product.nutrition.fiber} g` },
              ].map((n) => (
                <div key={n.label} className="rounded-xl bg-cream p-3 text-center">
                  <div className="text-base font-extrabold text-ink">{n.value}</div>
                  <div className="text-[11px] text-ink-soft">{n.label}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Customer Reviews">
            <div className="space-y-4">
              {product.reviews.map((r) => (
                <div key={r.id} className="border-b border-black/5 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                      {r.author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-ink">{r.author}</span>
                        {r.verified && <Badge tone="brand">Verified</Badge>}
                      </div>
                      <span className="text-xs text-ink-soft">{r.date}</span>
                    </div>
                    <Rating value={r.rating} size={13} />
                  </div>
                  <p className="mt-2 text-sm text-ink-muted">{r.comment}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Sidebar: score + info */}
        <div className="space-y-6">
          <Panel title="EatCorrect Score">
            <div className="flex items-center gap-4">
              <ScoreRing score={product.eatCorrectScore.total} size={84} />
              <p className="text-sm text-ink-muted">
                A transparent 0–100 rating across freshness, quality, sourcing, nutrition &
                processing.
              </p>
            </div>
            <div className="mt-4">
              <ScoreBreakdown breakdown={product.eatCorrectScore as unknown as Record<string, number>} />
            </div>
          </Panel>

          <Panel title="Origin & Storage">
            <div className="space-y-3 text-sm">
              <InfoRow icon={MapPin} label="Source" value={product.origin} />
              <InfoRow icon={Snowflake} label="Storage" value={product.storage} />
              <InfoRow icon={Truck} label="Delivery" value={product.deliveryEstimate} />
            </div>
          </Panel>
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <ProductRail title="Frequently Bought Together" products={frequentlyBoughtTogether(product.id)} />
        <ProductRail title="You May Also Like" products={youMayAlsoLike(product.id)} />
      </div>

      {/* Sticky mobile add bar */}
      <div className="fixed inset-x-0 bottom-14 z-30 border-t border-black/5 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-[11px] text-ink-soft">Total</div>
            <div className="text-lg font-extrabold text-ink">{formatINR(total)}</div>
          </div>
          <button onClick={add} className="btn-outline flex-1 py-3">Add</button>
          <button onClick={buyNow} className="btn-primary flex-1 py-3">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-5">
      <h2 className="mb-3 text-lg font-extrabold text-ink">{title}</h2>
      {children}
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon size={17} className="mt-0.5 shrink-0 text-brand-500" />
      <div>
        <div className="font-semibold text-ink">{label}</div>
        <div className="text-ink-muted">{value}</div>
      </div>
    </div>
  );
}
