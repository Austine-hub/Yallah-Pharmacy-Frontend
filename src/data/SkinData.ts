// ===============================================================
// ✅ SkinData.ts — Model/Data Layer (2025)
// Central source of truth for skincare products
// Harmony for SkinDetails.tsx, Shop.tsx, and other components
// ===============================================================

// ===============================================================
// Image Imports
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

// Placeholder imports for gallery images (needed for products with multiple views)
const pic11_side = "../assets/products/tretinoin-cream-side.png"; 
const pic11_texture = "../assets/products/tretinoin-cream-texture.png"; 
const pic17_back = "../assets/products/cerave-moisturizing-cream-back.png"; 


// ===============================================================
// TypeScript Interfaces
// ===============================================================

export interface SkinProduct {
    id: string;
    name: string;
    slug: string;
    image: string;
    gallery?: string[]; // <--- HARMONIZED: Added for multi-image support
    discount: number;
    price: number;
    oldPrice: number;
    category: ProductCategory;
    description: string;
    ingredients?: string[];
    usage?: string;
    warnings?: string[];
    inStock: boolean;
    rating?: number;
    reviewCount?: number;
}

export type ProductCategory =
    | "acne-treatment"
    | "anti-aging"
    | "moisturizers"
    | "serums"
    | "cleansers"
    | "topical-antibiotics"
    | "antifungal"
    | "anti-inflammatory"
    | "specialty-treatments";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

// ===============================================================
// Product Data
// ===============================================================

export const skinProducts: SkinProduct[] = [
    {
        id: "1",
        name: "Benzoyl Peroxide 5% Gel (Acne Treatment)",
        slug: "benzoyl-peroxide-gel",
        image: pic1,
        discount: 12,
        price: 899,
        oldPrice: 1020,
        category: "acne-treatment",
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
        image: pic2,
        discount: 10,
        price: 1199,
        oldPrice: 1349,
        category: "topical-antibiotics",
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
        image: pic3,
        discount: 12,
        price: 1499,
        oldPrice: 1699,
        category: "acne-treatment",
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
        image: pic4,
        discount: 8,
        price: 499,
        oldPrice: 549,
        category: "anti-inflammatory",
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
        image: pic5,
        discount: 10,
        price: 1249,
        oldPrice: 1399,
        category: "topical-antibiotics",
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
        image: pic6,
        discount: 10,
        price: 999,
        oldPrice: 1099,
        category: "antifungal",
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
        image: pic7,
        discount: 10,
        price: 599,
        oldPrice: 669,
        category: "antifungal",
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
        image: pic8,
        discount: 10,
        price: 899,
        oldPrice: 999,
        category: "antifungal",
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
        image: pic9,
        discount: 12,
        price: 1199,
        oldPrice: 1349,
        category: "specialty-treatments",
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
        image: pic10,
        discount: 12,
        price: 1799,
        oldPrice: 2049,
        category: "specialty-treatments",
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
        image: pic11,
        // Harmonized: Added gallery array
        gallery: [pic11, pic11_side, pic11_texture], 
        discount: 10,
        price: 1599,
        oldPrice: 1799,
        category: "anti-aging",
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
        image: pic12,
        discount: 10,
        price: 449,
        oldPrice: 499,
        category: "anti-inflammatory",
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
        image: pic13,
        discount: 10,
        price: 1199,
        oldPrice: 1349,
        category: "topical-antibiotics",
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
        image: pic14,
        discount: 10,
        price: 999,
        oldPrice: 1099,
        category: "topical-antibiotics",
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
        image: pic15,
        discount: 12,
        price: 1149,
        oldPrice: 1299,
        category: "topical-antibiotics",
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
        image: pic16,
        discount: 10,
        price: 1199,
        oldPrice: 1349,
        category: "topical-antibiotics",
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
        image: pic17,
        // Harmonized: Added gallery array
        gallery: [pic17, pic17_back], 
        discount: 10,
        price: 1999,
        oldPrice: 2199,
        category: "moisturizers",
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
        image: pic18,
        discount: 8,
        price: 2999,
        oldPrice: 3249,
        category: "acne-treatment",
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
        image: pic19,
        discount: 10,
        price: 2299,
        oldPrice: 2549,
        category: "moisturizers",
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
        image: pic20,
        discount: 8,
        price: 2599,
        oldPrice: 2799,
        category: "anti-aging",
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
        image: pic21,
        discount: 10,
        price: 1299,
        oldPrice: 1449,
        category: "moisturizers",
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
        image: pic22,
        discount: 10,
        price: 999,
        oldPrice: 1099,
        category: "specialty-treatments",
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
        image: pic23,
        discount: 10,
        price: 999,
        oldPrice: 1149,
        category: "serums",
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
        image: pic24,
        discount: 12,
        price: 1199,
        oldPrice: 1349,
        category: "cleansers",
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
        image: pic25,
        discount: 10,
        price: 1499,
        oldPrice: 1699,
        category: "cleansers",
        description: "Maximum strength acne wash that kills bacteria, clears existing breakouts, and prevents new blemishes.",
        ingredients: ["Benzoyl Peroxide 10%", "Carbomer Homopolymer", "Docusate Sodium"],
        usage: "Wet face, apply and massage gently for 1-2 minutes, rinse thoroughly. Use 1-2 times daily.",
        warnings: ["May bleach fabrics", "Start with lower strength", "Use sunscreen"],
        inStock: true,
        rating: 4.7,
        reviewCount: 612
    }
];

