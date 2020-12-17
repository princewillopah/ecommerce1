import React,{Fragment,useEffect} from 'react'
import {connect} from 'react-redux'
import {getPosts} from '../../../store/actions/postAction';
import {withRouter} from 'react-router-dom';
import Spinner from '../layouts/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'


const Posts = ({posts,loading,getPosts}) => {

   useEffect(()=>{
    getPosts()
   },[getPosts]);



   return(
   <div className="row">
     {loading ? (<Spinner/>):
     (<Fragment>

        <div className="col-md-12">
            <h1 className="large text-primary">
                Posts
            </h1>
            <p className="lead"><i className="fa fa-user"></i> Welcome to the community!</p>

            <div className="post-form">
                <div className="bg-primary p">
                <h3>Say Something...</h3>
                </div>
                <PostForm/>
            </div>
        </div>


      <div className="posts col-md-12">
   
        {posts.map(post => (
           <PostItem key={post._id} post={post}/> 
        ))}

      </div>

     </Fragment>)}
   </div>
);
}
const mapStateToProps = (state) => ({
  posts : state.post.posts,
  loading:state.post.loading
})
export default connect(mapStateToProps,{getPosts})(withRouter(Posts))