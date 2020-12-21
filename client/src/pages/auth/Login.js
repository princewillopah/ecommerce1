import React, {useState,useEffect} from 'react'
import {toast} from 'react-toastify';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {roleBasedRedirect} from '../../utils/componentFunctions'

import {useDispatch,useSelector} from 'react-redux'

const Login = ({history}) => {

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [loading, setLoading] = useState(false)

   const dispatch = useDispatch()
   const {userInfo} = useSelector(state=>state.userState)
   // const {userInfo, loading, error} = userRegister
    useEffect(() => {
        if(userInfo){ history.push('/')}//redirct to /home
    }, [userInfo,history])


   const handleOnsubmit = async(e) => {
       e.preventDefault();
      const config = { headers:{'Content-Type':'application/json'}}
      try {
         //  dispatch({type:"USER_REQUEST"})//set loading to true, 
         setLoading(true)
          const res = await axios.post(`${process.env.REACT_APP_URL}/login`,{email,password},config)//make the request
          // console.log(res)
          dispatch({type:"USER_LOGIN_SUCCESS",payload: res.data})//send action to reducer
          // dispatch({type:U.USER_LOGIN_SUCCESS,payload: data})//TO LOGIN USER AFTER REGISTER
          localStorage.setItem('userInfo', JSON.stringify(res.data))//we can only save string in localstorage by converting the json with json.stringify()
          // history.push('/')
          roleBasedRedirect(history,res.data.role)//redirect
      } catch (err) {
          dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
          toast.error(err.response.data.message )
          setLoading(false)
        }//end trycatch
       
   }


const LoginForm = () => (
 
            <form onSubmit={handleOnsubmit}>
                     <div className="form-group" >
                       <label htmlFor="email">Email</label>
                       <input type="email" name="email" id="email" className="form-control" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}/>
                     </div>
                     <div className="form-group" >
                       <label htmlFor="password">Password</label>
                       <input type="password" name="password" id="password" className="form-control" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}/>
                     </div>
                    
                     <div className="form-group d-flex align-items-baseline" >
                       <input type="submit" className="btn btn-primary btn-raised w-25 text-center mb-2" value='Login'/>
                         <Link className="ml-auto align-self-baseline" to="/forgot-password">Forgot password?</Link>
                       {/* { contactContext.current &&  <button type="submit" className="btn btn-outline-primary w-100 text-center" onClick={clearAll}>Cancel</button>} */}
                     </div>
                     <div>
                       <p>Dont have an account? <Link to="/register">Signup</Link></p>  
                     </div>
         </form>

)

   return(
   <div className="container ">
       <div className="row d-flex justify-content-center mt-5">
          <div className="col-md-6">
             {loading ? <h4 className="text-danger">Logging...</h4> : <h4>Login  Form</h4>}
             {LoginForm()}
          </div>
       </div>
   </div>
);
}
export default Login