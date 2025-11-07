// src/components/ProductCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Import Product interface and utility functions from the Model
import { type Product, formatCurrency } from "../data/BeautyData";

// Props for the ProductCard
interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onShare: (id: number) => void;
  onAddToCart: (id: number) => void;
  onProductClick: (id: number) => void;
  // Pass the CSS module styles from the parent for consistency
  styles: { [key: string]: string };
}

// Using React.memo for performance optimization (pure component behavior)
const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({
    product,
    isFavorite,
    onToggleFavorite,
    onShare,
    onAddToCart,
    onProductClick,
    styles,
  }) => {
    const { id, name, description, image, brand, price } = product;

    return (
      <motion.article
        key={id}
        className={styles.productCard}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Image and Action Overlay (Clickable Area for detail page) */}
        <div
          className={styles.imageContainer}
          onClick={() => onProductClick(id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onProductClick(id)}
        >
          <LazyLoadImage
            src={image}
            alt={name}
            effect="blur"
            className={styles.productImage}
          />
          <div className={styles.cardActions}>
            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents clicking the card container
                onToggleFavorite(id);
              }}
              aria-label="Toggle favorite"
            >
              <Heart
                size={18}
                fill={isFavorite ? "#ff4757" : "none"}
                color={isFavorite ? "#ff4757" : "#666"}
              />
            </button>
            {/* Share Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents clicking the card container
                onShare(id);
              }}
              aria-label="Share product"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Product Info and Add to Cart Button */}
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{name}</h3>
          <p className={styles.productDesc}>{description}</p>
          <span className={styles.brandName}>{brand}</span>
          {/* Use the formatCurrency utility from the Model */}
          <p className={styles.price}>{formatCurrency(price)}</p>

          <motion.button
            className={styles.addButton}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onAddToCart(id)}
          >
            <ShoppingCart size={16} /> Add to Cart
          </motion.button>
        </div>
      </motion.article>
    );
  }
);

export default ProductCard;