import React from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment';
import {deleteEducationProfile} from '../../store/actions/profileAction'

const EducationComponent = ({education,deleteEducationProfile}) => {
  const myEducation = education && education.map(edu =>(//if profile has xperience
    <tr key={edu._id}>
       <td>{edu.school}</td>
       <td className="hide-sm">{edu.degree}</td>
       <td className="hide-sm">
         <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to===null? ('Till Now') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
       </td>
       <td>
         <button onClick={()=>deleteEducationProfile(edu._id)} className="btn btn-danger">Delete </button>
       </td>
     </tr>
))
   return(<>
       <h4 className="my-1">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {myEducation}
        </tbody>
      </table>
   </>
);
}
export default connect(null,{deleteEducationProfile})(EducationComponent)