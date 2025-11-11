import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ShoppingCart,
  MessageCircle,
  Heart,
  Share2,
  ChevronRight,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Check,
  X,
  ChevronLeft,
  ZoomIn,
} from "lucide-react";
import toast from "react-hot-toast";

// Model / data access
import { getProductById, getSimilarProducts } from "../data/Offers1";
import type { Product } from "../data/Offers1";

// Controller
import { useCart } from "../context/CartContext";

// Styles
import styles from "./Offers1D.module.css";

/**
 * Controller Hook
 */
function useProductController(productId?: string | null) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = useMemo(() => (productId ? getProductById(productId) : undefined), [productId]);
  const similarProducts = useMemo(() => (productId ? getSimilarProducts(productId) : []), [productId]);

  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "shipping">("description");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setIsWishlisted(false);
    setSelectedImage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} units available!`);
      return;
    }

    addToCart({
      id: product.id,
      name: product.title,
      price: product.discountedPrice,
      image: product.image,
      quantity,
    });

    toast.success(`${quantity} × ${product.title} added to cart!`, { duration: 2500, icon: "🛒" });
  }, [addToCart, product, quantity]);

  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    navigate("/cart");
  }, [handleAddToCart, navigate]);

  const handleChatClick = useCallback(() => {
    toast("Chat feature coming soon! 💬", { icon: "💬" });
  }, []);

  const handleWishlistToggle = useCallback(() => {
    setIsWishlisted((v) => !v);
    toast.success(!isWishlisted ? "Added to wishlist!" : "Removed from wishlist", {
      icon: !isWishlisted ? "❤️" : "💔",
    });
  }, [isWishlisted]);

  const handleShare = useCallback(async () => {
    if (!product) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.title, text: product.description, url: window.location.href });
      } catch (err) {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  }, [product]);

  const handleImageNavigation = useCallback((direction: 'prev' | 'next', totalImages: number) => {
    setSelectedImage(prev => {
      if (direction === 'prev') {
        return prev === 0 ? totalImages - 1 : prev - 1;
      }
      return prev === totalImages - 1 ? 0 : prev + 1;
    });
  }, []);

  return {
    product,
    similarProducts,
    activeTab,
    setActiveTab,
    quantity,
    setQuantity,
    isWishlisted,
    selectedImage,
    setSelectedImage,
    isImageZoomed,
    setIsImageZoomed,
    handleAddToCart,
    handleBuyNow,
    handleChatClick,
    handleWishlistToggle,
    handleShare,
    handleImageNavigation,
  } as const;
}

/**
 * Presentational Components
 */
const Breadcrumbs: React.FC<{ product: Product }> = ({ product }) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
    <Link to="/" className={styles.breadcrumbLink}>Home</Link>
    <ChevronRight size={16} className={styles.breadcrumbSeparator} />
    <Link to="/beauty" className={styles.breadcrumbLink}>Beauty & Personal Care</Link>
    <ChevronRight size={16} className={styles.breadcrumbSeparator} />
    <span className={styles.breadcrumbCurrent} aria-current="page">
      {product.title}
    </span>
  </nav>
);

const ImageGallery: React.FC<{
  images: string[];
  selected: number;
  onSelect: (idx: number) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  discount?: number;
  title: string;
  isZoomed: boolean;
  onZoomToggle: () => void;
}> = ({ images, selected, onSelect, onNavigate, discount, title, isZoomed, onZoomToggle }) => (
  <div className={styles.gallerySection}>
    <div className={styles.mainImageContainer}>
      {discount && discount > 0 && (
        <div className={styles.discountBadge} aria-label={`${discount}% discount`}>
          <span>{discount}%</span>
          <span className={styles.discountText}>OFF</span>
        </div>
      )}
      
      <div className={`${styles.mainImageWrapper} ${isZoomed ? styles.zoomed : ''}`}>
        <img 
          src={images[selected]} 
          alt={`${title} - view ${selected + 1} of ${images.length}`} 
          className={styles.mainImage}
        />
        
        {images.length > 1 && (
          <>
            <button
              className={`${styles.imageNavBtn} ${styles.imagePrev}`}
              onClick={() => onNavigate('prev')}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              className={`${styles.imageNavBtn} ${styles.imageNext}`}
              onClick={() => onNavigate('next')}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        <button
          className={styles.zoomBtn}
          onClick={onZoomToggle}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          <ZoomIn size={20} />
        </button>
      </div>

      <div className={styles.imageIndicators} aria-label="Image position">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.indicator} ${selected === idx ? styles.activeIndicator : ''}`}
            onClick={() => onSelect(idx)}
            aria-label={`Go to image ${idx + 1}`}
            aria-current={selected === idx}
          />
        ))}
      </div>
    </div>

    {images.length > 1 && (
      <div className={styles.thumbnailGrid} role="list" aria-label="Product image thumbnails">
        {images.map((img, idx) => (
          <button
            key={idx}
            className={`${styles.thumbnail} ${selected === idx ? styles.activeThumbnail : ''}`}
            onClick={() => onSelect(idx)}
            aria-label={`View image ${idx + 1}`}
            role="listitem"
          >
            <img src={img} alt="" />
            {selected === idx && <div className={styles.thumbnailOverlay} />}
          </button>
        ))}
      </div>
    )}
  </div>
);

