import React from 'react';
import './Post.css';

const Post = ({post}) => {
   
    const { title, url, author, selftext } = post;
    // const imageUrl = post.preview.images[0].source.url;
    const imageUrl = post.preview ? post.preview.images[0].source.url : url;


    if(!selftext) {
        return (
        <div className='Post'>
            <h2>{title}</h2>
            <div className="postImgWrapper">
                 <img src={url} alt="visuel" />
            </div>
            {true && <p>yoooo</p>}
            <p>Par {author}</p>
        </div>
    );  
    }


    return (
        <div className='Post'>
            <h2>{title}</h2>
            <div className="postImgWrapper">
                 <img src={imageUrl} alt="visuel" />
            </div>
            {selftext !== '' && <p>{selftext}</p>}
            <p>Par {author}</p>
        </div>
    );
}

export default Post;

