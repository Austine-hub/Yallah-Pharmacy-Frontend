// src/hooks/useImageLoader.ts
import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for image loading state management.
 *
 * Returns:
 * - `loaded`: boolean — true when the image has fully loaded (or failed)
 * - `error`: boolean — true if the image failed to load
 * - `reload`: function — manually reload the image
 *
 * Works seamlessly with the <Loader mode="inline" /> component.
 */
export const useImageLoader = (src: string | undefined) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const loadImage = useCallback(() => {
    if (!src) return;
    setLoaded(false);
    setError(false);

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setLoaded(true);
      setError(false);
    };

    img.onerror = () => {
      setLoaded(true);
      setError(true);
    };

    // Cleanup in case src changes mid-load
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  useEffect(() => {
    const cleanup = loadImage();
    return cleanup;
  }, [loadImage]);

  return { loaded, error, reload: loadImage };
};
