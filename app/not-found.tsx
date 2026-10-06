import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-app grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="font-display text-6xl font-black text-brand-500">404</p>
        <h1 className="mt-2 text-xl font-extrabold text-ink">Page not found</h1>
        <p className="mt-1 text-sm text-ink-soft">The page you are looking for doesn’t exist.</p>
        <Link href="/" className="btn-primary mt-5">Back to Home</Link>
      </div>
    </div>
  );
}
