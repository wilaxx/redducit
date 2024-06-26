import React from 'react';
import moment from 'moment';
import './Comment.css';

const Comment = ({ comment }) => {
    const { author, body, created_utc } = comment;

    return (
        <div className='Comment'>
            <div className='author'>{author}</div>
            <div className='body'>{body}</div>
            <div className='created-date'>{moment.unix(created_utc).fromNow()}</div>
        </div>
    );
};

export default Comment;