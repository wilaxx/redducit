import React from 'react';
import moment from 'moment';
import './Post.css';
import { TiArrowUpOutline } from "react-icons/ti";
import { MdOutlineMessage } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { ImNewTab } from "react-icons/im";

const Post = ({post}) => {
   
    const { title, author, num_comments, ups, created_utc, permalink, selftext_html, preview, media_metadata, id, url_overridden_by_dest, url, thumbnail } = post;

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

    const renderContent = () => {
        let content = [];
        const imageUrl = getImageUrl();

        if (selftext_html) {
            const decodedHTML = decodeHTML(selftext_html);
            content.push(<div key={`${id}-selftext`} dangerouslySetInnerHTML={{ __html: decodedHTML }} />);
        }

        if (imageUrl) {
            content.push(<img key={`${id}-singleImage`} className='img-single' src={imageUrl} alt={title} />);
        }

        if (preview || media_metadata) {
            content.push(
                <a key={`${id}-link`} href={`https://www.reddit.com${permalink}`} target="_blank" rel="noopener noreferrer">View original post on Reddit</a>
            );
        }

        return content.length > 0 ? content : null;
    };

    return (
        <article className='Post' key={id}>

            <header className="post-header">
                <h2>{title}</h2>
                <div className='votes'>
                <TiArrowUpOutline className='icon-ups' />
                    {ups} </div>
            </header>

            <section className="post-section">
                <div className='post-content'>
                    {renderContent()}
                </div>
            </section>
           
           <footer className='post-footer'>
                <div className='author'><FaUserPen className="icon-author" /> {author}</div>
                <div className='created-date'>{moment.unix(created_utc).fromNow()}</div>
                <div className='comments'>
                <MdOutlineMessage className="icon-comments" />
                    <span className='comment-count'>{num_comments}</span>
                </div>
            </footer>
        </article>
    );
}

export default Post;