export const roleBasedRedirect = (history,role) =>{
    if(role === 'admin'){
        history.push('/admin/dashboard')
    }else{
        history.push('/user/history')
    }
}