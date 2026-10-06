"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Home,
  Briefcase,
  Truck,
  Zap,
  Wallet,
  CreditCard,
  Building2,
  Banknote,
  Check,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { ADDRESSES } from "@/data/account";
import { formatINR, cn } from "@/lib/utils";

const STEPS = ["Address", "Delivery", "Payment", "Confirmation"] as const;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [addressId, setAddressId] = useState(ADDRESSES[0]?.id ?? "");
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [payment, setPayment] = useState("upi");
  const [orderId] = useState("EC" + Math.floor(10000 + Math.random() * 90000));

  const deliveryFee = delivery === "express" ? 60 : subtotal >= 499 ? 0 : 40;
  const discount = subtotal >= 999 ? 100 : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const next = () => {
    if (step === 2) clearCart();
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  if (items.length === 0 && step < 3) {
    return (
      <div className="container-app grid min-h-[50vh] place-items-center text-center">
        <div>
          <h1 className="text-xl font-extrabold text-ink">Your cart is empty</h1>
          <Link href="/explore" className="btn-primary mt-4">Browse products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app max-w-3xl py-5">
      {/* Stepper */}
      <div className="mb-6 flex items-center">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  i <= step ? "bg-brand-500 text-white" : "bg-sand text-ink-soft"
                )}
              >
                {i < step ? <Check size={16} strokeWidth={3} /> : i + 1}
              </div>
              <span className={cn("text-[11px] font-semibold", i <= step ? "text-ink" : "text-ink-soft")}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("mx-1 h-0.5 flex-1 rounded", i < step ? "bg-brand-500" : "bg-sand")} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step content */}
      {step === 0 && (
        <Section title="Select delivery address">
          <div className="space-y-3">
            {ADDRESSES.map((a) => (
              <button
                key={a.id}
                onClick={() => setAddressId(a.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl border bg-white p-4 text-left transition-colors",
                  addressId === a.id ? "border-brand-500 ring-1 ring-brand-500" : "border-black/10"
                )}
              >
                <span className="mt-0.5 text-brand-500">
                  {a.label === "Home" ? <Home size={18} /> : a.label === "Work" ? <Briefcase size={18} /> : <MapPin size={18} />}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink">{a.label}</span>
                    <span className="chip bg-sand text-[11px] text-ink-muted">{a.name}</span>
                  </div>
                  <p className="text-sm text-ink-muted">
                    {a.line1}, {a.line2}, {a.city} – {a.pincode}
                  </p>
                  <p className="text-xs text-ink-soft">{a.phone}</p>
                </div>
                {addressId === a.id && <Check size={18} className="text-brand-500" />}
              </button>
            ))}
          </div>
        </Section>
      )}

      {step === 1 && (
        <Section title="Choose delivery speed">
          <div className="space-y-3">
            <OptionRow
              selected={delivery === "standard"}
              onClick={() => setDelivery("standard")}
              icon={<Truck size={18} />}
              title="Standard delivery"
              subtitle="Within 2–4 hours"
              right={subtotal >= 499 ? "FREE" : formatINR(40)}
            />
            <OptionRow
              selected={delivery === "express"}
              onClick={() => setDelivery("express")}
              icon={<Zap size={18} />}
              title="Express delivery"
              subtitle="Within 60 minutes"
              right={formatINR(60)}
            />
          </div>
        </Section>
      )}

      {step === 2 && (
        <Section title="Payment method">
          <div className="space-y-3">
            {[
              { id: "upi", label: "UPI", sub: "Google Pay, PhonePe, Paytm", icon: <Wallet size={18} /> },
              { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", icon: <CreditCard size={18} /> },
              { id: "netbanking", label: "Net Banking", sub: "All major banks", icon: <Building2 size={18} /> },
              { id: "cod", label: "Cash on Delivery", sub: "Pay when you receive", icon: <Banknote size={18} /> },
            ].map((p) => (
              <OptionRow
                key={p.id}
                selected={payment === p.id}
                onClick={() => setPayment(p.id)}
                icon={p.icon}
                title={p.label}
                subtitle={p.sub}
              />
            ))}
          </div>
        </Section>
      )}

      {step === 3 ? (
        <div className="grid place-items-center py-10 text-center animate-fade-up">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-50">
            <CheckCircle2 size={44} className="text-brand-500" />
          </div>
          <h1 className="text-2xl font-extrabold text-ink">Order Confirmed!</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Your order <span className="font-bold text-ink">#{orderId}</span> has been placed.
          </p>
          <p className="text-sm text-ink-soft">
            {delivery === "express" ? "Arriving within 60 minutes" : "Arriving in 2–4 hours"}
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/orders" className="btn-primary">Track Order</Link>
            <Link href="/" className="btn-outline">Continue Shopping</Link>
          </div>
        </div>
      ) : (
        <>
          {/* Order summary */}
          <div className="mt-5 card p-4">
            <h3 className="mb-2 text-sm font-bold text-ink">Order Summary</h3>
            <div className="space-y-1.5 text-sm">
              <Row label="Subtotal" value={formatINR(subtotal)} />
              <Row label="Delivery" value={deliveryFee === 0 ? "FREE" : formatINR(deliveryFee)} />
              {discount > 0 && <Row label="Discount" value={`- ${formatINR(discount)}`} />}
              <div className="flex items-center justify-between border-t border-black/5 pt-2 font-bold text-ink">
                <span>To Pay</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            {step > 0 && (
              <button onClick={back} className="btn-ghost flex-1 py-3.5">Back</button>
            )}
            <button onClick={next} className="btn-primary flex-1 py-3.5">
              {step === 2 ? `Pay ${formatINR(total)}` : "Continue"} <ArrowRight size={17} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-up">
      <h1 className="mb-4 text-xl font-extrabold text-ink">{title}</h1>
      {children}
    </div>
  );
}

function OptionRow({
  selected,
  onClick,
  icon,
  title,
  subtitle,
  right,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  right?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border bg-white p-4 text-left transition-colors",
        selected ? "border-brand-500 ring-1 ring-brand-500" : "border-black/10"
      )}
    >
      <span className="text-brand-500">{icon}</span>
      <div className="flex-1">
        <div className="font-bold text-ink">{title}</div>
        <div className="text-xs text-ink-soft">{subtitle}</div>
      </div>
      {right && <span className="text-sm font-bold text-brand-700">{right}</span>}
      <span
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full border",
          selected ? "border-brand-500 bg-brand-500 text-white" : "border-black/20"
        )}
      >
        {selected && <Check size={12} strokeWidth={3} />}
      </span>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-muted">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
