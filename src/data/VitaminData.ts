// ============================================================
// 🧾 VitaminData.ts — MODEL LAYER
// Centralized data + utilities for Vitamins & Supplements
// ============================================================

import image1 from "../assets/vitamins/vitamin_d.png";
import image2 from "../assets/vitamins/vitamin_c.png";
import image3 from "../assets/vitamins/omega3.png";
import image4 from "../assets/vitamins/multivitamin.png";
import image5 from "../assets/vitamins/zinc.png";
import image6 from "../assets/vitamins/magnesium.png";
import image7 from "../assets/vitamins/probiotics.png";
import image8 from "../assets/vitamins/collagen.png";
import image9 from "../assets/vitamins/calcium.png";
import image10 from "../assets/vitamins/iron.png";
import image11 from "../assets/vitamins/vitamin_b12.png";
import image12 from "../assets/vitamins/turmeric.png";

// ============================================================
// 🔹 Product Interface (Model Definition)
// ============================================================
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  fullDescription?: string;
  packSize: string;
  price: number; // ✅ Renamed back to 'price' for consistency
  originalPrice: number;
  discount?: string;
  stock: number;
  image: string;
  trending: boolean;
  features?: string[];
  specifications?: Record<string, string>;
}

// ============================================================
// 📦 Master Product List
// ============================================================
export const products: Product[] = [
  {
    id: "1",
    name: "Vitamin D3 1000 IU Softgels",
    brand: "Nature Made",
    category: "Bone & Immunity Support",
    description: "Essential vitamin for bone strength and immune defense.",
    fullDescription:
      "Vitamin D3 supports calcium absorption, bone density, and immune system health. These softgels are non-GMO and easy to swallow, designed for optimal bioavailability and daily use.",
    packSize: "100 Softgels",
    price: 950,
    originalPrice: 1150,
    discount: "17% Off",
    stock: 85,
    image: image1,
    trending: true,
    features: [
      "Supports bone and immune health",
      "Highly absorbable D3 form",
      "Non-GMO and gluten-free",
      "Easy-to-swallow softgels",
    ],
    specifications: {
      Strength: "1000 IU",
      Form: "Softgel",
      "Servings per container": "100",
      Country: "USA",
    },
  },
  {
    id: "2",
    name: "Vitamin C 1000mg Tablets",
    brand: "NOW Foods",
    category: "Antioxidant & Immune Health",
    description: "Powerful antioxidant that supports immune system resilience.",
    fullDescription:
      "Vitamin C is a potent antioxidant that helps protect cells from oxidative stress, supports collagen synthesis, and boosts immune response. Ideal for daily wellness and recovery.",
    packSize: "60 Tablets",
    price: 720,
    originalPrice: 880,
    discount: "18% Off",
    stock: 110,
    image: image2,
    trending: true,
    features: [
      "1000mg high potency formula",
      "Boosts immunity and collagen formation",
      "Supports antioxidant protection",
      "Non-acidic gentle formula",
    ],
    specifications: {
      Strength: "1000 mg",
      Form: "Tablet",
      "Servings per container": "60",
      Country: "USA",
    },
  },
  {
    id: "3",
    name: "Omega-3 Fish Oil 1000mg",
    brand: "Nordic Naturals",
    category: "Heart & Brain Health",
    description: "High-quality omega-3 for cardiovascular and cognitive support.",
    fullDescription:
      "Purified fish oil providing EPA and DHA for optimal heart, brain, and joint health. Sustainably sourced and molecularly distilled to remove heavy metals and toxins.",
    packSize: "120 Softgels",
    price: 1450,
    originalPrice: 1650,
    discount: "12% Off",
    stock: 60,
    image: image3,
    trending: true,
    features: [
      "Supports brain and heart function",
      "High EPA & DHA concentration",
      "Sustainably sourced fish oil",
      "Third-party purity tested",
    ],
    specifications: {
      Strength: "1000 mg",
      EPA: "330 mg",
      DHA: "220 mg",
      Form: "Softgel",
    },
  },
  {
    id: "4",
    name: "Daily Multivitamin",
    brand: "Centrum",
    category: "Overall Wellness",
    description: "Balanced formula to fill nutritional gaps and boost energy.",
    fullDescription:
      "A daily essential multivitamin designed to support general wellness, metabolism, immune function, and energy production. Ideal for men and women of all ages.",
    packSize: "90 Tablets",
    price: 980,
    originalPrice: 1200,
    discount: "18% Off",
    stock: 130,
    image: image4,
    trending: true,
    features: [
      "Comprehensive daily nutrient support",
      "Enhances energy and metabolism",
      "Boosts immune health",
      "Contains essential minerals and vitamins",
    ],
    specifications: {
      Form: "Tablet",
      "Servings per container": "90",
      Country: "Germany",
    },
  },
  {
    id: "5",
    name: "Zinc Picolinate 50mg",
    brand: "Thorne Research",
    category: "Immunity & Skin Health",
    description: "Supports immune function, wound healing, and healthy skin.",
    packSize: "60 Capsules",
    price: 850,
    originalPrice: 950,
    stock: 55,
    image: image5,
    trending: false,
  },
  {
    id: "6",
    name: "Magnesium Glycinate",
    brand: "Pure Encapsulations",
    category: "Sleep & Muscle Relaxation",
    description: "Highly absorbable form of Magnesium for relaxation and sleep.",
    packSize: "180 Capsules",
    price: 1600,
    originalPrice: 1800,
    discount: "11% Off",
    stock: 70,
    image: image6,
    trending: true,
  },
  {
    id: "7",
    name: "Probiotic 50 Billion CFU",
    brand: "Garden of Life",
    category: "Digestive Health",
    description: "High-potency multi-strain probiotic for gut health.",
    packSize: "30 Capsules",
    price: 1900,
    originalPrice: 2200,
    stock: 40,
    image: image7,
    trending: true,
  },
  {
    id: "8",
    name: "Marine Collagen Peptides",
    brand: "Vital Proteins",
    category: "Skin, Hair & Joints",
    description: "Collagen for youthful skin, strong hair, and flexible joints.",
    packSize: "284g Powder",
    price: 2500,
    originalPrice: 2800,
    discount: "10% Off",
    stock: 95,
    image: image8,
    trending: true,
  },
  {
    id: "9",
    name: "Calcium & Magnesium Tablets",
    brand: "Solaray",
    category: "Bone Health",
    description: "Optimal ratio of Calcium and Magnesium for strong bones.",
    packSize: "100 Tablets",
    price: 650,
    originalPrice: 750,
    stock: 120,
    image: image9,
    trending: false,
  },
  {
    id: "10",
    name: "Iron Complex Gentle Formula",
    brand: "MegaFood",
    category: "Energy & Blood Health",
    description: "Non-constipating iron supplement with B12 and Folate.",
    packSize: "60 Tablets",
    price: 1100,
    originalPrice: 1300,
    stock: 80,
    image: image10,
    trending: false,
  },
  {
    id: "11",
    name: "Vitamin B12 Methylcobalamin",
    brand: "Jarrow Formulas",
    category: "Energy & Nervous System",
    description: "Active form of B12 to support energy production and brain health.",
    packSize: "100 Lozenges",
    price: 780,
    originalPrice: 900,
    stock: 65,
    image: image11,
    trending: true,
  },
  {
    id: "12",
    name: "Turmeric Curcumin Complex",
    brand: "Gaia Herbs",
    category: "Inflammation Support",
    description: "Supports a healthy inflammatory response and joint mobility.",
    packSize: "120 Vegan Capsules",
    price: 1350,
    originalPrice: 1550,
    discount: "13% Off",
    stock: 50,
    image: image12,
    trending: true,
  },
];

