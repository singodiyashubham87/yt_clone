import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice from "./SidebarSlice";
import HeaderSlice from "./HeaderSlice";
import BodySlice from "./BodySlice";

const store = configureStore({
  reducer: {
    sidebarSlice: SidebarSlice,
    headerSlice: HeaderSlice,
    bodySlice: BodySlice,
  },
});

export default store;
