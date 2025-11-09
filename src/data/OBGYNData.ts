// ===============================================================
// ✅ SexualHealthData.ts — MODEL Layer (Central Source of Truth)
// For: Sexual.tsx & SexualDetails.tsx
// Implements DRY, MVC, reusable logic, and utility helpers
// ===============================================================

import pic1 from "../assets/products/Oxytocin-injection.png";
import pic2 from "../assets/products/misoprostol-tablets.png";
import pic3 from "../assets/products/mifepristone.png";
import pic4 from "../assets/products/combined-oral-contraceptive.png";
import pic5 from "../assets/products/depo-provera.png";
import pic6 from "../assets/products/medroxyprogesterone.png";
import pic7 from "../assets/products/clomiphene-citrate.png";
import pic8 from "../assets/products/letrozole.png";
import pic9 from "../assets/products/ferrous-sulfate.png";
import pic10 from "../assets/products/folic-acid.png";
import pic11 from "../assets/products/magnesium-sulfate.png";
import pic12 from "../assets/products/nifedipine.png";
import pic13 from "../assets/products/methyldopa.png";
import pic14 from "../assets/products/labetalol.png";
import pic15 from "../assets/products/betamethasone.png";
import pic16 from "../assets/products/dexamethasone.png";
import pic17 from "../assets/products/cephalexin.png";
import pic18 from "../assets/products/Amoxicillin.png";
import pic19 from "../assets/products/metronidazole-gel.png";
import pic20 from "../assets/products/Fluconazole.png";
import pic21 from "../assets/products/Acyclovir.png";
import pic22 from "../assets/products/Azithromycin.png";
import pic23 from "../assets/products/Ceftriaxone.png";
import pic24 from "../assets/products/Magnesium-oxide.png";
import pic25 from "../assets/products/Iron-sucrose.png";

// ===============================================================
// 🧩 PRODUCT INTERFACE
// ===============================================================
export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  oldPrice: number;
  discount: number;
  description: string;
  fullDescription?: string;
  brand?: string;
  stock?: number;
  trending?: boolean;
  howToUse?: string;
  features?: string[];
  specifications?: Record<string, string>;
}

// ===============================================================
// 💊 SEXUAL & REPRODUCTIVE HEALTH PRODUCTS — Expanded (1–25)
// ===============================================================

