import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rating, numReviews}) => {
  const getStar = (index) => {
    if (rating >= index) return <FaStar />;
    if (rating >= index - 0.5) return <FaStarHalfAlt />;
    return <FaRegStar />;
  };

  return (
    <div className="rating flex gap-1 items-center text-yellow-500">
      {numReviews > 0 ? (
        <>
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star}>{getStar(star)}</span>
          ))}
          <span className="ml-2 text-gray-600">{numReviews} reviews</span>
        </>
      ) : (
        <span className="text-gray-500 italic">No reviews yet</span>
      )}
    </div>
  );

};

export default Rating;
