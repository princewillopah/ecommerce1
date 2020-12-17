import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {  toast } from 'react-toastify';
import '../styles/myform.css'
// import { connect } from 'react-redux';
import Product from './Product'


const LandingPage = () => {
 const [products, setProducts] = useState([])
 const [loading, setloading] = useState(true)
//  const [Limit, setLimit] =useState(6)
//  const [Skip, setSkip] =useState(0)


//  console.log("limit:",Limit);
//  console.log("skip",Skip)
 

 useEffect(() => {
  // const myvariable = {
  //   skip: Skip,//Skip is 0
  //   limit: Limit // limit = 5
  // }

  // Axios.get('http://localhost:5000/api/products/all-products',{params: {skip: myvariable.skip,limit: myvariable.limit}})
  Axios.get('http://localhost:5000/api/products/all-products')
    .then(res => {
        if(res.data.success){
          setProducts(res.data.products)
          setloading(false)
          // console.log([...products,res.data.products])
          console.log(res.data.products)
        }else{
          toast.error("Failed to fetch data from server")
          //   ret
        }
    })
}, [])





   return(<>
       
     <div className="row">
         <div className="col-md-12">
             <h3 className="w-75 text-center m-auto">Lets travel any where</h3>
         </div>
         <div className="col-md-12 my-4">
           <div className="card search">
              <h4 className="text-dark">search</h4>
           </div>
         </div>
     </div>

      <div className="row">
        {
           loading === true ?  (<h4 className="text-center my-5">loading</h4>) :
           products.map(prod=>(<Product key={prod._id} product={prod} />))
        }

      </div>


   </>
);
}
export default LandingPage