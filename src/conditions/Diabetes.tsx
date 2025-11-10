// ===============================================================
// 💊 Diabetes.tsx — Diabetes Drug Offers (Optimized + DRY)
// ===============================================================

import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import styles from "./Offers.module.css";
import { getAllOffers, type  Offer } from "../data/diabetesData"; // ✅ Centralized data source

const Diabetes: React.FC = memo(() => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const offers = getAllOffers(); // Fetch all diabetes offers dynamically

  const handleAddToCart = (offer: Offer) => {
    addToCart({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      image: offer.image,
      quantity: 1,
    });
    toast.success(`${offer.name} added to cart 🛒`, { duration: 2000 });
  };

  const handleCardClick = (id: string) => {
    navigate(`/diabetes/${id}`);
  };

  return (
    <section className={styles.offersSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Diabetes Drug Offers</h2>
        <Link to="/diabetes-products" className={styles.viewAll}>
          View all offers →
        </Link>
      </div>

      <div className={styles.offersGrid}>
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={styles.card}
            onClick={() => handleCardClick(offer.id)}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.discountTag}>-{offer.discount}%</div>

            <div className={styles.imageWrapper}>
              <img
                src={offer.image}
                alt={offer.name}
                className={styles.productImage}
                loading="lazy"
              />
            </div>

            <div className={styles.info}>
              <p className={styles.name}>{offer.name}</p>
              <div className={styles.prices}>
                <span className={styles.newPrice}>
                  KSh {offer.price.toLocaleString()}
                </span>
                <span className={styles.oldPrice}>
                  KSh {offer.oldPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation
                  handleAddToCart(offer);
                }}
              >
                <ShoppingCart size={18} strokeWidth={1.8} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Diabetes;
