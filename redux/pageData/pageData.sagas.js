import { takeLatest, call, all, put } from "redux-saga/effects";
import { setSectionLoading } from "redux/views/viewsSlice";
import { handleApiCalls } from "./pageData.helpers";
import {
	fetchComparisonDataStart,
	fetchPageDataStart,
	setComparisonData,
	setPageData,
} from "./pageDataSlice";

export function* fetchPageData({ payload: { url, data } }) {
	try {
		yield put(setSectionLoading(true));
		const pageData = yield handleApiCalls(url, data);
		console.log(pageData, "inside saga");
		yield put(setPageData(pageData));
		yield put(setSectionLoading(false));
	} catch (error) {
		console.log(error);
		// yield put(setErrorMessage(error));
	}
}

export function* onFetchPageDataStart() {
	yield takeLatest(fetchPageDataStart.type, fetchPageData);
}
export function* fetchComparisonData({ payload: { url, data } }) {
	try {
		yield put(setSectionLoading(true));
		const pageData = yield handleApiCalls(url, data);
		console.log(pageData, "inside saga");
		yield put(setComparisonData(pageData));
		yield put(setSectionLoading(false));
	} catch (error) {
		console.log(error);
		// yield put(setErrorMessage(error));
	}
}

export function* onFetchComparisonDataStart() {
	yield takeLatest(fetchComparisonDataStart.type, fetchComparisonData);
}

export default function* pageDataSagas() {
	yield all([call(onFetchPageDataStart), call(onFetchComparisonDataStart)]);
}
