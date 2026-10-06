import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Package,
  MapPin,
  CreditCard,
  Crown,
  Gift,
  Heart,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import { USER } from "@/data/account";

export const metadata: Metadata = { title: "Profile" };

const MENU = [
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/profile", label: "Addresses", icon: MapPin },
  { href: "/profile", label: "Payment methods", icon: CreditCard },
  { href: "/membership", label: "EatCorrect+", icon: Crown },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/profile", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Help & Support", icon: HelpCircle },
  { href: "/profile", label: "Settings", icon: Settings },
];

export default function ProfilePage() {
  return (
    <div className="container-app max-w-2xl py-5">
      {/* Identity */}
      <div className="card flex items-center gap-4 p-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-2xl font-black text-white">
          {USER.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold text-ink">{USER.name}</h1>
          <p className="flex items-center gap-1.5 text-sm text-ink-muted">
            <Phone size={13} /> {USER.phone}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-ink-muted">
            <Mail size={13} /> {USER.email}
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Link href="/rewards" className="card p-4 text-center">
          <p className="text-lg font-extrabold text-brand-600">{USER.points.toLocaleString("en-IN")}</p>
          <p className="text-xs text-ink-soft">EC Points</p>
        </Link>
        <Link href="/orders" className="card p-4 text-center">
          <p className="text-lg font-extrabold text-ink">3</p>
          <p className="text-xs text-ink-soft">Orders</p>
        </Link>
        <Link href="/membership" className="card p-4 text-center">
          <p className="text-lg font-extrabold text-gold">{USER.member ? "Active" : "Join"}</p>
          <p className="text-xs text-ink-soft">EatCorrect+</p>
        </Link>
      </div>

      {/* Menu */}
      <div className="mt-4 card divide-y divide-black/5">
        {MENU.map((m) => (
          <Link key={m.label} href={m.href} className="flex items-center gap-3 p-4 hover:bg-cream">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <m.icon size={17} />
            </span>
            <span className="flex-1 text-sm font-semibold text-ink">{m.label}</span>
            <ChevronRight size={17} className="text-ink-soft" />
          </Link>
        ))}
      </div>

      <button className="btn-ghost mt-4 w-full py-3.5 text-rose-500">
        <LogOut size={17} /> Logout
      </button>
    </div>
  );
}
