import React,{useState}  from 'react'
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import defaultImg from '../../assets/img/default.jpg'
import {Link} from 'react-router-dom'
import RatingComponent from '../others/RatingComponent'

const { Meta } = Card;

const ProductCard = ({product}) => {
    // const [loading, setLoading] = useState(false)
const {title,description,images,slug} = product



   return(<div className="col-md-4">
       {/* <Card style={{ width: 300, marginTop: 16 }}  cover={<img src={images.length > 0 ? `${process.env.REACT_APP_URL}/${images[0].url}` : "no image"} className="img-fluid"/>}> */}
       <div className="text-center mb-2">
          {product && product.ratings && product.ratings.length > 0 ? <RatingComponent product={product}/> : "No Rating Yet"}
        </div>
       <Card style={{ width: 300, marginTop: 16 }}  
       cover={<img src={images.length > 0 ? `${images[0]}` : defaultImg} style={{height:'250px', width:"100%",objectFit:"cover"}} className="img-fluid"/>}
actions={[<Link to={`/products/${slug}`}><EyeOutlined className="text-primary" />{' '}View Product</Link>,<span> <ShoppingCartOutlined  className="text-danger"/>{' '} Add To Cart</span>,]}
        >
         
          <Meta title={title} description={description && description.substring(0, 40)+'...'}/>
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