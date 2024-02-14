import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userSlice from "./user/userSlice";
import filtersSlice from "./filters/filtersSlice";
import pageDataSlice from "./pageData/pageDataSlice";
import viewsSlice from "./views/viewsSlice";

export const rootReducer = combineReducers({
	user: userSlice,
	filters: filtersSlice,
	pageData: pageDataSlice,
	views: viewsSlice,
});

const configStorage = {
	key: "root",
	storage,
	whitelist: ["user"],
};

export default persistReducer(configStorage, rootReducer);
