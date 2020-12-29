import React,{useState,useEffect} from 'react'
import axios from 'axios'
import SingleProductCard from '../components/card/SingleProductCard'
import {useSelector} from 'react-redux'
// import SingleProductListItem from '../components/card/SingleProductListItem'
import ProductCard from '../components/card/ProductCard'

const Product = ({match}) => {
 const [product, setProduct] = useState({})
 const [relatedProducts, setRelatedProducts] = useState([])
 const [loading, setLoading] = useState(false)
 const [star, setStar] = useState(0)//star is the initial number of star selection before u rated

 const {userInfo} = useSelector(state=>state.userState)
 useEffect(() => {
    getProduct()
 }, [match.params.slug])

 useEffect(() => {// to prepopulated the rating modal if the user had already rated before
    if(userInfo && product.ratings ){
        let existingRating =  product.ratings.find(rate => rate.postedBy.toString() === userInfo._id.toString())
        // existingRating && setStar(existingRating.star)//it means if existingRating then ar(existingRating.star)
        if(existingRating){
            setStar(existingRating.star)
        } 
   }

 }, [product])

 const getProduct =  () =>{
    setLoading(true)
    axios.get(`${process.env.REACT_APP_URL}/products/product/${match.params.slug}`)
    .then(res =>{
        setProduct(res.data)
        // setLoading(false)
        axios.get(`${process.env.REACT_APP_URL}/products/${res.data._id}/related-products`)
        .then(res=>{
            setRelatedProducts(res.data)
            setLoading(false)
            console.log(res.data)
        })
         .catch((err)=> {
            setLoading(false)
            console.log(err)
        })

    })
    .catch(err =>{
        setLoading(false)
        console.log(err)
    })
 }

 const handleRating = async (newRating,name)=>{
     setStar(newRating)//pushing the value of new rating to star in state to be the active stars selected
    //  console.log("newRating: ",newRating,",name: ",name)
      
    //  axios.put(`${process.env.REACT_APP_URL}/products/${product._id}/ratings`,{star: newRating},config)//note: name carries the product id
    //  .then(res=>{
    //      console.log(res.data)
    //      getProduct()//reload the page
    //  })
    //  .catch(err=>{ console.log(err)})
        try {
            const config = { headers:{Authorization: `Bearer ${userInfo.token}`}}
              const res = await axios.put(`${process.env.REACT_APP_URL}/products/${product._id}/ratings`,{star: newRating},config)//note: name carries the product id
              console.log(res.data)
             getProduct()//reload the page
        } catch (err) {
            console.log(err)
        }
    }

   return(<>
      <div className="container">
       <div className="row my-4">
          {!loading && <SingleProductCard product={product}  handleRating={handleRating} star={star}/>}
       </div>
   </div>
   <div className="container-fluid">
      <div className="row my-5">
           <div className="col-md-12" style={{background:"#eee"}}>
               <h1>Related Products</h1>
           </div>
       </div>
   </div>
   <div className="container">
        <div className="row">
            {relatedProducts && relatedProducts.map(p =>(<ProductCard product={p}/>))}
        </div>
   </div>
</>);
}
export default Product