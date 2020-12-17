import {GET_TECHS,ADD_TECH,DELETE_TECH,TECH_ERROR,SET_LOADING} from '../../types'

const initialState={
	 techs:null,
	 loading:false,
	 error:null
}

export default function(state=initialState,action){ //the action here is an object containing type and payload eg {type:"GET_CONTACT",payload:id}
	switch(action.type){
	  case SET_LOADING:
		return {...state,loading:true}
	  case GET_TECHS:
		return {...state,techs:action.payload,loading:false}//spread the state, replace the logs with what the payload has//set the loading to false
	  case ADD_TECH:
		return {...state,techs:[...state.techs,action.payload],loading:false}
	//   case SET_CURRENT://this is to prepopulate the update form
	// 	  return {...state,current:action.payload}
	//   case CLEAR_CURRENT: //clear the state value that prepopulated the update form
	// 		return {...state,current:null}
	//   case UPDATE_LOG:
	// 	  return {...state,logs:state.logs.map(log => log.id === action.payload.id?action.payload:log)}
	  case DELETE_TECH:
			return {...state,
				techs:state.techs.filter(tech => tech.id !== action.payload),//
				loading:false}
	//  case SEARCH_LOGS:
	// 	return {...state,logs:action.payload}//populate the logs with only those having the seach key
	  case TECH_ERROR:
		return {...state, error:action.payload}
      default:
        return state;
	}
}
