import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubreddit, selectFilteredSubreddit, selectSubredditsState } from '../subreddits/subredditsSlice';
import { setSearchTerm } from '../posts/postsSlice';
import './Subreddit.css';

const Subreddit = ({ subreddit }) => {
  const dispatch = useDispatch();
  const filteredSubreddit = useSelector(selectFilteredSubreddit);
  const subredditsState = useSelector(selectSubredditsState);
  const { isLoading, isError, errorMessage, errorStatus } = subredditsState;
  const subredditsData = subredditsState.subreddits;

  const handleImageError = (imgElement) => {
    const svgElement = document.createElement('img');
    svgElement.setAttribute('src', 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0ZM8.016 8.633a1.616 1.616 0 0 0-.2.806V13.5H5.931V6.172h1.8v.9h.039a3.009 3.009 0 0 1 1.018-.732 3.45 3.45 0 0 1 1.449-.284c.246-.003.491.02.732.068.158.024.309.08.444.164l-.759 1.832a2.09 2.09 0 0 0-1.093-.26c-.33-.01-.658.062-.954.208a1.422 1.422 0 0 0-.591.565Zm2.9 6.918H9.355L14.7 2.633c.426.272.828.58 1.2.922l-4.984 11.996Z"></path></svg>'));
    svgElement.setAttribute('alt', 'Image not found');
    svgElement.setAttribute('class', 'subreddit-icon');
    imgElement.parentNode.replaceChild(svgElement, imgElement);
  };

  function timer(seconds) {
    return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000);
    });
  }

  const scrollToTop = async () => {
    await timer(2);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <li className="Subreddit slide-in-elliptic-right-fwd">
      <button
        onClick={(e) => {
          const search = document.getElementById('searchbar');
          search.value = '';
          dispatch(selectSubreddit({
            name: subreddit.display_name_prefixed,
            url: subreddit.icon_img === '' ? 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0ZM8.016 8.633a1.616 1.616 0 0 0-.2.806V13.5H5.931V6.172h1.8v.9h.039a3.009 3.009 0 0 1 1.018-.732 3.45 3.45 0 0 1 1.449-.284c.246-.003.491.02.732.068.158.024.309.08.444.164l-.759 1.832a2.09 2.09 0 0 0-1.093-.26c-.33-.01-.658.062-.954.208a1.422 1.422 0 0 0-.591.565Zm2.9 6.918H9.355L14.7 2.633c.426.272.828.58 1.2.922l-4.984 11.996Z"></path></svg>') : subreddit.icon_img

          }));
          dispatch(setSearchTerm(''));
          scrollToTop();
        }}
        className={`subredditButton ${filteredSubreddit === subreddit.display_name_prefixed ? 'selected fade-out-bck' : ''}`}
      >
        <img
          src={
            subreddit.icon_img === '' ? 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0ZM8.016 8.633a1.616 1.616 0 0 0-.2.806V13.5H5.931V6.172h1.8v.9h.039a3.009 3.009 0 0 1 1.018-.732 3.45 3.45 0 0 1 1.449-.284c.246-.003.491.02.732.068.158.024.309.08.444.164l-.759 1.832a2.09 2.09 0 0 0-1.093-.26c-.33-.01-.658.062-.954.208a1.422 1.422 0 0 0-.591.565Zm2.9 6.918H9.355L14.7 2.633c.426.272.828.58 1.2.922l-4.984 11.996Z"></path></svg>') : subreddit.icon_img
          }
          alt={`${subreddit.display_name}`}
          onError={(e) => handleImageError(e.target)}
        />
        <span className='subname animate__animated animate__zoomInRight animate__slower'>{subreddit.display_name}</span>
      </button>
    </li>
  );
};

export default Subreddit;