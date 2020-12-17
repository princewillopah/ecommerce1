import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import axios from 'axios'
import {Link} from 'react-router-dom'

import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'
import LocalSearch from '../../../components/forms/LocalSearch';

const Dashboard = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, loadCategories] = useState([])
    const [searchKeyword, setSearchKeyword] = useState('')

      
    const {userInfo} = useSelector(state=>state.userState)

    useEffect(()=>{
        loadAllCategories()
    },[])

    const loadAllCategories = async() => {
        try{
            // const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
            const res = await axios.get('http://localhost:5000/api/categories')
            loadCategories(res.data)
        }catch(err){
          console.log(err)
        }
    }

    // const dispatch = useDispatch() 

        const handleOnsubmit = async(e) => {
            e.preventDefault()
            try{
                setLoading(true)
                // const res = await createCategories(name,userInfo.token)
                const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
                const res = await axios.post('http://localhost:5000/api/categories',{name},config)
                setLoading(false)
                setName('')
                toast.success(`"${res.data.category.name}" has been created`)
                loadAllCategories()
                
            }catch(err){
              
                setLoading(false)
                // dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
                toast.error(err.response.data.message )
                console.log(err.response.data.message)

            }
        }
        const handleDelete = async(slug) => {
         if(window.confirm('Are you sure you want to delete this recodr')){
            try{
                setLoading(true)
                // const res = await createCategories(name,userInfo.token)
                const config = { headers:{Authorization: `Bearer ${userInfo.token}`}}
                const res = await axios.delete(`http://localhost:5000/api/categories/${slug}`,config)
                setLoading(false)
                // setName('')
                toast.success(res.data.message)
                loadAllCategories()
                
            }catch(err){
              
                setLoading(false)
                // dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
                toast.error(err.response.data.message )
                console.log(err.response.data.message)

            }
         }
            
        }

      
        //FUNCTION FOR SERACH
        const searchFunction = keyword => c => c.name.toLowerCase().includes(keyword)//a function returning another function
        // or
        // function searchFunction(keyword) {
        //     return  
        // }

   return(<>
          <div className="container ">
                <div className="row mt-5">
                <div className="col-md-3">
                    <AdminNav/>
                </div>
                <div className="col-md-9">
                    <h1>Category</h1>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleOnsubmit}>
                            <div className="form-group" >
                                {loading ?  <span className="text-danger">Creating Category ...</span> :  <label htmlFor="name">Create Category</label>}
                           
                            <input type="text" name="name" id="name" className="form-control" placeholder="Category Name" value={name} onChange={e => setName(e.target.value)}/>
                            </div>

                            <input type="submit" className="btn btn-primary btn-raised w-50 text-center mb-2" value='Create'/>
                          
                            
                        </form>

                        </div>
                        <div className="col-md-12 mt-5">
                            <div className="row mb-3">
                              <div className="col">
                                  <LocalSearch mysearchKeyword={searchKeyword} mysetSearchKeyword={setSearchKeyword} />
                            </div>
                            </div>
                            <div className="row">
                            {!loading && 
                            
                            categories.filter(searchFunction(searchKeyword)).map(category => (<div className="col-md-3 mb-1" key={category._id}>
                                <div className="card p-2">
                                    <div className="card-header">
                                    <h6>{category.name}</h6>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between p-0">
                                        <Link to={`/admin/category/${category.slug}`} className="btn btn-sm btn-secondary">Edit</Link>
                                        <button onClick={() => handleDelete(category.slug)} className="btn btn-sm btn-danger">Delete</button>
                                    </div>
                                </div>
                                </div>))
                            }
                            </div>
                        </div>
                    </div>

                </div>
                </div>
            </div>
   </>
);
}
export default Dashboard