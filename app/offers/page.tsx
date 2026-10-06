import React from "react";
import type { Metadata } from "next";
import { OFFERS } from "@/data/offers";
import type { Offer } from "@/types";
import { Ticket } from "lucide-react";

export const metadata: Metadata = { title: "Offers" };

const GROUPS: Offer["group"][] = [
  "Today's Deals",
  "Member Offers",
  "Buy More Save More",
  "Fresh Deals",
  "Under ₹199",
];

export default function OffersPage() {
  return (
    <div className="container-app py-5">
      <h1 className="text-2xl font-extrabold text-ink">Offers & Deals</h1>
      <p className="text-sm text-ink-soft">Save more on quality food</p>

      <div className="mt-6 space-y-8">
        {GROUPS.map((group) => {
          const offers = OFFERS.filter((o) => o.group === group);
          if (offers.length === 0) return null;
          return (
            <section key={group}>
              <h2 className="mb-3 text-lg font-extrabold text-ink">{group}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {offers.map((o) => (
                  <div
                    key={o.id}
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${o.accent} p-5 text-white shadow-card`}
                  >
                    <Ticket size={22} className="opacity-80" />
                    <p className="mt-3 text-base font-bold leading-tight">{o.title}</p>
                    <p className="mt-1 text-xs text-white/80">{o.subtitle}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-md border border-dashed border-white/50 px-2.5 py-1 text-xs font-bold tracking-wide">
                        {o.code}
                      </span>
                      <button className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur">
                        Copy code
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
