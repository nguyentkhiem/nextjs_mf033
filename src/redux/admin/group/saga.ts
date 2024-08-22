import { loginLoading } from "@/redux/auth";
import { put, takeEvery } from "redux-saga/effects";

import i18n from "@/app/i18n";
import { notification } from "antd";
import { AxiosResponse, HttpStatusCode } from "axios";

import { startLoading, stopLoading } from "@/redux/loading";
import GroupServices from "@/services/group.services";

import {
  getGroupListRequest,
  getGroupListSuccess,
  getGroupUserDetailSuccess,
  getGroupUserList,
  getGroupUserListSuccess,
  setDelegateAdminSuccess,
  setDeleteUserSuccess,
  setError,
  setIsCreateOrganizationSuccess,
  setIsCreateUserSuccess,
  setIsDelegateUserSuccess,
  setIsDeleteOrganizationSuccess,
  setIsEditingMember,
  setIsRemoveFromAdminSuccess,
  setIsUpdateOrganizationSuccess,
  setOrganizationDetail,
} from ".";
import {
  ADMIN_CREATE_ORGANIZATION_REQUEST,
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_DELEGATE_USER_REQUEST,
  ADMIN_DELETE_ORGANIZATION_REQUEST,
  ADMIN_GET_GROUP_LIST_REQUEST,
  ADMIN_GET_ORGANIZATION_DETAIL_REQUEST,
  ADMIN_REMOVE_FROM_ADMIN_REQUEST,
  ADMIN_UPDATE_GROUP_MEMBER_DETAIL_REQUEST,
  ADMIN_UPDATE_ORGANIZATION_REQUEST,
  AdminCreateOrganizationRequest,
  AdminCreateUserRequest,
  AdminDelegateUserRequest,
  AdminDeleteOrganizationRequest,
  AdminGetGroupListRequest,
  AdminGetOrganizationDetailRequest,
  AdminRemoveFromAdminRequest,
  AdminUpdateOrganizationRequest,
  AdminUpdateUserRequest,
  CreateOrganizationResponse,
  CreateUserResponse,
  DelegateAdminResponse,
  DelegateUserResponse,
  DeleteOrganizationResponse,
  DeleteUserResponse,
  GetGroupListResponse,
  GetGroupUserDetailResponse,
  GetGroupUserListResponse,
  GetOrganizationDetailResponse,
  RemoveFromAdminResponse,
  USER_DELEGATE_ADMIN_REQUEST,
  USER_DELETE_USER_REQUEST,
  USER_GET_GROUP_USER_DETAIL_REQUEST,
  USER_GET_GROUP_USER_LIST_REQUEST,
  UpdateOrganizationResponse,
  UpdateUserResponse,
  UserDelegateAdminRequest,
  UserDeleteUserRequest,
  UserGetGroupUserDetailRequest,
  UserGetGroupUserListRequest,
} from "./actions-types";
import { userGetGroupList, userGetGroupUserDetailRequest } from "./actions";

