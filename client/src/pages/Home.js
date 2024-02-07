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
        setLoading(true); // Set loading state to true when starting the fetch
        setError(null); // Reset error state
        fetch(`${process.env.REACT_APP_API_URL}/products?${searchParams}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                return res.json();
            })
            .then(res => {
                setProducts(res.products);
                setLoading(false); // Set loading state to false after successful fetch
            })
            .catch(error => {
                setError(error.message); // Set error state if fetch fails
                setLoading(false); // Set loading state to false if fetch fails
            });
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
