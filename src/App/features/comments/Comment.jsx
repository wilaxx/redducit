import React from 'react';
import moment from 'moment';
import './Comment.css';
import { LiaCommentDotsSolid } from "react-icons/lia";

const Comment = ({ comment }) => {
    const { author, body, created_utc, replies, kind } = comment;
    
    const showIconReplies = () => {
        if (replies) {
            return <LiaCommentDotsSolid />
        }
    }

    return (
        <div className='Comment'>
            <div className='author'>{author}</div>
            <div className='body'>{body}</div>
            <div className='created-date'>{moment.unix(created_utc).fromNow()}</div>
            {showIconReplies()} 

        </div>
    );
};

export default Comment;