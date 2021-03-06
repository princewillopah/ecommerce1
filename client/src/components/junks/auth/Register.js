import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../../store/actions/alertAction';

import {register} from '../../../store/actions/authAction'
import {loadAllUsers} from '../../../store/actions/authAction'
import {Formik,Form,Field, ErrorMessage} from 'formik'
import * as yup from "yup";
import '../styles/myform.css'




const Register = ({users,loadAllUsers,setAlert,register,isAuthenticated}) => {

//-------------initialization -------------------------------
const myInitialValues = { name: '', email: '', password: '', password2: '',}
const [photo,setImage] = useState('')//empty or undefind
const [photoUploded,setphotoUploded] = useState()//empty or undefind
const [photoPreview,setPhotoPreview] = useState()//empty or undefind
//----------validation-----------------------------------------------------
//for existing email validation
useEffect(()=>{
    if(users){
      loadAllUsers()
    }//if there is no photo in the local state then return here by quitting the useEffect
    // eslint-disable-next-line
},[])//depending on photo in state
//FOR IMAGE PREVIEW
useEffect(()=>{
    if(!photo){return}//if there is no photo in the local state then return here by quitting the useEffect
//logic to handle the imafe preview
    const fileReader = new FileReader()
    fileReader.onload = () => { setPhotoPreview(fileReader.result)}
    fileReader.readAsDataURL(photo)
},[photo])//depending on photo in state


const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/; //for only alphabets
// const existingEmail = ['popo@popo.com','popo@gmail.com','prince@gmail.com']
const existingEmail = users.map(user =>user.email)//extract the emails from user fetched
// const FILE_SIZE = 160000000 * 1024;
// const SUPPORTED_FORMATS = [ "image/jpg", "image/jpeg", "image/gif", "image/png"];

const handleValidationErrors = yup.object().shape({
  
    name: yup.string()
        .required('Name is  required')
        .matches(alpha, {message: "Enter Valid Name", excludeEmptyString: true })
        .min(2,'Name must be a mininum of 2 characters'),
    email: yup.string()
        .required('Email is required')
        .email('Please enter a valid email')
        .notOneOf(existingEmail,`Email already exist`)
        .lowercase(),//CONVERT IT TO LOWER CASE
    password: yup.string()
        .required('Password is required')
        .min(6,'Password Length should be 6 or more characters'),
    password2: yup.string()
        .required('Password Comfirmation is required')
        .oneOf([yup.ref('password'),''],'Cormfirm password must match password'),
    // photo: yup.mixed()
    //        .required("A file is required")
    // .test("fileSize", "The file is too large", (value) => {
    //     if (!value.length) return true // attachment is optional
    //     return value[0].size <= 2000000000000
    //   }),
        
        // .test(
        //   "fileSize",
        //   "File too large",
        //   value => value && value.size <= FILE_SIZE
        // )
        // .test(
        //   "fileFormat",
        //   "Unsupported Format",
        //   value => value && SUPPORTED_FORMATS.includes(value.type)
        // )
    
    // photo:yup.mixed()
    //     //   .required("A file is required")
    //     //   .test(
    //     //     "fileSize",
    //     //     "File too large. maximum size accepted is 1MB",
    //     //     // value => value && value.size <= 20000000000000000
    //     //     value => value && value[0].size <= 90000000000000000
    //     //   )
    //       .test(
    //         "fileFormat",
    //         "Unsupported Format: only JPEG,JPG,PNG,GIF sre supported",
    //         ( value) =>{ return value && value[0].type =="image/jpg"
    //         // value => value &&  ["image/jpeg","image/jpg","image/gif","image/png"].includes(value.type)//OR
    //          }),
});

// ----------------handle submit ----------------------------------------------

const handleFormSubmit = (values, onSubmitProps) => {
    
    if(values.password !==values.password2){
        setAlert('password do no match','danger')
        onSubmitProps.setSubmitting(false);
        // onSubmitProps.resetForm();
    }
     else{
        // if(photo !== "" ){ 
            setphotoUploded(true)
            const formData = new FormData()
            formData.append("name",values.name);
            formData.append("email",values.email);
            formData.append("password",values.password);       
            formData.append("photo",photo);  

            register(formData)//calling register function
            onSubmitProps.setSubmitting(false);
                // onSubmitProps.resetForm();
            
        // }else{
        //     setphotoUploded(false)
        // }//end inner if
     }//end outer if
  }//end submit

     
     //redirect if authenticated
     if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

   return(
   <div className="row">
        <div className="col-md-4 offset-md-4 myform" >
            <div className="img">
            {photoPreview?<img src={photoPreview}    classNamw="img-fluid" alt=""/>:<img src="/assets/img/person1.png"    className="img-fluid" alt=""/>}
            </div>
            <p className="lead"><i className="fa fa-user"></i> Create Your Account</p>
            <Formik initialValues={myInitialValues} onSubmit={handleFormSubmit} validationSchema={handleValidationErrors} >
                     {formik=>{
                                 return(
                                     <Form>
                                          <div className="form-group" >
                                                 <label htmlFor="name"  className={(formik.errors.name && formik.touched.name ? ' text-danger' : '')}>Name</label>
                                                 <Field type="text" name="name" id="name" className={'form-control' + (formik.errors.name && formik.touched.name ? ' is-invalid' : '')} placeholder="Enter Names"  autoComplete="none"/>
                                                 <ErrorMessage name='name' component='div' className="invalid-feedback"/>
                                             </div>
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
                                                 <label htmlFor="password2"  className={(formik.errors.password2 && formik.touched.password2 ? ' text-danger' : '')}>Comfirm Password</label>
                                                 <Field type='password' name="password2" id="password2" className={'form-control' + (formik.errors.password2 && formik.touched.password2 ? ' is-invalid' : '')} placeholder="Enter Passwred"  autoComplete="none"/>
                                                 <ErrorMessage name='password2' component='div' className="invalid-feedback"/>
                                             </div>
                                            <div className="form-group">
                                                <label htmlFor="photo">Photo</label>
                                                <input type="file" name="photo"  className="form-control" accept=".png,.jpeg,.jpg"  onChange={e =>{
                                                    setImage(e.target.files[0])
                                                    setphotoUploded(true)}
                                                    }/>
                                           {photoUploded===false && <small  className="invalid-feedback">error</small>}
                                            </div>
                                             <div className="form-group" >
                                             <button type="submit" className="btn btn-primary btn-sm text-center mr-1"  disabled={formik.isSubmitting || !formik.isValid || photoUploded === false} >{formik.isSubmitting?'Submitting...':'Register'}</button>
                                             <button type="reset" className="btn btn-primary btn-sm text-center mr-1">Reset</button>
                                                 </div>
                                                 <p className="my-1">
                                                     Already have an account? <Link to="/login">Sign In</Link>
                                                 </p>
                                     </Form>
                                                 
                                 )
                             }
 
                     }
                    
                 </Formik>
   </div>
   </div>
  
);
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,//get isAuthenticated from auth
    users:state.auth.users
})
export default connect(mapStateToProps,{setAlert,register,loadAllUsers})(Register)


