import styles from '../styles/ProductCard.module.css';

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={styles.cardBody}>
        <h3>{product.title}</h3>
        <div className={styles.price}>${product.price}</div>
        <div className={styles.rating}>
          {Array(Math.round(product.rating.rate))
            .fill()
            .map((_, i) => (
              <span key={i}>★</span>
            ))}
          ({product.rating.count})
        </div>
        <button className={styles.addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
