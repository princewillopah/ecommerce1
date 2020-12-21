import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import axios from 'axios'
import {Link} from 'react-router-dom'

import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'
import LocalSearch from '../../../components/forms/LocalSearch';

const Create = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, loadCategories] = useState([])
    const [subCategories, loadSubCategories] = useState([])
    const [category, setCategory] = useState('')
    const [searchKeyword, setSearchKeyword] = useState('')

      
    const {userInfo} = useSelector(state=>state.userState)

    useEffect(()=>{
        loadAllCategories()
        loadAllSubCategories()
    },[])

    const loadAllCategories = async() => {
        try{
            // const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
            const res = await axios.get(`${process.env.REACT_APP_URL}/categories`)
            loadCategories(res.data)
        }catch(err){
          console.log(err)
        }
    }
    const loadAllSubCategories = async() => {
        try{
            // const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
            const res = await axios.get(`${process.env.REACT_APP_URL}/sub-categories`)
            loadSubCategories(res.data)
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
                const res = await axios.post(`${process.env.REACT_APP_URL}/sub-categories`,{name,parent:category},config)
                setLoading(false)
                setName('')
                setCategory('')
                toast.success(`"${res.data.subcategory.name}" has been created`)
                loadAllSubCategories()
                
            }catch(err){
              
                setLoading(false)
                // dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
                // toast.error(err.response.data.message )
                 toast.error(err.response.data.message)
                // console.log(err.response.data.message)
                // if(err.response && err.response.data.message){
                //      toast.error(err.response.data.message)
                //     console.log(err.response.data.message)
                // }else{
                //      toast.error(err.message)
                //     console.log(err.message)
                // }
                // console.log(err)

            }
        }
        const handleDelete = async(slug) => {
         if(window.confirm('Are you sure you want to delete this recodr')){
            try{
                setLoading(true)
                // const res = await createCategories(name,userInfo.token)
                const config = { headers:{Authorization: `Bearer ${userInfo.token}`}}
                const res = await axios.delete(`${process.env.REACT_APP_URL}/sub-categories/${slug}`,config)
                setLoading(false)
                // setName('')
                toast.success(res.data.message)
                loadAllSubCategories()
                
            }catch(err){
              
                setLoading(false)
                // dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
                toast.error(err.response.data.message )
                console.log(err.response.data.message)

            }
         }
            
        }

      
    //     //FUNCTION FOR SERACH
        const searchFunction = keyword => c => c.name.toLowerCase().includes(keyword)//a function returning another function
      

   return(<>
          <div className="container ">
                <div className="row mt-5">
                <div className="col-md-3">
                    <AdminNav/>
                </div>
                <div className="col-md-9">
                    <h1>Sub Category</h1>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleOnsubmit}>
                            
                                {loading ?  <span className="text-danger">Creating Category ...</span> :  <label htmlFor="name">Create Category</label>}
                           <div className="form-group" >
                            <input type="text" name="name" id="name" className="form-control" placeholder="subcategory Name" value={name} onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className="form-group" >
                            <label htmlFor="CAT">Category list:</label>
                            <select name="CAT" id="CAT" className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                            <option>Please select category</option>
                            {categories.length > 0 && categories.map(c => (<option key={c._id} value={c._id}>{c.name}</option>))}
                           </select>
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
                            
                            subCategories.filter(searchFunction(searchKeyword)).map(subcat => (<div className="col-md-3 mb-1" key={subcat._id}>
                                <div className="card p-2">
                                    <div className="card-header">
                                    <h6 style={{fontWeight:"bold"}}>{subcat.name}</h6>
                                        <p>{subcat.parent.name}</p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between p-0">
                                        <Link to={`/admin/sub-category/${subcat.slug}`} className="btn btn-sm btn-secondary">Edit</Link>
                                        <button onClick={() => handleDelete(subcat.slug)} className="btn btn-sm btn-danger">Delete</button>
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
export default Create    