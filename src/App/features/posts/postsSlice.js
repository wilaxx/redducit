import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    posts : [],
    isError: false,
    errorMessage: '',
    errorStatus: ''
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
    	const status = error.status || 'Unknown Status';
		const message = error.message || 'Unknown Error';
        throw { status, message };
    }
});




const postsSlice = createSlice({
	name: 'posts',
	initialState,
	extraReducers: {
		[fetchPosts.pending]: (state) => {
      		state.isLoading = true;
      		state.isError = false;
    },
    	[fetchPosts.fulfilled]: (state, action) => {
      		state.isLoading = false;
      		state.isError = false;
      		state.posts= action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {

      		state.isLoading = false;
      		state.isError = true;
      		state.errorMessage = action.error.message;
      		state.errorStatus = action.error.status
    }


	}

})

export default postsSlice.reducer