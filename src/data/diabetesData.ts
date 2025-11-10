// ===============================================================
// 💊 OffersData.ts — Centralized Diabetes Product Model & Utilities
// ===============================================================
// Architecture: MVC + DRY + Scalable structure
// Purpose: Acts as the single source of truth for all product data,
// categories, and utility functions (used across Diabetes.tsx & DiabetesDetails.tsx)
// ===============================================================

// === Diabetes Drug Images ===
import pic1 from "../assets/diabetes/Metformin.png";
import pic2 from "../assets/diabetes/Glimepiride.png";
import pic3 from "../assets/diabetes/Glipizide.png";
import pic4 from "../assets/diabetes/Gliclazide.png";
import pic5 from "../assets/diabetes/Sitagliptin.png";
import pic6 from "../assets/diabetes/Vildagliptin.png";
import pic7 from "../assets/diabetes/Empagliflozin.png";
import pic8 from "../assets/diabetes/Dapagliflozin.png";
import pic9 from "../assets/diabetes/Insulinglargine.png";
import pic10 from "../assets/diabetes/InsulinAspart.png";
import pic11 from "../assets/diabetes/InsulinDetemir.png";
import pic12 from "../assets/diabetes/Pioglitazone.png";
import pic13 from "../assets/diabetes/Acarbose.png";
import pic14 from "../assets/diabetes/Linagliptin.png";
import pic15 from "../assets/diabetes/Repaglinide.png";
// === Additional Diabetes Drug Images ===
import pic16 from "../assets/diabetes/Canagliflozin.png";   // SGLT2 inhibitor
import pic17 from "../assets/diabetes/saxagliptin.png";     // DPP-4 inhibitor
import pic18 from "../assets/diabetes/Liraglutide.png";     // GLP-1 receptor agonist
import pic19 from "../assets/diabetes/Exenatide.png";       // GLP-1 receptor agonist
import pic20 from "../assets/diabetes/Teneligliptin.png";   // DPP-4 inhibitor


// ===============================================================
// 🧩 Type Definition
// ===============================================================
export interface Offer {
  id: string;
  name: string;
  image: string;
  description: string;
  discount: number;
  price: number;
  oldPrice: number;
}