// ===============================================================
// Utility Functions (Data Layer Helpers)
// ===============================================================

/**
 * Format price in Kenyan Shilling format
 */
export const formatPrice = (price: number): string => {
    return `KSh ${price.toLocaleString('en-KE')}`;
};

/**
 * Calculate savings amount
 */
export const calculateSavings = (oldPrice: number, newPrice: number): number => {
    return oldPrice - newPrice;
};

/**
 * Calculate discount percentage
 */
export const calculateDiscountPercentage = (oldPrice: number, newPrice: number): number => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
};

/**
 * Get product by ID
 */
export const getProductById = (id: string): SkinProduct | undefined => {
    return skinProducts.find(product => product.id === id);
};

/**
 * Get product by slug (for SEO-friendly URLs and SkinDetails/ShopDetails)
 */
export const getProductBySlug = (slug: string): SkinProduct | undefined => {
    return skinProducts.find(product => product.slug === slug);
};

/**
 * Filter products by category
 */
export const getProductsByCategory = (category: ProductCategory): SkinProduct[] => {
    return skinProducts.filter(product => product.category === category);
};

/**
 * Filter products by price range
 */
export const getProductsByPriceRange = (minPrice: number, maxPrice: number): SkinProduct[] => {
    return skinProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
};

/**
 * Get products on sale (with discount)
 */
export const getProductsOnSale = (): SkinProduct[] => {
    return skinProducts.filter(product => product.discount > 0);
};

/**
 * Get featured products (highest rated, in stock)
 */
export const getFeaturedProducts = (limit: number = 8): SkinProduct[] => {
    return skinProducts
        .filter(product => product.inStock && product.rating && product.rating >= 4.5)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, limit);
};

/**
 * Search products by name or description
 */
export const searchProducts = (query: string): SkinProduct[] => {
    const lowercaseQuery = query.toLowerCase();
    return skinProducts.filter(product =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery)
    );
};

/**
 * Sort products by various criteria
 */
export const sortProducts = (
    products: SkinProduct[],
    sortBy: 'price-asc' | 'price-desc' | 'name' | 'rating' | 'discount'
): SkinProduct[] => {
    const sorted = [...products];
    
    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'rating':
            return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        case 'discount':
            return sorted.sort((a, b) => b.discount - a.discount);
        default:
            return sorted;
    }
};

/**
 * Get related products (same category, excluding current product)
 */
export const getRelatedProducts = (productId: string, limit: number = 4): SkinProduct[] => {
    // Note: This utility uses ID, but should ideally be updated to accept and use slug 
    // for consistency if your routing relies solely on slugs.
    const product = getProductById(productId); 
    if (!product) return [];
    
    return skinProducts
        .filter(p => p.category === product.category && p.id !== productId && p.inStock)
        .slice(0, limit);
};

/**
 * Check if product is in stock
 */
export const isProductInStock = (productId: string): boolean => {
    const product = getProductById(productId);
    return product?.inStock ?? false;
};

/**
 * Get stock status message
 */
export const getStockStatus = (productId: string): string => {
    return isProductInStock(productId) ? 'In Stock' : 'Out of Stock';
};

/**
 * Validate product exists
 */
export const productExists = (productId: string): boolean => {
    return !!getProductById(productId);
};