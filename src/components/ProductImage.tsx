// src/components/ProductImage.tsx
import React from "react";
import Loader from "./Loader";
import { useImageLoader } from "../hooks/useImageLoader";
import styles from "./ProductImage.module.css";

interface ProductImageProps {
  src?: string;
  alt?: string;
  className?: string;
  backdrop?: boolean;
  fallback?: React.ReactNode;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt = "Product image",
  className = "",
  backdrop = true,
  fallback,
}) => {
  const { loaded, error } = useImageLoader(src);

  return (
    <div className={`${styles.root} ${className}`} aria-busy={!loaded}>
      {!loaded && (
        <div className={`${styles.overlay} ${backdrop ? styles.backdrop : ""}`} aria-hidden="true">
          <Loader mode="inline" isLoading={!loaded} />
        </div>
      )}

      {error ? (
        fallback ?? (
          <div className={styles.fallback}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M21 15V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path d="M7 11l3 3 7-7" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <div className={styles.fallbackText}>Image unavailable</div>
          </div>
        )
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${styles.img} ${loaded ? styles.imgVisible : styles.imgHidden}`}
          loading="lazy"
          draggable={false}
        />
      )}
    </div>
  );
};

export default ProductImage;

