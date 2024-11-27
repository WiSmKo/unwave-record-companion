import React from "react";

interface StarRatingProps {
    count: number;
    average: number;
}

const StarRating: React.FC<StarRatingProps> = ({ count, average }) => {

    if (count === 0 || count === undefined) {
        console.log("No reviews yet");
        return <p className="text-sm text-gray-500 text-center">No reviews</p>;
      }
  // Ensure the rating is between 0 and 5 and round to the nearest 0.5
  const roundedRating = Math.min(5, Math.max(0, Math.round(average * 2) / 2));



  return (
    <div className="rating rating-md rating-half mx-auto">
      {[...Array(10)].map((_, index) => {
        // Determine if this half-star should be checked
        const halfValue = (index + 1) / 2;
        const isChecked = roundedRating === halfValue;

        return (
          <input
            key={index}
            type="radio"
            name="rating"
            className={`mask mask-star-2 ${
              index % 2 === 0 ? "mask-half-1" : "mask-half-2"
            } bg-orange-500`}
            checked={isChecked}
            readOnly
            style={{ cursor: "default" }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;