
// ===============================================================
// ✅ OffersData.ts — Central Source of Truth for Product Data
// MVC Pattern | DRY Principle | Type-Safe Data Management
// ===============================================================

// ===============================================================
// 📦 Type Definitions
// ===============================================================



// === Import images ===
import pic1 from "../assets/products/Durex-Fetherlite-Condoms.png";
import pic2 from "../assets/products/Always-Ultra-Thin-Pads-8s.png";
import pic3 from "../assets/products/Swift-Pregnancy-Test-Kit.png";
import pic4 from "../assets/products/Panadol-Extra-10s.png";
import pic5 from "../assets/products/Strepsils-Lozenges-24s.png";
import pic6 from "../assets/products/E45 Moisturizing-Cream-100g.png";
import pic7 from "../assets/products/Dettol-hand-sanitizer-50ml.png";
import pic8 from "../assets/products/Gaviscon-peppermint-liquid-200ml.png";


/**
 * Base product interface for listing views
 */
export interface ProductListing {
  id: string | number;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  isTrending: boolean;
  inStock: boolean;
  stockCount: number;
}

/**
 * Extended product interface for detail views
 */
export interface ProductDetails extends ProductListing {
  longDescription?: string;
  ingredients?: string[];
  usage?: string[];
  warnings?: string[];
  rating: number;
  reviewCount: number;
  slug?: string;
}

/**
 * Cart item interface
 */
export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// ===============================================================
// 🗂️ Product Database
// ===============================================================

