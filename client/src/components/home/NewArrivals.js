import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ProductCard from '../card/ProductCard'
import ProductCardLoading from '../card/ProductCardLoading'
import { Pagination } from 'antd'
// import TextEffect from '../components/others/TextEffect'



const NewArrival = () => {

   const [products, loadProducts] = useState([])
   const [loading, setLoading] = useState(false)
   const [page, setPage] = useState(1)//FOR making request to server when the pagination page is clicked
   const [totalProduct, setTotalProduct] = useState(0)//Fetch the total number of product in DB

   useEffect(() =>{
      getAllProducts()
   },[page])
   useEffect(() =>{
      getTotal()
   },[])

   const getAllProducts = async () => {
      try{
         setLoading(true)
          const res = await axios.post(`${process.env.REACT_APP_URL}/products/list`,{sort:"createdAt",order:"desc",page: page})
          setLoading(false)
          loadProducts(res.data)
      }catch(err){
         setLoading(false)
        console.log(err)
      }
  }
  const getTotal = () => {
   axios.get(`${process.env.REACT_APP_URL}/products/total-product-count`)
   .then(res =>{setTotalProduct(res.data)})
  }
   return(<>
    {/* {JSON.stringify(totalProduct)} */}
 
  <div className="container-fluid " style={{background:"#eee"}}>
   <h2 className="text-center py-3">New Arrivals </h2>
  </div>
    <div className="container mb-3">
    <div className="row">
     {/* {loading ? (<>{[1,2,3,4,5,6,7,8].map((r,index)=><ProductCardLoading key={index}/>)}</>) : (<>{products.map(product => ( <ProductCard product={product} key={product._id}/>))}</>)} */}
     {loading ? (<>{[...Array(8).keys()].map((r,index)=><ProductCardLoading key={index}/>)}</>) : (<>{products.map(product => ( <ProductCard product={product} key={product._id}/>))}</>)}
     {/* {[...Array(product.countInStock).keys()].map(x=>(<option key={x+1} value={x+1}>{x+1}</option>))} */}
    </div>
    <div className="row mt-4">
       <div className="col-12 d-flex justify-content-center"><Pagination current={page} total={(totalProduct / 6) * 10}  onChange={(value) =>setPage(value)}/></div>
       
    </div>
 </div>

   </>
);
}
export default NewArrival