import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  // Fetch data from external API (FakeStoreAPI in this case)
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  // Pass data to the page via props
  return { props: { products } };
}

export default function ProductListingPage({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
  });

  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    if (filters.category !== 'all') {
      result = result.filter(product => product.category === filters.category);
    }
    
    result = result.filter(
      product => product.price >= filters.priceRange[0] && 
                product.price <= filters.priceRange[1]
    );
    
    if (filters.rating > 0) {
      result = result.filter(
        product => Math.round(product.rating.rate) >= filters.rating
      );
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, products]);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <Head>
        <title>Product Listing Page</title>
        <meta name="description" content="Browse our products" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1>All Products</h1>
          <p>{filteredProducts.length} products found</p>
        </div>

        <div className={styles.content}>
          <Filters 
            products={products} 
            filters={filters} 
            setFilters={setFilters} 
          />

          <div className={styles.productGrid}>
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products match your filters.</p>
            )}
          </div>
        </div>

        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  // Fetch data from external API (FakeStoreAPI in this case)
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  // Pass data to the page via props
  return { props: { products } };
}

export default function ProductListingPage({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
  });

  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    if (filters.category !== 'all') {
      result = result.filter(product => product.category === filters.category);
    }
    
    result = result.filter(
      product => product.price >= filters.priceRange[0] && 
                product.price <= filters.priceRange[1]
    );
    
    if (filters.rating > 0) {
      result = result.filter(
        product => Math.round(product.rating.rate) >= filters.rating
      );
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, products]);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <Head>
        <title>Product Listing Page</title>
        <meta name="description" content="Browse our products" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1>All Products</h1>
          <p>{filteredProducts.length} products found</p>
        </div>

        <div className={styles.content}>
          <Filters 
            products={products} 
            filters={filters} 
            setFilters={setFilters} 
          />

          <div className={styles.productGrid}>
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products match your filters.</p>
            )}
          </div>
        </div>

        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}
