// === Import images ===
import pic1 from "../assets/products/Allergy.png";
import pic2 from "../assets/products/Anthelios.png";
import pic3 from "../assets/products/Contraception.png";
import pic4 from "../assets/products/Cough.png";
import pic5 from "../assets/products/Headache.png";
import pic6 from "../assets/products/Eno.png";
import pic7 from "../assets/products/Diclofenac.png";
import pic8 from "../assets/products/UTI.png";
export interface Product {
  id: string;
  category: string;
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  availability: string;
  stock: number;
  group: string;
  delivery: string;
  pickup: string;
  paymentOptions: string[];
  description: string;
  fullDescription?: string;
  howToUse?: string;
  ingredients?: string[];
  similarProducts: string[];
}

// === Products Data (Medical/Pharmacy themed) ===
export const productsData: Product[] = [
  {
    id: "1",
    category: "Allergy Relief",
    title: "Allergy Relief Tablets",
    image: pic1,
    originalPrice: 490,
    discountedPrice: 350,
    discount: 12,
    availability: "In Stock",
    stock: 120,
    group: "Over-the-Counter Medicines",
    delivery: "Usually ready in 1-2 days",
    pickup: "Pickup available at Yallah Pharmacy Nairobi",
    paymentOptions: ["M-Pesa", "Cash", "Credit Card"],
    description: "Fast-acting antihistamine for allergy and hay fever relief.",
    fullDescription:
      "Provides quick relief from sneezing, runny nose, and itchy eyes. Suitable for adults and children over 6 years. Non-drowsy formula for daytime use.",
    howToUse: "Take one tablet daily or as directed by a healthcare provider.",
    ingredients: ["Cetirizine HCl 10mg", "Microcrystalline cellulose", "Lactose monohydrate"],
    similarProducts: ["2", "4", "5"],
  },
  {
    id: "2",
    category: "Skincare",
    title: "La Roche-Posay Effaclar Foaming Gel 200ml",
    image: pic2,
    originalPrice: 980,
    discountedPrice: 830,
    discount: 12,
    availability: "In Stock",
    stock: 65,
    group: "Dermatological Skincare",
    delivery: "Usually ready in 1-2 days",
    pickup: "Pickup available at Yallah Pharmacy Nairobi",
    paymentOptions: ["M-Pesa", "Credit Card", "Visa"],
    description: "Gentle purifying gel for oily and acne-prone skin.",
    fullDescription:
      "Formulated with zinc pidolate to remove impurities and excess sebum without drying the skin. Suitable for sensitive skin. Dermatologically tested and soap-free.",
    howToUse:
      "Apply on wet skin, lather, and rinse thoroughly. Use morning and evening for best results.",
    ingredients: ["Zinc pidolate", "Thermal spring water", "Glycerin"],
    similarProducts: ["1", "6", "8"],
  },
  {
    id: "3",
    category: "Women's Health",
    title: "Emergency Contraceptive Pills",
    image: pic3,
    originalPrice: 2035,
    discountedPrice: 1700,
    discount: 11,
    availability: "In Stock",
    stock: 85,
    group: "Reproductive Health",
    delivery: "Usually ready in 1 day",
    pickup: "Pickup available at Yallah Pharmacy Nairobi",
    paymentOptions: ["M-Pesa", "Cash", "Credit Card"],
    description:
      "Emergency contraception to prevent pregnancy after unprotected intercourse.",
    fullDescription:
      "Contains levonorgestrel 1.5mg, most effective when taken within 72 hours of unprotected intercourse. Does not affect future fertility. Not for regular contraceptive use.",
    howToUse:
      "Take one tablet as soon as possible after unprotected intercourse, preferably within 12 hours but no later than 72 hours.",
    ingredients: ["Levonorgestrel 1.5mg", "Colloidal silicon dioxide", "Maize starch"],
    similarProducts: ["2", "4", "7"],
  },
  {
    id: "4",
    category: "Cold & Flu",
    title: "Benyllin Cough Syrup 100ml",
    image: pic4,
    originalPrice: 1075,
    discountedPrice: 989,
    discount: 15,
    availability: "In Stock",
    stock: 150,
    group: "Cough & Cold Remedies",
    delivery: "Usually ready in 1-2 days",
    pickup: "Pickup available at Yallah Pharmacy Nairobi",
    paymentOptions: ["M-Pesa", "Cash", "Credit Card"],
    description: "Soothes coughs and relieves chest congestion.",
    fullDescription:
      "Provides fast relief from dry, tickly, or chesty coughs. Contains soothing agents to ease throat irritation. Suitable for adults and children over 6 years.",
    howToUse:
      "Adults and children over 12: 10ml every 6 hours. Children 6-12 years: 5ml every 6 hours. Do not exceed recommended dose.",
    ingredients: ["Dextromethorphan", "Guaifenesin", "Menthol"],
    similarProducts: ["1", "5", "8"],
  },
  {
    id: "5",
    category: "Pain Relief",
    title: "Paracetamol Headache Relief 500mg",
    image: pic5,
    originalPrice: 95,
    discountedPrice: 84,
    discount: 15,
    availability: "In Stock",
    stock: 500,
    group: "Pain & Fever Relief",
    delivery: "Ready for pickup in 1 hour",
    pickup: "Pickup available at Yallah Pharmacy Nairobi",
    paymentOptions: ["M-Pesa", "Cash"],
    description: "Effective pain and fever reducer for headaches and flu.",
    fullDescription:
      "Paracetamol provides quick, gentle, and effective relief for headaches, muscle aches, toothaches, and fever. Safe for most users when taken as directed.",
    howToUse:
      "Adults and children over 12: 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours. Children 6-12: Half tablet every 4-6 hours.",
    ingredients: ["Paracetamol 500mg", "Maize starch", "Povidone"],
    similarProducts: ["4", "7", "8"],
  },
  {
    id: "6",
    category: "Digestive Health",
    title: "ENO Antacid Relief Sachet 5g",
    image: pic6,
    originalPrice: 75,
    discountedPrice: 50,
    discount: 11,
    availability: "In Stock",
    stock: 400,
    group: "Digestive Care",
    delivery: "Usually ready in 1 day",
    pickup: "Pickup available at Yallah Pharmacy Nairobi",
    paymentOptions: ["M-Pesa", "Cash"],
    description: "Fast relief from acidity, indigestion, and heartburn.",
    fullDescription:
      "ENO neutralizes excess acid in the stomach, providing quick relief from bloating, discomfort, and acid reflux. Works in just 6 seconds.",
    howToUse:
      "Dissolve one sachet in a glass of water (150ml). Drink immediately for instant relief. Can be taken after meals or when needed.",
    ingredients: ["Sodium bicarbonate", "Citric acid", "Sodium carbonate"],
    similarProducts: ["2", "5", "7"],
  },
  {
    id: "7",
    category: "Pain & Inflammation",
    title: "Diclofenac Pain Relief Tablets 50mg",
    image: pic7,
    originalPrice: 175,
    discountedPrice: 159,
    discount: 15,
    availability: "In Stock",
    stock: 260,
    group: "Pain Management",
    delivery: "Usually ready in 1 day",
    pickup: "Pickup available at Yallah Pharmacy Nairobi",
    paymentOptions: ["M-Pesa", "Credit Card"],
    description:
      "Powerful anti-inflammatory for muscle, joint, and back pain relief.",
    fullDescription:
      "Diclofenac works by reducing substances in the body that cause inflammation and pain. Recommended for arthritis, muscle strain, and sports injuries. Prescription may be required.",
    howToUse:
      "Take 1 tablet every 8-12 hours after meals with plenty of water. Do not exceed 3 tablets in 24 hours unless prescribed by a doctor.",
    ingredients: ["Diclofenac sodium 50mg", "Lactose", "Microcrystalline cellulose"],
    similarProducts: ["5", "8", "1"],
  },
  {
    id: "8",
    category: "Urinary Health",
    title: "Cystex Painful Urination Relief Tablets",
    image: pic8,
    originalPrice: 305,
    discountedPrice: 214,
    discount: 15,
    availability: "In Stock",
    stock: 110,
    group: "Urinary Tract Health",
    delivery: "Usually ready in 1-2 days",
    pickup: "Pickup available at Yallah Pharmacy Nairobi",
    paymentOptions: ["M-Pesa", "Cash", "Credit Card"],
    description: "Relieves burning and discomfort from urinary tract infections.",
    fullDescription:
      "Provides antibacterial protection and pain relief for urinary tract discomfort. Helps prevent recurrent infections when used early. Contains cranberry extract for urinary tract health.",
    howToUse:
      "Take 2 tablets with water after meals, 3 times daily. Continue for at least 3 days or as directed by healthcare provider.",
    ingredients: ["Methenamine", "Sodium salicylate", "Cranberry extract"],
    similarProducts: ["1", "6", "7"],
  },
];

