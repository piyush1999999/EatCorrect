import React from "react";
import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";
import { MEMBERSHIP } from "@/data/account";
import { formatINR } from "@/lib/utils";

export function MembershipBanner() {
  return (
    <section className="overflow-hidden rounded-3xl bg-ink text-white shadow-float">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold">
            <Crown size={13} /> {MEMBERSHIP.tier}
          </span>
          <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl">Better food. Better rewards.</h2>
          <p className="mt-1 text-sm text-white/70">
            Free delivery, exclusive offers & 2x points — from {formatINR(MEMBERSHIP.priceMonthly)}/month.
          </p>
        </div>
        <Link
          href="/membership"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-[1.02]"
        >
          Join EatCorrect+ <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
