import { UserRole } from "@/types/common.enum";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_GET_ME_REQUEST = "USER_GET_ME_REQUEST";
export const USER_GET_ME_SUCCESS = "USER_GET_ME_SUCCESS";
export const USER_GET_ME_FAILURE = "USER_GET_ME_FAILURE";

export const USER_FORGOT_PASSWORD_REQUEST = "USER_FORGOT_PASSWORD_REQUEST";
export const USER_FORGOT_PASSWORD_SUCCESS = "USER_FORGOT_PASSWORD_SUCCESS";
export const USER_FORGOT_PASSWORD_FAILURE = "USER_FORGOT_PASSWORD_FAILURE";

export const USER_UPDATE_INFO_REQUEST = "USER_UPDATE_INFO_REQUEST";
export const USER_UPDATE_INFO_SUCCESS = "USER_UPDATE_INFO_SUCCESS";
export const USER_UPDATE_INFO_FAILURE = "USER_UPDATE_INFO_FAILURE";

export const CHECK_USER_EXIST_REQUEST = "CHECK_USER_EXIST_REQUEST";
export const CHECK_USER_EXIST_SUCCESS = "CHECK_USER_EXIST_SUCCESS";
export const CHECK_USER_EXIST_FAILURE = "CHECK_USER_EXIST_FAILURE";

export const USER_RESET_PASSWORD_REQUEST = "USER_RESET_PASSWORD_REQUEST";
export const USER_RESET_PASSWORD_SUCCESS = "USER_RESET_PASSWORD_SUCCESS";
export const USER_RESET_PASSWORD_FAILURE = "USER_RESET_PASSWORD_FAILURE";

export const USER_ADD_MEMBER_REQUEST = "USER_ADD_MEMBER_REQUEST";
export const USER_ADD_MEMBER_SUCCESS = "USER_ADD_MEMBER_SUCCESS";
export const USER_ADD_MEMBER_FAILURE = "USER_ADD_MEMBER_FAILURE";

export const USER_ACCEPT_TERMS_AND_PRIVACY_REQUEST =
  "USER_ACCEPT_TERMS_AND_PRIVACY_REQUEST";
export const USER_ACCEPT_TERMS_AND_PRIVACY_SUCCESS =
  "USER_ACCEPT_TERMS_AND_PRIVACY_SUCCESS";
export const USER_ACCEPT_TERMS_AND_PRIVACY_FAILURE =
  "USER_ACCEPT_TERMS_AND_PRIVACY_FAILURE";

export const USER_UPDATE_PASSWORD_REQUEST = "USER_UPDATE_PASSWORD_REQUEST";
export const USER_UPDATE_PASSWORD_SUCCESS = "USER_UPDATE_PASSWORD_SUCCESS";
export const USER_UPDATE_PASSWORD_FAILURE = "USER_UPDATE_PASSWORD_FAILURE";

export interface UserRegisterSuccessPayload {
  data: {
    accessToken: string;
  };
}

export interface UserAddMemberSuccessPayload {
  data: boolean;
}
export interface UserLoginSuccessPayload {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface IMe {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  email: string;
  role: UserRole;
  organization: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isVerified: number;
  comments: Array<string>;
  isAccepted: boolean;
  organizationUser: {
    role: "LEADER" | "MEMBER";
    organization: {
      createdAt: string;
      email: string | null;
      id: number;
      name: string;
      updatedAt: string;
    };
  };
}

export interface UserGetMeResponse {
  data: IMe;
}

export interface CheckUserExistResponse {
  data: {
    isExists: boolean;
  };
}

export interface UserRegisterInput {
  email: string;
  password: string;
  role: UserRole;
  organization: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface UserAddMemberInput {
  data: {
    data: Array<{
      email: string;
      password: string;
      role: UserRole;
      organization: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
    }>;
  };
  forceRemoveAccessToken: boolean;
}

export interface UserUpdateInfoInput {
  email: string;
  role: UserRole;
  organization: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
  router: AppRouterInstance;
  isRememberMe: boolean;
  redirectUrl: string;
}

export interface CheckUserExistInput {
  email: string;
  router: AppRouterInstance;
}

export interface UserForgotPasswordInput {
  email: string;
}

export interface UserRegisterRequest {
  type: string;
  payload: UserRegisterInput;
}

export interface UserAddMemberRequest {
  type: string;
  payload: UserAddMemberInput;
}

export type UserAddMemberSuccess = {
  type: string;
  payload: UserAddMemberSuccessPayload;
};

export type UserAddMemberFailure = {
  type: string;
  payload: any;
};

export interface UserResetPasswordInput {
  token: string;
  newPassword: string;
  router: AppRouterInstance;
}
export interface UserResetPasswordResponse {
  data: boolean;
}
export interface UserResetPasswordRequest {
  type: string;
  payload: UserResetPasswordInput;
}

export type UserResetPasswordSuccess = {
  type: string;
  payload: UserResetPasswordResponse;
};

export type UserResetPasswordFailure = {
  type: string;
  payload: any;
};

export interface UserForgotPasswordRequest {
  type: string;
  payload: UserForgotPasswordInput;
}

export type UserRegisterSuccess = {
  type: string;
  payload: UserRegisterSuccessPayload;
};

export type UserReserPasswordSuccess = {
  type: string;
  payload: {
    data: boolean;
  };
};

export interface CheckUserExistRequest {
  type: string;
  payload: CheckUserExistInput;
}

export type CheckUserExistSuccess = {
  type: string;
  payload: CheckUserExistResponse;
};

export type UserGetMeSuccess = {
  type: string;
  payload: UserGetMeResponse;
};

export type UserRegisterFailure = {
  type: string;
  payload: any;
};

export interface UserLoginRequest {
  type: string;
  payload: UserLoginInput;
}

export interface UserUpdateInfoRequest {
  type: string;
  payload: UserUpdateInfoInput;
}

export interface UserUpdatePasswordRequest {
  type: string;
  payload: ChangePasswordInput;
}

export interface UserUpdatePasswordSuccess {
  type: string;
  payload: any;
}

export interface UserUpdatePasswordFailure {
  type: string;
  payload: any;
}

export interface UserGetMeRequest {
  type: string;
}

export type UserLoginSuccess = {
  type: string;
  payload: UserLoginSuccessPayload;
};

export type UserLoginFailure = {
  type: string;
  payload: any;
};

export type CheckUserExistFailure = {
  type: string;
  payload: any;
};

export type UserAcceptTermAndPrivacyRequest = {
  type: string;
  payload: any;
};
export type UserAcceptTermAndPrivacySuccess = {
  type: string;
  payload: any;
};
export type UserAcceptTermAndPrivacyFailure = {
  type: string;
  payload: any;
};

export type UserAuthActions =
  | UserRegisterRequest
  | UserRegisterSuccess
  | UserRegisterFailure
  | UserLoginFailure
  | UserLoginRequest
  | UserLoginSuccess
  | CheckUserExistRequest
  | CheckUserExistSuccess
  | CheckUserExistFailure
  | UserResetPasswordRequest
  | UserResetPasswordSuccess
  | UserResetPasswordFailure
  | UserAcceptTermAndPrivacyRequest
  | UserAcceptTermAndPrivacySuccess
  | UserAcceptTermAndPrivacyFailure
  | UserUpdateInfoRequest
  | UserGetMeRequest
  | UserGetMeSuccess
  | UserForgotPasswordRequest
  | UserAddMemberRequest
  | UserAddMemberSuccess
  | UserAddMemberFailure
  | UserUpdatePasswordRequest
  | UserUpdatePasswordSuccess
  | UserUpdatePasswordFailure;
