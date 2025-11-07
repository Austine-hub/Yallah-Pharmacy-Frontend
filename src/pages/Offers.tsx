// src/components/offers/Offers.tsx
import React, { useState, memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, MessageCircle, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import styles from "./Offers.module.css"; // Assuming this still points to your CSS

// Import Model functions and interface
import { getAllProducts } from "../data/Offers";
import type { Product } from "../data/Offers";

const WHATSAPP_NUMBER = "254796787207";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello, I'd like to order this product:");

const ProductList: React.FC = memo(() => {
  // Fetch data directly from the Model's Controller-like function
  const offersData: Product[] = getAllProducts(); 

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Navigate to product detail page (Controller Logic)
  const handleProductClick = useCallback((productId: string) => {
    navigate(`/offers/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  // Add to cart (Controller Logic)
  const handleAddToCart = useCallback((product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart({
      id: product.id,
      name: product.title, // Using 'title' from Product interface
      price: product.discountedPrice, // Using 'discountedPrice'
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.title} added to cart 🛒`, { duration: 2000 });
  }, [addToCart]);

  // WhatsApp order (Controller Logic)
  const handleWhatsAppOrder = useCallback((productName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}%20${encodeURIComponent(
      productName
    )}`;
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  }, []);

  // Quick view modal (Controller Logic)
  const handleImageClick = useCallback((image: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedImage(image);
  }, []);

  const closeModal = useCallback(() => setSelectedImage(null), []);

  // Keyboard accessibility helper
  const handleKeyDown = useCallback((event: React.KeyboardEvent, callback: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  }, []);

  // Rendering (View Logic)
  return (
    <section className={styles.offersSection} aria-labelledby="offers-heading">
      {/* ... Header remains the same ... */}
      <div className={styles.header}>
        <h2 id="offers-heading" className={styles.title}>Offers</h2>
        <Link 
          to="/buy-medicines" 
          className={styles.viewAll}
          aria-label="View all available offers"
        >
          View all offers →
        </Link>
      </div>

      {/* === Offers Grid === */}
      <div className={styles.offersGrid} role="list">
        {offersData.map((product) => (
          <article 
            key={product.id} 
            className={styles.card}
            role="listitem"
            onClick={() => handleProductClick(product.id)}
            onKeyDown={(e) => handleKeyDown(e, () => handleProductClick(product.id))}
            tabIndex={0}
            aria-label={`${product.title}, ${product.discount}% off, now KSh ${product.discountedPrice}`}
          >
            {/* Discount Badge */}
            <div 
              className={styles.discountTag} 
              aria-label={`${product.discount} percent discount`}
            >
              -{product.discount}%
            </div>

            {/* Product Image with Quick View */}
            <div className={styles.imageWrapper}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImage}
                loading="lazy"
              />
              <button
                className={styles.quickViewBtn}
                onClick={(e) => handleImageClick(product.image, e)}
                aria-label={`Quick view ${product.title} image`}
                type="button"
              >
                <Eye size={16} aria-hidden="true" />
                <span>Quick View</span>
              </button>
            </div>

            {/* Product Info */}
            <div className={styles.info}>
              <h3 className={styles.name}>{product.title}</h3>
              <div className={styles.prices}>
                <span 
                  className={styles.newPrice} 
                  aria-label={`Sale price ${product.discountedPrice} Kenyan shillings`}
                >
                  KSh {product.discountedPrice.toLocaleString()}
                </span>
                <span 
                  className={styles.oldPrice} 
                  aria-label={`Original price ${product.originalPrice} Kenyan shillings`}
                >
                  KSh {product.originalPrice.toLocaleString()}
                </span>
              </div>
              <p 
                className={styles.savings} 
                aria-label={`You save ${product.originalPrice - product.discountedPrice} Kenyan shillings`}
              >
                Save KSh {(product.originalPrice - product.discountedPrice).toLocaleString()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              {/* Add to Cart Button */}
              <button
                className={styles.addToCart}
                onClick={(e) => handleAddToCart(product, e)}
                aria-label={`Add ${product.title} to shopping cart`}
                type="button"
              >
                <ShoppingCart size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Add to Cart</span>
              </button>

              {/* WhatsApp Order Button */}
              <button
                className={styles.whatsappBtn}
                onClick={(e) => handleWhatsAppOrder(product.title, e)}
                aria-label={`Order ${product.title} via WhatsApp`}
                type="button"
              >
                <MessageCircle size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Order via WhatsApp</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ... Image Modal remains the same ... */}
      {selectedImage && (
        <div 
          className={styles.modalOverlay} 
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Product image preview"
          onKeyDown={(e) => e.key === 'Escape' && closeModal()}
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
              onClick={closeModal}
              aria-label="Close image preview"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList;