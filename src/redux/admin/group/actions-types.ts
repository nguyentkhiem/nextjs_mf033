import { UserRole } from "@/types/common.enum";

export const USER_GET_GROUP_USER_LIST_REQUEST =
  "ADMIN_GET_GROUP_USER_LIST_REQUEST";
export const USER_GET_GROUP_USER_LIST_SUCCESS =
  "ADMIN_GET_GROUP_USER_LIST_SUCCESS";
export const USER_GET_GROUP_USER_LIST_FAILURE =
  "ADMIN_GET_GROUP_USER_LIST_FAILURE";

export const USER_GET_GROUP_USER_DETAIL_REQUEST =
  "ADMIN_GET_GROUP_USER_DETAIL_REQUEST";
export const USER_GET_GROUP_USER_DETAIL_SUCCESS =
  "ADMIN_GET_GROUP_USER_DETAIL_SUCCESS";
export const USER_GET_GROUP_USER_DETAIL_FAILURE =
  "ADMIN_GET_GROUP_USER_DETAIL_FAILURE";

export const USER_DELEGATE_ADMIN_REQUEST = "ADMIN_DELEGATE_ADMIN_REQUEST";
export const USER_DELEGATE_ADMIN_SUCCESS = "ADMIN_DELEGATE_ADMIN_SUCCESS";
export const USER_DELEGATE_ADMIN_FAILURE = "ADMIN_DELEGATE_ADMIN_FAILURE";

export const USER_DELETE_USER_REQUEST = "ADMIN_DELETE_USER_REQUEST";
export const USER_DELETE_USER_SUCCESS = "ADMIN_DELETE_USER_SUCCESS";
export const USER_DELETE_USER_FAILURE = "ADMIN_DELETE_USER_FAILURE";

export const ADMIN_GET_GROUP_LIST_REQUEST = "ADMIN_GET_GROUP_LIST_REQUEST";
export const ADMIN_GET_GROUP_LIST_SUCCESS = "ADMIN_GET_GROUP_LIST_SUCCESS";
export const ADMIN_GET_GROUP_LIST_FAILURE = "ADMIN_GET_GROUP_LIST_FAILURE";

export const ADMIN_CREATE_USER_REQUEST = "ADMIN_CREATE_USER_REQUEST";
export const ADMIN_CREATE_USER_SUCCESS = "ADMIN_CREATE_USER_SUCCESS";
export const ADMIN_CREATE_USER_FAILURE = "ADMIN_CREATE_USER_FAILURE";

export const ADMIN_DELETE_USER_REQUEST = "ADMIN_DELETE_USER_REQUEST";
export const ADMIN_DELETE_USER_SUCCESS = "ADMIN_DELETE_USER_SUCCESS";
export const ADMIN_DELETE_USER_FAILURE = "ADMIN_DELETE_USER_FAILURE";

export const ADMIN_DELEGATE_USER_REQUEST = "ADMIN_DELEGATE_USER_REQUEST";
export const ADMIN_DELEGATE_USER_SUCCESS = "ADMIN_DELEGATE_USER_SUCCESS";
export const ADMIN_DELEGATE_USER_FAILURE = "ADMIN_DELEGATE_USER_FAILURE";

export const ADMIN_REMOVE_FROM_ADMIN_REQUEST =
  "ADMIN_REMOVE_FROM_ADMIN_REQUEST";
export const ADMIN_REMOVE_FROM_ADMIN_SUCCESS =
  "ADMIN_REMOVE_FROM_ADMIN_SUCCESS";
export const ADMIN_REMOVE_FROM_ADMIN_FAILURE =
  "ADMIN_REMOVE_FROM_ADMIN_FAILURE";
export const ADMIN_CREATE_ORGANIZATION_REQUEST =
  "ADMIN_CREATE_ORGANIZATION_REQUEST";
export const ADMIN_CREATE_ORGANIZATION_SUCCESS =
  "ADMIN_CREATE_ORGANIZATION_SUCCESS";
export const ADMIN_CREATE_ORGANIZATION_FAILURE =
  "ADMIN_CREATE_ORGANIZATION_FAILURE";

