import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser(state, action) {
      state.currentUser = action.payload;
    },
    signOutUser(state, action) {
      state.currentUser = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
