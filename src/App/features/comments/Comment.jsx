import React from 'react';
import moment from 'moment';
import './Comment.css';
import { TbMessages, TbMessagesOff } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';
import { selectComment } from '../posts/postsSlice.js';

const Comment = ({ comment }) => {
    const { author, body_html, created_utc, replies, id } = comment;

    const [showReplies, setShowReplies] = React.useState(false);
    const dispatch = useDispatch();

    const isSelected = useSelector(state => state.posts.selectedCommentId === id);
    
    const addTargetBlankToLinks = (htmlString) => {
        // Utilise une expression régulière pour trouver les balises <a> sans l'attribut target
        return htmlString.replace(/<a\s+(?![^>]*\btarget=)[^>]*>/gi, (match) => {
            // Ajoute l'attribut target="_blank" à chaque balise <a>
            return match.replace('<a', '<a target="_blank"');
        });
    };

    const handleClick = () => {
        dispatch(selectComment(id));
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
                            {numOfReplies > 0 && <p>{numOfReplies}</p>}
                            <TbMessagesOff className='messages-off'/>
                        </div>
                    );
                } else {

                    return (
                        <div className="replies-icon" onClick={() => setShowReplies(!showReplies)}>
                            {numOfReplies > 0 && <p>{numOfReplies}</p>}
                            <TbMessages className='messages-on' />
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
                  return null;
              } else {
                  return <Comment key={reply.data.id} comment={reply.data} />;
              }
      })
      
  }
  return null;
    }

    const decodeHTML = (html) => {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const renderContent = () => {
        let content = [];
    
        if (body_html) {
            const decodedHTML = decodeHTML(body_html);
            const updatedHTML = addTargetBlankToLinks(decodedHTML);
            content.push(<div key={`${id}-body`} className='body_html ' dangerouslySetInnerHTML={{ __html: updatedHTML }} />);
        }
    
        return content.length > 0 ? content : null;
    
    }

    return (
        <div className={`Comment ${isSelected ? 'Comment--highlighted' : ''}`} onClick={handleClick}>

            <div className='comment-header'>
                <h3 className='author'>{author}</h3>
                <div className='created-date'>
                    {moment.unix(created_utc).fromNow()}
                </div>
            </div>

            <div className='comment-body ubuntu-medium'>
                {renderContent()}
            </div>

            <div className="comment-footer">
                {showIconReplies(replies)}
            </div>
            
                {renderReplies(replies)}
        </div>
    );
};

export default Comment;