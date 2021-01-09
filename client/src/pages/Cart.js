import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import ModalImage from 'react-modal-image'
import defaultImg from '../assets/img/default.jpg'
import {toast} from 'react-toastify';
import { CheckCircleOutlined, CloseCircleOutlined,CloseOutlined } from '@ant-design/icons'
import axios from 'axios'


const Cart = ({history}) => {

    const [colors, setColor] = useState(['Black','Blue','Red','Green',"Silver","Gold","others"])
    let dispatch = useDispatch();
    const mycart = useSelector(state=>state.cartState)
    const {userInfo} = useSelector(state=>state.userState) // /// ///  ///  //

    const handleColorOnChange = (prodId,e) =>{
        let cart = [] //array to hold the cart items
        if(localStorage.getItem('cart')){//this is neccessary incase the user had added these product in localstorage sometime before
          cart = JSON.parse(localStorage.getItem("cart"))//JSON.parse will convert the json format that is in localStore into an js object
        }
        //now cart must containe items since we are about updating
       
        cart.map((product,index)=>{ 
            if(product._id === prodId ){//product is from cart [],prodId is from the product looped in select form
                 cart[index].color = e.target.value//update it in 
            }
        }) 
        //overide and save cart in localstorage
         localStorage.setItem('cart',JSON.stringify(cart))//SAVING THE UNIQUE CART with the name "cart" IN LOCALSTORAGE//Json.stringify will convert the object to json format since we can only save json in localstoare--not object
     
        //send to redux to update cart state
        dispatch({
          type: "ADD_TO_CART",
          payload: cart
        })
    }
  const handleCountOnChange = (prodId,prodQty,e) =>{
    let cart = [] //array to hold the cart items
    let input_value = e.target.value;

    if(input_value > prodQty){
      toast.error(`Maximum available quantity: ${prodQty}`)
    //   input_value = prod.quantity;
        return
    }
    if(localStorage.getItem('cart')){//this is neccessary incase the user had added these product in localstorage sometime before
      cart = JSON.parse(localStorage.getItem("cart"))//JSON.parse will convert the json format that is in localStore into an js object
    }
    // now cart must containe items since we are about updating
   
    cart.map((product,index)=>{ 
        if(product._id === prodId ){//product is from cart [],prodId is from the product looped in select form
             cart[index].count = input_value//update it in 
            // cart[index].count = e.target.value
        }
    }) 
    //overide and save cart in localstorage
     localStorage.setItem('cart',JSON.stringify(cart))//SAVING THE UNIQUE CART with the name "cart" IN LOCALSTORAGE//Json.stringify will convert the object to json format since we can only save json in localstoare--not object
 
    // //send to redux to update cart state
    dispatch({
      type: "ADD_TO_CART",
      payload: cart
    })
  }
//   ------------------------------------------------------------
const handleRemoveItem = (prodId) =>{
    let cart = [] //array to hold the cart items
   
    if(localStorage.getItem('cart')){//this is neccessary incase the user had added these product in localstorage sometime before
      cart = JSON.parse(localStorage.getItem("cart"))//JSON.parse will convert the json format that is in localStore into an js object
    }
    // now cart must containe items since we are about updating
   
    cart.map((product,index)=>{ 
        if(product._id === prodId ){//product is from cart [],prodId is from the product looped in select form
             cart.splice(index,1) //at that index, remove 1 item
            
        }
    }) 
    //overide and save cart in localstorage
     localStorage.setItem('cart',JSON.stringify(cart))//SAVING THE UNIQUE CART with the name "cart" IN LOCALSTORAGE//Json.stringify will convert the object to json format since we can only save json in localstoare--not object
 
    // //send to redux to update cart state
    dispatch({
      type: "ADD_TO_CART",
      payload: cart
    })

}

    const orderTable = () => (
        <table className="table table-striped">
        <thead>
        <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Count</th>
            <th>Shipping</th>
            <th>Remove</th>
        </tr>
        </thead>
        <tbody>
        {mycart.map(prod=>(
                    <tr key={prod._id}>
                        {/* <td style={{padding:"2px"}}><img width="50px" height="50px" src={prod.images[0]} alt="" /></td> */}
                            <td style={{padding:"2px",width:"50px", height:"50px"}}>{prod.images.length ? (<ModalImage small={prod.images[0]} large={prod.images[0]}></ModalImage>) : (<ModalImage small={defaultImg} large={defaultImg}></ModalImage>)}</td>
                            <td>{prod.title}</td>
                            <td>₦{prod.price}</td>
                            <td>{prod.brand}</td>
                            <td>{
                            <div className="form-group">
                            <select className="form-control"  value={prod.title} onChange={(e)=>handleColorOnChange(prod._id,e)}>
                            <option value={prod.color}>{prod.color}</option>
                            {colors.filter(c=>c !== prod.color).map(c=>(<option key={c} value={c}>{c}</option>))}
                            </select>
                          </div>
                            }</td>
                            {/* <td><input type="number"  className="form-control" value={prod.count} onChange={(e)=>handleCountOnChange(prod._id,e)}/></td> */}
                            <td><input type="number" min="1" className="form-control w-50" value={prod.count} onChange={(e)=>handleCountOnChange(prod._id,prod.quantity,e)} /></td>
                        <td>{prod.shipping =="Yes" ? (<CheckCircleOutlined className="text-success"/>) : (<CloseCircleOutlined className="text-danger"/>)}</td>
                        <td><CloseOutlined onClick={()=>handleRemoveItem(prod._id)} className="pointer text-danger"/></td>
                    </tr>))
        }
        
        </tbody>
    </table>
    )
    const calcullateTotal = () =>{
           let total = mycart.reduce((currentVal, nextVal)=>( currentVal + nextVal.price * nextVal.count),0)
           return total;
        }

    const handleSaveOrderToDB = async() => {
      const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
        await axios.post(`${process.env.REACT_APP_URL}/user/cart`,{cart: mycart},config)
       .then(res=>{
         console.log('cart res: ',res.data)
         if(res.data.ok) history.push('/checkout')
       })
       .catch(err=>{
         console.log('err: ',err)
       })
        
    }

    const handleSaveCashOnDeleveryOrderToDB = async() => {
      // //send to redux to update cart state
    dispatch({
      type: "COD",
      payload: true
    })
    //save to db
      const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
        await axios.post(`${process.env.REACT_APP_URL}/user/cart`,{cart: mycart},config)
       .then(res=>{
         console.log('cart res: ',res.data)
         if(res.data.ok) history.push('/checkout')
       })
       .catch(err=>{
         console.log('err: ',err)
       })
        
    }

   return(<>
      <div className="container-fluid">
          <div className="row">
              <div className="col-md-12">
                  <h3 className="text-center">Cart</h3>
              </div>
          </div>
          <div className="row">
                <div className="col-md-8">
                    {!mycart.length? (<h3>No products in cart <Link to="/shop">Continue shopping</Link></h3>) : orderTable()}
                </div>
                <div className="col-md-4">
                    <h3>Order Summery</h3>
                    <div className="card">
                         <ul className="list-group list-group-flush">
                             {mycart.map((c,index)=>(
                                <li key={index} className="list-group-item">
                                    <span>{c.title} x {c.count}</span>
                                    <span className="float-right">₦{c.price * c.count}</span>
                                </li>
                             ))}
                           {/* <span style={{fontWeight:"bold"}}>Total:</span> <span className="float-right">{calcullateTotal()}</span> */}
                     
                        </ul>

                    </div>
                    <div className="d-flex p-3">
                             <span style={{fontWeight:"bold",display:"inline"}}>Total:</span> <span className=" d-inline ml-auto font-weight-bold">₦{calcullateTotal()}</span>
                    </div>
                    <hr/>
                    {userInfo && userInfo.token ? (<button className="btn btn-outline-secondary" onClick={handleSaveOrderToDB} disabled={!mycart.length}>Proceed To Checkout</button>) : (<Link to={{pathname:"/login", state: {from: "cart"}}} className="btn btn-outline-secondary">Login To Checkout</Link>)}
                   <br/>
                   {userInfo && userInfo.token ? (<button className="btn btn-outline-secondary" onClick={handleSaveCashOnDeleveryOrderToDB} disabled={!mycart.length}>Pay Cash on delevery</button>) : (<Link to={{pathname:"/login", state: {from: "cart"}}} className="btn btn-outline-secondary">Login To Checkout</Link>)}
                </div>
          </div>
      </div>
   </>
);
}
export default Cart