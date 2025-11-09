// ===============================================================
// ✅ Vitamins.tsx — View Layer for Vitamins Product Listing
// Type-safe, optimized, and compatible with TS5+ strict settings
// ===============================================================

import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

// ✅ Type-only import to satisfy "verbatimModuleSyntax"
import type { Product } from "../data/VitaminData";
import { products as vitaminProducts, formatPrice } from "../data/VitaminData";

import styles from "./Vitamins.module.css";

// ===============================================================
// 🧭 Component
// ===============================================================
const Vitamins: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { addToCart } = useCart();

  // ✅ State
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [loading, setLoading] = useState(true);

  const products: Product[] = vitaminProducts ?? [];

  // ✅ Simulate loading for smoother UX
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timeout);
  }, []);

  // ✅ Scroll behavior
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // ✅ Scroll function
  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.7, 300);
    el.scrollTo({
      left: dir === "left" ? el.scrollLeft - scrollAmount : el.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  // ✅ Add to Cart - Fixed to use 'price' instead of 'currentPrice'
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price, // ✅ Uses 'price' from Product interface
      image: product.image,
      quantity: 1,
    });
    setAddedProductId(String(product.id));
    setTimeout(() => setAddedProductId(null), 1500);
  };

  // ===============================================================
  // ⏳ Loading State
  // ===============================================================
  if (loading) {
    return (
      <section className={styles.loadingSection}>
        <header>
          <h1 className={styles.title}>Loading Vitamins...</h1>
          <p className={styles.loadingText}>Preparing your wellness essentials...</p>
        </header>
      </section>
    );
  }

  // ===============================================================
  // 🚫 Empty State
  // ===============================================================
  if (products.length === 0) {
    return (
      <section className={styles.emptySection}>
        <header>
          <h1 className={styles.title}>No Vitamins Available</h1>
          <p>Please check back later for the best supplements and wellness products.</p>
        </header>
      </section>
    );
  }

  // ===============================================================
  // 🧾 Main Product Listing View
  // ===============================================================
  return (
    <section className={styles.productsSection} aria-labelledby="vitamins-title">
      {/* ---------------- Header ---------------- */}
      <header className={styles.header}>
        <h1 id="vitamins-title" className={styles.title}>
          Vitamins & Supplements
        </h1>
        <p className={styles.subtitle}>
          Boost immunity, energy, and wellness with premium vitamins and supplements.
        </p>

        <div className={styles.navigation}>
          <button
            className={`${styles.navButton} ${!canScrollLeft ? styles.disabled : ""}`}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className={`${styles.navButton} ${!canScrollRight ? styles.disabled : ""}`}
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ---------------- Product Cards ---------------- */}
      <div className={styles.productsContainer} ref={scrollRef} role="list">
        {products.map((p) => (
          <article key={p.id} className={styles.productCard} role="listitem">
            {/* Discount badge */}
            {p.discount && <div className={styles.discountBadge}>{p.discount}</div>}

            {/* Image → navigate to details */}
            <Link to={`/vitamin-product/${p.id}`} className={styles.imageContainer}>
              <img
                src={p.image}
                alt={p.name}
                className={styles.productImage}
                loading="lazy"
                decoding="async"
              />
            </Link>

            {/* Product Info */}
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{p.name}</h3>
              <div className={styles.productMeta}>
                <span className={styles.category}>{p.category}</span>
                <span className={styles.packSize}>Pack: {p.packSize}</span>
              </div>

              <div className={styles.priceContainer}>
                {/* ✅ Fixed: Use 'price' from Product interface */}
                <span className={styles.currentPrice}>{formatPrice(p.price)}</span>
                {/* ✅ Fixed: Compare with 'price' instead of 'currentPrice' */}
                {p.originalPrice && p.originalPrice > p.price && (
                  <span className={styles.originalPrice}>{formatPrice(p.originalPrice)}</span>
                )}
              </div>

              {/* Add to Cart */}
              <button
                className={styles.cartButton}
                onClick={() => handleAddToCart(p)}
                aria-label={`Add ${p.name} to cart`}
              >
                <ShoppingCart size={18} strokeWidth={1.5} />
                <span className={styles.cartText}>
                  {addedProductId === String(p.id) ? "Added!" : "Add to Cart"}
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Vitamins;