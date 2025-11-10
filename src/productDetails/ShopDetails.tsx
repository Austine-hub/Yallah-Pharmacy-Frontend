// src/productDetails/ShopDetails.tsx


import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingCart, MessageCircle, Package, Heart, Share2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import {
  getProductById,
  getSimilarProducts,
  formatPrice,
  calculateSavings,
} from "../data/ShopData"; // Unified import from the Model file
import { useCart } from "../context/CartContext";
import styles from "./ShopD.module.css";

/**
 * 🛍️ ShopDetails Component
 * Displays detailed information for a selected product
 * Consumes data via Controller-like functions from src/data/productModel.ts
 */
const ShopDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  // 1. **Controller Logic:** Fetch product data via Model functions
  const product = id ? getProductById(id) : undefined;
  const similarProducts = id ? getSimilarProducts(id) : [];

  // Reset when product changes
  useEffect(() => {
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  /** ✅ Quantity Handling */
  const handleQuantityChange = useCallback(
    (newQuantity: number) => {
      if (!product) return;
      // Ensure quantity is within valid range: 1 to product.stock
      const validQuantity = Math.max(1, Math.min(product.stock, newQuantity)); 
      setQuantity(validQuantity);
      if (newQuantity > product.stock) {
        toast.error(`Only ${product.stock} units available`);
      }
    },
    [product]
  );

  /** ✅ Add to Cart */
  const handleAddToCart = useCallback(() => {
    if (!product) return;
    if (product.stock === 0) {
      toast.error("Out of stock");
      return;
    }

    addToCart({
      id: product.id,
      name: product.title,
      price: product.discountedPrice, // Ensure we use the discounted price
      image: product.image,
      quantity,
    });

    toast.success(`✅ ${quantity} × ${product.title} added to cart!`);
  }, [product, quantity, addToCart]);

  // ... (Other handlers like handleChatClick, handleWishlistToggle, handleShare, etc. remain the same) ...
  const handleChatClick = useCallback(() => {
    toast("💬 Chat feature coming soon!");
  }, []);

  const handleWishlistToggle = useCallback(() => {
    setIsWishlisted((prev) => !prev);
    toast.success(isWishlisted ? "Removed from wishlist" : "❤️ Added to wishlist!");
  }, [isWishlisted]);

  const handleShare = useCallback(() => {
    if (navigator.share && product) {
      navigator
        .share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
        .catch(() => toast.error("Sharing failed"));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("🔗 Link copied to clipboard!");
    }
  }, [product]);

  const handleViewAlternatives = useCallback(() => {
    const section = document.getElementById("similar-products");
    section?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSimilarProductClick = useCallback(
    (productId: string) => {
      navigate(`/product/${productId}`);
    },
    [navigate]
  );

  /** 🚫 Product Not Found */
  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product Not Found</h2>
        <p>Sorry, the product you're looking for doesn’t exist.</p>
        <button onClick={() => navigate("/shop")} className={styles.backBtn}>
          <ArrowLeft size={20} /> Return to Shop
        </button>
      </div>
    );
  }

  return (
    // 2. **View Logic:** Render the product details
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.separator}>/</span>
        <Link to="/shop" className={styles.breadcrumbLink}>Shop</Link>
        <span className={styles.separator}>/</span>
        <span className={styles.breadcrumbCurrent}>{product.title}</span>
      </nav>

      {/* Top Section */}
      <div className={styles.topSection}>
        {/* Left - Image */}
        <div className={styles.imageContainer}>
          {product.discount > 0 && (
            <div className={styles.discountBadge}>Save {product.discount}%</div>
          )}
          <img src={product.image} alt={product.title} className={styles.productImage} />

          {/* Icons */}
          <div className={styles.imageActions}>
            <button
              className={styles.iconBtn}
              onClick={handleWishlistToggle}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={24}
                fill={isWishlisted ? "#e74c3c" : "none"}
                stroke={isWishlisted ? "#e74c3c" : "currentColor"}
              />
            </button>
            <button className={styles.iconBtn} onClick={handleShare} aria-label="Share product">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Right - Info */}
        <div className={styles.infoContainer}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.productName}>{product.title}</h1>

          {/* Pricing */}
          <div className={styles.priceSection}>
            <div className={styles.priceGroup}>
              <span className={styles.price}>{formatPrice(product.discountedPrice)}</span>
              {product.originalPrice > product.discountedPrice && (
                <span className={styles.originalPrice}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice > product.discountedPrice && (
              <span className={styles.savings}>
                💰 You save{" "}
                {formatPrice(
                  calculateSavings(product.originalPrice, product.discountedPrice)
                )}
              </span>
            )}
          </div>

          {/* Availability */}
          <div className={styles.status}>
            <div className={styles.available}>
              <span className={styles.statusIcon}>{product.stock > 0 ? "✓" : "✗"}</span>
              <span>{product.availability}</span>
            </div>
            <p className={styles.stockInfo}>
              <Package size={16} />{" "}
              {product.stock > 0
                ? `${product.stock} units available nearby`
                : "Out of stock"}
            </p>
          </div>

          {/* Quantity */}
          <div className={styles.quantitySection}>
            <label htmlFor="quantity" className={styles.quantityLabel}>
              Quantity:
            </label>
            <div className={styles.quantityControls}>
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className={styles.quantityBtn}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 1)
                }
                className={styles.quantityInput}
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
            <span className={styles.quantityHint}>Max: {product.stock}</span>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button
              className={styles.cartBtn}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className={styles.chatBtn} onClick={handleChatClick}>
              <MessageCircle size={20} /> Chat with Us
            </button>
            {similarProducts.length > 0 && (
              <button className={styles.altBtn} onClick={handleViewAlternatives}>
                View Alternatives
              </button>
            )}
          </div>

          {/* Details */}
          <div className={styles.detailsCard}>
            <h3>Product Details</h3>
            <ul className={styles.detailsList}>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Group:</strong> {product.group}</li>
              <li><strong>Delivery:</strong> {product.delivery}</li>
              <li><strong>Pickup:</strong> {product.pickup}</li>
              <li><strong>Payment Options:</strong> {product.paymentOptions.join(", ")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs} role="tablist">
        <button
          className={`${styles.tab} ${
            activeTab === "description" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "reviews" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "description" ? (
          <div id="description-panel" className={styles.description}>
            <h3>Product Description</h3>
            <p className={styles.shortDesc}>{product.description}</p>

            {product.fullDescription && (
              <p className={styles.fullDesc}>{product.fullDescription}</p>
            )}

            {product.howToUse && (
              <div className={styles.howToUse}>
                <h4>How to Use</h4>
                <p>{product.howToUse}</p>
              </div>
            )}

            {product.ingredients && product.ingredients.length > 0 && (
              <div className={styles.ingredients}>
                <h4>Key Ingredients</h4>
                <ul>
                  {product.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div id="reviews-panel" className={styles.reviews}>
            <h3>Customer Reviews</h3>
            <div className={styles.noReviews}>
              <p>No reviews yet.</p>
              <p>Be the first to review this product!</p>
              <button className={styles.writeReviewBtn}>Write a Review</button>
            </div>
          </div>
        )}
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section id="similar-products" className={styles.similar}>
          <h3>You Might Also Like</h3>
          <div className={styles.similarGrid}>
            {similarProducts.map((item) => (
              <article
                key={item.id}
                className={styles.similarCard}
                onClick={() => handleSimilarProductClick(item.id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSimilarProductClick(item.id)
                }
              >
                <div className={styles.similarImageWrapper}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  {item.discount > 0 && (
                    <div className={styles.similarDiscount}>-{item.discount}%</div>
                  )}
                </div>
                <div className={styles.similarInfo}>
                  <span className={styles.similarCategory}>{item.category}</span>
                  <h4 className={styles.similarTitle}>{item.title}</h4>
                  <div className={styles.similarPrice}>
                    <span className={styles.currentPrice}>
                      {formatPrice(item.discountedPrice)}
                    </span>
                    {item.originalPrice > item.discountedPrice && (
                      <span className={styles.oldPrice}>
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    className={styles.viewBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSimilarProductClick(item.id);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ShopDetails;