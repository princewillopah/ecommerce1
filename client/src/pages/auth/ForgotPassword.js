import React, {useState,useEffect} from 'react'
import {toast} from 'react-toastify';
import axios from 'axios'
import {Link} from 'react-router-dom'

import {useDispatch,useSelector} from 'react-redux'

const ForgotPassword = ({history}) => {

   const [email, setEmail] = useState('')
   const [loading, setLoading] = useState(false)

   const dispatch = useDispatch()
   const {userInfo} = useSelector(state=>state.userState)
    useEffect(() => {
        if(userInfo){ history.push('/')}//redirct to /home
    }, [userInfo,history])


   const handleOnsubmit = async(e) => {
       e.preventDefault();
      const config = { headers:{'Content-Type':'application/json'}}
      try {
         setLoading(true)
          const res = await axios.post('http://localhost:5000/api/forgetPassword',{email},config)//make the request
          // console.log(res)
         //  dispatch({type:"USER_FORGET_PASSWORD",payload: res.data})//send action to reducer
         //  localStorage.setItem('userInfo', JSON.stringify(res.data))//we can only save string in localstorage by converting the json with json.stringify()
         //  history.push('/')
         toast.success(res.data.message )
         setLoading(false)
         setEmail('')
      } catch (err) {
          dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
          toast.error(err.response.data.message )
        
        }//end trycatch
       
   }


const Forgotpassword= () => (
 
            <form onSubmit={handleOnsubmit}>
                     <div className="form-group" >
                       <label htmlFor="email">Email</label>
                       <input type="email" name="email" id="email" className="form-control" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}/>
                     </div>
                    
                     <div className="form-group " >
                       <input type="submit" className="btn btn-primary btn-raised w-25 text-center mb-2" value='submit'/>
                       {/* { contactContext.current &&  <button type="submit" className="btn btn-outline-primary w-100 text-center" onClick={clearAll}>Cancel</button>} */}
                     </div>
                     <div>
                       <p>Remember Password? <Link to="/login">SignIn</Link></p>  
                     </div>
         </form>

)

   return(
   <div className="container ">
       <div className="row d-flex justify-content-center mt-5">
          <div className="col-md-6">
             {loading ? <h4 className="text-danger">Sendding Email ...</h4> : <h4>Forgot Password Form</h4>}
             {Forgotpassword()}
           
          </div>
       </div>
   </div>
);
}
export default ForgotPassword 