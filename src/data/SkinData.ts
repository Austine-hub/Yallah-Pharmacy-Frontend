// SkinData.ts: The Model (Data & Core Business Logic)

// ===============================================================
// Image Imports (Assets)
// ===============================================================
import pic1 from "../assets/products/benzoyl-peroxide-gel.png";
import pic2 from "../assets/products/clindamycin-gel.png";
import pic3 from "../assets/products/adapalene-gel.png";
import pic4 from "../assets/products/hydrocortisone-cream.png";
import pic5 from "../assets/products/mupirocin-ointment.png";
import pic6 from "../assets/products/ketoconazole-cream.png";
import pic7 from "../assets/products/clotrimazole-cream.png";
import pic8 from "../assets/products/terbinafine-cream.png";
import pic9 from "../assets/products/metronidazole-gel.png";
import pic10 from "../assets/products/azelaic-acid-gel.png";
import pic11 from "../assets/products/tretinoin-cream.png";
import pic12 from "../assets/products/calamine-lotion.png";
import pic13 from "../assets/products/fusidic-acid-cream.png";
import pic14 from "../assets/products/neosporin-ointment.png";
import pic15 from "../assets/products/fusibact-ointment.png";
import pic16 from "../assets/products/erythromycin-gel.png";
import pic17 from "../assets/products/cerave-moisturizing-cream.png";
import pic18 from "../assets/products/effaclar-duo.png";
import pic19 from "../assets/products/eucerin-repair-cream.png";
import pic20 from "../assets/products/olay-retinol-night-cream.png";
import pic21 from "../assets/products/aveeno-moisturizing-lotion.png";
import pic22 from "../assets/products/aquaphor-healing-ointment.png";
import pic23 from "../assets/products/niacinamide-zinc-serum.png";
import pic24 from "../assets/products/salicylic-acid-toner.png";
import pic25 from "../assets/products/panoxyl-foaming-wash.png";

// Placeholder imports for gallery images
import pic11Side from "../assets/products/Tretinoin 0.05% Cream (Retin-A).jpg"; 
import pic11Texture from "../assets/products/tretinoin-cream.png";
import pic17Back from "../assets/products/CeraVe-Hydrating-Cleanser-236ml.png"; 

// ===============================================================
// Image Asset Mapping (DRY & Centralized Asset Access)
// ===============================================================
export const imageAssets = {
  pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10,
  pic11, pic12, pic13, pic14, pic15, pic16, pic17, pic18, pic19, pic20,
  pic21, pic22, pic23, pic24, pic25,
  pic11Side, pic11Texture, pic17Back,
} as const;

// ===============================================================
// Type Definitions (Harmonized with Controller/View)
// ===============================================================
export const PRODUCT_CATEGORIES = {
  ACNE_TREATMENT: "acne-treatment",
  ANTI_AGING: "anti-aging",
  MOISTURIZERS: "moisturizers",
  SERUMS: "serums",
  CLEANSERS: "cleansers",
  TOPICAL_ANTIBIOTICS: "topical-antibiotics",
  ANTIFUNGAL: "antifungal",
  ANTI_INFLAMMATORY: "anti-inflammatory",
  SPECIALTY_TREATMENTS: "specialty-treatments",
} as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[keyof typeof PRODUCT_CATEGORIES];

