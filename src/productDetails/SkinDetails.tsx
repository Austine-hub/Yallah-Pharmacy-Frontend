import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    getProductBySlug, 
    getRelatedProducts,
    formatPrice, 
    calculateSavings,
    // Use type-only import for SkinProduct
    type SkinProduct // <--- FIX for TS1484
} from '../data/SkinData'; // Adjust the path to your SkinData.ts file

// Import CSS module (Assuming you named it SkinDetails.module.css)
// NOTE: I'm keeping 'ShopD.module.css' as per your original code's path
import styles from './ShopD.module.css'; 

// Placeholder component for related products (you'd need to create this)
// Uses the imported type
const RelatedProductCard: React.FC<{ product: SkinProduct }> = ({ product }) => (
    <div className={styles.relatedCard} onClick={() => { /* Navigation logic if not wrapped in <a> */ }}>
        <img src={product.image} alt={product.name} className={styles.relatedImage} />
        <h4 className={styles.relatedName}>{product.name}</h4>
        <p className={styles.relatedPrice}>{formatPrice(product.price)}</p>
    </div>
);


const SkinDetails: React.FC = () => {
    // We use 'id' in the route path, but best practice is to treat it as the slug
    const { id: slug } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState<SkinProduct | null>(null);
    const [mainImage, setMainImage] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    
    // State for related products
    const [relatedProducts, setRelatedProducts] = useState<SkinProduct[]>([]);

    // --- Removed Unused State for TS6133 ---
    // const [reviews, setReviews] = useState<Review[]>([]); 
    // const [activeTab, setActiveTab] = useState<...>(...); 
    // ----------------------------------------

    useEffect(() => {
        if (!slug) {
            console.error("Product slug is missing.");
            return;
        }

        // 1. Fetch the main product data
        const fetchedProduct = getProductBySlug(slug);

        if (fetchedProduct) {
            setProduct(fetchedProduct);
            // Initialize main image from the first image in the gallery, or the main image field
            const initialImage = fetchedProduct.gallery?.[0] || fetchedProduct.image;
            setMainImage(initialImage);
            
            // 2. Fetch related products (using ID for the utility function)
            const related = getRelatedProducts(fetchedProduct.id);
            setRelatedProducts(related);

        } else {
            setProduct(null);
        }
    }, [slug, navigate]); // Re-run effect when the slug changes
    
    if (!product) {
        return <div className={styles.loading}>Product not found or still loading...</div>;
    }

    // Determine the array of images to use for the gallery/thumbnails
    const galleryImages = product.gallery && product.gallery.length > 0 
        ? product.gallery 
        : [product.image];

    // --- Handlers ---
    const handleAddToCart = () => {
        // Implement your cart logic here (e.g., using context or Redux)
        console.log(`Added ${quantity} x ${product.name} to cart.`);
        // Example: dispatch(addItemToCart({ ...product, quantity }));
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const handleRatingClick = () => {
        // Scroll to the review section or open a review modal
        console.log('Navigating to reviews/rating section.');
        // document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
    };

    // --- Removed Unused Function for TS6133 ---
    // const renderList = (items: string[], highlight = false) => ( ... );
    // -------------------------------------------

    return (
        <div className={styles.skinDetailsContainer}>
            <div className={styles.productHeader}>
                <h1>{product.name}</h1>
            </div>
            
            <div className={styles.detailsContent}>
                
                {/* 1. Image Gallery and Main View */}
                <div className={styles.imageGallery}>
                    {/* Thumbnail Navigation */}
                    <div className={styles.thumbnails}>
                        {galleryImages.map((imgSrc, index) => (
                            <img 
                                key={index}
                                src={imgSrc}
                                alt={`View ${index + 1}`}
                                className={`${styles.thumbnail} ${mainImage === imgSrc ? styles.activeThumbnail : ''}`}
                                onClick={() => setMainImage(imgSrc)}
                            />
                        ))}
                    </div>
                    
                    {/* Main Image */}
                    <div className={styles.mainImageWrapper}>
                        <img src={mainImage} alt={product.name} className={styles.mainImage} />
                    </div>
                </div>

                {/* 2. Product Information and Purchase */}
                <div className={styles.productInfo}>
                    <p className={styles.productDescription}>{product.description}</p>

                    <div className={styles.ratingInfo} onClick={handleRatingClick}>
                        {/* You would use an icon library here (e.g., Font Awesome/Lucide) 
                            The original SkincareDetails.tsx had an unused 'MessageCircle' import, 
                            which would typically be used here. 
                        */}
                        <span className={styles.starRating}>
                            {'★'.repeat(Math.round(product.rating || 0))}
                            {'☆'.repeat(5 - Math.round(product.rating || 0))}
                        </span>
                        <span className={styles.reviewCount}>({product.reviewCount} Reviews)</span>
                    </div>

                    <div className={styles.priceSection}>
                        <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                        {product.discount > 0 && (
                            <>
                                <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
                                <span className={styles.discountBadge}>
                                    {product.discount}% OFF
                                </span>
                            </>
                        )}
                        {product.discount > 0 && (
                             <p className={styles.savings}>
                                You save {formatPrice(calculateSavings(product.oldPrice, product.price))}!
                            </p>
                        )}
                    </div>

                    <div className={styles.stockStatus}>
                        Status: <span className={product.inStock ? styles.inStock : styles.outOfStock}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    <div className={styles.purchaseControls}>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className={styles.quantityInput}
                            disabled={!product.inStock}
                        />
                        <button 
                            className={styles.addToCartButton} 
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Detailed Tabs (Ingredients, Usage, Warnings) - Now just sections */}
            <div className={styles.productDetailsTabs}>
                <h2>Product Details</h2>
                
                {product.ingredients && product.ingredients.length > 0 && (
                    <div className={styles.detailSection}>
                        <h3>Ingredients</h3>
                        <ul className={styles.detailList}>
                            {product.ingredients.map((ing, index) => (
                                <li key={index}>{ing}</li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {product.usage && (
                    <div className={styles.detailSection}>
                        <h3>Directions for Use</h3>
                        <p>{product.usage}</p>
                    </div>
                )}
                
                {product.warnings && product.warnings.length > 0 && (
                    <div className={styles.detailSection}>
                        <h3>⚠️ Warnings</h3>
                        <ul className={styles.detailList}>
                            {product.warnings.map((warn, index) => (
                                <li key={index}>{warn}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            {/* 4. Related Products */}
            {relatedProducts.length > 0 && (
                <div className={styles.relatedProductsSection}>
                    <h2>You Might Also Like</h2>
                    <div className={styles.relatedGrid}>
                        {relatedProducts.map(rel => (
                            // Linking back to the skin route using the product's slug
                            <a 
                                key={rel.id} 
                                href={`/skin/${rel.slug}`} 
                                className={styles.relatedLink}
                            >
                                <RelatedProductCard product={rel} />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkinDetails;