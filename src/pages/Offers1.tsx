import React, { useRef, useState, useEffect } from "react";
import { ShoppingCart, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { productsData } from "../data/Offers1";
import styles from "./Offers1.module.css";

const Offers1: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollButtons();
    container.addEventListener("scroll", checkScrollButtons);
    window.addEventListener("resize", checkScrollButtons);

    return () => {
      container.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction === "left" ? -320 : 320;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleCardClick = (productId: string) => {
    navigate(`/new-beauty/${productId}`);
  };

  const handleAddToCart = (
    e: React.MouseEvent,
    productId: string,
    title: string,
    price: number,
    image: string
  ) => {
    e.stopPropagation();

    addToCart({
      id: productId,
      name: title,
      price: price,
      image: image,
      quantity: 1,
    });

    toast.success(`${title} added to cart!`);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className={styles.offersSection} aria-labelledby="new-arrivals-heading">
      <div className={styles.header}>
        <h2 id="new-arrivals-heading" className={styles.title}>
          New Beauty Arrivals
        </h2>

        <button
          className={styles.cartSummary}
          onClick={handleCartClick}
          aria-label={`View cart with ${totalCartItems} items`}
        >
          <ShoppingCart size={22} aria-hidden="true" />
          {totalCartItems > 0 && (
            <span className={styles.cartBadge} aria-label={`${totalCartItems} items`}>
              {totalCartItems}
            </span>
          )}
        </button>
      </div>

      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.navButton} ${styles.navButtonLeft}`}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll to previous products"
        >
          <ChevronLeft size={20} />
        </button>

        <div 
          className={styles.offersContainer} 
          ref={scrollContainerRef}
          role="list"
          aria-label="Product carousel"
        >
          {productsData.map((product) => (
            <article
              key={product.id}
              className={styles.offerCard}
              onClick={() => handleCardClick(product.id)}
              role="listitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(product.id);
                }
              }}
            >
              <div className={styles.discountBadge} aria-label={`${product.discount}% discount`}>
                Save <br />
                {product.discount}%
              </div>

              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                  loading="lazy"
                />
              </div>

              <div className={styles.cardContent}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.productTitle}>{product.title}</h3>

                <div className={styles.priceContainer}>
                  <div className={styles.priceWrapper}>
                    <span className={styles.currency}>KES</span>
                    <span className={styles.price}>
                      {product.discountedPrice.toLocaleString()}
                    </span>
                    <span className={styles.originalPrice}>
                      <span className={styles.currency}>KES</span>
                      {product.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    className={styles.cartButton}
                    onClick={(e) =>
                      handleAddToCart(
                        e,
                        product.id,
                        product.title,
                        product.discountedPrice,
                        product.image
                      )
                    }
                    aria-label={`Add ${product.title} to cart for KES ${product.discountedPrice.toLocaleString()}`}
                  >
                    <Plus size={18} className={styles.addIcon} />
                    <ShoppingCart size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          className={`${styles.navButton} ${styles.navButtonRight}`}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll to next products"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <button 
        className={styles.seeMoreButton}
        onClick={() => navigate("/beauty")}
        aria-label="See all beauty products"
      >
        See More Beauty Products
      </button>
    </section>
  );
};

export default Offers1;