export interface SkinProduct { 
  id: string;
  name: string;
  slug: string; // Crucial for routing consistency (Details.tsx)
  image: string;
  gallery?: string[]; // Used in Details.tsx
  discount: number;
  price: number;
  oldPrice: number;
  category: ProductCategory;
  description: string;
  ingredients?: string[]; // Used in Details.tsx
  usage?: string; // Used in Details.tsx
  warnings?: string[]; // Used in Details.tsx
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem { // Defined here for completeness, used by Cart utilities
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export type SortOption = "price-asc" | "price-desc" | "name" | "rating" | "discount"; // Used in Skin.tsx

// ===============================================================
// Product Data (The Core Model Data)
// ===============================================================
export const skinProducts: readonly SkinProduct[] = [
  {
    id: "1",
    name: "Benzoyl Peroxide 5% Gel (Acne Treatment)",
    slug: "benzoyl-peroxide-gel",
    image: imageAssets.pic1,
    discount: 12,
    price: 899,
    oldPrice: 1020,
    category: PRODUCT_CATEGORIES.ACNE_TREATMENT,
    description: "Powerful acne-fighting gel that penetrates pores to eliminate acne-causing bacteria. Reduces inflammation and prevents future breakouts.",
    ingredients: ["Benzoyl Peroxide 5%", "Carbomer", "Sodium Hydroxide", "Purified Water"],
    usage: "Apply thin layer to affected areas once daily, gradually increasing to 2-3 times daily if needed. Start with lower frequency to assess tolerance.",
    warnings: ["May cause dryness or peeling", "Use sunscreen during treatment", "Avoid contact with eyes"],
    inStock: true,
    rating: 4.5,
    reviewCount: 234
  },
  {
    id: "2",
    name: "Clindamycin 1% Gel (Cleocin T)",
    slug: "clindamycin-gel",
    image: imageAssets.pic2,
    discount: 10,
    price: 1199,
    oldPrice: 1349,
    category: PRODUCT_CATEGORIES.TOPICAL_ANTIBIOTICS,
    description: "Topical antibiotic gel effective against acne-causing bacteria. Reduces inflammatory acne lesions and prevents bacterial growth.",
    ingredients: ["Clindamycin Phosphate 1%", "Isopropyl Alcohol", "Propylene Glycol"],
    usage: "Apply to affected areas twice daily after cleansing. Use for prescribed duration only.",
    warnings: ["Prescription required", "Complete full course", "May cause skin irritation"],
    inStock: true,
    rating: 4.3,
    reviewCount: 187
  },
  {
    id: "3",
    name: "Adapalene 0.1% Gel (Differin)",
    slug: "adapalene-gel",
    image: imageAssets.pic3,
    discount: 12,
    price: 1499,
    oldPrice: 1699,
    category: PRODUCT_CATEGORIES.ACNE_TREATMENT,
    description: "Retinoid gel that normalizes skin cell turnover, unclogs pores, and reduces inflammation. Effective for both acne treatment and prevention.",
    ingredients: ["Adapalene 0.1%", "Carbomer 940", "Methylparaben", "Disodium EDTA"],
    usage: "Apply once daily at bedtime to clean, dry skin. Allow to absorb before applying moisturizer.",
    warnings: ["Increase sun sensitivity", "May cause initial purging", "Not for use during pregnancy"],
    inStock: true,
    rating: 4.7,
    reviewCount: 412
  },
  {
    id: "4",
    name: "Hydrocortisone 1% Cream",
    slug: "hydrocortisone-cream",
    image: imageAssets.pic4,
    discount: 8,
    price: 499,
    oldPrice: 549,
    category: PRODUCT_CATEGORIES.ANTI_INFLAMMATORY,
    description: "Mild corticosteroid cream that relieves itching, redness, and swelling associated with various skin conditions.",
    ingredients: ["Hydrocortisone 1%", "White Petrolatum", "Cetyl Alcohol", "Glycerin"],
    usage: "Apply thin layer to affected area 2-4 times daily. Do not use for more than 7 days unless directed.",
    warnings: ["Not for facial use", "Limit duration of use", "Avoid broken skin"],
    inStock: true,
    rating: 4.4,
    reviewCount: 156
  },
  {
    id: "5",
    name: "Mupirocin 2% Ointment (Bactroban)",
    slug: "mupirocin-ointment",
    image: imageAssets.pic5,
    discount: 10,
    price: 1249,
    oldPrice: 1399,
    category: PRODUCT_CATEGORIES.TOPICAL_ANTIBIOTICS,
    description: "Topical antibiotic ointment effective against bacterial skin infections including impetigo and minor wounds.",
    ingredients: ["Mupirocin 2%", "Polyethylene Glycol 400", "Polyethylene Glycol 3350"],
    usage: "Apply small amount to affected area 3 times daily for 3-5 days.",
    warnings: ["Prescription required", "Complete full course", "Avoid contact with eyes"],
    inStock: true,
    rating: 4.6,
    reviewCount: 98
  },
  {
    id: "6",
    name: "Ketoconazole 2% Cream (Nizoral)",
    slug: "ketoconazole-cream",
    image: imageAssets.pic6,
    discount: 10,
    price: 999,
    oldPrice: 1099,
    category: PRODUCT_CATEGORIES.ANTIFUNGAL,
    description: "Broad-spectrum antifungal cream effective against fungal skin infections including athlete's foot, ringworm, and seborrheic dermatitis.",
    ingredients: ["Ketoconazole 2%", "Propylene Glycol", "Stearyl Alcohol", "Cetyl Alcohol"],
    usage: "Apply to affected area once daily for 2-6 weeks depending on condition.",
    warnings: ["For external use only", "May cause local irritation", "Continue use as directed"],
    inStock: true,
    rating: 4.5,
    reviewCount: 203
  },
  {
    id: "7",
    name: "Clotrimazole 1% Cream (Canesten)",
    slug: "clotrimazole-cream",
    image: imageAssets.pic7,
    discount: 10,
    price: 599,
    oldPrice: 669,
    category: PRODUCT_CATEGORIES.ANTIFUNGAL,
    description: "Effective antifungal treatment for yeast infections, athlete's foot, jock itch, and ringworm.",
    ingredients: ["Clotrimazole 1%", "Benzyl Alcohol", "Cetostearyl Alcohol", "Sorbitan Monostearate"],
    usage: "Apply thin layer to affected area 2-3 times daily. Continue for 2 weeks after symptoms clear.",
    warnings: ["For external use only", "Avoid contact with eyes", "May stain fabrics"],
    inStock: true,
    rating: 4.3,
    reviewCount: 267
  },
  {
    id: "8",
    name: "Terbinafine 1% Cream (Lamisil)",
    slug: "terbinafine-cream",
    image: imageAssets.pic8,
    discount: 10,
    price: 899,
    oldPrice: 999,
    category: PRODUCT_CATEGORIES.ANTIFUNGAL,
    description: "Fast-acting antifungal cream that treats athlete's foot, jock itch, and ringworm with shorter treatment duration.",
    ingredients: ["Terbinafine HCl 1%", "Sodium Hydroxide", "Sorbitan Monostearate", "Cetyl Alcohol"],
    usage: "Apply once or twice daily to clean, dry skin for 1-4 weeks depending on condition.",
    warnings: ["Complete full treatment course", "May cause burning sensation", "Avoid broken skin"],
    inStock: true,
    rating: 4.6,
    reviewCount: 189
  },
  {
    id: "9",
    name: "Metronidazole 0.75% Gel (for Rosacea)",
    slug: "metronidazole-gel",
    image: imageAssets.pic9,
    discount: 12,
    price: 1199,
    oldPrice: 1349,
    category: PRODUCT_CATEGORIES.SPECIALTY_TREATMENTS,
    description: "Prescription gel formulated to treat rosacea symptoms including redness, bumps, and inflammatory lesions.",
    ingredients: ["Metronidazole 0.75%", "Carbomer 940", "Methylparaben", "Propylene Glycol"],
    usage: "Apply thin layer to affected areas twice daily. Improvement typically seen within 3 weeks.",
    warnings: ["Prescription required", "Avoid alcohol during use", "Protect from sunlight"],
    inStock: true,
    rating: 4.4,
    reviewCount: 142
  },
  {
    id: "10",
    name: "Azelaic Acid 15% Gel (Finacea)",
    slug: "azelaic-acid-gel",
    image: imageAssets.pic10,
    discount: 12,
    price: 1799,
    oldPrice: 2049,
    category: PRODUCT_CATEGORIES.SPECIALTY_TREATMENTS,
    description: "Multi-functional gel that treats acne, reduces hyperpigmentation, and manages rosacea. Gentle yet effective.",
    ingredients: ["Azelaic Acid 15%", "Lecithin", "Glycerin", "Triglycerides"],
    usage: "Apply twice daily to clean skin. Massage gently until absorbed.",
    warnings: ["May cause tingling initially", "Use sunscreen", "Avoid eye area"],
    inStock: true,
    rating: 4.7,
    reviewCount: 276
  },
  {
    id: "11",
    name: "Tretinoin 0.05% Cream (Retin-A)",
    slug: "tretinoin-cream",
    image: imageAssets.pic11,
    gallery: [imageAssets.pic11, imageAssets.pic11Side, imageAssets.pic11Texture], 
    discount: 10,
    price: 1599,
    oldPrice: 1799,
    category: PRODUCT_CATEGORIES.ANTI_AGING,
    description: "Gold-standard retinoid for acne treatment and anti-aging. Increases cell turnover, reduces fine lines, and improves skin texture.",
    ingredients: ["Tretinoin 0.05%", "Butylated Hydroxytoluene", "Stearic Acid", "Isopropyl Myristate"],
    usage: "Apply pea-sized amount to face at bedtime. Start 2-3 times weekly, gradually increase.",
    warnings: ["Prescription required", "Extreme sun sensitivity", "Not during pregnancy/breastfeeding"],
    inStock: true,
    rating: 4.8,
    reviewCount: 523
  },
  {
    id: "12",
    name: "Calamine Lotion (Itch & Rash Relief)",
    slug: "calamine-lotion",
    image: imageAssets.pic12,
    discount: 10,
    price: 449,
    oldPrice: 499,
    category: PRODUCT_CATEGORIES.ANTI_INFLAMMATORY,
    description: "Soothing lotion that relieves itching and irritation from poison ivy, insect bites, sunburn, and minor skin irritations.",
    ingredients: ["Calamine 8%", "Zinc Oxide 8%", "Glycerin", "Bentonite"],
    usage: "Shake well before use. Apply to affected area 3-4 times daily as needed.",
    warnings: ["For external use only", "May dry on clothing", "Discontinue if irritation worsens"],
    inStock: true,
    rating: 4.2,
    reviewCount: 178
  },
  {
    id: "13",
    name: "Fusidic Acid 2% Cream (Fucidin)",
    slug: "fusidic-acid-cream",
    image: imageAssets.pic13,
    discount: 10,
    price: 1199,
    oldPrice: 1349,
    category: PRODUCT_CATEGORIES.TOPICAL_ANTIBIOTICS,
    description: "Antibiotic cream effective against staphylococcal and streptococcal skin infections. Treats impetigo and infected eczema.",
    ingredients: ["Fusidic Acid 2%", "Butylhydroxyanisole", "Cetyl Alcohol", "Glycerin"],
    usage: "Apply 3-4 times daily to affected area. Continue for 7 days or as directed.",
    warnings: ["Prescription required", "Complete full course", "Avoid prolonged use"],
    inStock: true,
    rating: 4.5,
    reviewCount: 134
  },
  {
    id: "14",
    name: "Neomycin + Bacitracin Ointment (Neosporin)",
    slug: "neosporin-ointment",
    image: imageAssets.pic14,
    discount: 10,
    price: 999,
    oldPrice: 1099,
    category: PRODUCT_CATEGORIES.TOPICAL_ANTIBIOTICS,
    description: "Triple antibiotic ointment that prevents infection in minor cuts, scrapes, and burns. Promotes faster healing.",
    ingredients: ["Neomycin", "Bacitracin", "Polymyxin B", "White Petrolatum"],
    usage: "Clean affected area, apply small amount 1-3 times daily. May cover with bandage.",
    warnings: ["For minor wounds only", "Discontinue if rash develops", "Not for deep puncture wounds"],
    inStock: true,
    rating: 4.4,
    reviewCount: 312
  },
  {
    id: "15",
    name: "Sodium Fusidate Ointment (Fusibact)",
    slug: "fusibact-ointment",
    image: imageAssets.pic15,
    discount: 12,
    price: 1149,
    oldPrice: 1299,
    category: PRODUCT_CATEGORIES.TOPICAL_ANTIBIOTICS,
    description: "Topical antibiotic ointment for treating bacterial skin infections. Effective against resistant strains.",
    ingredients: ["Sodium Fusidate 2%", "Wool Alcohol", "White Soft Paraffin", "Liquid Paraffin"],
    usage: "Apply 3 times daily to infected area. Use for 7-14 days as prescribed.",
    warnings: ["Prescription required", "May cause hypersensitivity", "Avoid eye contact"],
    inStock: true,
    rating: 4.3,
    reviewCount: 87
  },
  {
    id: "16",
    name: "Erythromycin 2% Gel (Aknemycin)",
    slug: "erythromycin-gel",
    image: imageAssets.pic16,
    discount: 10,
    price: 1199,
    oldPrice: 1349,
    category: PRODUCT_CATEGORIES.TOPICAL_ANTIBIOTICS,
    description: "Antibiotic gel that treats acne by reducing acne-causing bacteria and inflammation on the skin surface.",
    ingredients: ["Erythromycin 2%", "Alcohol 92%", "Hydroxypropyl Cellulose"],
    usage: "Apply to affected areas twice daily after cleansing. Allow to dry before applying other products.",
    warnings: ["May cause dryness", "Flammable - avoid fire", "Complete treatment course"],
    inStock: true,
    rating: 4.2,
    reviewCount: 156
  },
  {
    id: "17",
    name: "CeraVe Moisturizing Cream",
    slug: "cerave-moisturizing-cream",
    image: imageAssets.pic17,
    gallery: [imageAssets.pic17, imageAssets.pic17Back], 
    discount: 10,
    price: 1999,
    oldPrice: 2199,
    category: PRODUCT_CATEGORIES.MOISTURIZERS,
    description: "Dermatologist-developed moisturizer with ceramides and hyaluronic acid. Restores and maintains skin's natural barrier.",
    ingredients: ["Ceramides", "Hyaluronic Acid", "Niacinamide", "Glycerin"],
    usage: "Apply liberally to face and body as often as needed. Ideal after bathing.",
    warnings: ["Non-comedogenic", "Fragrance-free", "Safe for sensitive skin"],
    inStock: true,
    rating: 4.8,
    reviewCount: 1247
  },
  {
    id: "18",
    name: "La Roche-Posay Effaclar Duo (+)",
    slug: "effaclar-duo",
    image: imageAssets.pic18,
    discount: 8,
    price: 2999,
    oldPrice: 3249,
    category: PRODUCT_CATEGORIES.ACNE_TREATMENT,
    description: "Complete acne treatment that targets blemishes, reduces marks, and prevents recurrence. Suitable for sensitive skin.",
    ingredients: ["Niacinamide", "Salicylic Acid", "Piroctone Olamine", "Thermal Spring Water"],
    usage: "Apply to entire face morning and evening after cleansing.",
    warnings: ["Non-comedogenic", "Tested on acne-prone skin", "May cause mild dryness initially"],
    inStock: true,
    rating: 4.6,
    reviewCount: 892
  },
  {
    id: "19",
    name: "Eucerin Advanced Repair Cream",
    slug: "eucerin-repair-cream",
    image: imageAssets.pic19,
    discount: 10,
    price: 2299,
    oldPrice: 2549,
    category: PRODUCT_CATEGORIES.MOISTURIZERS,
    description: "Intensive moisturizing cream that repairs very dry, flaky skin. Provides 48-hour hydration.",
    ingredients: ["Ceramide-3", "Natural Moisturizing Factors", "Gluco-Glycerol"],
    usage: "Apply daily to dry areas of body. Use as often as needed.",
    warnings: ["Fragrance-free", "Non-greasy formula", "Clinically proven"],
    inStock: true,
    rating: 4.7,
    reviewCount: 534
  },
  {
    id: "20",
    name: "Olay Regenerist Retinol 24 Night Moisturizer",
    slug: "olay-retinol-night-cream",
    image: imageAssets.pic20,
    discount: 8,
    price: 2599,
    oldPrice: 2799,
    category: PRODUCT_CATEGORIES.ANTI_AGING,
    description: "Retinol-infused night cream that visibly improves fine lines, wrinkles, smoothness, and dark spots in 28 days.",
    ingredients: ["Retinol", "Niacinamide (Vitamin B3)", "Peptides", "Vitamin E"],
    usage: "Apply to face and neck nightly after cleansing. Follow with SPF in morning.",
    warnings: ["Fragrance-free", "May increase sun sensitivity", "Start gradually"],
    inStock: true,
    rating: 4.5,
    reviewCount: 723
  },
  {
    id: "21",
    name: "Aveeno Daily Moisturizing Lotion",
    slug: "aveeno-moisturizing-lotion",
    image: imageAssets.pic21,
    discount: 10,
    price: 1299,
    oldPrice: 1449,
    category: PRODUCT_CATEGORIES.MOISTURIZERS,
    description: "Nourishing lotion with colloidal oatmeal that relieves dry skin and provides 24-hour moisture.",
    ingredients: ["Colloidal Oatmeal", "Glycerin", "Dimethicone", "Petrolatum"],
    usage: "Apply daily to body, especially after showering. Gentle enough for daily use.",
    warnings: ["Fragrance-free", "Non-comedogenic", "Suitable for sensitive skin"],
    inStock: true,
    rating: 4.6,
    reviewCount: 1089
  },
  {
    id: "22",
    name: "Aquaphor Healing Ointment",
    slug: "aquaphor-healing-ointment",
    image: imageAssets.pic22,
    discount: 10,
    price: 999,
    oldPrice: 1099,
    category: PRODUCT_CATEGORIES.SPECIALTY_TREATMENTS,
    description: "Multi-purpose ointment that creates a protective barrier to enhance healing of dry, cracked, or irritated skin.",
    ingredients: ["Petrolatum 41%", "Mineral Oil", "Ceresin", "Lanolin Alcohol"],
    usage: "Apply to affected areas as needed. Ideal for lips, hands, heels, and minor wounds.",
    warnings: ["For external use only", "Non-comedogenic on body", "May be heavy for facial use"],
    inStock: true,
    rating: 4.7,
    reviewCount: 967
  },
  {
    id: "23",
    name: "Niacinamide Serum 10% + Zinc 1%",
    slug: "niacinamide-zinc-serum",
    image: imageAssets.pic23,
    discount: 10,
    price: 999,
    oldPrice: 1149,
    category: PRODUCT_CATEGORIES.SERUMS,
    description: "High-strength serum that reduces blemishes, balances oil production, and visibly minimizes pores.",
    ingredients: ["Niacinamide 10%", "Zinc PCA 1%", "Tasmanian Pepperberry"],
    usage: "Apply to face morning and evening before moisturizer. Avoid use with Vitamin C.",
    warnings: ["May cause flushing initially", "Patch test recommended", "Vegan formula"],
    inStock: true,
    rating: 4.5,
    reviewCount: 1456
  },
  {
    id: "24",
    name: "Salicylic Acid 2% Toner (BHA Exfoliant)",
    slug: "salicylic-acid-toner",
    image: imageAssets.pic24,
    discount: 12,
    price: 1199,
    oldPrice: 1349,
    category: PRODUCT_CATEGORIES.CLEANSERS,
    description: "Exfoliating toner that penetrates pores to remove dead skin cells, reduce blackheads, and refine skin texture.",
    ingredients: ["Salicylic Acid 2%", "Witch Hazel", "Niacinamide", "Allantoin"],
    usage: "Apply with cotton pad to cleansed skin once daily, gradually increase to twice daily.",
    warnings: ["Increase sun sensitivity", "Start slowly", "Avoid over-exfoliation"],
    inStock: true,
    rating: 4.6,
    reviewCount: 834
  },
  {
    id: "25",
    name: "PanOxyl Acne Foaming Wash 10% Benzoyl Peroxide",
    slug: "panoxyl-foaming-wash",
    image: imageAssets.pic25,
    discount: 10,
    price: 1499,
    oldPrice: 1699,
    category: PRODUCT_CATEGORIES.CLEANSERS,
    description: "Maximum strength acne wash that kills bacteria, clears existing breakouts, and prevents new blemishes.",
    ingredients: ["Benzoyl Peroxide 10%", "Carbomer Homopolymer", "Docusate Sodium"],
    usage: "Wet face, apply and massage gently for 1-2 minutes, rinse thoroughly. Use 1-2 times daily.",
    warnings: ["May bleach fabrics", "Start with lower strength", "Use sunscreen"],
    inStock: true,
    rating: 4.7,
    reviewCount: 612
  }
] as const;

// ===============================================================
// Core Utility Functions (Business Logic - DRY)
// ===============================================================

/**
 * Get a single product by its slug (Used by Details.tsx)
 */
export const getProductBySlug = (slug: string): SkinProduct | undefined => {
  return skinProducts.find(product => product.slug === slug);
};

/**
 * Get related products based on category (Used by Details.tsx)
 * Ensures related products are available and not the current product.
 */
export const getRelatedProducts = (
  productSlug: string, 
  limit: number = 4
): SkinProduct[] => {
  const product = getProductBySlug(productSlug); 
  if (!product) return [];
  
  // Filter by category, exclude the current product, and ensure it's in stock
  return skinProducts
    .filter(p => 
      p.category === product.category && 
      p.slug !== productSlug && 
      p.inStock
    )
    .slice(0, limit);
};

/**
 * Search products by name, description, or ingredients (Used by Skin.tsx)
 */
export const searchProducts = (query: string): SkinProduct[] => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [...skinProducts]; // Return a copy of all products if query is empty
  
  return skinProducts.filter(p => 
    p.name.toLowerCase().includes(normalizedQuery) || 
    p.description.toLowerCase().includes(normalizedQuery) ||
    // Safe check for ingredients array
    p.ingredients?.some(i => i.toLowerCase().includes(normalizedQuery))
  );
};

/**
 * Sort products based on specified criteria (Used by Skin.tsx)
 */
export const sortProducts = (
  products: readonly SkinProduct[], 
  sortBy: SortOption
): SkinProduct[] => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        // Use 0 if rating is undefined, ensuring b comes before a for descending sort
        return (b.rating ?? 0) - (a.rating ?? 0); 
      case "discount":
        return b.discount - a.discount;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });
};

// ===============================================================
// Formatters (DRY)
// ===============================================================

/**
 * Format price in Kenyan Shillings (Used by Skin.tsx and Details.tsx)
 */
export const formatPrice = (price: number): string => {
  // Use "en-KE" for Kenyan Shillings format
  return `KSh ${price.toLocaleString("en-KE", { minimumFractionDigits: 0 })}`; 
};

/**
 * Calculate savings between old and new price (Used by Details.tsx)
 */
export const calculateSavings = (oldPrice: number, newPrice: number): number => {
  return Math.max(0, oldPrice - newPrice);
};

/**
 * Calculate discount percentage
 */
export const calculateDiscountPercentage = (oldPrice: number, newPrice: number): number => {
  if (oldPrice <= 0) return 0;
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
};

// ===============================================================
// Cart Utilities (Complete Model)
// ===============================================================

/**
 * Convert SkinProduct to CartItem (For cart logic outside the Model)
 */
export const productToCartItem = (product: SkinProduct, quantity: number = 1): CartItem => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity
  };
};

/**
 * Calculate cart total
 */
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Calculate cart item count
 */
export const calculateCartItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};