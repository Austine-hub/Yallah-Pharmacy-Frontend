// ===============================================================
// ✅ BestSellersData.ts — Centralized Product Data + Utilities
// ===============================================================

import pic1 from "../assets/products/Durex-Fetherlite-Condoms.png";
import pic2 from "../assets/products/Always-Ultra-Thin-Pads-8s.png";
import pic3 from "../assets/products/Swift-Pregnancy-Test-Kit.png";
import pic4 from "../assets/products/Panadol-Extra-10s.png";
import pic5 from "../assets/products/Strepsils-Lozenges-24s.png";
import pic6 from "../assets/products/E45 Moisturizing-Cream-100g.png";
import pic7 from "../assets/products/Dettol-hand-sanitizer-50ml.png";
import pic8 from "../assets/products/Gaviscon-peppermint-liquid-200ml.png";
import pic9 from "../assets/products/Deep-Heat-Rub-35g.png";
import pic10 from "../assets/products/Nivea-Lip-Balm-Original-4.8g.png";
import pic11 from "../assets/products/Vaseline-Petroleum-Jelly-100.png";
import pic12 from "../assets/products/savlon.png";
import pic13 from "../assets/products/centrum-energy.png";
import pic14 from "../assets/products/ors.png";
import pic15 from "../assets/products/clearasil.png";

// ===============================================================
// 🧩 Interface — Product Model
// ===============================================================
export interface Product {
  id: string;
  name: string;
  category: "Pharma" | "Non-Pharma";
  description: string;
  price: number;
  image: string;
  isTopSeller: boolean;
  isPharma?: boolean;
  isNonPharma?: boolean;
  ingredients?: string[];
  usage?: string;
}

