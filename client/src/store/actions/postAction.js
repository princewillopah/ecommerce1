import axios from 'axios'   
import * as T from '../types'
import {  toast } from 'react-toastify';

  // ---------------------------------------------------------------------------------------------
    // GET ALL POSTS ///
// ---------------------------------------------------------------------------------------------
export const getPosts = () => async (dispatch) => {

  try{
      const res = await axios.get('http://localhost:5000/api/posts')
     dispatch({type: T.GET_POSTS, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
   
    }catch(err){  
      // dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})
      dispatch({type:T.POST_ERROR,payload:{message: err.response.data.message}})

  }

}//getCurrentUserProfile
  // ---------------------------------------------------------------------------------------------
    // GET A POST ///
// ---------------------------------------------------------------------------------------------
export const getPost = (postId) => async (dispatch) => {

  try{
      const res = await axios.get(`http://localhost:5000/api/posts/${postId}`)
     dispatch({type: T.GET_POST, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
   
    }catch(err){  
      dispatch({
        type:T.PROFILE_ERROR,
        payload:{msg: err.statusText}
      })
      // dispatch({type:T.POST_ERROR,payload:{message: err.response.data.message}})

  }

}//getCurrentUserProfile
  // ---------------------------------------------------------------------------------------------
    // like post ///
// ---------------------------------------------------------------------------------------------
export const likePost = (postid) => async (dispatch) => {

  try{
      const res = await axios.put(`http://localhost:5000/api/posts/like/${postid}`)
     dispatch({type: T.LIKE_UNLIKE, payload:  {postid,likes:res.data}})//res.data from requeted data from axios which is d token from node//this line will register the user
   
    }catch(err){  
      // dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})
      // dispatch({type:T.POST_ERROR,payload:{message: err.response.data.message}})
      console.log(err.response)

  }

}//getCurrentUserProfile

  // ---------------------------------------------------------------------------------------------
    // like post ///
// ---------------------------------------------------------------------------------------------
export const unlikePost = (postid) => async (dispatch) => {

  try{
      const res = await axios.put(`http://localhost:5000/api/posts/unlike/${postid}`)
     dispatch({type: T.UNLIKE, payload:  {postid,unlikes:res.data}})//res.data from requeted data from axios which is d token from node//this line will register the user
   
    }catch(err){  
      // dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})
      // dispatch({type:T.POST_ERROR,payload:{message: err.response.data.message}})
      console.log(err.response)

  }

}//getCurrentUserProfile

  // ---------------------------------------------------------------------------------------------
    // delete post ///
// ---------------------------------------------------------------------------------------------
export const deletePost = (postid) => async (dispatch) => {

  try{
      await axios.delete(`http://localhost:5000/api/postS/${postid}`)
     dispatch({type: T.DELETE_POST, payload: postid})//res.data from requeted data from axios which is d token from node//this line will register the user
    //  dispatch(setAlert('Post deleted','success'))
    toast.success("Post Deleted",{ position: "top-right",autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,})
     
   
    }catch(err){  
      dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})
      // dispatch({type:T.POST_ERROR,payload:{message: err.response.data.message}})
      console.log(err.response)

  }

}//getCurrentUserProfile
 // ---------------------------------------------------------------------------------------------
    // CREATE A POST///
// ---------------------------------------------------------------------------------------------
export const createPost = (formData) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component
  const config ={//as needed by header
    headers:{'Content-Type':'application/json'}
}
  try{
      const res = await axios.post('http://localhost:5000/api/posts',formData,config)
     dispatch({type: T.CREATE_POST, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
    // dispatch(setAlert('POST CREATED','success'))
    toast.success("Post Created",{ position: "top-right",autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,})
     
    //  history.push('/dashboard')//redirect to dashboard
    }catch(err){  
      //show alert for client side error
    // if( err.response.data.errors){//the value of err.response.data.error is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
    //     err.response.data.errors.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
    //   }
      // server error
      // dispatch({type:T.PROFILE_ERROR,payload:{message: err.statusText, status: err.response}})//server error
      console.log(err.response)
  }

}//getCurrentUserProfile
 // ---------------------------------------------------------------------------------------------
    // make comment on A POST///
// ---------------------------------------------------------------------------------------------
export const addComment = (postid,formData) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component
  const config ={//as needed by header
    headers:{'Content-Type':'application/json'}
}
  try{
      const res = await axios.post(`http://localhost:5000/api/posts/comment/${postid}`,formData,config)
     dispatch({type: T.ADD_COMMENT, payload:  res.data})//res.data return all array comment in that post
    // dispatch(setAlert('Comment added','success'))
    toast.success("Comment Added",{ position: "top-right",autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,})
       
    //  history.push('/dashboard')//redirect to dashboard
    }catch(err){  
      //show alert for client side error
    // if( err.response.data.errors){//the value of err.response.data.error is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
    //     err.response.data.errors.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
    //   }
      // server error
      // dispatch({type:T.PROFILE_ERROR,payload:{message: err.statusText, status: err.response}})//server error
      console.log(err.response)
  }

}//getCurrentUserProfile
 // ---------------------------------------------------------------------------------------------
    //delete comment///
// ---------------------------------------------------------------------------------------------
export const deleteComment = (postId,commentId) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component

  try{
      await axios.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`)
     dispatch({type: T.REMOVE_COMMENT, payload:  commentId})//res.data IS THE REMAINING OF COMMENT RETURNED AFTER DELETION OF THIS COMMENT WHOSE ID WAS PASSED
     toast.success("Comment Deleted",{ position: "top-right",autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,})
     
     //  dispatch(setAlert('Comment removed','success'))
    //  history.push('/dashboard')//redirect to dashboard
    }catch(err){  
      // server error
      // dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error
      console.log(err.response)

  }

}//getCurrentUserProfile
 // ---------------------------------------------------------------------------------------------
    // EDIT A PROFILE///
// ---------------------------------------------------------------------------------------------
// export const editProfile = (formData,history) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component
//   const config ={//as needed by header
//     headers:{'Content-Type':'application/json'}
// }
//   try{
//       const res = await axios.post('http://localhost:5000/api/profile',formData,config)
//      dispatch({type: T.EDIT_PROFILE, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
//     dispatch(setAlert('PROFILE EDITED','success'))
//      history.push('/dashboard')//redirect to dashboard
//     }catch(err){  
//       //show alert for client side error
//     if( err.response.data.errors){//the value of err.response.data.error is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
//         err.response.data.errors.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
//       }
//       // server error
//       dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error

//   }

// }//getCurrentUserProfile
 // ---------------------------------------------------------------------------------------------
    // update expernce PROFILE///
// ---------------------------------------------------------------------------------------------
// export const updateExperinceProfile = (formData,history) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component
//   const config ={//as needed by header
//     headers:{'Content-Type':'application/json'}
// }
//   try{
//       const res = await axios.put('http://localhost:5000/api/profile/experience',formData,config)
//      dispatch({type: T.UPDATE_EDUEXP_PROFILE, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
//     dispatch(setAlert('EXPERIENCE UPDATED ','success'))
//      history.push('/dashboard')//redirect to dashboard
//     }catch(err){  
//       //show alert for client side error
//     if( err.response.data.errors){//the value of err.response.data.error is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
//         err.response.data.errors.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
//       }
//       // server error
//       dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error

//   }

// }//getCurrentUserProfile
 // ---------------------------------------------------------------------------------------------
    // update EDUCATION PROFILE///
// ---------------------------------------------------------------------------------------------
// export const updateEducationProfile = (formData,history) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component
//   const config ={//as needed by header
//     headers:{'Content-Type':'application/json'}
// }
//   try{
//       const res = await axios.put('http://localhost:5000/api/profile/education',formData,config)
//      dispatch({type: T.UPDATE_EDUEXP_PROFILE, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
//     dispatch(setAlert('EDUCATION UPDATED ','success'))
//      history.push('/dashboard')//redirect to dashboard
//     }catch(err){  
//       //show alert for client side error
//     if( err.response.data.errors){//the value of err.response.data.error is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
//         err.response.data.errors.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
//       }
//       // server error
//       dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error

//   }

// }//getCurrentUserProfile

 // ---------------------------------------------------------------------------------------------
    //delete an Experience PROFILE///
// ---------------------------------------------------------------------------------------------
// export const deleteExperienceProfile = (id) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component

//   try{
//       const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`)
//      dispatch({type: T.DELETE_EDUEXP_PROFILE, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
//     dispatch(setAlert('EXPERIENCE REMOVED ','success'))
//     //  history.push('/dashboard')//redirect to dashboard
//     }catch(err){  
//       // server error
//       dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error

//   }

// }//getCurrentUserProfile

 // ---------------------------------------------------------------------------------------------
    //delete an EDUCATION PROFILE///
// ---------------------------------------------------------------------------------------------
// export const deleteEducationProfile = (id) => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component

//   try{
//       const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`)
//      dispatch({type: T.DELETE_EDUEXP_PROFILE, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
//     dispatch(setAlert('EDUCATION REMOVED ','success'))
//     //  history.push('/dashboard')//redirect to dashboard
//     }catch(err){  
//       // server error
//       dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error

//   }

// }//getCurrentUserProfile

 // ---------------------------------------------------------------------------------------------
    //delete an ACCOUNT/PROFILE/POSTS///
// ---------------------------------------------------------------------------------------------
// export const deleteAccount = () => async (dispatch) => {//history is there to redirect after success//u do d redirect on action not component
 
//   if(window.confirm('Are you sure? This action is irrevokable')){
//       try{
//         await axios.delete("http://localhost:5000/api/profile")
//         dispatch({typr:T.CLEAR_AUTH_PROFILE})//clear his profile out of the state
//         dispatch({type: T.ACCOUNT_DELETED})//res.data from requeted data from axios which is d token from node//this line will register the user
//       dispatch(setAlert('Your account has been deleted ','success'))
//       //  history.push('/register')//redirect to dashboard
//       }catch(err){  
//         // server errorhhj
//         console.log(err.response)
//         // dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})//server error
//         // if( err.response.data.errors){//the value of err.response.data.error is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
//         // err.response.data.errors.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
//       // }
//     }
//   }
 

// }//getCurrentUserProfile

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  for public routes
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

 // ---------------------------------------------------------------------------------------------
    // GET USER PROFILE ///
// ---------------------------------------------------------------------------------------------
// export const getProfiles = () => async (dispatch) => {
//    dispatch({type:T.CLEAR_PROFILE})
//   try{
//       const res = await axios.get('http://localhost:5000/api/profile')
//      dispatch({type: T.GET_PROFILES, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
   
//     }catch(err){  
//       // dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})
//       dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusTexts}})

//   }

// }//getCurrentUserProfile
 // ---------------------------------------------------------------------------------------------
    // GET USER PROFILEs by id //////
// ---------------------------------------------------------------------------------------------
// export const getProfileById = (userId) => async (dispatch) => {

//  try{
//      const res = await axios.get(`http://localhost:5000/api/profile/${userId}`)
//     dispatch({type: T.GET_PROFILE_BY_ID, payload:  res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
  
//    }catch(err){  
//      // dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusText, status: err.response.status}})
//      dispatch({type:T.PROFILE_ERROR,payload:{msg: err.statusTexts}})

//  }

// }//getCurrentUserProfile
