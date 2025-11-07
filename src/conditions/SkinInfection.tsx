// ===============================================================
// Skin.tsx — Skincare Products List View / Controller
// ===============================================================

import React, { useState, useMemo, useCallback, memo} from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Filter, X, Star } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

import {
  skinProducts,
  formatPrice,
  searchProducts,
  sortProducts,
  type SkinProduct,
  type ProductCategory,
  type SortOption,
} from "../data/SkinData";

import styles from "./Offers.module.css";

// ===============================================================
// Types
// ===============================================================
interface FilterState {
  category: ProductCategory | "all";
  priceRange: [number, number];
  inStock: boolean | null;
}

// ===============================================================
// ProductCard Component — Memoized for performance
// ===============================================================
const ProductCard = memo(
  ({
    product,
    onAddToCart,
    onImageClick,
  }: {
    product: SkinProduct;
    onAddToCart: (product: SkinProduct) => void;
    onImageClick: (image: string) => void;
  }) => {
    return (
      <article className={styles.card} aria-labelledby={`product-${product.id}`}>
        {product.discount > 0 && (
          <div
            className={styles.discountTag}
            aria-label={`${product.discount}% discount`}
          >
            -{product.discount}%
          </div>
        )}

        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
            loading="lazy"
            onClick={() => onImageClick(product.image)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && onImageClick(product.image)
            }
          />
          <button
            className={styles.quickViewBtn}
            onClick={() => onImageClick(product.image)}
            aria-label={`Quick view ${product.name}`}
          >
            Quick View
          </button>
        </div>

        <div className={styles.info}>
          <h3 id={`product-${product.id}`} className={styles.name}>
            <Link to={`/skin/${product.id}`} className={styles.productLink}>
              {product.name}
            </Link>
          </h3>

          {product.rating && (
            <div
              className={styles.rating}
              aria-label={`Rating: ${product.rating} out of 5 stars`}
            >
              <Star size={14} fill="currentColor" className={styles.starIcon} />
              <span>{product.rating}</span>
              {product.reviewCount && (
                <span className={styles.reviewCount}>
                  ({product.reviewCount})
                </span>
              )}
            </div>
          )}

          <div className={styles.prices}>
            <span
              className={styles.newPrice}
              aria-label={`Current price ${formatPrice(product.price)}`}
            >
              {formatPrice(product.price)}
            </span>
            {product.discount > 0 && (
              <span
                className={styles.oldPrice}
                aria-label={`Original price ${formatPrice(product.oldPrice)}`}
              >
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className={styles.stockStatus}>
            <span
              className={
                product.inStock ? styles.inStock : styles.outOfStock
              }
            >
              {product.inStock ? "✓ In Stock" : "✕ Out of Stock"}
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to={`/skin/${product.id}`} className={styles.viewDetailsBtn}>
            View Details
          </Link>
          <button
            className={styles.addToCart}
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={18} strokeWidth={1.8} />
            <span>Add to Cart</span>
          </button>
        </div>
      </article>
    );
  }
);

ProductCard.displayName = "ProductCard";

// ===============================================================
// Main Skin Component
// ===============================================================
const Skin: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priceRange: [0, 5000],
    inStock: null,
  });

  const { addToCart } = useCart();
  const MAX_PRICE = 5000;

  // =========================================================
  // Derived product list
  // =========================================================
  const filteredProducts = useMemo(() => {
    let products = searchQuery
      ? searchProducts(searchQuery)
      : [...skinProducts];

    if (filters.category !== "all") {
      products = products.filter((p) => p.category === filters.category);
    }

    products = products.filter(
      (p) =>
        p.price >= filters.priceRange[0] &&
        p.price <= filters.priceRange[1]
    );

    if (filters.inStock !== null) {
      products = products.filter((p) => p.inStock === filters.inStock);
    }

    return sortProducts(products, sortBy);
  }, [searchQuery, filters, sortBy]);

  // =========================================================
  // Handlers
  // =========================================================
  const handleAddToCart = useCallback(
    (product: SkinProduct) => {
      if (!product.inStock) {
        toast.error("Product is out of stock");
        return;
      }

      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });

      toast.success(`${product.name} added to cart 🛒`, {
        duration: 2000,
        position: "bottom-center",
      });
    },
    [addToCart]
  );

  const handleCategoryChange = (category: ProductCategory | "all") =>
    setFilters((prev) => ({ ...prev, category }));

  const handlePriceRangeChange = (range: [number, number]) => {
    const [min, max] = [
      Math.max(0, range[0]),
      Math.min(MAX_PRICE, range[1]),
    ];
    setFilters((prev) => ({ ...prev, priceRange: [min, max] }));
  };

  const handleStockFilterChange = (inStock: boolean | null) =>
    setFilters((prev) => ({ ...prev, inStock }));

  const resetFilters = () => {
    setFilters({ category: "all", priceRange: [0, MAX_PRICE], inStock: null });
    setSearchQuery("");
  };

  // =========================================================
  // UI: Filter options
  // =========================================================
  const categories: Array<{ value: ProductCategory | "all"; label: string }> = [
    { value: "all", label: "All Products" },
    { value: "acne-treatment", label: "Acne Treatment" },
    { value: "anti-aging", label: "Anti-Aging" },
    { value: "moisturizers", label: "Moisturizers" },
    { value: "serums", label: "Serums" },
    { value: "cleansers", label: "Cleansers" },
    { value: "topical-antibiotics", label: "Topical Antibiotics" },
    { value: "antifungal", label: "Antifungal" },
    { value: "anti-inflammatory", label: "Anti-Inflammatory" },
    { value: "specialty-treatments", label: "Specialty Treatments" },
  ];

  // =========================================================
  // Render
  // =========================================================
  return (
    <section className={styles.offersSection} aria-label="Skincare products">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Premium Skincare & Treatments</h1>
          <p className={styles.subtitle}>
            Professional-grade skincare for all your dermatological needs
          </p>
        </div>
      </header>

      {/* Search + Sorting */}
      <div className={styles.controlsBar}>
        <div className={styles.searchWrapper}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.controlButtons}>
          <button
            className={styles.filterToggle}
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className={styles.sortSelect}
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Best Discount</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className={styles.filterPanel}>
          <div className={styles.filterSection}>
            <h3>Category</h3>
            <div className={styles.categoryButtons}>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={
                    filters.category === cat.value
                      ? styles.categoryActive
                      : ""
                  }
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3>
              Price Range ({formatPrice(filters.priceRange[0])} –{" "}
              {formatPrice(filters.priceRange[1])})
            </h3>
            <div className={styles.priceInputs}>
              <input
                type="number"
                min={0}
                value={filters.priceRange[0]}
                onChange={(e) =>
                  handlePriceRangeChange([+e.target.value, filters.priceRange[1]])
                }
              />
              <span>to</span>
              <input
                type="number"
                min={0}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handlePriceRangeChange([filters.priceRange[0], +e.target.value])
                }
              />
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3>Availability</h3>
            <div className={styles.stockButtons}>
              {[
                { label: "All", value: null },
                { label: "In Stock", value: true },
                { label: "Out of Stock", value: false },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleStockFilterChange(opt.value)}
                  className={
                    filters.inStock === opt.value ? styles.stockActive : ""
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={resetFilters} className={styles.resetFilters}>
            Reset Filters
          </button>
        </div>
      )}

      {/* Results */}
      <p className={styles.resultsInfo}>
        Showing <strong>{filteredProducts.length}</strong> of{" "}
        <strong>{skinProducts.length}</strong>{" "}
        {searchQuery && <>for "{searchQuery}"</>}
      </p>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className={styles.offersGrid}>
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={handleAddToCart}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p>No products found.</p>
          <button onClick={resetFilters} className={styles.resetBtn}>
            Clear Filters
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Product Preview"
              className={styles.modalImage}
            />
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Skin);
