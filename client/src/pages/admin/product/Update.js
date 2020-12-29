import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import axios from 'axios'
// import {Link} from 'react-router-dom'

import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'
import { Select } from "antd"
// import {Avatar, Badge} from 'antd'
// import Resizer from 'react-image-file-resizer';
// import Compress  from 'compress.js'


// import FileUpload from '../../../components/forms/FileUpload';
import ProductImageUpload from '../../../components/forms/ProductImageUpload';
// import {create} from '../../../utils/productFunctions';

const {Option} = Select

const initialState = {
      title: "",
      description:"",
      price: 0,

      category:"",
      quantity: 0,
      sold: 0,
      color:"",
      brand:"",
      shipping:"",
      colorOptions: ['Black','Blue','Red','Green',"Silver","Gold","others"],//just to mao true if in state
      brandOptions: ['Armani','Rougn & Rumble','Polo Ralph','TM Luis',"Mark & Spenser"],
}
const Update= ({match,history}) => {
  const [values, setValues] = useState(initialState)
  const [subOptions, setSubOptions] = useState([])//this handles the subcategory options(all sub cat of a particular category)
  const [categories, setCategories] = useState([])
//   const [showSubOptions, setShowSubOptions] = useState(false)
//   const [subCategory, setSubCategory] = useState(null)//this handles the current state of subcategories
  const [arrayOfCurrentProductSubIds, SetArrayOfCurrentProductSubIds] = useState([])//this contain the an array of ids of current product sub categories //required by ant design multiple select values

  const [images, setImage] = useState([])
  const [photoPreview,setPhotoPreview] = useState([])//empty or undefind
  const [loading, setLoading] = useState(false)

   const {title, description, price, category, quantity, sold,shipping,color, brand, colorOptions, brandOptions} = values
    const {userInfo} = useSelector(state=>state.userState)
    

    useEffect(()=>{
        loadProduct()
        // eslint-disable-next-line
    },[])
    useEffect(()=>{
        loadAllCategories()
        // eslint-disable-next-line
    },[])
    const loadProduct = async () => {
        try{
            setLoading(true)
            // const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
            const res = await axios.get(`${process.env.REACT_APP_URL}/products/product/${match.params.slug}`)
            setLoading(false)
            //load product
            setValues({...values, ...res.data, category: res.data.category._id})//loading the categories
            setImage(res.data.images)
            //load product subcategories
            
            let arr = []
            res.data.subCategory.map(s=>arr.push(s._id))
            console.log(arr)
            // SetArrayOfCurrentProductSubIds((prev)=>arr)
            SetArrayOfCurrentProductSubIds(arr)//to set the state of arrs of ids for current product sub to be used by the value attribute in subcategory select field
           //to subcategories options for the particular categories when the page first load
           axios.get(`${process.env.REACT_APP_URL}/categories/${res.data.category._id}/sub-categories`)
           .then(res =>{
               setSubOptions(res.data)
           })


            
        }catch(err){
            setLoading(false)
          console.log(err)
        }
    }


    const loadAllCategories = async() => {
        try{
            setLoading(true)
            // const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
            const res = await axios.get(`${process.env.REACT_APP_URL}/categories`)
            // loadCategories(res.data)
            setLoading(false)
            setCategories(res.data)//loading the categories

            // setSubOptions(res.data.subCategory)// to prepo
            ////may be removed
            // setSubOptions(res.data)// to prepopulate options for subcate when the pages first mount
            // console.log('xx',arrayOfCurrentProductSubIds)
            // console.log(res.data.subCategory);


        }catch(err){
            setLoading(false)
          console.log(err)
        }
    }

 

        const handleOnsubmit = async(e) => {
            e.preventDefault()
            try{
                // setLoading(true)
                // const res = await createCategories(name,userInfo.token)
                const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
                // const formvalues = {...values,subCategory}
               
                const formData = new FormData()
                formData.append("title", title);
                formData.append("description", description);
                formData.append("price", price);
                formData.append("category", category);
                for (const sub of arrayOfCurrentProductSubIds) {
                    formData.append('subCategory', sub)
                }
                // formData.append("subCategory", subCategory);
                formData.append("quantity", quantity);
                formData.append("shipping", shipping);
                formData.append("color", color);
                formData.append("brand", brand);
                for (const img of images) {
                 formData.append('images', img)
                }
            
                //   const res = await axios.post(`https://httpbin.org/anything`,formData)
                //   toast.success(`product has been updated`)
                //   console.log(res)

                const res = await axios.put(`${process.env.REACT_APP_URL}/products/${match.params.slug}`,formData,config)
                // console.log(res)
                toast.success(`"${res.data.title}" has been updated`)
                history.push('/admin/products')
               
                
            }catch(err){
              
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
// ==============================================
            // category
// ==========================================
        const handleCategoryChange =  async (e) =>{
            setValues({...values, category: e.target.value})
            SetArrayOfCurrentProductSubIds([])//SETIING previously selected subCategory back to empty when another parent category is selected
            // console.log(e.target.value)
            // axios.get(`http://localhost:5000/api/categories/${e.target.value}/sub-categories`)
            axios.get(`${process.env.REACT_APP_URL}/categories/${e.target.value}/sub-categories`)
            .then(res =>{
                setSubOptions(res.data)
                console.log(res.data)
            })
            .catch(err =>{
                 if(err.response && err.response.data.message){
                     toast.error(err.response.data.message)
                    console.log(err.response.data.message)
                }else{
                     toast.error(err.message)
                    console.log(err.message)
                }
            })

          
        }



 
   return(<>
          <div className="container ">
                <div className="row mt-5">
                <div className="col-md-3">
                    <AdminNav/>
                </div>
                <div className="col-md-9">
                    <h1>Update Product</h1>
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                        <form onSubmit={handleOnsubmit}>
                        
                                {/* {loading ?  <span className="text-danger">Updating Product ...</span> :  <label htmlFor="name">Update Product</label>} */}
                            {/* {JSON.stringify(category)} */}
                            <input type="text" name="title" id="title" className="form-control mb-2" value={title} onChange={handleChange}/>
                            <input type="text" name="description" id="description" className="form-control mb-2"  value={description} onChange={handleChange}/>
                            <input type="number" name="price" id="price" className="form-control mb-2"  value={price} onChange={handleChange}/>
                            <input type="number" name="quantity" id="quantity" className="form-control mb-2" value={quantity} onChange={handleChange}/>
                            <select className="form-control mb-2" name="shipping" value={shipping === "Yes"?"Yes":"No"} onChange={handleChange}>
                                
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                            <select className="form-control mb-2" name="color" value={color} onChange={handleChange}>
                               
                                {colorOptions.map( color => (<option key={color} value={color}>{color}</option>))}
                            </select>
                            <select className="form-control mb-2" name="brand" value={brand} onChange={handleChange}>
                                
                                {brandOptions.map( brand => (<option key={brand} value={brand}>{brand}</option>))}
                            </select>

                            <select name="category"  className="form-control mb-2" value={category} onChange={handleCategoryChange}>
                             {/* <option>{category ? category.name :'Please select category'}</option> */}
                            {categories.length > 0 && categories.map(c => (<option key={c._id} value={c._id}>{c.name}</option>))}
                           </select>

                          <div>
                               <label>Sub Categories</label>
                               <Select mode="multiple" style={{width:"100%"}} value={arrayOfCurrentProductSubIds} onChange={value =>SetArrayOfCurrentProductSubIds(value)} >
                              
                                   {subOptions && subOptions.map(sub =>(
                                        <Option value={sub._id} key={sub._id}>{sub.name}</Option>
                                   )) }
                               </Select>
                           </div>
                           
                           {/* <FileUpload setLoading={setLoading} values={values} setValues={setValues} loading={loading}/> */}
                         <ProductImageUpload images={images} setImage={setImage} photoPreview={photoPreview} setPhotoPreview={setPhotoPreview}/>
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
export default Update   