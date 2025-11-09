// src/context/WishlistContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// ===============================================================
// 📦 Types & Interfaces
// ===============================================================

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand?: string;
  category?: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

// ===============================================================
// 🎯 Context Creation
// ===============================================================

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// ===============================================================
// 🏪 Provider Component
// ===============================================================

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    // Load wishlist from localStorage on initial render
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      return [];
    }
  });

  // Persist wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [wishlist]);

  // Add item to wishlist
  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prevWishlist) => {
      // Check if item already exists
      const exists = prevWishlist.some((wishlistItem) => wishlistItem.id === item.id);
      
      if (exists) {
        // Item already in wishlist, don't add duplicate
        return prevWishlist;
      }
      
      // Add new item to wishlist
      return [...prevWishlist, item];
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  // Check if item is in wishlist
  const isInWishlist = (id: string): boolean => {
    return wishlist.some((item) => item.id === id);
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Get wishlist count
  const wishlistCount = wishlist.length;

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

// ===============================================================
// 🪝 Custom Hook
// ===============================================================

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  
  return context;
};

export default WishlistContext;