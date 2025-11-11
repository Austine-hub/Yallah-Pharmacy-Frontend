import React from 'react';
import styles from './Diapers.module.css';


// === CATEGORY IMAGES ===
import pic1 from "../assets/photos/Nan1.png";
import pic2 from "../assets/photos/Diaper1.png";
import pic3 from "../assets/photos/Diaper2.png";
import pic4 from "../assets/photos/Diaper3.png";
import pic5 from "../assets/photos/LiptomilPlus.png";
import pic6 from "../assets/photos/DoveBabyBarSoap.png";
import pic7 from "../assets/photos/BennettsBabyBarSoap.png";
import pic8 from "../assets/photos/Huggies.png";

interface Product {
  id: string;
  category: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    category: 'Baby Foods',
    name: 'Nan 1 400G 0-6Months',
    price: 2300.00,
    image: pic1
  },
  {
    id: '2',
    category: 'Baby Hygiene',
    name: 'NipNap Diaper Jumbo Max 60\'s',
    price: 1450.00,
    image: pic2
  },
  {
    id: '3',
    category: 'Baby Hygiene',
    name: 'Neli&Co Large Eco diapers(9kgs-15kgs) 30\'s',
    price: 2547.00,
    image: pic3
  },
  {
    id: '4',
    category: 'Baby Cleaning & Skin Care',
    name: 'Epimol-B Plus Cream 450g',
    price: 1543.00,
    originalPrice: 1815.00,
    discount: '15% Off',
    image: pic4
  },
  {
    id: '5',
    category: 'Baby Foods',
    name: 'Liptomil Plus 0-6 months 400g',
    price: 1990.00,
    image: pic5
  },
  {
    id: '6',
    category: 'Baby Cleaning & Skin Care',
    name: 'Dove Baby Bar Soap 90g',
    price: 225.00,
    image: pic6
  },
  {
    id: '7',
    category: 'Baby Cleaning & Skin Care',
    name: 'Bennetts Baby Bar Soap 100g',
    price: 655.00,
    originalPrice: 770.00,
    discount: '15% Off',
    image: pic7
  },
  {
    id: '8',
    category: 'Baby Hygiene',
    name: 'Huggies Dry Comfort Pants Size 4 56s',
    price: 2099.00,
    image: pic8
  }
];

const Diapers: React.FC = () => {
  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
  };

  const handleToggleFavorite = (productId: string) => {
    console.log('Toggle favorite:', productId);
  };

  const formatPrice = (price: number): string => {
    return `KES ${price.toFixed(2)}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {products.map((product) => (
          <article key={product.id} className={styles.card}>
            {product.discount && (
              <span className={styles.badge}>{product.discount}</span>
            )}
            
            <div className={styles.actions}>
              <button
                className={styles.iconButton}
                onClick={() => handleToggleFavorite(product.id)}
                aria-label="Add to wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <button
                className={styles.iconButton}
                aria-label="Quick view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>

            <div className={styles.imageWrapper}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.image}
              />
            </div>

            <div className={styles.content}>
              <span className={styles.category}>{product.category}</span>
              <h3 className={styles.title}>{product.name}</h3>
              
              <div className={styles.priceWrapper}>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className={styles.price}>{formatPrice(product.price)}</span>
              </div>

              <button
                className={styles.addButton}
                onClick={() => handleAddToCart(product.id)}
              >
                <span className={styles.plusIcon}>+</span>
                Add To Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Diapers;