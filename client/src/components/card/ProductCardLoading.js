import React,{useState}  from 'react'
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;

const ProductCard = () => {

    // const [loading, setLoading] = useState(true)

   return(
 
   <div className="col-md-4 ">
      <div className="card mb-2 p-2">
   
          <Skeleton  avatar active>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
       
      </div>
      </div>
);
}
export default ProductCard