import { getAllPost } from '@/services/services';
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
interface UserData {
    data: any
    loading: boolean
    error : any
    
}
const initialState : UserData = {
  data: null,
  loading: false,
  error: null ,
};

// Define an asynchronous thunk action for fetching data
export const fetchFeedData = createAsyncThunk('fetchFeedData', async () => {
    try {
    const { res, err } = await getAllPost()
    if (!res || err) throw new Error('fetch Failed')
      const { posts } = await res.json()
  //     for (let i = posts.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
  //   // Swap elements at i and j
  //   [posts[i], posts[j]] = [posts[j], posts[i]];
  // }
          const post = posts.slice().reverse()
    return post
  } catch (error) {
    throw error;
  }
});

// Create a slice with reducers
const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchFeedData.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message;
      });
  },
});

export default feedSlice.reducer;
