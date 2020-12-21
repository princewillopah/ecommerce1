import React, {useState,useEffect} from 'react'
import {toast} from 'react-toastify';
import axios from 'axios'
import {Link} from 'react-router-dom'

import {useDispatch,useSelector} from 'react-redux'

const ResetPassword = ({history,match}) => {

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
   const [loading, setLoading] = useState(false)

   const dispatch = useDispatch()
   const {userInfo} = useSelector(state=>state.userState)
    useEffect(() => {
        if(userInfo){ history.push('/')}//redirct to /home
    }, [userInfo,history])

    const resettoken =  match.params.resettoken;
   const handleOnsubmit = async(e) => {
       e.preventDefault();
       if(password !== confirmPassword){
        toast.error('Both Passwords Must Match')
      }else{
      const config = { headers:{'Content-Type':'application/json'}}
      try {
        //  setLoading(true)
          const res = await axios.patch(`${process.env.REACT_APP_URL}/reset-password`,{password,resettoken},config)//make the request

         toast.success(res.data.message )
             history.push('/login')
      } catch (err) {
          dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
          toast.error(err.response.data.message )
        
        }//end trycatch
      }//end else  
   }


const resetpassword= () => (
 
            <form onSubmit={handleOnsubmit}>
                      <div className="form-group" >
                       <label htmlFor="password">Password</label>
                       <input type="password" name="password" id="password" className="form-control" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}/>
                     </div>
                     <div className="form-group" >
                       <label htmlFor="password2">Confirm Password </label>
                       <input type="password" name="password2" id="password2" className="form-control" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
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
             {loading ? <h4 className="text-danger">Restting password...</h4> : <h4>Reset Password Form</h4>}
             {resetpassword()}
           
          </div>
       </div>
   </div>
);
}
export default ResetPassword 