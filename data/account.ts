import type { Order, Reward, User, Membership, Address } from "@/types";

export const USER: User = {
  name: "Aarav Sharma",
  phone: "+91 98765 43210",
  email: "aarav.sharma@example.com",
  points: 2450,
  member: false,
};

export const ADDRESSES: Address[] = [
  { id: "a1", label: "Home", name: "Aarav Sharma", phone: "+91 98765 43210", line1: "402, Green Meadows", line2: "Baner Road", city: "Pune", pincode: "411045" },
  { id: "a2", label: "Work", name: "Aarav Sharma", phone: "+91 98765 43210", line1: "7th Floor, Tech Park One", line2: "Hinjewadi Phase 2", city: "Pune", pincode: "411057" },
];

export const ORDERS: Order[] = [
  {
    id: "EC10245",
    date: "2026-10-04",
    lines: [
      { name: "Fresh Paneer", weightLabel: "750 g", lineTotal: 300 },
      { name: "Organic Tomatoes", weightLabel: "1 kg", lineTotal: 60 },
      { name: "Greek Yogurt", weightLabel: "1 pack", lineTotal: 129 },
    ],
    total: 645,
    status: "Out for Delivery",
    tab: "active",
  },
  {
    id: "EC10233",
    date: "2026-09-30",
    lines: [
      { name: "Alphonso Mango", weightLabel: "2 kg", lineTotal: 700 },
      { name: "Premium Almonds", weightLabel: "500 g", lineTotal: 425 },
    ],
    total: 1125,
    status: "Delivered",
    tab: "completed",
  },
  {
    id: "EC10219",
    date: "2026-09-24",
    lines: [{ name: "Fresh Chicken", weightLabel: "1 kg", lineTotal: 280 }],
    total: 280,
    status: "Cancelled",
    tab: "cancelled",
  },
];

export const REWARDS: Reward[] = [
  { id: "rw1", title: "₹50 OFF", points: 500, description: "On your next order above ₹299" },
  { id: "rw2", title: "₹100 OFF", points: 1000, description: "On your next order above ₹599" },
  { id: "rw3", title: "Free Delivery", points: 750, description: "Waive delivery on one order" },
  { id: "rw4", title: "₹250 OFF", points: 2000, description: "On your next order above ₹1299" },
];

export const MEMBERSHIP: Membership = {
  tier: "EatCorrect+",
  active: false,
  priceMonthly: 99,
  benefits: [
    "Free delivery on every order",
    "Exclusive member-only offers",
    "Early access to Fresh Today drops",
    "2x reward points on purchases",
    "Member-only premium products",
    "Personalised recommendations",
  ],
};

export const EARN_POINTS = [
  { action: "Every ₹100 spent", points: "+10 pts" },
  { action: "Write a product review", points: "+50 pts" },
  { action: "Refer a friend", points: "+200 pts" },
  { action: "Daily app check-in", points: "+5 pts" },
  { action: "Choose a Better Choice product", points: "+15 pts" },
];
