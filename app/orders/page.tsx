"use client";

import React, { useState } from "react";
import { Package, Check } from "lucide-react";
import { ORDERS } from "@/data/account";
import type { OrderStatus } from "@/types";
import { formatINR, cn } from "@/lib/utils";

const TABS = ["active", "completed", "cancelled"] as const;
const PROGRESS: OrderStatus[] = ["Order Confirmed", "Preparing", "Out for Delivery", "Delivered"];

export default function OrdersPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("active");
  const list = ORDERS.filter((o) => o.tab === tab);

  return (
    <div className="container-app py-5">
      <h1 className="text-2xl font-extrabold text-ink">My Orders</h1>

      <div className="mt-4 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "chip capitalize",
              tab === t ? "bg-brand-500 text-white" : "bg-white text-ink-muted"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {list.length === 0 && (
          <div className="grid place-items-center rounded-2xl bg-white py-16 text-center shadow-card">
            <Package size={32} className="text-ink-soft" />
            <p className="mt-2 text-sm font-semibold text-ink">No {tab} orders</p>
          </div>
        )}

        {list.map((o) => {
          const stepIndex = o.status === "Cancelled" ? -1 : PROGRESS.indexOf(o.status);
          return (
            <div key={o.id} className="card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-ink">Order #{o.id}</p>
                  <p className="text-xs text-ink-soft">{o.date}</p>
                </div>
                <span
                  className={cn(
                    "chip text-xs",
                    o.status === "Delivered"
                      ? "bg-brand-50 text-brand-700"
                      : o.status === "Cancelled"
                      ? "bg-rose-50 text-rose-600"
                      : "bg-amber-50 text-amber-700"
                  )}
                >
                  {o.status}
                </span>
              </div>

              <div className="mt-3 space-y-1 border-y border-black/5 py-3 text-sm">
                {o.lines.map((l, i) => (
                  <div key={i} className="flex justify-between text-ink-muted">
                    <span>
                      {l.name} — {l.weightLabel}
                    </span>
                    <span className="font-medium text-ink">{formatINR(l.lineTotal)}</span>
                  </div>
                ))}
              </div>

              {stepIndex >= 0 && (
                <div className="mt-4 flex items-center">
                  {PROGRESS.map((p, i) => (
                    <React.Fragment key={p}>
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold",
                            i <= stepIndex ? "bg-brand-500 text-white" : "bg-sand text-ink-soft"
                          )}
                        >
                          {i <= stepIndex ? <Check size={13} strokeWidth={3} /> : i + 1}
                        </div>
                        <span className="w-16 text-center text-[9px] font-medium text-ink-soft">{p}</span>
                      </div>
                      {i < PROGRESS.length - 1 && (
                        <div className={cn("mb-4 h-0.5 flex-1 rounded", i < stepIndex ? "bg-brand-500" : "bg-sand")} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-ink-soft">Total</span>
                <span className="text-lg font-extrabold text-ink">{formatINR(o.total)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
