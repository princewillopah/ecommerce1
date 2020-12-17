import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import axios from 'axios'

import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'

const CategoryUpdate = ({history,match}) => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    // const [category, setCategory] = useState({})

      
    const {userInfo} = useSelector(state=>state.userState)

    useEffect(()=>{
        loadCategory()
    },[])

    const loadCategory = async() => {
        try{
            setLoading(true)
           
            const res = await axios.get(`http://localhost:5000/api/categories/${match.params.slug}`)
            setName(res.data.name)
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
                const res = await axios.put(`http://localhost:5000/api/categories/${match.params.slug}`,{name},config)
                // setLoading(false)
                // setName('')
                toast.success(`"${res.data.name}" has been Updated`)
                console.log(res.data.name)
                history.push('/admin/category')
                
                
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
                            <div className="form-group" >
                                {loading ?  <span className="text-danger">Updating Category ...</span> :  <label htmlFor="name">Update Category</label>}
                           
                            <input type="text" name="name" id="name" className="form-control" placeholder="Category Name" value={name} onChange={e => setName(e.target.value)}/>
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