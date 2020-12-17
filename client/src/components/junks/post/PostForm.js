import React from 'react'
// import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../../store/actions/alertAction';
import {createPost } from '../../../store/actions/postAction';
import {Formik,Form,Field, ErrorMessage} from 'formik'
import * as yup from "yup";
import '../styles/myform.css'


const PostForm = (props) => {
    const myInitialValues = { text: ''}

 
  const handleOnsubmit = (values, onSubmitProps) => {
         const formdata = {text:values.text}
       props.createPost(formdata)//calling login function
       onSubmitProps.setSubmitting(false);
       onSubmitProps.resetForm();
      
  }

const handleValidationErrors = yup.object().shape({
    text: yup.string()
        .required('post text is required')
        .min(2,'post text Length should be 2 or more characters'),
});
    
     
   return(
    <div className="row">
         <div className="col-md-12 form" >
             <Formik initialValues={myInitialValues} onSubmit={handleOnsubmit} validationSchema={handleValidationErrors} >
                      {formik=>{
                                  return(
                                      <Form>
                                                <div className="form-group" >
                                                    <Field as="textarea" name="text" id="text" cols="30" row="8" className={'form-control' + (formik.errors.text && formik.touched.text ? ' is-invalid' : '')} placeholder="Enter text" />
                                                    <ErrorMessage name='text' component='div' className="invalid-feedback"/>
                                                </div>
                                                <div className="form-group" >
                                                <button type="submit" className="btn btn-primary btn-sm text-center mr-1"  disabled={formik.isSubmitting || !formik.isValid } >{formik.isSubmitting?'Submitting...':'Submit'}</button>
                                                <button type="reset" className="btn btn-primary btn-sm text-center mr-1">Reset</button>
                                            </div>
                                               
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


export default connect(null,{setAlert,createPost})(PostForm) 