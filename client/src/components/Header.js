import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Search from './Search';

export default function Header({ cartItems }) {
  return (
    <motion.nav
      className="navbar row"
      initial={{ opacity: 0, y: -50 }} // Initial animation state (hidden)
      animate={{ opacity: 1, y: 0 }} // Animation when component is in view
      transition={{ duration: 0.5 }} // Animation duration
      role="navigation"
    >
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/" aria-label="Go to home">
            <motion.img
              width="150px"
              src="/images/logo.png"
              alt="Guru Logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Search />
        </motion.div>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" aria-label="Go to cart">
          <motion.i
            className="bi bi-cart"
            style={{ fontSize: "2rem", color: "white" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          ></motion.i>
          <motion.span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning"
            style={{ color: "white" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            aria-hidden="true"
          >
            {cartItems.length}
          </motion.span>
        </Link>
      </div>
    </motion.nav>
  );
}
