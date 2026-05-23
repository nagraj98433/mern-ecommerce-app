import React from "react";

import { FaStar, FaRegStar } from "react-icons/fa";

function Rating({ value }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) =>
        value >= star ? (
          <FaStar key={star} className="text-yellow-400" />
        ) : (
          <FaRegStar key={star} className="text-gray-300" />
        ),
      )}
    </div>
  );
}

export default Rating;
