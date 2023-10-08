import { getAllUser } from '@/services/services';
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
export const fetchAllUserData = createAsyncThunk('fetchAllUserData', async (_id : any) => {
    try {
    const { res, err } = await getAllUser()
    if (!res || err) throw new Error('fetch Failed')
        const { users } = await res.json()
         const filterData = users.filter(
      (item: any) => item._id !== _id
    )
    return users
  } catch (error) {
    throw error;
  }
});

// Create a slice with reducers
const usersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAllUserData.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
