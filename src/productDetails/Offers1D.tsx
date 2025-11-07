import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ShoppingCart,
    MessageCircle,
    Heart,
    Share2,
    ChevronRight,
    Star,
    Truck,
    Shield,
    RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";
import { getProductById, getSimilarProducts } from "../data/Offers1";
import type { Product } from "../data/Offers1";
import { useCart } from "../context/CartContext";
import styles from "./Offers1D.module.css";

const Offers1D: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState<"description" | "reviews" | "shipping">("description");
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    const product: Product | undefined = id ? getProductById(id) : undefined;
    const similarProducts: Product[] = id ? getSimilarProducts(id) : [];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setQuantity(1);
        setIsWishlisted(false);
        setSelectedImage(0);
    }, [id]);

    if (!product) {
        return (
            <div className={styles.notFound}>
                <div className={styles.notFoundContent}>
                    <h1>Product Not Found</h1>
                    <p>Sorry, the product you're looking for doesn't exist.</p>
                    <button onClick={() => navigate("/")} className={styles.backBtn}>
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (quantity > product.stock) {
            toast.error(`Only ${product.stock} units available!`);
            return;
        }

        addToCart({
            id: product.id,
            name: product.title,
            price: product.discountedPrice,
            image: product.image,
            quantity: quantity,
        });

        toast.success(`${quantity} × ${product.title} added to cart!`, {
            duration: 3000,
            icon: "🛒",
        });
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate("/cart");
    };

    const handleChatClick = () => {
        toast("Chat feature coming soon! 💬", { icon: "💬" });
    };

    const handleWishlistToggle = () => {
        setIsWishlisted(!isWishlisted);
        toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist!", {
            icon: isWishlisted ? "💔" : "❤️",
        });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.title,
                    text: product.description,
                    url: window.location.href,
                });
            } catch {
                console.log("Share cancelled");
            }
        } else {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    const savingsAmount = product.originalPrice - product.discountedPrice;
    const savingsPercentage = ((savingsAmount / product.originalPrice) * 100).toFixed(0);

    // Mock images for gallery (in real app, would come from product data)
    const productImages = [product.image, product.image, product.image];

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {/* Breadcrumb Navigation */}
                <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                    <Link to="/">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/beauty">Beauty & Personal Care</Link>
                    <ChevronRight size={14} />
                    <span className={styles.current}>{product.title}</span>
                </nav>

                {/* Main Product Section */}
                <div className={styles.productSection}>
                    {/* Image Gallery */}
                    <div className={styles.gallerySection}>
                        <div className={styles.mainImageWrapper}>
                            {product.discount > 0 && (
                                <div className={styles.discountBadge} aria-label={`${product.discount}% off`}>
                                    -{product.discount}%
                                </div>
                            )}
                            <img 
                                src={productImages[selectedImage]} 
                                alt={product.title}
                                className={styles.mainImage}
                            />
                        </div>
                        <div className={styles.thumbnailGrid}>
                            {productImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    className={`${styles.thumbnail} ${selectedImage === idx ? styles.activeThumbnail : ''}`}
                                    onClick={() => setSelectedImage(idx)}
                                    aria-label={`View image ${idx + 1}`}
                                >
                                    <img src={img} alt={`${product.title} view ${idx + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className={styles.infoSection}>
                        <div className={styles.topBar}>
                            <span className={styles.categoryBadge}>{product.category}</span>
                            <div className={styles.actionIcons}>
                                <button
                                    className={`${styles.iconBtn} ${isWishlisted ? styles.wishlisted : ''}`}
                                    onClick={handleWishlistToggle}
                                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                >
                                    <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
                                </button>
                                <button className={styles.iconBtn} onClick={handleShare} aria-label="Share">
                                    <Share2 size={22} />
                                </button>
                            </div>
                        </div>

                        <h1 className={styles.productTitle}>{product.title}</h1>

                        {/* Rating (Mock) */}
                        <div className={styles.ratingSection}>
                            <div className={styles.stars}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="#ffa41c" color="#ffa41c" />
                                ))}
                            </div>
                            <span className={styles.ratingText}>4.8 (256 reviews)</span>
                        </div>

                        {/* Price Section */}
                        <div className={styles.priceBlock}>
                            <div className={styles.priceRow}>
                                <span className={styles.currentPrice}>
                                    KES {product.discountedPrice.toLocaleString()}
                                </span>
                                <span className={styles.originalPrice}>
                                    KES {product.originalPrice.toLocaleString()}
                                </span>
                            </div>
                            <div className={styles.savingsBadge}>
                                Save KES {savingsAmount.toLocaleString()} ({savingsPercentage}%)
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className={styles.stockStatus}>
                            {product.stock > 10 ? (
                                <div className={styles.inStock}>
                                    <span className={styles.statusDot}></span>
                                    In Stock ({product.stock} available)
                                </div>
                            ) : (
                                <div className={styles.lowStock}>
                                    <span className={styles.statusDot}></span>
                                    Only {product.stock} left - Order soon!
                                </div>
                            )}
                        </div>

                        {/* Key Features */}
                        <div className={styles.features}>
                            <div className={styles.featureItem}>
                                <Truck size={20} />
                                <div>
                                    <strong>Free Delivery</strong>
                                    <span>{product.delivery}</span>
                                </div>
                            </div>
                            <div className={styles.featureItem}>
                                <Shield size={20} />
                                <div>
                                    <strong>Secure Payment</strong>
                                    <span>100% secure transactions</span>
                                </div>
                            </div>
                            <div className={styles.featureItem}>
                                <RotateCcw size={20} />
                                <div>
                                    <strong>Easy Returns</strong>
                                    <span>7-day return policy</span>
                                </div>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className={styles.quantitySection}>
                            <label htmlFor="quantity" className={styles.quantityLabel}>Quantity:</label>
                            <div className={styles.quantityControls}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max={product.stock}
                                    value={quantity}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value) || 1;
                                        setQuantity(Math.min(product.stock, Math.max(1, value)));
                                    }}
                                    aria-label="Product quantity"
                                />
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={quantity >= product.stock}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actionButtons}>
                            <button className={styles.buyNowBtn} onClick={handleBuyNow}>
                                Buy Now
                            </button>
                            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                        </div>

                        <button className={styles.chatBtn} onClick={handleChatClick}>
                            <MessageCircle size={20} />
                            Chat with Seller
                        </button>

                        {/* Product Details Card */}
                        <div className={styles.detailsCard}>
                            <h3>Product Information</h3>
                            <dl className={styles.detailsList}>
                                <div className={styles.detailRow}>
                                    <dt>Category</dt>
                                    <dd>{product.category}</dd>
                                </div>
                                <div className={styles.detailRow}>
                                    <dt>Group</dt>
                                    <dd>{product.group}</dd>
                                </div>
                                <div className={styles.detailRow}>
                                    <dt>Delivery</dt>
                                    <dd>{product.delivery}</dd>
                                </div>
                                <div className={styles.detailRow}>
                                    <dt>Pickup</dt>
                                    <dd>{product.pickup}</dd>
                                </div>
                                <div className={styles.detailRow}>
                                    <dt>Payment</dt>
                                    <dd>{product.paymentOptions.join(", ")}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className={styles.tabsSection}>
                    <div className={styles.tabsNav}>
                        <button
                            className={`${styles.tabBtn} ${activeTab === "description" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("description")}
                        >
                            Description
                        </button>
                        <button
                            className={`${styles.tabBtn} ${activeTab === "reviews" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("reviews")}
                        >
                            Reviews (256)
                        </button>
                        <button
                            className={`${styles.tabBtn} ${activeTab === "shipping" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("shipping")}
                        >
                            Shipping & Returns
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === "description" && (
                            <div className={styles.descriptionContent}>
                                <h2>Product Description</h2>
                                <p className={styles.shortDesc}>{product.description}</p>
                                {product.fullDescription && <p className={styles.fullDesc}>{product.fullDescription}</p>}
                                {product.howToUse && (
                                    <div className={styles.section}>
                                        <h3>How to Use</h3>
                                        <p>{product.howToUse}</p>
                                    </div>
                                )}
                                {product.ingredients && product.ingredients.length > 0 && (
                                    <div className={styles.section}>
                                        <h3>Key Ingredients</h3>
                                        <ul className={styles.ingredientsList}>
                                            {product.ingredients.map((ingredient, idx) => (
                                                <li key={idx}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div className={styles.reviewsContent}>
                                <h2>Customer Reviews</h2>
                                <div className={styles.reviewsEmpty}>
                                    <p>No reviews yet.</p>
                                    <p>Be the first to review this product!</p>
                                    <button className={styles.writeReviewBtn}>Write a Review</button>
                                </div>
                            </div>
                        )}

                        {activeTab === "shipping" && (
                            <div className={styles.shippingContent}>
                                <h2>Shipping & Returns</h2>
                                <div className={styles.section}>
                                    <h3>Delivery Information</h3>
                                    <p>{product.delivery}</p>
                                    <p>Standard delivery within 3-5 business days</p>
                                </div>
                                <div className={styles.section}>
                                    <h3>Return Policy</h3>
                                    <p>7-day return policy. Items must be unused and in original packaging.</p>
                                </div>
                                <div className={styles.section}>
                                    <h3>Pickup Options</h3>
                                    <p>{product.pickup}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Similar Products */}
                {similarProducts.length > 0 && (
                    <section className={styles.similarSection} id="similar-products">
                        <h2>You Might Also Like</h2>
                        <div className={styles.similarGrid}>
                            {similarProducts.map((item) => (
                                <article
                                    key={item.id}
                                    className={styles.similarCard}
                                    onClick={() => navigate(`/product/${item.id}`)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            navigate(`/product/${item.id}`);
                                        }
                                    }}
                                >
                                    <div className={styles.similarImageWrapper}>
                                        {item.discount > 0 && (
                                            <div className={styles.similarDiscount}>-{item.discount}%</div>
                                        )}
                                        <img src={item.image} alt={item.title} loading="lazy" />
                                    </div>
                                    <div className={styles.similarContent}>
                                        <span className={styles.similarCategory}>{item.category}</span>
                                        <h3 className={styles.similarTitle}>{item.title}</h3>
                                        <div className={styles.similarPricing}>
                                            <span className={styles.similarPrice}>
                                                KES {item.discountedPrice.toLocaleString()}
                                            </span>
                                            <span className={styles.similarOldPrice}>
                                                KES {item.originalPrice.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Offers1D;