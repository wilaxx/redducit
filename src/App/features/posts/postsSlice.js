import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    isLoading: false,
    posts: [],
    isError: false,
    errorMessage: '',
    errorStatus: '',
    subreddit: '',
    searchTerm: ''
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (url) => {
        const response = await fetch(url);
        const json = await response.json();
        const posts = json.data.children;
        const postsData = await posts.map(post => post.data);
        return postsData;  
});




const postsSlice = createSlice({
	name: 'posts',
	initialState,
  reducers: {
    setSearchTerm: (state, action) => {
        state.searchTerm = action.payload;
    }},
	extraReducers: (builder) => {
        builder
          .addCase(fetchPosts.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.posts = action.payload;
          })
          .addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
          });
      }
      

})

export const selectPostsState = state => state.posts;
export const selectSubreddit = state => state.posts
export const { setSearchTerm } = postsSlice.actions;
export default postsSlice.reducer