// src/data/BeautyData.ts (Model)
// ===============================================================
// 🧠 Centralized Model Layer: Data, Types, and Utility Functions
// Ensures single source of truth for product data.
// ===============================================================

// === Import images (Assets) ===
import pic1 from "../assets/products/revitalizing-supreme.png";
import pic2 from "../assets/products/super-blendable.png";
import pic3 from "../assets/products/rouge-volupté-shine-lipstick.png";
import pic4 from "../assets/products/better-than-sex-mascara.png";
import pic5 from "../assets/products/born-this-way-foundation.png";
import pic6 from "../assets/products/Soft-Matte-Complete-Lipstick.png";
import pic7 from "../assets/products/Soft-Radiance-Pressed-Powder.png";
import pic8 from "../assets/products/airbrush-flawless-foundation.png";

// 🧩 Type Definitions
export interface Product {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly image: string;
  readonly brand: string;
}

// 🛒 Type for Cart Context (to prevent errors in prepareCartItem)
interface CartItem {
  id: string; // Must be string for comparison with cartItems
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// 🧾 Product Catalog (Exported as 'beautyProducts' to match import)
export const beautyProducts: readonly Product[] = [
  {
    id: 1,
    name: "Revitalizing Supreme+ Youth Power Crème",
    description: "Prestige anti-aging cream that firms, smooths, and rejuvenates skin.",
    price: 18900,
    image: pic1,
    brand: "Estée Lauder",
  },
  {
    id: 2,
    name: "True Match Super-Blendable Foundation",
    description: "Lightweight, seamless foundation for natural, flawless coverage.",
    price: 2400,
    image: pic2,
    brand: "L’Oréal Paris",
  },
  {
    id: 3,
    name: "Rouge Volupté Shine Lipstick",
    description: "Luxurious lipstick delivering intense color and moisture.",
    price: 5200,
    image: pic3,
    brand: "Yves Saint Laurent (YSL)",
  },
  {
    id: 4,
    name: "Better Than Sex Mascara",
    description: "Iconic volumizing mascara for dramatic, curled lashes.",
    price: 4200,
    image: pic4,
    brand: "Too Faced",
  },
  {
    id: 5,
    name: "Born This Way Foundation",
    description: "Medium-to-full coverage foundation with natural finish.",
    price: 5600,
    image: pic5,
    brand: "Too Faced",
  },
  {
    id: 6,
    name: "Soft Matte Complete Lipstick",
    description: "Velvety matte finish lipstick with long-lasting comfort.",
    price: 4100,
    image: pic6,
    brand: "NARS",
  },
  {
    id: 7,
    name: "Soft Radiance Pressed Powder",
    description: "Finishing powder that delivers a soft, luminous complexion.",
    price: 5300,
    image: pic7,
    brand: "Laura Mercier",
  },
  {
    id: 8,
    name: "Airbrush Flawless Foundation",
    description: "Full-coverage foundation with a natural matte, airbrushed finish.",
    price: 5900,
    image: pic8,
    brand: "Charlotte Tilbury",
  },
] as const;

// 🔍 Utility: Retrieve a single product by ID
export const getProductById = (id: number): Product | undefined =>
  beautyProducts.find((product) => product.id === id);

// 💰 Utility: Format price to currency
export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
  }).format(amount);

// 🔗 Utility: Simulated product link copy
// NOTE: Must be implemented based on your app's actual routing/URL structure.
export const copyProductLink = async (id: number): Promise<void> => {
  // Uses the modern Clipboard API
  await navigator.clipboard.writeText(`${window.location.origin}/product/${id}`);
};

// 🛒 Utility: Prepare cart item
export const prepareCartItem = (product: Product, quantity: number = 1): CartItem => ({
  id: product.id.toString(), // Convert number ID to string for Cart Context consistency
  name: product.name,
  price: product.price,
  image: product.image,
  quantity: quantity,
});