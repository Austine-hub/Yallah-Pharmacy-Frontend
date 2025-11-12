/// =============================================== 
// 🧾 HomeData.ts - MODEL LAYER
// Single source of truth for Home Healthcare products
// Pure data + business logic utilities (no UI concerns)
// ===============================================

import pic1 from "../assets/products/OneTouchSelectPlusGlucometerKit.png";
import pic2 from "../assets/products/iProvenDigitalThermometer.png";
import pic3 from "../assets/products/First Aid Kit Essentials (110 pcs).png";
import pic4 from "../assets/products/Swift-Pregnancy-Test-Kit.png";
import pic5 from "../assets/products/OmronBronzeBloodPressurMonitor.png";
import pic6 from "../assets/products/Accu-ChekSoftclixLancets.png";
import pic7 from "../assets/products/ElastoplastSensitivePlasters.png";
import pic8 from "../assets/products/Vickswarmmisthumidifier.png";
import pic9 from "../assets/products/Omronpeakflowmeter.png";
import pic10 from "../assets/products/PurellAdvancedHandSanitizer.png";
import pic11 from "../assets/products/Covid19Test.png";
import pic12 from "../assets/products/ElectricHeatingPadForBack Pain.png";
import pic13 from "../assets/products/PulseOximeter.png";
import pic14 from "../assets/products/GelPack.png";
import pic15 from "../assets/products/WalkingCane.png";

// ===============================================
// 🔹 TypeScript Interfaces
// ===============================================

export interface Product {
  id: number;
  name: string;
  description: string;
  fullDescription?: string;
  howToUse?: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  trending: boolean;
  features?: string[];
  specifications?: Record<string, string>;
}

export type SortOption = "price-asc" | "price-desc" | "trending" | "alphabetical" | "stock";

// ===============================================
// 📦 Product Database (Master List)
// ===============================================

