import React from "react";
import Link from "next/link";
import { OFFERS } from "@/data/offers";

export function OffersStrip() {
  const featured = OFFERS.slice(0, 4);
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-extrabold tracking-tight text-ink sm:text-xl">Offers for You</h2>
        <Link href="/offers" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
          See all
        </Link>
      </div>
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
        {featured.map((o) => (
          <Link
            key={o.id}
            href="/offers"
            className={`relative w-64 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${o.accent} p-4 text-white shadow-card sm:w-auto`}
          >
            <p className="text-sm font-bold leading-tight">{o.title}</p>
            <p className="mt-1 text-xs text-white/80">{o.subtitle}</p>
            <span className="mt-3 inline-block rounded-md bg-white/20 px-2 py-1 text-[11px] font-bold tracking-wide backdrop-blur">
              {o.code}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
