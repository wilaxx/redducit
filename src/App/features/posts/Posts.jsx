import React, { useEffect } from 'react';
import Post from './Post.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredSubreddit } from '../subreddits/subredditsSlice.js';
import { fetchPosts, selectPostsState } from './postsSlice.js';
import './Posts.css';

const Posts = () => {
   
    const dispatch = useDispatch();
    const postsState = useSelector(selectPostsState);
    const selectedSubreddit = useSelector(selectFilteredSubreddit);
    const { isLoading, isError, errorMessage, errorStatus } = postsState;

    const postsData = postsState.posts;

    

    let searchTerm = useSelector(state => state.posts.searchTerm);
    

    useEffect(() => {
        const POSTS_URL = `https://www.reddit.com/${selectedSubreddit}.json?limit=100`;
        dispatch(fetchPosts(POSTS_URL));
    }, [selectedSubreddit, dispatch])

    
    useEffect(() => {
        if (searchTerm !== '') {
            const SEARCH_URL = `https://www.reddit.com/search.json?q=${searchTerm}`;
            dispatch(fetchPosts(SEARCH_URL));
        }
    }, [searchTerm, dispatch]);

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error: {errorMessage} {errorStatus}</div>
    }

    if(postsData.length === 0) {
        return <div>No posts available</div>
    }

    return (
        <div className='Posts'>
            {postsData.map(post => <Post key={post.id} post={post} />)}        
        </div>
    );
};

export default Posts;
