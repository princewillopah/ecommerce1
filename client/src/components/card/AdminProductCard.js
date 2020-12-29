import React,{useState}  from 'react'
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import defaultImg from '../../assets/img/default.jpg'
import {Link} from 'react-router-dom'

const { Meta } = Card;

const ProductCard = ({product,loadingProd,setLoadingProd, handleDelete}) => {
  const {title,description,images,slug} = product
    // const [loading, setLoading] = useState(false)




   return(<div className="col-md-4">
       {/* <Card style={{ width: 300, marginTop: 16 }}  cover={<img src={images.length > 0 ? `${process.env.REACT_APP_URL}/${images[0].url}` : "no image"} className="img-fluid"/>}> */}
       <Card style={{ width: 300, marginTop: 16 }}  
       cover={<img src={images.length > 0 ? `${images[0]}` : defaultImg} style={{height:'150px',objectFit:"cover"}} className="img-fluid"/>}
        actions={[<Link to={`/admin/products/${slug}`}><EditOutlined className="text-primary" /></Link>, <DeleteOutlined onClick={()=>handleDelete(slug)} className="text-danger"/>]}
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