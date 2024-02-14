import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	pageData: [],
	comparisonData: {},
};

export const pageDataSlice = createSlice({
	name: "pageData",
	initialState,
	reducers: {
		fetchPageDataStart(state, action) {},
		setPageData(state, action) {
			state.pageData = action.payload;
		},
		fetchComparisonDataStart(state, action) {},
		setComparisonData(state, action) {
			state.comparisonData = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	fetchPageDataStart,
	setPageData,
	fetchComparisonDataStart,
	setComparisonData,
} = pageDataSlice.actions;

export default pageDataSlice.reducer;
