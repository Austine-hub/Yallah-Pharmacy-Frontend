// src/pages/BeautyProducts.tsx
import React, { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./BeautyProducts.module.css";

// 1. Harmonized Imports from Model (BeautyData.ts)
import {
  beautyProducts, // Correctly imports the product catalog
  getProductById, // Utility to safely find a product
  prepareCartItem, // Utility to structure the cart item
  copyProductLink, // Utility for sharing logic
} from "../data/BeautyData";

// 2. Cart Context remains the same
import { useCart } from "../context/CartContext";

// 3. New reusable View Component (DRY)
import ProductCard from "../components/ProductCard";

const BeautyProducts: React.FC = () => {
  // === State and Hooks ===
  const { addToCart, updateQuantity, openCart, cartItems } = useCart();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // === Controller Logic (Memoized Callbacks) ===

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id)
        ? (next.delete(id), toast.error("Removed from favorites"))
        : (next.add(id), toast.success("Added to favorites"));
      return next;
    });
  }, []); // Logic is stable, no external dependencies needed

  const handleScroll = useCallback((dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    // Standardizing offset calculation for smoother scrolling
    const offset = el.offsetWidth / 2;
    el.scrollBy({ left: dir === "left" ? -offset : offset, behavior: "smooth" });
  }, []); // Logic is stable, no external dependencies needed

  const handleShare = useCallback(async (id: number) => {
    try {
      await copyProductLink(id);
      toast.success("Link copied!");
    } catch {
      toast.error("Unable to copy link");
    }
  }, []); // Depends only on the external copyProductLink utility

  const handleAddToCart = useCallback(
    (id: number) => {
      // Use the Model utility for safe product lookup
      const product = getProductById(id);
      if (!product) return;
      
      const stringId = product.id.toString();
      const existing = cartItems.find((ci) => ci.id === stringId);

      existing
        ? updateQuantity(stringId, existing.quantity + 1)
        : addToCart(prepareCartItem(product));

      toast.success(`${product.name} added to cart`);
      openCart?.();
    },
    // Dependencies from useCart and Model utilities
    [cartItems, addToCart, updateQuantity, openCart] 
  );

  const handleProductClick = useCallback(
    (id: number) => navigate(`/product/${id}`),
    [navigate]
  );

  // === View (JSX) ===
  return (
    <section className={styles.beautySection}>
      <Toaster position="top-right" />
      
      <header className={styles.header}>
        <h2 className={styles.title}>Beauty Products</h2>
        <div className={styles.navigation}>
          <button onClick={() => handleScroll("left")} aria-label="Previous products">
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => handleScroll("right")} aria-label="Next products">
            <ChevronRight size={22} />
          </button>
        </div>
      </header>

      <div className={styles.productsWrapper} ref={carouselRef}>
        {/* Iterate over the harmonized 'beautyProducts' array */}
        {beautyProducts.map((p) => (
          // Use the reusable ProductCard component
          <ProductCard
            key={p.id}
            product={p}
            isFavorite={favorites.has(p.id)}
            onToggleFavorite={toggleFavorite}
            onShare={handleShare}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
            styles={styles} // Pass the CSS module styles for consistent styling
          />
        ))}
      </div>
    </section>
  );
};

export default BeautyProducts;