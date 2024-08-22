import {
  DelegateAdminRequest,
  DeleteUserRequest,
  GetGroupUserDetailRequest,
  GetGroupUserListRequest,
  UPDATE_GROUP_MEMBER_DETAIL_REQUEST,
  USER_DELEGATE_ADMIN_REQUEST,
  USER_DELETE_USER_REQUEST,
  USER_GET_GROUP_USER_DETAIL_REQUEST,
  USER_GET_GROUP_USER_LIST_REQUEST,
  UpdateOrganizationUserRequest,
  UpdateUserRequest,
  UserDelegateAdminRequest,
  UserDeleteUserRequest,
  UserGetGroupUserDetailRequest,
  UserGetGroupUserListRequest,
} from "./actions-types";

export const userGetGroupUserListRequest = (
  payload: GetGroupUserListRequest
): UserGetGroupUserListRequest => ({
  type: USER_GET_GROUP_USER_LIST_REQUEST,
  payload,
});

export const userGetGroupUserDetailRequest = (
  payload: GetGroupUserDetailRequest
): UserGetGroupUserDetailRequest => ({
  type: USER_GET_GROUP_USER_DETAIL_REQUEST,
  payload,
});

export const userDelegateAdminRequest = (
  payload: DelegateAdminRequest
): UserDelegateAdminRequest => ({
  type: USER_DELEGATE_ADMIN_REQUEST,
  payload,
});

export const userDeleteUserRequest = (
  payload: DeleteUserRequest
): UserDeleteUserRequest => ({
  type: USER_DELETE_USER_REQUEST,
  payload,
});

export const userUpdateOrganizationUserRequest = (
  payload: UpdateUserRequest
): UpdateOrganizationUserRequest => ({
  type: UPDATE_GROUP_MEMBER_DETAIL_REQUEST,
  payload,
});
