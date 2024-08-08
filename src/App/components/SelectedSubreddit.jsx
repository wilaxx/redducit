import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredSubreddit, selectSelectedSubredditImage } from '../features/subreddits/subredditsSlice';
import './SelectedSubreddit.css';

const SelectedSubreddit = ({ referenceElement }) => {
  const filteredSubreddit = useSelector(selectFilteredSubreddit);
  const selectedSubredditImage = useSelector(selectSelectedSubredditImage);

  return (
    <div 
      key={filteredSubreddit} 
      className="selected-subreddit fade-in-in"
      >
      <p>Posts from </p>
      <img src={selectedSubredditImage === '' ? 'https://reddit.com/favicon.ico' : selectedSubredditImage} alt={filteredSubreddit} />
      <span>{filteredSubreddit === '' ? 'Reddit.com' : filteredSubreddit}</span>
    </div>
  );
};

export default SelectedSubreddit;