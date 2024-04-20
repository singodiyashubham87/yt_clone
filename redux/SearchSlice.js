import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    setSearchCache: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

export const { setSearchCache } = SearchSlice.actions;
export default SearchSlice.reducer;
