import {GET_LOGS,ADD_LOG,DELETE_LOG,SET_CURRENT,CLEAR_CURRENT,UPDATE_LOG,CLEAR_LOGS,SEARCH_LOGS,LOGS_ERROR,SET_LOADING } from '../../types'

const initialState={
	 logs:null,
	 current:null,
	 loading:false,
	 error:null
}

export default function(state=initialState,action){ //the action here is an object containing type and payload eg {type:"GET_CONTACT",payload:id}
	switch(action.type){
	  case SET_LOADING:
		return {...state,loading:true}
	  case GET_LOGS:
		return {...state,logs:action.payload,loading:false}//spread the state, replace the logs with what the payload has//set the loading to false
	  case ADD_LOG:
		return {...state,logs:[...state.logs,action.payload],loading:false}
	  case SET_CURRENT://this is to prepopulate the update form
		  return {...state,current:action.payload}
	  case CLEAR_CURRENT: //clear the state value that prepopulated the update form
			return {...state,current:null}
	  case UPDATE_LOG:
		  return {...state,logs:state.logs.map(log => log.id === action.payload.id?action.payload:log)}
	  case DELETE_LOG:
			return {...state,
				logs:state.logs.filter(log => log.id !== action.payload),//
				loading:false}
	 case SEARCH_LOGS:
		return {...state,logs:action.payload}//populate the logs with only those having the seach key
	  case LOGS_ERROR:
		return {...state, error:action.payload}
      default:
        return state;
	}
}

//from line 21 to 24: it returns a new object taking the initial state(...state), and filter only those objects in contact array whose id is not equal the id sent by action object

//line 23:this contact array now has fresh objects in it.
// line 21-24 will now be a new object state of {...state,new-contact-array}


// line 18 will create a new array containg newly added payload object and initial objects as property of contacts