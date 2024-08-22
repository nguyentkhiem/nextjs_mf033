import i18n from "@/app/i18n";
import {
  getListUserSuccess,
  getOverViewSuccess,
  getUserDetailSuccess,
  getUserList,
  loading,
} from "@/redux/admin/users";
import { DeleteDonorResponse } from "@/redux/donor/actions-types";
import { startLoading, stopLoading } from "@/redux/loading";
import AdminServices from "@/services/admin.services";
import { Action, Response } from "@/types/auth.type";
import { ADMIN } from "@/types/saga.type";
import { notification } from "antd";
import { AxiosResponse, HttpStatusCode } from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { userGetGroupUserListRequest } from "../group/actions";
import { setIsDeleteUserSuccess } from "../group";

function* adminGetUserList(action: Action.AdminGetUserListAction) {
  yield put(getUserList(action.payload));
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<Response.AdminGetUserList> =
      yield AdminServices.adminGetUserList({
        params: action.payload,
      });
    if (response.data?.data) {
      yield put(getListUserSuccess(response.data.data));
    }
  } catch (error: any) {
  } finally {
    yield put(stopLoading([]));
    yield put(loading(false));
  }
}

function* adminGetUserDetail(action: Action.AdminGetUserDetailAction) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<Response.AdminGetUserDetail> =
      yield AdminServices.adminGetUserDetail({
        params: action.payload,
      });
    if (response.data?.data) {
      yield put(getUserDetailSuccess(response.data.data));
    }
  } catch (error: any) {
  } finally {
    yield put(stopLoading([]));
    yield put(loading(false));
  }
}

function* adminGetOverview(action: any) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<Response.AdminGetOverview> =
      yield AdminServices.adminGetOverview({
        params: action.payload,
      });
    yield put(getOverViewSuccess(response.data.data));
  } catch (error: any) {
  } finally {
    yield put(stopLoading([]));
    yield put(loading(false));
  }
}

function* handleUserDeleteUser(action: any) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<DeleteDonorResponse> =
      yield AdminServices.deleteUser({
        params: action.payload,
      });
    notification.success({
      key: "handleUserDeleteUserSuccess",
      message: i18n.t("common.success"),
      description: "Delete user success",
    });
    yield put({
      type: ADMIN.GET_USER_LIST,
      payload: {
        limit: 20,
        page: 1,
        keyword: undefined,
        filter: undefined,
      },
    });
    // yield put(
    //   userGetGroupUserListRequest({
    //     page: 1,
    //     limit: 20,
    //     id: action.payload.organizationId,
    //   })
    // );
    yield put(setIsDeleteUserSuccess(true));
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "handleUserDeleteUser",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading([]));
    yield put(loading(false));
  }
}

export default function* adminSaga() {
  yield takeEvery(ADMIN.GET_USER_LIST, adminGetUserList);
  yield takeEvery(ADMIN.GET_USER_DETAIL, adminGetUserDetail);
  yield takeEvery(ADMIN.GET_OVERVIEW, adminGetOverview);
  yield takeEvery(ADMIN.DELETE_USERS, handleUserDeleteUser);
}
