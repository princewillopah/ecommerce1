import React from 'react'
// import '../styles/myform.css'
// import ImageSlider from '../common/imageSlider'

const Product = ({product:{title,images,price,continents}}) => {

   return(
   <div className="col-md-4 mb-3">
      <div className="card">
        <img className="card-img-top" style={{maxHeight:'200px'}} src={`http://localhost:5000/${images[0]}`} alt={title}/>
        {/* <ImageSlider images={images} /> */}
        <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <small style={{color:'red'}}> {continents}</small>
         <p className="card-text">${price}</p>
            <a href="#" className="btn btn-primary">See Profile</a>
        </div>
        </div>
   </div>
);
}
export default Product
