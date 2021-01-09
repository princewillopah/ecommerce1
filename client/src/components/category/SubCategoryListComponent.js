import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const CategoryListComponent = () => {
    const [subcategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        loadAllSubCategories()
    },[])
    const loadAllSubCategories = async() => {
        try{
            setLoading(true)
         const res = await axios.get(`${process.env.REACT_APP_URL}/sub-categories`)
         setSubCategories(res.data)
         setLoading(false)
        }catch(err){
            setLoading(false)
          console.log(err)
        }
    }


   return(<>
      {loading ? (<h4>loading ...</h4>) : subcategories.map(sub=>(<Link key={sub._id} to={`/sub-categories/${sub.slug}`} className="col-md-2 btn btn-outline-primary">{sub.name}</Link>))}
   </>
);
}
export default CategoryListComponent