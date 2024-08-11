import React from 'react';
import moment from 'moment';
import './Comment.css';
import { TbMessages, TbMessagesOff } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';
import { selectComment } from '../posts/postsSlice.js';

const Comment = ({ comment }) => {
    const { author, body, created_utc, replies } = comment;

    const [showReplies, setShowReplies] = React.useState(false);
    const dispatch = useDispatch();

    const isSelected = useSelector(state => state.posts.selectedCommentId === comment.id);
    

    const handleClick = () => {
        dispatch(selectComment(comment.id));
    };

    const GetNumOfReplies = () => {
        if (replies !== "" && replies.data && replies.data.children) {
            const filteredChildren = replies.data.children.filter(child => child.kind !== "more");
            return filteredChildren.length;
        }
        return 0;
    }

    let numOfReplies = GetNumOfReplies();
    const showIconReplies = (replies) => {
       
        if (replies !== "" && replies.data && replies.data.children) {
            const filteredChildren = replies.data.children.filter(child => child.kind !== "more");
            if (filteredChildren.length > 0) {
                if (showReplies) {
                    return (
                        <div className="replies-icon" onClick={() => setShowReplies(!showReplies)}>
                            {numOfReplies > 0 && <span>{numOfReplies}</span>}
                    <TbMessagesOff onClick={() => setShowReplies(!showReplies)} />
                        </div>
                    );
                } else {

                    return (
                    <div className="replies-icon" onClick={() => setShowReplies(!showReplies)}>
                        {numOfReplies > 0 && <span>{numOfReplies}</span>}
                        <TbMessages />
                    </div>
                    );
            
                }
            }
        }
        return null;
    };


  // Fonction pour rendre les réponses récursivement, y compris la gestion des réponses de type "more"
    const renderReplies = (replies) => {
      if (showReplies && replies !== "" && replies.data && replies.data.children && replies.data.children.length > 0) {
          return replies.data.children.map((reply) => {
              if (reply.kind === "more") {
                console.dir(reply);
                  return;
              } else {
                  return <Comment key={reply.data.id} comment={reply.data} />;
              }
      })
      
  }
  return null;
    }

 



    return (
        <div className={`Comment ${isSelected ? 'Comment--highlighted' : ''}`} onClick={handleClick}>

            <div className='comment-header'>
                <h3 className='header'>{author}</h3>
                <div className='created-date'>
                    {moment.unix(created_utc).fromNow()}
                </div>
            </div>

            <div className='comment-body ubuntu-medium'>
                <p>{body}</p>
            </div>

            <div className="comment-footer">
                {showIconReplies(replies)}
            </div>
            
                {renderReplies(replies)}
        </div>
    );
};

export default Comment;