//==================================================================================

// ==================================================================================

// =================================================================================

// import React,{useState} from 'react'
// import {Link,Redirect} from 'react-router-dom'
// import {connect} from 'react-redux'
// import {setAlert} from '../../store/actions/alertAction';
// import {register} from '../../store/actions/authAction'

// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers';
// import * as yup from "yup";
// // import '../styles/filebutton.css'
// import '../styles/myform.css'

// // ===================================================


// //regex for validation
// // const mylowercaseRegex = /(?=.*[a-z])/;
// // const myuppercaseRegex = /(?=.*[A-Z])/;
// // const mynumericRegex = /(?=.*[0-9])/;
// const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/; //for only alphabets
// // const phonex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im //(123) 456-7890//(123)456-7890//123-456-7890//123.456.7890//1234567890//+31636363634//075-63546725
// // const phone2 = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g//(123) 456-7890//+(123) 456-7890//+(123)-456-7890//+(123) - 456-7890//+(123) - 456-78-90//123-456-7890//123.456.7890//1234567890//+31636363634//075-63546725
// // const mustStartwithCapital = /^[A-Z]/
// const FILE_SIZE = 160 * 1024;
// const SUPPORTED_FORMATS = ["image/jpg","image/jpeg","image/gif","image/png"];
// const existingEmail = ['popo@popo.com','popo@gmail.com','prince@gmail.com']


// const schema = yup.object().shape({
  