const RatingDisplay: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => (
  <div className={styles.ratingSection}>
    <div className={styles.stars} role="img" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={18} 
          className={i < Math.floor(rating) ? styles.starFilled : styles.starEmpty}
          fill={i < Math.floor(rating) ? "currentColor" : "none"}
        />
      ))}
    </div>
    <span className={styles.ratingText}>
      <strong>{rating}</strong> ({reviewCount.toLocaleString()} reviews)
    </span>
  </div>
);

const PriceDisplay: React.FC<{
  currentPrice: number;
  originalPrice: number;
}> = ({ currentPrice, originalPrice }) => {
  const savings = originalPrice - currentPrice;
  const savingsPercent = Math.round((savings / originalPrice) * 100);

  return (
    <div className={styles.priceBlock}>
      <div className={styles.priceRow}>
        <span className={styles.currentPrice}>
          KES {currentPrice.toLocaleString()}
        </span>
        {originalPrice > currentPrice && (
          <span className={styles.originalPrice}>
            KES {originalPrice.toLocaleString()}
          </span>
        )}
      </div>
      {savings > 0 && (
        <div className={styles.savingsBadge}>
          You save KES {savings.toLocaleString()} ({savingsPercent}%)
        </div>
      )}
    </div>
  );
};

const StockStatus: React.FC<{ stock: number }> = ({ stock }) => (
  <div className={styles.stockStatus}>
    {stock > 10 ? (
      <div className={styles.inStock}>
        <Check size={16} className={styles.stockIcon} />
        <span>In Stock ({stock} available)</span>
      </div>
    ) : stock > 0 ? (
      <div className={styles.lowStock}>
        <span className={styles.stockDot} />
        <span>Only {stock} left - Order soon!</span>
      </div>
    ) : (
      <div className={styles.outOfStock}>
        <X size={16} className={styles.stockIcon} />
        <span>Out of Stock</span>
      </div>
    )}
  </div>
);

const QuantitySelector: React.FC<{ 
  value: number; 
  max: number; 
  onChange: (v: number) => void;
  disabled?: boolean;
}> = ({ value, max, onChange, disabled = false }) => (
  <div className={styles.quantitySection}>
    <label htmlFor="quantity" className={styles.quantityLabel}>
      Quantity:
    </label>
    <div className={styles.quantityControls}>
      <button 
        onClick={() => onChange(Math.max(1, value - 1))} 
        disabled={value <= 1 || disabled} 
        aria-label="Decrease quantity"
        className={styles.quantityBtn}
      >
        -
      </button>
      <input
        id="quantity"
        type="number"
        min={1}
        max={max}
        value={value}
        onChange={(e) => {
          const parsed = Number(e.target.value) || 1;
          onChange(Math.min(max, Math.max(1, parsed)));
        }}
        disabled={disabled}
        aria-label="Product quantity"
        className={styles.quantityInput}
      />
      <button 
        onClick={() => onChange(Math.min(max, value + 1))} 
        disabled={value >= max || disabled} 
        aria-label="Increase quantity"
        className={styles.quantityBtn}
      >
        +
      </button>
    </div>
  </div>
);

