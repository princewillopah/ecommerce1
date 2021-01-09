import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import '../assets/css/stripe.css'
import ScripeCheckOut from '../components/others/StripeCheckOut'


//load stripe outside the components render in order to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = () => {
   return(<>
      <div className="container p-5 text-canter">
          <h5 className="text-center">Complete Your Purchase</h5>
          <Elements stripe={promise}>
               <div className="col-md-8 offset-md-2">
                   <ScripeCheckOut/>
                </div>    
          </Elements>
      </div>
   </>
);
}
export default Payment