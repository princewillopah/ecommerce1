import {combineReducers} from "redux"
import {userReducer} from './userReducer'
import {searchReducer} from './searchReducer'
import {cartReducer} from './cartReducer'
import {drawerReducer} from './drawerReducer'
import {couponAppliedReducer} from './couponAppliedReducer'
import { CODReducer } from "./CODReducer"

 const rootReducer = combineReducers({
    userState: userReducer,
    searchState:searchReducer,
    cartState: cartReducer,
    drawerState: drawerReducer,
    couponAppliedState: couponAppliedReducer,
    CODState: CODReducer
})

export default rootReducer