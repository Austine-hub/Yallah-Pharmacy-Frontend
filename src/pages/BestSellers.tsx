// ===============================================================
// ✅ BestSellers.tsx — Optimized, Clickable, MVC-Aligned (2025 Version)
// ===============================================================

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./BestSellers.module.css";

// === Import centralized model/data ===
import { bestSellersData, type Product } from "../data/BestSellersData";

// ===============================================================
// 🧠 Component
// ===============================================================
const BestSellers: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ===============================================================
  // 🧩 Controller Logic
  // ===============================================================

  /** Toggle product favorite */
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(productId)) {
        updated.delete(productId);
        toast("Removed from favorites 💔");
      } else {
        updated.add(productId);
        toast.success("Added to favorites ❤️");
      }
      return updated;
    });
  };

  /** Add product to cart */
  const addToCart = (productName: string) => {
    toast.success(`${productName} added to cart!`);
  };

  /** Share product link */
  const shareProduct = (productName: string, productId: string) => {
    const productUrl = `${window.location.origin}/bestsellers/${productId}`;
    const shareData = {
      title: productName,
      text: `Check out ${productName} at Healthfield Pharmacy`,
      url: productUrl,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => toast.error("Failed to share"));
    } else {
      navigator.clipboard.writeText(productUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  /** Smooth horizontal scroll */
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 320;
    container.scrollTo({
      left:
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  // ===============================================================
  // ✨ Framer Motion Variants
  // ===============================================================
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  // ===============================================================
  // 🧩 Render
  // ===============================================================
  return (
    <section className={styles.bestSellers} aria-labelledby="bestsellers-heading">
      <div className={styles.container}>
        {/* ===== Header ===== */}
        <div className={styles.header}>
          <h2 id="bestsellers-heading" className={styles.title}>
            Best Sellers
          </h2>

          <div className={styles.navigation}>
            <button
              className={styles.navButton}
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className={styles.navButton}
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* ===== Product Cards ===== */}
        <motion.div
          className={styles.productsWrapper}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          ref={scrollContainerRef}
        >
          {bestSellersData.map((product: Product) => (
            <motion.article
              key={product.id}
              className={styles.productCard}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* ⭐ Top Seller Badge */}
              {product.isTopSeller && (
                <motion.div
                  className={styles.topSellerBadge}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.15 }}
                >
                  ⭐ Top Seller
                </motion.div>
              )}

              {/* 🖼️ Product Image (Clickable) */}
              <Link
                to={`/bestsellers/${product.id}`}
                className={styles.imageContainer}
              >
                <LazyLoadImage
                  src={product.image}
                  alt={product.name}
                  effect="blur"
                  className={styles.productImage}
                  wrapperClassName={styles.imageWrapper}
                />
              </Link>

              {/* ❤️ Favorite */}
              <motion.button
                className={`${styles.iconButton} ${styles.favoriteButton}`}
                onClick={() => toggleFavorite(product.id)}
                whileTap={{ scale: 0.9 }}
                aria-label={
                  favorites.has(product.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                <Heart
                  size={20}
                  fill={favorites.has(product.id) ? "#e53e3e" : "none"}
                  color={favorites.has(product.id) ? "#e53e3e" : "#718096"}
                />
              </motion.button>

              {/* 🔗 Share */}
              <motion.button
                className={`${styles.iconButton} ${styles.shareButton}`}
                onClick={() => shareProduct(product.name, product.id)}
                whileTap={{ scale: 0.9 }}
                aria-label="Share product"
              >
                <Share2 size={20} />
              </motion.button>

              {/* 📄 Product Info */}
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>

                {/* Category Badge */}
                <div className={styles.categoryBadge}>
                  {product.isPharma && (
                    <span className={`${styles.badge} ${styles.pharmaBadge}`}>
                      Pharma
                    </span>
                  )}
                  {product.isNonPharma && (
                    <span className={`${styles.badge} ${styles.nonPharmaBadge}`}>
                      Non-Pharma
                    </span>
                  )}
                </div>

                <p className={styles.productDescription}>{product.description}</p>

                {/* 💰 Price */}
                <div className={styles.priceContainer}>
                  <span className={styles.price}>
                    Kes. {product.price.toFixed(2)}
                  </span>
                </div>

                {/* 🛒 Action Buttons */}
                <div className={styles.actionButtons}>
                  <motion.button
                    className={styles.addButton}
                    onClick={() => addToCart(product.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart size={18} />
                    Add
                  </motion.button>

                  <Link to={`/bestsellers/${product.id}`}>
                    <motion.button
                      className={styles.detailsButton}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ===== View All Link ===== */}
        <motion.div
          className={styles.viewAllContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="#all-bestsellers"
            className={styles.viewAllLink}
            whileHover={{ x: 5 }}
          >
            View All Best Sellers →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers;
