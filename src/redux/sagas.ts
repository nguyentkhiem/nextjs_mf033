import { adminGroup } from "./admin/group";
import { all, fork } from "@redux-saga/core/effects";
import { authSaga } from "@/redux/auth";
import { counterSaga } from "@/redux/counter";
import { authSagaAdmin } from "./admin/auth";
import { adminSaga } from "./admin/users";
import { homeSaga } from "./home";
import donorSaga from "./donor/saga";
import group from "./group/saga";
import adminCaseListSaga from "./admin/case-list/saga";
import slideSaga from "./analysis-results/saga";

export default function* rootSaga() {
  yield all([
    fork(counterSaga),
    fork(authSaga),
    fork(authSagaAdmin),
    fork(adminSaga),
    fork(homeSaga),
    fork(donorSaga),
    fork(group),
    fork(adminGroup),
    fork(adminCaseListSaga),
    fork(slideSaga),
  ]);
}
