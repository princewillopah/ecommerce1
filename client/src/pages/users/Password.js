import React,{useState} from 'react'
import UserNav from '../../components/nav/UserNav'
import AdminNav from '../../components/nav/AdminNav'
import {toast} from 'react-toastify';
import axios from 'axios'

import {useDispatch,useSelector} from 'react-redux'

const Password = () => {
    // const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
  
    const {userInfo} = useSelector(state=>state.userState)
    const dispatch = useDispatch() 

    const handleOnsubmit = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
         toast.error('Both New Password and Confirm New Password  Must Match')
       }else{
        const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${userInfo.token}`}}
       try {
         //  setLoading(true)
           const res = await axios.patch(`${process.env.REACT_APP_URL}/update-password`,{password},config)//make the request
        //    setCurrentPassword('')
           setPassword('')
           setConfirmPassword('')
           toast.success(res.data.message)
       } catch (err) {
           dispatch({type:"USER_FAIL", payload: err.response && err.response.data.message ? err.response.data.message  : err.message })//send action to reducer
           toast.error(err.response.data.message )
         
         }//end trycatch
       }//end else  
    }

    const updatepassword= () => (
 
        <form onSubmit={handleOnsubmit}>
               {/* <div className="form-group" >
                    <label htmlFor="password">Old Password</label>
                    <input type="password" name="password" id="currentpassword" className="form-control" placeholder="Enter Password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
                </div> */}
                <div className="form-group" >
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password" className="form-control" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form-group" >
                    <label htmlFor="password2">Confirm New Password </label>
                    <input type="password" name="password2" id="password2" className="form-control" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                </div>
                <div className="form-group " >
                    <input type="submit" className="btn btn-primary btn-raised w-50 text-center mb-2" value='submit'/>
                    {/* { contactContext.current &&  <button type="submit" className="btn btn-outline-primary w-100 text-center" onClick={clearAll}>Cancel</button>} */}
                </div>
                {/* <div>
                    <p>Remember Password? <Link to="/login">SignIn</Link></p>  
                </div> */}
        </form>

        )

   return(<>
          <div className="container ">
                <div className="row mt-5">
                <div className="col-md-3">
                   {userInfo && userInfo.role === 'subscriber' && <UserNav/>}
                   {userInfo && userInfo.role === 'admin' && <AdminNav/>}
                    {/* <UserNav/> */}
                </div>
                    <div className="col-md-9">
                        <div className="row">
                           <div className="col-md-6 offset-md-3">
                               {updatepassword()}
                           </div>
                        </div>
 
                    </div>
                </div>
            </div>
   </>
);
}
export default Password