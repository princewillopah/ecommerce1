import axios from 'axios'
import * as TY from '../types'
import { setAlert } from './alertAction'
import setAuthToken from '../../utils/setAuthToken'


// ---------------------------------------------------------------------------------------------
    // LOAD USER ///
// ---------------------------------------------------------------------------------------------
export const loadUser = () => async (dispatch) => {//regFormData is equivalent to {name,email,password}
    //check and set global header
    if(localStorage.token){//check the localstorage  for "token"
       setAuthToken(localStorage.token)//set the header with the token if there is one
    }

      try{
          const res = await axios.get('http://localhost:5000/api/auth')
         dispatch({type:TY.USER_LOADED,payload:res.data})//res.data from requeted data from axios which is d token from node//
     
        }catch(err){
          dispatch({type:TY.AUTH_ERROR})// 
      }
  
  }//registerFunc 
// ---------------------------------------------------------------------------------------------
    // REGISTER USER ///
// ---------------------------------------------------------------------------------------------
export const register = (FormData) => async (dispatch) => {//regFormData is equivalent to {name,email,password}
    const config ={//as needed by axios
        headers:{'Content-Type':'application/json'}
    }
      try{
          const res = await axios.post('http://localhost:5000/api/users',FormData,config)
        // const res = await axios.post('https://httpbin.org/anything',FormData)
         dispatch({type:TY.REGISTER_SUCCESS,payload:res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
         dispatch(loadUser())// to load user whose info is in the token gotten from localstorage because thats the person that is currently authenticated
      console.log(res)
    }catch(err){
        console.log(err)
        //     const errors_response = err.response.data.errors;//.response.data from axios//errors is an array of errors from backend(nodejs express-validator)
        //     if(errors_response){//the value of errors_response is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
        //         errors_response.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
        //     }
          dispatch({type:TY.REGISTER_FAIL})// send action to update the state based on this
      }
  
  }//registerFunc 

  // ---------------------------------------------------------------------------------------------
    // login USER ///
// ---------------------------------------------------------------------------------------------
export const login = (loginFormData) => async (dispatch) => {//regFormData is equivalent to {name,email,password}
const config ={//as needed by axios
    headers:{'Content-Type':'application/json'}
}
  try{
      const res = await axios.post('http://localhost:5000/api/auth',loginFormData,config)
     dispatch({type:TY.LOGIN_SUCCESS,payload:res.data})//res.data from requeted data from axios which is d token from node//this line will register the user
     dispatch(loadUser())// to load user whose info is in the token gotten from localstorage because thats the person that is currently authenticated
    }catch(err){
        const errors_response = err.response.data.errors;//.response.data from axios//errors is an array of errors from backend(nodejs express-validator)
        if(errors_response){//the value of errors_response is msg//that is, errors_response is an array with objects like {msg:"name is required"}// so we access errors_response with msg
            errors_response.forEach(errrr=> dispatch(setAlert(errrr.msg,'danger')))//u can access these actions from anywhere//dispatch setAlert() to triger the setAlert on components register() is called
        }
      
      dispatch({type:TY.LOGIN_FAIL})// send action to update the state based on this
  }

}//registerFunc 


  // ---------------------------------------------------------------------------------------------
    // LOG USER OUT ///
// ---------------------------------------------------------------------------------------------
export const logout = () => async (dispatch) => {//regFormData is equivalent to {name,email,password
      dispatch({type:TY.CLEAR_AUTH_PROFILE})//this will order the reducer to clear the users profile from the state
     dispatch({type:TY.LOGOUT})//res.data from requeted data from axios which is d token from node//this line will register the user
}//registerFunc 

// ---------------------------------------------------------------------------------------------
    // LOAD USER ///
// ---------------------------------------------------------------------------------------------
export const loadAllUsers = () => async (dispatch) => {//regFormData is equivalent to {name,email,password}
    // //check and set global header
    // if(localStorage.token){//check the localstorage  for "token"
    //    setAuthToken(localStorage.token)//set the header with the token if there is one
    // }

      try{
          const res = await axios.get('http://localhost:5000/api/users/all-users')
         dispatch({type:TY.All_USERS_LOADED,payload:res.data})//res.data from requeted data from axios which is d token from node//
        }catch(err){
          dispatch({type:TY.AUTH_ERROR})// 
      }
  
  }//registerFunc 