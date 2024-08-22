import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery, delay, put, takeLatest } from "@redux-saga/core/effects";
import { increment, incrementSaga, incrementSuccces } from "@/redux/counter";
import { COUNTER } from "@/types/saga.type";

export function* log(action: PayloadAction) {
  //   console.log('action', action);
}

export function* logSaga(action: PayloadAction<number>) {
  console.log("waiting 1s");

  yield delay(1000);
  console.log("done", action);

  yield put(incrementSuccces(action.payload));
}

function* handleCounterSaga() {
  // yield takeEvery(increment, log);
  // yield takeEvery('*', log);

  // yield takeEvery(incrementSaga, logSaga);
  yield takeLatest(incrementSaga, logSaga);
}

export default function* counterSaga() {
  yield takeEvery(COUNTER.FETCH_COUNTER, handleCounterSaga);
}
