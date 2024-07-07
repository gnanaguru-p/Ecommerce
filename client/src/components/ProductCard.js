import React, { useEffect } from 'react'; // Import React and useEffect
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

export default function ProductCard({ product }) {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  const cardVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.div
      className="col-sm-12 col-md-6 col-lg-3 my-3"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="card p-3 rounded">
        <motion.img
          className="card-img-top mx-auto"
          src={product.images[0].image}
          alt={product.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="card-body d-flex flex-column">
          <motion.h5
            className="card-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to={"/product/" + product._id}>{product.name}</Link>
          </motion.h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <motion.div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${(product.ratings / 5) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>

          <motion.p
            className="card-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ${product.price}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>
              <span
                id="stock_status"
                className={
                  product.stock > 0 ? "text-success" : "text-danger"
                }
              >
                {product.stock > 0
                  ? `Only ${product.stock} left in stock!`
                  : "Out of Stock"}
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              to={"/product/" + product._id}
              id="view_btn"
              className="btn btn-block"
            >
              View Details
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
