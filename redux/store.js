import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice from "./SidebarSlice";
import HeaderSlice from "./HeaderSlice";
import BodySlice from "./BodySlice";
import SearchSlice from "./SearchSlice";

const store = configureStore({
  reducer: {
    sidebarSlice: SidebarSlice,
    headerSlice: HeaderSlice,
    bodySlice: BodySlice,
    searchSlice: SearchSlice
  },
});

export default store;
