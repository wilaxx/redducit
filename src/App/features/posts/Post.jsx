import React from 'react';
import './Post.css';

const Post = ({post}) => {
   
    const { title, url, author } = post;
    return (
        <div>
            <h2>{title}</h2>
            <div className="postImgWrapper">
                 <img src={url} alt="visuel" />
                 <br />
                 <br />
                 <div>l'url est : {url}</div>
            </div>
           
            <p>Par {author}</p>
        </div>
    );
}

export default Post;