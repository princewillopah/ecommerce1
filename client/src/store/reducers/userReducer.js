export const userReducer = (state =null, action) => {

    switch(action.type){
        case "USER_REQUEST":
             return {loading: true}
        case "USER_REGISTER_SUCCESS":
             return {loading: false, userInfo: action.payload}
        case "USER_LOGIN_SUCCESS":
             return {loading: false, userInfo: action.payload}
        case "USER_FAIL":
             return {loading: false, error: action.payload}
        case "USER_LOGOUT":
            return {}
        default:
            return state
    }

}