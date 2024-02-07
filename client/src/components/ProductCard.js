import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={product.images[0].image} alt={product.image}/>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={"/product/" + product._id}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <p className="card-text">${product.price}</p>

          <div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>

          <div>
            <p>
              <span
                id="stock_status"
                className={product.stock > 0 ? "text-success" : "text-danger"}
              >
                {product.stock > 0
                  ? `Only ${product.stock} left in stock!`
                  : "Out of Stock"}
              </span>
            </p>
          </div>

          <Link
            to={"/product/" + product._id}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
