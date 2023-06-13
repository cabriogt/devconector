import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const Posts = ({getPosts,post:{posts}}) => {

    useEffect(()=>{
        getPosts()
    },[getPosts])

  return (
            <section className="container">
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                    <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'user',style:'solid'})} /> 
                    Welcome to the community
                </p>
                <PostForm/>
                <div className="posts">
                    {posts.map((post) => (
                        <PostItem key={post._id} post={post} />
                    ))}
                </div>
            </section>
    )
  
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
  });

export default connect(mapStateToProps,{getPosts})(Posts)
