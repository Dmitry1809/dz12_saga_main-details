import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchListRequest, fetchListSuccess, fetchListFailure } from './serviceListSlice';
import { fetchDetailsRequest, fetchDetailsSuccess, fetchDetailsFailure } from './serviceDetailsSlice';

const BASE_URL = 'http://localhost:7070/api/services';

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    // Если статус не 200-299 (например, наш случай с 500 ошибкой от сервера)
    throw new Error('Произошла ошибка при загрузке данных с сервера!');
  }
  return await response.json();
}

function* handleFetchListSaga() {
  try {
    const data = yield call(fetchData, BASE_URL);
    yield put(fetchListSuccess(data));
  } catch (error) {
    yield put(fetchListFailure(error.message));
  }
}

function* handleFetchDetailsSaga(action) {
  try {
    const id = action.payload;
    const data = yield call(fetchData, `${BASE_URL}/${id}`);
    yield put(fetchDetailsSuccess(data));
  } catch (error) {
    yield put(fetchDetailsFailure(error.message));
  }
}

export function* watchServicesSagas() {
  yield takeLatest(fetchListRequest.type, handleFetchListSaga);
  yield takeLatest(fetchDetailsRequest.type, handleFetchDetailsSaga);
}
