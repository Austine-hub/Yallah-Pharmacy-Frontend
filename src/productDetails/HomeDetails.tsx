// ===============================================================
// ✅ HomeDetails.tsx — Robust, Type-Safe, and Fully Corrected (2025)
// ===============================================================

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ShoppingCart,
  MessageCircle,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import styles from "./HomeDetails.module.css";

// Data/model utilities
import {
  getProductById,
  getSimilarProducts,
  formatPrice,
  isInStock,
} from "../data/HomeData";

// Context
import { useCart } from "../context/CartContext";

// Components
import ProductImage from "../components/ProductImage";
import Loader from "../components/Loader";

// ✅ Type import (ensure Product type includes mrp?, variation?)
import type { Product } from "../utils/types";

const HomeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const [activeTab, setActiveTab] = useState<"description" | "features" | "specs">("description");
  const [quantity, setQuantity] = useState<number>(1);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  // Data lookups
  const product: Product | undefined = id ? getProductById(Number(id)) : undefined;
  const similarProducts: Product[] = id ? getSimilarProducts(Number(id), 4) : [];
  const inStock = product ? isInStock(product.id) : false;

  // Simulate loader
  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => setPageLoading(false), 300);
    return () => clearTimeout(timer);
  }, [id]);

  // Reset state when product changes
  useEffect(() => {
    setQuantity(1);
    setActiveTab("description");
  }, [id]);

  // ✅ Add to Cart
  const handleAddToCart = () => {
    if (!product) return;

    if (!inStock) {
      toast.error("Sorry — this product is currently out of stock.");
      return;
    }

    const cartItem = {
      id: product.id.toString(),
      name: product.name,
      price: Math.max(0, product.price),
      image: product.image,
      quantity: Math.max(1, Math.trunc(quantity)),
      category: product.category,
      description: product.description ?? "",
      variation: product.variation ?? "Standard",
      inStock: true,
      originalPrice:
        product.mrp && product.mrp > product.price ? product.mrp : undefined,
      discount:
        product.mrp && product.mrp > product.price
          ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
          : undefined,
    };

    addToCart(cartItem);

    toast.success(`${quantity} × ${product.name} added to cart!`, {
      icon: "🛒",
      duration: 2000,
    });

    setTimeout(() => openCart(), 200);
  };

  // Quantity controls
  const incrementQuantity = () => {
    if (!product) return;
    setQuantity((q) => Math.min(product.stock, q + 1));
  };

  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10) || 1;
    if (!product) {
      setQuantity(Math.max(1, val));
    } else {
      setQuantity(Math.min(product.stock, Math.max(1, val)));
    }
  };

  const handleSimilarProductClick = (productId: number) => {
    navigate(`/home-product/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChatClick = () => {
    const phone = "254796787207"; // +254796787207
    const url = `https://wa.me/${phone}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // ✅ Page Loader
  if (pageLoading) return <Loader mode="fullscreen" />;

  // ✅ 404 Fallback
  if (!product) {
    return (
      <div className={styles.notFound}>
        <AlertCircle size={64} className={styles.notFoundIcon} />
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate("/")} className={styles.backButton}>
          <ArrowLeft size={18} /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="breadcrumbs">
        <Link to="/">Home</Link>
        <span aria-hidden>/</span>
        <Link to="/#healthcare">Home Healthcare</Link>
        <span aria-hidden>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Product Section */}
      <div className={styles.productSection}>
        {/* Left: Image */}
        <div className={styles.imageContainer}>
          {product.trending && (
            <div className={styles.trendingBadge}>
              <TrendingUp size={16} />
              <span>Trending</span>
            </div>
          )}

          {!inStock && <div className={styles.outOfStockOverlay}>Out of Stock</div>}

          <ProductImage
            src={product.image}
            alt={product.name}
            className={styles.productImageWrapper}
            backdrop
          />
        </div>

        {/* Right: Info */}
        <div className={styles.infoContainer}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.productTitle}>{product.name}</h1>

          {product.brand && (
            <p className={styles.brand}>
              Brand: <strong>{product.brand}</strong>
            </p>
          )}

          <div className={styles.priceSection}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {product.mrp && product.mrp > product.price && (
              <span className={styles.mrp}>MRP: {formatPrice(product.mrp)}</span>
            )}
          </div>

          {/* Stock */}
          <div className={styles.stockSection}>
            {inStock ? (
              <div className={styles.inStock}>
                <CheckCircle size={16} />
                <span>
                  {product.stock} units in stock{" "}
                  {product.stock <= 50 && <strong>— Limited quantity!</strong>}
                </span>
              </div>
            ) : (
              <div className={styles.outOfStock}>
                <AlertCircle size={16} />
                <span>Currently out of stock</span>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          {inStock && (
            <div className={styles.quantitySection}>
              <label htmlFor="quantity" className={styles.quantityLabel}>
                Quantity:
              </label>
              <div className={styles.quantityControls}>
                <button onClick={decrementQuantity} disabled={quantity <= 1}>
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button onClick={incrementQuantity} disabled={quantity >= product.stock}>
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`${styles.addToCartBtn} ${!inStock ? styles.disabled : ""}`}
            >
              <ShoppingCart size={18} />
              <span>{inStock ? "Add to Cart" : "Out of Stock"}</span>
            </button>

            <button onClick={handleChatClick} className={styles.chatBtn}>
              <MessageCircle size={18} />
              <span>Chat with Us</span>
            </button>
          </div>

          {/* Key Features */}
          {product.features && product.features.length > 0 && (
            <div className={styles.highlights}>
              <h3>Key Features</h3>
              <ul>
                {product.features.map((f: string, i: number) => (
                  <li key={i}>
                    <CheckCircle size={14} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsSection}>
        <div className={styles.tabButtons}>
          <button
            className={activeTab === "description" ? styles.activeTab : ""}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>

          {product.features && product.features.length > 0 && (
            <button
              className={activeTab === "features" ? styles.activeTab : ""}
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
          )}

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <button
              className={activeTab === "specs" ? styles.activeTab : ""}
              onClick={() => setActiveTab("specs")}
            >
              Specifications
            </button>
          )}
        </div>

        <div className={styles.tabContent}>
          {activeTab === "description" && (
            <div className={styles.descriptionTab}>
              <h3>About This Product</h3>
              <p>{product.fullDescription || product.description}</p>

              {product.howToUse && (
                <>
                  <h4>How to Use</h4>
                  <p>{product.howToUse}</p>
                </>
              )}
            </div>
          )}

          {activeTab === "features" && product.features && (
            <div className={styles.featuresTab}>
              <h3>Product Features</h3>
              <ul>
                {product.features.map((f: string, i: number) => (
                  <li key={i}>
                    <CheckCircle size={14} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "specs" && product.specifications && (
            <div className={styles.specsTab}>
              <h3>Technical Specifications</h3>
              <table>
                <tbody>
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <tr key={k}>
                      <td className={styles.specKey}>{k}</td>
                      <td className={styles.specValue}>{String(v)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className={styles.similarSection}>
          <h2>You Might Also Like</h2>
          <div className={styles.similarGrid}>
            {similarProducts.map((item: Product) => (
              <div
                key={item.id}
                className={styles.similarCard}
                onClick={() => handleSimilarProductClick(item.id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSimilarProductClick(item.id);
                }}
              >
                {item.trending && <span className={styles.similarTrendingBadge}>🔥</span>}
                <img src={item.image} alt={item.name} className={styles.similarImage} />
                <div className={styles.similarCardInfo}>
                  <h4>{item.name}</h4>
                  <p>{item.category}</p>
                  <p className={styles.similarPrice}>{formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeDetails;
