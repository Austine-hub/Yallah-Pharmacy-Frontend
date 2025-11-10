// ===============================================================
// 💊 DiabetesDetails.tsx — Controller + View (Refactored & MVC Ready)
// ===============================================================

import React, { useEffect, useState, memo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { offersData } from "../data/diabetesData"; // ✅ Central data source
import toast from "react-hot-toast";
import styles from "./Diabetes.module.css";

// === Type Definitions (Matches data/diabetesData.ts) ===
export interface Offer {
  id: string;
  name: string;
  image: string;
  description: string;
  category?: string;
  discount: number;
  price: number;
  oldPrice?: number;
  stock?: string;
}

const DiabetesDetails: React.FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  // === Controller: Fetch and validate product data ===
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => {
      const foundOffer = offersData.find((item) => item.id === id);
      setOffer(foundOffer || null);
      setLoading(false);
    }, 200); // mimic async behavior for realism
    return () => clearTimeout(timer);
  }, [id]);

  // === Controller: Add to Cart ===
  const handleAddToCart = useCallback(() => {
    if (!offer) return;
    addToCart({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      image: offer.image,
      quantity: 1,
    });
    toast.success(`${offer.name} added to cart 🛒`, { duration: 2000 });
  }, [offer, addToCart]);

  // === Navigation Handlers ===
  const handleBack = useCallback(() => navigate(-1), [navigate]);

  // === View: Loading Skeleton ===
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.skeletonCard}>
          <div className={styles.skeletonImage}></div>
          <div className={styles.skeletonText}></div>
        </div>
      </div>
    );
  }

  // === View: If Product Not Found ===
  if (!offer) {
    return (
      <section className={styles.offersSection}>
        <p className={styles.notFound}>⚠️ Product not found or unavailable.</p>
        <button onClick={handleBack} className={styles.backButton}>
          <ArrowLeft size={18} strokeWidth={1.8} />
          <span>Go Back</span>
        </button>
      </section>
    );
  }

  // === View: Product Details ===
  return (
    <section
      className={styles.offersSection}
      aria-labelledby="diabetes-product-details"
    >
      <div className={styles.header}>
        <button
          onClick={handleBack}
          className={styles.backButton}
          aria-label="Go back to Diabetes Shop"
        >
          <ArrowLeft size={18} strokeWidth={1.8} />
          <span>Back</span>
        </button>
        <h2 id="diabetes-product-details" className={styles.title}>
          {offer.name}
        </h2>
      </div>

      <article className={`${styles.card} ${styles.detailCard}`}>
        <div className={styles.imageWrapper}>
          <img
            src={offer.image}
            alt={offer.name}
            className={styles.productImage}
            loading="lazy"
            onError={(e) =>
              ((e.target as HTMLImageElement).src =
                "/assets/placeholder-image.png")
            }
          />
          {offer.discount > 0 && (
            <div className={styles.discountTag}>-{offer.discount}%</div>
          )}
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>{offer.name}</h3>

          {offer.category && (
            <p className={styles.category}>{offer.category}</p>
          )}

          <p className={styles.description}>{offer.description}</p>

          <div className={styles.prices}>
            <span className={styles.newPrice}>
              KSh {offer.price.toLocaleString()}
            </span>
            {offer.oldPrice && (
              <span className={styles.oldPrice}>
                KSh {offer.oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={styles.addToCart}
              onClick={handleAddToCart}
              aria-label={`Add ${offer.name} to cart`}
            >
              <ShoppingCart size={18} strokeWidth={1.8} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </article>
    </section>
  );
});

export default DiabetesDetails;
