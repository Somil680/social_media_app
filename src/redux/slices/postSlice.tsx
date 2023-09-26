import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface SiteState {
  isLiked: Item[];
  isBookmark: Item[];
}

const initialState: SiteState = {
  isLiked : [],
  isBookmark : []
}

interface Item {
  _id: string;
}



const PostSlice = createSlice({
    name: "postSlice",
    initialState ,
  reducers: {
    LikedBy: (state, action:PayloadAction<Item>) => {
      state.isLiked.push(action.payload);
    },
    DisLikedBy: (state, action:PayloadAction<string>) => {
      state.isLiked = state.isLiked.filter(item => item._id !== action.payload)
    },
    BookmarkBy: (state, action:PayloadAction<Item>) => {
      state.isBookmark.push(action.payload);
    },
    RemoveBookmark: (state, action:PayloadAction<string>) => {
      state.isBookmark = state.isBookmark.filter(item => item._id !== action.payload)
    }
    }
}

)
export const { LikedBy , DisLikedBy , BookmarkBy , RemoveBookmark } = PostSlice.actions
// export const selectCount  = (state:any) => state.like.like

export default PostSlice.reducer