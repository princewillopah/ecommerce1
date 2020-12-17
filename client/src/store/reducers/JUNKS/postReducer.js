import * as T from '../types'

const initialState = {
    post:null,
    posts:[],
    loading:true,
    error:{}
}

export default function(state = initialState,action){
    const {payload,type} = action;
    switch(type){
    //   case T.GET_PROFILE:
    //       return {...state, profile:payload,loading:false}//spread d state//update profile:res.data(in payload)//set loading to false
    case T.GET_POSTS:
        return {...state, posts: payload,loading:false}//spread d state//update profile:res.data(in payload)//set loading to false
    case T.GET_POST:
            return {...state, post: payload, loading:false}//spread d state//update post:res.data(in payload)//set loading to false
    case T.CREATE_POST:
        return{...state,//spread the state so as to update the posts//map through the posts to get the post whose id equals the id sent in payload//if that post is found,spread it so as to update its likes, if not found the return the old post like that
            posts: [payload, ...state.posts],//in an array,spreade d current post, add new one in it, the assign it to the posts
            loading:false
        }
     case T.POST_ERROR:
         return{...state, loading: false, error: payload}
    case T.LIKE_UNLIKE:
        return{...state,//spread the state so as to update the posts//map through the posts to get the post whose id equals the id sent in payload//if that post is found,spread it so as to update its likes, if not found the return the old post like that
            posts: state.posts.map(post => post._id === payload.postid ? {...post,likes:payload.likes} : post),
            loading:false
            }
    case T.UNLIKE:
        return{...state,//spread the state so as to update the posts//map through the posts to get the post whose id equals the id sent in payload//if that post is found,spread it so as to update its likes, if not found the return the old post like that
            posts: state.posts.map(post => post._id === payload.postid ? {...post,unlikes:payload.unlikes} : post),
            loading:false
            }

    case T.DELETE_POST:
        return{...state,//spread the state so as to update the posts//map through the posts to get the post whose id equals the id sent in payload//if that post is found,spread it so as to update its likes, if not found the return the old post like that
            posts: state.posts.filter(post => post._id !== payload),loading:false//note that payload = postid
        }
    case T.ADD_COMMENT:
        return{...state,
            post: {...state.post,comments:payload}//in an object, spread the post, then update comment//this post is just like posts(CREATE_POST) except, it is object because it is a single post
        }
    
    case T.REMOVE_COMMENT:
        return{...state,//SPREAD THE STATE TO UPDATE ONLY POST
            post:{//what so ever update we have withing this {} will be used to update the post since it is an object
                ...state.post,//spreade the post to update post
                comments: state.post.comments.filter(comment=>comment._id !== payload)//filter those comment whose ids are not same as the one in payload//assign the result to comments
            },
            loading:false
        }



    // case T.CLEAR_AUTH_PROFILE:
    // case T.CLEAR_PROFILE:
    //     return{...state,loading:false,profile:null}
    // case T.CREATE_PROFILE:
    // case T.EDIT_PROFILE:
    // case T.UPDATE_EDUEXP_PROFILE://THIS WILL HANDLE BOTH UPDATE EXDUCATION AND EXPERINCE
    // case T.DELETE_EDUEXP_PROFILE: //delete and return the remaining according to the backend
    //     return {...state, profile:payload,loading:false}//CREATE PROFILE
      default:
          return state
    }
}