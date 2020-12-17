
import React from 'react'
import {connect} from 'react-redux'


const Alert = (props) => {
   return(
   <div className="d-flex justify-content-end" >
     <div className="col-md-4" style={{position:'fixed'}}>
      {
        props.alerts !== null && props.alerts.length > 0 && props.alerts.map(alert=>(
          <div className={`p-0 my-1 card alert alert-${alert.alertType}`} key={alert.id}>
            <div className="card-body">
            {alert.msg}
            </div>
          </div>
        ))
        }
     </div>
   </div>
);
}

const mapStateToProps = state => ({
alerts : state.alert
})
export default connect(mapStateToProps)(Alert)