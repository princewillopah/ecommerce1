import React, {useState,useEffect} from 'react'
import {toast} from 'react-toastify';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {roleBasedRedirect} from '../../utils/componentFunctions'

import {useDispatch,useSelector} from 'react-redux'

const Register = ({history}) => {

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [loading, setLoading] = useState(false)

   const dispatch = useDispatch()
   const {userInfo} = useSelector(state=>state.userState)
   // const {userInfo, loading, error} = userRegister
    useEffect(() => {
        if(userInfo){ history.push('/')}//redirct to /home
    }, [userInfo,history])

   const handleOnsubmit = async(e) => {
       e.preventDefault();
       if(password !== confirmPassword){
        toast.error('Both Passwords Must Match')
      }else{
      //  dispatch(register(name,email,password))
      const config = { headers:{'Content-Type':'application/json'}}
      try {
          // dispatch({type:"USER_REQUEST"})//set loading to true, 
          setLoading(true)
          const res = await axios.post(`${process.env.REACT_APP_URL}/register`,{name,email,password},config)//make the request
          // console.log(res)
          dispatch({type:"USER_REGISTER_SUCCESS",payload: res.data})//send action to reducer
          // dispatch({type:U.USER_LOGIN_SUCCESS,payload: data})//TO LOGIN USER AFTER REGISTER
          localStorage.setItem('userInfo', JSON.stringify(res.data))//we can only save string in localstorage by converting the json with json.stringify()
          roleBasedRedirect(history,res.data.role)//redirect
      } catch (err) {
          dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
          toast.error(err.response.data.message )
          // console.log(err)
        }//end trycatch
      }//end else
       
   }


const registerForm = () => (
 
            <form onSubmit={handleOnsubmit}>
                     <div className="form-group" >
                       <label htmlFor="name">Name</label>
                       <input type="text" name="name" id="name" className="form-control" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)}/>
                     </div>
                     <div className="form-group" >
                       <label htmlFor="email">Email</label>
                       <input type="email" name="email" id="email" className="form-control" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}/>
                     </div>
                     <div className="form-group" >
                       <label htmlFor="password">Password</label>
                       <input type="password" name="password" id="password" className="form-control" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}/>
                     </div>
                     <div className="form-group" >
                       <label htmlFor="password2">Confirm Password </label>
                       <input type="password" name="password2" id="password2" className="form-control" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                     </div>
                    
                     <div className="form-group" >

                      
                       <input type="submit" className="btn btn-primary btn-raised w-50 text-center mb-2" value='Register'/>
                       {/* { contactContext.current &&  <button type="submit" className="btn btn-outline-primary w-100 text-center" onClick={clearAll}>Cancel</button>} */}
                     </div>
                     <div>
                       <p>Got an account? <Link to="/login">Signin</Link></p>  
                     </div>
         </form>

)

   return(
   <div className="container ">
       <div className="row d-flex justify-content-center mt-5">
          <div className="col-md-6">
            {loading ? <h4 className="text-danger">Register...</h4> : <h4>Register  Form</h4>}
            
             {registerForm()}
          </div>
       </div>
   </div>
);
}
export default Register