"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { clampWeight, formatWeight, priceForWeight, toGrams } from "@/lib/pricing";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Flexible weight selection — quick picks, +/- 50g steps, and custom typed input
 * with a g/kg unit toggle. Price updates live. Inspired by weight-based buying UX.
 */
export function WeightSelector({
  pricePerKg,
  weightOptions,
  value,
  onChange,
  compact = false,
}: {
  pricePerKg: number;
  weightOptions: number[];
  value: number;
  onChange: (grams: number) => void;
  compact?: boolean;
}) {
  const [unit, setUnit] = useState<"g" | "kg">("g");
  const [custom, setCustom] = useState("");

  const step = (dir: 1 | -1) => onChange(clampWeight(value + dir * 50));

  const applyCustom = () => {
    const parsed = parseFloat(custom);
    if (!Number.isNaN(parsed)) onChange(clampWeight(toGrams(parsed, unit)));
    setCustom("");
  };

  const price = priceForWeight(pricePerKg, value);

  return (
    <div className={cn("space-y-3", compact && "space-y-2")}>
      {/* Stepper + live weight */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center rounded-full border border-black/10 bg-white">
          <button
            type="button"
            onClick={() => step(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-sand active:scale-90"
            aria-label="Decrease weight"
          >
            <Minus size={16} />
          </button>
          <span className="min-w-[64px] text-center text-sm font-bold text-ink">
            {formatWeight(value)}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-sand active:scale-90"
            aria-label="Increase weight"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="text-right">
          <div key={price} className="text-lg font-extrabold text-ink animate-scale-in">
            {formatINR(price)}
          </div>
          <div className="text-[11px] text-ink-soft">{formatINR(pricePerKg)}/kg</div>
        </div>
      </div>

      {/* Quick picks */}
      <div className="flex flex-wrap gap-1.5">
        {weightOptions.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => onChange(g)}
            className={cn(
              "chip border text-xs",
              value === g
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-black/10 bg-white text-ink-muted hover:border-brand-500/40"
            )}
          >
            {formatWeight(g)}
          </button>
        ))}
      </div>

      {/* Custom input */}
      {!compact && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="decimal"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyCustom()}
            placeholder="Enter weight"
            className="input py-2.5 text-sm"
          />
          <div className="flex rounded-xl border border-black/10 bg-white p-0.5">
            {(["g", "kg"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={cn(
                  "rounded-lg px-3 py-2 text-xs font-bold transition-colors",
                  unit === u ? "bg-brand-500 text-white" : "text-ink-muted"
                )}
              >
                {u}
              </button>
            ))}
          </div>
          <button type="button" onClick={applyCustom} className="btn-outline px-4 py-2.5 text-xs">
            Set
          </button>
        </div>
      )}
    </div>
  );
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center rounded-full border border-black/10 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-sand active:scale-90"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span className="min-w-[32px] text-center text-sm font-bold text-ink">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-sand active:scale-90"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
