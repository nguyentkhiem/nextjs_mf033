import {
  ADMIN_CREATE_ORGANIZATION_REQUEST,
  ADMIN_CREATE_USER_REQUEST,
  ADMIN_DELEGATE_USER_REQUEST,
  ADMIN_DELETE_ORGANIZATION_REQUEST,
  ADMIN_GET_GROUP_LIST_REQUEST,
  ADMIN_REMOVE_FROM_ADMIN_REQUEST,
  ADMIN_GET_ORGANIZATION_DETAIL_REQUEST,
  ADMIN_UPDATE_ORGANIZATION_REQUEST,
  AdminCreateOrganizationRequest,
  AdminCreateUserRequest,
  AdminDelegateUserRequest,
  AdminDeleteOrganizationRequest,
  AdminGetGroupListRequest,
  AdminRemoveFromAdminRequest,
  AdminGetOrganizationDetailRequest,
  AdminUpdateOrganizationRequest,
  CreateOrganizationRequest,
  CreateUserRequest,
  DelegateAdminRequest,
  DelegateUserRequest,
  DeleteOrganizationRequest,
  DeleteUserRequest,
  GetGroupListRequest,
  GetGroupListResponse,
  GetGroupUserDetailRequest,
  GetGroupUserListRequest,
  RemoveFromAdminRequest,
  GetOrganizationDetailRequest,
  GetOrganizationDetailResponse,
  USER_DELEGATE_ADMIN_REQUEST,
  USER_DELETE_USER_REQUEST,
  USER_GET_GROUP_USER_DETAIL_REQUEST,
  USER_GET_GROUP_USER_LIST_REQUEST,
  UpdateOrganizationRequest,
  UserDelegateAdminRequest,
  UserDeleteUserRequest,
  UserGetGroupUserDetailRequest,
  UserGetGroupUserListRequest,
  UpdateUserRequest,
  AdminUpdateUserRequest,
  ADMIN_UPDATE_GROUP_MEMBER_DETAIL_REQUEST,
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

export const userGetGroupList = (
  payload: GetGroupListRequest
): AdminGetGroupListRequest => ({
  type: ADMIN_GET_GROUP_LIST_REQUEST,
  payload,
});

export const adminCreateUser = (
  payload: CreateUserRequest
): AdminCreateUserRequest => ({
  type: ADMIN_CREATE_USER_REQUEST,
  payload,
});

export const adminDelegateUser = (
  payload: DelegateUserRequest
): AdminDelegateUserRequest => ({
  type: ADMIN_DELEGATE_USER_REQUEST,
  payload,
});

export const adminRemoveFromAdmin = (
  payload: RemoveFromAdminRequest
): AdminRemoveFromAdminRequest => ({
  type: ADMIN_REMOVE_FROM_ADMIN_REQUEST,
  payload,
});

export const adminCreateOrganization = (
  payload: CreateOrganizationRequest
): AdminCreateOrganizationRequest => ({
  type: ADMIN_CREATE_ORGANIZATION_REQUEST,
  payload,
});

export const adminDeleteOrganization = (
  payload: DeleteOrganizationRequest
): AdminDeleteOrganizationRequest => ({
  type: ADMIN_DELETE_ORGANIZATION_REQUEST,
  payload,
});

export const adminUpdateOrganization = (
  payload: UpdateOrganizationRequest
): AdminUpdateOrganizationRequest => ({
  type: ADMIN_UPDATE_ORGANIZATION_REQUEST,
  payload,
});

export const adminGetOrganizationDetail = (
  payload: GetOrganizationDetailRequest
): AdminGetOrganizationDetailRequest => ({
  type: ADMIN_GET_ORGANIZATION_DETAIL_REQUEST,
  payload,
});
export const adminUpdateUser = (
  payload: UpdateUserRequest
): AdminUpdateUserRequest => ({
  type: ADMIN_UPDATE_GROUP_MEMBER_DETAIL_REQUEST,
  payload,
});
