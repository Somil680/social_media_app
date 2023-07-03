import { createSlice } from "@reduxjs/toolkit";

interface SiteState {
  like : number
}

const initialState: SiteState = {
  like : 0
}


const likeSlice = createSlice({
    name: "like",
    initialState ,
    reducers: {
        IncrementLikes: (state) => {
             state.like += 1
          },
        DiscernmentLikes: (state) => {
             state.like -= 1
          }
    }
})
export const { IncrementLikes, DiscernmentLikes } = likeSlice.actions
export const selectCount  = (state:any) => state.like.like

export default likeSlice.reducer