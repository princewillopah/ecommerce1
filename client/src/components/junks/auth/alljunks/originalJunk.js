import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../../store/actions/alertAction';
import {register} from '../../../store/actions/authAction'

const Register = (props) => {
    const [formData, setFormData] = useState({name:"",email:"",password:"",password2:""})

 
  const handleOnsubmit = e => {
      e.preventDefault();
      if(formData.password !== formData.password2){
        props.setAlert('password do no match','danger')
        }
      else{
        const regFormData = {
            name:formData.name,
            email:formData.email,
            password:formData.password
        }
       props.register(regFormData)//calling register function
        }
      
  }
   const handleOnchange = e => setFormData({...formData, [e.target.name]:e.target.value})

     //redirect if authenticated
     if(props.isAuthenticated){
        return <Redirect to="/dashboard" />
    }

   return(<div className="col-md-6 offset-3">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fa fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={handleOnsubmit}>
                <div className="form-group">
                <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleOnchange} />
                </div>
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
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    value={formData.password2} 
                    onChange={handleOnchange}
                />
                </div>
                <input type="file"/ name="pics" onChange={handleOnchange}>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
   </div>
);
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated//get isAuthenticated from auth
})
export default connect(mapStateToProps,{setAlert,register})(Register)