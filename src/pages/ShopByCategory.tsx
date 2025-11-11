// ============================================================
// File: ShopByCategory.tsx — Static Page Routing Version (2025)
// ============================================================

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./ShopByCategory.module.css";



// === CATEGORY IMAGES ===
import pic1 from "../assets/shop1/cough.png";
import pic2 from "../assets/shop1/accessories.png";
import pic3 from "../assets/shop1/Vitamins.png";
import pic5 from "../assets/shop1/reproductive.png";
import pic6 from "../assets/shop1/chronic.png";
import pic7 from "../assets/shop1/Allergy.png";
import pic8 from "../assets/shop1/Heartburn.png";
import pic9 from "../assets/products/Headache2.png";
import pic10 from "../assets/products/Cramps.png";
import pic11 from "../assets/products/Acne.png";
import pic12 from "../assets/products/UTI.png";

// === CATEGORY DATA ===
interface Category {
  id: string;
  title: string;
  image: string;
  path: string; // ✅ explicit path for static route
}

const categories: Category[] = [

  { id: "uti", title: "UTI", image: pic12, path: "/category/uti" },
  { id: "general", title: "General Wellness & Support", image: pic1, path: "/category/general" },
  { id: "accessories", title: "Medical Accessories", image: pic2, path: "/category/accessories" },
  { id: "personal", title: "Personal & Lifestyle", image: pic7, path: "/category/personal" },
  { id: "cough", title: "Cough & Cold", image: pic1, path: "/category/cough" },
  { id: "vitamins", title: "Vitamins & Supplements", image: pic3, path: "/category/vitamins" },
  { id: "private", title: "Discreet / Private Purchases", image: pic8, path: "/category/private" },
  { id: "sexual", title: "Sexual & Reproductive Health", image: pic5, path: "/category/sexual" },
  { id: "sti", title: "STI Management", image: pic7, path: "/category/sti" },
  { id: "heartburn", title: "Heartburn", image: pic8, path: "/category/heartburn" },
  { id: "vaginal", title: "Vaginal & Genital Hygiene", image: pic8, path: "/category/vaginal" },
  { id: "allergy", title: "Allergy", image: pic7, path: "/category/allergy" },
  { id: "chronic", title: "Chronic Diseases", image: pic6, path: "/category/chronic" },
  { id: "reproductive", title: "Reproductive Health", image: pic5, path: "/category/reproductive" },
  { id: "other", title: "Other Ailments", image: pic9, path: "/category/other" },
  { id: "cramps", title: "Menstrual Cramps", image: pic10, path: "/category/cramps" },
  { id: "acne", title: "Acne / Pimples", image: pic11, path: "/category/acne" },
 
];

// ============================================================
// Component
// ============================================================
const ShopByCategory: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount =
      direction === "left" ? -container.clientWidth * 0.8 : container.clientWidth * 0.8;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="shop-category-title">
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 id="shop-category-title" className={styles.title}>
          Shop by Category
        </h2>
      </motion.div>

      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.arrowBtn} ${styles.leftArrow}`}
          aria-label="Scroll left"
          onClick={() => handleScroll("left")}
        >
          <FaChevronLeft />
        </button>

        <div ref={scrollRef} className={styles.carousel}>
          {categories.map((cat, index) => (
            <motion.article
              key={cat.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              onClick={() => handleCardClick(cat.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleCardClick(cat.path)}
            >
              <div className={styles.imageWrapper}>
                <img src={cat.image} alt={cat.title} className={styles.image} loading="lazy" />
              </div>
              <h3 className={styles.cardTitle}>{cat.title}</h3>
            </motion.article>
          ))}
        </div>

        <button
          className={`${styles.arrowBtn} ${styles.rightArrow}`}
          aria-label="Scroll right"
          onClick={() => handleScroll("right")}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default ShopByCategory;
