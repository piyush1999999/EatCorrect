import type { Offer } from "@/types";

export const OFFERS: Offer[] = [
  { id: "o1", title: "20% off Fresh Vegetables", subtitle: "On orders above ₹299", code: "FRESH20", group: "Today's Deals", accent: "from-brand-500 to-brand-700" },
  { id: "o2", title: "Flat ₹100 off", subtitle: "First order of the day", code: "MORNING100", group: "Today's Deals", accent: "from-gold to-amber-600" },
  { id: "o3", title: "Free delivery all week", subtitle: "Exclusive for EatCorrect+ members", code: "MEMBERFREE", group: "Member Offers", accent: "from-emerald-500 to-teal-700" },
  { id: "o4", title: "Extra 10% member cashback", subtitle: "On every Better Choice product", code: "MEMBER10", group: "Member Offers", accent: "from-brand-600 to-emerald-800" },
  { id: "o5", title: "Buy 2 Get 1 Free", subtitle: "On all dairy products", code: "DAIRY3", group: "Buy More Save More", accent: "from-sky-500 to-indigo-600" },
  { id: "o6", title: "Save ₹250 on ₹999", subtitle: "Stock up & save", code: "BULK250", group: "Buy More Save More", accent: "from-violet-500 to-purple-700" },
  { id: "o7", title: "Fresh Today, 15% off", subtitle: "Harvested this morning", code: "TODAY15", group: "Fresh Deals", accent: "from-lime-500 to-green-700" },
  { id: "o8", title: "Healthy snacks under ₹199", subtitle: "Guilt-free picks", code: "UNDER199", group: "Under ₹199", accent: "from-orange-500 to-rose-600" },
];
