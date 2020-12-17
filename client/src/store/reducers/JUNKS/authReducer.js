import * as TY from '../types'


const initialState = {
    token:localStorage.getItem('token'),//this will look for a localstorage variable called "token" and make it avallable to the state
    isAuthenticated:null,//null at first. when signed in, it will be set to true
    user:null,//get the authenticated user from backend
    loading:true,//to set loading true while fetching the resource from the backend. if resource becomes available to frontend, we set loading to false
    users:[]//this is just here to load email in register component for clientside validation

}
//once the regisger submit button is clicked, the server is gonna check that the user does not exist in d db: 
// if the user is a new user, then the server will register the user and send a response(the token) from that axios request in this form {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6"}
// atfer the successful request and respons, we dispatch the action: dispatch({type:REGISTER_SUCCESS,payload:res.data})//this action is an object with two properties type and payload
//so action.type =" REGISTER_SUCCESS" & action.payload.token = {token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6"}
//we need only the value "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6" to make request back to server for automatic login
// we put the token value in localstorage with a name called "token" by doing this:= localStorage.setItem('token',payload.token)
// we imediately update the token value in state by doing this:::  token:localStorage.getItem('token')
// we spread all the state values. at this point the state values will be:
//at this point in state, token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6",isAuthenticated:false,user:null,loading:true,users:[]
// we then update the properties of the state by setting isAuthenticated:true,loading:false
//at this point in state, token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6",isAuthenticated:true,user:null,loading:false,users:[]
export default function(state = initialState,action){
    const {type, payload} = action //use type and payload directly instead of action.type or action.payload
    switch (type) {
        case TY.LOGIN_SUCCESS:
        case TY.REGISTER_SUCCESS://put token in browser localstorage with a title 'token'//since payload is an object, action.payload.token will give u "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6"
            localStorage.setItem('token',payload.token)
            return {
                    ...state,//spread the values of the state//incase of any update
                    ...payload,//spead the token: waiting to be updated just in case//....payload is the token being put in d state as   token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6"
                    isAuthenticated:true,//set the isAuthenticated to true if success registration in backend
                    loading:false,//set loading to false since the response is back from backend
            }
        case TY.All_USERS_LOADED://load authenthicated user with token sent
             return {...state,users:payload,loading:false}//loading the user in sent by axios in action.payload in user
        case TY.USER_LOADED://load authenthicated user with token sent
             return {...state,isAuthenticated:true,user:payload,loading:false}//loading the user in sent by axios in action.payload in user

        case TY.REGISTER_FAIL://incase TY.REGISTER_SUCCESS fails
        case TY.LOGIN_FAIL://incase LOGIN_SUCCESS fail
        case TY.LOGOUT://handle logout
        case TY.ACCOUNT_DELETED://DELETE ACCOUUNT FROM AN ACTION IN PROFILE 
        case TY.CLEAR_AUTH_PROFILE://clear all user info in state and localstorage
        case TY.AUTH_ERROR://incase TY.LOADED_USER fails
              localStorage.removeItem('token')//remove token from browser localstorage
         return {
             ...state,//spread the state for updates
             token:null,
            isAuthenticated:false,//set isAuthenticated to false since there is a failure
            loading:false,//loading remains false since the 
            user:null,//set user to null if there was any// this is also important in the case of token expiry
        } 
    
    
        default:
           return  state;
    }

}

// export default (state,action) =>{
//     switch(action.type){
//       case USER_LOADED:
//          return {...state,isAuthenticated:true,user:action.payload,loading:false}//loading the user in sent by axios inaction.payload in user
     
//       case REGISTRATION_SUCCESS://put token in browser localstorage with a title 'token'//action.payload.token will give u "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6"
//          localStorage.setItem('token',action.payload.token)//note that 'action.payload' is an object that carries the token and present it as token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6"
//          return {...state,...action.payload,isAuthenticated:true,loading:false}//...action.payload is the token being put in d state as   token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6"
//       case REGISTRATION_FAILED:
//          localStorage.removeItem('token')//remove token from browser localstorage
//          return {...state,isAuthenticated:false,loading:false,user:null,error:action.payload}//error:err.response.data.message   
    
//       case LOGIN_SUCCESS://put token in browser localstorage with a title 'token'//action.payload.token will give u "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6"
//          localStorage.setItem('token',action.payload.token)//note that 'action.payload' is an object that carries the token and present it as token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6"
//             return {...state,...action.payload,isAuthenticated:true,loading:false}//...action.payload is the token being put in d state as   token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYxZTVmNmFhODBiMmI2MzcwZjU0Y2NiIn0sImlhdCI6"
//       case LOGIN_FAILED:
//             localStorage.removeItem('token')//remove token from browser localstorage
//             return {...state,isAuthenticated:false,loading:false,user:null,error:action.payload}//error:err.response.data.message   
        
//      case AUTH_ERROR:
//         localStorage.removeItem('token')//remove token from browser localstorage
//         return {...state,isAuthenticated:false,loading:false,user:null,error:action.payload}//error:err.response.data.message   
//      case CLEAR_ERRORS:
//          return {...state,error:null}//clear whatsoever is in the error   
//     case LOGOUT:
//          localStorage.removeItem('token')//remove token from browser localstorage
//          return {...state,isAuthenticated:false,loading:false,user:null,error:action.payload}//error:err.response.data.message  
//      default:
//          return state
//     }
// }