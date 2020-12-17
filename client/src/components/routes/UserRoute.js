import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

const UserRoute = ({ children, ...rest }) => {
    const {userInfo} = useSelector(state=>state.userState)//get the logged in user
   return userInfo && userInfo.token ? (<Route {...rest} render={() => children }/> ) : (<Redirect to="/login" />)
}
export default UserRoute