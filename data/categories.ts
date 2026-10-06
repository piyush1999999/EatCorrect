import type { Category } from "@/types";

const img = (id: string) => `https://images.unsplash.com/${id}?w=400&q=80&auto=format&fit=crop`;

export const CATEGORIES: Category[] = [
  { id: "fruits", name: "Fruits", emoji: "🍎", image: img("photo-1619566636858-adf3ef46400b") },
  { id: "vegetables", name: "Vegetables", emoji: "🥦", image: img("photo-1540420773420-3366772f4999") },
  { id: "dairy", name: "Dairy", emoji: "🥛", image: img("photo-1550583724-b2692b85b150") },
  { id: "paneer", name: "Paneer", emoji: "🧀", image: img("photo-1631452180519-c014fe946bc7") },
  { id: "meat", name: "Meat", emoji: "🍗", image: img("photo-1604503468506-a8da13d82791") },
  { id: "snacks", name: "Snacks", emoji: "🍿", image: img("photo-1621939514649-280e2ee25f60") },
  { id: "staples", name: "Staples", emoji: "🌾", image: img("photo-1586201375761-83865001e31c") },
  { id: "beverages", name: "Beverages", emoji: "🧃", image: img("photo-1600271886742-f049cd451bba") },
  { id: "healthy", name: "Healthy Foods", emoji: "🥗", image: img("photo-1512621776951-a57141f2eefd") },
  { id: "farm", name: "Farm Fresh", emoji: "🧺", image: img("photo-1542838132-92c53300491e") },
];

/** Category filter options for the Explore page (includes "All"). */
export const CATEGORY_NAMES = ["All", ...CATEGORIES.map((c) => c.name)];
