import React, { useState, useEffect } from "react";
import "./StarRating.css";

function Star({ selected = false, onSelect = f => f, isAverageRating, isUserRating }) {
    const starClassName = isUserRating ? "star user-rated" : isAverageRating ? "star rated" : "star";
  
    return (
      <span className={starClassName} onClick={onSelect}>
        &#9733;
      </span>
    );
  }


  function StarRating({ totalStars = 5, onRate = f => f, filledStars, userRating }) {
    const [currentRating, setCurrentRating] = useState(0);
  
    useEffect(() => {
      // Set the current rating based on the filledStars prop
      setCurrentRating(filledStars);
    }, [filledStars]);
  
    return (
      <>
        {[...Array(totalStars)].map((n, i) => (
          <Star
            key={i}
            selected={i < (userRating > 0 ? userRating : currentRating)}
            onSelect={() => {
              setCurrentRating(i + 1);
              onRate(i + 1);
            }}
            isAverageRating={i < filledStars} // Highlight stars up to the average rating in blue
            isUserRating={userRating > 0 && i + 1 === userRating} // Highlight the user's own rating in purple
          />
        ))}
      </>
    );
  }
  
  




export default StarRating;
