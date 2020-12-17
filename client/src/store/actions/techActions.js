import {GET_TECHS,ADD_TECH,DELETE_TECH,TECH_ERROR,SET_LOADING} from '../types'
import axios from 'axios'


//-----------------------------------------------------------------------------------
// SET LOADING TO TRUE
//-----------------------------------------------------------------------------------
export const setLoading = () => {
    return {type:SET_LOADING}//CALLING THIS FOUNCTION TO ORDER THE REDUCER TO SET LOADING IN STATE TO TRUE
}
//-----------------------------------------------------------------------------------
//GET ALL TECH
//-----------------------------------------------------------------------------------


export const getTechs = () => async (dispatch) => {
        try {
            setLoading()// caling the function above to set loading to true
            const res = await axios.get('http://localhost:3001/techs')
            // const data = await res.json()//it has to 
            dispatch({type:GET_TECHS,payload:res.data})//send action to reducer
        } catch (err) {
            dispatch({type:TECH_ERROR,payload:err.response.data})//send action to reducer
        }
         
    }

//-----------------------------------------------------------------------------------
// ADD TECH
//-----------------------------------------------------------------------------------

export const addTech = (techData) => async (dispatch) => {
    try {
        setLoading()// caling the function above to set loading to true
        const res = await axios.post('http://localhost:3001/techs',techData)
        dispatch({type:ADD_TECH,payload:res.data})//send action to reducer
    } catch (err) {
        dispatch({type:TECH_ERROR,payload:err.response.data})//send action to reducer
    }
     
}
//-----------------------------------------------------------------------------------
// DELETE TECH
//-----------------------------------------------------------------------------------
export const deleteTech = (id) => async (dispatch) => {
    try {
        setLoading()// caling the function above to set loading to true
        await axios.delete(`http://localhost:3001/techs/${id}`)
        dispatch({type:DELETE_TECH,payload:id})//send action cointaining id sent to reducer
    } catch (err) {
        dispatch({type:TECH_ERROR,payload:err.response.data})//send action to reducer
    }
     
}

// //-----------------------------------------------------------------------------------
// // TECH ERRORS
// //-----------------------------------------------------------------------------------
// export const deleteLog = (id) => async (dispatch) => {
//     try {
//         setLoading()// caling the function above to set loading to true
//         await axios.delete(`http://localhost:3001/logs/${id}`)
//         dispatch({type:DELETE_LOG,payload:id})//send action cointaining id sent to reducer
//     } catch (err) {
//         dispatch({type:LOGS_ERROR,payload:err.response.data})//send action to reducer
//     }
     
// }