import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const CategoryListComponent = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        loadAllCategories()
    },[])
    const loadAllCategories = async() => {
        try{
            setLoading(true)
         const res = await axios.get(`${process.env.REACT_APP_URL}/categories`)
         setCategories(res.data)
         setLoading(false)
        }catch(err){
            setLoading(false)
          console.log(err)
        }
    }


   return(<>
      {loading ? (<h4>loading ...</h4>) : categories.map(cat=>(<Link key={cat._id} to={`/categories/${cat.slug}`} className="col-md-2 btn btn-outline-primary">{cat.name}</Link>))}
   </>
);
}
export default CategoryListComponent