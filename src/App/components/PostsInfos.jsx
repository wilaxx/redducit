import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredSubreddit, selectSelectedSubredditImage } from '../features/subreddits/subredditsSlice';
import { selectSearchTerm } from '../features/posts/postsSlice';
import './PostsInfos.css';

const PostsInfos = () => {
  const filteredSubreddit = useSelector(selectFilteredSubreddit);
  const selectedSubredditImage = useSelector(selectSelectedSubredditImage);
  const searchTerm = useSelector(selectSearchTerm);

  const renderContent = () => {
    if (filteredSubreddit === '' && searchTerm === '') {
      return (
        <div key="redditPosts" className="postsForLanding fade-in-in">
          <p>Posts from</p>
          <img src='https://reddit.com/favicon.ico' alt="Posts from reddit.com landing page" />
          <p>Reddit.com</p>
        </div>
            );
      } 
    else if (searchTerm !== '') {
      return (
        <div key="searchPosts" className="postsForSearch fade-in-in">
          <p>Posts for <span>"{searchTerm}"</span> search</p>
        </div>
            );
      } 
        else {
      return (
        <div key={filteredSubreddit} className="postsForSubreddits fade-in-in">
          <p>Posts from </p>
          <img src={selectedSubredditImage} alt={filteredSubreddit} />
          <p>{filteredSubreddit}</p>
        </div>
            );
      }
  };


  return (
    <>
      {renderContent()}
    </>
  );
};

export default PostsInfos;