// ===============================================================
// 📦 Centralized Diabetes Product Data
// ===============================================================
export const offersData: Offer[] = [
  {
    id: "1",
    name: "Metformin 500mg (Glucophage)",
    image: pic1,
    description:
      "First-line oral biguanide for type 2 diabetes. Improves insulin sensitivity and lowers hepatic glucose output.",
    discount: 10,
    price: 450,
    oldPrice: 500,
  },
  {
    id: "2",
    name: "Glimepiride 2mg",
    image: pic2,
    description:
      "Sulfonylurea that stimulates pancreatic beta cells to release insulin. Often used with metformin.",
    discount: 12,
    price: 620,
    oldPrice: 700,
  },
  {
    id: "3",
    name: "Glipizide 5mg",
    image: pic3,
    description:
      "Oral sulfonylurea enhancing insulin secretion. Useful for moderate type 2 diabetes.",
    discount: 10,
    price: 580,
    oldPrice: 650,
  },
  {
    id: "4",
    name: "Gliclazide MR 60mg",
    image: pic4,
    description:
      "Modified-release sulfonylurea for steady glucose control and lower hypoglycemia risk.",
    discount: 8,
    price: 750,
    oldPrice: 820,
  },
  {
    id: "5",
    name: "Sitagliptin 100mg (Januvia)",
    image: pic5,
    description:
      "DPP-4 inhibitor that enhances incretin hormones, improving insulin release and glucose regulation.",
    discount: 10,
    price: 2900,
    oldPrice: 3200,
  },
  {
    id: "6",
    name: "Vildagliptin 50mg",
    image: pic6,
    description:
      "DPP-4 inhibitor for glycemic control, especially in patients intolerant to metformin.",
    discount: 10,
    price: 1850,
    oldPrice: 2050,
  },
  {
    id: "7",
    name: "Empagliflozin 10mg (Jardiance)",
    image: pic7,
    description:
      "SGLT2 inhibitor that promotes urinary glucose excretion and supports heart protection.",
    discount: 15,
    price: 3300,
    oldPrice: 3800,
  },
  {
    id: "8",
    name: "Dapagliflozin 10mg (Forxiga)",
    image: pic8,
    description:
      "SGLT2 inhibitor used to improve glycemic control and reduce cardiovascular risk in T2DM.",
    discount: 10,
    price: 3100,
    oldPrice: 3450,
  },
  {
    id: "9",
    name: "Insulin Glargine (Lantus)",
    image: pic9,
    description:
      "Long-acting basal insulin maintaining steady glucose levels for 24 hours.",
    discount: 8,
    price: 2500,
    oldPrice: 2700,
  },
  {
    id: "10",
    name: "Insulin Aspart (NovoRapid)",
    image: pic10,
    description:
      "Fast-acting insulin for post-meal glucose spikes. Used with long-acting basal insulin.",
    discount: 10,
    price: 2400,
    oldPrice: 2650,
  },
  {
    id: "11",
    name: "Insulin Detemir (Levemir)",
    image: pic11,
    description:
      "Basal insulin analog providing smooth glucose control with low hypoglycemia risk.",
    discount: 10,
    price: 2600,
    oldPrice: 2850,
  },
  {
    id: "12",
    name: "Pioglitazone 30mg",
    image: pic12,
    description:
      "Thiazolidinedione improving insulin sensitivity. Often combined with metformin.",
    discount: 10,
    price: 850,
    oldPrice: 950,
  },
  {
    id: "13",
    name: "Acarbose 50mg",
    image: pic13,
    description:
      "Alpha-glucosidase inhibitor delaying carbohydrate absorption to reduce postprandial spikes.",
    discount: 10,
    price: 700,
    oldPrice: 780,
  },
  {
    id: "14",
    name: "Linagliptin 5mg (Tradjenta)",
    image: pic14,
    description:
      "Once-daily DPP-4 inhibitor safe for renal impairment and effective in glycemic control.",
    discount: 12,
    price: 2650,
    oldPrice: 3000,
  },
  {
    id: "15",
    name: "Repaglinide 2mg",
    image: pic15,
    description:
      "Meglitinide class drug stimulating insulin release during meals; flexible dosing option.",
    discount: 10,
    price: 950,
    oldPrice: 1050,
  },
  {
    id: "16",
    name: "Canagliflozin 100mg (Invokana)",
    image: pic16,
    description:
      "SGLT2 inhibitor for type 2 diabetes, offering glucose lowering and renal protection benefits.",
    discount: 10,
    price: 3200,
    oldPrice: 3550,
  },
  {
    id: "17",
    name: "Saxagliptin 5mg (Onglyza)",
    image: pic17,
    description:
      "DPP-4 inhibitor improving glycemic control without weight gain; well-tolerated option.",
    discount: 10,
    price: 2700,
    oldPrice: 3000,
  },
  {
    id: "18",
    name: "Liraglutide (Victoza)",
    image: pic18,
    description:
      "GLP-1 receptor agonist promoting weight loss and cardiovascular benefit in type 2 diabetes.",
    discount: 15,
    price: 7200,
    oldPrice: 7800,
  },
  {
    id: "19",
    name: "Exenatide (Byetta)",
    image: pic19,
    description:
      "GLP-1 receptor agonist improving postprandial control and supporting weight reduction.",
    discount: 12,
    price: 6800,
    oldPrice: 7400,
  },
  {
    id: "20",
    name: "Teneligliptin 20mg",
    image: pic20,
    description:
      "DPP-4 inhibitor with long half-life; improves fasting and post-meal glucose levels.",
    discount: 10,
    price: 1800,
    oldPrice: 2000,
  },
];

// ===============================================================
// 🛠️ Utility Functions
// ===============================================================

/** Fetch a single offer by ID */
export const getOfferById = (id: string): Offer | undefined =>
  offersData.find((offer) => offer.id === id);

/** Generate SEO-friendly product URL */
export const getProductURL = (id: string): string => {
  const offer = getOfferById(id);
  if (!offer) return "/not-found";
  const slug = offer.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `/diabetes/${slug}-${offer.id}`;
};

/** Retrieve all offers */
export const getAllOffers = (): Offer[] => offersData;

/** Retrieve offers sorted by discount (popular offers first) */
export const getPopularOffers = (): Offer[] =>
  [...offersData].sort((a, b) => b.discount - a.discount);

/** Search for offers by keyword */
export const searchOffers = (query: string): Offer[] => {
  const lower = query.toLowerCase();
  return offersData.filter(
    (o) =>
      o.name.toLowerCase().includes(lower) ||
      o.description.toLowerCase().includes(lower)
  );
};

/** Calculate effective price after discount */
export const calculateDiscountPrice = (price: number, discount: number): number =>
  Math.round(price - (price * discount) / 100);

// ===============================================================
// ✅ Export Default (optional fallback)
// ===============================================================
export default {
  offersData,
  getOfferById,
  getAllOffers,
  getPopularOffers,
  getProductURL,
  searchOffers,
  calculateDiscountPrice,
};