const PRODUCTS: ProductDetails[] = [
  {
    id: "1",
    name: "Panadol Extra 10s",
    description: "Fast relief for headaches and fever",
    longDescription: "Panadol Extra provides effective relief from pain and fever. Contains paracetamol and caffeine for enhanced pain relief. Suitable for headaches, migraines, muscle pain, and fever.",
    brand: "GSK",
    category: "Pain Relief",
    price: 250.00,
    image: pic1,
    isTrending: true,
    inStock: true,
    stockCount: 45,
    rating: 4.5,
    reviewCount: 128,
    slug: "panadol-extra-10s",
    ingredients: [
      "Paracetamol 500mg",
      "Caffeine 65mg",
      "Excipients q.s"
    ],
    usage: [
      "Adults and children over 12 years: Take 1-2 tablets every 4-6 hours",
      "Do not exceed 8 tablets in 24 hours",
      "Take with water, preferably after meals"
    ],
    warnings: [
      "Do not use if allergic to paracetamol or caffeine",
      "Consult doctor if pregnant or breastfeeding",
      "Keep out of reach of children",
      "Do not exceed recommended dosage"
    ]
  },
  {
    id: "2",
    name: "Colgate MaxFresh",
    description: "Refreshing breath & cavity protection",
    longDescription: "Colgate MaxFresh toothpaste provides long-lasting fresh breath with cooling crystals. Advanced formula fights cavities and strengthens enamel while leaving your mouth feeling clean and refreshed.",
    brand: "Colgate",
    category: "Oral Care",
    price: 180.00,
    image: pic2,
    isTrending: true,
    inStock: true,
    stockCount: 67,
    rating: 4.7,
    reviewCount: 234,
    slug: "colgate-maxfresh",
    ingredients: [
      "Sodium Fluoride 0.32%",
      "Cooling Crystals",
      "Calcium Carbonate",
      "Aqua, Sorbitol, Glycerin"
    ],
    usage: [
      "Brush thoroughly at least twice a day",
      "Use a pea-sized amount on your toothbrush",
      "Brush for at least 2 minutes",
      "Rinse well after brushing"
    ],
    warnings: [
      "Not suitable for children under 6 years",
      "Do not swallow",
      "If irritation occurs, discontinue use",
      "Keep out of reach of children"
    ]
  },
  {
    id: "3",
    name: "Dettol Hand Sanitizer 50ml",
    description: "Kills 99.9% of germs instantly",
    longDescription: "Dettol Instant Hand Sanitizer provides trusted protection against germs. The advanced formula kills 99.9% of germs without water. Perfect for on-the-go protection with a refreshing fragrance.",
    brand: "Dettol",
    category: "Hygiene",
    price: 150.00,
    image: pic3,
    isTrending: false,
    inStock: true,
    stockCount: 89,
    rating: 4.6,
    reviewCount: 456,
    slug: "dettol-hand-sanitizer-50ml",
    ingredients: [
      "Ethyl Alcohol 70% v/v",
      "Glycerin",
      "Propylene Glycol",
      "Fragrance"
    ],
    usage: [
      "Apply a coin-sized amount to palm",
      "Rub hands together covering all surfaces",
      "Continue rubbing until hands are dry",
      "Use when soap and water are not available"
    ],
    warnings: [
      "For external use only",
      "Flammable - keep away from fire",
      "Avoid contact with eyes",
      "Keep out of reach of children"
    ]
  },
  {
    id: "4",
    name: "Always Ultra Night 7s",
    description: "Maximum overnight protection",
    longDescription: "Always Ultra Night pads provide superior overnight protection with InstaDry technology. Features LeakGuard core and flexible design for comfortable, worry-free sleep.",
    brand: "Always",
    category: "Feminine Care",
    price: 320.00,
    image: pic4,
    isTrending: true,
    inStock: true,
    stockCount: 34,
    rating: 4.8,
    reviewCount: 312,
    slug: "always-ultra-night-7s",
    ingredients: [
      "Super absorbent polymer",
      "Cotton-like top sheet",
      "Adhesive strips",
      "Breathable back sheet"
    ],
    usage: [
      "Remove pad from wrapper",
      "Peel off adhesive backing",
      "Place in center of underwear",
      "Change every 4-8 hours or as needed"
    ],
    warnings: [
      "Change regularly to maintain freshness",
      "Dispose of properly - do not flush",
      "If irritation occurs, discontinue use",
      "Keep in a cool, dry place"
    ]
  },
  {
    id: "5",
    name: "Vaseline Petroleum Jelly 50g",
    description: "Triple-purified for skin protection",
    longDescription: "Vaseline Petroleum Jelly is a versatile skin protectant that locks in moisture. Triple-purified formula helps heal dry skin, protect minor cuts, and soothe chapped lips.",
    brand: "Vaseline",
    category: "Skincare",
    price: 130.00,
    image: pic5,
    isTrending: false,
    inStock: true,
    stockCount: 112,
    rating: 4.9,
    reviewCount: 523,
    slug: "vaseline-petroleum-jelly-50g",
    ingredients: [
      "100% Pure Petroleum Jelly",
      "Triple-purified formula"
    ],
    usage: [
      "Apply a small amount to affected area",
      "Use as often as needed",
      "Can be used on face, body, hands, and lips",
      "Safe for all ages including babies"
    ],
    warnings: [
      "For external use only",
      "If irritation occurs, discontinue use",
      "Keep container tightly closed",
      "Store at room temperature"
    ]
  },
  {
    id: "6",
    name: "Johnson's Baby Powder 200g",
    description: "Gentle protection for delicate skin",
    longDescription: "Johnson's Baby Powder keeps skin soft, fresh, and comfortable. Clinically proven to be gentle on delicate skin. Absorbs excess moisture to help prevent chafing and rashes.",
    brand: "Johnson's",
    category: "Baby Care",
    price: 280.00,
    image: pic6,
    isTrending: false,
    inStock: true,
    stockCount: 56,
    rating: 4.4,
    reviewCount: 189,
    slug: "johnsons-baby-powder-200g",
    ingredients: [
      "Cornstarch",
      "Fragrance",
      "Aloe Barbadensis Leaf Juice"
    ],
    usage: [
      "Shake powder into hand away from face",
      "Close container before use",
      "Apply to clean, dry skin",
      "Use sparingly and avoid creating dust clouds"
    ],
    warnings: [
      "Keep powder away from child's face to avoid inhalation",
      "Store in a cool, dry place",
      "Keep out of reach of children",
      "Close container after each use"
    ]
  },
  {
    id: "7",
    name: "Nivea Soft Cream 100ml",
    description: "Moisturizing cream for face & body",
    longDescription: "Nivea Soft is a light moisturizing cream enriched with Jojoba Oil and Vitamin E. Fast-absorbing formula provides 24-hour moisture for soft, supple skin. Suitable for face, hands, and body.",
    brand: "Nivea",
    category: "Skincare",
    price: 350.00,
    image: pic7,
    isTrending: true,
    inStock: true,
    stockCount: 41,
    rating: 4.7,
    reviewCount: 278,
    slug: "nivea-soft-cream-100ml",
    ingredients: [
      "Aqua, Glycerin",
      "Jojoba Oil",
      "Vitamin E",
      "Dimethicone"
    ],
    usage: [
      "Apply to clean skin as needed",
      "Massage gently until absorbed",
      "Use daily for best results",
      "Suitable for all skin types"
    ],
    warnings: [
      "For external use only",
      "Avoid contact with eyes",
      "If irritation occurs, discontinue use",
      "Store in a cool place"
    ]
  },
  {
    id: "8",
    name: "Oral-B Essential Floss 50m",
    description: "Shred-resistant dental floss",
    longDescription: "Oral-B Essential Floss helps remove plaque and food particles between teeth. Shred-resistant design glides easily, even between tight teeth. Fresh mint flavor for clean breath.",
    brand: "Oral-B",
    category: "Oral Care",
    price: 220.00,
    image: pic8,
    isTrending: false,
    inStock: true,
    stockCount: 73,
    rating: 4.5,
    reviewCount: 167,
    slug: "oral-b-essential-floss-50m",
    ingredients: [
      "Waxed nylon fiber",
      "Mint flavoring",
      "Fluoride coating"
    ],
    usage: [
      "Break off about 45cm of floss",
      "Wind around middle fingers",
      "Gently slide between teeth using a back-and-forth motion",
      "Use daily, preferably before brushing"
    ],
    warnings: [
      "Use gently to avoid gum damage",
      "Supervise children until proper technique is learned",
      "If bleeding persists, consult dentist",
      "Keep out of reach of young children"
    ]
  }
];

