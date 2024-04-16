import { createSlice } from "@reduxjs/toolkit";

const HeaderSlice = createSlice({
  name: "header",
  initialState: {
    searchInput: "",
  },
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
  },
});

export const { setSearchInput } = HeaderSlice.actions;
export default HeaderSlice.reducer;
