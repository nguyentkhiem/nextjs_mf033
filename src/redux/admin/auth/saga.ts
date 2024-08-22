import i18n from "@/app/i18n";
import { ACCESS_TOKEN_ADMIN, F5_TOKEN_ADMIN } from "@/constants/variables";
import {
  loginLoading,
  loginSuccess,
  sentEmail,
  setUser,
} from "@/redux/admin/auth";
import { startLoading, stopLoading } from "@/redux/loading";
import AdminServices from "@/services/admin.services";
import { Action, Response } from "@/types/auth.type";
import { ADMIN, AUTH } from "@/types/saga.type";
import { notification } from "antd";
import { AxiosResponse, HttpStatusCode } from "axios";
import Cookies from "js-cookie";
import { put, takeEvery } from "redux-saga/effects";

function* handldeAdminLogin(action: Action.AdminLoginAction) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<Response.AdminLogin> =
      yield AdminServices.adminLogin({
        params: action.payload,
      });

    if (response.data?.data) {
      Cookies.set(ACCESS_TOKEN_ADMIN, response.data.data);
      action.payload.router.push("/admin");
      yield put(loginSuccess({}));
      notification.success({
        key: "handldeAdminLoginSuccess",
        message: i18n.t("common.success"),
        description: i18n.t("common.login-success"),
      });
    }
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "handldeAdminLogin",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading([]));
    yield put(loginLoading(false));
  }
}

function* handldeAdminRecoverPassword(
  action: Action.AdminRecoverPasswordAction
) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<Response.AdminRecoverPassword> =
      yield AdminServices.adminRecoverPassword({
        params: action.payload,
      });
    yield put(sentEmail(response.data.data));
    notification.success({
      key: "handldeAdminRecoverPasswordSuccess",
      message: i18n.t("common.success"),
      description: i18n.t("common.recover-password-success"),
    });
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "handldeAdminRecoverPassword",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading([]));
    yield put(loginLoading(false));
  }
}
function* handldeAdminGetMe(action: any) {
  try {
    const response: AxiosResponse<Response.AdminGetMe> =
      yield AdminServices.adminGetMe();
    yield put(setUser(response.data.data));
  } catch (error: any) {
  } finally {
  }
}

function* handldeAdminLogout(action: any) {
  yield put(startLoading([]));
  try {
    // const response: AxiosResponse<Response.AdminGetMe> =
    //   yield AdminServices.adminGetMe();
    Cookies.remove(ACCESS_TOKEN_ADMIN);
    Cookies.remove(F5_TOKEN_ADMIN);
    yield put(setUser(null));
  } catch (error: any) {
  } finally {
    yield put(stopLoading([]));
  }
}

function* handldeResetPassword(action: Action.AdminResetPasswordAction) {
  yield put(startLoading([]));
  try {
    const response: AxiosResponse<Response.AdminRecoverPassword> =
      yield AdminServices.adminResetPassword({ params: action.payload });

    if (response.data.data) {
      action.payload.router.push(`/admin/sign-in`);
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

export default function* authSagaAdmin() {
  yield takeEvery(AUTH.LOGIN_ADMIN, handldeAdminLogin);
  yield takeEvery(AUTH.ADMIN_RECOVER_PASSWORD, handldeAdminRecoverPassword);
  yield takeEvery(ADMIN.GET_ME, handldeAdminGetMe);
  yield takeEvery(AUTH.LOG_OUT, handldeAdminLogout);
  yield takeEvery(AUTH.ADMIN_RESET_PASSWORD, handldeResetPassword);
}
