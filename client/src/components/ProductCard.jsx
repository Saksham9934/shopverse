import { Link } from "react-router-dom";
import Rating from "./Rating.jsx";

const ProductCard = ({ product }) => (
  <Link
    to={`/product/${product._id}`}
    className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
  >
    <div className="h-48 overflow-hidden bg-gray-100">
      <img
        src={product.image?.url}
        alt={product.name}
        className="w-full h-full object-cover hover:scale-105 transition"
      />
    </div>
    <div className="p-4 flex flex-col flex-1">
      <h3 className="font-medium text-gray-800 line-clamp-2 mb-1">{product.name}</h3>
      <Rating value={product.rating} text={`(${product.numReviews})`} />
      <p className="mt-2 text-lg font-bold text-brand-700">₹{product.price.toLocaleString("en-IN")}</p>
    </div>
  </Link>
);

export default ProductCard;
