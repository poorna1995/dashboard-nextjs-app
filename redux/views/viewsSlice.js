import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	sectionLoading: false,
};

export const viewsSlice = createSlice({
	name: "views",
	initialState,
	reducers: {
		setSectionLoading(state, action) {
			state.sectionLoading = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setSectionLoading } = viewsSlice.actions;

export default viewsSlice.reducer;
