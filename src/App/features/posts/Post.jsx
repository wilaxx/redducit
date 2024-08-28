import React, { useState } from 'react';
import moment from 'moment';
import './Post.css';
import { TiArrowUpOutline } from "react-icons/ti";
import { TbMessage2, TbMessage2Off } from "react-icons/tb";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { FaUserPen } from "react-icons/fa6";
import { ImNewTab } from "react-icons/im";
import { useSelector, useDispatch } from 'react-redux';
import { selectPostsState } from './postsSlice.js';
import { fetchComments } from './postsSlice.js';
import Comments from '../comments/Comments.jsx';

const Post = ({post}) => {
   
    const { title, author, num_comments, ups, created_utc, permalink, selftext_html, secure_media, preview, media_metadata, id, url_overridden_by_dest, url, thumbnail, loadingComments, spoiler } = post;
    const [showComments, setShowComments] = useState(false);
    const [showSpoiler, setShowSpoiler] = useState(false);
    // const { loadingComments } = useSelector(selectPostsState);
    const dispatch = useDispatch();
   
    const handleSpoilerView = () => {
        setShowSpoiler(!showSpoiler);
    }


    const isImageUrl = (url) => {
        return url && url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    };

    const getImageUrl = () => {
        if (isImageUrl(url_overridden_by_dest)) {
            return url_overridden_by_dest;
        } else if (isImageUrl(url)) {
            return url;
        } else if (isImageUrl(thumbnail)) {
            return thumbnail;
        } else {
            return null;
        }
    };

    const decodeHTML = (html) => {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const addTargetBlankToLinks = (htmlString) => {
        // Utilise une expression régulière pour trouver les balises <a> sans l'attribut target
        return htmlString.replace(/<a\s+(?![^>]*\btarget=)[^>]*>/gi, (match) => {
            // Ajoute l'attribut target="_blank" à chaque balise <a>
            return match.replace('<a', '<a target="_blank"');
        });
    };


    const renderContent = () => {
        let content = [];
        const imageUrl = getImageUrl();

        if (selftext_html) {
            const decodedHTML = decodeHTML(selftext_html);
            const updatedHTML = addTargetBlankToLinks(decodedHTML);
            content.push(<div key={`${id}-selftext`} className='selftext_html patrick-hand-sc-regular' dangerouslySetInnerHTML={{ __html: updatedHTML }} />);
        }

        if (imageUrl) {
            content.push(<img key={`${id}-singleImage`} className='img-single' src={imageUrl} alt={title} />);
        }
        if (secure_media && secure_media.reddit_video && secure_media.reddit_video.fallback_url) {

            const fullUrl = secure_media.reddit_video.fallback_url;

            // Extraire la base de l'URL
            const baseUrl = fullUrl.substring(0, fullUrl.lastIndexOf('/') + 1);

            // Concaténer avec "DASH_AUDIO_128.mp4"
            const audioUrl = baseUrl + "DASH_720.mp4";
            
            content.push(
                <video key={`${id}-video`} className='video' controls>
                    <source src={secure_media.reddit_video.fallback_url} type='video/mp4' />
                    <source src={audioUrl} type="audio/mp4" />
                </video>
            );
        }
        return content.length > 0 ? content : null;
    };

    const handleCommentsClick = (e) => {
        if (!showComments) {
            dispatch(fetchComments(permalink));
        }
        const parent = e.target.parentElement.getBoundingClientRect();
        const headerHeight = document.querySelector('.app-header').offsetHeight;
        const scrollToPosition = parent.top + window.scrollY - headerHeight - 5;
        if (!showComments) {
        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
        });
    }
    setShowComments(!showComments);
    };

    const renderIconComments = () => {
        if (!showComments || loadingComments) {
            return <TbMessage2 className="icon-comments" onClick={handleCommentsClick} />
        } else {
            return <TbMessage2Off className="icon-comments" onClick={handleCommentsClick} />
    }
    };


    return (
    <>
        <article className='Post scale-in-center' key={id}>

            <header className="post-header">
                <h2 className='grandstander-title'>{title}</h2>
                <a key={`${id}-link`} href={`https://www.reddit.com${permalink}`} target="_blank" rel="noopener noreferrer">
                    <ImNewTab className='icon-newtab' />
                </a>
            </header>

            <section className="post-section">
                
                <div className={`post-content ${spoiler ? 'spoiler' : ''}`}>
                {spoiler ? (
                <>
                    {!showSpoiler ? (
                        <ImEye onClick={handleSpoilerView} />
                    ) : (
                        <>
                            <ImEyeBlocked onClick={handleSpoilerView} />
                                    {renderContent()}
                        </>
                    )}
                </>
            ) : (
                renderContent()
            )}
                </div>
            </section>
           
            <footer className='post-footer'>
                
                <div className='author'><FaUserPen className="icon-author" /> <p>{author}</p></div>
                <div className='created-date'><p>{moment.unix(created_utc).fromNow()}</p></div>
                <div className='votes'>  
                <TiArrowUpOutline className='icon-ups' />
                  <p>{ups}</p> 
                </div>
                <div className='comments'>
                    {renderIconComments()}
                <p className='comment-count'>{num_comments}</p>
                </div>
                
            </footer>
            {showComments && <Comments postId={id} />}
        </article>
      
    </>
    );
}

export default Post;