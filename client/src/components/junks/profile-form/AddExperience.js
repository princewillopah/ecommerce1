import React,{useState} from 'react'
import { updateExperinceProfile} from '../../store/actions/profileAction'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom';

    const AddExperience = ({updateExperinceProfile,history}) => {//getting history from props.history provided by route
    const [formData, setFormdata] = useState({company:"",title:"",location:"",from:"",to:"",current:false,description:""})
    const [disableToData, setdisableToData] = useState(false)
    const {company,title,location,from,to,current,description} = formData

    const handleSubmit = e => {
        e.preventDefault();
        updateExperinceProfile(formData,history)
    }

    const handleOnchange = e =>{
        setFormdata({...formData, [e.target.name]:e.target.value})
    }


   return(
   <div className="row">
       <div className="col-md-6 offset-md-3">
            <h1 className="large text-primary"> Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i>
                Add any developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                <input type="text" placeholder="* Job Title" name="title" value={title} onChange={handleOnchange} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Company" name="company" value={company} onChange={handleOnchange}  />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={location} onChange={handleOnchange} />
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
export default connect(null,{ updateExperinceProfile})(withRouter(AddExperience))