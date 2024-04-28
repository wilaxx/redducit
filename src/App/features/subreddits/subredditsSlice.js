import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
		isLoading: false,
		subreddits : [],
		selectedSubreddit : '',
		isError: false,
		errorMessage: '',
		errorStatus: ''
}

export const fetchSubreddits = createAsyncThunk('subreddits/fetchSubreddits', async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch subreddits');
        }
        const subreddits = await response.json();
        return subreddits;
    } catch (error) {
    	const status = error.status || 'Unknown Status';
		const message = error.message || 'Unknown Error';
        throw { status, message };
    }
});




const subredditsSlice = createSlice({
	name: 'subreddits',
	initialState,
	extraReducers: {
		[fetchSubreddits.pending]: (state) => {
      		state.isLoading = true;
      		state.isError = false;
    },
    	[fetchSubreddits.fulfilled]: (state, action) => {
      		state.isLoading = false;
      		state.isError = false;
      		state.subreddits= action.payload;
    },
    [fetchSubreddits.rejected]: (state, action) => {

      		state.isLoading = false;
      		state.isError = true;
      		state.errorMessage = action.error.message;
      		state.errorStatus = action.error.status
    }


	}

})

export default subredditsSlice.reducer