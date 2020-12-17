import * as TY from '../types'

const initialState = []

export default function(state = initialState,action){
    const {type, payload} = action //use type and payload directly instead of action.type or action.payload
    switch (type) {
        case TY.SET_ALERT:
            return [...state,payload]
        case TY.REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload )//remove the element of state that has id equal to alert.id leaving the rest that are not equal
    
        default:
           return  state;
    }

}