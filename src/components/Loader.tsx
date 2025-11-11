import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/logo.png";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Add small delay to ensure smooth transition
      setTimeout(() => setIsLoading(false), 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className={styles.loaderContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className={styles.loaderContent}>
            {/* Rotating Red Ring */}
            <motion.div
              className={styles.ring}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className={styles.ringInner} />
            </motion.div>

            {/* Logo */}
            <motion.div
              className={styles.logoWrapper}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <img
                src={logo}
                alt="Loading"
                className={styles.logo}
              />
            </motion.div>
          </div>

          {/* Optional: Loading text */}
          <motion.p
            className={styles.loadingText}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;