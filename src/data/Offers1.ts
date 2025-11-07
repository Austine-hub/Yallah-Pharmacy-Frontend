// src/data/offers1.ts

// --- Data Imports ---
import pic1 from "../assets/products/FentyBeautyGlossBomb-universal-lip-luminizer.png";
import pic2 from "../assets/products/laneige-lip-sleeping-mask-berry-20g.png";
import pic3 from "../assets/products/Maybelline-fit-me-mattePlusporelessPoundation.png";
import pic4 from "../assets/products/Rare-Beauty-Tinted-Moisturizer.png";
import pic5 from "../assets/products/Rare-Beauty-Soft-Pinch-Liquid-Blush.png";
import pic6 from "../assets/products/Charlotte-tilbury-glowgasm-beauty-light-wand.png";
import pic7 from "../assets/products/OPI-Nail-Lacquer.png";
import pic8 from "../assets/products/2025-Olive & June-Cuticle-Serum.png";
import pic9 from "../assets/products/L’Oréal-LashParadiseVolumizingMascara.png";
import pic10 from "../assets/products/Stila-Stay-AllDayWaterproofLiquidEyeliner.png";
import pic11 from "../assets/products/CeraVe-Hydrating-Cleanser-236ml.png";
import pic12 from "../assets/products/Mielle-Rosemary-Mint-Scalp.png";

// --- Product Interface (Data Structure) ---
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
    ingredients?: string[];
    howToUse?: string;
    similarProducts: string[];
}

