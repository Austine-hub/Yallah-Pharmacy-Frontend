// ============================================================================
// 💊 HTNData.ts — Central Data Source for Hypertension Products
// Serves as the Model layer for HTNDetails.tsx & HTN.tsx
// ============================================================================

// ===============================
// ✅ Static Image Imports
// ===============================
import amlodipineImg from "../assets/products/BloodPressure/Amlodipine.png";
import atenololImg from "../assets/products/BloodPressure/Atenolol.png";
import bisoprololImg from "../assets/products/BloodPressure/Bisoprolol.png";
import candesartanImg from "../assets/products/BloodPressure/Candesartan.png";
import chlorthalidoneImg from "../assets/products/BloodPressure/Chlorthalidone.png";
import enalaprilImg from "../assets/products/BloodPressure/Enalapril.png";
import furosemideImg from "../assets/products/BloodPressure/Furosemide.png";
import hydrochlorothiazideImg from "../assets/products/BloodPressure/Hydrochlorothiazide.png";
import losartanImg from "../assets/products/BloodPressure/Losartan.png";
import nifedipineImg from "../assets/products/BloodPressure/Nifedipine.png";
import spironolactoneImg from "../assets/products/BloodPressure/Spironolactone.png";
import telmisartanImg from "../assets/products/BloodPressure/Telmisartan.png";
import valsartanImg from "../assets/products/BloodPressure/Valsartan.png";

// ============================================================================
// 🧩 Type Definitions
// ============================================================================

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  stock: "In Stock" | "Out of Stock";
  image: string;
  rating: number;
  badge?: string;
  manufacturer: string;
  description: string;
  features: string[];
  usage: {
    dosage: string;
    administration: string;
    storage: string;
    warning: string;
  };
}

// ============================================================================
// 💊 Product Catalog — Hypertension Drugs
// ============================================================================

