import React, {useEffect,useState} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import axios from 'axios'
import {useSelector} from 'react-redux'
import ProductCard from '../../../components/card/AdminProductCard'
// import ProductCardLoading from '../../../components/card/ProductCardLoading'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {toast} from 'react-toastify';


const ListProducts = () => {


    const [loading, setLoading] = useState(false)
    const [products, loadProducts] = useState([])

    const {userInfo} = useSelector(state=>state.userState)

useEffect(() => {
    getAllProducts()
    // eslint-disable-next-line
}, [])


    const getAllProducts = async() => {
        try{
            const config = { headers:{Authorization: `Bearer ${userInfo.token}`}}
            const res = await axios.get(`${process.env.REACT_APP_URL}/products/${20}`,config)
            loadProducts(res.data)
            console.log(res.data)
        }catch(err){
          console.log(err)
        }
    }

// ==========================================================
                    //    delete product 
// =============================================================



const handleDelete = async(slug) => {

    // if(window.confirm('Are you sure you want to delete this?')){
    //     const config = {headers:{Authorization: `Bearer ${userInfo.token}`}}
    //               const res = await axios.delete(`${process.env.REACT_APP_URL}/products/${slug}`,config)
    //             //   setLoading(false)
    //             //   setName('')
    //               toast.success(res.data)
    //               getAllProducts()
               
    // }


    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
               const config = { headers:{Authorization: `Bearer ${userInfo.token}`}}
              const res = await axios.delete(`${process.env.REACT_APP_URL}/products/${slug}`,config)
              .then(res =>{
                toast.success(res.data)
                getAllProducts()
              })
              .catch(err=>{
                toast.error(err.response.data.message )
                console.log(err.response.data.message)
              })
             
          }
        },
        {
          label: 'No',
        //   onClick: () => alert('Click No')
        }
      ]
    });
  };



    return(<>
        <div className="container-fluid ">
              <div className="row mt-5">
              <div className="col-md-3">
                  <AdminNav/>
              </div>
              <div className="col-md-9">
              {loading? <div>Loading</div> : <h3>{products.length === 1 ?'1 Product' : 'All '+products.length+' products '}</h3>}
                  {/* {JSON.stringify(values.images)} */}
                  <div className="row">
                      <div className="col-md-12">
                          <div className="row">
                          {/* {loading && <ProductCardLoading/>} */}
                          {products && products.map(product =><ProductCard handleDelete={handleDelete} loadingProd={loading} setLoadingProd={setLoading} product={product} key={product._id}/>)}
                           
                          </div>
                      </div>
                    
               
                  </div>

              </div>
              </div>
          </div>
 </>
);
}
export default ListProducts