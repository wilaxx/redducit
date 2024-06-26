import React from 'react';
import Comment from './Comment.jsx';
import { useSelector } from 'react-redux';
import { selectPostsState } from '../posts/postsSlice.js';
import './Comments.css';

const Comments = ({ postId }) => {
    const postsState = useSelector(selectPostsState);
    const post = postsState.posts.find(post => post.id === postId);

    if (!post) {
        return null;
    }

    if (post.loadingComments) {
        return <div>Loading comments...</div>
    }

    if (post.errorComments) {
        return <div>Error loading comments</div>
    }

    if (!post.comments || post.comments.length === 0) {
        return <div>No comments available</div>
    }

    return (
        <div className='Comments'>
            {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}        
        </div>
    );
};

export default Comments;