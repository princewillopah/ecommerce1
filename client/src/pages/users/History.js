import React,{useState, useEffect} from 'react'
import NavLink from '../../components/nav/UserNav'
import {useDispatch, useSelector} from 'react-redux'
// import {toast} from 'react-toastify'
import Axios from 'axios'
import Moment from 'react-moment'
import Invoice from '../../components/others/Invoice'
import {PDFDownloadLink} from '@react-pdf/renderer'


const History = () => {
  const [orders, setOrders] = useState([])
  const {userInfo} = useSelector(state=>state.userState)

  useEffect(()=>{
    getOrdersFunction()
  },[])

    const getOrdersFunction = () =>{
      const config = { headers:{ Authorization: `Bearer ${userInfo.token}`}}
      Axios.get(`${process.env.REACT_APP_URL}/user/orders`,config)
        .then(res=>{
          setOrders(res.data)
          console.log(JSON.stringify(orders,null,4))
        })
        .catch(err=>{
          console.log(err)
        })
    }

   return(
    <div className="container ">
    <div className="row mt-5">
       <div className="col-md-3">
         <NavLink/>
       </div>
       <div className="col-md-9">
           <h1 className="mb-5">{orders.length > 0 ?'user Purchase Orders':'No Purchased Orders'}</h1>
           {orders && orders.reverse().map(order =>(
             <div className="card mb-5"  key={order._id}>
               <div className="card-header p-0">
                 <h5 className="text-center">Order Info</h5>
               <ul className="list-group list-group-flush">
                <li className="list-group-item">payment Id <span className="float-right">{order.paymentIntent.id}</span></li>
                <li className="list-group-item">order date <span className="float-right"><Moment format='DD/MM/YYYY'>{order.createdAt}</Moment></span></li>
                <li className="list-group-item">Amount Paid <span className="float-right">₦{(order.paymentIntent.amount / 100).toFixed(2)}</span></li>
                <li className="list-group-item">Order Status <span className="float-right badge bg-success">{order.orderStatus}</span></li>
                
                
              </ul>
               </div>
               <div className="card-body p-0">
               <h5 className="font-weight-bold px-2">Items</h5>
               <table className="table table-dark mb-0">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Count</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Shipping</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map( prod =><tr key={prod._id}>
                  <td>{prod.product.title}</td>
                  
                  <td>{prod.product.brand}</td>
                  <td>{prod.color}</td>
                  <td>{prod.count}</td>
                  <td>₦{prod.price}</td>
                  <td>₦{prod.price * prod.count}</td>
                  <td>{prod.product.shipping}</td>
                  </tr>)}
                </tbody>
              </table>
               </div>
                <div className="card-footer p-2">
                <PDFDownloadLink
                document={<Invoice order={order}/>}
                fileName="invoice.pdf"
                className="btn btn-sm btn-outline-primary w-75 d-block text-center m-auto"
                >
                  Download Invoice
                </PDFDownloadLink>
                {/* <Link to='/testing'>testing</Link> */}
                </div>
             </div>
              ))}
       </div>
    </div>
</div>
);
}
export default History