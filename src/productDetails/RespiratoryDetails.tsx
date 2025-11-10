// ===============================================================
// 💨 RespiratoryDetails.tsx — Enhanced Product Details
// ===============================================================

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { respiratoryProducts, type Product } from "../data/respiratoryData";
import styles from "./RespiratoryDetails.module.css";

const RespiratoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"features" | "description" | "usage">("features");

  // ✅ Find product by ID with loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundProduct = respiratoryProducts.find(
        (item) => item.id === Number(id)
      );
      
      if (!foundProduct) {
        toast.error("Product not found");
        navigate("/not-found");
      } else {
        setProduct(foundProduct);
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id, navigate]);

  // ✅ Memoized similar products
  const similarProducts = useMemo(() => {
    if (!product) return [];
    return respiratoryProducts
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // ✅ Quantity controls with validation
  const incrementQty = useCallback(() => {
    setQuantity((q) => Math.min(q + 1, 99));
  }, []);

  const decrementQty = useCallback(() => {
    setQuantity((q) => Math.max(q - 1, 1));
  }, []);

  const handleQuantityInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(value, 99)));
  }, []);

  // ✅ Add to cart with feedback
  const handleAddToCart = useCallback(() => {
    if (!product || product.stock !== "In Stock") return;
    
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      inStock: true,
    });
    
    toast.success(
      <div className={styles.toastContent}>
        <strong>{product.name}</strong>
        <span>Added {quantity} item(s) to cart</span>
      </div>,
      { duration: 3000 }
    );
  }, [addToCart, product, quantity]);

  // ✅ Navigate to similar product
  const handleSimilarProductClick = useCallback((productId: number) => {
    setImageLoaded(false);
    setQuantity(1);
    setActiveTab("features");
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  // ✅ Breadcrumb navigation
  const handleBreadcrumbClick = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  if (isLoading) {
    return (
      <section className={styles.container}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonImage}></div>
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonButton}></div>
          </div>
        </div>
      </section>
    );
  }

  if (!product) return null;

  const isInStock = product.stock === "In Stock";

  return (
    <section className={styles.container}>
      {/* ================= BREADCRUMB ================= */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <button onClick={() => handleBreadcrumbClick("/")} className={styles.breadcrumbLink}>
          Home
        </button>
        <span className={styles.breadcrumbSeparator}>/</span>
        <button onClick={() => handleBreadcrumbClick("/respiratory")} className={styles.breadcrumbLink}>
          Respiratory
        </button>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      {/* ================= PRODUCT DETAILS ================= */}
      <article className={styles.detailsSection}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            {!imageLoaded && <div className={styles.imagePlaceholder}></div>}
            <img
              src={product.image}
              alt={product.name}
              className={`${styles.productImage} ${imageLoaded ? styles.imageLoaded : ""}`}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
            />
          </div>
          
          {!isInStock && (
            <div className={styles.outOfStockBadge}>Out of Stock</div>
          )}
        </div>

        <div className={styles.infoWrapper}>
          <div className={styles.header}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.name}</h1>
          </div>

          <div className={styles.priceSection}>
            <span className={styles.price}>KES {product.price.toLocaleString()}</span>
            <span className={`${styles.stockBadge} ${isInStock ? styles.inStock : styles.outStock}`}>
              {isInStock ? "✓ In Stock" : "✕ Out of Stock"}
            </span>
          </div>

          {/* ================= TABS ================= */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabButtons} role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === "features"}
                className={`${styles.tabButton} ${activeTab === "features" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("features")}
              >
                Key Features
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "description"}
                className={`${styles.tabButton} ${activeTab === "description" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "usage"}
                className={`${styles.tabButton} ${activeTab === "usage" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("usage")}
              >
                Usage
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === "features" && (
                <ul className={styles.featuresList}>
                  <li>High efficacy for respiratory infections</li>
                  <li>Trusted quality pharmaceutical formulation</li>
                  <li>Used under medical prescription</li>
                  <li>Packaged safely to preserve potency</li>
                </ul>
              )}
              
              {activeTab === "description" && (
                <div className={styles.description}>
                  <p>This pharmaceutical product is specifically formulated to treat respiratory conditions. 
                  It contains active ingredients that target infection-causing pathogens and help restore 
                  normal respiratory function.</p>
                  <p>Manufactured under strict quality control standards to ensure safety and efficacy.</p>
                </div>
              )}
              
              {activeTab === "usage" && (
                <div className={styles.usage}>
                  <p><strong>Dosage:</strong> As prescribed by your healthcare provider</p>
                  <p><strong>Administration:</strong> Follow medical instructions carefully</p>
                  <p><strong>Storage:</strong> Keep in a cool, dry place away from direct sunlight</p>
                  <p className={styles.warning}>⚠️ Always consult with a healthcare professional before use</p>
                </div>
              )}
            </div>
          </div>

          {/* ================= QUANTITY CONTROL ================= */}
          <div className={styles.actionsSection}>
            <div className={styles.quantityControl}>
              <label htmlFor="quantity" className={styles.quantityLabel}>
                Quantity
              </label>
              <div className={styles.quantityButtons}>
                <button
                  onClick={decrementQty}
                  className={styles.qtyBtn}
                  aria-label="Decrease quantity"
                  disabled={!isInStock}
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityInput}
                  className={styles.quantityInput}
                  min="1"
                  max="99"
                  disabled={!isInStock}
                  aria-label="Product quantity"
                />
                <button
                  onClick={incrementQty}
                  className={styles.qtyBtn}
                  aria-label="Increase quantity"
                  disabled={!isInStock}
                >
                  +
                </button>
              </div>
            </div>

            {/* ================= ADD TO CART ================= */}
            <button
              onClick={handleAddToCart}
              className={`${styles.addToCartBtn} ${!isInStock ? styles.disabled : ""}`}
              disabled={!isInStock}
              aria-label={`Add ${product.name} to cart`}
            >
              <svg className={styles.cartIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {isInStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </article>

      {/* ================= SIMILAR PRODUCTS ================= */}
      {similarProducts.length > 0 && (
        <section className={styles.similarSection}>
          <h2 className={styles.similarTitle}>You May Also Like</h2>
          <div className={styles.similarGrid}>
            {similarProducts.map((item) => (
              <article
                key={item.id}
                className={styles.similarCard}
                onClick={() => handleSimilarProductClick(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSimilarProductClick(item.id);
                  }
                }}
              >
                <div className={styles.similarImageWrapper}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.similarImage}
                    loading="lazy"
                  />
                </div>
                <div className={styles.similarInfo}>
                  <h3 className={styles.similarName}>{item.name}</h3>
                  <p className={styles.similarPrice}>
                    KES {item.price.toLocaleString()}
                  </p>
                  <span className={styles.viewDetails}>View Details →</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default RespiratoryDetails;