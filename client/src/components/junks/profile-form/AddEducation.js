import React,{useState} from 'react'
import { updateEducationProfile} from '../../store/actions/profileAction'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom';

    const AddEducation = ({updateEducationProfile,history}) => {//getting history from props.history provided by route
    const [formData, setFormdata] = useState({school:"",degree:"",fieldofstudy:"",from:"",to:"",current:false,description:""})
    const [disableToData, setdisableToData] = useState(false)
    const {school,degree,fieldofstudy,from,to,current,description} = formData

    const handleSubmit = e => {
        e.preventDefault();
        updateEducationProfile(formData,history)
    }

    const handleOnchange = e =>{
        setFormdata({...formData, [e.target.name]:e.target.value})
    }


   return(
   <div className="row">
       <div className="col-md-6 offset-md-3">
            <h1 className="large text-primary"> Add An Education</h1>
            <p className="lead">
                <i class="fa fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                <input type="text" placeholder="* School or Bootcamp" name="school" value={school} onChange={handleOnchange} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={handleOnchange}  />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={handleOnchange} />
                </div>
                <div className="form-group" >
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={handleOnchange} />
                </div> 
                <div className="form-group">
                <p><input type="checkbox" name="current" checked={current} value={current} onChange={() => {setFormdata({...formData,current:!current}); setdisableToData(!disableToData) } } />{" "} Current Job</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to} onChange={handleOnchange} disabled={disableToData ? 'disabled': ''} />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    value={description} onChange={handleOnchange} 
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
           </form>
       </div>
     
   </div>
);
}
export default connect(null,{updateEducationProfile})(withRouter(AddEducation))