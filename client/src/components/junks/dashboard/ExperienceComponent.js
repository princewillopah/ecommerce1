import React from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment';
import {deleteExperienceProfile} from '../../../store/actions/profileAction'

const ExperienceComponent = ({experience,deleteExperienceProfile}) => {
  // console.log("2: ",experience);
const myExperinces = experience && experience.map(exp =>(//if profile has xperience
         <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td className="hide-sm">
              <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to===null? ('Till Now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
            </td>
            <td>
              <button onClick={()=>deleteExperienceProfile(exp._id)} className="btn btn-danger"> Delete </button>
            </td>
          </tr>
))


   return(<>
       <h4 className="my-1">Experience Credentials</h4>
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
          {myExperinces}
        </tbody>
      </table>
   </>
);
}
export default connect(null,{deleteExperienceProfile})(ExperienceComponent)