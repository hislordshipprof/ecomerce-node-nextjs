import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userProfile = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserProfile } = userProfile.actions;

export default userProfile.reducer;
