import React from "react";
import Comments from './Comments.jsx';
import Comment from './Comment.jsx';
import { useSelector } from "react-redux";

const Comments = () => {
    const comments = useSelector(state => state.comments);
    const { isLoading, isError, errorMessage, errorStatus } = comments;
    const commentsData = comments.comments;

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error: {errorMessage} {errorStatus}</div>
    }

    if(commentsData.length === 0) {
        return <div>No comments available</div>
    }

    return (
        <div>
            {commentsData.map(comment => <Comment key={comment.id} comment={comment} />)}
        </div>
    );

}