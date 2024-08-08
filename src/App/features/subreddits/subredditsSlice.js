import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
		isLoading: false,
		subreddits: [],
		isError: false,
		filteredSubreddit: '',
		selectedSubredditImage: '',
		errorMessage: '',
		errorStatus: ''
}

export const fetchSubreddits = createAsyncThunk('subreddits/fetchSubreddits', async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch subreddits');
        }
        const json = await response.json();
		const subreddits = await json.data.children;
		const subredditsData = await subreddits.map(subreddit => subreddit.data);
        return subredditsData;
    } catch (error) {
        return error;
    }
});


const subredditsSlice = createSlice({
	name: 'subreddits',
	initialState,
	reducers: {
		selectSubreddit: (state, action) => {
			state.filteredSubreddit = action.payload.name;
			state.selectedSubredditImage = action.payload.url;
		  }
	},
	extraReducers: (builder) => {
		builder
		  .addCase(fetchSubreddits.pending, (state) => {
			state.isLoading = true;
			state.isError = false;
		  })
		  .addCase(fetchSubreddits.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isError = false;
			state.subreddits = action.payload;
		  })
		  .addCase(fetchSubreddits.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.error.message;
			state.errorStatus = action.error.status;
		  });
	  }
	  

})
export const { selectSubreddit } = subredditsSlice.actions;
export const selectSubredditsState = state => state.subreddits;
export const selectFilteredSubreddit = state => state.subreddits.filteredSubreddit;
export const selectSelectedSubredditImage = state => state.subreddits.selectedSubredditImage;
export default subredditsSlice.reducer;