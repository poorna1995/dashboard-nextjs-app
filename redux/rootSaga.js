import { all, call } from "redux-saga/effects";
import pageDataSagas from "./pageData/pageData.sagas";

export default function* rootSaga() {
	// yield all([call(userSagas)]);
	yield all([call(pageDataSagas)]);
}