// ===============================================================
// 📦 Data — Central Product Array
// ===============================================================
export const bestSellersData: Product[] = [
  {
    id: "1",
    name: "Durex Fetherlite Condoms 3s",
    category: "Non-Pharma",
    description: "Ultra-thin condoms designed for comfort and protection.",
    price: 650,
    image: pic1,
    isTopSeller: true,
    isNonPharma: true,
    usage: "Use as directed before sexual activity for protection.",
    ingredients: ["Natural latex rubber", "Silicone lubricant"],
  },
  {
    id: "2",
    name: "Always Ultra Thin Pads 8s",
    category: "Non-Pharma",
    description:
      "Super absorbent sanitary pads with odor-neutralizing technology.",
    price: 380,
    image: pic2,
    isTopSeller: true,
    isNonPharma: true,
    usage: "Use during menstruation and change regularly.",
    ingredients: ["Cotton top sheet", "Super absorbent polymer core"],
  },
  {
    id: "3",
    name: "Swift Pregnancy Test Kit",
    category: "Non-Pharma",
    description: "Quick and accurate pregnancy test for early detection.",
    price: 300,
    image: pic3,
    isTopSeller: true,
    isNonPharma: true,
    usage: "Collect urine sample and apply to the test strip. Wait 3–5 mins.",
    ingredients: ["HCG antibody strip", "Plastic test case"],
  },
  {
    id: "4",
    name: "Panadol Extra 10s",
    category: "Pharma",
    description: "Effective pain and headache relief with caffeine boost.",
    price: 150,
    image: pic4,
    isTopSeller: true,
    isPharma: true,
    usage: "Take 1–2 tablets every 4–6 hours as needed. Do not exceed 8/day.",
    ingredients: ["Paracetamol 500mg", "Caffeine 65mg"],
  },
  {
    id: "5",
    name: "Strepsils Lozenges 24s",
    category: "Pharma",
    description: "Soothing relief for sore throats and mouth irritation.",
    price: 420,
    image: pic5,
    isTopSeller: true,
    isPharma: true,
    usage: "Dissolve one lozenge slowly in the mouth every 2–3 hours.",
    ingredients: ["Dichlorobenzyl alcohol", "Amylmetacresol"],
  },
  {
    id: "6",
    name: "E45 Moisturizing Cream 100g",
    category: "Non-Pharma",
    description: "Dermatologically tested cream for dry and sensitive skin.",
    price: 950,
    image: pic6,
    isTopSeller: true,
    isNonPharma: true,
    usage: "Apply generously to affected skin areas as needed.",
    ingredients: ["White soft paraffin", "Anhydrous lanolin", "Light liquid paraffin"],
  },
  {
    id: "7",
    name: "Dettol Hand Sanitizer 50ml",
    category: "Non-Pharma",
    description: "Kills 99.9% of germs, perfect for on-the-go hygiene.",
    price: 250,
    image: pic7,
    isTopSeller: true,
    isNonPharma: true,
    usage: "Apply a small amount to hands and rub until dry.",
    ingredients: ["Ethyl alcohol 70%", "Aloe vera extract"],
  },
  {
    id: "8",
    name: "Gaviscon Peppermint Liquid 200ml",
    category: "Pharma",
    description: "Fast-acting relief for acid reflux and heartburn.",
    price: 720,
    image: pic8,
    isTopSeller: true,
    isPharma: true,
    usage: "Take 10–20ml after meals and at bedtime as needed.",
    ingredients: ["Sodium alginate", "Sodium bicarbonate", "Calcium carbonate"],
  },
  {
    id: "9",
    name: "Deep Heat Rub 35g",
    category: "Pharma",
    description: "Muscle pain relief cream for active individuals and athletes.",
    price: 550,
    image: pic9,
    isTopSeller: true,
    isPharma: true,
    usage: "Massage a thin layer into affected area 2–3 times daily.",
    ingredients: ["Menthol", "Methyl salicylate", "Eucalyptus oil"],
  },
  {
    id: "10",
    name: "Nivea Lip Balm Original 4.8g",
    category: "Non-Pharma",
    description: "Moisturizing lip balm for smooth and hydrated lips.",
    price: 280,
    image: pic10,
    isTopSeller: true,
    isNonPharma: true,
    usage: "Apply to lips as needed to prevent dryness.",
    ingredients: ["Beeswax", "Shea butter", "Mineral oil"],
  },
  {
    id: "11",
    name: "Vaseline Petroleum Jelly 100ml",
    category: "Non-Pharma",
    description: "Multipurpose skin protectant for dry skin and minor cuts.",
    price: 300,
    image: pic11,
    isTopSeller: true,
    isNonPharma: true,
    usage: "Apply on skin, lips, or wounds as needed.",
    ingredients: ["100% pure petroleum jelly"],
  },
  {
    id: "12",
    name: "Savlon Antiseptic Liquid 200ml",
    category: "Pharma",
    description: "Trusted antiseptic for cuts, grazes, and personal hygiene.",
    price: 400,
    image: pic12,
    isTopSeller: true,
    isPharma: true,
    usage: "Dilute before use. Apply to affected area or use in bathwater.",
    ingredients: ["Cetrimide", "Chlorhexidine gluconate"],
  },
  {
    id: "13",
    name: "Centrum Energy Multivitamins 30s",
    category: "Pharma",
    description: "Daily multivitamin for immune support and energy metabolism.",
    price: 1200,
    image: pic13,
    isTopSeller: true,
    isPharma: true,
    usage: "Take one tablet daily with food.",
    ingredients: ["Vitamin B-complex", "Zinc", "Iron"],
  },
  {
    id: "14",
    name: "ORS Rehydration Salts 10s",
    category: "Pharma",
    description: "Essential salts to restore hydration and electrolytes.",
    price: 180,
    image: pic14,
    isTopSeller: true,
    isPharma: true,
    usage: "Dissolve one sachet in 1L of water. Sip slowly throughout the day.",
    ingredients: ["Sodium chloride", "Potassium chloride", "Glucose"],
  },
  {
    id: "15",
    name: "Clearasil Daily Face Wash 150ml",
    category: "Non-Pharma",
    description: "Gentle cleanser to prevent acne and keep skin fresh.",
    price: 850,
    image: pic15,
    isTopSeller: true,
    isNonPharma: true,
    usage: "Use morning and night. Apply to damp face, lather, and rinse.",
    ingredients: ["Salicylic acid", "Glycerin", "Aloe vera"],
  },
];

// ===============================================================
// 🧮 Utility Functions
// ===============================================================

/** Get product by ID */
export const getProductById = (id: string): Product | undefined =>
  bestSellersData.find((p) => p.id === id);

/** Get similar products by category */
export const getSimilarProducts = (category: string, excludeId: string): Product[] =>
  bestSellersData.filter((p) => p.category === category && p.id !== excludeId);

/** Get all Pharma or Non-Pharma items */
export const filterByType = (type: "Pharma" | "Non-Pharma"): Product[] =>
  bestSellersData.filter((p) => p.category === type);

/** Search products by keyword (name or description) */
export const searchProducts = (keyword: string): Product[] => {
  const term = keyword.toLowerCase();
  return bestSellersData.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
  );
};

/** Calculate savings percentage (for future discount logic) */
export const calculateSavings = (oldPrice: number, newPrice: number): number =>
  Math.max(0, Math.round(((oldPrice - newPrice) / oldPrice) * 100));

// ===============================================================
// 🧠 Default Export (optional convenience)
// ===============================================================
export default bestSellersData;
