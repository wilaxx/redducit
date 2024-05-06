import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubredditsState, selectSubreddit } from './subredditsSlice';

const Subreddit = ({subreddit}) => {

    
    const dispatch = useDispatch();
    const subredditsState = useSelector(selectSubredditsState);
    const { isLoading, isError, errorMessage, errorStatus, selectedSubreddit } = subredditsState;
    const subredditsData = subredditsState.subreddits;

    return (
            <li className="Subreddit">
                <button
                onClick={() => {dispatch(selectSubreddit(subreddit.display_name))}}
                >
                    {subreddit.display_name}
                </button>
            </li>
    );
};

export default Subreddit;