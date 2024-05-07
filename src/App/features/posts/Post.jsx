import React from 'react';
import './Post.css';

const Post = ({post}) => {
   
    const { title, url, author, selftext } = post;
    return (
        <div className='Post'>
            <h2>{title}</h2>
            <div className="postImgWrapper">
                <p>{selftext}</p>
                 <img src={url} alt="visuel" />
            </div>
           
            <p>Par {author}</p>
        </div>
    );
}

export default Post;