//     name: yup.string()
//         .required('Name is  required')
//         .matches(alpha, {message: "Enter Valid Name", excludeEmptyString: true })
//         // .matches(mustStartwithCapital, {message: "Name must start with a capital letter", excludeEmptyString: true })
//         // .trim('N')
//         .min(2,'Name must be a mininum of 2 characters'),
//     email: yup.string().
//         required('Email is required')
//         .email('Please enter a valid email')
//         .notOneOf(existingEmail,`Email already exist`)
//         .lowercase(),//CONVERT IT TO LOWER CASE
//     password: yup.string()
//         .required('Password is required')
//         // .matches(mylowercaseRegex,'At least a lowercase is required')
//         // .matches(myuppercaseRegex,'At least a uppercase is required')
//         // .matches(mynumericRegex,'At least a Number is required')
//         .min(6,'Password Length should be 6 or more characters'),
//     password2: yup.string()
//         .required('Password Comfirmation is required')
//         .oneOf([yup.ref('password'),''],'Cormfirm password must match password'),
//     // phone: yup.string()
//     //       .matches(phone2, {message: "Enter Valid Phone Number", excludeEmptyString: true })
//     //       .required(),
//     // photo:yup.mixed()
//     //       .required("A file is required")
//     //       .test(
//     //         "fileSize",
//     //         "File too large. maximum size accepted is 1MB",
//     //         value => value && value.size <= 200
//     //       )
//     //       .test(
//     //         "fileFormat",
//     //         "Unsupported Format",
//     //         // value => value && SUPPORTED_FORMATS.includes(value.type)
//     //         //  value => value &&  ["image/gif","image/png"].includes(value.type)//OR
//     //          value => value && value[0].type =="image/png"
//     //       ),
//     // address: yup.string().
//     //     required('Address is required'),
//     // description: yup.string().
//     // 
// });

// // // ================================================
// const Register = (props) => {

//     const { register, handleSubmit, errors, formState} = useForm({resolver: yupResolver(schema),validationSchema:schema});

//     // const { isDirty, isSubmitting, touched, submitCount } = formState;

//   const onSubmit = async data => {
//     //   if(data.password !== data.password2){
//     //     props.setAlert('passwords do no match','danger')
//     //     }
//     //   else{
//         const formData = new FormData()
//             formData.append("name",data.name);
//             formData.append("email",data.email);
//             formData.append("password",data.password);       
//             formData.append("photo",data['photo'][0]);  

//        props.register(formData)//calling register function
            
//     //     }//end else
//     console.log(data)
      
//   }//end submit

//      //redirect if authenticated
//      if(props.isAuthenticated){
//         return <Redirect to="/dashboard" />
//     }

//    return(
//    <div className="row">
//        <div className="col-md-3 offset-md-1">
//            <div className="card">
//                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
//                Maiores perferendis non, provident nam ipsum culpa aliquid tenetur 
//                fuga et adipisci ipsam eum eos! Sint aperiam, eaque assumenda quae deserunt magni?
//            </div>
//        </div>
//         <div className="col-md-5 offset-md-1 myform" >
//             {/* <h1 className="large text-primary">Sign Up</h1> */}
//             <p className="lead"><i className="fa fa-user"></i> Create Your Account</p>
//             <form className="form" onSubmit={handleSubmit(onSubmit)}>

//                 <div className="form-group">
//                      <label htmlFor="password"  className={(errors.name ? ' text-danger' : '')}>Name</label>
//                      <input type="text" placeholder="Name" name="name" className={'form-control' + (errors.name && formState.touched.name? ' is-invalid' : '')}   ref={register}/>
//                       <small className="invalid-feedback">{errors.name?.message}</small>
//                 </div>

//                 <div className="form-group">
//                      <label htmlFor="password"  className={(errors.email ? ' text-danger' : '')}>Email</label>
//                     <input type="email" placeholder="Email Address" name="email" className={'form-control' + (errors.email? ' is-invalid' : '')}  ref={register}/>
//                      <small className="invalid-feedback">{errors.email?.message}</small>
//                 </div>

//                 <div className="form-group">
//                      <label htmlFor="password"  className={(errors.password ? ' text-danger' : '')}>Password</label>
//                     <input type="password" placeholder="Password" name="password" className={'form-control' + (errors.password? ' is-invalid' : '')}  ref={register}/>
//                      <small className="invalid-feedback">{errors.password?.message}</small>
//                 </div>

