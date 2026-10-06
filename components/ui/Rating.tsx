import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = 14,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <Star size={size} className="fill-amber-400 text-amber-400" />
      <span className="text-sm font-semibold text-ink">{value.toFixed(1)}</span>
      {typeof count === "number" && (
        <span className="text-xs text-ink-soft">({count})</span>
      )}
    </span>
  );
}
