// src/components/offers/Offers.tsx
import React, { useState, memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, MessageCircle, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import styles from "./Offers.module.css";


// === Import images ===
import pic1 from "../assets/products/Allergy.png";
import pic2 from "../assets/products/Anthelios.png";
import pic3 from "../assets/products/Contraception.png";
import pic4 from "../assets/products/Cough.png";
import pic5 from "../assets/products/Headache.png";
import pic6 from "../assets/products/Eno.png";
import pic7 from "../assets/products/Diclofenac.png";
import pic8 from "../assets/products/UTI.png";
interface Offer {
  id: string;
  name: string;
  image: string;
  discount: number;
  price: number;
  oldPrice: number;
}

const offersData: Offer[] = [
  { id: "1", name: "Allergy Relief", image: pic1, discount: 12, price: 350, oldPrice: 490 },
  { id: "2", name: "La Roche-Posay Effaclar Foaming Gel", image: pic2, discount: 12, price: 830, oldPrice: 980 },
  { id: "3", name: "Emergency Contraception", image: pic3, discount: 11, price: 1700, oldPrice: 2035 },
  { id: "4", name: "Benyllin Cough Syrup", image: pic4, discount: 15, price: 989, oldPrice: 1075 },
  { id: "5", name: "Paracetamol Headache Relief", image: pic5, discount: 15, price: 84, oldPrice: 95 },
  { id: "6", name: "ENO Antacid Relief", image: pic6, discount: 11, price: 50, oldPrice: 75 },
  { id: "7", name: "Diclofenac Pain Relief", image: pic7, discount: 15, price: 159, oldPrice: 175 },
  { id: "8", name: "Cystex Painful Urination Relief", image: pic8, discount: 15, price: 214, oldPrice: 305 },
];

const WHATSAPP_NUMBER = "254796787207";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello, I'd like to order this product:");

const Offers: React.FC = memo(() => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Navigate to product detail page
  const handleProductClick = useCallback((productId: string) => {
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  // Add to cart with event propagation control
  const handleAddToCart = useCallback((offer: Offer, event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      image: offer.image,
      quantity: 1,
    });
    toast.success(`${offer.name} added to cart 🛒`, { duration: 2000 });
  }, [addToCart]);

  // WhatsApp order with event propagation control
  const handleWhatsAppOrder = useCallback((productName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}%20${encodeURIComponent(
      productName
    )}`;
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  }, []);

  // Quick view modal
  const handleImageClick = useCallback((image: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedImage(image);
  }, []);

  const closeModal = useCallback(() => setSelectedImage(null), []);

  // Keyboard accessibility
  const handleKeyDown = useCallback((event: React.KeyboardEvent, callback: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  }, []);

  return (
    <section className={styles.offersSection} aria-labelledby="offers-heading">
      {/* === Header === */}
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
        {offersData.map((offer) => (
          <article 
            key={offer.id} 
            className={styles.card}
            role="listitem"
            onClick={() => handleProductClick(offer.id)}
            onKeyDown={(e) => handleKeyDown(e, () => handleProductClick(offer.id))}
            tabIndex={0}
            aria-label={`${offer.name}, ${offer.discount}% off, now KSh ${offer.price}`}
          >
            {/* Discount Badge */}
            <div 
              className={styles.discountTag} 
              aria-label={`${offer.discount} percent discount`}
            >
              -{offer.discount}%
            </div>

            {/* Product Image with Quick View */}
            <div className={styles.imageWrapper}>
              <img
                src={offer.image}
                alt={offer.name}
                className={styles.productImage}
                loading="lazy"
              />
              <button
                className={styles.quickViewBtn}
                onClick={(e) => handleImageClick(offer.image, e)}
                aria-label={`Quick view ${offer.name} image`}
                type="button"
              >
                <Eye size={16} aria-hidden="true" />
                <span>Quick View</span>
              </button>
            </div>

            {/* Product Info */}
            <div className={styles.info}>
              <h3 className={styles.name}>{offer.name}</h3>
              <div className={styles.prices}>
                <span 
                  className={styles.newPrice} 
                  aria-label={`Sale price ${offer.price} Kenyan shillings`}
                >
                  KSh {offer.price.toLocaleString()}
                </span>
                <span 
                  className={styles.oldPrice} 
                  aria-label={`Original price ${offer.oldPrice} Kenyan shillings`}
                >
                  KSh {offer.oldPrice.toLocaleString()}
                </span>
              </div>
              <p 
                className={styles.savings} 
                aria-label={`You save ${offer.oldPrice - offer.price} Kenyan shillings`}
              >
                Save KSh {(offer.oldPrice - offer.price).toLocaleString()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              {/* Add to Cart Button */}
              <button
                className={styles.addToCart}
                onClick={(e) => handleAddToCart(offer, e)}
                aria-label={`Add ${offer.name} to shopping cart`}
                type="button"
              >
                <ShoppingCart size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Add to Cart</span>
              </button>

              {/* WhatsApp Order Button */}
              <button
                className={styles.whatsappBtn}
                onClick={(e) => handleWhatsAppOrder(offer.name, e)}
                aria-label={`Order ${offer.name} via WhatsApp`}
                type="button"
              >
                <MessageCircle size={18} strokeWidth={1.8} aria-hidden="true" />
                <span>Order via WhatsApp</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* === Image Modal === */}
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

Offers.displayName = 'Offers';

export default Offers;