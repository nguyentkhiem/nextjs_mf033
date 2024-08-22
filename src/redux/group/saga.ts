import { loginLoading } from "@/redux/auth";
import { put, takeEvery } from "redux-saga/effects";

import i18n from "@/app/i18n";
import HomeServices from "@/services/home.services";
import { notification } from "antd";
import { AxiosResponse, HttpStatusCode } from "axios";

import { startLoading, stopLoading } from "../loading";

import {
  UserGetGroupUserListRequest,
  GetGroupUserListResponse,
  UserGetGroupUserDetailRequest,
  GetGroupUserDetailResponse,
  USER_GET_GROUP_USER_DETAIL_REQUEST,
  USER_GET_GROUP_USER_LIST_REQUEST,
  UserDelegateAdminRequest,
  DelegateAdminResponse,
  UserDeleteUserRequest,
  DeleteUserResponse,
  USER_DELEGATE_ADMIN_REQUEST,
  USER_DELETE_USER_REQUEST,
  UpdateOrganizationUserRequest,
  UpdateUserResponse,
  UPDATE_GROUP_MEMBER_DETAIL_REQUEST,
} from "./actions-types";
import {
  getGroupUserDetailSuccess,
  getGroupUserList,
  getGroupUserListSuccess,
  loadMorePathologyList,
  setDelegateAdminSuccess,
  setDeleteUserSuccess,
  setPathologyList,
} from ".";
import GroupServices from "@/services/group.services";
import { userGetGroupUserDetailRequest } from "./actions";
import { setIsEditingMember } from "../admin/group";

function* handleUserGetGroupUserList(action: UserGetGroupUserListRequest) {
  // yield put(startLoading({}));
  yield put(getGroupUserList(action.payload));
  try {
    const response: AxiosResponse<GetGroupUserListResponse> =
      yield GroupServices.getGroupUserList({
        params: action.payload,
      });
    const filter = JSON.parse(action.payload.filter || "{}");
    if (filter.role === "PATHOLOGIST") {
      yield put(setPathologyList(response.data.data.items));
    } else {
      yield put(getGroupUserListSuccess(response.data));
    }

    if (action.payload.page > 1) {
      yield put(loadMorePathologyList(response.data.data.items));
    }
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

function* handleUserGetGroupUserDetail(action: UserGetGroupUserDetailRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<GetGroupUserDetailResponse> =
      yield GroupServices.getGroupUserDetail({
        params: action.payload,
      });
    yield put(getGroupUserDetailSuccess(response.data));
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

function* handleUserDelegateAdmin(action: UserDelegateAdminRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<DelegateAdminResponse> =
      yield GroupServices.delegateAdmin({
        params: action.payload,
      });
    yield put(userGetGroupUserDetailRequest({ id: action.payload.userId }));
    yield put(setDelegateAdminSuccess(true));
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

function* handleUserDeleteUser(action: UserDeleteUserRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<DeleteUserResponse> =
      yield GroupServices.deleteUser({
        params: action.payload,
      });

    yield put(setDeleteUserSuccess(true));
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

function* handleUserUpdateOrganizationUser(
  action: UpdateOrganizationUserRequest
) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<UpdateUserResponse> =
      yield GroupServices.updateOrganizationUser({
        params: action.payload,
      });
    yield put(userGetGroupUserDetailRequest({ id: action.payload.id }));
    yield put(setIsEditingMember(false));
    notification.success({
      key: "update-organization-user-success",
      message: i18n.t("common.success"),
      description: "Update organization user success",
    });
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
  yield takeEvery(USER_GET_GROUP_USER_LIST_REQUEST, handleUserGetGroupUserList);
  yield takeEvery(
    USER_GET_GROUP_USER_DETAIL_REQUEST,
    handleUserGetGroupUserDetail
  );
  yield takeEvery(USER_DELEGATE_ADMIN_REQUEST, handleUserDelegateAdmin);
  yield takeEvery(USER_DELETE_USER_REQUEST, handleUserDeleteUser);
  yield takeEvery(
    UPDATE_GROUP_MEMBER_DETAIL_REQUEST,
    handleUserUpdateOrganizationUser
  );
}
