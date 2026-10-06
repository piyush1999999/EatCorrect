"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { getProduct } from "@/data/products";
import { WeightSelector, QuantityStepper } from "@/components/product/WeightSelector";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { formatWeight } from "@/lib/pricing";

export default function CartPage() {
  const router = useRouter();
  const { items, setWeight, setQuantity, removeFromCart, subtotal } = useCart();

  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 40;
  const discount = subtotal >= 999 ? 100 : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  if (items.length === 0) {
    return (
      <div className="container-app grid min-h-[60vh] place-items-center py-10 text-center">
        <div>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-50">
            <ShoppingBag size={34} className="text-brand-500" />
          </div>
          <h1 className="text-xl font-extrabold text-ink">Your cart is empty</h1>
          <p className="mt-1 text-sm text-ink-soft">Add fresh groceries to get started.</p>
          <Button href="/explore" className="mt-5">Start Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-5">
      <h1 className="text-2xl font-extrabold text-ink">My Cart</h1>
      <p className="text-sm text-ink-soft">{items.length} item{items.length === 1 ? "" : "s"}</p>

      <div className="mt-5 grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => {
            const product = getProduct(item.productId);
            return (
              <div key={item.productId} className="card flex gap-3 p-3">
                <Link href={product ? `/product/${product.slug}` : "#"} className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-ink">{item.name}</h3>
                      <p className="text-xs text-ink-soft">
                        {item.pricingMode === "weight"
                          ? `${formatINR(item.pricePerKg)}/kg`
                          : `${formatINR(item.price)} / ${item.unit}`}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="rounded-full p-1.5 text-ink-soft hover:bg-sand hover:text-rose-500"
                      aria-label="Remove"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="mt-2">
                    {item.pricingMode === "weight" && product ? (
                      <WeightSelector
                        pricePerKg={item.pricePerKg}
                        weightOptions={product.weightOptions.slice(0, 4)}
                        value={item.weight ?? product.defaultWeight}
                        onChange={(g) => setWeight(item.productId, g)}
                        compact
                      />
                    ) : (
                      <div className="flex items-center justify-between">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(q) => setQuantity(item.productId, q)}
                        />
                        <span className="text-lg font-extrabold text-ink">{formatINR(item.lineTotal)}</span>
                      </div>
                    )}
                  </div>

                  {item.pricingMode === "weight" && (
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-ink-soft">{formatWeight(item.weight ?? 0)}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="h-fit lg:sticky lg:top-20">
          <div className="card space-y-3 p-5">
            <h2 className="text-lg font-extrabold text-ink">Bill Details</h2>
            <Row label="Subtotal" value={formatINR(subtotal)} />
            <Row label="Delivery fee" value={deliveryFee === 0 ? "FREE" : formatINR(deliveryFee)} />
            {discount > 0 && <Row label="Discount" value={`- ${formatINR(discount)}`} accent />}
            {deliveryFee > 0 && (
              <p className="flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-2 text-xs font-medium text-brand-700">
                <Tag size={13} /> Add {formatINR(499 - subtotal)} more for free delivery
              </p>
            )}
            <div className="flex items-center justify-between border-t border-black/5 pt-3">
              <span className="text-base font-bold text-ink">To Pay</span>
              <span className="text-xl font-extrabold text-ink">{formatINR(total)}</span>
            </div>
            <button onClick={() => router.push("/checkout")} className="btn-primary w-full py-3.5">
              Proceed to Checkout <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-ink-muted">{label}</span>
      <span className={accent ? "font-semibold text-brand-600" : "font-semibold text-ink"}>{value}</span>
    </div>
  );
}
