// src/productDetails/OffersD.tsx
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingCart, MessageCircle, Package } from "lucide-react";
import toast from "react-hot-toast";
import { getProductById, getSimilarProducts } from "../data/ShopData";
import { useCart } from "../context/CartContext";
import styles from "./ShopD.module.css";

const ShopDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [quantity, setQuantity] = useState(1);

  const product = id ? getProductById(id) : undefined;
  const similarProducts = id ? getSimilarProducts(id) : [];

  if (!product)
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <button onClick={() => navigate("/shop")} className={styles.backBtn}>
          Back to Shop
        </button>
      </div>
    );

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.discountedPrice,
      image: product.image,
      quantity,
    });
    toast.success(`${quantity} × ${product.title} added to cart!`);
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumbs}>
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
        <span>{product.title}</span>
      </nav>

      <div className={styles.topSection}>
        {/* Product Image */}
        <div className={styles.imageContainer}>
          <div className={styles.discountBadge}>Save {product.discount}%</div>
          <img src={product.image} alt={product.title} />
        </div>

        {/* Product Info */}
        <div className={styles.infoContainer}>
          <span className={styles.category}>{product.category}</span>
          <h1>{product.title}</h1>

          <div className={styles.priceSection}>
            <span className={styles.price}>KES {product.discountedPrice.toLocaleString()}</span>
            <span className={styles.originalPrice}>
              KES {product.originalPrice.toLocaleString()}
            </span>
          </div>

          <div className={styles.stock}>
            <Package size={16} /> {product.stock} units in stock
          </div>

          <div className={styles.quantity}>
            <label>Quantity:</label>
            <div>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1))
                  )
                }
              />
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
            </div>
          </div>

          <div className={styles.actions}>
            <button onClick={handleAddToCart} className={styles.cartBtn}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button
              onClick={() => toast("💬 Chat feature coming soon!")}
              className={styles.chatBtn}
            >
              <MessageCircle size={20} /> Chat with Us
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "description" ? styles.activeTab : ""}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={activeTab === "reviews" ? styles.activeTab : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "description" ? (
          <>
            <h3>Product Description</h3>
            <p>{product.fullDescription || product.description}</p>
            {product.howToUse && (
              <>
                <h4>How to Use</h4>
                <p>{product.howToUse}</p>
              </>
            )}
          </>
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className={styles.similar}>
          <h3>You Might Also Like</h3>
          <div className={styles.similarGrid}>
            {similarProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  navigate(`/product/${item.id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={styles.similarCard}
              >
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p>KES {item.discountedPrice.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopDetails;
