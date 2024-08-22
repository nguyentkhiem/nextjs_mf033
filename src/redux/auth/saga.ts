import i18n from "@/app/i18n";
import { ACCESS_TOKEN } from "@/constants/variables";
import {
  checkIsExists,
  getMeSuccess,
  loginLoading,
  loginSuccess,
  registerSuccess,
  resetPasswordSuccess,
  setAddMemberSuccess,
  setIsSendMailStatus,
  setUpdatePasswordSuccess,
  updateUserInfoSuccess,
} from "@/redux/auth";
import AuthServices from "@/services/auth.service";
import { notification } from "antd";
import { AxiosResponse, HttpStatusCode } from "axios";
import Cookies from "js-cookie";
import { put, takeEvery } from "redux-saga/effects";
import {
  userAddMemberRequestFailure,
  userGetMeRequest,
  userRegisterRequestFailure,
} from "./actions";
import {
  CHECK_USER_EXIST_REQUEST,
  CheckUserExistRequest,
  CheckUserExistResponse,
  USER_ACCEPT_TERMS_AND_PRIVACY_REQUEST,
  USER_ADD_MEMBER_REQUEST,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_GET_ME_REQUEST,
  USER_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
  USER_RESET_PASSWORD_REQUEST,
  USER_UPDATE_INFO_REQUEST,
  USER_UPDATE_PASSWORD_REQUEST,
  UserAddMemberRequest,
  UserAddMemberSuccessPayload,
  UserForgotPasswordRequest,
  UserGetMeRequest,
  UserGetMeResponse,
  UserLoginRequest,
  UserLoginSuccessPayload,
  UserRegisterRequest,
  UserRegisterSuccessPayload,
  UserResetPasswordRequest,
  UserResetPasswordResponse,
  UserUpdateInfoRequest,
  UserUpdatePasswordRequest,
} from "./actions-types";
import { startLoading, stopLoading } from "../loading";

function* handleUserRegister(action: UserRegisterRequest) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<UserRegisterSuccessPayload> =
      yield AuthServices.register({
        params: action.payload,
      });
    Cookies.set(ACCESS_TOKEN, response.data.data.accessToken);
    yield put(registerSuccess(response.data));
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "handleUserRegister",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
    yield put(userRegisterRequestFailure(error));
  } finally {
    yield put(stopLoading([]));
    yield put(loginLoading(false));
  }
}

function* handleUserLogin(action: UserLoginRequest) {
  yield put(startLoading([]));
  try {
    const user: AxiosResponse<UserLoginSuccessPayload> =
      yield AuthServices.login({
        params: {
          email: action.payload.email,
          password: action.payload.password,
          isRememberMe: action.payload.isRememberMe,
        },
      });
    Cookies.set(ACCESS_TOKEN, user.data.data.accessToken);
    notification.success({
      key: "handleUserLoginSuccess",
      message: i18n.t("common.success"),
      description: i18n.t("common.login-success"),
    });
    yield put(userGetMeRequest());
    yield put(loginSuccess(user.data));
    console.log("action.payload.redirectUrl", action.payload.redirectUrl);

    action.payload.router.push(action.payload.redirectUrl);
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "handleUserLogin",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading([]));
    yield put(loginLoading(false));
  }
}

function* handldeGetMe(action: UserGetMeRequest) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<UserGetMeResponse> =
      yield AuthServices.getMe();
    yield put(getMeSuccess({ data: response.data.data }));
  } catch (error: any) {
    // if (error.response?.status !== HttpStatusCode.Unauthorized) {
    //   notification.error({
    //     key: "handldeGetMe",
    //     message: i18n.t("common.error"),
    //     description: error.response?.data?.error?.message,
    //   });
    // }
  } finally {
    yield put(stopLoading([]));
  }
}

function* handldeUserForgotPassword(action: UserForgotPasswordRequest) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<{
      data: boolean;
    }> = yield AuthServices.forgotPassword({ params: action.payload });
    yield put(resetPasswordSuccess({ data: true }));
    notification.success({
      key: "handldeUserForgotPasswordSuccess",
      message: i18n.t("common.success"),
      description: i18n.t("common.reset-password-success"),
    });
  } catch (error: any) {
    yield put(resetPasswordSuccess({ data: false }));
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "handldeUserForgotPassword",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading([]));
  }
}

