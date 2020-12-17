import axios from 'axios'   
import {setAlert} from './alertAction'; 
import * as T from '../types'

  // ---------------------------------------------------------------------------------------------
    // GET USER PROFILE ///
// ---------------------------------------------------------------------------------------------
export const getCurrentUserProfile = () => async (dispatch) => {

  try{
      const res = await axios.get('http://localhost:5000/api/profile/me')
     dispatch({type: T.GET_PROFILE, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
   
    }catch(err){  
      // dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})
      dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusTexts}})

  }

}//getCurrentUserProfile

 // ---------------------------------------------------------------------------------------------
    // CREATE A PROFILE///
// ---------------------------------------------------------------------------------------------
export const createProfile = (formData,history) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component
  const config ={//as needed by header
    headers:{'Content-Type':'application/json'}
}
  try{
      const res = await axios.post('http://localhost:5000/api/profile',formData,config)
     dispatch({type: T.CREATE_PROFILE, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
    dispatch(setAlert('PROFILE CREATED','success'))
     history.push('/dashboard')//redirect to dashboard
    }catch(err){  
      //show alert for client side error
    if( err.response.data.errors){//the value of err.response.data.error is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
        err.response.data.errors.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
      }
      // server error
      dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error

  }

}//getCurrentUserProfile
 // ---------------------------------------------------------------------------------------------
    // EDIT A PROFILE///
// ---------------------------------------------------------------------------------------------
export const editProfile = (formData,history) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component
  const config ={//as needed by header
    headers:{'Content-Type':'application/json'}
}
  try{
      const res = await axios.post('http://localhost:5000/api/profile',formData,config)
     dispatch({type: T.EDIT_PROFILE, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
    dispatch(setAlert('PROFILE EDITED','success'))
     history.push('/dashboard')//redirect to dashboard
    }catch(err){  
      //show alert for client side error
    if( err.response.data.errors){//the value of err.response.data.error is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
        err.response.data.errors.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
      }
      // server error
      dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error

  }

}//getCurrentUserProfile
 // ---------------------------------------------------------------------------------------------
    // update expernce PROFILE///
// ---------------------------------------------------------------------------------------------
export const updateExperinceProfile = (formData,history) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component
  const config ={//as needed by header
    headers:{'Content-Type':'application/json'}
}
  try{
      const res = await axios.put('http://localhost:5000/api/profile/experience',formData,config)
     dispatch({type: T.UPDATE_EDUEXP_PROFILE, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
    dispatch(setAlert('EXPERIENCE UPDATED ','success'))
     history.push('/dashboard')//redirect to dashboard
    }catch(err){  
      //show alert for client side error
    if( err.response.data.errors){//the value of err.response.data.error is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
        err.response.data.errors.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
      }
      // server error
      dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error

  }

}//getCurrentUserProfile
 // ---------------------------------------------------------------------------------------------
    // update EDUCATION PROFILE///
// ---------------------------------------------------------------------------------------------
export const updateEducationProfile = (formData,history) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component
  const config ={//as needed by header
    headers:{'Content-Type':'application/json'}
}
  try{
      const res = await axios.put('http://localhost:5000/api/profile/education',formData,config)
     dispatch({type: T.UPDATE_EDUEXP_PROFILE, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
    dispatch(setAlert('EDUCATION UPDATED ','success'))
     history.push('/dashboard')//redirect to dashboard
    }catch(err){  
      //show alert for client side error
    if( err.response.data.errors){//the value of err.response.data.error is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
        err.response.data.errors.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
      }
      // server error
      dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error

  }

}//getCurrentUserProfile

 // ---------------------------------------------------------------------------------------------
    //delete an Experience PROFILE///
// ---------------------------------------------------------------------------------------------
export const deleteExperienceProfile = (id) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component

  try{
      const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`)
     dispatch({type: T.DELETE_EDUEXP_PROFILE, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
    dispatch(setAlert('EXPERIENCE REMOVED ','success'))
    //  history.push('/dashboard')//redirect to dashboard
    }catch(err){  
      // server error
      dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error

  }

}//getCurrentUserProfile

 // ---------------------------------------------------------------------------------------------
    //delete an EDUCATION PROFILE///
// ---------------------------------------------------------------------------------------------
export const deleteEducationProfile = (id) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component

  try{
      const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`)
     dispatch({type: T.DELETE_EDUEXP_PROFILE, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
    dispatch(setAlert('EDUCATION REMOVED ','success'))
    //  history.push('/dashboard')//redirect to dashboard
    }catch(err){  
      // server error
      dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error

  }

}//getCurrentUserProfile

 // ---------------------------------------------------------------------------------------------
    //delete an ACCOUNT/PROFILE/POSTS///
// ---------------------------------------------------------------------------------------------
export const deleteAccount = () => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component
 
  if(window.confirm('Are you sure? This action is irrevokable')){
      try{
        await axios.delete("http://localhost:5000/api/profile")
        dispatch({typr:T.CLEAR_AUTH_PROFILE})//clear his profile out of the state
        dispatch({type: T.ACCOUNT_DELETED})//res.data from requeted data from axios which is d token from node//this line will register the user
      dispatch(setAlert('Your account has been deleted ','success'))
      //  history.push('/register')//redirect to dashboard
      }catch(err){  
        // server errorhhj
        console.log(err.response)
        // dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error
        // if( err.response.data.errors){//the value of err.response.data.error is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
        // err.response.data.errors.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
      // }
    }
  }
 

}//getCurrentUserProfile

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  for public routes
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

 // ---------------------------------------------------------------------------------------------
    // GET USER PROFILE ///
// ---------------------------------------------------------------------------------------------
export const getProfiles = () => async (dispatch) => {
   dispatch({type:T.CLEAR_PROFILE})
  try{
      const res = await axios.get('http://localhost:5000/api/profile')
     dispatch({type: T.GET_PROFILES, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
   
    }catch(err){  
      // dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})
      dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusTexts}})

  }

}//getCurrentUserProfile
 // ---------------------------------------------------------------------------------------------
    // GET USER PROFILEs by id //////
// ---------------------------------------------------------------------------------------------
export const getProfileById = (userId) => async (dispatch) => {

 try{
     const res = await axios.get(`http://localhost:5000/api/profile/${userId}`)
    dispatch({type: T.GET_PROFILE_BY_ID, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
  
   }catch(err){  
     // dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})
     dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusTexts}})

 }

}//getCurrentUserProfile
