import { loginLoading } from "@/redux/auth";
import { put, takeEvery } from "redux-saga/effects";

import i18n from "@/app/i18n";
import HomeServices from "@/services/home.services";
import { notification } from "antd";
import { AxiosResponse, HttpStatusCode } from "axios";
import {
  getDonorDetailSuccess,
  getDonorList,
  getDonorListSuccess,
  getSharedUserDataSuccess,
} from ".";
import {
  GetDonorDetailResponse,
  GetDonorListResponse,
  GetSharedUserDataResponse,
  USER_GET_DONOR_DETAIL_REQUEST,
  USER_GET_DONOR_LIST_REQUEST,
  USER_GET_SHARED_USER_DATA_REQUEST,
  UserGetDonorDetailRequest,
  UserGetDonorListRequest,
  UserGetSharedUserDataRequest,
} from "./actions-types";
import { startLoading, stopLoading } from "../loading";

function* handleUserGetDonorList(action: UserGetDonorListRequest) {
  if (action.payload.keyword?.length === 0) {
    yield put(startLoading({}));
  }
  // yield put(startLoading({}));
  yield put(getDonorList(action.payload));
  try {
    const response: AxiosResponse<GetDonorListResponse> =
      yield HomeServices.getDonorList({
        params: action.payload,
      });
    yield put(getDonorListSuccess(response.data));
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "get-donor-list-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleUserGetDonorDetail(action: UserGetDonorDetailRequest) {
  // yield put(startLoading({}));
  try {
    const response: AxiosResponse<GetDonorDetailResponse> =
      yield HomeServices.getDonorDetail({
        params: action.payload,
      });
    yield put(getDonorDetailSuccess(response.data));
  } catch (error: any) {
    // if(error)
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "get-donor-detail-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    // yield put(stopLoading({}));
    // yield put(loginLoading(false));
  }
}
function* handleUserGetSharedUserData(action: UserGetSharedUserDataRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<GetSharedUserDataResponse> =
      yield HomeServices.getSharedUserData({
        params: action.payload,
      });
    yield put(getSharedUserDataSuccess(response.data));
  } catch (error: any) {
    // if(error)
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "get-donor-detail-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

export default function* homeSaga() {
  yield takeEvery(USER_GET_DONOR_LIST_REQUEST, handleUserGetDonorList);
  yield takeEvery(USER_GET_DONOR_DETAIL_REQUEST, handleUserGetDonorDetail);
  yield takeEvery(
    USER_GET_SHARED_USER_DATA_REQUEST,
    handleUserGetSharedUserData
  );
}
