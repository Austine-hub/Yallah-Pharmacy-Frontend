// src/dropdowns/Respiratory.tsx
import React, { memo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import styles from "./Shop.module.css";
import { respiratoryProducts, type Product } from "../data/respiratoryData";


const Respiratory: React.FC = memo(() => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      inStock: true,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className={styles.respiratorySection}>
      <header className={styles.header}>
        <h2>Respiratory Drugs</h2>
        <div className={styles.subCategory}>
          <label>Category:</label>
          <span>Respiratory</span>
        </div>
      </header>

      <div className={styles.grid}>
        {respiratoryProducts.map((product) => (
          <article key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={product.image} alt={product.name} loading="lazy" className={styles.image} />
              <span className={styles.stockBadge}>{product.stock}</span>
            </div>

            <div className={styles.details}>
              <p className={styles.category}>{product.category}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>KES {product.price.toLocaleString()}</p>
            </div>

            <div className={styles.actions}>
              <button className={styles.addToCart} onClick={() => handleAddToCart(product)}>
                🛒 Add to Cart
              </button>
              <Link to={`/respiratory/${product.id}`} className={styles.moreInfo}>
                More Info
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
});

export default Respiratory;
