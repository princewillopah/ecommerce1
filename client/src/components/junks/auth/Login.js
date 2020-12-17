import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../store/actions/alertAction';
import {login} from '../../store/actions/authAction'

import {Formik,Form,Field, ErrorMessage} from 'formik'
import * as yup from "yup";
import '../styles/myform.css'


const Login = (props) => {
    const myInitialValues = { email: '', password: '',}

 
  const handleOnsubmit = (values, onSubmitProps) => {
         const loginFormData = {
            email:values.email,
            password:values.password
        }
       props.login(loginFormData)//calling login function
       onSubmitProps.setSubmitting(false);
    //    onSubmitProps.resetForm();
      
  }
//    const handleOnchange = e => setFormData({...formData, [e.target.name]:e.target.value})

const handleValidationErrors = yup.object().shape({
  
    email: yup.string()
        .required('Email is required')
        .lowercase(),//CONVERT IT TO LOWER CASE
    password: yup.string()
        .required('Password is required')
        .min(6,'Password Length should be 6 or more characters'),
});
     //redirect if authenticated
     if(props.isAuthenticated){
         return <Redirect to="/dashboard" />
     }

     
   return(
    <div className="row">
         <div className="col-md-4 offset-md-4 myform" >
             <p className="lead"><i className="fa fa-user"></i> Login</p>
             <Formik initialValues={myInitialValues} onSubmit={handleOnsubmit} validationSchema={handleValidationErrors} >
                      {formik=>{
                                  return(
                                      <Form>
                                                <div className="form-group" >
                                                    <label htmlFor="email"  className={(formik.errors.email && formik.touched.email ? ' text-danger' : '')}>Email</label>
                                                    <Field type="email" name="email" id="email" className={'form-control' + (formik.errors.email && formik.touched.email ? ' is-invalid' : '')} placeholder="Enter Email"  autoComplete="none"/>
                                                    <ErrorMessage name='email' component='div' className="invalid-feedback"/>
                                                </div>
                                                <div className="form-group" >
                                                    <label htmlFor="password"  className={(formik.errors.password && formik.touched.password ? ' text-danger' : '')}>Password</label>
                                                    <Field type='password' name="password" id="password" className={'form-control' + (formik.errors.password && formik.touched.password ? ' is-invalid' : '')} placeholder="Enter Passwred"  autoComplete="none"/>
                                                    <ErrorMessage name='password' component='div' className="invalid-feedback"/>
                                                </div>
                                                <div className="form-group" >
                                                <button type="submit" className="btn btn-primary btn-sm text-center mr-1"  disabled={formik.isSubmitting || !formik.isValid } >{formik.isSubmitting?'Submitting...':'Register'}</button>
                                                <button type="reset" className="btn btn-primary btn-sm text-center mr-1">Reset</button>
                                                  </div>
                                                <p className="my-1">
                                                    Already have an account? <Link to="/register">Sign UP</Link>
                                                </p>
                                      </Form>
                                                  
                                  )
                              }
  
                      }
                     
                  </Formik>
    </div>
    </div>
   
 );



//    return(
//    <div className="col-md-6 offset-3">
//             <h1 className="large text-primary">Sign Up</h1>
//             <p className="lead"><i className="fa fa-user"></i> Login To Your Account</p>
//             <form className="form" onSubmit={handleOnsubmit}>
               
//                 <div className="form-group">
//                 <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleOnchange} />
//                 <small className="form-text"
//                     >This site uses Gravatar so if you want a profile image, use a
//                     Gravatar email</small
//                 >
//                 </div>
//                 <div className="form-group">
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     minLength="6"
//                     value={formData.password} 
//                     onChange={handleOnchange}
//                 />
//                 </div>
//                 <input type="submit" className="btn btn-primary" value="Login" />
//             </form>
//             <p className="my-1">
//                 Already have an account? <Link to="/register">Sign UP</Link>
//             </p>
//    </div>
// );



}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated//get isAuthenticated from auth
})

export default connect(mapStateToProps,{setAlert,login})(Login) 