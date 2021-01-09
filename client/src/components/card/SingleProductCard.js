import React,{useState}  from 'react'
import {Card,Tabs,Tooltip } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import defaultImg from '../../assets/img/default.jpg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '../../assets/css/App.css'
import SingleProductListItem from './SingleProductListItem'
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import RatingComponent from '../others/RatingComponent'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
const {TabPane} = Tabs

const SingleProductCard = ({product,handleRating,star}) => {
const {title,images,description} = product
const [toolTip, setToolTip] = useState('Click to add this item')
const {userInfo} = useSelector(state=>state.userState)
let dispatch = useDispatch();
let history = useHistory();

const handleAddToCart = () =>{
  let cart = [] //CREATE A CART
  if(localStorage.cart){//this is neccessary incase the user had added these product in localstorage sometime before
    cart = JSON.parse(localStorage.getItem("cart"))//JSON.parse will convert the json format that is in localStore into an js object
  }
  //  now to create a new cart in localstorage
  cart.push({
    ...product,//pushing the product to the cart in localstorage//we spread it because we want to add new property(count)
     count: 1//now product(save in localstorage) will now have a property of count in it
  })

 
   //remove duplicates in cart when the user hit the same product more than once
  //  let ids = cart.map(o => o._id)
  //  let unique_cart_item  = cart.filter(({_id}, index) => !ids.includes(_id, index + 1))
   let unique_cart_item  = [...new Map(cart.map(item => [item._id, item])).values()]
  // save in localstorage
   localStorage.setItem('cart',JSON.stringify(unique_cart_item))//SAVING THE UNIQUE CART with the name "cart" IN LOCALSTORAGE//Json.stringify will convert the object to json format since we can only save json in localstoare--not object
// show the tool tip
  setToolTip('Item Added')
  //send to redux to update cart state
  dispatch({
    type: "ADD_TO_CART",
    payload: unique_cart_item
  })
  //show drawer visisbility
  dispatch({type:"SET_VISIBILITY", payload: true})
}

const handleAddToWhislist = (e) =>{
 e.preventDefault();
    const config = { headers:{ Authorization: `Bearer ${userInfo.token}`}}
   axios.post(`${process.env.REACT_APP_URL}/user/wishlist`,{productId: product._id},config)
    .then((res)=>{
      if(res.data.OK){
        toast.success('product added to wishlist')
        history.push('/user/wishlist')
        console.log(res)
      }
    }).catch((err)=>{
  console.log(err)
  })
  // toast.success('product added to wishlish')
  // history.push('/user/wishlist')
}

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
      actions={[<Tooltip title={toolTip}><a onClick={handleAddToCart}> <ShoppingCartOutlined  className="text-danger"/>{' '} Add To Cart</a></Tooltip>,
      <a onClick={handleAddToWhislist}><HeartOutlined className="text-primary" />{' '}Add To WishList</a>,
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