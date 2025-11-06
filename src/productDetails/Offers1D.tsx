import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ShoppingCart,
  MessageCircle,
  Package,
  Heart,
  Share2,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { getProductById, getSimilarProducts } from "../data/Offers1";
import { useCart } from "../context/CartContext";
import styles from "./Offers1D.module.css";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = id ? getProductById(id) : undefined;
  const similarProducts = id ? getSimilarProducts(id) : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product Not Found</h1>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          Return to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} units available!`);
      return;
    }

    addToCart({
      id: product.id,
      name: product.title,
      price: product.discountedPrice,
      image: product.image,
      quantity: quantity,
    });

    toast.success(`${quantity} × ${product.title} added to cart!`, {
      duration: 3000,
      icon: "🛒",
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleChatClick = () => {
    toast("Chat feature coming soon! 💬", { icon: "💬" });
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist!", {
      icon: isWishlisted ? "💔" : "❤️",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleViewAlternatives = () => {
    const section = document.getElementById("similar-products");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const savingsAmount = product.originalPrice - product.discountedPrice;
  const savingsPercentage = ((savingsAmount / product.originalPrice) * 100).toFixed(0);

  return (
    <div className={styles.container}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/beauty">Beauty & Personal Care</Link>
        <ChevronRight size={14} />
        <span className={styles.current}>{product.title}</span>
      </nav>

      {/* Top Section */}
      <div className={styles.topSection}>
        {/* Image */}
        <div className={styles.imageContainer}>
          <div className={styles.discountBadge} aria-label={`${product.discount}% off`}>
            {product.discount}% OFF
          </div>
          <img src={product.image} alt={product.title} />
        </div>

        {/* Product Info */}
        <div className={styles.infoContainer}>
          <div className={styles.metaHeader}>
            <span className={styles.category}>{product.category}</span>
            <div className={styles.metaActions}>
              <button
                className={styles.iconBtn}
                onClick={handleWishlistToggle}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
              <button className={styles.iconBtn} onClick={handleShare} aria-label="Share">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <h1 className={styles.productName}>{product.title}</h1>

          <div className={styles.priceSection}>
            <div className={styles.priceGroup}>
              <span className={styles.price}>
                KES {product.discountedPrice.toLocaleString()}
              </span>
              <span className={styles.originalPrice}>
                KES {product.originalPrice.toLocaleString()}
              </span>
            </div>
            <div className={styles.savingsBadge}>
              Save KES {savingsAmount.toLocaleString()} ({savingsPercentage}%)
            </div>
          </div>

          {/* Stock and Status */}
          <div className={styles.status}>
            <div className={styles.available}>
              <span className={styles.statusIcon}>✓</span>
              {product.availability}
            </div>
            <p className={styles.stockInfo}>
              <Package size={16} />
              {product.stock > 10
                ? `${product.stock} units available`
                : `Only ${product.stock} left in stock!`}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className={styles.quantitySection}>
            <label htmlFor="quantity">Quantity:</label>
            <div className={styles.quantityControls}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setQuantity(Math.min(product.stock, Math.max(1, value)));
                }}
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <span className={styles.quantityHint}>Max: {product.stock} units</span>
          </div>

          {/* Buttons */}
          <div className={styles.actions}>
            <button className={styles.buyNowBtn} onClick={handleBuyNow}>
              Buy Now
            </button>
            <button className={styles.cartBtn} onClick={handleAddToCart}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className={styles.chatBtn} onClick={handleChatClick}>
              <MessageCircle size={20} /> Chat
            </button>
          </div>

          {similarProducts.length > 0 && (
            <button className={styles.altBtn} onClick={handleViewAlternatives}>
              View Similar Products
            </button>
          )}

          {/* Details Section */}
          <div className={styles.detailsCard}>
            <h3>Product Information</h3>
            <dl className={styles.detailsList}>
              <div className={styles.detailItem}>
                <dt>Category</dt>
                <dd>{product.category}</dd>
              </div>
              <div className={styles.detailItem}>
                <dt>Group</dt>
                <dd>{product.group}</dd>
              </div>
              <div className={styles.detailItem}>
                <dt>Delivery</dt>
                <dd>{product.delivery}</dd>
              </div>
              <div className={styles.detailItem}>
                <dt>Pickup</dt>
                <dd>{product.pickup}</dd>
              </div>
              <div className={styles.detailItem}>
                <dt>Payment Options</dt>
                <dd>{product.paymentOptions.join(" • ")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Tabs */}
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
          <div className={styles.description}>
            <h2>Product Description</h2>
            <p className={styles.shortDesc}>{product.description}</p>
            {product.fullDescription && <p>{product.fullDescription}</p>}
            {product.howToUse && (
              <div>
                <h3>How to Use</h3>
                <p>{product.howToUse}</p>
              </div>
            )}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h3>Key Ingredients</h3>
                <ul>
                  {product.ingredients.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        ) : (
          <div className={styles.reviews}>
            <h2>Customer Reviews</h2>
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
        <section className={styles.similar} id="similar-products">
          <h2>You Might Also Like</h2>
          <div className={styles.similarGrid}>
            {similarProducts.map((item) => (
              <article
                key={item.id}
                className={styles.similarCard}
                onClick={() => navigate(`/product/${item.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/product/${item.id}`);
                  }
                }}
              >
                <div className={styles.similarImageWrapper}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className={styles.similarDiscount}>-{item.discount}%</div>
                </div>
                <div className={styles.similarInfo}>
                  <span className={styles.similarCategory}>{item.category}</span>
                  <h3>{item.title}</h3>
                  <div className={styles.similarPrice}>
                    <span className={styles.currentPrice}>
                      KES {item.discountedPrice.toLocaleString()}
                    </span>
                    <span className={styles.oldPrice}>
                      KES {item.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <button
                    className={styles.viewBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${item.id}`);
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

export default ProductDetails;
