import {
  CHECK_USER_EXIST_REQUEST,
  ChangePasswordInput,
  CheckUserExistInput,
  CheckUserExistRequest,
  USER_ACCEPT_TERMS_AND_PRIVACY_REQUEST,
  USER_ADD_MEMBER_FAILURE,
  USER_ADD_MEMBER_REQUEST,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_GET_ME_REQUEST,
  USER_LOGIN_REQUEST,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_PASSWORD_FAILURE,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_UPDATE_INFO_REQUEST,
  USER_UPDATE_PASSWORD_REQUEST,
  UserAddMemberFailure,
  UserAddMemberInput,
  UserAddMemberRequest,
  UserForgotPasswordInput,
  UserForgotPasswordRequest,
  UserGetMeRequest,
  UserLoginInput,
  UserLoginRequest,
  UserRegisterFailure,
  UserRegisterInput,
  UserRegisterRequest,
  UserRegisterSuccess,
  UserRegisterSuccessPayload,
  UserResetPasswordFailure,
  UserResetPasswordInput,
  UserResetPasswordRequest,
  UserResetPasswordResponse,
  UserResetPasswordSuccess,
  UserUpdateInfoInput,
  UserUpdateInfoRequest,
  UserUpdatePasswordRequest,
} from "./actions-types";

export const userRegisterRequest = (
  payload: UserRegisterInput
): UserRegisterRequest => ({
  type: USER_REGISTER_REQUEST,
  payload,
});

export const userUpdateInfoRequest = (
  payload: UserUpdateInfoInput
): UserUpdateInfoRequest => ({
  type: USER_UPDATE_INFO_REQUEST,
  payload,
});

export const userLoginRequest = (
  payload: UserLoginInput
): UserLoginRequest => ({
  type: USER_LOGIN_REQUEST,
  payload,
});

export const userCheckUserExistRequest = (
  payload: CheckUserExistInput
): CheckUserExistRequest => ({
  type: CHECK_USER_EXIST_REQUEST,
  payload,
});

export const userGetMeRequest = (): UserGetMeRequest => ({
  type: USER_GET_ME_REQUEST,
});

export const userForgotPasswordRequest = (
  payload: UserForgotPasswordInput
): UserForgotPasswordRequest => ({
  type: USER_FORGOT_PASSWORD_REQUEST,
  payload,
});

export const userRegisterRequestSuccess = (
  payload: UserRegisterSuccessPayload
): UserRegisterSuccess => ({
  type: USER_REGISTER_SUCCESS,
  payload,
});

export const userRegisterRequestFailure = (
  payload: any
): UserRegisterFailure => ({
  type: USER_REGISTER_FAILURE,
  payload,
});

export const userAddMemberRequestFailure = (
  payload: any
): UserAddMemberFailure => ({
  type: USER_ADD_MEMBER_FAILURE,
  payload,
});

export const userResetPasswordRequest = (
  payload: UserResetPasswordInput
): UserResetPasswordRequest => ({
  type: USER_RESET_PASSWORD_REQUEST,
  payload,
});

export const userResetPaswordSuccess = (
  payload: UserResetPasswordResponse
): UserResetPasswordSuccess => ({
  type: USER_RESET_PASSWORD_SUCCESS,
  payload,
});

export const userResetPasswordRequestFailure = (
  payload: any
): UserResetPasswordFailure => ({
  type: USER_RESET_PASSWORD_FAILURE,
  payload,
});

export const userAddMemberRequest = (
  payload: UserAddMemberInput
): UserAddMemberRequest => ({
  type: USER_ADD_MEMBER_REQUEST,
  payload,
});

export const userAcceptTermAndPolicyRequest = (): any => ({
  type: USER_ACCEPT_TERMS_AND_PRIVACY_REQUEST,
});

export const userUpdatePasswordRequest = (
  payload: ChangePasswordInput
): UserUpdatePasswordRequest => ({
  type: USER_UPDATE_PASSWORD_REQUEST,
  payload,
});
