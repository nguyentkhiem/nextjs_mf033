import { loginLoading } from "@/redux/auth";
import { put, takeEvery } from "redux-saga/effects";

import i18n from "@/app/i18n";
import HomeServices from "@/services/home.services";
import { notification } from "antd";
import { AxiosResponse, HttpStatusCode } from "axios";
import { getDonorDetailSuccess, getDonorList, getDonorListSuccess } from ".";
import {
  GetDonorDetailResponse,
  GetDonorListResponse,
  ADMIN_GET_DONOR_DETAIL_REQUEST,
  ADMIN_GET_DONOR_LIST_REQUEST,
  AdminGetDonorDetailRequest,
  AdminGetDonorListRequest,
  ADMIN_DELETE_DONOR_REQUEST,
} from "./actions-types";
import { startLoading, stopLoading } from "@/redux/loading";
import AdminServices from "@/services/admin.services";
import {
  DeleteDonorResponse,
  USER_DELETE_DONOR_REQUEST,
  UserDeleteDonorRequest,
} from "@/redux/donor/actions-types";
import { adminGetDonorListRequest } from "./actions";

function* handleAdminGetDonorList(action: AdminGetDonorListRequest) {
  // yield put(startLoading({}));
  yield put(getDonorList(action.payload));
  try {
    const response: AxiosResponse<GetDonorListResponse> =
      yield AdminServices.getDonorList({
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
    // yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleAdminGetDonorDetail(action: AdminGetDonorDetailRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<GetDonorDetailResponse> =
      yield AdminServices.getDonorDetail({
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
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleUserDeleteDonor(action: UserDeleteDonorRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<DeleteDonorResponse> =
      yield AdminServices.deleteDonor({
        params: action.payload,
      });
    notification.success({
      key: "delete-donor-success",
      message: i18n.t("common.success"),
      description: "Delete donor success",
    });
    yield put(adminGetDonorListRequest({ page: 1, limit: 20 }));
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "delete-donor-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

export default function* adminCaseListSaga() {
  yield takeEvery(ADMIN_GET_DONOR_LIST_REQUEST, handleAdminGetDonorList);
  yield takeEvery(ADMIN_GET_DONOR_DETAIL_REQUEST, handleAdminGetDonorDetail);
  yield takeEvery(ADMIN_DELETE_DONOR_REQUEST, handleUserDeleteDonor);
}