export const ADMIN_DELETE_ORGANIZATION_REQUEST =
  "ADMIN_DELETE_ORGANIZATION_REQUEST";
export const ADMIN_DELETE_ORGANIZATION_SUCCESS =
  "ADMIN_DELETE_ORGANIZATION_SUCCESS";
export const ADMIN_DELETE_ORGANIZATION_FAILURE =
  "ADMIN_DELETE_ORGANIZATION_FAILURE";

export const ADMIN_UPDATE_ORGANIZATION_REQUEST =
  "ADMIN_UPDATE_ORGANIZATION_REQUEST";
export const ADMIN_UPDATE_ORGANIZATION_SUCCESS =
  "ADMIN_UPDATE_ORGANIZATION_SUCCESS";
export const ADMIN_UPDATE_ORGANIZATION_FAILURE =
  "ADMIN_UPDATE_ORGANIZATION_FAILURE";

export const ADMIN_GET_ORGANIZATION_DETAIL_REQUEST =
  "ADMIN_GET_ORGANIZATION_DETAIL_REQUEST";
export const ADMIN_GET_ORGANIZATION_DETAIL_SUCCESS =
  "ADMIN_GET_ORGANIZATION_DETAIL_SUCCESS";
export const ADMIN_GET_ORGANIZATION_DETAIL_FAILURE =
  "ADMIN_GET_ORGANIZATION_DETAIL_FAILURE";

export const ADMIN_UPDATE_GROUP_MEMBER_DETAIL_REQUEST =
  "ADMIN_UPDATE_GROUP_MEMBER_DETAIL_REQUEST";
export const ADMIN_UPDATE_GROUP_MEMBER_DETAIL_SUCCESS =
  "ADMIN_UPDATE_GROUP_MEMBER_DETAIL_SUCCESS";
export const ADMIN_UPDATE_GROUP_MEMBER_DETAIL_FAILURE =
  "ADMIN_UPDATE_GROUP_MEMBER_DETAIL_FAILURE";

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

export interface DelegateAdminRequest {
  userId: number;
}

export interface RemoveFromAdminRequest {
  userId: number;
  organizationId: number;
}

export interface RemoveFromAdminResponse {
  data: boolean;
}

export interface DelegateAdminResponse {
  data: boolean;
}

export interface DeleteUserRequest {
  userIds: Array<number>;
}

export interface DeleteUserResponse {
  data: boolean;
}

export interface GetGroupUserListResponse {
  data: {
    items: Array<any>;
    total: number;
    organization: {
      name: string;
    };
  };
}

