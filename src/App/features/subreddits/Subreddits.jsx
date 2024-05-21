import React, { useEffect } from 'react';
import Subreddit from './Subreddit';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubredditsState, selectFilteredSubreddit } from './subredditsSlice';
import { fetchSubreddits } from './subredditsSlice';
import './Subreddits.css';


const Subreddits = () => {

    const subredditsState = useSelector(selectSubredditsState);

    const { isLoading, isError, errorMessage, errorStatus } = subredditsState;

    const subredditsData = subredditsState.subreddits;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSubreddits('https://www.reddit.com/subreddits.json'));
    }, []); 

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error: {errorMessage} {errorStatus}</div>
    }   

    if(subredditsData.length === 0) {
        return <div>No subreddits available</div>
    }   

    return (
        <div className='Subreddits'>
            <ul>
            {subredditsData.map((subreddit) => (<Subreddit key={subreddit.id} subreddit={subreddit} />))}
            </ul> 
        </div>
    );
};

export default Subreddits;