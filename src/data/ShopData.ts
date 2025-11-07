// src/data/ShopData.ts

// 🖼️ Import product images
import pic1 from "../assets/shop2/Personal & Lifestyle Section/2025-1oothpaste & Oral Care.png";
import pic2 from "../assets/shop2/Personal & Lifestyle Section/Skincare.png";
import pic3 from "../assets/shop2/Personal & Lifestyle Section/Pain Relievers & First Aid.png";
import pic4 from "../assets/shop2/Personal & Lifestyle Section/Cold & Flu Remedies.png";
import pic5 from "../assets/shop2/Personal/Emergency pills.png";
import pic6 from "../assets/shop2/General/Calm.png";
import pic7 from "../assets/shop2/General/Contraceptives.png";
import pic8 from "../assets/shop2/Personal/Antifungal.png";
import pic9 from "../assets/shop2/Personal/Pessary.png";
import pic10 from "../assets/shop2/Personal/Pegnancy test kits.png";
import pic11 from "../assets/shop2/General/Multivitamins.png";
import pic12 from "../assets/shop2/General/Iron & Folic Acid Supplements.png";
import pic13 from "../assets/shop2/General/Vitamin C & Zinc.png";
import pic14 from "../assets/shop2/General/Rehydration Solutions.png";



/* =====================================================
    🧩 Model: Product Interface (Data Structure)
===================================================== */
export interface Product {
  id: string;
  title: string;
  image: string;
  category: string;
  group: string;
  description: string;
  fullDescription?: string;
  howToUse?: string;
  ingredients?: string[];
  delivery: string;
  pickup: string;
  paymentOptions: string[];
  stock: number;
  availability: string;
  price: number; // for Shop listing
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

/* =====================================================
    🧾 Model: Product Data (Source of Truth)
===================================================== */
const productsData: Product[] = [
  {
    id: "1",
    title: "Oral Care Pack",
    image: pic1,
    category: "Toothpaste & Oral Care",
    group: "Personal & Lifestyle",
    description: "A complete oral hygiene kit that promotes healthy gums and fresh breath.",
    fullDescription: "Includes toothpaste, toothbrush, and mouthwash for daily oral care. Recommended by dentists for complete protection.",
    howToUse: "Brush twice daily and rinse with mouthwash after meals.",
    ingredients: ["Fluoride", "Menthol", "Sodium Lauryl Sulfate"],
    delivery: "Same-day delivery available in Nairobi.",
    pickup: "Available at all pharmacy branches.",
    paymentOptions: ["M-Pesa", "Credit/Debit Card", "Cash on Delivery"],
    stock: 12,
    availability: "In Stock",
    price: 1395,
    originalPrice: 1395,
    discountedPrice: 1395,
    discount: 0,
  },
  {
    id: "2",
    title: "Skincare Essentials",
    image: pic2,
    category: "Skin and Beauty",
    group: "Personal & Lifestyle",
    description: "Nourish your skin with this hydrating skincare pack.",
    fullDescription: "Includes a cleanser, moisturizer, and sunscreen for radiant skin. Dermatologist approved.",
    howToUse: "Apply morning and night after cleansing.",
    ingredients: ["Vitamin E", "Aloe Vera", "Niacinamide"],
    delivery: "Available for next-day delivery.",
    pickup: "Collect at selected outlets.",
    paymentOptions: ["M-Pesa", "Card", "Cash on Delivery"],
    stock: 10,
    availability: "In Stock",
    price: 2747,
    originalPrice: 2747,
    discountedPrice: 2747,
    discount: 0,
  },
  {
    id: "3",
    title: "Pain Relievers & First Aid",
    image: pic3,
    category: "Pain Medications",
    group: "Personal & Lifestyle",
    description: "Essential first aid and pain relief products for home and travel.",
    fullDescription: "Includes paracetamol, antiseptic cream, and bandages for quick relief and wound care.",
    ingredients: ["Paracetamol", "Benzalkonium Chloride"],
    delivery: "Delivered within 24 hours.",
    pickup: "In-store pickup available.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 18,
    availability: "In Stock",
    price: 1714,
    originalPrice: 1714,
    discountedPrice: 1714,
    discount: 0,
  },
  {
    id: "4",
    title: "Cold & Flu Remedies",
    image: pic4,
    category: "Respiratory Drugs",
    group: "Personal & Lifestyle",
    description: "Fast-acting cold and flu relief for quick recovery.",
    fullDescription: "Helps relieve congestion, sore throat, and headaches. Suitable for adults and children above 12 years.",
    howToUse: "Take one dose every 6–8 hours as needed.",
    ingredients: ["Paracetamol", "Phenylephrine", "Vitamin C"],
    delivery: "Express delivery available.",
    pickup: "Available in-store.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 22,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "5",
    title: "Pregnancy Test Kits",
    image: pic10,
    category: "Discreet / Private Purchase Shelf",
    group: "Private Care",
    description: "Accurate and easy-to-use pregnancy test kits.",
    fullDescription: "Over 99% accurate, results in under 5 minutes. Pack includes two test strips.",
    howToUse: "Dip test in urine sample for 10 seconds and wait for 3 minutes.",
    delivery: "Private and discreet packaging.",
    pickup: "Discreet pickup available.",
    paymentOptions: ["M-Pesa"],
    stock: 20,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "6",
    title: "Vaginal Pessaries",
    image: pic9,
    category: "Discreet / Private Purchase Shelf",
    group: "Private Care",
    description: "Effective relief for vaginal infections.",
    howToUse: "Insert one pessary daily at bedtime for 3–7 days.",
    ingredients: ["Clotrimazole"],
    delivery: "Discreet delivery option available.",
    pickup: "Private collection counter.",
    paymentOptions: ["M-Pesa"],
    stock: 15,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "7",
    title: "Emergency Contraceptive Pills",
    image: pic5,
    category: "Discreet / Private Purchase Shelf",
    group: "Private Care",
    description: "Safe and effective emergency contraception within 72 hours.",
    fullDescription: "Each pack contains one tablet for emergency contraception. Use only as directed by a pharmacist.",
    howToUse: "Take one tablet within 72 hours of unprotected intercourse.",
    delivery: "Private delivery guaranteed.",
    pickup: "Available in private shelf section.",
    paymentOptions: ["M-Pesa"],
    stock: 25,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "8",
    title: "Contraceptives",
    image: pic7,
    category: "Discreet / Private Purchase Shelf",
    group: "Private Care",
    description: "Trusted contraceptive options for responsible planning.",
    delivery: "Confidential delivery available.",
    pickup: "Private counter collection.",
    paymentOptions: ["M-Pesa"],
    stock: 30,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "9",
    title: "Sleep/Stress Relief",
    image: pic6,
    category: "General Wellness & Support",
    group: "Wellness",
    description: "Calming supplements to promote relaxation and better sleep.",
    ingredients: ["Melatonin", "Magnesium", "L-Theanine"],
    delivery: "Home delivery in 24 hours.",
    pickup: "Available in-store.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 17,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "10",
    title: "Antifungal Creams",
    image: pic8,
    category: "Skin Treatment",
    group: "Dermatology",
    description: "Topical antifungal creams for quick relief from fungal infections.",
    ingredients: ["Clotrimazole", "Ketoconazole"],
    delivery: "Next-day delivery available.",
    pickup: "All branches.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 19,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "11",
    title: "Multivitamins",
    image: pic11,
    category: "General Wellness",
    group: "Supplements",
    description: "Boost overall health and immunity with daily multivitamins.",
    ingredients: ["Vitamin A", "B Complex", "Zinc"],
    delivery: "Fast delivery available.",
    pickup: "Available nationwide.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 30,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "12",
    title: "Iron & Folic Acid Supplements",
    image: pic12,
    category: "General Wellness",
    group: "Supplements",
    description: "Essential supplement for anemia and pregnancy support.",
    ingredients: ["Iron", "Folic Acid"],
    delivery: "Same-day delivery available.",
    pickup: "All outlets.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 24,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "13",
    title: "Vitamin C & Zinc",
    image: pic13,
    category: "General Wellness",
    group: "Supplements",
    description: "Boost immunity and recovery with Vitamin C and Zinc tablets.",
    ingredients: ["Vitamin C", "Zinc"],
    delivery: "Available for same-day delivery.",
    pickup: "In all branches.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 16,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
  {
    id: "14",
    title: "Rehydration Solutions",
    image: pic14,
    category: "General Wellness",
    group: "Hydration",
    description: "Oral rehydration solutions to restore electrolytes and prevent dehydration.",
    ingredients: ["Glucose", "Sodium Chloride", "Potassium Chloride"],
    delivery: "Fast delivery in urban areas.",
    pickup: "Available in all branches.",
    paymentOptions: ["M-Pesa", "Card"],
    stock: 20,
    availability: "In Stock",
    price: 1420,
    originalPrice: 1420,
    discountedPrice: 1420,
    discount: 0,
  },
];

/* =====================================================
    ⚙️ Controller-like Helper Functions (Data Access Logic)
===================================================== */

/** Returns all products. */
export const getAllProducts = (): Product[] => {
  return productsData;
};

/** Finds a product by its ID. */
export const getProductById = (id: string): Product | undefined => {
  return productsData.find((p) => p.id === id);
};

/** Finds products with the same category, excluding the current one. */
export const getSimilarProducts = (id: string): Product[] => {
  const current = getProductById(id);
  if (!current) return [];
  // Return up to 4 similar products to keep the list manageable
  return productsData.filter(
    (p) => p.category === current.category && p.id !== current.id
  ).slice(0, 4); 
};

/** Formats a number as KES currency. */
export const formatPrice = (price: number): string =>
  price.toLocaleString("en-KE", { style: "currency", currency: "KES" });

/** Calculates the saving amount. */
export const calculateSavings = (original: number, discounted: number): number =>
  Math.max(0, original - discounted);