import React, { useEffect,Fragment } from 'react'
import {connect} from 'react-redux'
import {getCurrentUserProfile} from '../../store/actions/profileAction'
import Spinner from '../layouts/Spinner'
import {Link} from 'react-router-dom'

import DashboardActions from './DashboardActions'
import ExperienceComponent from './ExperienceComponent'
import EducationComponent from './EducationComponent'
import {deleteAccount} from '../../store/actions/profileAction'


// const Dashboard = ({loading,profile,getCurrentUserProfile,auth}) => {
   const Dashboard = ({profile:{profile,loading},getCurrentUserProfile,auth,deleteAccount}) => {
   useEffect(()=>{
      getCurrentUserProfile()
   },[getCurrentUserProfile]);
   // console.log("1: ",profile.experience)
  
   return(<>
   {loading && profile === null? <Spinner/> :
    <Fragment>
       <h4 className="large text-primary">Dashboard</h4>
       <div className="row">
          <div className="col-md-3">
             <img src={auth.user?`http://localhost:5000/${auth.user.photo}`:''} className="img-fluid" alt=""/>
          </div>
       </div>
       <p className="lead"><i className="fa fa-user"></i>Welcome {auth.user?auth.user.name:''}</p>
       {profile !== null? 
         <Fragment>
            <DashboardActions/>
            <EducationComponent education={profile.education}/>
            <ExperienceComponent experience={profile.experience}/>
            <div className="btn btn-primary btn-bg float-right" onClick={()=>deleteAccount()}>DELETE ACCOUNT</div>
           
         </Fragment> :
         <Fragment>
            <h4>You have not created a profile yet</h4>
         <Link to="/create-profile" className="btn btn-outline-primary">Create Profile</Link>

         </Fragment>
       }
    </Fragment> }



    </>
);
}
const mapStateToProps = (state) => ({
// loading: state.profile.loading,
// profile: state.profile.profile,
auth: state.auth,
profile: state.profile

})
export default connect(mapStateToProps,{getCurrentUserProfile,deleteAccount})(Dashboard)