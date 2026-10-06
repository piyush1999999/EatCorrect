"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MapPin, ShoppingCart, User, Heart } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/components/providers/CartProvider";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/offers", label: "Offers" },
  { href: "/rewards", label: "Rewards" },
  { href: "/membership", label: "EatCorrect+" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const { count: favCount } = useFavorites();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/90 backdrop-blur-md">
      <div className="container-app flex h-16 items-center gap-4">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <button className="hidden items-center gap-1 rounded-full px-2 py-1 text-sm text-ink-muted hover:bg-sand md:flex">
          <MapPin size={15} className="text-brand-500" />
          <span className="font-medium">Pune 411045</span>
        </button>

        <Link
          href="/explore"
          className="ml-auto hidden max-w-sm flex-1 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm text-ink-soft transition-colors hover:border-brand-500/40 md:ml-0 md:flex"
        >
          <Search size={16} className="shrink-0" />
          <span className="truncate">Search for groceries &amp; healthy food</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-semibold transition-colors",
                pathname === item.href ? "bg-brand-50 text-brand-700" : "text-ink-muted hover:bg-sand"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/favorites" className="relative hidden rounded-full p-2.5 text-ink-muted hover:bg-sand sm:block">
            <Heart size={20} />
            {favCount > 0 && <Dot>{favCount}</Dot>}
          </Link>
          <Link href="/cart" className="relative rounded-full p-2.5 text-ink-muted hover:bg-sand">
            <ShoppingCart size={20} />
            {count > 0 && <Dot>{count}</Dot>}
          </Link>
          <Link href="/profile" className="hidden rounded-full p-2.5 text-ink-muted hover:bg-sand sm:block">
            <User size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Dot({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white animate-pop">
      {children}
    </span>
  );
}
