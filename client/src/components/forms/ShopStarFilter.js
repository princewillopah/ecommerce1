import React from 'react'
import StarRatings from 'react-star-ratings'

const ShopStarFilter = ({starClick,numberOfStar}) => {
   return(<>
      <StarRatings
       changeRating={()=>starClick(numberOfStar)}
       starRatedColor="orangered"
       starEmptyColor="orangered"
       startHoverColor="orangered"
       numberOfStars={numberOfStar}
       starDimension="20px"
       />
   </>
);
}
export default ShopStarFilter