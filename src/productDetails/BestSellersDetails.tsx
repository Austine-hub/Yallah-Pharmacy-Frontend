// src/productDetails/BestSellersDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart, ShoppingCart, Share2, Package, Leaf, Star, ChevronLeft, Truck, Shield, RotateCcw } from "lucide-react";
import { bestSellersData } from "../data/BestSellersData";
import styles from "./BestSellersDetails.module.css";

const BestSellersDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = bestSellersData.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "ingredients" | "reviews">("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Check localStorage for favorites
  useEffect(() => {
    if (product) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.includes(product.id));
    }
  }, [product]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <h2>Product Not Found</h2>
          <p>We couldn't find the product you're looking for.</p>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            <ChevronLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = isFavorite
      ? favorites.filter((fav: string) => fav !== product.id)
      : [...favorites, product.id];
    
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
      icon: isFavorite ? "💔" : "❤️",
    });
  };

  const addToCart = () => {
    toast.success(`${product.name} added to cart`, {
      duration: 3000,
      position: "bottom-center",
    });
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
  ).slice(0, 4);

  // Mock images array (in real app, product would have multiple images)
  const productImages = [product.image, product.image, product.image];

  return (
    <div className={styles.pageWrapper}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <button onClick={() => navigate(-1)} className={styles.breadcrumbLink}>
          <ChevronLeft size={16} />
          Back
        </button>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link to="/bestsellers" className={styles.breadcrumbLink}>Best Sellers</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{product.category}</span>
      </nav>

      <section className={styles.detailsSection}>
        <div className={styles.container}>
          <div className={styles.productGrid}>
            {/* Left Column - Images */}
            <div className={styles.imageSection}>
              <div className={styles.imageThumbnails}>
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${selectedImage === index ? styles.thumbnailActive : ""}`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                  </button>
                ))}
              </div>

              <div className={styles.mainImageWrapper}>
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name} 
                  className={`${styles.mainImage} ${isImageZoomed ? styles.imageZoomed : ""}`}
                  onClick={() => setIsImageZoomed(!isImageZoomed)}
                  role="button"
                  tabIndex={0}
                  aria-label="Click to zoom image"
                />
                <button
                  className={styles.favoriteButton}
                  onClick={toggleFavorite}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    size={24}
                    fill={isFavorite ? "#e53e3e" : "none"}
                    stroke={isFavorite ? "#e53e3e" : "#fff"}
                    strokeWidth={2}
                  />
                </button>
              </div>

              {/* Trust Badges */}
              <div className={styles.trustBadges}>
                <div className={styles.badge}>
                  <Truck size={20} />
                  <span>Free Shipping</span>
                </div>
                <div className={styles.badge}>
                  <Shield size={20} />
                  <span>Secure Payment</span>
                </div>
                <div className={styles.badge}>
                  <RotateCcw size={20} />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className={styles.infoSection}>
              <div className={styles.productHeader}>
                <div>
                  <span className={styles.category}>{product.category}</span>
                  <h1 className={styles.productName}>{product.name}</h1>
                </div>
                
                {/* Rating */}
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < 4 ? "#fbbf24" : "none"} 
                      stroke="#fbbf24"
                    />
                  ))}
                  <span className={styles.ratingText}>(127 reviews)</span>
                </div>
              </div>

              <p className={styles.description}>{product.description}</p>

              {/* Price Section */}
              <div className={styles.priceSection}>
                <div className={styles.priceWrapper}>
                  <span className={styles.price}>Kes. {product.price.toFixed(2)}</span>
                  <span className={styles.priceOriginal}>Kes. {(product.price * 1.2).toFixed(2)}</span>
                  <span className={styles.discount}>Save 20%</span>
                </div>
                <p className={styles.inStock}>✓ In Stock</p>
              </div>

              {/* Quantity & Add to Cart */}
              <div className={styles.purchaseSection}>
                <div className={styles.quantityWrapper}>
                  <label htmlFor="quantity" className={styles.quantityLabel}>
                    Quantity
                  </label>
                  <div className={styles.quantityControl}>
                    <button 
                      onClick={decreaseQty} 
                      aria-label="Decrease quantity"
                      className={styles.quantityButton}
                    >
                      −
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className={styles.quantityInput}
                      min="1"
                      aria-label="Product quantity"
                    />
                    <button 
                      onClick={increaseQty} 
                      aria-label="Increase quantity"
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button className={styles.addToCartButton} onClick={addToCart}>
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>

                <button 
                  className={styles.shareButton} 
                  onClick={shareProduct}
                  aria-label="Share product"
                >
                  <Share2 size={20} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button className={styles.buyNowButton}>
                Buy Now
              </button>
            </div>
          </div>

          {/* Tabs Section */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabsList} role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === "description"}
                aria-controls="description-panel"
                className={`${styles.tab} ${activeTab === "description" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("description")}
              >
                <Package size={18} />
                <span>Description</span>
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "ingredients"}
                aria-controls="ingredients-panel"
                className={`${styles.tab} ${activeTab === "ingredients" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("ingredients")}
              >
                <Leaf size={18} />
                <span>Ingredients</span>
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "reviews"}
                aria-controls="reviews-panel"
                className={`${styles.tab} ${activeTab === "reviews" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                <Star size={18} />
                <span>Reviews</span>
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === "description" && (
                <div id="description-panel" role="tabpanel">
                  <h2 className={styles.tabHeading}>Product Description</h2>
                  <p className={styles.tabText}>
                    {product.usage || "This premium product is carefully crafted to deliver exceptional results. Perfect for daily use, it combines quality ingredients with innovative formulation to meet your needs."}
                  </p>
                </div>
              )}
              
              {activeTab === "ingredients" && (
                <div id="ingredients-panel" role="tabpanel">
                  <h2 className={styles.tabHeading}>Ingredients</h2>
                  {product.ingredients && product.ingredients.length > 0 ? (
                    <ul className={styles.ingredientsList}>
                      {product.ingredients.map((ing, i) => (
                        <li key={i} className={styles.ingredientItem}>
                          <span className={styles.ingredientBullet}>•</span>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.tabText}>Ingredient information coming soon.</p>
                  )}
                </div>
              )}
              
              {activeTab === "reviews" && (
                <div id="reviews-panel" role="tabpanel">
                  <h2 className={styles.tabHeading}>Customer Reviews</h2>
                  <div className={styles.reviewsEmpty}>
                    <Star size={48} stroke="#cbd5e0" />
                    <p>No reviews yet</p>
                    <button className={styles.reviewButton}>Be the first to review</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Similar Items */}
          {similarItems.length > 0 && (
            <section className={styles.similarSection}>
              <h2 className={styles.sectionHeading}>You May Also Like</h2>
              <div className={styles.similarGrid}>
                {similarItems.map((item) => (
                  <article key={item.id} className={styles.similarCard}>
                    <Link to={`/bestsellers/${item.id}`} className={styles.similarLink}>
                      <div className={styles.similarImageWrapper}>
                        <img src={item.image} alt={item.name} loading="lazy" />
                      </div>
                      <div className={styles.similarInfo}>
                        <h3 className={styles.similarName}>{item.name}</h3>
                        <p className={styles.similarCategory}>{item.category}</p>
                        <div className={styles.similarPrice}>Kes. {item.price.toFixed(2)}</div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
};

export default BestSellersDetails;