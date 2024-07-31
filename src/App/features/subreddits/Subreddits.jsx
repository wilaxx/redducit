import React, { useEffect } from 'react';
import Subreddit from './Subreddit';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubredditsState } from './subredditsSlice';
import { fetchSubreddits } from './subredditsSlice';
import './Subreddits.css';


const Subreddits = () => {

    const subredditsState = useSelector(selectSubredditsState);

    const { isLoading, isError, errorMessage, errorStatus } = subredditsState;

    const subredditsData = subredditsState.subreddits;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSubreddits('https://www.reddit.com/subreddits.json'));
    }, [dispatch]); 

    if(isLoading) {
        return;
    }

    if(isError) {
        return <div>Error: {errorMessage} {errorStatus}</div>
    }   

    if(!Array.isArray(subredditsData) || subredditsData.length === 0) {
        return <div>No subreddits available</div>
    }   

    return (
        <div className='Subreddits'>
            <ul>
            {subredditsData ? subredditsData.map((subreddit) => (<Subreddit key={subreddit.id} subreddit={subreddit} />)) : null}
            </ul> 
        </div>
    );
};

export default Subreddits;