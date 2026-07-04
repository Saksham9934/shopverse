import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center gap-1 text-yellow-500 text-sm">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {value >= star ? (
            <FaStar />
          ) : value >= star - 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
      {text && <span className="text-gray-500 ml-1">{text}</span>}
    </div>
  );
};

export default Rating;