export const SEXUAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Oxytocin Injection 10IU",
    image: pic1,
    category: "Obstetric Medicines",
    price: 120,
    oldPrice: 140,
    discount: 10,
    stock: 250,
    description: "Uterotonic for labor induction and postpartum hemorrhage control.",
    fullDescription:
      "Oxytocin is used to induce labor, strengthen uterine contractions, and control bleeding after childbirth. It acts by stimulating uterine smooth muscle contraction.",
    howToUse: "Administer intramuscularly or intravenously under medical supervision.",
    features: ["Labor induction", "Controls postpartum bleeding", "Short-acting hormone"],
    specifications: {
      Strength: "10IU/mL",
      Form: "Injection",
      Manufacturer: "PharmaLife Ltd.",
      Storage: "Store below 25°C; protect from light.",
    },
  },
  {
    id: 2,
    name: "Misoprostol 200mcg Tablets",
    image: pic2,
    category: "Reproductive Health",
    price: 150,
    oldPrice: 165,
    discount: 10,
    stock: 300,
    description: "Prostaglandin analog used for cervical ripening and PPH prevention.",
    fullDescription:
      "Misoprostol promotes uterine contractions and is used in postpartum hemorrhage control, cervical ripening, and early pregnancy termination.",
    howToUse: "Take orally or vaginally as directed by a qualified healthcare provider.",
    features: ["Cervical ripening", "Uterotonic", "Prevents PPH"],
    specifications: {
      Strength: "200 mcg",
      Packaging: "Tablets",
      Manufacturer: "Cipla Ltd.",
      Storage: "Store below 30°C in a dry place.",
    },
  },
  {
    id: 3,
    name: "Mifepristone 200mg Tablets",
    image: pic3,
    category: "Reproductive Health",
    price: 1900,
    oldPrice: 2100,
    discount: 12,
    stock: 120,
    description: "Antiprogestin for medical abortion and fibroid treatment.",
    fullDescription:
      "Mifepristone blocks progesterone receptors, leading to uterine contraction and endometrial shedding. Used with Misoprostol for safe medical termination of pregnancy.",
    howToUse: "Oral administration under supervision of a registered medical provider.",
    features: ["Medical abortion", "Hormonal fibroid management"],
    specifications: {
      Strength: "200 mg",
      CountryOfOrigin: "India",
      Packaging: "Blister pack of 1 tablet",
    },
  },
  {
    id: 4,
    name: "Combined Oral Contraceptive Pills",
    image: pic4,
    category: "Contraceptives",
    price: 380,
    oldPrice: 430,
    discount: 14,
    stock: 500,
    description: "Used for birth control and menstrual cycle regulation.",
    fullDescription:
      "Combination of estrogen and progestin hormones that prevent ovulation and regularize menstrual cycles.",
    howToUse: "Take one tablet daily at the same time each day.",
    features: ["Prevents pregnancy", "Regulates cycles", "Reduces dysmenorrhea"],
    specifications: {
      Dosage: "Daily tablet",
      Manufacturer: "Pfizer",
      ShelfLife: "36 months",
    },
  },
  {
    id: 5,
    name: "Depo-Provera Injection 150mg/mL",
    image: pic5,
    category: "Contraceptives",
    price: 260,
    oldPrice: 300,
    discount: 12,
    stock: 250,
    description: "Injectable contraceptive providing 3-month pregnancy prevention.",
    fullDescription:
      "Depo-Provera (medroxyprogesterone acetate) provides effective, long-term contraception lasting up to 12 weeks per injection.",
    howToUse: "Administer intramuscularly every 12 weeks by a healthcare professional.",
    features: ["3-month contraception", "Hormonal balance", "Reversible method"],
    specifications: {
      Strength: "150 mg/mL",
      Form: "Injection",
      Manufacturer: "Pfizer",
    },
  },
  {
    id: 6,
    name: "Medroxyprogesterone 10mg Tablets",
    image: pic6,
    category: "Hormone Therapy",
    price: 500,
    oldPrice: 580,
    discount: 15,
    stock: 220,
    description: "Progestin for abnormal uterine bleeding and hormone therapy.",
    fullDescription:
      "Medroxyprogesterone helps regulate menstrual cycles, treat amenorrhea, and manage endometrial hyperplasia by balancing estrogen effects.",
    howToUse: "Take orally once daily for 5–10 days as prescribed.",
    features: ["Cycle regulation", "Endometrial protection", "Hormonal therapy"],
    specifications: {
      Strength: "10 mg",
      Manufacturer: "Sun Pharma",
      Packaging: "Blister pack of 10 tablets",
    },
  },
  {
    id: 7,
    name: "Clomiphene Citrate 50mg Tablets",
    image: pic7,
    category: "Fertility Management",
    price: 1150,
    oldPrice: 1280,
    discount: 10,
    stock: 180,
    description: "Ovulation-inducing drug for infertility management.",
    fullDescription:
      "Clomiphene stimulates ovulation by increasing gonadotropin secretion, helping women with anovulatory infertility to conceive.",
    howToUse: "Take one tablet daily for 5 days, starting on day 3–5 of the menstrual cycle.",
    features: ["Induces ovulation", "Improves fertility", "Non-invasive treatment"],
    specifications: {
      Strength: "50 mg",
      Manufacturer: "Serono Labs",
      Form: "Tablets",
    },
  },
  {
    id: 8,
    name: "Letrozole 2.5mg Tablets",
    image: pic8,
    category: "Fertility Management",
    price: 950,
    oldPrice: 1080,
    discount: 11,
    stock: 160,
    description: "Aromatase inhibitor used for ovulation induction.",
    fullDescription:
      "Letrozole reduces estrogen production, triggering FSH secretion and stimulating ovulation. Commonly used in PCOS-related infertility.",
    howToUse: "Take one tablet daily for 5 consecutive days, starting on day 3 of the cycle.",
    features: ["Stimulates ovulation", "Alternative to Clomiphene", "Used in PCOS"],
    specifications: {
      Strength: "2.5 mg",
      Manufacturer: "Cipla Ltd.",
      ShelfLife: "24 months",
    },
  },
  {
    id: 9,
    name: "Ferrous Sulfate 200mg Tablets",
    image: pic9,
    category: "Prenatal Supplements",
    price: 150,
    oldPrice: 180,
    discount: 10,
    stock: 450,
    description: "Iron supplement for anemia during pregnancy.",
    fullDescription:
      "Ferrous sulfate replenishes body iron stores and increases hemoglobin production, preventing and treating iron-deficiency anemia in pregnancy.",
    howToUse: "Take one tablet daily after meals with water or orange juice.",
    features: ["Prevents anemia", "Boosts hemoglobin", "Safe in pregnancy"],
    specifications: {
      Strength: "200 mg",
      Form: "Tablet",
      Manufacturer: "GlaxoSmithKline",
    },
  },
  {
    id: 10,
    name: "Folic Acid 5mg Tablets",
    image: pic10,
    category: "Prenatal Supplements",
    price: 90,
    oldPrice: 110,
    discount: 12,
    stock: 600,
    description: "Prevents neural tube defects during early pregnancy.",
    fullDescription:
      "Folic acid supports neural tube development, DNA synthesis, and maternal blood formation, essential before and during pregnancy.",
    howToUse: "Take one tablet daily before conception and during the first trimester.",
    features: ["Neural tube protection", "Supports fetal growth", "Improves maternal health"],
    specifications: {
      Strength: "5 mg",
      Manufacturer: "PharmaLife Ltd.",
      ShelfLife: "36 months",
    },
  },
  {
    id: 11,
    name: "Magnesium Sulfate Injection 50%",
    image: pic11,
    category: "Obstetric Medicines",
    price: 95,
    oldPrice: 120,
    discount: 15,
    stock: 300,
    description: "Used in preeclampsia and eclampsia for seizure control.",
    fullDescription:
      "Magnesium sulfate is an anticonvulsant used to prevent and treat seizures in women with severe preeclampsia or eclampsia.",
    howToUse: "Administer intravenously under strict medical supervision.",
    features: ["Prevents seizures", "Neuroprotective", "Essential obstetric emergency drug"],
    specifications: {
      Concentration: "50%",
      Form: "Injection",
      Manufacturer: "AstraZeneca",
      Storage: "Store below 25°C.",
    },
  },
  {
    id: 12,
    name: "Nifedipine 10mg Tablets",
    image: pic12,
    category: "Tocolytics & Antihypertensives",
    price: 290,
    oldPrice: 330,
    discount: 10,
    stock: 260,
    description: "Tocolytic for preterm labor and antihypertensive use in pregnancy.",
    fullDescription:
      "Nifedipine is a calcium channel blocker used to relax uterine muscles during preterm labor and manage pregnancy-induced hypertension.",
    howToUse: "Take orally as prescribed, usually 10–20mg every 8 hours.",
    features: ["Reduces uterine contractions", "Lowers BP", "Safe in pregnancy"],
    specifications: {
      Strength: "10 mg",
      Manufacturer: "Bayer",
      ShelfLife: "24 months",
    },
  },
  {
    id: 13,
    name: "Methyldopa 250mg Tablets",
    image: pic13,
    category: "Antihypertensives",
    price: 370,
    oldPrice: 420,
    discount: 11,
    stock: 280,
    description: "Safe antihypertensive commonly used in pregnancy.",
    fullDescription:
      "Methyldopa lowers blood pressure by acting on the central nervous system. It’s one of the safest drugs for hypertension in pregnancy.",
    howToUse: "Take orally 2–3 times daily as prescribed.",
    features: ["Safe for fetus", "Controls BP", "Long-term management"],
    specifications: {
      Strength: "250 mg",
      Manufacturer: "GlaxoSmithKline",
    },
  },
  {
    id: 14,
    name: "Labetalol 100mg Tablets",
    image: pic14,
    category: "Antihypertensives",
    price: 590,
    oldPrice: 640,
    discount: 10,
    stock: 200,
    description: "Preferred antihypertensive in gestational hypertension.",
    fullDescription:
      "Labetalol combines alpha and beta blockade, reducing blood pressure without compromising uteroplacental blood flow.",
    howToUse: "Take 100mg orally twice daily or as directed by a physician.",
    features: ["Fast-acting", "Safe in pregnancy", "Controls BP effectively"],
    specifications: {
      Strength: "100 mg",
      Manufacturer: "Cipla Ltd.",
      ShelfLife: "36 months",
    },
  },
  {
    id: 15,
    name: "Betamethasone Injection 12mg/2mL",
    image: pic15,
    category: "Corticosteroids",
    price: 680,
    oldPrice: 760,
    discount: 13,
    stock: 150,
    description: "Corticosteroid for fetal lung maturation in preterm labor.",
    fullDescription:
      "Betamethasone stimulates fetal surfactant production, reducing neonatal respiratory distress in preterm births.",
    howToUse: "Administer intramuscularly, 12mg every 24 hours for two doses.",
    features: ["Promotes fetal lung maturity", "Preterm labor preparation"],
    specifications: {
      Strength: "12mg/2mL",
      Form: "Injection",
      Manufacturer: "GSK",
    },
  },
  {
    id: 16,
    name: "Dexamethasone 4mg/mL Injection",
    image: pic16,
    category: "Corticosteroids",
    price: 250,
    oldPrice: 290,
    discount: 13,
    stock: 230,
    description: "Corticosteroid for inflammation and fetal lung maturity.",
    fullDescription:
      "Dexamethasone is used to enhance fetal lung maturity in threatened preterm delivery and to reduce maternal inflammation.",
    howToUse: "Administer intramuscularly as prescribed (4mg every 12 hours × 4 doses).",
    features: ["Lung maturity", "Anti-inflammatory", "Safe for obstetric use"],
    specifications: {
      Strength: "4mg/mL",
      Manufacturer: "Pfizer",
    },
  },
  {
    id: 17,
    name: "Cephalexin 500mg Capsules",
    image: pic17,
    category: "Antibiotics",
    price: 250,
    oldPrice: 290,
    discount: 12,
    stock: 400,
    description: "Antibiotic for UTIs and wound infections during pregnancy.",
    fullDescription:
      "Cephalexin is a first-generation cephalosporin antibiotic effective against gram-positive bacteria and safe in pregnancy.",
    howToUse: "Take one capsule every 8 hours for 5–7 days as directed.",
    features: ["Safe in pregnancy", "Broad-spectrum", "Well tolerated"],
    specifications: {
      Strength: "500 mg",
      Manufacturer: "Abbott",
      Packaging: "Capsules",
    },
  },
  {
    id: 18,
    name: "Amoxicillin-Clavulanate 625mg Tablets",
    image: pic18,
    category: "Antibiotics",
    price: 480,
    oldPrice: 550,
    discount: 12,
    stock: 350,
    description: "Broad-spectrum antibiotic safe in pregnancy.",
    fullDescription:
      "Amoxicillin-clavulanate is used to treat mixed bacterial infections including respiratory, urinary, and pelvic infections.",
    howToUse: "Take orally every 12 hours after meals as prescribed.",
    features: ["Broad coverage", "Safe in pregnancy", "B-lactamase inhibitor"],
    specifications: {
      Strength: "625 mg",
      Manufacturer: "GSK",
    },
  },
  {
    id: 19,
    name: "Metronidazole Vaginal Gel 0.75%",
    image: pic19,
    category: "Antimicrobials",
    price: 350,
    oldPrice: 400,
    discount: 10,
    stock: 190,
    description: "Topical antibiotic for bacterial vaginosis.",
    fullDescription:
      "Metronidazole gel treats bacterial vaginosis by inhibiting anaerobic bacterial DNA synthesis locally.",
    howToUse: "Apply intravaginally once daily at bedtime for 5 days.",
    features: ["Topical use", "Effective against BV", "Low systemic absorption"],
    specifications: {
      Concentration: "0.75%",
      Manufacturer: "Pfizer",
      Form: "Gel (40g tube)",
    },
  },
  {
    id: 20,
    name: "Fluconazole 150mg Capsules",
    image: pic20,
    category: "Antifungals",
    price: 320,
    oldPrice: 370,
    discount: 10,
    stock: 270,
    description: "Antifungal for vaginal candidiasis treatment.",
    fullDescription:
      "Fluconazole inhibits fungal ergosterol synthesis, effectively treating vulvovaginal and oropharyngeal candidiasis.",
    howToUse: "Take one capsule orally as a single dose or as prescribed.",
    features: ["Broad antifungal action", "One-dose therapy", "Well tolerated"],
    specifications: {
      Strength: "150 mg",
      Manufacturer: "Pfizer",
      Packaging: "Capsule",
    },
  },
  {
    id: 21,
    name: "Acyclovir 400mg Tablets",
    image: pic21,
    category: "Antivirals",
    price: 390,
    oldPrice: 440,
    discount: 10,
    stock: 190,
    description: "Antiviral for genital herpes management.",
    fullDescription:
      "Acyclovir inhibits viral DNA replication, reducing severity and recurrence of herpes simplex infections.",
    howToUse: "Take one tablet 3–5 times daily for 5–10 days.",
    features: ["Antiviral", "Reduces recurrence", "Safe in pregnancy (Category B)"],
    specifications: {
      Strength: "400 mg",
      Manufacturer: "GlaxoSmithKline",
    },
  },
  {
    id: 22,
    name: "Azithromycin 500mg Tablets",
    image: pic22,
    category: "Antibiotics",
    price: 680,
    oldPrice: 760,
    discount: 11,
    stock: 260,
    description: "Antibiotic for chlamydia and other STIs.",
    fullDescription:
      "Azithromycin is a macrolide antibiotic effective against Chlamydia trachomatis and other reproductive tract infections.",
    howToUse: "Take 1g (two tablets) orally as a single dose with water.",
    features: ["Single-dose therapy", "Safe in pregnancy", "Broad coverage"],
    specifications: {
      Strength: "500 mg",
      Manufacturer: "Pfizer",
      ShelfLife: "36 months",
    },
  },
  {
    id: 23,
    name: "Ceftriaxone 1g Injection",
    image: pic23,
    category: "Antibiotics",
    price: 850,
    oldPrice: 970,
    discount: 15,
    stock: 190,
    description: "Broad-spectrum antibiotic for severe pelvic infections.",
    fullDescription:
      "Ceftriaxone is a third-generation cephalosporin used in PID, sepsis, and other severe infections during pregnancy.",
    howToUse: "Administer intramuscularly or intravenously once daily as prescribed.",
    features: ["Broad-spectrum", "Once-daily dosing", "Safe in pregnancy"],
    specifications: {
      Strength: "1 g/vial",
      Manufacturer: "Roche",
      Form: "Injection powder",
    },
  },
  {
    id: 24,
    name: "Magnesium Oxide 400mg Tablets",
    image: pic24,
    category: "Mineral Supplements",
    price: 150,
    oldPrice: 180,
    discount: 12,
    stock: 350,
    description: "Mineral supplement for leg cramps in pregnancy.",
    fullDescription:
      "Magnesium oxide supports muscle relaxation, bone development, and reduces leg cramps during pregnancy.",
    howToUse: "Take one tablet daily with meals or as directed by a healthcare provider.",
    features: ["Reduces cramps", "Improves muscle tone", "Prenatal supplement"],
    specifications: {
      Strength: "400 mg",
      Manufacturer: "Bayer Healthcare",
    },
  },
  {
    id: 25,
    name: "Iron Sucrose Injection 100mg",
    image: pic25,
    category: "IV Supplements",
    price: 1600,
    oldPrice: 1800,
    discount: 10,
    stock: 140,
    description: "IV iron for severe iron-deficiency anemia in pregnancy.",
    fullDescription:
      "Iron sucrose replenishes iron stores faster than oral iron, improving hemoglobin levels in moderate to severe anemia.",
    howToUse: "Administer intravenously in divided doses under medical supervision.",
    features: ["Rapid anemia correction", "IV administration", "Safe in pregnancy"],
    specifications: {
      Strength: "100 mg/5 mL",
      Manufacturer: "Vifor Pharma",
      Storage: "Store below 25°C, protect from light.",
    },
  },
];


