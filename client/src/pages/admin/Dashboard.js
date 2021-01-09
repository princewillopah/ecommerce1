import React, {useState, useEffect} from 'react'
import AdminNav from '../../components/nav/AdminNav'
import axios from 'axios'
import OrdersComponent from '../../components//others/OrdersComponent'
// import {Link} from 'react-router-dom'

import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'

const Dashboard = () => {
    const [status, setStatus] = useState('')
    // const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])

      
    const {userInfo} = useSelector(state=>state.userState)

    useEffect(()=>{
        getOrdersFunction()
    },[])

    const getOrdersFunction = () => {
         const config = { headers:{Authorization: `Bearer ${userInfo.token}`}}
        axios.get(`${process.env.REACT_APP_URL}/admin/orders`,config)
        .then(res =>{
            setOrders(res.data)
        })
        .catch(err=>{console.log(err)})
    }

    const handleOrderStatusChange = (orderId,orderStatus) => {
        const config = { headers:{Authorization: `Bearer ${userInfo.token}`}}
        axios.put(`${process.env.REACT_APP_URL}/admin/order-status`,{orderId:orderId,orderStatus:orderStatus},config)
        .then(res =>{
            getOrdersFunction()
            toast.success(`status updated`)
        })
        .catch(err=>{console.log(err)})
    }

   return(<>
          <div className="container ">
                <div className="row mt-5">
                <div className="col-md-3">
                    <AdminNav/>
                </div>
                <div className="col-md-9">
                <OrdersComponent orders={orders} handleOrderStatusChange={handleOrderStatusChange}/>
                </div>
                </div>
            </div>
   </>
);
}
export default Dashboard