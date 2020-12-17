import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import axios from 'axios'
// import {Link} from 'react-router-dom'

import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'
// import LocalSearch from '../../../components/forms/LocalSearch';
import {create} from '../../../utils/productFunctions';

 
const initialState = {
      title: "",
      description:"",
      price: 1000,
      categories: [],// for all categories
      category:"",
      subCategory:[],
      quantity: 20,
      sold: 0,
      images: [],
      color:"Black",
      brand:"Apple",
      shipping:"No",
      colorOptions: ['Black','Blue','Red','Green',"Silver"],//just to mao true if in state
      brandOptions: ['Apple','Samsung','Microsoft','Lenovo',"Asus"],
 
 
}
const Create = () => {
  const [values, setValues] = useState(initialState)

   const {title, description, price, categories, category, subCategory, quantity, sold, images,shipping,color, brand, colorOptions, brandOptions} = values
    const {userInfo} = useSelector(state=>state.userState)

    // useEffect(()=>{
    //     loadAllCategories()
    //     loadAllSubCategories()
    // },[])

    // const loadAllCategories = async() => {
    //     try{
    //         // const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
    //         const res = await axios.get('http://localhost:5000/api/categories')
    //         loadCategories(res.data)
    //     }catch(err){
    //       console.log(err)
    //     }
    // }
    // const loadAllSubCategories = async() => {
    //     try{
    //         // const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
    //         const res = await axios.get('http://localhost:5000/api/sub-categories')
    //         loadSubCategories(res.data)
    //     }catch(err){
    //       console.log(err)
    //     }
    // }
    // const dispatch = useDispatch() 

        const handleOnsubmit = async(e) => {
            e.preventDefault()
            try{
                // setLoading(true)
                // const res = await createCategories(name,userInfo.token)
                const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
                const res = await axios.post('http://localhost:5000/api/products',values,config)
              
                
                toast.success(`"${res.data.product.title}" has been created`)
                setValues(initialState)

                // loadAllSubCategories()
                
            }catch(err){
              
                // setLoading(false)
                // dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
                // toast.error(err.response.data.message )
                //  toast.error(err.response.data.message)
                // console.log(err.response.data.message)
                if(err.response && err.response.data.message){
                     toast.error(err.response.data.message)
                    console.log(err.response.data.message)
                }else{
                     toast.error(err.message)
                    console.log(err.message)
                }
                // console.log(err)

            }
        }
        const handleChange = e =>{
        setValues({...values, [e.target.name]: e.target.value})
        }
    //     const handleDelete = async(slug) => {
    //      if(window.confirm('Are you sure you want to delete this recodr')){
    //         try{
    //             setLoading(true)
    //             // const res = await createCategories(name,userInfo.token)
    //             const config = { headers:{Authorization: `Bearer ${userInfo.token}`}}
    //             const res = await axios.delete(`http://localhost:5000/api/sub-categories/${slug}`,config)
    //             setLoading(false)
    //             // setName('')
    //             toast.success(res.data.message)
    //             loadAllSubCategories()
                
    //         }catch(err){
              
    //             setLoading(false)
    //             // dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
    //             toast.error(err.response.data.message )
    //             console.log(err.response.data.message)

    //         }
    //      }
            
    //     }

      
    // //     //FUNCTION FOR SERACH
    //     const searchFunction = keyword => c => c.name.toLowerCase().includes(keyword)//a function returning another function
      

   return(<>
          <div className="container ">
                <div className="row mt-5">
                <div className="col-md-3">
                    <AdminNav/>
                </div>
                <div className="col-md-9">
                    <h1>Create Product</h1>
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                        <form onSubmit={handleOnsubmit}>
                            
                                {/* {loading ?  <span className="text-danger">Creating Category ...</span> :  <label htmlFor="name">Create Product</label>} */}
                           
                            <input type="text" name="title" id="title" className="form-control mb-2" placeholder="Title" value={title} onChange={handleChange}/>
                            <input type="text" name="description" id="description" className="form-control mb-2" placeholder="Description" value={description} onChange={handleChange}/>
                            <input type="number" name="price" id="price" className="form-control mb-2" placeholder="Price" value={price} onChange={handleChange}/>
                            <input type="number" name="quantity" id="quantity" className="form-control mb-2" placeholder="quantity" value={quantity} onChange={handleChange}/>
                            <select className="form-control mb-2" name="shipping" value={shipping} onChange={handleChange}>
                                <option>Select Shipping Option</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                            <select className="form-control mb-2" name="color" value={color} onChange={handleChange}>
                                <option>Select Color</option>
                                {colorOptions.map( color => (<option key={color} value={color}>{color}</option>))}
                            </select>
                            <select className="form-control mb-2" name="brand" value={brand} onChange={handleChange}>
                                <option>Select Brand</option>
                                {brandOptions.map( brand => (<option key={brand} value={brand}>{brand}</option>))}
                            </select>
                         

                            <input type="submit" className="btn btn-primary btn-raised w-50 text-center mb-2" value='Create'/>
                          
                            
                        </form>

                        </div>
                      
                 
                    </div>

                </div>
                </div>
            </div>
   </>
);
}
export default Create    