import { useState } from 'react';
import styles from '../styles/Filters.module.css';

export default function Filters({ products, filters, setFilters }) {
  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  return (
    <div className={styles.filters}>
      <h3>Filters</h3>
      
      <div className={styles.filterSection}>
        <h4>Categories</h4>
        {categories.map(category => (
          <div key={category} className={styles.filterOption}>
            <input
              type="radio"
              id={category}
              name="category"
              checked={filters.category === category}
              onChange={() => setFilters({ ...filters, category })}
            />
            <label htmlFor={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          </div>
        ))}
      </div>

      <div className={styles.filterSection}>
        <h4>Price Range</h4>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={filters.priceRange[1]}
          onChange={e => setFilters({ 
            ...filters, 
            priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
          })}
        />
        <div className={styles.priceRangeDisplay}>
          ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h4>Minimum Rating</h4>
        {[4, 3, 2, 1].map(rating => (
          <div key={rating} className={styles.filterOption}>
            <input
              type="radio"
              id={`rating-${rating}`}
              name="rating"
              checked={filters.rating === rating}
              onChange={() => setFilters({ ...filters, rating })}
            />
            <label htmlFor={`rating-${rating}`}>
              {Array(rating).fill().map((_, i) => (
                <span key={i}>★</span>
              ))} & Up
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
