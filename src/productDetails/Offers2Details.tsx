// ===============================================================
// ✅ Offers2Details.tsx — Unified, Clean, and Optimized Version
// ===============================================================

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import {
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  Shield,
  Truck,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Star,
  Plus,
  Minus,
} from "lucide-react";
import styles from "./Offers2Details.module.css";
import { OffersDataUtils, type ProductDetails } from "../data/OffersData";

// ===============================================================
// 🧴 Main Component
// ===============================================================

const Offers2Details: React.FC = () => {
  const { slugAndId } = useParams<{ slugAndId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  // ===============================================================
  // 📦 Fetch Product Data
  // ===============================================================
  useEffect(() => {
    const fetchProduct = () => {
      if (!slugAndId) {
        toast.error("Invalid product URL. Redirecting...");
        navigate("/", { replace: true });
        return;
      }

      // Extract product ID from slug-and-id format
      // Example: "panadol-extra-10s-4" → productId = "4"
      const parts = slugAndId.split("-");
      const productId = parts[parts.length - 1];

      console.log("Fetching product with ID:", productId);
      
      const fetchedProduct = OffersDataUtils.getProductById(productId);

      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setQuantity(1);
        setIsFavorite(false);
        console.log("Product loaded:", fetchedProduct);
      } else {
        toast.error("Product not found. Redirecting...");
        navigate("/", { replace: true });
      }

      setLoading(false);
    };

    fetchProduct();
  }, [slugAndId, navigate]);

  // ===============================================================
  // ⚙️ Handlers
  // ===============================================================
  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (!product) return;
    
    if (action === "increase" && quantity < product.stockCount) {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;    
        addToCart({
          id: String(product.id),   // 👈 convert to string
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
        });
    
    toast.success(`${quantity}x ${product.name} added to cart 🛒`, { duration: 2000 });
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    toast.success(isFavorite ? "Removed from favorites ❤️" : "Added to favorites 💖");
  };

  const handleShare = async () => {
    if (!product) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled or failed");
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy link");
      }
    }
  };

  const renderRatingStars = () => {
    const rating = product?.rating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return Array.from({ length: 5 }).map((_, i) => {
      const isFilled = i < fullStars;
      const isHalf = i === fullStars && hasHalfStar;
      
      return (
        <Star
          key={i}
          size={18}
          fill={isFilled ? "#FFA500" : "none"}
          stroke={isFilled || isHalf ? "#FFA500" : "#ccc"}
        />
      );
    });
  };

  // ===============================================================
  // 🖼️ Loading State
  // ===============================================================
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.error}>
        <AlertCircle size={48} />
        <h2>Product Not Found</h2>
        <button onClick={() => navigate("/")}>Return to Home</button>
      </div>
    );
  }

  // ===============================================================
  // 🎨 JSX Layout
  // ===============================================================
  return (
    <div className={styles.container}>
      {/* Back Navigation */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
        <span>Back to Products</span>
      </button>

      <div className={styles.productLayout}>
        {/* Left Column - Images */}
        <div className={styles.imageSection}>
          <div className={styles.mainImageWrapper}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.mainImage}
            />
            {product.isTrending && (
              <span className={styles.trendingBadge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                    fill="currentColor"
                  />
                </svg>
                Trending
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className={styles.stockStatus}>
            {product.inStock ? (
              <>
                <CheckCircle size={18} className={styles.inStockIcon} />
                <span>
                  In Stock ({product.stockCount}
                  {product.stockCount <= 5 ? " - Low stock!" : " available"})
                </span>
              </>
            ) : (
              <>
                <AlertCircle size={18} className={styles.outOfStockIcon} />
                <span>Out of Stock</span>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className={styles.detailsSection}>
          <div className={styles.productHeader}>
            <div>
              <p className={styles.brandName}>{product.brand}</p>
              <h1 className={styles.productTitle}>{product.name}</h1>
              <p className={styles.category}>{product.category}</p>
            </div>
            <div className={styles.actions}>
              <button
                className={`${styles.iconButton} ${isFavorite ? styles.favoriteActive : ""}`}
                onClick={toggleFavorite}
                aria-label="Add to favorites"
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button
                className={styles.iconButton}
                onClick={handleShare}
                aria-label="Share product"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Rating */}
          <div className={styles.rating}>
            <div className={styles.stars}>{renderRatingStars()}</div>
            <span className={styles.ratingText}>
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price & Cart Controls */}
          <div className={styles.priceSection}>
            <div className={styles.priceWrapper}>
              <span className={styles.price}>KES {product.price.toFixed(2)}</span>
              <span className={styles.priceLabel}>per unit</span>
            </div>

            <div className={styles.cartControls}>
              <div className={styles.quantitySelector}>
                <button
                  className={styles.qtyButton}
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className={styles.quantity}>{quantity}</span>
                <button
                  className={styles.qtyButton}
                  onClick={() => handleQuantityChange("increase")}
                  disabled={quantity >= product.stockCount || !product.inStock}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>

          {/* Features */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <Truck size={20} />
              <div>
                <strong>Free Delivery</strong>
                <p>On orders over KES 2,000</p>
              </div>
            </div>
            <div className={styles.feature}>
              <Shield size={20} />
              <div>
                <strong>Authentic Products</strong>
                <p>100% genuine guarantee</p>
              </div>
            </div>
            <div className={styles.feature}>
              <RotateCcw size={20} />
              <div>
                <strong>Easy Returns</strong>
                <p>7-day return policy</p>
              </div>
            </div>
          </div>

          {/* Product Description */}
          {product.longDescription && (
            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>Product Description</h2>
              <p className={styles.descriptionText}>{product.longDescription}</p>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className={styles.infoSection}>
              <h2 className={styles.sectionTitle}>Ingredients</h2>
              <ul className={styles.list}>
                {product.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Usage */}
          {product.usage && product.usage.length > 0 && (
            <div className={styles.infoSection}>
              <h2 className={styles.sectionTitle}>How to Use</h2>
              <ol className={styles.orderedList}>
                {product.usage.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Warnings */}
          {product.warnings && product.warnings.length > 0 && (
            <div className={styles.warningSection}>
              <h2 className={styles.sectionTitle}>
                <AlertCircle size={20} /> Important Information
              </h2>
              <ul className={styles.warningList}>
                {product.warnings.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProductsSection
        currentId={String(product.id)}
        category={product.category}
        navigate={navigate}
      />
    </div>
  );
};

// ===============================================================
// 💡 Related Products Section
// ===============================================================
interface RelatedProductsProps {
  currentId: string;
  category: string;
  navigate: ReturnType<typeof useNavigate>;
}

const RelatedProductsSection: React.FC<RelatedProductsProps> = ({
  currentId,
  category,
  navigate,
}) => {
  const relatedProducts = OffersDataUtils.getRelatedProducts(currentId, category);
  
  if (relatedProducts.length === 0) return null;

  return (
    <>
      <hr className={styles.separator} />
      <div className={styles.relatedProductsContainer}>
        <h2 className={styles.relatedTitle}>Related Products in {category}</h2>
        <div className={styles.relatedGrid}>
          {relatedProducts.map((item) => (
            <div
              key={item.id}
              className={styles.relatedCard}
              onClick={() => navigate(OffersDataUtils.getProductURL(item.id))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(OffersDataUtils.getProductURL(item.id));
                }
              }}
            >
              <img src={item.image} alt={item.name} className={styles.relatedImage} />
              <p className={styles.relatedName}>{item.name}</p>
              <p className={styles.relatedPrice}>KES {item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Offers2Details;