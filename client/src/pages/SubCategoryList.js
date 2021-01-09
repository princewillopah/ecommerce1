import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductCard from '../components/card/ProductCard'

const SubCategoryList = ({match}) => {
    const [products, setProducts] = useState([])
    const [subsCat, setSubsCat] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        loadAllSubProduct()
    },[])

    const loadAllSubProduct = async() => {
        try{
            setLoading(true)
         const res = await axios.get(`${process.env.REACT_APP_URL}/sub-categories/${match.params.slug}/products`)
         setProducts(res.data.products)
         setSubsCat(res.data.subcategory)
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
                    <h3 className="text-center">{!loading && products.length} product(s) in {!loading && subsCat.name} </h3>
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
export default SubCategoryList