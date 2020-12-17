import * as T from '../types'

const initialState = {
    profile:null,
    profiles:[],
    loading:true,
    error:{}
}

export default function(state = initialState,action){
    const {payload,type} = action;
    switch(type){
      case T.GET_PROFILE:
          return {...state, profile:payload,loading:false}//spread d state//update profile:res.data(in payload)//set loading to false
    case T.GET_PROFILES:
        return {...state, profiles:payload,loading:false}//spread d state//update profile:res.data(in payload)//set loading to false
     case T.PROFILE_ERROR:
         return{...state,loading:false,error:payload}
    case T.CLEAR_AUTH_PROFILE:
    case T.CLEAR_PROFILE:
        return{...state,loading:false,profile:null}
    case T.CREATE_PROFILE:
    case T.EDIT_PROFILE:
    case T.UPDATE_EDUEXP_PROFILE://THIS WILL HANDLE BOTH UPDATE EXDUCATION AND EXPERINCE
    case T.DELETE_EDUEXP_PROFILE: //delete and return the remaining according to the backend
        return {...state, profile:payload,loading:false}//CREATE PROFILE
      default:
          return state
    }
}