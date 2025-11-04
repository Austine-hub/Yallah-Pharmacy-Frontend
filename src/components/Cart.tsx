import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import axios from "axios";
import { 
  Trash2, 
  ShoppingCart, 
  AlertCircle, 
  Minus, 
  Plus,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Truck,
  Clock,
  X,
  Lock,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; 
import { handleWhatsAppOrder } from "../utils/whatsappOrder";
import styles from "./Cart.module.css";

// Currency formatter
const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  minimumFractionDigits: 0,
});

const formatPrice = (v: number) => currencyFormatter.format(v);

// Quantity Input Component
type QuantityInputProps = {
  id: string;
  value: number;
  onChange?: (n: number) => void;
  disabled?: boolean;
  max?: number;
};

const QuantityInput: React.FC<QuantityInputProps> = ({ 
  id, 
  value, 
  onChange, 
  disabled,
  max = 99 
}) => {
  const [local, setLocal] = useState(String(value));

  useEffect(() => setLocal(String(value)), [value]);

  const commit = useCallback(
    (val?: string) => {
      const raw = val ?? local;
      const n = Number.parseInt(String(raw || "0"), 10);
      if (Number.isNaN(n) || n < 1) {
        setLocal(String(value));
        return;
      }
      const safeQty = Math.min(max, Math.max(1, Math.trunc(n)));
      onChange?.(safeQty);
    },
    [local, onChange, value, max]
  );

  return (
    <input
      id={id}
      aria-label={`Quantity for item ${id}`}
      className={styles.quantityInput}
      inputMode="numeric"
      pattern="[0-9]*"
      value={local}
      onChange={(e) => setLocal(e.target.value.replace(/[^0-9]/g, ""))}
      onBlur={() => commit()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          commit();
          (e.target as HTMLInputElement).blur();
        }
      }}
      disabled={disabled}
      min={1}
      max={max}
    />
  );
};

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 28 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

