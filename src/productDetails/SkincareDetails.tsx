// ===============================================================
// 🧴 SkincareDetails.tsx — Controller + View (MVC Compliant)
// - Handles detailed skincare product view
// - DRY, type-safe, and consistent with data model
// ===============================================================

import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Star,
  Minus,
  Plus,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";

// --- Contexts ---
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// --- Data / Model Imports ---
import {
  getProductById,
  getRelatedProducts,
  formatPrice,
  getStockStatus,
  isInStock,
  isLowStock,
  type Product,
} from "../data/DermaData";

import styles from "./DermaDetails.module.css";

// ===============================================================
// ⭐ Reusable View Helpers
// ===============================================================

interface StarRatingProps {
  rating: number;
  reviewCount: number;
  showCount?: boolean;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  showCount = true,
  size = 16,
}) => {
  const roundedRating = Math.round(rating);
  return (
    <div className={styles.ratingSection}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={star <= roundedRating ? styles.starFilled : styles.starEmpty}
            fill={star <= roundedRating ? "currentColor" : "none"}
          />
        ))}
      </div>
      {showCount && (
        <span className={styles.ratingText}>
          {rating.toFixed(1)} ({reviewCount} reviews)
        </span>
      )}
    </div>
  );
};

interface TrustBadgeProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon: Icon, title, subtitle }) => (
  <div className={styles.badge}>
    <Icon size={20} />
    <div>
      <strong>{title}</strong>
      <span>{subtitle}</span>
    </div>
  </div>
);

// ===============================================================
// 🎯 Main Component (Controller + View)
// ===============================================================

const SkincareDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // ---------------------------------------------------------------
  // 🔍 Fetch product data
  // ---------------------------------------------------------------
  useEffect(() => {
    if (!id) return;

    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
      setRelatedProducts(getRelatedProducts(id, 4));
      setQuantity(1);
      setSelectedImageIndex(0);
      window.scrollTo(0, 0);
    } else {
      setProduct(null);
      setRelatedProducts([]);
    }
  }, [id]);

  // ---------------------------------------------------------------
  // ⚙️ Derived state & helpers
  // ---------------------------------------------------------------
  const isAvailable = product ? isInStock(product) : false;
  const stockMessage = product ? getStockStatus(product) : "";
  const isLow = product ? isLowStock(product) : false;
  const isWishlisted = product ? isInWishlist(product.id) : false;

  // ---------------------------------------------------------------
  // 🧠 Handlers (Controller Logic)
  // ---------------------------------------------------------------
  const handleQuantityChange = useCallback(
    (delta: number) => {
      if (!product) return;
      setQuantity((prev) => {
        const newQty = prev + delta;
        return Math.max(1, Math.min(newQty, product.stockCount));
      });
    },
    [product]
  );

  const handleAddToCart = useCallback(() => {
    if (!product || !isAvailable) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
    toast.success(`${quantity} x ${product.name} added to cart!`);
  }, [product, quantity, addToCart, isAvailable]);

  const handleAddToWishlist = useCallback(() => {
    if (!product) return;
    addToWishlist({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    });
    toast.success(isWishlisted ? "Removed from wishlist 💔" : "Added to wishlist ❤️", {
      duration: 2000,
    });
  }, [product, addToWishlist, isWishlisted]);

  const handleBuyNow = useCallback(() => {
    if (!isAvailable) return;
    handleAddToCart();
    navigate("/checkout");
  }, [handleAddToCart, navigate, isAvailable]);

  const handleImageNavigation = useCallback(
    (direction: "prev" | "next") => {
      if (!product) return;
      setSelectedImageIndex((prev) => {
        const maxIndex = product.images.length - 1;
        if (direction === "prev") {
          return prev === 0 ? maxIndex : prev - 1;
        } else {
          return prev === maxIndex ? 0 : prev + 1;
        }
      });
    },
    [product]
  );

  // ---------------------------------------------------------------
  // 🖼️ Render View
  // ---------------------------------------------------------------
  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>😔 Product Not Found</h1>
        <p>The product you are looking for doesn’t exist or was removed.</p>
        <Link to="/shop" className={styles.backBtn}>
          <ChevronLeft size={16} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span className={styles.currentBreadcrumb}>{product.name}</span>
      </nav>

      {/* Product Main */}
      <div className={styles.productMain}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImageWrapper}>
            {product.discount && <div className={styles.discountBadge}>-{product.discount}%</div>}
            {product.isNew && <div className={styles.newBadge}>NEW</div>}

            <img
              src={product.images[selectedImageIndex] || product.image}
              alt={product.name}
              className={styles.mainImage}
            />

            {product.images.length > 1 && (
              <>
                <button
                  className={`${styles.navBtn} ${styles.navBtnPrev}`}
                  onClick={() => handleImageNavigation("prev")}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className={`${styles.navBtn} ${styles.navBtnNext}`}
                  onClick={() => handleImageNavigation("next")}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`${styles.thumbnail} ${idx === selectedImageIndex ? styles.thumbnailActive : ""}`}
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className={styles.productInfo}>
          <div className={styles.brand}>{product.brand}</div>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.sku}>SKU: {product.id}</p>

          <StarRating rating={product.rating} reviewCount={product.reviewCount} />

          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>{formatPrice(product.price, product.currency)}</span>
            {product.oldPrice && (
              <span className={styles.oldPrice}>{formatPrice(product.oldPrice, product.currency)}</span>
            )}
            {product.discount && <span className={styles.saveAmount}>Save {product.discount}%</span>}
          </div>

          <p className={styles.shortDescription}>{product.shortDescription || product.description}</p>

          <div className={styles.stockSection}>
            {isAvailable ? (
              <div className={isLow ? styles.lowStock : styles.inStock}>
                <Check size={18} />
                <span>{stockMessage}</span>
              </div>
            ) : (
              <div className={styles.outOfStock}>
                <X size={18} />
                <span>
                  {product.restockDate
                    ? `Out of Stock (Restock: ${new Date(product.restockDate).toLocaleDateString()})`
                    : "Out of Stock"}
                </span>
              </div>
            )}
          </div>

          <hr className={styles.separator} />

          {/* Quantity */}
          {isAvailable && (
            <div className={styles.quantitySection}>
              <strong>Quantity:</strong>
              <div className={styles.quantityControl}>
                <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className={styles.qtyBtn}>
                  <Minus size={16} />
                </button>
                <span className={styles.qtyDisplay}>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                  className={styles.qtyBtn}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button className={styles.addToCartBtn} onClick={handleAddToCart} disabled={!isAvailable}>
              <ShoppingCart size={20} />
              {isAvailable ? "Add to Cart" : "Unavailable"}
            </button>
            <button className={styles.buyNowBtn} onClick={handleBuyNow} disabled={!isAvailable}>
              Buy Now
            </button>
            <button
              className={`${styles.wishlistBtn} ${isWishlisted ? styles.inWishlist : ""}`}
              onClick={handleAddToWishlist}
              aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
            <button className={styles.shareBtn} aria-label="Share Product">
              <Share2 size={20} />
            </button>
          </div>

          <div className={styles.trustBadges}>
            <TrustBadge icon={Truck} title="Free Delivery" subtitle="On orders over KSh 3,000" />
            <TrustBadge icon={Shield} title="100% Authentic" subtitle="Guaranteed genuine products" />
            <TrustBadge icon={RotateCcw} title="Easy Returns" subtitle="30-day return policy" />
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className={styles.relatedSection}>
          <h2>You May Also Like</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((relProd) => (
              <Link
                key={relProd.id}
                to={`/product/${relProd.id}`}
                className={styles.relatedCard}
                onClick={() => navigate(`/product/${relProd.id}`)}
              >
                {relProd.discount && <div className={styles.discountBadge}>-{relProd.discount}%</div>}
                <img src={relProd.image} alt={relProd.name} />
                <div className={styles.relatedInfo}>
                  <p className={styles.relatedBrand}>{relProd.brand}</p>
                  <p className={styles.relatedName}>{relProd.name}</p>
                  <StarRating rating={relProd.rating} reviewCount={relProd.reviewCount} size={12} />
                  <div className={styles.relatedPrice}>
                    <span>{formatPrice(relProd.price, relProd.currency)}</span>
                    {relProd.oldPrice && (
                      <span className={styles.relatedOldPrice}>{formatPrice(relProd.oldPrice, relProd.currency)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkincareDetails;

