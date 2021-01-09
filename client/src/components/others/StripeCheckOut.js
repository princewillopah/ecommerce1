import React,{useEffect,useState} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import{useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'


const StripeCheckOut = () => {


    const [succeeded ,setSucceeded] = useState(false)
    const [error ,setError] = useState(null)
    const [processing ,setProcessing] = useState('')//like loading and setLoading
    const [disabled ,setDisabled] = useState(true)
    const [clientSecret ,setClientSecret] = useState('')

    const [cartTotal, setCartTotal] = useState(0)
    const [totalAfterDiscount,settotalAfterDiscount] = useState(0)
    const [payable, setPayable] = useState(0)


    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()

    const {userInfo} = useSelector(state=>state.userState)
    const coupon = useSelector(state=>state.couponAppliedState)
console.log(coupon)
    useEffect(() => {
        makePaymentIntentRequest()
    }, [])
    const makePaymentIntentRequest = () =>{
        const config = { headers:{ Authorization: `Bearer ${userInfo.token}`}}
        axios.post(`${process.env.REACT_APP_URL}/create-payment-intent`,{couponApplied: coupon},config)
      .then(res=>{
          setClientSecret(res.data.clientSecret)
          setCartTotal(res.data.cartTotal)
          settotalAfterDiscount(res.data.totalAfterDiscount)
          setPayable(res.data.payable)
          console.log(res.data.totalAfterDiscount)
          console.log('xx1: ',totalAfterDiscount)
          console.log('xx2: ',coupon)
        })
      .catch(err=>{console.log('err: ',err)})
    }
    const cartStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };
    const handleOnSubmit = async(e) => {
        e.preventDefault();
        setProcessing(true)
        const payload = await stripe.confirmCardPayment(
            clientSecret,//from state//that was recieved from backend via the request above
           { payment_method: {card: elements.getElement(CardElement),billing_details: {name: e.target.name.value}}}
        );

        if(payload.error){
            setError(`Payment Failed ${payload.error.message}`)
            setProcessing(false)
        }else{//no error//payment success
         //here u get result after successful payment

         //create order and save in db for admin to process
         const config = { headers:{ Authorization: `Bearer ${userInfo.token}`}}
         axios.post(`${process.env.REACT_APP_URL}/user/create-order`,{stripeResponse: payload},config)
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
                    payload: []
                })
                //remove cart from backend db
                const config = { headers:{ Authorization: `Bearer ${userInfo.token}`}}
                  axios.delete(`${process.env.REACT_APP_URL}/user/cart`,config)
                  // .then(res=>{
                  // setProducts([])
                  // setCartTotal('')
                  // setTotalAfterDiscount(0)
                  // setCoupon('')
                  // toast.success(`Cart has been Cleared`)
                  // })
                  // .catch(err=>{
                  //   console.log('err: ',err)
                  // })
            }//END IF OK
         })
       .catch(err=>{console.log('err: ',err)})
       
         JSON.stringify(payload,null,4)
         setError(null)
         setProcessing(false)
         setSucceeded(true)

        }
        
    }

 const handleChange = (e) =>{
   //listen for any changes in the card element and display any errors as the user types his card detaile
   setDisabled(e.empty)//disabled pay button if error
   setError(e.error ? e.error.message : "")//show error if available
 }


   return(<>
    <p className={succeeded ? 'result-message' : ' result-message hidden'}>
        <span className="text-success">Payment Successful</span> {' '}
        <Link to="/user/history">View Purchase History</Link>

    </p>
    {coupon===false && totalAfterDiscount===undefined && <div class="alert alert-danger">
        <strong>No Coupon Applied.</strong> 
    </div>}
    <div className="card">
       <ul className="list-group list-group-flush">
            <li className="list-group-item">Cart Total:<span className="float-right">₦{cartTotal}</span></li>
           {coupon && totalAfterDiscount ? <li className="list-group-item">Total After Discount: <span className="float-right">₦{totalAfterDiscount}</span></li>: ''}
            <li className="list-group-item">Payable: <span className="float-right text-success font-weight-bold">₦{(payable / 100).toFixed(2)}</span></li>
        </ul>
    </div>
      <form id="payment-form" className="stripe-form" onSubmit={handleOnSubmit}>

          <CardElement id="card-element" option={cartStyle} onChange={handleChange}/>
          <button  className="stripe-button" disabled={processing || disabled || succeeded}>
          <span id="button-text">
              {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
          </button>
          <br />
            {error && (<div className="card-error" role="alert">{error}</div>)}
      </form>
   </>
);
}
export default StripeCheckOut