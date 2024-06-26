import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../App/features/posts/postsSlice.js';
import subredditsReducer from '../App/features/subreddits/subredditsSlice.js';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        subreddits: subredditsReducer
    }
});

export default store;