// Main Cart Component
const Cart: React.FC = () => {
  const navigate = useNavigate();
  
  const {
    cartItems = [],
    removeFromCart,
    clearCart,
    getCartTotal = () => 0,
    getTotalItems = () => 0,
    updateQuantity,
  } = useCart();
  
  const { isAuthenticated } = useAuth();
  const [isClearing, setIsClearing] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);

  // Memoized calculations
  const subtotal = useMemo(() => getCartTotal(), [getCartTotal]);
  const totalItems = useMemo(() => getTotalItems(), [getTotalItems]);
  const shipping = subtotal >= 3000 ? 0 : 250;
  const total = subtotal + shipping;
  const savings = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (item.originalPrice) {
        return acc + (item.originalPrice - item.price) * item.quantity;
      }
      return acc;
    }, 0);
  }, [cartItems]);

  const quantityControlsEnabled = Boolean(updateQuantity);

  // Handlers
  const handleAdjustQty = useCallback(
    (id: string, qty: number) => {
      if (!quantityControlsEnabled) {
        toast.info("Quantity editing not available");
        return;
      }
      const safeQty = Math.max(1, Math.trunc(qty));
      updateQuantity?.(id, safeQty);
      toast.success("Quantity updated", { duration: 1500 });
    },
    [updateQuantity, quantityControlsEnabled]
  );

  const handleRemove = useCallback(
    (id: string, name?: string) => {
      removeFromCart(id);
      toast.success(`${name ?? "Item"} removed from cart`);
    },
    [removeFromCart]
  );

  const handleClear = useCallback(async () => {
    if (!cartItems.length || isClearing) return;
    
    setIsClearing(true);
    const ok = window.confirm("Clear all items from your cart? This cannot be undone.");
    
    if (ok) {
      clearCart();
      toast.success("Cart cleared");
    }
    
    setIsClearing(false);
  }, [clearCart, cartItems.length, isClearing]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        return;
      }
      
      setPrescriptionFile(file);
      toast.success("Prescription file selected");
    }
  };

  const handleCheckout = useCallback(async () => {
    if (!cartItems.length) {
      toast.info("Your cart is empty");
      return;
    }

    if (!isAuthenticated) {
      toast.error("Please log in to checkout", {
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Create order
      const orderRes = await axios.post(
        "/api/orders",
        {
          cartItems,
          shipping,
          total,
        },
        { withCredentials: true }
      );

      const orderId = orderRes.data.orderId;
      toast.success(`Order #${orderId} created successfully`);

      // Upload prescription if file is selected
      if (prescriptionFile) {
        const formData = new FormData();
        formData.append("file", prescriptionFile);
        formData.append("orderId", orderId);

        await axios.post("/api/prescriptions", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        toast.success("Prescription uploaded successfully");
      }

      // Navigate to success page
      navigate("/checkout-success");
      
      // Clear cart
      clearCart();
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Checkout failed. Please try again.";
      toast.error(errorMessage);
      console.error("Checkout error:", err);
    } finally {
      setIsPlacingOrder(false);
    }
  }, [cartItems, isAuthenticated, navigate, shipping, total, prescriptionFile, clearCart]);

  const handleWhatsAppClick = useCallback(() => {
    if (!cartItems.length) {
      toast.info("Add items to your cart first");
      return;
    }

    const success = handleWhatsAppOrder(cartItems, subtotal);
    
    if (success) {
      toast.success("Opening WhatsApp...");
    } else {
      toast.error("Failed to open WhatsApp");
    }
  }, [cartItems, subtotal]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleCheckout();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleCheckout]);

  // Empty state
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={styles.emptyState}>
        <motion.div 
          className={styles.emptyContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className={styles.emptyIconWrapper}>
            <ShoppingCart size={56} strokeWidth={1.5} />
          </div>
          <h1 className={styles.emptyTitle}>Your cart is empty</h1>
          <p className={styles.emptyText}>
            Discover quality healthcare products and add them to your cart
          </p>
          <button 
            className={styles.emptyButton}
            onClick={() => navigate("/")}
            aria-label="Start shopping"
          >
            Start Shopping
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.cartWrapper}>
      <div className={styles.cartContainer}>
        {/* Header */}
        <header className={styles.cartHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.cartTitle}>Shopping Cart</h1>
            <span className={styles.itemCount}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button 
            className={styles.continueBtn}
            onClick={() => navigate("/")}
            aria-label="Continue shopping"
          >
            Continue Shopping
          </button>
        </header>

        <div className={styles.cartLayout}>
          {/* Cart Items Section */}
          <motion.section 
            className={styles.cartItems}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={styles.cartItem}
                >
                  <div className={styles.itemImage}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      loading="lazy"
                    />
                    {item.discount && (
                      <span className={styles.badge}>-{item.discount}%</span>
                    )}
                  </div>

                  <div className={styles.itemDetails}>
                    <div className={styles.itemTop}>
                      <div>
                        <h2 className={styles.itemName}>{item.name}</h2>
                        {item.category && (
                          <p className={styles.itemCategory}>{item.category}</p>
                        )}
                        {item.variation && (
                          <p className={styles.itemVariation}>Size: {item.variation}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => handleRemove(item.id, item.name)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {!item.inStock && (
                      <div className={styles.stockAlert}>
                        <AlertCircle size={14} />
                        <span>Out of stock</span>
                      </div>
                    )}

                    <div className={styles.itemBottom}>
                      <div className={styles.priceGroup}>
                        <span className={styles.price}>{formatPrice(item.price)}</span>
                        {item.originalPrice && (
                          <span className={styles.oldPrice}>{formatPrice(item.originalPrice)}</span>
                        )}
                      </div>

                      <div className={styles.quantityGroup}>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => handleAdjustQty(item.id, item.quantity - 1)}
                          disabled={!quantityControlsEnabled || item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>

                        <QuantityInput
                          id={`qty-${item.id}`}
                          value={item.quantity}
                          onChange={(n) => handleAdjustQty(item.id, n)}
                          disabled={!quantityControlsEnabled}
                        />

                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => handleAdjustQty(item.id, item.quantity + 1)}
                          disabled={!quantityControlsEnabled}
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className={styles.itemTotal}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            <button
              className={styles.clearBtn}
              onClick={handleClear}
              disabled={isClearing}
              aria-label="Clear all items from cart"
            >
              <Trash2 size={18} />
              Clear Cart
            </button>
          </motion.section>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Trust Indicators */}
            <motion.div 
              className={styles.trustBar}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className={styles.trustItem}>
                <ShieldCheck size={18} />
                <span>Secure Checkout</span>
              </div>
              <div className={styles.trustItem}>
                <Truck size={18} />
                <span>Fast Delivery</span>
              </div>
              <div className={styles.trustItem}>
                <Clock size={18} />
                <span>24/7 Support</span>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div 
              className={styles.summary}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryLines}>
                <div className={styles.line}>
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {savings > 0 && (
                  <div className={`${styles.line} ${styles.savings}`}>
                    <span>You save</span>
                    <span>-{formatPrice(savings)}</span>
                  </div>
                )}

                <div className={styles.line}>
                  <span>Shipping</span>
                  <span className={shipping === 0 ? styles.free : ''}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>

                {subtotal < 3000 && (
                  <div className={styles.shippingBar}>
                    <p>Add {formatPrice(3000 - subtotal)} more for free shipping</p>
                    <div className={styles.progress}>
                      <div 
                        className={styles.progressFill}
                        style={{ width: `${Math.min((subtotal / 3000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span className={styles.totalAmount}>{formatPrice(total)}</span>
              </div>

              {/* Prescription Upload */}
              <div className={styles.prescriptionUpload}>
                <label htmlFor="prescription" className={styles.uploadLabel}>
                  <FileText size={16} />
                  <span>Upload Prescription</span>
                  <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  type="file"
                  id="prescription"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  className={styles.uploadInput}
                  aria-label="Upload prescription file"
                />
                {prescriptionFile && (
                  <div className={styles.fileSelected}>
                    <FileText size={14} />
                    <span>{prescriptionFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setPrescriptionFile(null)}
                      aria-label="Remove prescription file"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <button
                className={styles.checkoutBtn}
                onClick={handleCheckout}
                disabled={isPlacingOrder}
                aria-label="Proceed to secure checkout"
              >
                {isPlacingOrder ? (
                  <>
                    <span className={styles.spinner}></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Secure Checkout
                  </>
                )}
              </button>

              <p className={styles.taxNote}>Tax included • Free returns</p>
            </motion.div>

            {/* WhatsApp Option */}
            <motion.div 
              className={styles.whatsapp}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className={styles.whatsappTop}>
                <MessageCircle size={22} />
                <div>
                  <h3>Order via WhatsApp</h3>
                  <p>Get instant assistance</p>
                </div>
              </div>
              
              <button
                className={styles.whatsappBtn}
                onClick={handleWhatsAppClick}
                aria-label="Continue order on WhatsApp"
              >
                Continue on WhatsApp
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;