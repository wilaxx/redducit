import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice.js';
import subredditsReducer from '../features/subreddits/subredditsSlice.js';
import commentsReducer from '../features/comments/commentsSlice.js';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        subreddits: subredditsReducer,
        comments: commentsReducer

    }
});

export default store;