import * as TY from '../types'
import uuid from 'uuid'

export const setAlert = (msg, alertType,timeout = 4000) => dispatch => {
  const id = uuid.v4()
  dispatch({
      type:TY.SET_ALERT,
      payload:{msg,alertType,id}
  })
  setTimeout(()=>dispatch({type:TY.REMOVE_ALERT,payload:id}),timeout)//send this action to remove the mesaage from alert state
};