import React,{useEffect}from 'react';
import {Link,useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import {getPost} from '../../actions/post';

function Post({getPost,post:{post,loading}}) {
    const {id} = useParams();

    useEffect(()=>{
        getPost(id)
    },[getPost,id])


    return loading || post === null ? (
      <Spinner />
    ) : (
      <section className="container">
        <Link to="/posts" className="btn btn-dark" style={{marginTop:'15px',borderRadius:'7px'}}>
          Back To Posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id}/>
        <div className="comments">
          {post.comments.map((comment)=>
            <CommentItem key={comment._id} comment={comment}/> 
          )}
        </div>
      </section>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
  });

export default connect(mapStateToProps,{getPost})(Post)

