import React from "react";
import type { Metadata } from "next";
import { Gift, Star, Users, CalendarCheck, Leaf, Crown } from "lucide-react";
import { REWARDS, EARN_POINTS, USER } from "@/data/account";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = { title: "Rewards" };

const EARN_ICONS = [Star, Star, Users, CalendarCheck, Leaf];

export default function RewardsPage() {
  return (
    <div className="container-app py-5">
      <h1 className="text-2xl font-extrabold text-ink">EatCorrect Rewards</h1>

      {/* Points balance */}
      <div className="mt-4 overflow-hidden rounded-3xl bg-brand-700 p-6 text-white shadow-float">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/70">Your points</p>
            <p className="mt-1 font-display text-4xl font-black">
              {USER.points.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-white/70">EC Points</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
            <Gift size={30} />
          </div>
        </div>
      </div>

      {/* Available rewards */}
      <h2 className="mt-7 text-lg font-extrabold text-ink">Available Rewards</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {REWARDS.map((r) => {
          const canRedeem = USER.points >= r.points;
          return (
            <div key={r.id} className="card flex flex-col p-4">
              <span className="text-lg font-extrabold text-ink">{r.title}</span>
              <span className="text-xs text-ink-soft">{r.description}</span>
              <span className="mt-2 text-sm font-bold text-brand-600">{r.points} pts</span>
              <button
                disabled={!canRedeem}
                className="btn-primary mt-3 w-full py-2 text-xs disabled:opacity-50"
              >
                {canRedeem ? "Redeem" : "Locked"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Earn points */}
      <h2 className="mt-7 text-lg font-extrabold text-ink">Earn More Points</h2>
      <div className="mt-3 card divide-y divide-black/5">
        {EARN_POINTS.map((e, i) => {
          const Icon = EARN_ICONS[i] ?? Star;
          return (
            <div key={e.action} className="flex items-center gap-3 p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Icon size={17} />
              </span>
              <span className="flex-1 text-sm font-medium text-ink">{e.action}</span>
              <span className="text-sm font-bold text-brand-600">{e.points}</span>
            </div>
          );
        })}
      </div>

      {/* Membership nudge */}
      <div className="mt-7 flex items-center gap-3 rounded-2xl bg-ink p-5 text-white">
        <Crown size={22} className="text-gold" />
        <p className="flex-1 text-sm">Members earn <b>2x points</b> on every order.</p>
        <a href="/membership" className="rounded-full bg-gold px-4 py-2 text-xs font-bold text-ink">
          Join
        </a>
      </div>
    </div>
  );
}
