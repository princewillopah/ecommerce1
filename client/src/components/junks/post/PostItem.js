import React from 'react'
import {connect} from 'react-redux'
import {likePost,unlikePost,deletePost} from '../../../store/actions/postAction';
import {Link} from 'react-router-dom';
// import Spinner from '../layouts/Spinner'
import Moment from 'react-moment';

const Post = ({auth,post:{_id,text,name,avatar,user,likes,unlikes,comments,date},likePost,unlikePost,deletePost}) => {

 


   return(

      <div className="post bg-white p-3 my-1">
          <div>
            <a href="profile.html">
              <img
                className="round-img"
                src={avatar?`http://localhost:5000/${avatar}`:`assets/img/person1.png`}
                alt=""
              />
              <h4>{name}</h4>
            </a>
          </div>
          <div>
              <p className="my-1">{text}</p>
             <p className="post-date">
                Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
            </p>
            <button onClick={e=>likePost(_id)} type="button" className="btn btn-light">
              <i className="fa fa-thumbs-up"></i>{' '}
              {/* {!auth.loading && likes.user === auth.user._id ?<i className="fa fa-thumbs-down" style={{color:'blue'}}></i>:<i className="fa fa-thumbs-up" style={{color:'red'}}></i>}{' '}
              {!auth.loading && console.log(typeof(likes.user))} */}
              {likes.length > 0 && (<span>{likes.length}</span>)}
            </button>
            <button onClick={e=>unlikePost(_id)} type="button" className="btn btn-light">
              <i className="fa fa-thumbs-down"></i>{' '}
              {unlikes.length > 0 && (<span>{unlikes.length}</span>)}
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
            </Link>
            {!auth.loading && user === auth.user._id && (
                <button type="button" onClick={e=>deletePost(_id)} className="btn btn-danger" >
                <i className="fa fa-times"></i>
                </button>
             )}
          </div>
        </div>

);
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps,{likePost,unlikePost,deletePost})(Post)