import React from 'react'
// import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../store/actions/alertAction';
import {addComment} from '../../store/actions/postAction';
import {Formik,Form,Field, ErrorMessage} from 'formik'
import * as yup from "yup";
import '../styles/myform.css'


const CommentForm = ({postid,addComment}) => {
    const myInitialValues = { text: ''}

 
  const handleOnsubmit = (values, onSubmitProps) => {
         const formdata = {text:values.text}
         addComment(postid,formdata)//calling login function
       onSubmitProps.setSubmitting(false);
       onSubmitProps.resetForm();
      
  }

const handleValidationErrors = yup.object().shape({
    text: yup.string()
        .required('comment box must not be empty')
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


}


export default connect(null,{setAlert,addComment})(CommentForm) 