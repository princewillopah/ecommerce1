import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

// const AdminRoute = ({ children, ...rest }) => {
//     const {userInfo} = useSelector(state=>state.userState)//get the logged in user


//    return userInfo && userInfo.token && userInfo.role === 'admin' ? (<Route {...rest} render={() => children }/> ) : (<Redirect to="/login" />)
// }
// export default AdminRoute


const AdminRoute = ({ component: Component, ...rest }) => {
    const {userInfo} = useSelector(state=>state.userState)//get the logged in user

    return userInfo && userInfo.token ? (
        <Route {...rest} render={props => {
    
            // check if route is restricted by role
            if ( userInfo.role === 'subscriber') {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/user/history'}} />
            }
    
            // authorised so return component
            return <Component {...props} />
        }} />) : (<Redirect to="/login" />)

}

export default AdminRoute
