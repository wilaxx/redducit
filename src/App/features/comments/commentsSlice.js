import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
		isLoading: false,
		comments : [],
		isError: false,
		errorMessage: '',
		errorStatus: ''
}

export const fetchComments = createAsyncThunk('comments/fetchComments', async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        const comments = await response.json();
        return comments;
    } catch (error) {
    	const status = error.status || 'Unknown Status';
		const message = error.message || 'Unknown Error';
        throw { status, message };
    }
});




const CommentsSlice = createSlice({
	name: 'comments',
	initialState,
	extraReducers: {
		[fetchComments.pending]: (state) => {
      		state.isLoading = true;
      		state.isError = false;
    },
    	[fetchComments.fulfilled]: (state, action) => {
      		state.isLoading = false;
      		state.isError = false;
      		state.comments= action.payload;
    },
    [fetchComments.rejected]: (state, action) => {

      		state.isLoading = false;
      		state.isError = true;
      		state.errorMessage = action.error.message;
      		state.errorStatus = action.error.status
    }


	}

})

export default commentsSlice.reducer