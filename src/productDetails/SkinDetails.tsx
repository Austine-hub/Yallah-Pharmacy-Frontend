import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

import { 
    getProductBySlug, 
    getRelatedProducts,
    formatPrice, 
    calculateSavings,
    type SkinProduct
} from '../data/SkinData';

import styles from './Offers.module.css';

// Placeholder for useCart hook
const useCart = () => ({
    addToCart: (item: any) => console.log('Adding to cart (Placeholder):', item),
});

type ProductType = SkinProduct;
type TabType = 'ingredients' | 'usage' | 'warnings';

// ===============================================================
// Related Product Card Component
// ===============================================================
interface RelatedProductCardProps {
    product: ProductType;
}

const RelatedProductCard: React.FC<RelatedProductCardProps> = ({ product }) => (
    <Link to={`/skin/${product.slug}`} className={styles.relatedLink}>
        <div className={styles.relatedCard}>
            <img 
                src={product.image} 
                alt={product.name} 
                className={styles.relatedImage} 
                loading="lazy"
            />
            <h4 className={styles.relatedName}>{product.name}</h4>
            <div className={styles.relatedPrices}>
                <p className={styles.relatedPrice}>{formatPrice(product.price)}</p>
                {product.discount > 0 && (
                    <span className={styles.relatedOldPrice}>{formatPrice(product.oldPrice)}</span>
                )}
            </div>
        </div>
    </Link>
);

