import React from "react";
import { cn } from "@/lib/utils";

function scoreColor(total: number): string {
  if (total >= 90) return "#1a7f4b";
  if (total >= 80) return "#4ade80";
  if (total >= 70) return "#c99a3a";
  return "#e07b53";
}

/** Circular progress ring showing the EatCorrect Score out of 100. */
export function ScoreRing({
  score,
  size = 72,
  stroke = 7,
  className,
}: {
  score: number;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreColor(score);

  return (
    <div className={cn("relative inline-flex", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e8ede6" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-extrabold leading-none text-ink" style={{ color }}>
          {score}
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">/100</span>
      </span>
    </div>
  );
}

const LABELS: Record<string, string> = {
  freshness: "Freshness",
  quality: "Quality",
  sourceTransparency: "Source Transparency",
  nutrition: "Nutrition",
  processing: "Processing",
};

export function ScoreBreakdown({
  breakdown,
}: {
  breakdown: Record<string, number>;
}) {
  return (
    <div className="space-y-3">
      {Object.entries(LABELS).map(([key, label]) => {
        const v = breakdown[key] ?? 0;
        return (
          <div key={key}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-ink-muted">{label}</span>
              <span className="font-bold text-ink">{v}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-sand">
              <div
                className="h-full rounded-full bg-brand-500"
                style={{ width: `${v}%`, backgroundColor: scoreColor(v) }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
