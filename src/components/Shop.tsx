import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import { useCart } from "../context/CartContext";
import {
  getAllProducts, // Use the Controller function to get all products
  formatPrice, // Use the Controller function for formatting
  type Product // Import the Product interface
} from "../data/ShopData"; // Unified import from the Model file
import styles from "./Shop.module.css";

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // 1. **Controller Logic:** Fetch data using the Model's helper function
  const products: Product[] = getAllProducts();

  // 2. **Controller Logic:** Add product to cart with toast feedback
  const handleAddToCart = useCallback(
    (product: Product) => {
      if (product.stock === 0) {
        toast.error(`${product.title} is out of stock.`);
        return;
      }
      
      addToCart({
        id: product.id,
        name: product.title, // Use title from the Model
        price: product.discountedPrice, // Use the discounted price
        image: product.image,
        quantity: 1,
      });
      toast.success(`✅ ${product.title} added to cart!`);
    },
    [addToCart]
  );
  
  // 3. **Controller Logic:** Handle click to view details
  const handleViewDetails = useCallback((productId: string) => {
      navigate(`/shop/${productId}`);
  }, [navigate]);

  return (
    <section className={styles.shopSection}>
      <header className={styles.header}>
        <h2>Our Products</h2>
      </header>

      <div className={styles.grid}>
        {/* 4. **View Logic:** Map and render products */}
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className={styles.image}
                onClick={() => handleViewDetails(product.id)}
              />
              <span className={styles.stockBadge}>{product.availability}</span>
            </div>

            <div className={styles.details}>
              <p className={styles.category}>{product.category}</p>
              <h3 className={styles.name}>{product.title}</h3>
              <p className={styles.price}>{formatPrice(product.discountedPrice)}</p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={() => handleAddToCart(product)}
                aria-label={`Add ${product.title} to cart`}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <button 
                className={styles.moreInfo}
                onClick={() => handleViewDetails(product.id)}
              >
                More Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shop;