//                 <div className="form-group">
//                      <label htmlFor="password"  className={(errors.password2 ? ' text-danger' : '')}>Confirm Password</label>
//                     <input type="password" placeholder="Confirm Password" name="password2" className={'form-control' + (errors.password2? ' is-invalid' : '')}  ref={register} />
//                      {errors.password2 && <small className="invalid-feedback">{errors.password2.message}</small>}
//                 </div>
              
//                     <div className="form-group mb-2">
//                         {/* <input type="file" className="custom-file-input" className={(errors.password2 ? ' text-danger' : '')} id="customFile" id="custom-file-label" name="photo"  ref={register} /> */}
                      
//                                 <input type="file" className="form-control-file border"  className={(errors.photo ? ' text-danger' : '')} name="photo"  ref={register} />
//                         <label className="custom-file-label" className={(errors.photo ? ' text-danger' : '')} htmlFor="customFile">Choose file</label>
//                         {/* <small className="invalid-feedback">{errors.photo?.message}</small> */}
//                         {errors.photo &&  <small className="invalid-feedback">{errors.photo.message}</small>}
//                     </div>
                                                    

                                                    
//                     <button type="submit" className="btn btn-primary btn-sm text-center mr-1"  disabled={formState.isValid} >{formState.isSubmitting?'Submitting...':'Register'}</button>
                                             
//                    {/* <input type="submit" className="btn btn-primary" value={isSubmitting?`Submitting ...`:`Register`}  /> */}
//             </form>
//             <p className="my-1">
//                 Already have an account? <Link to="/login">Sign In</Link>
//             </p>
//    </div>
//    </div>
  
// );
// }
// const mapStateToProps = (state) => ({
//     isAuthenticated: state.auth.isAuthenticated//get isAuthenticated from auth
// })
// export default connect(mapStateToProps,{setAlert,register})(Register)

// =================================================================================
//  working
// ===============================================================================

// import React,{useState,useEffect} from 'react'
// import {Link,Redirect} from 'react-router-dom'
// import {connect} from 'react-redux'
// import {setAlert} from '../../store/actions/alertAction';
// import {register} from '../../store/actions/authAction'
// import {Formik,Form,Field, ErrorMessage} from 'formik'
// import * as yup from "yup";
// // import '../styles/filebutton.css'
// import '../styles/myform.css'




// const Register = (props) => {

// //-------------initialization -------------------------------
// const myInitialValues = { name: '', email: '', password: '', password2: '',}
// const [photo,setImage] = useState('')//empty or undefind
// const [photoUploded,setphotoUploded] = useState()//empty or undefind
// const [photoPreview,setPhotoPreview] = useState()//empty or undefind
// //----------validation-----------------------------------------------------

// //FOR IMAGE PREVIEW
// useEffect(()=>{
//     if(!photo){return}//if there is no photo in the local state then return here by quitting the useEffect
// //logic to handle the imafe preview
//     const fileReader = new FileReader()
//     fileReader.onload = () => { setPhotoPreview(fileReader.result)}
//     fileReader.readAsDataURL(photo)

// },[photo])//depending on photo in state


// const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/; //for only alphabets
// const existingEmail = ['popo@popo.com','popo@gmail.com','prince@gmail.com']
// const FILE_SIZE = 160000000 * 1024;
// const SUPPORTED_FORMATS = [ "image/jpg", "image/jpeg", "image/gif", "image/png"];

// const handleValidationErrors = yup.object().shape({
  
//     name: yup.string()
//         .required('Name is  required')
//         .matches(alpha, {message: "Enter Valid Name", excludeEmptyString: true })
//         .min(2,'Name must be a mininum of 2 characters'),
//     email: yup.string().
//         required('Email is required')
//         .email('Please enter a valid email')
//         .notOneOf(existingEmail,`Email already exist`)
//         .lowercase(),//CONVERT IT TO LOWER CASE
//     password: yup.string()
//         .required('Password is required')
//         .min(6,'Password Length should be 6 or more characters'),
//     password2: yup.string()
//         .required('Password Comfirmation is required')
//         .oneOf([yup.ref('password'),''],'Cormfirm password must match password'),
//     // photo: yup.mixed()
//     //        .required("A file is required")
// });

// // ----------------handle submit ----------------------------------------------

// const handleFormSubmit = (values, onSubmitProps) => {
    
