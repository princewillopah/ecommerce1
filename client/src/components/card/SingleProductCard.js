import React  from 'react'
import {Card,Tabs } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import defaultImg from '../../assets/img/default.jpg'
import {Link} from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '../../assets/css/App.css'
import SingleProductListItem from './SingleProductListItem'
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import RatingComponent from '../others/RatingComponent'
const {TabPane} = Tabs

const SingleProductCard = ({product,handleRating,star}) => {
const {title,images,description} = product



   return(<>
   <div className="col-md-7">
     <div className="row">
       <div className="col-12">
       {images && images.length ?<Carousel showArrows={true} autoPlay infiniteLoop>
           {images && images.map((imgg,index)=>(<div key={index}><img src={imgg} className="img-fluid" /></div> ))}    
          </Carousel> : 
          <img  src={defaultImg} className="img-fluid" />
          }
       </div>
       <div className="col-12">
        <Tabs>
        <TabPane tab="Desciption" key="1">{description}</TabPane>
        <TabPane tab="More" key="2">Call Us ON 8989432, 54325643 and 2345654</TabPane>
        </Tabs>
       </div>
     </div>

         
       
   </div>
   <div className="col-md-5 single-product-item">
        <h2 style={{textAlign:"center",padding:"20px",background:"#eee"}}>{title}</h2>
        <div className="text-center mb-2">
          {product && product.ratings && product.ratings.length > 0 ? <RatingComponent product={product}/> : "No Rating Yet"}
        </div>
       
        <Card  
      actions={[<span> <ShoppingCartOutlined  className="text-danger"/>{' '} Add To Cart</span>,
      <Link to={`/products/`}><HeartOutlined className="text-primary" />{' '}View Product</Link>,
      <RatingModal>
           <StarRatings
          rating={star}
          starRatedColor="blue"
          changeRating={handleRating}
          numberOfStars={5}
          name={product._id}
          isSelectable={true}
        />
         </RatingModal>,
    ]}
        >
         <SingleProductListItem product={product}/>
      </Card>
   </div>
</>);
}
export default SingleProductCard