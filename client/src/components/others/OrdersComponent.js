import React from 'react'
import Moment from 'react-moment'
import '../../assets/css/order-status.css'
const OrdersComponent = ({orders,handleOrderStatusChange}) => {


   return(<>
        <h1 className="mb-5">{orders.length > 0 ?'user Purchase Orders':'No Purchased Orders'}</h1>
           {orders && orders.map(order =>(
             <div className="card mb-5"  key={order._id}>
               <div className="card-header p-0">
                        <h5 className="m-2">Order Info <span style={{fontWeight:'300',fontSise:'14px'}} className={`float-right ${order.orderStatus}`}>{order.orderStatus}</span></h5>
               <ul className="list-group list-group-flush">
                <li className="list-group-item">payment Id <span className="float-right">{order.paymentIntent.id}</span></li>
                <li className="list-group-item">order date <span className="float-right"><Moment format='DD/MM/YYYY'>{order.createdAt}</Moment></span></li>
                <li className="list-group-item">Amount Paid <span className="float-right">₦{(order.paymentIntent.amount / 100).toFixed(2)}</span></li>
                <li className="list-group-item">Order Status <span className="float-right ">
                    {/* {order.orderStatus} */}
                    <select className="form-control" defaultValue={order.orderStatus} onChange={(e)=>handleOrderStatusChange(order._id,e.target.value)}>
                        <option value="Not Processed">Not Processed</option>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                    </select>
                    </span></li>
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
             </div>
              ))}
   </>
);
}
export default OrdersComponent