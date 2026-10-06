import React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "gold" | "muted" | "danger" | "white";
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-50 text-brand-700",
    gold: "bg-amber-50 text-amber-700",
    muted: "bg-sand text-ink-muted",
    danger: "bg-rose-50 text-rose-600",
    white: "bg-white/90 text-ink backdrop-blur",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
