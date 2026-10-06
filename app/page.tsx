import React from "react";
import Link from "next/link";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { Hero } from "@/components/home/Hero";
import { ProductRail } from "@/components/product/ProductGrid";
import {
  popularNearYou,
  eatCorrectPicks,
  freshToday,
  trending,
  betterChoice,
  onOffer,
  recommendedFor,
} from "@/lib/collections";
import { OffersStrip } from "@/components/home/OffersStrip";
import { MembershipBanner } from "@/components/home/MembershipBanner";

export default function HomePage() {
  return (
    <div className="container-app space-y-9 py-5">
      <Hero />
      <CategoryStrip />
      <ProductRail title="Popular Near You" subtitle="What shoppers around you love" products={popularNearYou} href="/explore" />
      <ProductRail title="EatCorrect Picks" subtitle="Hand-selected by our food experts" products={eatCorrectPicks} href="/explore" />
      <MembershipBanner />
      <ProductRail title="Fresh Today" subtitle="Harvested and stocked this morning" products={freshToday} href="/explore" />
      <ProductRail title="Trending" subtitle="Most loved right now" products={trending} href="/explore" />
      <OffersStrip />
      <ProductRail title="Better Choice" subtitle="Meets EatCorrect quality criteria" products={betterChoice} href="/explore" />
      <ProductRail title="Recommended for You" subtitle="Based on your taste" products={recommendedFor()} href="/explore" />
      <ProductRail title="Offers" subtitle="Save on quality food" products={onOffer} href="/offers" />
    </div>
  );
}
