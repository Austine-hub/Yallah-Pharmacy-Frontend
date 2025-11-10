// src/productDetails/OffersDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingCart, MessageCircle, Package, ChevronRight, Star, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { getProductById, getSimilarProducts } from "../data/Offers";
import { useCart } from "../context/CartContext";
import styles from "./OffersD.module.css";

const OffersD: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = id ? getProductById(id) : undefined;
  const similarProducts = id ? getSimilarProducts(id) : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setQuantity(1);
    setSelectedImage(0);
  }, [id]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <Package size={64} />
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate("/shop")} className={styles.backBtn}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      toast.error("Not enough stock available");
      return;
    }
    addToCart({
      id: product.id,
      name: product.title,
      price: product.discountedPrice,
      image: product.image,
      quantity,
    });
    toast.success(`${quantity} × ${product.title} added to cart!`);
  };

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.min(product.stock, Math.max(1, newQuantity));
    setQuantity(validQuantity);
  };

  const savingsAmount = product.originalPrice - product.discountedPrice;
  const images = [product.image]; // Extend this array if multiple images available

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop">Shop</Link>
        <ChevronRight size={14} />
        <span>{product.title}</span>
      </nav>

      <div className={styles.productWrapper}>
        <div className={styles.imageSection}>
          <div className={styles.mainImageContainer}>
            {product.discount > 0 && (
              <div className={styles.discountBadge}>-{product.discount}%</div>
            )}
            <img 
              src={images[selectedImage]} 
              alt={product.title}
              className={styles.mainImage}
            />
          </div>
          
          {images.length > 1 && (
            <div className={styles.thumbnailContainer}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`${styles.thumbnail} ${selectedImage === idx ? styles.activeThumbnail : ""}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img} alt={`View ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.categoryBadge}>{product.category}</div>
          
          <h1 className={styles.productTitle}>{product.title}</h1>
          
          <div className={styles.ratingSection}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < 4 ? "#fbbf24" : "none"} stroke="#fbbf24" />
              ))}
            </div>
            <span className={styles.ratingText}>4.0 (128 reviews)</span>
          </div>

          <div className={styles.priceContainer}>
            <div className={styles.priceRow}>
              <span className={styles.currentPrice}>
                KES {product.discountedPrice.toLocaleString()}
              </span>
              {product.discount > 0 && (
                <span className={styles.originalPrice}>
                  KES {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.discount > 0 && (
              <div className={styles.savings}>
                You save KES {savingsAmount.toLocaleString()} ({product.discount}%)
              </div>
            )}
          </div>

          <div className={styles.stockInfo}>
            <Package size={18} />
            <span className={product.stock > 10 ? styles.inStock : styles.lowStock}>
              {product.stock > 10 ? `In Stock (${product.stock} units)` : `Only ${product.stock} left in stock!`}
            </span>
          </div>

          <div className={styles.quantitySection}>
            <label className={styles.quantityLabel}>Quantity:</label>
            <div className={styles.quantityControl}>
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className={styles.quantityBtn}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className={styles.quantityInput}
                aria-label="Product quantity"
              />
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className={styles.quantityBtn}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button 
              onClick={handleAddToCart} 
              className={styles.addToCartBtn}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button
              onClick={() => toast("💬 Chat feature coming soon!")}
              className={styles.chatBtn}
            >
              <MessageCircle size={20} />
              Chat
            </button>
          </div>

          <div className={styles.guarantees}>
            <div className={styles.guaranteeItem}>
              <Truck size={20} />
              <div>
                <strong>Free Delivery</strong>
                <span>On orders over KES 3,000</span>
              </div>
            </div>
            <div className={styles.guaranteeItem}>
              <ShieldCheck size={20} />
              <div>
                <strong>Secure Payment</strong>
                <span>100% secure transactions</span>
              </div>
            </div>
            <div className={styles.guaranteeItem}>
              <RefreshCw size={20} />
              <div>
                <strong>Easy Returns</strong>
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabButtons}>
          <button
            className={`${styles.tabBtn} ${activeTab === "description" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "reviews" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (128)
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "description" ? (
            <div className={styles.descriptionContent}>
              <h3>Product Description</h3>
              <p>{product.fullDescription || product.description}</p>
              
              {product.howToUse && (
                <div className={styles.howToUse}>
                  <h4>How to Use</h4>
                  <p>{product.howToUse}</p>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.reviewsContent}>
              <div className={styles.reviewsEmpty}>
                <Star size={48} />
                <h4>No reviews yet</h4>
                <p>Be the first to review this product and help others make informed decisions!</p>
                <button className={styles.writeReviewBtn}>Write a Review</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className={styles.similarSection}>
          <h2 className={styles.sectionTitle}>You Might Also Like</h2>
          <div className={styles.similarGrid}>
            {similarProducts.map((item) => (
              <div
                key={item.id}
                className={styles.similarCard}
                onClick={() => navigate(`/product/${item.id}`)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") navigate(`/product/${item.id}`);
                }}
              >
                {item.discount > 0 && (
                  <div className={styles.similarDiscount}>-{item.discount}%</div>
                )}
                <div className={styles.similarImageWrapper}>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className={styles.similarInfo}>
                  <h4>{item.title}</h4>
                  <div className={styles.similarPrice}>
                    <span className={styles.similarCurrentPrice}>
                      KES {item.discountedPrice.toLocaleString()}
                    </span>
                    {item.discount > 0 && (
                      <span className={styles.similarOriginalPrice}>
                        KES {item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersD;