import React,{useEffect,useState} from 'react'
import axios from 'axios'
import ProductCard from '../components/card/ProductCard'
import ProductCardLoading from '../components/card/ProductCardLoading'
import {useSelector,useDispatch} from 'react-redux'
import {Menu, Slider,Checkbox, Radio} from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons'
import ShopStarFilter from '../components/forms/ShopStarFilter'


const Shop = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])// FOR LOADING OF CATS
  const [subCategories, setSubCategories] = useState([])// FOR LOADING OF CATS
  const [subc, setSubc] = useState('')
  const [categoryIds, setCategoryIds] = useState([])//cat ids from selected checkboxes to be sent to server for filter
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([0,0])//AN ARRAY WITH TWO VALUES
  const [finalPrice, setFinalPrice] = useState(false)//will only change to true or false when price slider change 
  const [star, setStar] = useState('')
  const [brands, setBrands] = useState(['Armani','Rougn & Rumble','Polo Ralph','TM Luis',"Mark & Spenser","others"])
  const [brand, setBrand] = useState('')//main state value for server
  const [colors, setColors] = useState(['Black','Blue','Red','Green',"Silver","Gold","others"])
  const [color, setColor] = useState('')//main state value for server
  const [shipping, setShipping] = useState('')//main state value for server
  const {text} = useSelector(state=>state.searchState)
  const dispatch = useDispatch()


  useEffect(() => {//useEFFECT FOR FIRST RENDER 
    getAllProducts()
    loadCatgories()
    loadSubCategories()
    // eslint-disable-next-line
}, [])

useEffect(() => {// useEffect for search bar
    // searchProducts()//normall, this makes too many request based on each keystroke
    // to delay by 300ms, we can improve the request
   let delayed = setTimeout(() => {
    searchOrFilterProducts({query: text})//this request will now be delayed by 300ms
    if(!text){getAllProducts()}//this is important because empty "text" is also a text. so when text changes(to empty text) no product is loaded ftom db//in this case, we load all products
   }, 300);
    return ()=>clearTimeout(delayed)
    // eslint-disable-next-line
}, [text])

useEffect(() => {//useEFFECT FOR FIRST RENDER 
    searchOrFilterProducts({price})//pass price to function to make request to backend
    // eslint-disable-next-line
}, [finalPrice])//if final price changes, make request to update the state
//------for nomal loading of products-----------------
    const getAllProducts = async() => {
        try{
            setLoading(true)
            // const config = { headers:{Authorization: `Bearer ${userInfo.token}`}}
            const res = await axios.get(`${process.env.REACT_APP_URL}/products/${20}`)
            setProducts(res.data)
            setLoading(false)
            // console.log(res.data)
        }catch(err){
            setLoading(false)
          console.log(err)
        }
    }
//------------------------load product based on search bar or any of these filtered term=--------
const searchOrFilterProducts = async(generalFilterArg) =>{
    try{
        setLoading(true)
        // const config = { headers:{Authorization: `Bearer ${userInfo.token}`}}
        const res = await axios.post(`${process.env.REACT_APP_URL}/products/search/filters`,generalFilterArg)
        setProducts(res.data)
        setLoading(false)
        // console.log(res.data)
    }catch(err){
        setLoading(false)
      console.log(err)
    }
}
//------------------------load product based on search bar or any of these filtered term=--------
const loadCatgories = async() =>{
    try{
        setLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_URL}/categories`)
        setCategories(res.data)
        setLoading(false)
        // console.log(res.data)
    }catch(err){
        setLoading(false)
      console.log(err)
    }
}
//------------------------load product based on search bar or any of these filtered term=--------
const loadSubCategories = async() =>{
    try{
        setLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_URL}/sub-categories`)
        setSubCategories(res.data)
        setLoading(false)
        // console.log(res.data)
    }catch(err){
        setLoading(false)
      console.log(err)
    }
}
//----------handle onchange lider--------
const handleSliderChange = value => {//when the slider changes
    dispatch({type:'SEARCH_QUERY',payload: {text: ''}})//make sure the value in the searchbar is set to empty so has to remove any search// we dont wanna make search and filter to the same end point 
   setPrice(value)//update price in state//not tha antd has helped u do the setPrice(e.target.name:e.target.value) thing
   setCategoryIds([])//reset checkbox for categories id 
   setStar('')//reset stars
   setBrand('')
   setSubc('')
   setColor('')
   setShipping('')
   //in order to make request request to the server when price changes, we want to delay 300ms so that when finalPrice changes, the useEffect will use the searchOrFilterProducts function to make request based on price passed to it
    setTimeout(()=>{//in 300ms set the finalPrice to true so the use effect will make request
        setFinalPrice(!finalPrice)//this part will change to true in 300ms
    },300)
}
const handleCatCheckboxesOnChange = (e) =>{
    //reset previous search
    dispatch({type:'SEARCH_QUERY',payload: {text: ''}})//make sure the value in the searchbar is set to empty so has to remove any search// we dont wanna make search and filter to the same end point 
    setPrice([0,0])//update price in state//not tha antd has helped u do the setPrice(e.target.name:e.target.value) thing
    setCategoryIds([])//reset checkbox for categories id 
    setStar('')
    setBrand('')
    setSubc('')
    setColor('')
    setShipping('')
    /////////////// 
    let inTheState = [...categoryIds]//spread all the current id in a new array called inTheState
    let justChecked = e.target.value// get the checked checkbox
    let foundInTheState = inTheState.indexOf(justChecked)//find the index of id of the newly selected checkbox in the array of ids in inTheState //check if the id representing the checkbox is in the array inTheState// if it exist, return the index, if it does not exist then return -1

     if(foundInTheState === -1){//this means the id does not exist in inTheState
        inTheState.push(justChecked)//since the id does not exist, push it in the inTheState   
    }else{//it means index of id matching foundInTheState is found in inTheState
        inTheState.splice(foundInTheState,1)//then remove the one found
    }  

    setCategoryIds(inTheState)//at this point, inTheState has no duplicates
    searchOrFilterProducts({category: inTheState})//call the function //pass category(as it is in req.body) to product array     
}
// ----------------------------/
 const handleStarclick = num => {
   //reset previous search
   dispatch({type:'SEARCH_QUERY',payload: {text: ''}})//make sure the value in the searchbar is set to empty so has to remove any search// we dont wanna make search and filter to the same end point 
   setPrice([0,0])//update price in state//not tha antd has helped u do the setPrice(e.target.name:e.target.value) thing
   setCategoryIds([])//reset checkbox for categories id 
   setSubc('')
   setBrand('')
   setColor('')
   setShipping('')
   ///////////////
   setStar(num)
   searchOrFilterProducts({stars: num})//call the function //pass stars(as it is in req.body) value to product controller     


 }
 const handleSubCat = subId => {
        //reset previous search
   dispatch({type:'SEARCH_QUERY',payload: {text: ''}})//make sure the value in the searchbar is set to empty so has to remove any search// we dont wanna make search and filter to the same end point 
   setPrice([0,0])//update price in state//not tha antd has helped u do the setPrice(e.target.name:e.target.value) thing
   setCategoryIds([])//reset checkbox for categories id 
   setStar('')//empty star
   setBrand('')
   setColor('')
   setShipping('')
   ////////
   setSubc(subId)//uneccessary
   searchOrFilterProducts({subcat: subId})
        
 }

 const handleBrandOnChange = e => {
          //reset previous search
   dispatch({type:'SEARCH_QUERY',payload: {text: ''}})//make sure the value in the searchbar is set to empty so has to remove any search// we dont wanna make search and filter to the same end point 
   setPrice([0,0])//update price in state//not tha antd has helped u do the setPrice(e.target.name:e.target.value) thing
   setCategoryIds([])//reset checkbox for categories id 
   setStar('')//empty star
   setSubc('')
   setColor('')
   setShipping('')
   ////////
   setBrand(e.target.value)//uneccessary
   searchOrFilterProducts({brand:e.target.value})
 }
 const handleColorOnChange = e => {
    //reset previous search
    dispatch({type:'SEARCH_QUERY',payload: {text: ''}})//make sure the value in the searchbar is set to empty so has to remove any search// we dont wanna make search and filter to the same end point 
    setPrice([0,0])//update price in state//not tha antd has helped u do the setPrice(e.target.name:e.target.value) thing
    setCategoryIds([])//reset checkbox for categories id 
    setStar('')//empty star
    setSubc('')
    setBrand('')
    setShipping('')

    ////////
    setColor(e.target.value)//uneccessary
    searchOrFilterProducts({color:e.target.value})
}
const handleShippingOnChange = e => {
 //reset previous search
 dispatch({type:'SEARCH_QUERY',payload: {text: ''}})//make sure the value in the searchbar is set to empty so has to remove any search// we dont wanna make search and filter to the same end point 
 setPrice([0,0])//update price in state//not tha antd has helped u do the setPrice(e.target.name:e.target.value) thing
 setCategoryIds([])//reset checkbox for categories id 
 setStar('')//empty star
 setSubc('')
 setBrand('')
 setColor('')

 ////////
 setShipping(e.target.value)//uneccessary
 searchOrFilterProducts({shipping:e.target.value})
}
// ---------- function to display checkoxes for categories ----
 const categoryCheckboxesFunc = () =>(
    categories.map( c =>(<div key={c._id}>
      {/* <Checkbox value={c._id} onChange={handleCatCheckboxesOnChange} className="mb-1 p-1" name="category">{c.name}</Checkbox><br></br> */}
      
                <label>
                    <input type="checkbox" className="mb-1 p-1" name={c.name} value={c._id} 
                    onChange={handleCatCheckboxesOnChange} 
                    checked={categoryIds.includes(c._id)}//make sure c._id is in state, then check ti
                    />{' '}{c.name}
                </label>
         
    </div>))
 )




   return(<>
     <div className="container-fluid my-5">
         <div className="row">
             <div className="col-md-3">
                 <h4 className="text-center mb-2">Search/Filter</h4>
                 <hr/>
                 <Menu defaultOpenKeys={['1','2','3','4','5','6','7']} mode="inline">
                    <Menu.SubMenu key="1" title={<span style={{fontWeight:"bold"}}><DollarOutlined/> Price</span>}>
                     <div className="ml-4 mr-4">
                         <Slider   range tipFormatter={(v)=> `₦${v}`} max={50000} min={1000} value={price} onChange={handleSliderChange}/>
                        
                     </div>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="2" title={<span style={{fontWeight:"bold"}}><DownSquareOutlined/> Categories</span>}>
                     <div className="ml-4 mr-4">
                       {categoryCheckboxesFunc()}
                     </div>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="3" title={<span style={{fontWeight:"bold"}}><StarOutlined/> Star Rating</span>}>
                     <div className="ml-4 mr-4">
                       <ShopStarFilter starClick={handleStarclick} numberOfStar={5}/>
                     </div>
                     <div className="ml-4 mr-4">
                       <ShopStarFilter starClick={handleStarclick} numberOfStar={4}/>
                     </div>
                     <div className="ml-4 mr-4">
                       <ShopStarFilter starClick={handleStarclick} numberOfStar={3}/>
                     </div>
                     <div className="ml-4 mr-4">
                       <ShopStarFilter starClick={handleStarclick} numberOfStar={2}/>
                     </div>
                     <div className="ml-4 mr-4">
                       <ShopStarFilter starClick={handleStarclick} numberOfStar={1}/>
                     </div>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="4" title={<span style={{fontWeight:"bold"}}><DownSquareOutlined/> Sub Categories</span>}>
                     <div className="ml-4 mr-4">
                        {!loading && subCategories.map(sub=>(<span key={sub._id} onClick={()=>{handleSubCat(sub._id)}}  className="badge badge-secondary p-1 m-1" style={{cursor:"pointer"}}>{sub.name}</span>))}
                     </div>
                     
                    </Menu.SubMenu>
                    <Menu.SubMenu key="5" title={<span style={{fontWeight:"bold"}}><DownSquareOutlined/> Brands</span>}>
                    <div className="ml-4 mr-4">
                        {brands.map(b=>(
                                <Radio className="pb-1 pl-1 pr-5 " key={b} value={b} checked={b === brand} onChange={handleBrandOnChange} >{b}</Radio>
                           
                               )
                              )
                            }
                     </div>    
                    </Menu.SubMenu>
                    <Menu.SubMenu key="6" title={<span style={{fontWeight:"bold"}}><DownSquareOutlined/> Colors</span>}>
                    <div className="ml-4 mr-4">
                        
                            <div className="form-group">
                                <select className="form-control" value={color} onChange={handleColorOnChange}>
                                    <option>Select Colors</option>
                                        {colors.map(c=>(<option key={c} value={c}>{c}</option>))}
                                </select>
                            </div>
                     </div>    
                    </Menu.SubMenu>
                    <Menu.SubMenu key="7" title={<span style={{fontWeight:"bold"}}><DownSquareOutlined/> Shipping</span>}>
                    <div className="ml-4 mr-4">
                        
                            <div className="form-group">
                                <select className="form-control" value={shipping} onChange={handleShippingOnChange}>
                                    <option>Select Shipping</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option> 
                                </select>
                            </div>
                     </div>    
                    </Menu.SubMenu>
                 </Menu>
             </div>
             <div className="col-md-9">
               <div className="row">
                   <div className="col-md-12">
                    {/* {loading ? <h4>Loading...</h4> : <h4>Products</h4>} */}
                   </div>
                   <div className="col-md-12">
                     <h4>{products.length < 1 && 'No Product Found'}</h4>
                   </div>
                   {products.map(product => ( <ProductCard product={product} key={product._id}/>))}
 
                    {/* {loading ? (<>{[...Array(8).keys()].map((r,index)=><ProductCardLoading key={index}/>)}</>) : (<>{products.map(product => ( <ProductCard product={product} key={product._id}/>))}</>)} */}
 
               </div>
             </div>
         </div>
     </div>
   </>
);
}
export default Shop