// === Helper Functions ===

/**
 * Get a single product by its ID
 * @param id - Product ID
 * @returns Product object or undefined if not found
 */
export const getProductById = (id: string): Product | undefined => {
  return productsData.find((product) => product.id === id);
};

/**
 * Get similar products based on a product's similarProducts array
 * @param productId - ID of the product to find similar items for
 * @param limit - Maximum number of similar products to return (optional)
 * @returns Array of similar Product objects
 */
export const getSimilarProducts = (productId: string, limit?: number): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  const similarProducts = product.similarProducts
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== undefined);
  
  return limit ? similarProducts.slice(0, limit) : similarProducts;
};

/**
 * Get products by category
 * @param category - Category name to filter by
 * @returns Array of products in the specified category
 */
export const getProductsByCategory = (category: string): Product[] => {
  return productsData.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
};

/**
 * Get all unique categories
 * @returns Array of unique category names
 */
export const getAllCategories = (): string[] => {
  return Array.from(new Set(productsData.map((product) => product.category)));
};

/**
 * Search products by title, description, or category
 * @param query - Search query string
 * @returns Array of matching products
 */
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return productsData.filter(
    (product) =>
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get products within a price range
 * @param minPrice - Minimum price (inclusive)
 * @param maxPrice - Maximum price (inclusive)
 * @returns Array of products within the price range
 */
export const getProductsByPriceRange = (
  minPrice: number,
  maxPrice: number
): Product[] => {
  return productsData.filter(
    (product) =>
      product.discountedPrice >= minPrice &&
      product.discountedPrice <= maxPrice
  );
};

/**
 * Get products that are in stock
 * @returns Array of in-stock products
 */
export const getInStockProducts = (): Product[] => {
  return productsData.filter((product) => product.stock > 0);
};

/**
 * Get featured products (highest discounts)
 * @param limit - Number of products to return
 * @returns Array of featured products sorted by discount
 */
export const getFeaturedProducts = (limit: number = 4): Product[] => {
  return [...productsData]
    .sort((a, b) => b.discount - a.discount)
    .slice(0, limit);
};

/**
 * Get products by group
 * @param group - Group name to filter by
 * @returns Array of products in the specified group
 */
export const getProductsByGroup = (group: string): Product[] => {
  return productsData.filter(
    (product) => product.group.toLowerCase() === group.toLowerCase()
  );
};

/**
 * Get all products
 * @returns Complete array of all products
 */
export const getAllProducts = (): Product[] => {
  return productsData;
};