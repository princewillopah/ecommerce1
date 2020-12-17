import React,{useState, Fragment,useEffect} from 'react'
import {connect} from 'react-redux'
import {editProfile,getCurrentUserProfile} from '../../../store/actions/profileAction';
import {Link,withRouter} from 'react-router-dom';

const EditProfile = (props) => {
    const [formData, setFormData] = useState({company:"",website:"",location:"",status:"",skills:"",bio:"",githubusername:"",twitter:"",facebook:"",linkedin:"",youtube:"",instagram:"",})
    const {company,website,location,status,skills,bio,githubusername,twitter,facebook,linkedin,youtube,instagram} = formData
   const [toggleSocialInputs, setToggleSocialInputs] = useState(false)

   useEffect(()=>{
     props.getCurrentUserProfile()//to make the request and load or update the state profile and loading imediately when thiss component load
// call the setFormData to udate(prepopulate) the input field when this components run

    setFormData({
      company: props.loading || !props.profile.company ? "" : props.profile.company,//if it is loading or there is no company in the input field, leave it blank//if it is not loading and there is company in the input field then fill it
      website: props.loading || !props.profile.website ? "" : props.profile.website,
      location: props.loading || !props.profile.location ? "" : props.profile.location,
      status: props.loading || !props.profile.status ? "" : props.profile.status,
      skills: props.loading || !props.profile.skills ? "" : props.profile.skills.join(','),
      bio: props.loading || !props.profile.bio ? "" : props.profile.bio,
      githubusername: props.loading || !props.profile.githubusername ? "" : props.profile.githubusername,
      twitter: props.loading || !props.profile.social.twitter ? "" : props.profile.social.twitter,
      facebook: props.loading || !props.profile.social.facebook ? "" : props.profile.social.facebook,
      linkedin: props.loading || !props.profile.social.linkedin ? "" : props.profile.social.linkedin,
      youtube: props.loading || !props.profile.social.youtube ? "" : props.profile.social.youtube,
      instagram: props.loading || !props.profile.social.instagram ? "" : props.profile.social.instagram 

    })
// eslint-disable-next-line
   },[props.loading,getCurrentUserProfile]);

   const handleOnsubmit = e =>{
     e.preventDefault();
     props.editProfile(formData,props.history)
   }



const handleOnchange = e => setFormData({...formData, [e.target.name] : e.target.value});

   return(<div className="row">
       <div className="col-md-6 offset-md-3">
       <h1 className="large text-primary">
        Edit Your Profile
      </h1>
      <p className="lead">
        <i className="fa fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleOnsubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={handleOnchange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={handleOnchange} />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={handleOnchange}/>
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={handleOnchange}/>
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={handleOnchange}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} onChange={handleOnchange}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={handleOnchange}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={()=>setToggleSocialInputs(!toggleSocialInputs)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
            {toggleSocialInputs && 
               <Fragment>
                <div className="form-group social-input">
                        <i className="fa fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={handleOnchange} />
                        </div>

                        <div className="form-group social-input">
                        <i className="fa fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={handleOnchange} />
                        </div>

                        <div className="form-group social-input">
                        <i className="fa fa-youtube fa-2x"></i>
                        <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={handleOnchange} />
                        </div>

                        <div className="form-group social-input">
                        <i className="fa fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={handleOnchange} />
                        </div>

                        <div className="form-group social-input">
                        <i className="fa fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={handleOnchange} />
                 </div>
              </Fragment>
             }
      
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="dashboard">Go Back</Link>
      </form>
       </div>
   </div>
);
}
const mapStateToProps = (state) => ({
  profile : state.profile.profile,
  loading:state.profile.loading
})
export default connect(mapStateToProps,{editProfile,getCurrentUserProfile})(withRouter(EditProfile))