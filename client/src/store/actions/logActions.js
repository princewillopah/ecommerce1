import {GET_LOGS,ADD_LOG,DELETE_LOG,SET_CURRENT,CLEAR_CURRENT,UPDATE_LOG,CLEAR_LOGS,SEARCH_LOGS,LOGS_ERROR,SET_LOADING } from '../types'
import axios from 'axios'
//-----------------------------------------------------------------------------------
// SET LOADING TO TRUE
//-----------------------------------------------------------------------------------
export const setLoading = () => {
    return {type:SET_LOADING}//CALLING THIS FOUNCTION TO ORDER THE REDUCER TO SET LOADING IN STATE TO TRUE
}
//-----------------------------------------------------------------------------------
//GET ALL LOGS
//-----------------------------------------------------------------------------------
// export const getLogs = () => {
//      return async (dispatch) => {
//          setLoading()// caling the function above to set loading to true
//          const res = await fetch('http://localhost:3001/logs')
//          const data = await res.json()//it has to 
//          dispatch({type:GET_LOGS,payload:data})//send action to reducer

//      }
// }

export const getLogs = () => async (dispatch) => {
        try {
            setLoading()// caling the function above to set loading to true
            const res = await axios.get('http://localhost:3001/logs')
            // const data = await res.json()//it has to 
            dispatch({type:GET_LOGS,payload:res.data})//send action to reducer
        } catch (err) {
            dispatch({type:LOGS_ERROR,payload:err.response.data})//send action to reducer
        }
         
    }

//-----------------------------------------------------------------------------------
// ADD LOG
//-----------------------------------------------------------------------------------

export const addLog = (logData) => async (dispatch) => {
    try {
        setLoading()// caling the function above to set loading to true
        const res = await axios.post('http://localhost:3001/logs',logData)
        dispatch({type:ADD_LOG,payload:res.data})//send action to reducer
    } catch (err) {
        dispatch({type:LOGS_ERROR,payload:err.response.data})//send action to reducer
    }
     
}
//-----------------------------------------------------------------------------------
// DELETE LOG
//-----------------------------------------------------------------------------------
export const deleteLog = (id) => async (dispatch) => {
    try {
        setLoading()// caling the function above to set loading to true
        await axios.delete(`http://localhost:3001/logs/${id}`)
        dispatch({type:DELETE_LOG,payload:id})//send action cointaining id sent to reducer
    } catch (err) {
        dispatch({type:LOGS_ERROR,payload:err.response.data})//send action to reducer
    }
     
}
//-----------------------------------------------------------------------------------
// UPDATE - SET CURRENT
//-----------------------------------------------------------------------------------
export const setCurrent = (log) => {

    return {type:SET_CURRENT,payload:log} 
}
//-----------------------------------------------------------------------------------
//  UPDATE - CLEAR CURRENT
//-----------------------------------------------------------------------------------
export const clearCurrent = () => {

    return {type:CLEAR_CURRENT} 
}
//-----------------------------------------------------------------------------------
//  UPDATE - UPDATE
//-----------------------------------------------------------------------------------
export const updateLog = (updateData) => async (dispatch) => {
    try {
        setLoading()// caling the function above to set loading to true
        const res = await axios.put(`http://localhost:3001/logs/${updateData.id}`,updateData)
        dispatch({type:UPDATE_LOG,payload:res.data})//send action cointaining id sent to reducer
    } catch (err) {
        dispatch({type:LOGS_ERROR,payload:err.response.data})//send action to reducer
    }
     
}
//-----------------------------------------------------------------------------------
//  SEARCH LOGS
//-----------------------------------------------------------------------------------
export const searchLogs = (searchtext) => async (dispatch) => {
    try {
        setLoading()// caling the function above to set loading to true
        const res = await axios.get(`http://localhost:3001/logs?q=${searchtext}`)
        // const data = await res.json()//it has to 
        dispatch({type:SEARCH_LOGS,payload:res.data})//send action to reducer
    } catch (err) {
        dispatch({type:LOGS_ERROR,payload:err.response.data})//send action to reducer
    }
     
}
//-----------------------------------------------------------------------------------
//
//-----------------------------------------------------------------------------------