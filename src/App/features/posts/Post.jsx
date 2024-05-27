import React, { useState } from 'react';
import moment from 'moment';
import './Post.css';
import { TiArrowUpOutline } from "react-icons/ti";
import { MdOutlineMessage } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";

const Post = ({post}) => {
   
    const { title, author, num_comments, ups, created_utc, permalink, selftext, preview, media_metadata, url_overridden_by_dest } = post;
    const [currentImage, setCurrentImage] = useState(0);

    const renderContent = () => {
        let content = [];

        if (selftext) {
            content.push(<p key="selftext">{selftext}</p>);
        }

        if (url_overridden_by_dest) {
            content.push(<img key="singleImage" className='img-single' src={url_overridden_by_dest} alt={title} />);
        }

        if (media_metadata) {
            const images = Object.values(media_metadata);
            content.push(
                <div key="multipleImages">
                    <img src={images[currentImage].s.u} className='img-multiple' alt={title} />
                    <button onClick={() => setCurrentImage((currentImage + 1) % images.length)}>Next image</button>
                </div>
            );
        }

        return content.length > 0 ? content : null;
    };

    return (
        <article className='Post'>

            <header className="post-header">
                <h2>{title}</h2>
                <div className='votes'>
                <TiArrowUpOutline className='icon-ups' />
                    {ups} </div>
            </header>

            <section className="post-section">
                <div className='content'>
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