// ============================================================
// ⚙️ Business Logic / Controller Utilities
// ============================================================
export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getTrendingProducts = (): Product[] =>
  products.filter((p) => p.trending);

export const getSimilarProducts = (id: string, limit = 4): Product[] => {
  const product = getProductById(id);
  if (!product) return [];
  
  return products
    .filter((p) => p.category === product.category && p.id !== id)
    .slice(0, limit);
};

export const sortProducts = (
  key: "price-asc" | "price-desc" | "alphabetical" | "trending"
): Product[] => {
  const sorted = [...products];
  
  switch (key) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "alphabetical":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "trending":
      return sorted.filter((p) => p.trending);
    default:
      return sorted;
  }
};

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
  );
};

export const getAllBrands = (): string[] =>
  Array.from(new Set(products.map((p) => p.brand))).sort();

export const getAllCategories = (): string[] =>
  Array.from(new Set(products.map((p) => p.category))).sort();

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(price)
    .replace("Ksh", "KSH");

export const getLowStockProducts = (threshold = 50): Product[] =>
  products.filter((p) => p.stock <= threshold && p.stock > 0);

export const getProductsByPriceRange = (min: number, max: number): Product[] =>
  products.filter((p) => p.price >= min && p.price <= max);

export const isInStock = (id: string): boolean => {
  const product = getProductById(id);
  return product ? product.stock > 0 : false;
};

// ============================================================
// ✅ Default Export
// ============================================================
export default {
  products,
  getProductById,
  getTrendingProducts,
  getSimilarProducts,
  sortProducts,
  searchProducts,
  getAllBrands,
  getAllCategories,
  formatPrice,
  getLowStockProducts,
  getProductsByPriceRange,
  isInStock,
};