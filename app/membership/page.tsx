import React from "react";
import type { Metadata } from "next";
import { Crown, Check, Truck, Tag, Clock, Star, Package, Sparkles } from "lucide-react";
import { MEMBERSHIP } from "@/data/account";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = { title: "EatCorrect+" };

const BENEFIT_ICONS = [Truck, Tag, Clock, Star, Package, Sparkles];

export default function MembershipPage() {
  return (
    <div className="container-app max-w-3xl py-5">
      {/* Hero card */}
      <div className="overflow-hidden rounded-3xl bg-ink p-8 text-center text-white shadow-float">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold">
          <Crown size={14} /> EatCorrect+
        </span>
        <h1 className="mt-4 font-display text-3xl font-black sm:text-4xl">Better food. Better rewards.</h1>
        <p className="mt-2 text-sm text-white/70">
          Unlock free delivery, exclusive offers and double reward points.
        </p>
        <div className="mt-5 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-black">{formatINR(MEMBERSHIP.priceMonthly)}</span>
          <span className="text-white/60">/month</span>
        </div>
        <button className="mt-5 rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-[1.02]">
          Join EatCorrect+
        </button>
        <p className="mt-2 text-xs text-white/50">Cancel anytime</p>
      </div>

      {/* Benefits */}
      <h2 className="mt-8 text-lg font-extrabold text-ink">Membership benefits</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {MEMBERSHIP.benefits.map((b, i) => {
          const Icon = BENEFIT_ICONS[i] ?? Check;
          return (
            <div key={b} className="card flex items-center gap-3 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={19} />
              </span>
              <span className="text-sm font-semibold text-ink">{b}</span>
            </div>
          );
        })}
      </div>

      {/* Comparison */}
      <div className="mt-8 card overflow-hidden">
        <div className="grid grid-cols-3 border-b border-black/5 bg-cream p-4 text-sm font-bold text-ink">
          <span>Feature</span>
          <span className="text-center text-ink-soft">Free</span>
          <span className="text-center text-brand-700">EatCorrect+</span>
        </div>
        {[
          ["Delivery fee", "₹40", "Free"],
          ["Reward points", "1x", "2x"],
          ["Member offers", "—", "✓"],
          ["Early access", "—", "✓"],
        ].map((row) => (
          <div key={row[0]} className="grid grid-cols-3 border-b border-black/5 p-4 text-sm last:border-0">
            <span className="font-medium text-ink">{row[0]}</span>
            <span className="text-center text-ink-soft">{row[1]}</span>
            <span className="text-center font-bold text-brand-700">{row[2]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
