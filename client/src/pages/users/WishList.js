import React,{useState,useEffect} from 'react'
import NavLink from '../../components/nav/UserNav'
import axios from 'axios'
import {Link} from 'react-router-dom'

import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'

const WishList = () => {
    const [wishList, setWishList] = useState([])
    const [loading, setLoading] = useState(false)
      
    const {userInfo} = useSelector(state=>state.userState)

    useEffect(()=>{
        loadAllWishList()
    },[])

    const loadAllWishList = async() => {
        try{
            setLoading(true)
            const config = { headers:{ Authorization: `Bearer ${userInfo.token}`}}
            const res = await axios.get(`${process.env.REACT_APP_URL}/user/wishlist`,config)
            setWishList(res.data.wishlist)//
            console.log(res.data.wishlist)//delete this
            setLoading(false)
        }catch(err){
          console.log(err)
          setLoading(false)
        }
    }

    const handleWhishliatRemoval = (productId) => {
          
        //    console.log(productId)
             const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
        // console.log(config)
                  axios.put(`${process.env.REACT_APP_URL}/user/wishlist/${productId}`,{},config)//{} is there since i am using put instead od delete
             .then(res=>{
                if(res.data.OK){
                    toast.success('product removed from wishlist')
                    loadAllWishList()
                  }
             }).catch((err)=>{
                console.log(err)
                setLoading(false)
        })
    }

   return(<>
          <div className="container ">
                <div className="row mt-5">
                <div className="col-md-3">
                    <NavLink/>
                </div>
                    <div className="col-md-9">
                        <h1>{wishList.length > 0? "Your Wish List": " You Have No Wish List"}</h1>
                        
                        <ul className="list-group">
                        {!loading && wishList.length && wishList.map(item=>(
                            <li key={item._id} className="list-group-item">
                                <Link to={`/products/${item.slug}`}>{item.title}</Link> 
                                <button className="btn btn-sm btn-danger float-right" onClick={()=>handleWhishliatRemoval(item._id)}>
                                    Remove
                                </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
   </>
);
}
export default WishList