const FeatureList: React.FC<{ delivery: string }> = ({ delivery }) => (
  <div className={styles.features}>
    <div className={styles.featureItem}>
      <div className={styles.featureIcon}>
        <Truck size={20} />
      </div>
      <div className={styles.featureContent}>
        <strong>Free Delivery</strong>
        <span>{delivery}</span>
      </div>
    </div>
    <div className={styles.featureItem}>
      <div className={styles.featureIcon}>
        <Shield size={20} />
      </div>
      <div className={styles.featureContent}>
        <strong>Secure Payment</strong>
        <span>100% secure transactions</span>
      </div>
    </div>
    <div className={styles.featureItem}>
      <div className={styles.featureIcon}>
        <RotateCcw size={20} />
      </div>
      <div className={styles.featureContent}>
        <strong>Easy Returns</strong>
        <span>7-day return policy</span>
      </div>
    </div>
  </div>
);

const SimilarProductsList: React.FC<{ items: Product[] }> = ({ items }) => {
  const navigate = useNavigate();
  
  if (items.length === 0) return null;

  return (
    <section className={styles.similarSection} aria-labelledby="similar-heading">
      <h2 id="similar-heading" className={styles.similarHeading}>You Might Also Like</h2>
      <div className={styles.similarGrid}>
        {items.map((item) => (
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
              {item.discount > 0 && (
                <div className={styles.similarDiscount}>-{item.discount}%</div>
              )}
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
            <div className={styles.similarContent}>
              <span className={styles.similarCategory}>{item.category}</span>
              <h3 className={styles.similarTitle}>{item.title}</h3>
              <div className={styles.similarPricing}>
                <span className={styles.similarPrice}>
                  KES {item.discountedPrice.toLocaleString()}
                </span>
                {item.originalPrice > item.discountedPrice && (
                  <span className={styles.similarOldPrice}>
                    KES {item.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

/**
 * Main Component
 */
const Offers1D: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ctrl = useProductController(id ?? null);

  const {
    product,
    similarProducts,
    activeTab,
    setActiveTab,
    quantity,
    setQuantity,
    isWishlisted,
    selectedImage,
    setSelectedImage,
    isImageZoomed,
    setIsImageZoomed,
    handleAddToCart,
    handleBuyNow,
    handleChatClick,
    handleWishlistToggle,
    handleShare,
    handleImageNavigation,
  } = ctrl;

  const productImages = useMemo(() => 
    product ? [product.image, product.image, product.image] : [], 
    [product?.image]
  );

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <h1>Product Not Found</h1>
          <p>Sorry, the product you're looking for doesn't exist.</p>
          <Link to="/" className={styles.backBtn}>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Breadcrumbs product={product} />

        <div className={styles.productSection}>
          <ImageGallery
            images={productImages}
            selected={selectedImage}
            onSelect={setSelectedImage}
            onNavigate={(dir) => handleImageNavigation(dir, productImages.length)}
            discount={product.discount}
            title={product.title}
            isZoomed={isImageZoomed}
            onZoomToggle={() => setIsImageZoomed(!isImageZoomed)}
          />

          <div className={styles.infoSection}>
            <div className={styles.topBar}>
              <span className={styles.categoryBadge}>{product.category}</span>
              <div className={styles.actionIcons}>
                <button
                  className={`${styles.iconBtn} ${isWishlisted ? styles.wishlisted : ''}`}
                  onClick={handleWishlistToggle}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                </button>

                <button 
                  className={styles.iconBtn} 
                  onClick={handleShare} 
                  aria-label="Share product"
                  title="Share"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <h1 className={styles.productTitle}>{product.title}</h1>

            <RatingDisplay rating={4.8} reviewCount={256} />

            <PriceDisplay 
              currentPrice={product.discountedPrice} 
              originalPrice={product.originalPrice} 
            />

            <StockStatus stock={product.stock} />

            <FeatureList delivery={product.delivery} />

            <QuantitySelector 
              value={quantity} 
              max={product.stock} 
              onChange={setQuantity}
              disabled={isOutOfStock}
            />

            <div className={styles.actionButtons}>
              <button 
                className={styles.buyNowBtn} 
                onClick={handleBuyNow} 
                aria-label="Buy now"
                disabled={isOutOfStock}
              >
                Buy Now
              </button>

              <button 
                className={styles.addToCartBtn} 
                onClick={handleAddToCart} 
                aria-label="Add to cart"
                disabled={isOutOfStock}
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
            </div>

            <button 
              className={styles.chatBtn} 
              onClick={handleChatClick} 
              aria-label="Chat with seller"
            >
              <MessageCircle size={20} />
              <span>Chat with Seller</span>
            </button>

            <div className={styles.detailsCard}>
              <h3 className={styles.detailsHeading}>Product Information</h3>
              <dl className={styles.detailsList}>
                <div className={styles.detailRow}>
                  <dt>Category</dt>
                  <dd>{product.category}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt>Group</dt>
                  <dd>{product.group}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt>Delivery</dt>
                  <dd>{product.delivery}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt>Pickup</dt>
                  <dd>{product.pickup}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt>Payment</dt>
                  <dd>{product.paymentOptions.join(", ")}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className={styles.tabsSection}>
          <div className={styles.tabsNav} role="tablist" aria-label="Product information tabs">
            {[
              { id: 'description', label: 'Description' },
              { id: 'reviews', label: 'Reviews (256)' },
              { id: 'shipping', label: 'Shipping & Returns' }
            ].map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                id={`${tab.id}-tab`}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {activeTab === "description" && (
              <div 
                className={styles.tabPanel} 
                role="tabpanel"
                id="description-panel"
                aria-labelledby="description-tab"
              >
                <h2 className={styles.panelHeading}>Product Description</h2>
                <p className={styles.description}>{product.description}</p>
                
                {product.fullDescription && (
                  <p className={styles.fullDescription}>{product.fullDescription}</p>
                )}
                
                {product.howToUse && (
                  <div className={styles.section}>
                    <h3 className={styles.sectionHeading}>How to Use</h3>
                    <p className={styles.sectionContent}>{product.howToUse}</p>
                  </div>
                )}
                
                {product.ingredients && product.ingredients.length > 0 && (
                  <div className={styles.section}>
                    <h3 className={styles.sectionHeading}>Key Ingredients</h3>
                    <ul className={styles.ingredientsList}>
                      {product.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div 
                className={styles.tabPanel} 
                role="tabpanel"
                id="reviews-panel"
                aria-labelledby="reviews-tab"
              >
                <h2 className={styles.panelHeading}>Customer Reviews</h2>
                <div className={styles.reviewsEmpty}>
                  <p>No reviews yet.</p>
                  <p>Be the first to review this product!</p>
                  <button className={styles.writeReviewBtn}>Write a Review</button>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div 
                className={styles.tabPanel} 
                role="tabpanel"
                id="shipping-panel"
                aria-labelledby="shipping-tab"
              >
                <h2 className={styles.panelHeading}>Shipping & Returns</h2>
                <div className={styles.section}>
                  <h3 className={styles.sectionHeading}>Delivery Information</h3>
                  <p className={styles.sectionContent}>{product.delivery}</p>
                  <p className={styles.sectionContent}>Standard delivery within 3-5 business days</p>
                </div>
                <div className={styles.section}>
                  <h3 className={styles.sectionHeading}>Return Policy</h3>
                  <p className={styles.sectionContent}>
                    7-day return policy. Items must be unused and in original packaging.
                  </p>
                </div>
                <div className={styles.section}>
                  <h3 className={styles.sectionHeading}>Pickup Options</h3>
                  <p className={styles.sectionContent}>{product.pickup}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <SimilarProductsList items={similarProducts} />
      </div>
    </div>
  );
};

export default Offers1D;