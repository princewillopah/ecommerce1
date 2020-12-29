import React from 'react'
import StarRatings from 'react-star-ratings';

const RatingComponent = ({product}) => {


    // let ratingArrayObject = product.ratings
    // let ratingLength = product.ratings.length//use it to divide the total rating star to get the average
    // let allRatingStars = []//will contain only rating star
    // ratingArrayObject.map(r => allRatingStars.push(r.star))//for each rating, push rating star in array allRatingStars// now allRatingStars array will contain only numbers of star
    // let totalStarValue = allRatingStars.reduce((p,n)=> p+n,0)//sum the stars
    // let average = totalStarValue / ratingLength//get the average
    // ------------------------------------------------------------
    const arrlength = product.ratings.length
    const totalStarRating = product.ratings.map(r=>r.star)//extract only the stars//create an array of stars from the array of objects and save intotalStarRating array
                    .reduce((acc,item)=>(acc+=item),0)//add all the star array
    let average  = totalStarRating /  arrlength//get the average   

    return(<>
            {/* {JSON.stringify(totalStarRating.length)} */}
        <StarRatings
            rating={average}
            starRatedColor="orangered"
            numberOfStars={5}
            starDimension="20px"
            />{' '}
            <span>({arrlength})</span>
    </>)
  
   

    }

export default RatingComponent