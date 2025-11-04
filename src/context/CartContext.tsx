import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

/**
 * Type definitions
 */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  description?: string;
  variation?: string;
  inStock?: boolean;
  originalPrice?: number;
  discount?: number;
}

interface CartState {
  items: CartItem[];
  initialized: boolean;
}

type Action =
  | { type: "INIT"; payload: CartItem[] }
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "CLEAR" }
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "INCREASE_QTY"; payload: { id: string; delta?: number } }
  | { type: "DECREASE_QTY"; payload: { id: string; delta?: number } };

/**
 * Public context API
 */
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  increaseQty: (id: string, delta?: number) => void;
  decreaseQty: (id: string, delta?: number) => void;
  getCartTotal: () => number;
  getTotalItems: () => number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  isInitialized: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "cart_items_v2";

/**
 * Utility: Sanitize cart item quantities
 */
const sanitizeQuantity = (quantity: number): number => {
  return Math.max(1, Math.floor(Math.abs(quantity || 1)));
};

const sanitizeItem = (item: CartItem): CartItem => ({
  ...item,
  quantity: sanitizeQuantity(item.quantity),
  price: Math.max(0, item.price),
});

/**
 * Reducer: Pure state transitions
 */
const reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "INIT":
      return {
        items: action.payload.map(sanitizeItem),
        initialized: true,
      };

    case "ADD": {
      const item = sanitizeItem(action.payload);
      const existingIndex = state.items.findIndex((i) => i.id === item.id);
      
      if (existingIndex !== -1) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + item.quantity,
        };
        return { ...state, items: newItems };
      }
      
      return { ...state, items: [...state.items, item] };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };

    case "CLEAR":
      return { ...state, items: [] };

    case "UPDATE_QTY": {
      const { id, quantity } = action.payload;
      const sanitized = sanitizeQuantity(quantity);
      
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: sanitized } : i
        ),
      };
    }

    case "INCREASE_QTY": {
      const { id, delta = 1 } = action.payload;
      const increment = sanitizeQuantity(delta);
      
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + increment } : i
        ),
      };
    }

    case "DECREASE_QTY": {
      const { id, delta = 1 } = action.payload;
      const decrement = sanitizeQuantity(delta);
      
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === id
            ? { ...i, quantity: Math.max(1, i.quantity - decrement) }
            : i
        ),
      };
    }

    default:
      return state;
  }
};

/**
 * Provider Component
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    initialized: false,
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    isMountedRef.current = true;

    const loadCart = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          dispatch({ type: "INIT", payload: [] });
          return;
        }

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
          console.warn("[Cart] Invalid stored data format, resetting cart");
          localStorage.removeItem(STORAGE_KEY);
          dispatch({ type: "INIT", payload: [] });
          return;
        }

        // Validate each item has required fields
        const validItems = parsed.filter(
          (item: any) =>
            item &&
            typeof item === "object" &&
            typeof item.id === "string" &&
            typeof item.name === "string" &&
            typeof item.price === "number"
        );

        dispatch({ type: "INIT", payload: validItems });
      } catch (err) {
        console.error("[Cart] Failed to load from localStorage:", err);
        dispatch({ type: "INIT", payload: [] });
      }
    };

    loadCart();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Persist to localStorage with debouncing
  useEffect(() => {
    if (!state.initialized) return;

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch (err) {
        console.error("[Cart] Failed to save to localStorage:", err);
      }
    }, 300);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [state.items, state.initialized]);

  // Cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !isMountedRef.current) return;

      try {
        const newValue = e.newValue ? JSON.parse(e.newValue) : [];
        if (Array.isArray(newValue)) {
          dispatch({ type: "INIT", payload: newValue });
        }
      } catch (err) {
        console.error("[Cart] Failed to sync from storage event:", err);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // API Methods
  const addToCart = useCallback((item: CartItem) => {
    dispatch({ type: "ADD", payload: item });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    dispatch({ type: "REMOVE", payload: { id } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QTY", payload: { id, quantity } });
  }, []);

  const increaseQty = useCallback((id: string, delta = 1) => {
    dispatch({ type: "INCREASE_QTY", payload: { id, delta } });
  }, []);

  const decreaseQty = useCallback((id: string, delta = 1) => {
    dispatch({ type: "DECREASE_QTY", payload: { id, delta } });
  }, []);

  const getCartTotal = useCallback(() => {
    return state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [state.items]);

  const getTotalItems = useCallback(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const value = useMemo<CartContextType>(
    () => ({
      cartItems: state.items,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      increaseQty,
      decreaseQty,
      getCartTotal,
      getTotalItems,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      isInitialized: state.initialized,
    }),
    [
      state.items,
      state.initialized,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      increaseQty,
      decreaseQty,
      getCartTotal,
      getTotalItems,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Custom Hook
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

/**
 * Hook for cart item count (optimized for badge displays)
 */
export const useCartCount = (): number => {
  const { getTotalItems } = useCart();
  return getTotalItems();
};

/**
 * Hook for cart total (optimized for price displays)
 */
export const useCartTotal = (): number => {
  const { getCartTotal } = useCart();
  return getCartTotal();
};