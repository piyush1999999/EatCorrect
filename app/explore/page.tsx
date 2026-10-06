import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ExploreClient } from "@/components/explore/ExploreClient";

export const metadata: Metadata = {
  title: "Explore",
  description: "Search and filter fresh groceries and healthy food on EatCorrect.",
};

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="container-app py-10 text-ink-soft">Loading…</div>}>
      <ExploreClient />
    </Suspense>
  );
}
