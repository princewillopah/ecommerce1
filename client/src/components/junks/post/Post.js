import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {getPost} from '../../store/actions/postAction';
import Spinner from '../layouts/Spinner'
import {likePost,unlikePost} from '../../store/actions/postAction';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm'
import CommentComponent from './CommentComponent';


const Post = ({post:{loading,post},getPost,match,likePost,unlikePost}) => {
    useEffect(()=>{
       getPost(match.params.postid)
       console.log(match.params.postid)
    },[getPost,match.params.postid])

    return(<>
        {loading || post === null ? (<Spinner/>) : 
        (<>
        <div className="row">
            <div className="col-md-4">
                <img src={post.avatar?`http://localhost:5000/${post.avatar}`:`assets/img/person1.png`} className="img-fluid" alt={post.name}/>
        <h4>{post.name}</h4>
            </div>
            <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header text-dark d-flex">
                                    date: <Moment format="DD/MM/yyyy">{post.date}</Moment>
                                    <Link to="/posts" className="ml-auto btn btm-outline-secondary">Back To Post</Link>
                                </div>
                                <div className="card-body">
                            <p style={{color:'black'}}>{post.text}</p> 
                                </div>
                                <div className="card-footer text-dark">
                                <button onClick={e=>likePost(post._id)} type="button" className="btn btn-light">
                                    <i className="fa fa-thumbs-up"></i>{' '}
                                    {post.likes.length > 0 && (<span>{post.likes.length}</span>)}
                                    </button>
                                    <button onClick={e=>unlikePost(post._id)} type="button" className="btn btn-light">
                                    <i className="fa fa-thumbs-down"></i>{' '}
                                    {post.unlikes.length > 0 && (<span>{post.unlikes.length}</span>)}
                                    </button>
                                    <span>
                                        {post.comments.length > 0 && <span className='' style={{color:'black'}}>comments {post.comments.length}</span>}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="post-form">
                                <div className="bg-primary p py-1">
                                <h3>make Something comments...</h3>
                                </div>
                                <CommentForm postid={post._id}/>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="post-form">
                                <div className="bg-secondaryp py-1">
                                        <h3>All comments: {post.comments.length}</h3>
                                </div>
                                {
                                    //we pass post._id along in case of deletion
                                   post.comments.map(comment=>( <CommentComponent key={comment._id} comment={comment} postid={post._id}/>))
                                  
                                }
                               
                            </div>
                        </div>

                    </div>
            </div>

        </div>
          
       </> )
         }
        
    </>
    );
    }
const mapStateToProps = (state) => ({
post : state.post
})

export default connect(mapStateToProps,{getPost,likePost,unlikePost})(Post)