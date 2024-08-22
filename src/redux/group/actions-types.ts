import { UserRole } from "@/types/common.enum";
import { IMe } from "../auth/actions-types";
import { IUser } from "@/types/auth.type";

export const USER_GET_GROUP_USER_LIST_REQUEST =
  "USER_GET_GROUP_USER_LIST_REQUEST";
export const USER_GET_GROUP_USER_LIST_SUCCESS =
  "USER_GET_GROUP_USER_LIST_SUCCESS";
export const USER_GET_GROUP_USER_LIST_FAILURE =
  "USER_GET_GROUP_USER_LIST_FAILURE";

export const USER_GET_GROUP_USER_DETAIL_REQUEST =
  "USER_GET_GROUP_USER_DETAIL_REQUEST";
export const USER_GET_GROUP_USER_DETAIL_SUCCESS =
  "USER_GET_GROUP_USER_DETAIL_SUCCESS";
export const USER_GET_GROUP_USER_DETAIL_FAILURE =
  "USER_GET_GROUP_USER_DETAIL_FAILURE";

export const USER_DELEGATE_ADMIN_REQUEST = "USER_DELEGATE_ADMIN_REQUEST";
export const USER_DELEGATE_ADMIN_SUCCESS = "USER_DELEGATE_ADMIN_SUCCESS";
export const USER_DELEGATE_ADMIN_FAILURE = "USER_DELEGATE_ADMIN_FAILURE";

export const USER_DELETE_USER_REQUEST = "USER_DELETE_USER_REQUEST";
export const USER_DELETE_USER_SUCCESS = "USER_DELETE_USER_SUCCESS";
export const USER_DELETE_USER_FAILURE = "USER_DELETE_USER_FAILURE";

export const UPDATE_GROUP_MEMBER_DETAIL_REQUEST =
  "UPDATE_GROUP_MEMBER_DETAIL_REQUEST";
export const UPDATE_GROUP_MEMBER_DETAIL_SUCCESS =
  "UPDATE_GROUP_MEMBER_DETAIL_SUCCESS";
export const UPDATE_GROUP_MEMBER_DETAIL_FAILURE =
  "UPDATE_GROUP_MEMBER_DETAIL_FAILURE";

export interface GroupUser {
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  organization: string;
  phoneNumber: string;
  role: UserRole;
  updatedAt: string;
  organizationUser: {
    role: string;
    organization: {
      id: number;
      name: string;
    };
  };
}

export interface UpdateUserRequest {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  organizationId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface DelegateAdminRequest {
  userId: number;
}

export interface DelegateAdminResponse {
  data: boolean;
}

export interface DeleteUserRequest {
  userIds: Array<number>;
}

export interface DeleteUserResponse {
  data: boolean;
  role: string;
  updatedAt: string;
}

export interface GetGroupUserListResponse {
  data: {
    items: Array<GroupUser>;
    total: number;
  };
}
export interface GetGroupUserDetailResponse {
  data: GroupUser;
}

export interface GetGroupUserListRequest {
  limit: number;
  page: number;
  keyword?: string;
  filter?: string;
  sort?: string;
}

export interface GetGroupUserDetailRequest {
  id: number;
}

export interface UserGetGroupUserListRequest {
  type: string;
  payload: GetGroupUserListRequest;
}

export interface UserGetGroupUserDetailRequest {
  type: string;
  payload: GetGroupUserDetailRequest;
}

export type UserGetGroupUserListSuccess = {
  type: string;
  payload: GetGroupUserListResponse;
};

export type UserGetGroupUserDetailSuccess = {
  type: string;
  payload: GetGroupUserDetailResponse;
};

export type UserGetGroupUserListFailure = {
  type: string;
  payload: any;
};
export type UserGetGroupUserDetailFailure = {
  type: string;
  payload: any;
};

export interface UserDelegateAdminRequest {
  type: string;
  payload: DelegateAdminRequest;
}

export type UserDelegateAdminSuccess = {
  type: string;
  payload: DelegateAdminResponse;
};

export type UserDelegateAdminFailure = {
  type: string;
  payload: any;
};

export interface UserDeleteUserRequest {
  type: string;
  payload: DeleteUserRequest;
}

export type UserDeleteUserSuccess = {
  type: string;
  payload: DeleteUserResponse;
};

export type UserDeleteUserFailure = {
  type: string;
  payload: any;
};
export interface UpdateUserResponse {
  data: boolean;
}

export interface UpdateOrganizationUserRequest {
  type: string;
  payload: UpdateUserRequest;
}

export type UpdateOrganizationUserSuccess = {
  type: string;
  payload: UpdateUserResponse;
};

export type UpdateOrganizationUserFailure = {
  type: string;
  payload: any;
};

export type UserHomeActions =
  | UserGetGroupUserListRequest
  | UserGetGroupUserListSuccess
  | UserGetGroupUserListFailure
  | UserGetGroupUserDetailRequest
  | UserGetGroupUserDetailSuccess
  | UserGetGroupUserDetailFailure
  | UserDelegateAdminRequest
  | UserDelegateAdminSuccess
  | UserDelegateAdminFailure
  | UserDeleteUserRequest
  | UserDeleteUserSuccess
  | UserDeleteUserFailure
  | UpdateOrganizationUserRequest
  | UpdateOrganizationUserSuccess
  | UpdateOrganizationUserFailure;
