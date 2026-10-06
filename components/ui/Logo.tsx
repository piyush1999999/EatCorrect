import React from "react";
import { cn } from "@/lib/utils";

/**
 * EatCorrect wordmark + leaf glyph. Uses /public/assets/eatcorrect-logo.png when
 * present (handled by the host <img>); this inline SVG is the resilient default.
 */
export function Logo({
  className,
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "mark";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} aria-label="EatCorrect">
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 shadow-soft">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
          <path
            d="M12 3C7 3 4 6.5 4 11c0 4.5 3.5 8 8 10 4.5-2 8-5.5 8-10 0-4.5-3-8-8-8Z"
            fill="#fff"
            opacity="0.18"
          />
          <path
            d="M19 5c-6 0-11 3.5-12.5 9.5C9 13 13 10.5 16 7c-2 4-5.5 7-9.5 8.5C8 18 14 17 17.5 12 19.5 9.5 20 7 19 5Z"
            fill="#fff"
          />
        </svg>
      </span>
      {variant === "full" && (
        <span className="text-lg font-extrabold tracking-tight text-ink">
          Eat<span className="text-brand-500">Correct</span>
        </span>
      )}
    </span>
  );
}
