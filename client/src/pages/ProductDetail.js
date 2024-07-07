import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // Import useInView

export default function ProductDetail({ cartItems, setCartItems }) {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/product/' + id)
      .then((res) => res.json())
      .then((res) => setProduct(res.product));
  }, [id]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  function addToCart() {
    const itemExist = cartItems.find((item) => item.product._id === product._id);
    if (!itemExist) {
      const newItem = { product, qty };
      setCartItems((state) => [...state, newItem]);
      toast.success('Cart Item added successfully!');
    }
  }

  function increaseQty() {
    if (product.stock === qty) {
      return;
    }
    setQty((state) => state + 1);
  }

  function decreaseQty() {
    if (qty > 1) {
      setQty((state) => state - 1);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return product ? (
    <motion.div
      className="container container-fluid"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      exit="hidden"
    >
      <motion.div className="row f-flex justify-content-around" variants={itemVariants} ref={ref}>
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <motion.img
            src={product.images[0].image}
            alt="Product"
            height="500"
            width="325"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {product.name}
          </motion.h3>
          <motion.p
            id="product_id"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Product #{product._id}
          </motion.p>

          <hr />

          <motion.div
            className="rating-outer"
            style={{ width: `${product.ratings / 5 * 100}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="rating-inner"
              initial={{ width: 0 }}
              animate={{ width: `${product.ratings / 5 * 100}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </motion.div>

          <hr />

          <motion.p
            id="product_price"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ${product.price}
          </motion.p>
          <motion.div
            className="stockCounter d-inline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="btn btn-danger minus" onClick={decreaseQty}>
              -
            </span>

            <input
              type="number"
              className="form-control count d-inline"
              value={qty}
              readOnly
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            <span className="btn btn-primary plus" onClick={increaseQty}>
              +
            </span>
          </motion.div>
          <motion.button
            type="button"
            onClick={addToCart}
            disabled={product.stock === 0}
            id="cart_btn"
            className="btn btn-primary d-inline ml-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Add to Cart
          </motion.button>

          <hr />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-2"
          >
            Status: <span id="stock_status" className={product.stock > 0 ? 'text-success' : 'text-danger'}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </motion.p>

          <hr />

          <motion.h4
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Description:
          </motion.h4>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {product.description}
          </motion.p>
          <hr />
          <motion.p
            id="product_seller mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Sold by: <strong>{product.seller}</strong>
          </motion.p>

          <div className="rating w-50"></div>
        </div>
      </motion.div>
    </motion.div>
  ) : null;
}
