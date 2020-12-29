// export const roleBasedRedirect = (history,role) =>{
//     if(role === 'admin'){
//         history.push('/admin/dashboard')
//     }else{
//         history.push('/user/history')
//     }
// }

export const roleBasedRedirect = (history,role) =>{
    let intendedPage = history.location.state//checking if the router history has a state stored in it//and assign it to intendedPage//the state has a path from which the user was coming from and which to be redirected to after a successful login
    if(intendedPage){//if there is a state//if they we originally coming from another page, take them back
        history.push(intendedPage.from)
    }else{//if there is no state then redirect them to normal dashboard
        if(role === 'admin'){
            history.push('/admin/dashboard')
        }else{
            history.push('/user/history')
        }
    }
   
}