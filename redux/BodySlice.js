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
    filterVideos: (state, action) => {
      state.filteredVideos = state.allVideos.filter((video) =>
        video.snippet.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setSearchedVideos: (state, action) => {
      state.searchedVideos = action.payload;
    },
  },
});

export const {
  setAllVideos,
  setFilteredVideos,
  filterVideos,
  setSearchedVideos,
} = BodySlice.actions;
export default BodySlice.reducer;
