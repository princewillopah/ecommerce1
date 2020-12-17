import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteAccount} from '../../store/actions/profileAction';

const DashboardActions = ({deleteAccount}) => {
   return(<>
      <div className="dash-buttons">

        <Link to="/edit-profile" className="btn btn-light">
            <i className="fa fa-user-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
            <i className="fa fa-black-tie text-primary"></i> Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
            <i className="fa fa-graduation-cap text-primary"></i> Add Education
        </Link>
        <div className="btn btn-primary btn-bg float-right" onClick={()=>deleteAccount()}>DELETE ACCOUNT</div>
      </div>
   </>
);
}
export default connect(null,{deleteAccount})(DashboardActions)