function* handldeUserUpdateInfo(action: UserUpdateInfoRequest) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<{
      data: boolean;
    }> = yield AuthServices.updateInfo({ params: action.payload });
    yield put(userGetMeRequest());

    yield put(updateUserInfoSuccess({}));
  } catch (error: any) {
    yield put(resetPasswordSuccess({ data: false }));
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "handldeUserUpdateInfo",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading([]));
  }
}

function* handldeUserUpdatePassword(action: UserUpdatePasswordRequest) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<{
      data: boolean;
    }> = yield AuthServices.updatePassword({ params: action.payload });
    yield put(userGetMeRequest());
    yield put(setUpdatePasswordSuccess(true));
  } catch (error: any) {
    yield put(resetPasswordSuccess({ data: false }));
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "handldeUserUpdatePassword",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading([]));
  }
}

function* handldeCheckUserExist(action: CheckUserExistRequest) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<CheckUserExistResponse> =
      yield AuthServices.checkUserExist({ params: action.payload });

    yield put(checkIsExists(response.data));
    if (!response.data.data.isExists) {
      notification.success({
        key: "handldeCheckUserExistSuccess",
        message: i18n.t("common.success"),
        description:
          "We just sent an email to create a new account to your email! Please check!",
      });
      yield put(setIsSendMailStatus(true));
    }
  } catch (error: any) {
    yield put(checkIsExists({ data: { isExists: false } }));
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "handldeCheckUserExist",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading([]));
  }
}

function* handldeResetPassword(action: UserResetPasswordRequest) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<UserResetPasswordResponse> =
      yield AuthServices.resetPassword({ params: action.payload });

    if (response.data.data) {
      action.payload.router.push(`/auth/login`, {
        token: action.payload.token,
      });
    }
    notification.success({
      key: "handldeResetPasswordSuccess",
      message: i18n.t("common.success"),
      description: "Reset password completed",
    });
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "handldeResetPassword",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading([]));
  }
}

function* handleUserAddMember(action: UserAddMemberRequest) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<UserAddMemberSuccessPayload> =
      yield AuthServices.addMember({
        params: action.payload.data,
      });
    if (action.payload.forceRemoveAccessToken) {
      Cookies.remove(ACCESS_TOKEN);
    }
    yield put(setAddMemberSuccess(true));

    notification.success({
      key: "handleUserRegistersuccess",
      message: "Add memmber successfully",
    });
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "handleUserRegister",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
    yield put(userAddMemberRequestFailure(error));
  } finally {
    yield put(stopLoading([]));
    yield put(loginLoading(false));
  }
}

function* handleUserAcceptTermAndPrivacy(action: UserAddMemberRequest) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse = yield AuthServices.acceptTermsAndPrivacy();
    yield put(userGetMeRequest());
  } catch (error: any) {
  } finally {
    yield put(stopLoading([]));
    yield put(loginLoading(false));
  }
}

export default function* authSaga() {
  yield takeEvery(USER_REGISTER_REQUEST, handleUserRegister);
  yield takeEvery(USER_LOGIN_REQUEST, handleUserLogin);
  yield takeEvery(USER_GET_ME_REQUEST, handldeGetMe);
  yield takeEvery(USER_FORGOT_PASSWORD_REQUEST, handldeUserForgotPassword);
  yield takeEvery(USER_UPDATE_INFO_REQUEST, handldeUserUpdateInfo);
  yield takeEvery(CHECK_USER_EXIST_REQUEST, handldeCheckUserExist);
  yield takeEvery(USER_RESET_PASSWORD_REQUEST, handldeResetPassword);
  yield takeEvery(USER_ADD_MEMBER_REQUEST, handleUserAddMember);
  yield takeEvery(
    USER_ACCEPT_TERMS_AND_PRIVACY_REQUEST,
    handleUserAcceptTermAndPrivacy
  );
  yield takeEvery(USER_UPDATE_PASSWORD_REQUEST, handldeUserUpdatePassword);
}
