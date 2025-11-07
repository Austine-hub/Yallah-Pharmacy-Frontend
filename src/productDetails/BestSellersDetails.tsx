// src/productDetails/BestSellersDetails.tsx
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart, ShoppingCart, Share2, Package, MessageCircle } from "lucide-react";
import { bestSellersData } from "../data/BestSellersData";
import styles from "./HomeDetails.module.css"; // Use same styling as HomeDetails

const BestSellersDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = bestSellersData.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "ingredients" | "reviews">("description");

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Go Back
        </button>
      </div>
    );
  }

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    toast(isFavorite ? "Removed from favorites 💔" : "Added to favorites ❤️");
  };

  const addToCart = () => {
    toast.success(`${product.name} added to cart (${quantity})`);
  };

  const shareProduct = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch {
      toast.error("Failed to share product");
    }
  };

  const similarItems = bestSellersData.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <section className={styles.detailsSection}>
      <div className={styles.container}>
        {/* 🖼️ Product Image & Info */}
        <div className={styles.productContainer}>
          <div className={styles.imageWrapper}>
            <img src={product.image} alt={product.name} className={styles.image} />
          </div>

          <div className={styles.infoWrapper}>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.category}>{product.category}</p>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.price}>Kes. {product.price.toFixed(2)}</div>

            <div className={styles.actions}>
              <div className={styles.qtyControl}>
                <button onClick={decreaseQty}>−</button>
                <span>{quantity}</span>
                <button onClick={increaseQty}>+</button>
              </div>

              <button className={styles.addToCart} onClick={addToCart}>
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button className={styles.favorite} onClick={toggleFavorite}>
                <Heart
                  size={20}
                  fill={isFavorite ? "#e53e3e" : "none"}
                  color={isFavorite ? "#e53e3e" : "#4a5568"}
                />
              </button>

              <button className={styles.share} onClick={shareProduct}>
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 📑 Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "description" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("description")}
          >
            <Package size={16} /> Description
          </button>
          <button
            className={`${styles.tab} ${activeTab === "ingredients" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("ingredients")}
          >
            <MessageCircle size={16} /> Ingredients
          </button>
          <button
            className={`${styles.tab} ${activeTab === "reviews" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            <Heart size={16} /> Reviews
          </button>
        </div>

        {/* 📄 Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === "description" && (
            <p>{product.usage || "No additional usage instructions available."}</p>
          )}
          {activeTab === "ingredients" && (
            <ul>
              {product.ingredients?.map((ing, i) => (
                <li key={i}>{ing}</li>
              )) || <p>No ingredient information available.</p>}
            </ul>
          )}
          {activeTab === "reviews" && <p>No reviews yet. Be the first to review!</p>}
        </div>

        {/* 🛒 Similar Items */}
        {similarItems.length > 0 && (
          <div className={styles.similarSection}>
            <h3>Similar Items</h3>
            <div className={styles.similarGrid}>
              {similarItems.map((item) => (
                <div key={item.id} className={styles.similarCard}>
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <Link to={`/bestsellers/${item.id}`} className={styles.viewBtn}>
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellersDetails;