// --- Central Source of Truth (The Data) ---
export const productsData: Product[] = [
    {
        id: "fenty-gloss-bomb",
        category: "Lip Gloss",
        title: "Fenty Beauty Gloss Bomb Universal Lip Luminizer",
        image: pic1,
        originalPrice: 3200,
        discountedPrice: 2550,
        discount: 20,
        availability: "In Stock",
        stock: 48,
        group: "Beauty & Personal Care",
        delivery: "Usually ready in 2-3 days",
        pickup: "Pickup available at Beauty Hub Nairobi",
        paymentOptions: ["M-Pesa", "Credit Card", "Google Pay"],
        description: "Explosive shine that feels as good as it looks.",
        fullDescription:
            "Fenty Beauty's iconic Gloss Bomb delivers explosive shine in a super-luxe, non-sticky formula with a peach-vanilla scent. The universal pink-nude shade is designed to flatter all skin tones, providing a glass-like shine that lasts for hours.",
        howToUse: "Apply directly to clean, bare lips or layer over lipstick for extra shine and dimension.",
        ingredients: ["Peach Extract", "Vitamin E", "Hyaluronic Acid"],
        similarProducts: ["laneige-lip-mask", "rare-beauty-blush", "charlotte-tilbury-wand"],
    },
    {
        id: "laneige-lip-mask",
        category: "Lip Care",
        title: "Laneige Lip Sleeping Mask Berry 20g",
        image: pic2,
        originalPrice: 3500,
        discountedPrice: 2800,
        discount: 20,
        availability: "In Stock",
        stock: 35,
        group: "Beauty & Personal Care",
        delivery: "Usually ready in 2-3 days",
        pickup: "Pickup available at Beauty Hub Nairobi",
        paymentOptions: ["M-Pesa", "Credit Card", "Visa"],
        description: "Overnight lip mask for soft, supple lips by morning.",
        fullDescription:
            "This cult-favorite lip sleeping mask delivers intense moisture and visibly smooths fine lines on lips by morning. The Berry Mix Complex with antioxidant-rich berry extracts helps protect lips from environmental damage while you sleep.",
        howToUse: "Apply generously to lips before bed using the included spatula. Leave on overnight and gently wipe off in the morning.",
        ingredients: ["Berry Mix Complex", "Vitamin C", "Coconut Oil", "Shea Butter"],
        similarProducts: ["fenty-gloss-bomb", "opi-nail-lacquer", "cerave-cleanser"],
    },
    {
        id: "maybelline-fit-me",
        category: "Foundation",
        title: "Maybelline Fit Me Matte + Poreless Foundation",
        image: pic3,
        originalPrice: 1800,
        discountedPrice: 1400,
        discount: 22,
        availability: "In Stock",
        stock: 67,
        group: "Beauty & Personal Care",
        delivery: "Usually ready in 1-2 days",
        pickup: "Pickup available at Beauty Hub Nairobi",
        paymentOptions: ["M-Pesa", "Cash", "Credit Card"],
        description: "Refines pores and controls shine for a natural matte finish.",
        fullDescription:
            "Maybelline's Fit Me Matte + Poreless Foundation provides natural coverage that minimizes pores and controls shine. The lightweight, breathable formula won't clog pores and is available in a wide range of shades to match every skin tone.",
        howToUse: "Apply to clean, moisturized skin using a brush, sponge, or fingertips. Blend outward from the center of the face.",
        ingredients: ["Clay", "Micropowders", "Vitamin E"],
        similarProducts: ["rare-beauty-tinted", "rare-beauty-blush", "loreal-mascara"],
    },
    {
        id: "rare-beauty-tinted",
        category: "Skin Tint",
        title: "Rare Beauty Tinted Moisturizer SPF 20",
        image: pic4,
        originalPrice: 4500,
        discountedPrice: 3600,
        discount: 20,
        availability: "In Stock",
        stock: 29,
        group: "Beauty & Personal Care",
        delivery: "Usually ready in 2-4 days",
        pickup: "Pickup available at Beauty Hub Nairobi",
        paymentOptions: ["M-Pesa", "Credit Card", "Google Pay"],
        description: "Lightweight coverage with skincare benefits and SPF protection.",
        fullDescription:
            "This hydrating tinted moisturizer provides sheer, buildable coverage while protecting skin with SPF 20. Enriched with lotus, gardenia, and white water lily, it helps improve skin's appearance over time while providing all-day hydration.",
        howToUse: "Apply evenly to face and neck after moisturizer. Can be built up for more coverage or mixed with moisturizer for a lighter finish.",
        ingredients: ["Lotus Flower", "Gardenia Extract", "White Water Lily", "Hyaluronic Acid", "SPF 20"],
        similarProducts: ["maybelline-fit-me", "rare-beauty-blush", "cerave-cleanser"],
    },
    {
        id: "rare-beauty-blush",
        category: "Blush",
        title: "Rare Beauty Soft Pinch Liquid Blush",
        image: pic5,
        originalPrice: 4200,
        discountedPrice: 3360,
        discount: 20,
        availability: "In Stock",
        stock: 41,
        group: "Beauty & Personal Care",
        delivery: "Usually ready in 2-3 days",
        pickup: "Pickup available at Beauty Hub Nairobi",
        paymentOptions: ["M-Pesa", "Credit Card", "Visa"],
        description: "Award-winning liquid blush for a natural, long-lasting flush.",
        fullDescription:
            "This weightless, long-lasting liquid blush blends and builds beautifully for a soft, healthy flush. The innovative formula is highly pigmented so a little goes a long way. Available in matte and dewy finishes to suit your preferred look.",
        howToUse: "Dot a tiny amount onto cheeks and blend with fingertips, sponge, or brush. Build gradually for desired intensity.",
        ingredients: ["Vitamin E", "Plant-based Pigments", "Hydrating Complex"],
        similarProducts: ["charlotte-tilbury-wand", "fenty-gloss-bomb", "maybelline-fit-me"],
    },
    {
        id: "charlotte-tilbury-wand",
        category: "Highlighter",
        title: "Charlotte Tilbury Glowgasm Beauty Light Wand",
        image: pic6,
        originalPrice: 6200,
        discountedPrice: 4950,
        discount: 20,
        availability: "In Stock",
        stock: 22,
        group: "Beauty & Personal Care",
        delivery: "Usually ready in 3-5 days",
        pickup: "Pickup available at Beauty Hub Nairobi",
        paymentOptions: ["M-Pesa", "Credit Card", "Google Pay"],
        description: "Luxurious highlighting wand for a luminous, glowing complexion.",
        fullDescription:
            "This cushion-applicator wand delivers a soft-focus, lit-from-within glow. The buildable, blendable formula contains light-reflecting pearls that create a luminous finish without glitter or shimmer. Perfect for achieving that coveted golden hour glow.",
        howToUse: "Twist the base to release product onto the cushion tip. Dab onto high points of the face (cheekbones, brow bones, cupid's bow) and blend with fingertips or a brush.",
        ingredients: ["Light-Reflecting Pearls", "Vitamin E", "Hydrating Oils"],
        similarProducts: ["rare-beauty-blush", "fenty-gloss-bomb", "rare-beauty-tinted"],
    },
    {
        id: "opi-nail-lacquer",
        category: "Nail Polish",
        title: "OPI Nail Lacquer - Bubble Bath",
        image: pic7,
        originalPrice: 1800,
        discountedPrice: 1350,
        discount: 25,
        availability: "In Stock",
        stock: 89,
        group: "Beauty & Personal Care",
        delivery: "Usually ready in 1-2 days",
        pickup: "Pickup available at Beauty Hub Nairobi",
        paymentOptions: ["M-Pesa", "Cash", "Credit Card"],
        description: "The iconic sheer pink nail polish for a classic, elegant look.",
        fullDescription:
            "OPI's best-selling Bubble Bath is a sheer, soft pink shade that provides a natural, polished look. The salon-quality formula offers chip-resistant wear and long-lasting shine. Perfect for any occasion, from everyday wear to special events.",
        howToUse: "Apply one coat for sheer coverage or two coats for more opacity. Finish with a top coat for extended wear and extra shine.",
        similarProducts: ["olive-june-serum", "laneige-lip-mask", "stila-eyeliner"],
    },
    {
        id: "olive-june-serum",
        category: "Nail Care",
        title: "Olive & June Cuticle Serum with Probiotic Complex",
        image: pic8,
        originalPrice: 2600,
        discountedPrice: 2080,
        discount: 20,
        availability: "In Stock",
        stock: 54,
        group: "Beauty & Personal Care",
        delivery: "Usually ready in 2-3 days",
        pickup: "Pickup available at Beauty Hub Nairobi",
        paymentOptions: ["M-Pesa", "Credit Card", "Google Pay"],
        description: "Nourishing cuticle serum for healthy, hydrated nails.",
        fullDescription:
            "This innovative cuticle serum contains a probiotic complex and nourishing oils to condition cuticles and strengthen nails. The precision brush makes application easy and mess-free. Regular use promotes healthier, stronger nails.",
        howToUse: "Brush onto cuticles and nails daily. Massage in gently until absorbed. Use morning and night for best results.",
        ingredients: ["Probiotic Complex", "Jojoba Oil", "Vitamin E", "Biotin"],
        similarProducts: ["opi-nail-lacquer", "cerave-cleanser", "mielle-scalp-oil"],
    },
    {
        id: "loreal-mascara",
        category: "Mascara",
        title: "L'Oréal Lash Paradise Volumizing Mascara",
        image: pic9,
        originalPrice: 2100,
        discountedPrice: 1680,
        discount: 20,
        availability: "In Stock",
        stock: 73,
        group: "Beauty & Personal Care",
        delivery: "Usually ready in 1-2 days",
        pickup: "Pickup available at Beauty Hub Nairobi",
        paymentOptions: ["M-Pesa", "Credit Card", "Visa"],
        description: "Voluminous, feathery lashes with intense length and volume.",
        fullDescription:
            "L'Oréal's Lash Paradise Mascara delivers dramatic volume and length with a soft, feathery look. The creamy formula glides on smoothly and the unique brush captures every lash for full, fluttery lashes that last all day.",
        howToUse: "Starting at the base of lashes, sweep brush upward to tips. Apply multiple coats for more volume. Waterproof formula available.",
        ingredients: ["Castor Oil", "Vitamin E", "Volumizing Polymers"],
        similarProducts: ["stila-eyeliner", "maybelline-fit-me", "rare-beauty-blush"],
    },
    {
        id: "stila-eyeliner",
        category: "Eyeliner",
        title: "Stila Stay All Day Waterproof Liquid Eyeliner",
        image: pic10,
        originalPrice: 3100,
        discountedPrice: 2480,
        discount: 20,
        availability: "In Stock",
        stock: 38,
        group: "Beauty & Personal Care",
        delivery: "Usually ready in 2-3 days",
        pickup: "Pickup available at Beauty Hub Nairobi",
        paymentOptions: ["M-Pesa", "Credit Card", "Google Pay"],
        description: "Award-winning waterproof liquid eyeliner with precision tip.",
        fullDescription:
            "This cult-favorite liquid eyeliner features a thin, marker-like precision tip for easy application and all-day waterproof wear. The intense black pigment creates crisp, defined lines that won't smudge, fade, or run.",
        howToUse: "Shake before use. Draw along lash line from inner to outer corner. For a winged look, extend line upward and outward at the outer corner.",
        ingredients: ["Water-resistant Polymers", "Carbon Black Pigments"],
        similarProducts: ["loreal-mascara", "rare-beauty-blush", "maybelline-fit-me"],
    },
    {
        id: "cerave-cleanser",
        category: "Skincare",
        title: "CeraVe Hydrating Cleanser 236ml",
        image: pic11,
        originalPrice: 2200,
        discountedPrice: 1760,
        discount: 20,
        availability: "In Stock",
        stock: 95,
        group: "Beauty & Personal Care",
        delivery: "Usually ready in 1-2 days",
        pickup: "Pickup available at Beauty Hub Nairobi",
        paymentOptions: ["M-Pesa", "Cash", "Credit Card", "Google Pay"],
        description: "Gentle, hydrating cleanser for normal to dry skin.",
        fullDescription:
            "This dermatologist-developed cleanser gently removes dirt and makeup without disrupting the skin's natural barrier. Formulated with three essential ceramides, hyaluronic acid, and MVE technology for long-lasting hydration that continues throughout the day.",
        howToUse: "Wet skin with lukewarm water. Massage cleanser into skin in a gentle, circular motion. Rinse well.",
        ingredients: ["Ceramides", "Hyaluronic Acid", "Niacinamide"],
        similarProducts: ["mielle-scalp-oil", "rare-beauty-tinted", "laneige-lip-mask"],
    },
    {
        id: "mielle-scalp-oil",
        category: "Hair Care",
        title: "Mielle Rosemary Mint Scalp & Hair Strengthening Oil",
        image: pic12,
        originalPrice: 2800,
        discountedPrice: 2100,
        discount: 25,
        availability: "In Stock",
        stock: 51,
        group: "Beauty & Personal Care",
        delivery: "Usually ready in 2-3 days",
        pickup: "Pickup available at Beauty Hub Nairobi",
        paymentOptions: ["M-Pesa", "Credit Card", "Visa"],
        description: "Nutrient-rich formula to address hair concerns and nourish the scalp.",
        fullDescription:
            "Formulated with Rosemary, Mint, and Biotin, this organic oil provides intensive nourishment to help smooth split ends and strengthen hair follicles. Perfect for use as a daily hair oil or an intensive pre-shampoo treatment.",
        howToUse: "Apply a small amount to the scalp and massage in gently. Comb through to the ends. Can also be used as a hot oil treatment.",
        ingredients: ["Rosemary Oil", "Mint Oil", "Biotin", "Jojoba Oil"],
        similarProducts: ["cerave-cleanser", "olive-june-serum", "loreal-mascara"],
    },
];

// --- Helper Functions (Controller Logic for Data Access) ---

/**
 * Returns all products.
 * @returns {Product[]} The array of all products.
 */
export const getAllProducts = (): Product[] => {
    return productsData;
};

/**
 * Finds a single product by its ID.
 * @param {string} id - The ID of the product to find.
 * @returns {Product | undefined} The found product or undefined.
 */
export const getProductById = (id: string): Product | undefined => {
    return productsData.find((product) => product.id === id);
};

/**
 * Finds similar products based on the 'similarProducts' field of the target product.
 * @param {string} id - The ID of the product to find similar items for.
 * @returns {Product[]} An array of similar products.
 */
export const getSimilarProducts = (id: string): Product[] => {
    const targetProduct = getProductById(id);
    if (!targetProduct) return [];

    const similarIds = targetProduct.similarProducts || [];
    
    // Filter the main data array to find the corresponding products
    return productsData.filter((product) => similarIds.includes(product.id));
};