//     if(values.password !==values.password2){
//         props.setAlert('password do no match','danger')
//         onSubmitProps.setSubmitting(false);
//         onSubmitProps.resetForm();
//     }else{
//             const formData = new FormData()
//             formData.append("name",values.name);
//             formData.append("email",values.email);
//             formData.append("password",values.password);       
//             formData.append("photo",photo);  

//         props.register(formData)//calling register function
//         onSubmitProps.setSubmitting(false);
//             onSubmitProps.resetForm();
//     }
//   }//end submit

//      //redirect if authenticated
//      if(props.isAuthenticated){
//         return <Redirect to="/dashboard" />
//     }

//    return(
//    <div className="row">
//         <div className="col-md-4 offset-md-4 myform" >
//             <div className="img">
//             {photoPreview?<img src={photoPreview}    classNamw="img-fluid" alt=""/>:<img src="/assets/img/person1.png"    className="img-fluid" alt=""/>}
//             </div>
//             <p className="lead"><i className="fa fa-user"></i> Create Your Account</p>
//             <Formik initialValues={myInitialValues} onSubmit={handleFormSubmit} validationSchema={handleValidationErrors} >
//                      {formik=>{
//                                  return(
//                                      <Form>
//                                           <div className="form-group" >
//                                                  <label htmlFor="name"  className={(formik.errors.name && formik.touched.name ? ' text-danger' : '')}>Name</label>
//                                                  <Field type="text" name="name" id="name" className={'form-control' + (formik.errors.name && formik.touched.name ? ' is-invalid' : '')} placeholder="Enter Names"  autoComplete="none"/>
//                                                  <ErrorMessage name='name' component='div' className="invalid-feedback"/>
//                                              </div>
//                                              <div className="form-group" >
//                                                  <label htmlFor="email"  className={(formik.errors.email && formik.touched.email ? ' text-danger' : '')}>Email</label>
//                                                  <Field type="email" name="email" id="email" className={'form-control' + (formik.errors.email && formik.touched.email ? ' is-invalid' : '')} placeholder="Enter Email"  autoComplete="none"/>
//                                                  <ErrorMessage name='email' component='div' className="invalid-feedback"/>
//                                              </div>
//                                              <div className="form-group" >
//                                                  <label htmlFor="password"  className={(formik.errors.password && formik.touched.password ? ' text-danger' : '')}>Password</label>
//                                                  <Field type='password' name="password" id="password" className={'form-control' + (formik.errors.password && formik.touched.password ? ' is-invalid' : '')} placeholder="Enter Passwred"  autoComplete="none"/>
//                                                  <ErrorMessage name='password' component='div' className="invalid-feedback"/>
//                                              </div>
//                                              <div className="form-group" >
//                                                  <label htmlFor="password2"  className={(formik.errors.password2 && formik.touched.password2 ? ' text-danger' : '')}>Comfirm Password</label>
//                                                  <Field type='password' name="password2" id="password2" className={'form-control' + (formik.errors.password2 && formik.touched.password2 ? ' is-invalid' : '')} placeholder="Enter Passwred"  autoComplete="none"/>
//                                                  <ErrorMessage name='password2' component='div' className="invalid-feedback"/>
//                                              </div> 
//                                             <div className="form-group">
//                                                 <label htmlFor="photo">Photo</label>
//                                                 <input type="file" name="photo"  className="form-control" accept=".png,.jpeg,.jpg"  onChange={e =>setImage(e.target.files[0])}/>
//                                             </div>
//                                              <div className="form-group" >
//                                              <button type="submit" className="btn btn-primary btn-sm text-center mr-1" disabled={formik.isSubmitting || !formik.isValid } >{formik.isSubmitting?'Submitting...':'Register'}</button>
//                                              <button type="reset" className="btn btn-primary btn-sm text-center mr-1">Reset</button>
//                                                  </div>
//                                                  <p className="my-1">
//                                                      Already have an account? <Link to="/login">Sign In</Link>
//                                                  </p>
//                                      </Form>
                                                 
//                                  )
//                              }
 
//                      }
                    
//                  </Formik>
//    </div>
//    </div>
  
// );
// }
// const mapStateToProps = (state) => ({
//     isAuthenticated: state.auth.isAuthenticated//get isAuthenticated from auth
// })
// export default connect(mapStateToProps,{setAlert,register})(Register)