function* handleUserGetGroupUserList(action: UserGetGroupUserListRequest) {
  // yield put(startLoading({}));
  yield put(getGroupUserList(action.payload));
  try {
    const response: AxiosResponse<GetGroupUserListResponse> =
      yield GroupServices.adminGetGroupDetail({
        params: action.payload,
      });
    yield put(getGroupUserListSuccess(response.data));
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
      yield GroupServices.adminGetGroupUserDetail({
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

function* handleAdminGetGroupList(action: AdminGetGroupListRequest) {
  // yield put(startLoading({}));
  yield put(getGroupListRequest(action.payload));
  try {
    const response: AxiosResponse<GetGroupListResponse> =
      yield GroupServices.getGroupList({
        params: action.payload,
      });

    yield put(getGroupListSuccess(response.data));
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

function* handleAdminCreateUser(action: AdminCreateUserRequest) {
  yield put(startLoading({}));
  yield put(getGroupListRequest(action.payload));
  try {
    const response: AxiosResponse<CreateUserResponse> =
      yield GroupServices.adminCreateUser({
        params: action.payload,
      });
    // console.log("response.data", response.data);

    yield put(setIsCreateUserSuccess(true));
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

function* handleAdminDelegateUser(action: AdminDelegateUserRequest) {
  yield put(startLoading({}));
  yield put(getGroupListRequest(action.payload));
  try {
    const response: AxiosResponse<DelegateUserResponse> =
      yield GroupServices.adminDelegateUser({
        params: action.payload,
      });
    // console.log("response.data", response.data);

    yield put(setIsDelegateUserSuccess(true));
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

function* handleAdminRemoveFromAdmin(action: AdminRemoveFromAdminRequest) {
  yield put(startLoading({}));
  yield put(getGroupListRequest(action.payload));
  try {
    const response: AxiosResponse<RemoveFromAdminResponse> =
      yield GroupServices.removeFromAdmin({
        params: action.payload,
      });
    // console.log("response.data", response.data);

    yield put(setIsRemoveFromAdminSuccess(true));
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      if (
        error.response?.data?.error?.code ===
        "ORGANIZATION_MUST_HAVE_AT_LEAST_1_ADMIN"
      ) {
        yield put(setError(error.response?.data?.error));
      } else {
        notification.error({
          key: "get-donor-list-error",
          message: i18n.t("common.error"),
          description: error.response?.data?.error?.message,
        });
      }
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleAdminCreateOrganization(
  action: AdminCreateOrganizationRequest
) {
  yield put(startLoading({}));
  yield put(getGroupListRequest(action.payload));
  try {
    const response: AxiosResponse<CreateOrganizationResponse> =
      yield GroupServices.adminCreateOrganization({
        params: action.payload,
      });
    // console.log("response.data", response.data);

    yield put(setIsCreateOrganizationSuccess(true));
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

function* handleAdminDeleteOrganization(
  action: AdminDeleteOrganizationRequest
) {
  yield put(startLoading({}));
  yield put(getGroupListRequest(action.payload));
  try {
    const response: AxiosResponse<DeleteOrganizationResponse> =
      yield GroupServices.adminDeleteOrganization({
        params: action.payload,
      });
    // console.log("response.data", response.data);
    yield put(userGetGroupList({ page: 1, limit: 10 }));
    yield put(setIsDeleteOrganizationSuccess(true));
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

function* handleAdminUpdateOrganization(
  action: AdminUpdateOrganizationRequest
) {
  yield put(startLoading({}));
  yield put(getGroupListRequest(action.payload));
  try {
    const response: AxiosResponse<UpdateOrganizationResponse> =
      yield GroupServices.adminUpdateOrganization({
        params: action.payload,
      });
    // console.log("response.data", response.data);

    yield put(setIsUpdateOrganizationSuccess(true));
    notification.success({
      key: "update-organization-success",
      message: i18n.t("common.success"),
      description: i18n.t("common.update-organization-success"),
    });
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

function* handleAdminGetOrganizationDetail(
  action: AdminGetOrganizationDetailRequest
) {
  yield put(startLoading({}));
  yield put(getGroupListRequest(action.payload));
  try {
    const response: AxiosResponse<GetOrganizationDetailResponse> =
      yield GroupServices.adminGetOrganizationDetail({
        params: action.payload,
      });
    // console.log("response.data", response.data);
    yield put(setOrganizationDetail(response.data.data));
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

function* handleAdminUpdateUser(action: AdminUpdateUserRequest) {
  yield put(startLoading({}));
  yield put(getGroupListRequest(action.payload));
  try {
    const response: AxiosResponse<UpdateUserResponse> =
      yield GroupServices.adminUpdateUserDetail({
        params: action.payload,
      });
    // console.log("response.data", response.data);
    notification.success({
      key: "update-user-success",
      message: i18n.t("common.success"),
      description: i18n.t("common.update-user-success"),
    });
    yield put(setIsEditingMember(false));
    yield put(userGetGroupUserDetailRequest({ id: action.payload.id }));
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

export default function* homeSaga() {
  yield takeEvery(USER_GET_GROUP_USER_LIST_REQUEST, handleUserGetGroupUserList);
  yield takeEvery(
    USER_GET_GROUP_USER_DETAIL_REQUEST,
    handleUserGetGroupUserDetail
  );
  yield takeEvery(USER_DELEGATE_ADMIN_REQUEST, handleUserDelegateAdmin);
  yield takeEvery(USER_DELETE_USER_REQUEST, handleUserDeleteUser);
  yield takeEvery(ADMIN_GET_GROUP_LIST_REQUEST, handleAdminGetGroupList);
  yield takeEvery(ADMIN_CREATE_USER_REQUEST, handleAdminCreateUser);
  yield takeEvery(ADMIN_DELEGATE_USER_REQUEST, handleAdminDelegateUser);
  yield takeEvery(ADMIN_REMOVE_FROM_ADMIN_REQUEST, handleAdminRemoveFromAdmin);
  yield takeEvery(
    ADMIN_CREATE_ORGANIZATION_REQUEST,
    handleAdminCreateOrganization
  );
  yield takeEvery(
    ADMIN_DELETE_ORGANIZATION_REQUEST,
    handleAdminDeleteOrganization
  );
  yield takeEvery(
    ADMIN_UPDATE_ORGANIZATION_REQUEST,
    handleAdminUpdateOrganization
  );
  yield takeEvery(
    ADMIN_GET_ORGANIZATION_DETAIL_REQUEST,
    handleAdminGetOrganizationDetail
  );
  yield takeEvery(
    ADMIN_UPDATE_GROUP_MEMBER_DETAIL_REQUEST,
    handleAdminUpdateUser
  );
}
