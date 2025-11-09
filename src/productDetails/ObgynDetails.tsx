// ===============================================================
// ✅ OBGYNDetails.tsx — Controller + View Layer (2025)
// Harmonized with SexualHealthData.ts (Model)
// Mirrors HomeDetails.tsx structure, logic & style
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

// ===============================================================
// 🧠 MODEL IMPORTS (from SexualHealthData.ts)
// ===============================================================
import {
  SEXUAL_PRODUCTS,
  type Product,
} from "../data/OBGYNData";

// Utility helpers
const getProductById = (id: string): Product | undefined =>
  SEXUAL_PRODUCTS.find((p) => p.id.toString() === id);

const getSimilarProducts = (id: string, count = 4): Product[] => {
  const current = getProductById(id);
  if (!current) return [];
  return SEXUAL_PRODUCTS.filter(
    (p) => p.category === current.category && p.id.toString() !== id
  ).slice(0, count);
};

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;
const isInStock = (id: string) => {
  const product = getProductById(id);
  return product?.stock && product.stock > 0;
};

// ===============================================================
// 🛒 CART CONTEXT
// ===============================================================
import { useCart } from "../context/CartContext";

// ===============================================================
// 🎯 MAIN COMPONENT
// ===============================================================
const OBGYNDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const [activeTab, setActiveTab] = useState<"description" | "features" | "specs">("description");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const product = id ? getProductById(id) : undefined;
  const similarProducts = id ? getSimilarProducts(id, 4) : [];
  const inStock = id ? isInStock(id) : false;

  // ===============================================================
  // 🔄 EFFECTS
  // ===============================================================
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    setQuantity(1);
    setActiveTab("description");
  }, [id]);

  // ===============================================================
  // 🎮 CONTROLLER LOGIC
  // ===============================================================

  const handleAddToCart = () => {
    if (!product || !inStock) return;

    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      category: product.category,
      description: product.description,
      inStock: true,
    });

    toast.success(`${quantity} × ${product.name} added to cart!`, {
      icon: "🛒",
      duration: 2000,
    });

    openCart();
  };

  const incrementQuantity = () => {
    if (product && quantity < (product.stock ?? 1)) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    if (product) {
      setQuantity(Math.min(product.stock ?? 1, Math.max(1, value)));
    }
  };

  const handleSimilarProductClick = (productId: number) => {
    navigate(`/obgyn-product/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChatClick = () => {
    toast("💬 Chat support coming soon for OBGYN & Sexual Health products!", {
      duration: 3000,
    });
  };

  // ===============================================================
  // 🎨 RENDER
  // ===============================================================
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <AlertCircle size={64} className={styles.notFoundIcon} />
        <h2>Product Not Found</h2>
        <p>The selected product doesn't exist or has been removed.</p>
        <button onClick={() => navigate("/obgyn")} className={styles.backButton}>
          <ArrowLeft size={20} /> Back to OBGYN Shop
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/obgyn">OBGYN</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Product Section */}
      <div className={styles.productSection}>
        {/* Image */}
        <div className={styles.imageContainer}>
          {product.trending && (
            <div className={styles.trendingBadge}>
              <TrendingUp size={18} />
              <span>Trending</span>
            </div>
          )}
          {!inStock && <div className={styles.outOfStockOverlay}>Out of Stock</div>}
          <img src={product.image} alt={product.name} className={styles.productImage} />
        </div>

        {/* Info */}
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
            {product.oldPrice && (
              <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
            )}
            {product.discount && (
              <span className={styles.discount}>-{product.discount}%</span>
            )}
          </div>

          <div className={styles.stockSection}>
            {inStock ? (
              <div className={styles.inStock}>
                <CheckCircle size={18} />
                <span>
                  {product.stock} units available{" "}
                  {product.stock && product.stock <= 50 && " - Limited stock!"}
                </span>
              </div>
            ) : (
              <div className={styles.outOfStock}>
                <AlertCircle size={18} />
                <span>Currently out of stock</span>
              </div>
            )}
          </div>

          {inStock && (
            <div className={styles.quantitySection}>
              <label htmlFor="quantity">Quantity:</label>
              <div className={styles.quantityControls}>
                <button onClick={decrementQuantity} disabled={quantity <= 1}>
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= (product.stock ?? 1)}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className={styles.actionButtons}>
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`${styles.addToCartBtn} ${!inStock ? styles.disabled : ""}`}
            >
              <ShoppingCart size={20} />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button onClick={handleChatClick} className={styles.chatBtn}>
              <MessageCircle size={20} />
              Chat with Us
            </button>
          </div>

          {product.features && product.features.length > 0 && (
            <div className={styles.highlights}>
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <CheckCircle size={16} />
                    {feature}
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
          {product.features && (
            <button
              className={activeTab === "features" ? styles.activeTab : ""}
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
          )}
          {product.specifications && (
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
              <p className={styles.fullDescription}>
                {product.fullDescription || product.description}
              </p>
              {product.howToUse && (
                <>
                  <h4>How to Use</h4>
                  <p className={styles.howToUse}>{product.howToUse}</p>
                </>
              )}
            </div>
          )}

          {activeTab === "features" && product.features && (
            <div className={styles.featuresTab}>
              <h3>Product Features</h3>
              <ul className={styles.featuresList}>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <CheckCircle size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "specs" && product.specifications && (
            <div className={styles.specsTab}>
              <h3>Technical Specifications</h3>
              <table className={styles.specsTable}>
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className={styles.specKey}>{key}</td>
                      <td className={styles.specValue}>{value}</td>
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
            {similarProducts.map((item) => (
              <div
                key={item.id}
                className={styles.similarCard}
                onClick={() => handleSimilarProductClick(item.id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === "Enter" && handleSimilarProductClick(item.id)}
              >
                {item.trending && (
                  <span className={styles.similarTrendingBadge}>🔥</span>
                )}
                <img src={item.image} alt={item.name} />
                <div className={styles.similarCardInfo}>
                  <h4>{item.name}</h4>
                  <p className={styles.similarCategory}>{item.category}</p>
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

export default OBGYNDetails;
