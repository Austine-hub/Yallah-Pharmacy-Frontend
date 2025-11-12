import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/logo.png";
import styles from "./Loader.module.css";

export interface LoaderProps {
  /**
   * Mode of the loader:
   * - "fullscreen": for app startup (default)
   * - "inline": for smaller, component-level loaders (e.g. image loading)
   */
  mode?: "fullscreen" | "inline";

  /**
   * Optional external control:
   * When provided, disables internal state management
   */
  isLoading?: boolean;

  /**
   * If true, suppresses backdrop (for inline loaders, e.g. inside cards or product images)
   */
  noBackdrop?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  mode = "fullscreen",
  isLoading: externalLoading,
  noBackdrop = false,
}) => {
  const [internalLoading, setInternalLoading] = useState(true);

  // Only use internal load detection for fullscreen mode
  useEffect(() => {
    if (mode !== "fullscreen") return;

    const handleLoad = () => {
      // Add small delay for smooth fade-out
      setTimeout(() => setInternalLoading(false), 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [mode]);

  const isLoading = externalLoading ?? internalLoading;
  const isFullscreen = mode === "fullscreen";

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className={[
            styles.loaderContainer,
            isFullscreen ? styles.fullscreen : styles.inline,
            noBackdrop ? styles.noBackdrop : "",
          ].join(" ")}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className={styles.loaderContent}>
            {/* 🔴 Rotating Ring */}
            <motion.div
              className={styles.ring}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: isFullscreen ? "80px" : "40px",
                height: isFullscreen ? "80px" : "40px",
              }}
            >
              <div className={styles.ringInner} />
            </motion.div>

            {/* 🧠 Logo */}
            <motion.div
              className={styles.logoWrapper}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{
                width: isFullscreen ? "60px" : "30px",
              }}
            >
              <img src={logo} alt="Loading" className={styles.logo} />
            </motion.div>
          </div>

          {/* 📝 Optional loading text (fullscreen only) */}
          {isFullscreen && (
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
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
