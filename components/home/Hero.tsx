import React from "react";
import { Button } from "@/components/ui/Button";
import { Leaf, Truck, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-brand-700 text-white shadow-float">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80&auto=format&fit=crop"
          alt="Fresh produce"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-800 via-brand-700/90 to-brand-600/60" />
      </div>

      <div className="relative px-6 py-10 sm:px-10 sm:py-14">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
          <Leaf size={13} /> Premium food, done right
        </span>
        <h1 className="mt-4 max-w-xl font-display text-4xl font-black leading-[1.05] sm:text-5xl">
          Eat Better.
          <br />
          Choose Correct.
        </h1>
        <p className="mt-3 max-w-md text-sm text-white/80 sm:text-base">
          Fresh, quality food delivered to your door — evaluated on our EatCorrect Score so you
          always pick the better choice.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/explore" size="lg" className="bg-white text-brand-700 hover:bg-white/90">
            Explore Food
          </Button>
          <Button href="/explore" size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
            Shop Now
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-white/80">
          <span className="inline-flex items-center gap-1.5"><Truck size={14} /> 2–4 hr delivery</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} /> Quality checked</span>
          <span className="inline-flex items-center gap-1.5"><Leaf size={14} /> Farm fresh sourcing</span>
        </div>
      </div>
    </section>
  );
}
