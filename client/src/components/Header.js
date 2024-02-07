import { Link } from "react-router-dom";
import Search from "./Search";

export default function Header({ cartItems }) {
  return (
    <nav className="navbar row" role="navigation">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/" aria-label="Go to home">
            <img width="150px" src="/images/logo.png" alt="Guru Logo" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to={"/cart"} aria-label="Go to cart">
          <i className="bi bi-cart" style={{ fontSize: "2rem", color: "white" }}></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning" style={{ color: "white" }} aria-hidden="true">
            {cartItems.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}
