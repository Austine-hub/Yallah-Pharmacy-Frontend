/// ===============================================================
// 🎨 BeautyDetails.tsx — View Layer (Single Product Details)
// ===============================================================
// Fully MVC-compliant React component that retrieves and displays
// one product, interacts with the controller for logic, and the cart context for actions.

import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import styles from "./Beauty.module.css";



import { useCart } from "../context/CartContext";
import {
  getProductById,
  prepareCartItem,
  formatCurrency,
} from "../data/BeautyData";

const BeautyDetails: React.FC = () => {
  // 🧭 Retrieve the product ID from the URL
  const { id } = useParams<{ id: string }>();

  // 🎯 Fetch product from the controller
  const product = id ? getProductById(Number(id)) : undefined;

  // 🛒 Access cart actions
  const { addToCart, openCart } = useCart();

  // ❌ Handle missing product case
  if (!product)
    return (
      <motion.div
        className={styles.notFound}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Product Not Found</h2>
        <Link to="/beauty-products" className={styles.backLink}>
          <ChevronLeft size={18} /> Back to Products
        </Link>
      </motion.div>
    );

  // ➕ Add product to cart
  const handleAddToCart = () => {
    addToCart(prepareCartItem(product));
    toast.success(`${product.name} added to cart`);
    openCart?.();
  };

  return (
    <motion.section
      className={styles.detailsSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 🔙 Back Navigation */}
      <Link to="/beauty-products" className={styles.backLink}>
        <ChevronLeft size={18} /> Back
      </Link>

      {/* 🖼️ Product Details */}
      <div className={styles.detailsContainer}>
        <motion.img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        />

        <div className={styles.info}>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>{formatCurrency(product.price)}</p>

          {/* 🛒 Add to Cart */}
          <motion.button
            className={styles.cartButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default BeautyDetails;