// ===============================================================
// 🧮 MODEL UTILITIES — REUSABLE HELPERS
// ===============================================================

// ✅ Format price into Kenyan Shilling currency
export const formatPrice = (price: number): string =>
  `KSh ${price.toLocaleString("en-KE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

// ✅ Fetch product by ID
export const getProductById = (id: string | number): Product | undefined =>
  SEXUAL_PRODUCTS.find((p) => p.id === Number(id));

// ✅ Get similar products within same category
export const getSimilarProducts = (
  id: string | number,
  limit = 4
): Product[] => {
  const product = getProductById(id);
  if (!product) return [];
  return SEXUAL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, limit);
};

// ✅ Search products by keyword (name, category, description)
export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return SEXUAL_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
};

// ✅ Filter products by category
export const getProductsByCategory = (category: string): Product[] =>
  SEXUAL_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

// ✅ Sort products
export const sortProducts = (
  sortBy: "priceAsc" | "priceDesc" | "discount"
): Product[] => {
  switch (sortBy) {
    case "priceAsc":
      return [...SEXUAL_PRODUCTS].sort((a, b) => a.price - b.price);
    case "priceDesc":
      return [...SEXUAL_PRODUCTS].sort((a, b) => b.price - a.price);
    case "discount":
      return [...SEXUAL_PRODUCTS].sort((a, b) => b.discount - a.discount);
    default:
      return SEXUAL_PRODUCTS;
  }
};

// ✅ Stock checker
export const isInStock = (id: string | number): boolean => {
  const product = getProductById(id);
  return product ? (product.stock ?? 0) > 0 : false;
};

// ✅ Stock status message
export const getStockStatus = (product: Product): string => {
  if (!product.stock || product.stock === 0) return "Out of Stock";
  if (product.stock < 50) return "Low Stock";
  return "In Stock";
};

// ===============================================================
// 📦 EXPORTS (for Controller & View layers)
// ===============================================================
export default {
  SEXUAL_PRODUCTS,
  formatPrice,
  getProductById,
  getSimilarProducts,
  getProductsByCategory,
  searchProducts,
  sortProducts,
  isInStock,
  getStockStatus,
};
