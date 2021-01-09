import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductCard from '../components/card/ProductCard'

const CategoryList = ({match}) => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        loadAllCatProduct()
    },[])

    const loadAllCatProduct = async() => {
        try{
            setLoading(true)
         const res = await axios.get(`${process.env.REACT_APP_URL}/categories/${match.params.slug}/products`)
         setProducts(res.data.products)
         setCategory(res.data.category)
         setLoading(false)
        }catch(err){
            setLoading(false)
          console.log(err)
        }
    }


   return(<>
      <section>
          <div className="container-fluid" style={{background:"#eee"}}>
              <div className="row my-3">
                <div className="col-md-12 py-3">
                    <h3 className="text-center">{!loading && products.length} product(s) in {!loading && category.name} </h3>
                </div>
              </div>
          </div>
          <div className="container">
              <div className="row">
                {!loading && products.map(p=><ProductCard product={p} key={p._id} />)}
              </div>
          </div>
      </section>
   </>
);
}
export default CategoryList