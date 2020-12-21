import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import axios from 'axios'

import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'

const CategoryUpdate = ({history,match}) => {
    const [name, setName] = useState('')
    const [parent, setParent] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, loadCategories] = useState([])
    // const [subCategories, loadSubCategories] = useState([])
    const [category, setCategory] = useState('')
    // const [category, setCategory] = useState({})

      
    const {userInfo} = useSelector(state=>state.userState)

    useEffect(()=>{
        loadsubCategory()
        loadAllCategories()
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
    const loadsubCategory = async() => {
        try{
            setLoading(true)
           
            const res = await axios.get(`${process.env.REACT_APP_URL}/sub-categories/${match.params.slug}`)
            setName(res.data.name)
            setParent(res.data.parent)
            setLoading(false)
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
                const res = await axios.put(`${process.env.REACT_APP_URL}/sub-categories/${match.params.slug}`,{name:name,parent:parent},config)
                // setLoading(false)
                // setName('')
                toast.success(`"${res.data.name}" has been Updated`)
                console.log(res.data.name)
                history.push('/admin/sub-category')
                
                
            }catch(err){
              
                setLoading(false)
                // dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
                toast.error(err.response.data.message )
                // console.log(err.response.data.message)
                console.log(err.response)

            }
        }
       


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
                        {/* value={parent} */}
                                {loading ?  <span className="text-danger">Updating SubCategory ...</span> :  <label htmlFor="name">Update Category</label>}
                            <div className="form-group" >
                            <input type="text" name="name" id="name" className="form-control"  value={name} onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className="form-group" >
                            <label htmlFor="CAT">Category list:</label>
                            <select name="CAT" id="CAT" className="form-control" value={parent}  onChange={e => setParent(e.target.value)}>
                            <option>Please select category</option>
                            {categories.length > 0 && categories.map(c => (<option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>))}
                           </select>
                            </div>
                            <input type="submit" className="btn btn-primary btn-raised w-50 text-center mb-2" value='Update'/>
                              
                        </form>
                        </div>
                    </div>

                </div>
                </div>
            </div>
   </>
);
}
export default CategoryUpdate