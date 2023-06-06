import { configureStore } from "@reduxjs/toolkit";
import userProfile from "../slicies/userProfile";

export const store = configureStore({
  reducer: {
    user: userProfile,
  },
});
