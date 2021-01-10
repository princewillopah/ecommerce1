import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {toast} from 'react-toastify'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';


const CheckOut = ({history}) => {
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState('')//host the state of the quill form
    const [coupon, setCoupon] = useState('')
    const [savedAddress, setSavedAddress] = useState(false)
    const [totalAfterDiscount, setTotalAfterDiscount] = useState('')
    const [discountError, setdiscountError] = useState('')

    const {userInfo} = useSelector(state =>state.userState)
    const COD = useSelector(state =>state.CODState)
    const couponApplied = useSelector(state =>state.couponAppliedState)
    const dispatch = useDispatch()

    useEffect(()=>{
        getCartInfor()
    },[])

    const getCartInfor =() =>{
        setLoading(true)
        const config = { headers:{ Authorization: `Bearer ${userInfo.token}`}}
        axios.get(`${process.env.REACT_APP_URL}/user/cart`,config)
       .then(res=>{
        setLoading(false)
        setProducts(res.data.products)
        setCartTotal(res.data.cartTotal)
       })
       .catch(err=>{
        setLoading(false)
         console.log('err: ',err)
       })
    }

    const handleSaveAddressToDB = () => {
        const config = { headers:{ Authorization: `Bearer ${userInfo.token}`}}
        axios.post(`${process.env.REACT_APP_URL}/user/address`,{address:address},config)
      .then(res=>{
         if(res.data.ok){
             setSavedAddress(res.data.ok)//set to true
             toast.success(`Address saved`)
         }
      })
    }

    const handleEmptyCart = () =>{
      //remove cart from localstorage
            if(localStorage.getItem('cart') ){//unneccessary
               localStorage.removeItem('cart') //remove it from localstorage
            }
      //remove cart from redux state
        dispatch({
            type:"ADD_TO_CART",
            payload: []
        })
      //remove cart from backend db
      const config = { headers:{ Authorization: `Bearer ${userInfo.token}`}}
        axios.delete(`${process.env.REACT_APP_URL}/user/cart`,config)
       .then(res=>{
        setProducts([])
        setCartTotal('')
        setTotalAfterDiscount(0)
        setCoupon('')
        toast.success(`Cart has been Cleared`)
       })
       .catch(err=>{
         console.log('err: ',err)
       })
    }

const handleOnclickCoupon = () => {
    const config = { headers:{ Authorization: `Bearer ${userInfo.token}`}}
    axios.post(`${process.env.REACT_APP_URL}/coupon/apply-coupon-in-cart`,{coupon},config)
    .then(res=>{
        if(res.data)
            {
                setTotalAfterDiscount(res.data)
                // update redux coupon applied
                dispatch({
                    type:"COUPON_APPLIED",
                    payload: true
                })
               // toast.success(`Cart has been Cleared`)
            }  
        if(res.data.err){
            setdiscountError(res.data.err)
            // update redux coupon applied
            dispatch({
                type:"COUPON_APPLIED",
                payload: false
            })
        // toast.success(`Cart has been Cleared`)
        }      
        
       })
       .catch(err=>{
         console.log('err: ',err)
       })
}

const handlePlaceOrder = () =>{
    history.push('/payment')
}
//incease the user want cash on delevery option
const createCashOrder = () => {
    const config = { headers:{ Authorization: `Bearer ${userInfo.token}`}}
    axios.post(`${process.env.REACT_APP_URL}/user/create-cash-order`,{COD:COD,couponApplied:couponApplied},config)
  .then(res=>{

    if(res.data.ok){
        //  //empty user cart in redux and localstorage
         //remove cart from localstorage
          
            localStorage.removeItem('cart') //remove it from localstorage

          //remove cart from redux state
            dispatch({
                type:"ADD_TO_CART",
                payload: []
            })
            //reset coupon to false
            dispatch({
              type:"COUPON_APPLIED",
              payload: false
          })
           //reset CASH ON DELIVERY to false
           dispatch({
            type:"COD",
            payload: false
        })
          //remove cart from backend db
          const config = { headers:{ Authorization: `Bearer ${userInfo.token}`}}
            axios.delete(`${process.env.REACT_APP_URL}/user/cart`,config)
            .then(res=>{
            // setProducts([])
            // setCartTotal('')
            // setTotalAfterDiscount(0)
            // setCoupon('')
            // toast.success(`Cart has been Cleared`)
            history.push('/user/history')

            })
            .catch(err=>{
              console.log('err: ',err)
            })
      }//END IF OK

  })
  .catch(err=>{
      console.log(err)
  })
}
   return(<>
     <div className="container mt-5">
         <div className="row">
             <div className="col-md-6">
                 <h4>Delivery Address</h4>
                 <br/><br/>
                    <ReactQuill theme="snow" value={address} onChange={setAddress}/>
                    <button className="btn btn-primary btn-lg" onClick={handleSaveAddressToDB}>Save</button>
                    <hr/>
                   <h4>Got Coupon?</h4>
                   <br/>
                    {discountError && <p className="text-light bg-danger p-2">{discountError}</p>}
                   <input type="text" placeholder="Apply coupon here" className="form-control" value={coupon} onChange={(e)=>{
                       setCoupon(e.target.value)
                       setdiscountError('')
                       }}/>
                   <button  className="btn btn-sm btn-outline-secondary" onClick={handleOnclickCoupon}>Apply</button>
             </div>
             <div className="col-md-6">
                 <h4>Order Summery</h4>
                 <hr/>
                        <p>Products: {!loading && products.length}</p>
                    <hr/>
                   {products && products.map(prod =>(
                   <p key={prod._id}>
                     {prod.product.title} ({prod.color}) x {prod.count} = ₦{prod.price * prod.count}
                   </p>))}
                   <hr/>
                  {products.length && <h5>Cart Total: ₦{!loading && cartTotal} </h5>}
                  {totalAfterDiscount > 0 && <h5 className="p-2 text-light bg-success">Cart Total afetr discount: ₦{totalAfterDiscount} </h5>}
                   <div className="row">
                       <div className="col-md-6">
                         
                      {COD ? ( <button className="btn btn-primary" disabled={!savedAddress || !products.length } onClick={createCashOrder}>Place Order</button>) :
                        (  <button className="btn btn-primary" disabled={!savedAddress || !products.length } onClick={handlePlaceOrder}>Place Order</button>)
                        }
                       </div>
                       <div className="col-md-6">
                           <button className="btn btn-primary" onClick={handleEmptyCart} disabled={!products.length }>Empty Cart</button>
                       </div>
                   </div>
             </div>
         </div>
     </div>
   </>
);
}
export default CheckOut