import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export function CategoryStrip() {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-extrabold tracking-tight text-ink sm:text-xl">Shop by Category</h2>
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-5 sm:px-0 lg:grid-cols-10">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/explore?category=${encodeURIComponent(c.name)}`}
            className="group flex w-20 shrink-0 flex-col items-center gap-2 sm:w-auto"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-sand shadow-soft transition-transform group-hover:-translate-y-0.5 sm:h-full sm:w-full sm:aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute bottom-1 left-1 text-base">{c.emoji}</span>
            </div>
            <span className="text-center text-[11px] font-semibold leading-tight text-ink-muted sm:text-xs">
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
