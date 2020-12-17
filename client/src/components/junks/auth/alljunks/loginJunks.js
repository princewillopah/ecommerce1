import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../store/actions/alertAction';
import {login} from '../../store/actions/authAction'

const Login = (props) => {
    const [formData, setFormData] = useState({email:"",password:""})

 
  const handleOnsubmit = e => {
      e.preventDefault();
      
        const loginFormData = {
            email:formData.email,
            password:formData.password
        }
       props.login(loginFormData)//calling login function
        
      
  }
   const handleOnchange = e => setFormData({...formData, [e.target.name]:e.target.value})

     //redirect if authenticated
     if(props.isAuthenticated){
         return <Redirect to="/dashboard" />
     }

   return(<div className="col-md-6 offset-3">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fa fa-user"></i> Login To Your Account</p>
            <form className="form" onSubmit={handleOnsubmit}>
               
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleOnchange} />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={formData.password} 
                    onChange={handleOnchange}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/register">Sign UP</Link>
            </p>
   </div>
);
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated//get isAuthenticated from auth
})

export default connect(mapStateToProps,{setAlert,login})(Login) 