export const products: Product[] = [
  {
    id: 1,
    name: "OneTouch Select Plus Glucometer Kit",
    description: "Accurate blood glucose monitoring kit with test strips and lancets.",
    fullDescription:
      "The OneTouch Select Plus Glucometer Kit is a comprehensive blood glucose monitoring system designed for individuals managing diabetes. Features color-coded range indicators, a large display, and fast results in just 5 seconds. Includes test strips, lancets, and a carrying case.",
    howToUse:
      "Wash hands thoroughly. Insert test strip into meter. Use lancing device to obtain blood sample. Apply blood to test strip. Results display in 5 seconds.",
    brand: "OneTouch",
    category: "Diabetes Care",
    price: 4500,
    stock: 45,
    image: pic1,
    trending: true,
    features: [
      "5-second test results",
      "Color-coded range indicators",
      "500-test memory",
      "No coding required",
    ],
    specifications: {
      "Test Time": "5 seconds",
      "Sample Size": "1.0 µL",
      "Battery Life": "1000 tests",
      Warranty: "Lifetime",
    },
  },
  {
    id: 2,
    name: "iProven Digital Thermometer",
    description: "Fast and reliable thermometer for adults and children.",
    fullDescription:
      "Medical-grade digital thermometer with instant readings. Features fever alarm, memory recall, and automatic shut-off. Safe for oral, underarm, and rectal use. FDA approved.",
    howToUse:
      "Turn on thermometer. Place under tongue (oral), in armpit (underarm), or use rectally as needed. Wait for beep signal indicating completion. Read temperature on display.",
    brand: "iProven",
    category: "Diagnostics",
    price: 950,
    stock: 120,
    image: pic2,
    trending: false,
    features: ["10-second readings", "Fever alarm", "Waterproof tip", "Memory recall"],
    specifications: {
      Accuracy: "±0.1°C",
      Range: "32°C - 42.9°C",
      "Battery Type": "LR41",
      "Auto Shut-off": "10 minutes",
    },
  },
  {
    id: 3,
    name: "First Aid Kit Essentials (110 pcs)",
    description: "Comprehensive first aid kit with bandages, scissors, and antiseptics.",
    fullDescription:
      "Professional-grade first aid kit containing 110 essential medical supplies. Includes bandages, gauze, adhesive tape, scissors, tweezers, antiseptic wipes, and more. Perfect for home, car, office, or travel.",
    howToUse:
      "Keep in easily accessible location. Check expiration dates regularly. Restock used items promptly. Familiarize yourself with contents before emergencies arise.",
    brand: "Johnson & Johnson",
    category: "First Aid",
    price: 3200,
    stock: 78,
    image: pic3,
    trending: true,
    features: [
      "110 medical supplies",
      "Portable hard case",
      "Organized compartments",
      "Travel-friendly",
    ],
    specifications: {
      Items: "110 pieces",
      "Case Dimensions": "20 x 15 x 7 cm",
      Weight: "650g",
      Material: "Hard plastic case",
    },
  },
  {
    id: 4,
    name: "Swift Pregnancy Test Kit (Cassette)",
    description: "Accurate early pregnancy detection kit for home use.",
    fullDescription:
      "Over 99% accurate pregnancy test that can detect pregnancy as early as 7-10 days after conception. Simple cassette design with easy-to-read results in just 3-5 minutes.",
    howToUse:
      "Collect urine sample in clean container. Use dropper to place 3 drops of urine in sample well. Wait 3-5 minutes. Two lines indicate pregnant, one line indicates not pregnant.",
    brand: "Pharmaplus",
    category: "Diagnostics",
    price: 250,
    stock: 200,
    image: pic4,
    trending: true,
    features: ["99%+ accuracy", "Early detection", "Easy to read", "Results in 3-5 minutes"],
    specifications: {
      Sensitivity: "25 mIU/mL",
      Accuracy: ">99%",
      "Test Time": "3-5 minutes",
      Format: "Cassette",
    },
  },
  {
    id: 5,
    name: "Omron Bronze Blood Pressure Monitor",
    description: "Clinically validated BP monitor with one-touch digital operation.",
    fullDescription:
      "Advanced blood pressure monitor with IntelliSense technology for comfortable, controlled inflation. Features large display, irregular heartbeat detection, and stores up to 60 readings. Clinically validated for accuracy.",
    howToUse:
      "Sit quietly for 5 minutes before measuring. Wrap cuff around upper arm. Press START button. Remain still during measurement. Read systolic/diastolic pressure and pulse on display.",
    brand: "Omron",
    category: "Cardiovascular",
    price: 8500,
    stock: 32,
    image: pic5,
    trending: true,
    features: [
      "IntelliSense technology",
      "Irregular heartbeat detection",
      "60-reading memory",
      "Large display",
    ],
    specifications: {
      "Cuff Size": "22-42 cm",
      "Memory Capacity": "60 readings",
      "Power Source": "4 AA batteries or AC adapter",
      Warranty: "5 years",
    },
  },
  {
    id: 6,
    name: "Accu-Chek Softclix Lancets (100s)",
    description: "Gentle, precise lancets for blood glucose testing.",
    fullDescription:
      "Premium sterile lancets designed for virtually painless blood sampling. Features ultra-thin needle and precision-engineered bevel for smooth skin entry. Compatible with Accu-Chek Softclix lancing device.",
    howToUse:
      "Insert lancet into Accu-Chek Softclix lancing device. Adjust depth setting as needed. Place device firmly against fingertip. Press release button to obtain blood sample.",
    brand: "Accu-Chek",
    category: "Diabetes Care",
    price: 1800,
    stock: 95,
    image: pic6,
    trending: false,
    features: ["Ultra-thin needles", "Sterile", "Virtually painless", "100-count box"],
    specifications: {
      Gauge: "28G",
      Quantity: "100 lancets",
      Compatibility: "Accu-Chek Softclix device",
      Sterilization: "Gamma irradiated",
    },
  },
  {
    id: 7,
    name: "Elastoplast Sensitive Plasters (20s)",
    description: "Hypoallergenic plasters ideal for sensitive skin.",
    fullDescription:
      "Gentle, breathable plasters with extra-soft material suitable for sensitive skin. Non-stick wound pad protects and cushions without adhering to wounds. Secure adhesion that's easy to remove.",
    howToUse:
      "Clean and dry wound area. Remove protective film. Apply plaster over wound, ensuring pad covers injury completely. Press edges firmly. Change daily or when wet.",
    brand: "Elastoplast",
    category: "First Aid",
    price: 600,
    stock: 150,
    image: pic7,
    trending: false,
    features: ["Hypoallergenic", "Breathable", "Non-stick pad", "Easy removal"],
    specifications: {
      Quantity: "20 plasters",
      Sizes: "Assorted",
      Material: "Soft fabric",
      Adhesive: "Hypoallergenic",
    },
  },
  {
    id: 8,
    name: "Vicks Warm Mist Humidifier",
    description: "Adds moisture and relieves dry throat and nasal irritation.",
    fullDescription:
      "Warm mist humidifier that helps relieve cold and flu symptoms by adding soothing moisture to the air. Features medicine cup for menthol vapor, automatic shut-off, and runs up to 12 hours. Ideal for bedrooms up to 25m².",
    howToUse:
      "Fill tank with distilled water. Add Vicks VapoSteam to medicine cup if desired. Plug in and turn on. Place on flat surface at least 1 meter from walls. Clean every 3 days.",
    brand: "Vicks",
    category: "Respiratory Care",
    price: 9500,
    stock: 28,
    image: pic8,
    trending: true,
    features: [
      "Warm mist technology",
      "12-hour runtime",
      "Medicine cup for vapors",
      "Auto shut-off",
    ],
    specifications: {
      Capacity: "3.8 liters",
      Runtime: "Up to 12 hours",
      "Room Size": "25 m²",
      "Power Consumption": "350W",
    },
  },
  {
    id: 9,
    name: "Omron Peak Flow Meter",
    description: "Monitors lung function for asthma and respiratory care.",
    fullDescription:
      "Personal peak flow meter for monitoring lung function and asthma control. Measures peak expiratory flow rate (PEFR) to help detect early signs of airway narrowing. Easy-to-use with clear scale and portable design.",
    howToUse:
      "Stand or sit upright. Reset indicator to zero. Take deep breath. Place meter in mouth, seal lips around mouthpiece. Blow out as hard and fast as possible. Record reading.",
    brand: "Omron",
    category: "Respiratory Care",
    price: 4200,
    stock: 56,
    image: pic9,
    trending: false,
    features: ["Easy-to-read scale", "Portable design", "Durable construction", "Accurate readings"],
    specifications: {
      Range: "60-800 L/min",
      Scale: "EU/EN 13826 standard",
      Material: "Medical-grade plastic",
      Weight: "85g",
    },
  },
  {
    id: 10,
    name: "Purell Advanced Hand Sanitizer (500ml)",
    description: "Kills 99.9% of germs instantly while keeping hands moisturized.",
    fullDescription:
      "Advanced hand sanitizer gel with 70% alcohol that kills 99.99% of most common germs. Enhanced with moisturizers to condition skin and prevent dryness. Clinically proven to maintain skin health. Fragrance-free formula.",
    howToUse:
      "Apply a palmful of product (3-5ml) into cupped hand. Rub hands together, covering all surfaces including between fingers and under nails, until dry (about 20 seconds). Do not rinse.",
    brand: "Purell",
    category: "Hygiene",
    price: 650,
    stock: 180,
    image: pic10,
    trending: false,
    features: [
      "70% alcohol content",
      "Kills 99.99% germs",
      "With moisturizers",
      "Fragrance-free",
    ],
    specifications: {
      Volume: "500 ml",
      "Active Ingredient": "Ethyl alcohol 70%",
      Format: "Gel",
      Fragrance: "None",
    },
  },
  {
    id: 11,
    name: "COVID-19 Rapid Antigen Test Kit",
    description: "Approved rapid test for accurate COVID-19 detection.",
    fullDescription:
      "FDA-approved rapid antigen test for detecting SARS-CoV-2 virus. Provides results in 15 minutes from nasal swab sample. High sensitivity and specificity. Includes all necessary components for testing.",
    howToUse:
      "Wash hands. Collect nasal swab sample following instructions. Insert swab into extraction buffer tube and mix. Apply drops to test cassette. Wait 15 minutes. Read results.",
    brand: "Abbott",
    category: "Diagnostics",
    price: 1200,
    stock: 240,
    image: pic11,
    trending: true,
    features: ["15-minute results", "FDA approved", "Easy to use", "High accuracy"],
    specifications: {
      Sensitivity: "95.2%",
      Specificity: "99.4%",
      "Sample Type": "Nasal swab",
      "Result Time": "15 minutes",
    },
  },
  {
    id: 12,
    name: "Electric Heating Pad for Back Pain",
    description: "Adjustable heat therapy pad for muscle and joint pain.",
    fullDescription:
      "Therapeutic heating pad with 6 temperature settings and 4 timer options for customized pain relief. Ultra-soft microplush cover is machine washable. Extra-large size covers full back area. Auto shut-off for safety.",
    howToUse:
      "Plug into electrical outlet. Select desired temperature setting. Place pad on affected area. Set timer if desired. Pad will automatically shut off after 2 hours for safety.",
    brand: "Sunbeam",
    category: "Pain Relief",
    price: 3800,
    stock: 42,
    image: pic12,
    trending: false,
    features: ["6 heat settings", "4 timer options", "Auto shut-off", "Washable cover"],
    specifications: {
      Size: "30 x 60 cm",
      "Power Rating": "100W",
      "Cord Length": "2.7 meters",
      "Auto Shut-off": "2 hours",
    },
  },
  {
    id: 13,
    name: "Pulse Oximeter Fingertip",
    description: "Instant oxygen saturation and pulse rate monitor.",
    fullDescription:
      "Portable pulse oximeter that accurately measures blood oxygen saturation (SpO2) and pulse rate. Features bright OLED display with 6 viewing modes. Automatic power-off after 8 seconds. Includes lanyard and batteries.",
    howToUse:
      "Turn on device. Insert finger into probe with nail facing up. Wait 5-10 seconds for reading to stabilize. Read SpO2 percentage and pulse rate on display.",
    brand: "Contec",
    category: "Diagnostics",
    price: 2500,
    stock: 88,
    image: pic13,
    trending: true,
    features: ["OLED display", "6 display modes", "Auto power-off", "Portable"],
    specifications: {
      "SpO2 Range": "35%-100%",
      "Pulse Rate Range": "30-250 BPM",
      Accuracy: "±2%",
      "Battery Type": "2 AAA batteries",
    },
  },
  {
    id: 14,
    name: "Reusable Hot & Cold Gel Pack",
    description: "Flexible, reusable gel pack for pain and swelling relief.",
    fullDescription:
      "Versatile therapy pack that can be used hot or cold to treat various injuries and conditions. Remains flexible when frozen. Reusable hundreds of times. Comes with protective fabric cover.",
    howToUse:
      "For cold therapy: Freeze for 2+ hours. For heat therapy: Microwave for 30-60 seconds or boil for 5 minutes. Always use provided cover to protect skin. Apply to affected area for 15-20 minutes.",
    brand: "TheraPearl",
    category: "Pain Relief",
    price: 950,
    stock: 110,
    image: pic14,
    trending: false,
    features: ["Hot or cold use", "Stays flexible", "Reusable", "With cover"],
    specifications: {
      Size: "25 x 13 cm",
      Material: "Non-toxic gel",
      "Temperature Range": "-20°C to 80°C",
      Weight: "400g",
    },
  },
  {
    id: 15,
    name: "Medline Adjustable Walking Cane",
    description: "Lightweight aluminum cane for improved balance and mobility.",
    fullDescription:
      "Durable aluminum walking cane with 10 height adjustment positions. Features comfortable contoured handle and non-slip rubber tip. Supports up to 136kg. Ideal for individuals recovering from injury or needing mobility assistance.",
    howToUse:
      "Adjust height so handle is at wrist level when standing upright with arm relaxed. Tighten locking mechanism securely. Hold cane on opposite side of weaker leg. Move cane forward with weaker leg.",
    brand: "Medline",
    category: "Mobility Aids",
    price: 4800,
    stock: 35,
    image: pic15,
    trending: false,
    features: ["Height adjustable", "Lightweight aluminum", "Non-slip tip", "Contoured handle"],
    specifications: {
      Material: "Aluminum",
      "Height Range": "76-99 cm",
      "Weight Capacity": "136 kg",
      Weight: "450g",
    },
  },
];