// ===============================================================
// 🎯 Configuration Constants
// ===============================================================

const CONFIG = {
  RELATED_PRODUCTS_COUNT: 4,
  URL_BASE_PATH: "/offers",
  DEFAULT_CURRENCY: "KES",
  LOW_STOCK_THRESHOLD: 10,
} as const;

// ===============================================================
// 🛠️ Utility Functions (Data Controller)
// ===============================================================

export class OffersDataUtils {
  /**
   * Get all products for listing page
   */
  static getListingProducts(): ProductListing[] {
    return PRODUCTS.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category,
      price: product.price,
      image: product.image,
      isTrending: product.isTrending,
      inStock: product.inStock,
      stockCount: product.stockCount,
    }));
  }

  /**
   * Get full product details by ID
   */
  static getProductById(id: string | number): ProductDetails | null {
    return PRODUCTS.find(p => String(p.id) === String(id)) || null;
  }

  /**
   * Generate SEO-friendly URL slug from product name
   */
  static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /**
   * Get product URL with slug and ID format
   * Example: /offers/panadol-extra-10s-1
   */
  static getProductURL(id: string | number): string {
    const product = this.getProductById(id);
    if (!product) {
      console.error(`Product with ID ${id} not found`);
      return CONFIG.URL_BASE_PATH;
    }
    
    const slug = product.slug || this.generateSlug(product.name);
    return `${CONFIG.URL_BASE_PATH}/${slug}-${id}`;
  }

  /**
   * Extract product ID from URL slug-and-id format
   * Example: "panadol-extra-10s-1" → "1"
   */
  static extractIdFromSlug(slugAndId: string): string | null {
    const parts = slugAndId.split("-");
    const id = parts[parts.length - 1];
    return id || null;
  }

  /**
   * Get related products based on category (excluding current product)
   */
  static getRelatedProducts(
    currentId: string | number,
    category: string,
    limit: number = CONFIG.RELATED_PRODUCTS_COUNT
  ): ProductListing[] {
    return PRODUCTS
      .filter(p => p.category === category && String(p.id) !== String(currentId))
      .slice(0, limit)
      .map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        brand: product.brand,
        category: product.category,
        price: product.price,
        image: product.image,
        isTrending: product.isTrending,
        inStock: product.inStock,
        stockCount: product.stockCount,
      }));
  }

  /**
   * Get products by category
   */
  static getProductsByCategory(category: string): ProductListing[] {
    return PRODUCTS
      .filter(p => p.category === category)
      .map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        brand: product.brand,
        category: product.category,
        price: product.price,
        image: product.image,
        isTrending: product.isTrending,
        inStock: product.inStock,
        stockCount: product.stockCount,
      }));
  }

  /**
   * Get all trending products
   */
  static getTrendingProducts(): ProductListing[] {
    return PRODUCTS
      .filter(p => p.isTrending)
      .map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        brand: product.brand,
        category: product.category,
        price: product.price,
        image: product.image,
        isTrending: product.isTrending,
        inStock: product.inStock,
        stockCount: product.stockCount,
      }));
  }

  /**
   * Get all unique categories
   */
  static getCategories(): string[] {
    const categories = new Set(PRODUCTS.map(p => p.category));
    return Array.from(categories).sort();
  }

  /**
   * Get all unique brands
   */
  static getBrands(): string[] {
    const brands = new Set(PRODUCTS.map(p => p.brand));
    return Array.from(brands).sort();
  }

  /**
   * Search products by query (name, brand, or description)
   */
  static searchProducts(query: string): ProductListing[] {
    const lowerQuery = query.toLowerCase();
    return PRODUCTS
      .filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      )
      .map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        brand: product.brand,
        category: product.category,
        price: product.price,
        image: product.image,
        isTrending: product.isTrending,
        inStock: product.inStock,
        stockCount: product.stockCount,
      }));
  }

  /**
   * Filter products by price range
   */
  static filterByPriceRange(
    minPrice: number,
    maxPrice: number
  ): ProductListing[] {
    return PRODUCTS
      .filter(p => p.price >= minPrice && p.price <= maxPrice)
      .map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        brand: product.brand,
        category: product.category,
        price: product.price,
        image: product.image,
        isTrending: product.isTrending,
        inStock: product.inStock,
        stockCount: product.stockCount,
      }));
  }

  /**
   * Sort products by specified criteria
   */
  static sortProducts(
    products: ProductListing[],
    sortBy: "price-asc" | "price-desc" | "name" | "rating" | "trending"
  ): ProductListing[] {
    const sorted = [...products];
    
    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "trending":
        return sorted.sort((a, b) => 
          Number(b.isTrending) - Number(a.isTrending)
        );
      default:
        return sorted;
    }
  }

  /**
   * Check if product is low in stock
   */
  static isLowStock(stockCount: number): boolean {
    return stockCount > 0 && stockCount <= CONFIG.LOW_STOCK_THRESHOLD;
  }

  /**
   * Format price with currency
   */
  static formatPrice(price: number): string {
    return `${CONFIG.DEFAULT_CURRENCY} ${price.toFixed(2)}`;
  }

  /**
   * Get product statistics
   */
  static getStatistics() {
    return {
      totalProducts: PRODUCTS.length,
      inStock: PRODUCTS.filter(p => p.inStock).length,
      outOfStock: PRODUCTS.filter(p => !p.inStock).length,
      trending: PRODUCTS.filter(p => p.isTrending).length,
      lowStock: PRODUCTS.filter(p => this.isLowStock(p.stockCount)).length,
      categories: this.getCategories().length,
      brands: this.getBrands().length,
      averagePrice: (
        PRODUCTS.reduce((sum, p) => sum + p.price, 0) / PRODUCTS.length
      ).toFixed(2),
    };
  }
}

// ===============================================================
// 📤 Default Export
// ===============================================================

export default {
  products: PRODUCTS,
  utils: OffersDataUtils,
  config: CONFIG,
};