// ===============================================================
// Main Detail Component
// ===============================================================
const SkinDetails: React.FC = () => {
    const { id: slug } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [product, setProduct] = useState<ProductType | null>(null);
    const [mainImage, setMainImage] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>('ingredients');

    // Helper function to determine default tab
    const getDefaultTab = (prod: ProductType): TabType => {
        if (prod.ingredients && prod.ingredients.length > 0) return 'ingredients';
        if (prod.usage) return 'usage';
        if (prod.warnings && prod.warnings.length > 0) return 'warnings';
        return 'ingredients';
    };

    useEffect(() => {
        if (!slug) {
            navigate('/404');
            return;
        }
        
        const fetchedProduct = getProductBySlug(slug);

        if (fetchedProduct) {
            setProduct(fetchedProduct);
            
            // Initialize main image
            const initialImage = fetchedProduct.gallery?.[0] || fetchedProduct.image;
            setMainImage(initialImage);
            
            // Set default tab
            setActiveTab(getDefaultTab(fetchedProduct));
            
            // Fetch related products
            const related = getRelatedProducts(fetchedProduct.slug);
            setRelatedProducts(related);
        } else {
            setProduct(null);
        }
    }, [slug, navigate]); 
    
    // Handlers
    const handleAddToCart = () => {
        if (!product || !product.inStock) {
            toast.error('Product is out of stock', { duration: 2000 });
            return;
        }

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });

        toast.success(
            `${quantity} x ${product.name} added to cart!`,
            { duration: 2000, position: 'bottom-center' }
        );
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };
    
    const handleRatingClick = () => {
        console.log('Navigating to reviews/rating section.');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleRatingClick();
        }
    };

    // Render tab content
    const renderActiveTabContent = () => {
        if (!product) return null;

        switch (activeTab) {
            case 'ingredients':
                return product.ingredients && product.ingredients.length > 0 ? (
                    <ul className={styles.detailList}>
                        {product.ingredients.map((ing, index) => (
                            <li key={index}>{ing}</li>
                        ))}
                    </ul>
                ) : <p>No ingredient information available.</p>;
            
            case 'usage':
                return product.usage ? (
                    <p>{product.usage}</p>
                ) : (
                    <p>No usage directions provided.</p>
                );
            
            case 'warnings':
                return product.warnings && product.warnings.length > 0 ? (
                    <ul className={styles.detailList}>
                        {product.warnings.map((warn, index) => (
                            <li key={index}>⚠️ {warn}</li>
                        ))}
                    </ul>
                ) : <p>No specific warnings listed.</p>;
            
            default:
                return null;
        }
    };

    // Loading state
    if (!product) {
        return <div className={styles.loading}>Product not found.</div>;
    }

    const galleryImages = product.gallery && product.gallery.length > 0 
        ? product.gallery 
        : [product.image];
        
    const { rating, reviewCount, description, oldPrice, price, discount, inStock } = product;
    
    const hasIngredients = Boolean(product.ingredients && product.ingredients.length > 0);
    const hasWarnings = Boolean(product.warnings && product.warnings.length > 0);

    return (
        <div className={styles.skinDetailsContainer}>
            
            <header className={styles.productHeader} aria-label={`Details for ${product.name}`}>
                <h1 className={styles.detailTitle}>{product.name}</h1>
                <p className={styles.detailCategory}>{product.category.toUpperCase().replace('-', ' ')}</p>
            </header>
            
            <div className={styles.detailsContent}>
                
                {/* Image Gallery */}
                <div className={styles.imageGallery}>
                    <div className={styles.thumbnails}>
                        {galleryImages.map((imgSrc, index) => (
                            <img 
                                key={index}
                                src={imgSrc}
                                alt={`View ${index + 1} of ${product.name}`}
                                className={`${styles.thumbnail} ${mainImage === imgSrc ? styles.activeThumbnail : ''}`}
                                onClick={() => setMainImage(imgSrc)}
                                loading="lazy"
                            />
                        ))}
                    </div>
                    
                    <div className={styles.mainImageWrapper}>
                        <img 
                            src={mainImage} 
                            alt={product.name} 
                            className={styles.mainImage} 
                        />
                        {discount > 0 && (
                            <div className={styles.discountTag} aria-label={`${discount}% discount`}>
                                -{discount}%
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Information */}
                <div className={styles.productInfo}>
                    <p className={styles.productDescription}>{description}</p>

                    <div 
                        className={styles.ratingInfo} 
                        onClick={handleRatingClick}
                        onKeyDown={handleKeyDown}
                        role="button" 
                        tabIndex={0}
                        aria-label={`Rating: ${rating} stars with ${reviewCount} reviews`}
                    >
                        <span className={styles.starRating}>
                            <Star size={16} fill="currentColor" className={styles.starIcon} />
                            <span>{rating}</span>
                        </span>
                        <span className={styles.reviewCount}>({reviewCount} Reviews)</span>
                    </div>

                    <div className={styles.priceSection}>
                        <span className={styles.currentPrice}>{formatPrice(price)}</span>
                        {discount > 0 && (
                            <>
                                <span className={styles.oldPrice}>{formatPrice(oldPrice)}</span>
                                <p className={styles.savings}>
                                    You save {formatPrice(calculateSavings(oldPrice, price))}!
                                </p>
                            </>
                        )}
                    </div>

                    <div className={styles.stockStatus}>
                        Availability: <span className={inStock ? styles.inStock : styles.outOfStock}>
                            {inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    <div className={styles.purchaseControls}>
                        <input
                            type="number"
                            min="1"
                            max="99"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className={styles.quantityInput}
                            disabled={!inStock}
                            aria-label="Quantity selector"
                        />
                        <button 
                            className={styles.addToCartButton} 
                            onClick={handleAddToCart}
                            disabled={!inStock}
                            aria-label={`Add ${quantity} ${product.name} to cart`}
                        >
                            <ShoppingCart size={20} style={{ marginRight: '8px' }}/>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className={styles.productDetailsTabs}>
                <h2>Product Details</h2>
                
                <div className={styles.tabHeaders} role="tablist">
                    {hasIngredients && (
                        <button 
                            role="tab"
                            aria-selected={activeTab === 'ingredients'}
                            className={activeTab === 'ingredients' ? styles.activeTab : ''}
                            onClick={() => setActiveTab('ingredients')}
                        >
                            Ingredients
                        </button>
                    )}
                    {product.usage && (
                        <button 
                            role="tab"
                            aria-selected={activeTab === 'usage'}
                            className={activeTab === 'usage' ? styles.activeTab : ''}
                            onClick={() => setActiveTab('usage')}
                        >
                            Directions for Use
                        </button>
                    )}
                    {hasWarnings && (
                        <button 
                            role="tab"
                            aria-selected={activeTab === 'warnings'}
                            className={activeTab === 'warnings' ? styles.activeTab : ''}
                            onClick={() => setActiveTab('warnings')}
                        >
                            Warnings
                        </button>
                    )}
                </div>
                
                <div className={styles.tabContent} role="tabpanel">
                    {renderActiveTabContent()}
                </div>
            </div>
            
            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className={styles.relatedProductsSection}>
                    <h2>You Might Also Like</h2>
                    <div className={styles.relatedGrid}>
                        {relatedProducts.map(rel => (
                            <RelatedProductCard key={rel.id} product={rel} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkinDetails;