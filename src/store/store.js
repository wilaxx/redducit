import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../App/features/posts/postsSlice.js';
import subredditsReducer from '../App/features/subreddits/subredditsSlice.js';
import commentsReducer from '../App/features/comments/commentsSlice.js';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        subreddits: subredditsReducer,
        comments: commentsReducer

    }
});

export default store;