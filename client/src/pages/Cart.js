import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Cart({ cartItems, setCartItems }) {
    const [complete, setComplete] = useState(false);
    const controls = useAnimation();
    const { ref, inView } = useInView();
  
    useEffect(() => {
      if (inView) {
        controls.start('visible');
      } else {
        controls.start('hidden');
      }
    }, [controls, inView]);
  
    function increaseQty(item) {
      if (item.product.stock == item.qty) {
        return;
      }
      const updatedItems = cartItems.map((i) => {
        if (i.product._id == item.product._id) {
          i.qty++;
        }
        return i;
      });
      setCartItems(updatedItems);
    }
  
    function decreaseQty(item) {
      if (item.qty > 1) {
        const updatedItems = cartItems.map((i) => {
          if (i.product._id == item.product._id) {
            i.qty--;
          }
          return i;
        });
        setCartItems(updatedItems);
      }
    }
  
    function removeItem(item) {
      const updatedItems = cartItems.filter((i) => i.product._id !== item.product._id);
      setCartItems(updatedItems);
    }
  
    function placeOrderHandler() {
      fetch(`${process.env.REACT_APP_API_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItems),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to place order');
          }
          setCartItems([]);
          setComplete(true);
          toast.success('Order Success!');
        })
        .catch((error) => {
          toast.error(`Error: ${error.message}`);
        });
    }
  
    // Animation variants
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5 } },
    };
  
    return cartItems.length > 0 ? (
      <Fragment>
        <div className="container container-fluid" ref={ref}>
          <motion.h2
            className="mt-5"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            Your Cart: <b>{cartItems.length} items</b>
          </motion.h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <Fragment key={item.product._id}>
                  <hr />
                  <motion.div className="cart-item" variants={containerVariants} initial="hidden" animate={controls}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img src={item.product.images[0].image} alt={item.product.name} height="90" width="115" />
                      </div>
  
                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                      </div>
  
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.product.price}</p>
                      </div>
  
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                          <input type="number" id="form-control count d-inline" className="form-control count d-inline" value={item.qty} readOnly />
                          <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                        </div>
                      </div>
  
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i id="delete_cart_item" onClick={() => removeItem(item)} className="fa fa-trash btn btn-danger"></i>
                      </div>
                    </div>
                  </motion.div>
                </Fragment>
              ))}
            </div>
  
            <div className="col-12 col-lg-3 my-4">
              <motion.div id="order_summary" variants={containerVariants} initial="hidden" animate={controls}>
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal: <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + item.qty), 0)} (Units)</span></p>
                <p>Est. total: <span className="order-summary-values">${Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2)}</span></p>
                <hr />
                <motion.button
                  id="checkout_btn"
                  onClick={placeOrderHandler}
                  className="btn btn-primary btn-block"
                  variants={containerVariants}
                  initial="hidden"
                  animate={controls}
                >
                  Place Order
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </Fragment>
    ) : (!complete ? (
      <motion.h2 className="mt-5" variants={containerVariants} initial="hidden" animate={controls}>
        Your Cart is Empty!
      </motion.h2>
    ) : (
      <Fragment>
        <motion.h2 className="mt-5" variants={containerVariants} initial="hidden" animate={controls}>
          Order Complete!
        </motion.h2>
        <motion.p variants={containerVariants} initial="hidden" animate={controls}>
          Your order has been placed successfully.
        </motion.p>
      </Fragment>
    ));
  }
  