// ===============================================
// ⚙️ UTILITY FUNCTIONS (Business Logic)
// ===============================================

export const getProductById = (id: string | number): Product | undefined => {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return products.find((p) => p.id === numericId);
};

export const getTrendingProducts = (): Product[] => products.filter((p) => p.trending);

export const getSimilarProducts = (id: string | number, limit = 4): Product[] => {
  const product = getProductById(id);
  if (!product) return [];
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

export const sortProducts = (option: SortOption, productList = products): Product[] => {
  const sorted = [...productList];
  switch (option) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "alphabetical":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "trending":
      return sorted.filter((p) => p.trending);
    case "stock":
      return sorted.sort((a, b) => b.stock - a.stock);
    default:
      return sorted;
  }
};

export const filterByBrand = (brand: string): Product[] =>
  products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());

export const filterByCategory = (category: string): Product[] =>
  products.filter((p) => p.category.toLowerCase() === category.toLowerCase());

export const searchProducts = (query: string): Product[] => {
  const lower = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower) ||
      p.brand.toLowerCase().includes(lower)
  );
};

export const getAllBrands = (): string[] =>
  Array.from(new Set(products.map((p) => p.brand))).sort();

export const getAllCategories = (): string[] =>
  Array.from(new Set(products.map((p) => p.category))).sort();

export const formatPrice = (price: number): string => `KES ${price.toLocaleString()}`;

export const isInStock = (id: string | number): boolean => {
  const product = getProductById(id);
  return product ? product.stock > 0 : false;
};

export const getLowStockProducts = (threshold = 50): Product[] =>
  products.filter((p) => p.stock > 0 && p.stock <= threshold);

export const getProductsByPriceRange = (min: number, max: number): Product[] =>
  products.filter((p) => p.price >= min && p.price <= max);

// ===============================================
// ✅ Default Export (Module Bundle)
// ===============================================

export default {
  products,
  getProductById,
  getTrendingProducts,
  getSimilarProducts,
  sortProducts,
  filterByBrand,
  filterByCategory,
  searchProducts,
  getAllBrands,
  getAllCategories,
  formatPrice,
  isInStock,
  getLowStockProducts,
  getProductsByPriceRange,
};
