import React from 'react'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {deleteComment} from '../../store/actions/postAction';

const CommentComponent = ({deleteComment,auth,postid,comment:{_id,name,avatar,user,text,date}}) => {
   return(<>
       <div className="comments">
        <div className="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                className="round-img"
                src={avatar===null ? `http://localhost:5000/${avatar}`:`/assets/img/person1.png`}
                alt={name}
              />
              <h4>{name}</h4>
            </a>
          </div>
          <div>
            <p className="my-1 text-dark">{text}
            </p>
             <p className="post-date">
              Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
            </p>
            {auth.loading ===false && auth.user._id === user && (
                <button onClick={e=>deleteComment(postid,_id)} className="btn btn-outline-secondary p-1" style={{border:'1px solid #aaa',borderRadius:'5%'}}><i className="fa fa-trash text-danger"></i></button>
            )}
          </div>
        </div>
        </div>
   </>
);
}
const mapStateToProps = (state) => ({
auth : state.auth
})
export default connect(mapStateToProps,{deleteComment})(CommentComponent)