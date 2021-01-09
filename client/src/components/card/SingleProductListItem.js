import React from 'react'
import { Link } from 'react-router-dom';


const SingleProductListItem = ({product: {price,color,quantity,brand,shipping,category,subCategory}}) => {
    // const {price,description,color,quantity,brand,shipping,category,subCategory} = product
   return(<>
  
     <ul className="list-group">
     {/* {JSON.stringify(category)} */}
        <li className="list-group-item">
            <div className="row">
                <div className="col-md-2">Price</div>
                <div className="col-md-10 d-flex justify-content-end">₦{price} </div>
            </div>
        </li>
        {/* <li className="list-group-item">
            <div className="row">
                <div className="col-md-2 mr-1">Description</div>
                <div className="col-md-9 d-flex justify-content-end">{description} </div>
            </div>
        </li> */}
        <li className="list-group-item">
            <div className="row">
                <div className="col-md-2">Color</div>
                <div className="col-md-10 d-flex justify-content-end">{color} </div>
            </div>
        </li>
        <li className="list-group-item">
            <div className="row">
                <div className="col-md-2">shipping</div>
                <div className="col-md-10 d-flex justify-content-end">{shipping} </div>
            </div>
        </li>
        <li className="list-group-item">
            <div className="row">
                <div className="col-md-2">brand</div>
                <div className="col-md-10 d-flex justify-content-end">{brand} </div>
            </div>
        </li>
        <li className="list-group-item">
            <div className="row">
                <div className="col-md-2">Available</div>
                <div className="col-md-10 d-flex justify-content-end">{quantity} </div>
            </div>
        </li>
        {/* {category && <>{category.name}</>} */}
         {category && <li className="list-group-item">
            <div className="row">
                <div className="col-md-2 ">Category</div>
                <div className="col-md-10 d-flex justify-content-end"><Link to={`/categories/${category.slug}`}>{category.name} </Link></div>
            </div>
        </li>
        } 
       {subCategory && subCategory.length > 0 && (<li className="list-group-item">
            <div className="row">
                <div className="col-md-3">Sub Category</div>
                <div className="col-md-9 d-flex justify-content-end">| {subCategory.map((sub,index) =><span key={index}><Link to={`/sub-categories/${sub.slug}`}>{sub.name}</Link> |</span>)} </div>
            </div>
        </li>)
        }
        
    </ul>
   </>
);
}
export default SingleProductListItem