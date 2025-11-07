// ===============================================
// 🎨 ProductCarousel.tsx - VIEW LAYER
// Horizontal scrolling product carousel
// Pure presentation component
// ===============================================

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./ProductCarousel.module.css";
import { useCart } from "../context/CartContext";

// Import Model (data + utilities)
import { products, formatPrice, type Product } from "../data/HomeData";

// ===============================================
// 🎯 MAIN COMPONENT
// ===============================================

const ProductCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();

  // Global cart context
  const { addToCart, openCart } = useCart();

  // ===============================================
  // 🎮 EVENT HANDLERS (Controller Logic)
  // ===============================================

  /**
   * Add product to cart
   */
  const handleAddToCart = useCallback(
    (product: Product, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent navigation when clicking Add button

      const cartItem = {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category,
        description: product.description,
        inStock: product.stock > 0,
      };

      addToCart(cartItem);
      toast.success(`${product.name} added to cart!`, {
        duration: 2000,
        icon: "🛒",
      });
      openCart();
    },
    [addToCart, openCart]
  );

  /**
   * Navigate to product details page
   */
  const handleViewDetails = useCallback(
    (productId: number) => {
      navigate(`/home-product/${productId}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [navigate]
  );

  /**
   * Handle card click (navigate to details)
   */
  const handleCardClick = useCallback(
    (productId: number) => {
      handleViewDetails(productId);
    },
    [handleViewDetails]
  );

  /**
   * Horizontal scroll control
   */
  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 320;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  }, []);

  /**
   * Check scroll boundaries
   */
  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  // ===============================================
  // 🔄 EFFECTS
  // ===============================================

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  // ===============================================
  // 🎨 RENDER (View)
  // ===============================================

  return (
    <section className={styles.carouselSection}>
      <div className={styles.container}>
        {/* Header with navigation arrows */}
        <div className={styles.header}>
          <h2 className={styles.title}>Home Healthcare Essentials</h2>
          <div className={styles.navigation}>
            <button
              className={`${styles.navButton} ${!canScrollLeft ? styles.disabled : ""}`}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              ‹
            </button>
            <button
              className={`${styles.navButton} ${!canScrollRight ? styles.disabled : ""}`}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
        </div>

        {/* Product carousel */}
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel} ref={scrollContainerRef}>
            {products.map((product) => (
              <motion.article
                key={product.id}
                className={styles.productCard}
                onClick={() => handleCardClick(product.id)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleCardClick(product.id);
                }}
              >
                {/* Card header with badges */}
                <div className={styles.cardHeader}>
                  {product.trending && (
                    <span className={styles.trendingBadge}>🔥 Trending</span>
                  )}
                  {product.stock <= 50 && product.stock > 0 && (
                    <span className={styles.lowStockBadge}>
                      Only {product.stock} left
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className={styles.outOfStockBadge}>Out of Stock</span>
                  )}
                </div>

                {/* Product image */}
                <div className={styles.imageWrapper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className={styles.productImage}
                  />
                </div>

                {/* Product information */}
                <div className={styles.cardBody}>
                  <span className={styles.productCategory}>{product.category}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                  <p className={styles.productBrand}>{product.brand}</p>
                  <p className={styles.productPrice}>{formatPrice(product.price)}</p>
                </div>

                {/* Action buttons */}
                <div className={styles.cardFooter}>
                  <button
                    className={`${styles.addButton} ${
                      product.stock === 0 ? styles.disabledButton : ""
                    }`}
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={product.stock === 0}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    {product.stock === 0 ? "Out of Stock" : "🛒 Add to Cart"}
                  </button>
                  <button
                    className={styles.detailsButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(product.id);
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* View all link */}
        <div className={styles.viewAll}>
          <a
            href="#"
            className={styles.viewAllLink}
            onClick={(e) => {
              e.preventDefault();
              toast("Full catalog coming soon!", { icon: "📦" });
            }}
          >
            View All Home Healthcare Products →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;