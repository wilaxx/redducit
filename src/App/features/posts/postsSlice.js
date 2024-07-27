import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    isLoading: false,
    posts: [],
    isError: false,
    errorMessage: '',
    errorStatus: '',
    searchTerm: '',
    selectedCommentId: null,
}


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (url) => {
        const response = await fetch(url, {
          headers: {
              'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
          }
      });
        const json = await response.json();
        const posts = json.data.children;
        const prePostsData = await posts.map(post => post.data);
        const postsData = prePostsData.map(post => ({
          ...post,
          showingComments: false,
          comments: [],
          errorComments: false,
          loadingComments: false
      }));

        return postsData;  
});

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (permalink, { dispatch, getState }) => {
    dispatch(setLoadingComments(true));
    const response = await fetch(`https://www.reddit.com${permalink}.json`);
    const json = await response.json();
    const children = json[1].data.children;
    const filteredChildren = children[children.length - 1].kind === "more" ? children.slice(0, -1) : children;
    
    const commentsData = filteredChildren.map((c) => c.data);
    dispatch(setComments({ postId: permalink.split('/')[4], comments: commentsData }));
    dispatch(setLoadingComments(false));
    dispatch(toggleComments(permalink.split('/')[4]));
    return commentsData;
  }
);




const postsSlice = createSlice({
	name: 'posts',
	initialState,
  reducers: {
      setSearchTerm: (state, action) => {
        state.searchTerm = action.payload;
      },
      setLoadingComments: (state, action) => {
        state.loadingComments = action.payload;
      },
      setComments: (state, action) => {
        const post = state.posts.find(post => post.id === action.payload.postId);
        if (post) {
            post.comments = action.payload.comments;
        }
      },
      toggleComments: (state, action) => {
        const post = state.posts.find(post => post.id === action.payload);
        if (post) {
            post.showingComments = !post.showingComments;
        }
      },
      selectComment: (state, action) => {
        state.selectedCommentId = action.payload;
      }
    },
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
          })
          .addCase(fetchComments.pending, (state, action) => {
            const post = state.posts.find(post => post.permalink === action.meta.arg);
            if (post) {
              post.loadingComments = true;
              post.errorComments = false;
            }
          })
          .addCase(fetchComments.fulfilled, (state, action) => {
            const post = state.posts.find(post => post.permalink === action.meta.arg);
            if (post) {
              post.comments = action.payload;
              post.loadingComments = false;
            }
          })
          .addCase(fetchComments.rejected, (state, action) => {
            const post = state.posts.find(post => post.permalink === action.meta.arg);
            if (post) {
              post.loadingComments = false;
              post.errorComments = true;
            }
          })
      }
      

})

export const selectPostsState = state => state.posts;
export const selectSearchTerm = state => state.posts.searchTerm;
export const { setSearchTerm, setLoadingComments, setComments, toggleComments, selectComment } = postsSlice.actions;
export default postsSlice.reducer