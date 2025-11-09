// ===============================================================
// 💊 Sexual & Reproductive Health Products — View + Controller Layer (2025)
// ===============================================================

import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import styles from "./Sexual.module.css";

// ===============================================================
// 🧠 MODEL IMPORTS (Centralized Data & Utilities)
// ===============================================================
import {
  SEXUAL_PRODUCTS,
  formatPrice,
} from "../data/OBGYNData";

// ===============================================================
// 🩺 MAIN COMPONENT
// ===============================================================
const Sexual: React.FC = memo(() => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const products = SEXUAL_PRODUCTS; // model layer data source

  // 🛒 Add to Cart Handler
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      description: product.description,
      discount: product.discount,
      originalPrice: product.oldPrice,
      inStock: true,
    });
    toast.success(`${product.name} added to cart!`, { icon: "🛒" });
  };

  // 🔗 Navigate to Details Page
  const handleViewDetails = (id: string) => {
    navigate(`/sexual-product/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ===============================================================
  // 🧩 RENDER VIEW
  // ===============================================================
  return (
    <section className={styles.offersSection}>
      {/* === Header === */}
      <div className={styles.header}>
        <h2 className={styles.title}>Sexual & Reproductive Health</h2>
        <Link to="/buy-medicines" className={styles.viewAll}>
          View all products →
        </Link>
      </div>

      {/* === Products Grid === */}
      <div className={styles.offersGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.card}
            title={product.description}
            onClick={() => handleViewDetails(product.id.toString())}
          >
            {product.discount > 0 && (
              <div className={styles.discountTag}>-{product.discount}%</div>
            )}

            {/* Product Image */}
            <div className={styles.imageWrapper}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
                loading="lazy"
              />
            </div>

            {/* Info */}
            <div className={styles.info}>
              <p className={styles.name}>{product.name}</p>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.prices}>
                <span className={styles.newPrice}>
                  {formatPrice(product.price)}
                </span>
                <span className={styles.oldPrice}>
                  {formatPrice(product.oldPrice)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={(e) => {
                  e.stopPropagation(); // prevent card click
                  handleAddToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

// ===============================================================
// 📦 EXPORT
// ===============================================================
export default Sexual;







