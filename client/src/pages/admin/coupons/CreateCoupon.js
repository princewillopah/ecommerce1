
import React,{useState,useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import axios from 'axios'
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {DeleteOutlined} from '@ant-design/icons'
import Moment from 'react-moment'

const CreateCoupon = () => {
    const [name, setName] = useState('')
    const [expiryDate, setExpiryDate] = useState(new Date())
    const [discount, setDiscount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [coupons, loadCoupons] = useState([])
    // const [searchKeyword, setSearchKeyword] = useState('')

    const {userInfo} = useSelector(state=>state.userState)

    useEffect(()=>{
        loadAllCoupons()
    },[])

    
    const loadAllCoupons = async() => {
        try{
            // const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
            const res = await axios.get(`${process.env.REACT_APP_URL}/coupons`)
            loadCoupons(res.data)
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
                const res = await axios.post(`${process.env.REACT_APP_URL}/coupon`,{name,discount,expiry: expiryDate},config)
                setLoading(false)
                toast.success(`"${res.data.name}" has been created`)
                loadAllCoupons()
                setName('')
                setDiscount('')
                setExpiryDate('')
              
                
            }catch(err){
              
                setLoading(false)
                // dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
                // toast.error(err.response.data.message )
                console.log(err)

            }
        }

        
        const handleDelete = async(id) => {
         if(window.confirm('Are you sure you want to delete this coupon')){
            try{
                setLoading(true)
                // const res = await createCategories(name,userInfo.token)
                const config = { headers:{Authorization: `Bearer ${userInfo.token}`}}
                const res = await axios.delete(`${process.env.REACT_APP_URL}/coupon/${id}`,config)
                setLoading(false)
                toast.success(res.data.message)
                loadAllCoupons()
                
            }catch(err){
              
                setLoading(false)
                // dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
                // toast.error(err.response.data.message )
                console.log(err.response.data.message)

            }
         }
            
        }

      
   return(<>
      <div className="container">
          <div className="row mt-5">
                 <div className="col-md-3">
                    <AdminNav/>
                </div>
              

                <div className="col-md-9">
                    <h1>Coupons</h1>
                    <div className="row">
                        <div className="col-md-6 ">
                        <form onSubmit={handleOnsubmit}>
                           {loading ?  <span className="text-danger">Creating Coupon ...</span> :  <label htmlFor="name">Create Coupon</label>}
                           
                            <div className="form-group" > 
                            <input type="text" name="name" id="name" className="form-control" placeholder="Coupon Name" value={name} onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className="form-group" > 
                            <input type="number" name="discount" className="form-control" placeholder="Coupon Discount %" value={discount} onChange={e => setDiscount(e.target.value)}/>
                            </div>
                            <div className="form-group" > 
                            <DatePicker className="form-control" selected={expiryDate} value={expiryDate} onChange={date => setExpiryDate(date)} />
                           </div>
                            <input type="submit" className="btn btn-primary btn-raised w-50 text-center mb-2" value='Create'/>
                          
                            
                        </form>

                        </div>
                        <div className="col-md-12 mt-5">

                        <table class="table table-dark table-striped">
                            <thead>
                            <tr>
                                <th>Coupon Name</th>
                                <th>Discount</th>
                                <th>Expiry Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {!loading && 
                            
                            coupons.map(coupon => (
                            <tr key={coupon._id}>
                                <td>{coupon.name}</td>
                                <td>{coupon.discount}%</td>
                                <td> <Moment format='DD/MM/YYYY'>{coupon.expiry}</Moment></td>
                                <td><DeleteOutlined title="Delete" onClick={() => handleDelete(coupon._id)} className="btn btn-sm btn-danger"/></td>
                                {/* <td><button onClick={() => handleDelete(coupon._id)} className="btn btn-sm btn-danger">Delete</button></td> */}
                            </tr>))
                            } 
                            </tbody>
                        </table>

                        </div>

                </div>
                </div>




          </div>
      </div>
   </>
);
}
export default CreateCoupon