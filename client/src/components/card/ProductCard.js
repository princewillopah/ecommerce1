import React,{useState}  from 'react'
import { Skeleton, Switch, Card,Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import defaultImg from '../../assets/img/default.jpg'
import {Link} from 'react-router-dom'
import RatingComponent from '../others/RatingComponent'
import {useSelector,useDispatch} from 'react-redux'

const { Meta } = Card;

const ProductCard = ({product}) => {
    const [toolTip, setToolTip] = useState('Click to add this item to cart')
const {title,description,images,slug,price,quantity} = product

  let dispatch = useDispatch();
  // const {cart,useInfo} = useSelector(state=>state)
  // const cart = useSelector(state=>state.cartState)

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
  // show side drawer visibility
  dispatch({type:"SET_VISIBILITY", payload: true})
}



   return(<div className="col-md-4 mb-3">
       {/* <Card style={{ width: 300, marginTop: 16 }}  cover={<img src={images.length > 0 ? `${process.env.REACT_APP_URL}/${images[0].url}` : "no image"} className="img-fluid"/>}> */}
       <div className="text-center mb-2">
          {product && product.ratings && product.ratings.length > 0 ? <RatingComponent product={product}/> : "No Rating Yet"}
        </div>
       <Card style={{ width: 300, marginTop: 16 }}  
       cover={<img src={images.length > 0 ? `${images[0]}` : defaultImg} style={{height:'250px', width:"100%",objectFit:"cover"}} className="img-fluid"/>}
actions={[<Link to={`/products/${slug}`}><EyeOutlined className="text-primary" />{' '}View Product</Link>,<Tooltip title={toolTip}><a onClick={handleAddToCart} disabled={quantity < 1}> <ShoppingCartOutlined  className="text-danger"/>{' '} {quantity < 1 ? 'Out Of Stock':'Add To Cart'}</a></Tooltip>,]}
        >
         
          <Meta title={`${title} - ₦${price}`} description={description && description.substring(0, 40)+'...'}/>
        </Card>
        {/* <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >

        <Skeleton  avatar active>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </Card> */}
   </div>
);
}
export default ProductCard