import { createSlice } from "@reduxjs/toolkit";

const BodySlice = createSlice({
  name: "body",
  initialState: {
    homePageVideos: [],
    searchedVideos: [],
  },
  reducers: {
    setHomePageVideos: (state, action) => {
      state.homePageVideos = action.payload;
    },
    setSearchedVideos: (state, action) => {
      state.searchedVideos = action.payload;
    },
  },
});

export const { setHomePageVideos, setSearchedVideos } = BodySlice.actions;
export default BodySlice.reducer;
