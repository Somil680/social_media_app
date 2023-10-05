// profileSlice.js
import { API_BASE_URL } from '@/services/constant';
import { getUserById } from '@/services/services';
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { useSession } from 'next-auth/react';

// Define an initial state

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
export const fetchUserData = createAsyncThunk('fetchUserData', async (id :any) => {
    try {
    const { res, err } = await getUserById(id)
    if (!res || err) throw new Error('fetch Failed')
    const data = await res.json()
    return data
  } catch (error) {
    throw error;
  }
});

// Create a slice with reducers
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
