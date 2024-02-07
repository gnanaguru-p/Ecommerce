import React, { Fragment, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading state to true when starting the fetch
            setError(null); // Reset error state

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products?${searchParams}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                setError(error.message); // Set error state if fetch fails
            } finally {
                setLoading(false); // Set loading state to false after fetch completes
            }
        };

        fetchData();
    }, [searchParams]);

    return (
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <div>Error: {error}</div>
            ) : products.length === 0 ? (
                <div>No products found</div>
            ) : (
                <section id="products" className="container mt-5">
                    <div className="row">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </section>
            )}
        </Fragment>
    );
}