export interface GetGroupListResponse {
  data: {
    items: Array<{
      email: string | null;
      id: number;
      name: string;
      numberOfUsers: number;
    }>;
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
  id: number;
}

export interface GetGroupListRequest {
  limit: number;
  page: number;
  keyword?: string;
  filter?: string;
  sort?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: UserRole;
  organizationId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  organizationRole: string;
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

export interface CreateUserResponse {
  data: boolean;
}

export interface UpdateUserResponse {
  data: boolean;
}
export interface DelegateUserRequest {
  userId: number;
  organizationId: number;
}
export interface DelegateUserResponse {
  data: boolean;
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

export interface AdminRemoveFromAdminRequest {
  type: string;
  payload: RemoveFromAdminRequest;
}

export type AdminRemoveFromAdminSuccess = {
  type: string;
  payload: RemoveFromAdminResponse;
};

export type AdminRemoveFromAdminFailure = {
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

export interface AdminGetGroupListRequest {
  type: string;
  payload: GetGroupListRequest;
}

export type AdminGetGroupListSuccess = {
  type: string;
  payload: GetGroupListResponse;
};

export type AdminGetGroupListFailure = {
  type: string;
  payload: any;
};

export interface AdminCreateUserRequest {
  type: string;
  payload: CreateUserRequest;
}

export type AdminCreateUserSuccess = {
  type: string;
  payload: CreateUserResponse;
};

export type AdminCreateUserFailure = {
  type: string;
  payload: any;
};

export interface AdminUpdateUserRequest {
  type: string;
  payload: UpdateUserRequest;
}

export type AdminUpdateUserSuccess = {
  type: string;
  payload: UpdateUserResponse;
};

export type AdminUpdateUserFailure = {
  type: string;
  payload: any;
};

export interface AdminDeleteUserRequest {
  type: string;
  payload: DeleteUserRequest;
}

export type AdminDeleteUserSuccess = {
  type: string;
  payload: DeleteUserResponse;
};

export type AdminDeleteUserFailure = {
  type: string;
  payload: any;
};

export interface AdminDelegateUserRequest {
  type: string;
  payload: DelegateUserRequest;
}

export type AdminDelegateUserSuccess = {
  type: string;
  payload: DelegateUserResponse;
};

export type AdminDelegateUserFailure = {
  type: string;
  payload: any;
};

export interface CreateOrganizationRequest {
  name: string;
  location: string;
  keyPersonnel: string;
  phoneNumber: string;
}

export interface CreateOrganizationResponse {
  data: boolean;
}

export interface DeleteOrganizationRequest {
  id: number;
}

export interface DeleteOrganizationResponse {
  data: boolean;
}

export interface UpdateOrganizationResponse {
  data: boolean;
}

export interface UpdateOrganizationRequest {
  id: number;
  name: string;
  location: string;
  keyPersonnel: string;
  phoneNumber: string;
}

export interface GetOrganizationDetailRequest {
  id: number;
}

export interface GetOrganizationDetailResponse {
  data: {
    id: number;
    name: string;
    location: string;
    keyPersonnel: string;
    phoneNumber: string;
  };
}

export interface AdminCreateOrganizationRequest {
  type: string;
  payload: CreateOrganizationRequest;
}

export type AdminCreateOrganizationSuccess = {
  type: string;
  payload: CreateOrganizationResponse;
};

export type AdminCreateOrganizationFailure = {
  type: string;
  payload: any;
};

export interface AdminDeleteOrganizationRequest {
  type: string;
  payload: DeleteOrganizationRequest;
}

export type AdminDeleteOrganizationSuccess = {
  type: string;
  payload: DeleteOrganizationResponse;
};

export type AdminDeleteOrganizationFailure = {
  type: string;
  payload: any;
};

export interface AdminUpdateOrganizationRequest {
  type: string;
  payload: UpdateOrganizationRequest;
}

export type AdminUpdateOrganizationSuccess = {
  type: string;
  payload: UpdateOrganizationResponse;
};

export type AdminUpdateOrganizationFailure = {
  type: string;
  payload: any;
};

export interface AdminGetOrganizationDetailRequest {
  type: string;
  payload: GetOrganizationDetailRequest;
}

export type AdminGetOrganizationDetailSuccess = {
  type: string;
  payload: GetOrganizationDetailResponse;
};

export type AdminGetOrganizationDetailFailure = {
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
  | AdminGetGroupListRequest
  | AdminGetGroupListSuccess
  | AdminGetGroupListFailure
  | AdminCreateUserRequest
  | AdminCreateUserSuccess
  | AdminCreateUserFailure
  | AdminDeleteUserRequest
  | AdminDeleteUserSuccess
  | AdminDeleteUserFailure
  | AdminDelegateUserRequest
  | AdminDelegateUserSuccess
  | AdminDelegateUserFailure
  | AdminRemoveFromAdminRequest
  | AdminRemoveFromAdminSuccess
  | AdminRemoveFromAdminFailure
  | AdminCreateOrganizationRequest
  | AdminCreateOrganizationSuccess
  | AdminCreateOrganizationFailure
  | AdminDeleteOrganizationRequest
  | AdminDeleteOrganizationSuccess
  | AdminDeleteOrganizationFailure
  | AdminUpdateOrganizationRequest
  | AdminUpdateOrganizationSuccess
  | AdminUpdateOrganizationFailure
  | AdminGetOrganizationDetailRequest
  | AdminGetOrganizationDetailSuccess
  | AdminGetOrganizationDetailFailure
  | AdminUpdateUserRequest
  | AdminUpdateUserSuccess
  | AdminUpdateUserFailure;
