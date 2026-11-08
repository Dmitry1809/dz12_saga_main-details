import { all } from 'redux-saga/effects';
import { watchServicesSagas } from './servicesSagas';

export default function* rootSaga() {
  yield all([
    watchServicesSagas(),
  ]);
}