export const htnProducts: Product[] = [
  {
    id: 1,
    name: "Norvasc (Amlodipine)",
    manufacturer: "Pfizer, USA",
    category: "Calcium Channel Blocker",
    price: 3200,
    originalPrice: 3500,
    stock: "In Stock",
    image: amlodipineImg,
    rating: 4.7,
    badge: "SALE",
    description:
      "Norvasc (Amlodipine) is a long-acting calcium channel blocker used to treat high blood pressure and angina. It relaxes blood vessels, allowing blood to flow more easily and reducing cardiac workload.",
    features: [
      "Clinically proven calcium channel blocker",
      "Effective for hypertension and angina management",
      "Once-daily dosing with sustained control",
      "Well-tolerated and recommended by global guidelines",
    ],
    usage: {
      dosage: "5–10 mg once daily as prescribed",
      administration: "Can be taken with or without food",
      storage: "Store below 30°C in a dry place away from light",
      warning: "Do not stop abruptly; taper under medical supervision",
    },
  },
  {
    id: 2,
    name: "Tenormin (Atenolol)",
    manufacturer: "AstraZeneca, UK",
    category: "Beta Blocker",
    price: 2800,
    originalPrice: 3000,
    stock: "In Stock",
    image: atenololImg,
    rating: 4.6,
    description:
      "Tenormin (Atenolol) is a cardioselective beta-blocker that lowers blood pressure by reducing heart rate and cardiac output. It is also used for angina and post-myocardial infarction management.",
    features: [
      "Cardioselective beta-blocker with fewer respiratory effects",
      "Effective in long-term hypertension control",
      "Improves survival post-heart attack",
      "Once-daily dosage for convenience",
    ],
    usage: {
      dosage: "25–100 mg once daily as directed",
      administration: "Take with water at the same time each day",
      storage: "Keep below 25°C, protected from moisture",
      warning: "Avoid sudden withdrawal to prevent rebound hypertension",
    },
  },
  {
    id: 3,
    name: "Concor (Bisoprolol)",
    manufacturer: "Merck, Germany",
    category: "Beta Blocker",
    price: 3400,
    originalPrice: 3700,
    stock: "In Stock",
    image: bisoprololImg,
    rating: 4.9,
    badge: "NEW",
    description:
      "Concor (Bisoprolol) is a highly selective beta-1 blocker used in hypertension and chronic heart failure. It improves cardiac efficiency while minimizing respiratory side effects.",
    features: [
      "Highly cardioselective beta-1 blocker",
      "Proven efficacy in heart failure and hypertension",
      "Minimizes fatigue and dizziness",
      "Trusted European-made formulation",
    ],
    usage: {
      dosage: "5–10 mg daily or as advised by physician",
      administration: "Take in the morning before meals",
      storage: "Store below 30°C, away from direct sunlight",
      warning: "Consult your doctor before changing dosage",
    },
  },
  {
    id: 4,
    name: "Atacand (Candesartan)",
    manufacturer: "AstraZeneca, Sweden",
    category: "Angiotensin II Receptor Blocker (ARB)",
    price: 3600,
    originalPrice: 3850,
    stock: "In Stock",
    image: candesartanImg,
    rating: 4.8,
    description:
      "Atacand (Candesartan) is an ARB that relaxes blood vessels and helps control blood pressure effectively. It reduces the risk of stroke and heart failure in hypertensive patients.",
    features: [
      "Potent ARB with long duration of action",
      "Reduces cardiovascular events",
      "Suitable for diabetic and elderly patients",
      "Minimal electrolyte imbalance risk",
    ],
    usage: {
      dosage: "8–32 mg once daily",
      administration: "Can be taken with or without food",
      storage: "Store at room temperature (15–30°C)",
      warning: "Avoid use during pregnancy",
    },
  },
  {
    id: 5,
    name: "Hygroton (Chlorthalidone)",
    manufacturer: "Novartis, Switzerland",
    category: "Thiazide-like Diuretic",
    price: 3000,
    originalPrice: 3200,
    stock: "In Stock",
    image: chlorthalidoneImg,
    rating: 4.5,
    description:
      "Hygroton (Chlorthalidone) is a thiazide-like diuretic that helps the kidneys remove excess salt and water, lowering blood pressure and reducing fluid retention.",
    features: [
      "Effective in combination therapy for hypertension",
      "Long half-life for once-daily dosing",
      "Reduces stroke risk in hypertensive patients",
      "Preferred diuretic in major guidelines",
    ],
    usage: {
      dosage: "12.5–25 mg daily",
      administration: "Take in the morning with water",
      storage: "Keep tightly closed below 30°C",
      warning: "Monitor electrolytes during long-term use",
    },
  },
  {
    id: 6,
    name: "Renitec (Enalapril)",
    manufacturer: "MSD, Netherlands",
    category: "ACE Inhibitor",
    price: 3100,
    originalPrice: 3400,
    stock: "In Stock",
    image: enalaprilImg,
    rating: 4.4,
    description:
      "Renitec (Enalapril) is an ACE inhibitor that relaxes blood vessels and reduces cardiac workload. It’s used in hypertension and heart failure management.",
    features: [
      "ACE inhibitor with proven mortality benefit",
      "Effective in both hypertension and heart failure",
      "Protective in diabetic nephropathy",
      "Improves arterial compliance",
    ],
    usage: {
      dosage: "5–20 mg once or twice daily",
      administration: "Take consistently at the same time daily",
      storage: "Store below 25°C, away from moisture",
      warning: "Discontinue if persistent dry cough develops",
    },
  },
  {
    id: 7,
    name: "Lasix (Furosemide)",
    manufacturer: "Sanofi, France",
    category: "Loop Diuretic",
    price: 2700,
    originalPrice: 2950,
    stock: "In Stock",
    image: furosemideImg,
    rating: 4.6,
    description:
      "Lasix (Furosemide) is a potent loop diuretic used in managing hypertension and edema due to heart failure, liver, or kidney disease.",
    features: [
      "Rapid-acting loop diuretic",
      "Reduces fluid overload and blood pressure",
      "Relieves symptoms of heart failure",
      "Trusted brand with decades of clinical use",
    ],
    usage: {
      dosage: "20–80 mg once or twice daily",
      administration: "Take in the morning to avoid nocturia",
      storage: "Keep in original packaging, below 30°C",
      warning: "Monitor electrolytes and hydration",
    },
  },
  {
    id: 8,
    name: "Hydrosan (Hydrochlorothiazide)",
    manufacturer: "Teva, Israel",
    category: "Thiazide Diuretic",
    price: 2900,
    originalPrice: 3100,
    stock: "In Stock",
    image: hydrochlorothiazideImg,
    rating: 4.3,
    description:
      "Hydrosan (Hydrochlorothiazide) promotes sodium and water excretion to help lower blood pressure and prevent fluid retention.",
    features: [
      "Common first-line therapy for hypertension",
      "Economical and effective diuretic",
      "Works synergistically with other agents",
      "Once-daily oral administration",
    ],
    usage: {
      dosage: "12.5–50 mg once daily",
      administration: "Preferably in the morning",
      storage: "Keep tightly closed below 30°C",
      warning: "Avoid excessive sunlight exposure",
    },
  },
  {
    id: 9,
    name: "Cozaar (Losartan)",
    manufacturer: "Merck, USA",
    category: "Angiotensin II Receptor Blocker (ARB)",
    price: 3300,
    originalPrice: 3500,
    stock: "In Stock",
    image: losartanImg,
    rating: 4.8,
    description:
      "Cozaar (Losartan) is an ARB that helps lower blood pressure and protect the kidneys, particularly in diabetic patients.",
    features: [
      "Well-tolerated with minimal cough risk",
      "Renoprotective benefits in diabetes",
      "Once-daily administration",
      "Clinically validated efficacy",
    ],
    usage: {
      dosage: "50–100 mg daily",
      administration: "With or without food",
      storage: "Store at room temperature below 30°C",
      warning: "Avoid in pregnancy; monitor kidney function",
    },
  },
  {
    id: 10,
    name: "Adalat (Nifedipine)",
    manufacturer: "Bayer, Germany",
    category: "Calcium Channel Blocker",
    price: 3200,
    originalPrice: 3450,
    stock: "In Stock",
    image: nifedipineImg,
    rating: 4.7,
    description:
      "Adalat (Nifedipine) relaxes and widens blood vessels to improve blood flow, reducing blood pressure and angina symptoms.",
    features: [
      "Fast-acting calcium channel blocker",
      "Effective in chronic and acute hypertension",
      "Useful for pregnancy-induced hypertension",
      "High safety profile in long-term use",
    ],
    usage: {
      dosage: "10–30 mg two to three times daily",
      administration: "Swallow whole, do not crush",
      storage: "Keep below 25°C in a dry place",
      warning: "Avoid abrupt withdrawal to prevent BP rebound",
    },
  },
  {
    id: 11,
    name: "Aldactone (Spironolactone)",
    manufacturer: "Pfizer, USA",
    category: "Potassium-Sparing Diuretic",
    price: 3400,
    originalPrice: 3700,
    stock: "In Stock",
    image: spironolactoneImg,
    rating: 4.9,
    description:
      "Aldactone (Spironolactone) is a potassium-sparing diuretic that counteracts aldosterone to reduce fluid retention and blood pressure.",
    features: [
      "Prevents potassium loss compared to thiazides",
      "Used in resistant hypertension",
      "Improves outcomes in heart failure",
      "Supports hormonal balance in hyperaldosteronism",
    ],
    usage: {
      dosage: "25–100 mg daily",
      administration: "Take with food to reduce GI upset",
      storage: "Keep in a cool, dry place",
      warning: "Monitor potassium and renal function",
    },
  },
  {
    id: 12,
    name: "Micardis (Telmisartan)",
    manufacturer: "Boehringer Ingelheim, Germany",
    category: "Angiotensin II Receptor Blocker (ARB)",
    price: 3550,
    originalPrice: 3800,
    stock: "In Stock",
    image: telmisartanImg,
    rating: 4.8,
    description:
      "Micardis (Telmisartan) is an ARB known for its long half-life and 24-hour blood pressure control, offering organ protection and improved compliance.",
    features: [
      "Provides sustained 24-hour BP control",
      "Excellent tolerability profile",
      "Metabolically neutral (safe in diabetics)",
      "Once-daily dosing convenience",
    ],
    usage: {
      dosage: "40–80 mg once daily",
      administration: "Can be taken with or without meals",
      storage: "Store below 30°C",
      warning: "Do not use during pregnancy",
    },
  },
  {
    id: 13,
    name: "Diovan (Valsartan)",
    manufacturer: "Novartis, Switzerland",
    category: "Angiotensin II Receptor Blocker (ARB)",
    price: 3700,
    originalPrice: 4000,
    stock: "In Stock",
    image: valsartanImg,
    rating: 4.9,
    description:
      "Diovan (Valsartan) is an ARB used to manage hypertension and improve survival post-heart failure. It blocks angiotensin II to relax vessels and reduce strain on the heart.",
    features: [
      "Clinically proven in hypertension and heart failure",
      "Reduces hospitalizations and mortality",
      "Excellent safety profile in long-term therapy",
      "Trusted by cardiologists worldwide",
    ],
    usage: {
      dosage: "80–160 mg once daily",
      administration: "With or without food",
      storage: "Store below 25°C",
      warning: "Avoid use during pregnancy",
    },
  },
];

// ============================================================================
// 🛠️ Utility Functions — Model Helpers
// ============================================================================

/** Formats price for display (KES with commas). */
export const formatPrice = (price: number): string => {
  return `KES ${price.toLocaleString()}`;
};

/** Retrieves a product by ID. */
export const getProductById = (id: number): Product | undefined =>
  htnProducts.find((p) => p.id === id);

/** Retrieves similar products by category (excluding the given ID). */
export const getSimilarProducts = (category: string, id: number): Product[] =>
  htnProducts.filter((p) => p.category === category && p.id !== id).slice(0, 4);

export default htnProducts;
