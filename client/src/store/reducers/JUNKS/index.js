import {combineReducers} from 'redux'
import AlertReducer from './alertReducer'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'

export default combineReducers({
	alert: AlertReducer,//alert is what we are gonna use in components
	auth:authReducer,
	profile:profileReducer,
	post:postReducer
})