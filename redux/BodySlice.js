import { createSlice } from "@reduxjs/toolkit";

const BodySlice = createSlice({
  name: "body",
  initialState: {
    allVideos: [],
    filteredVideos: [],
    searchedVideos: [],
  },
  reducers: {
    setAllVideos: (state, action) => {
      state.allVideos = action.payload;
    },
    setFilteredVideos: (state, action) => {
      state.filteredVideos = action.payload;
    },
    setSearchedVideos: (state, action) => {
      state.searchedVideos = action.payload;
    },
  },
});

export const { setAllVideos, setFilteredVideos, setSearchedVideos } =
  BodySlice.actions;
export default BodySlice.reducer;
