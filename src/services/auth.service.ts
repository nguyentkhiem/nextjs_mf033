import { AUTH_API, AUTH_API_ADMIN, USERS_API } from "@/constants/api";
import { apiServices, apiServicesAdmin } from "./api";
import { ValueOptions } from "@/types/common.types";

const AuthServices = {
  login(options?: ValueOptions) {
    return apiServices.post(AUTH_API.SIGNIN, options?.params);
  },
  register(options?: ValueOptions) {
    return apiServices.post(AUTH_API.REGISTER, options?.params);
  },
  addMember(options?: ValueOptions) {
    return apiServices.post(USERS_API.BULK_CREATE, options?.params);
  },
  forgotPassword(options?: ValueOptions) {
    return apiServices.post(AUTH_API.FORGOT_PASSWORD, options?.params);
  },
  resetPassword(options?: ValueOptions) {
    return apiServices.post(AUTH_API.RESET_PASSWORD, options?.params);
  },
  getMe(options?: ValueOptions) {
    return apiServices.get(USERS_API.GET_ME, options?.params);
  },
  updateInfo(options?: ValueOptions) {
    return apiServices.put(USERS_API.UPDATE_INFO, options?.params);
  },
  checkUserExist(options?: ValueOptions) {
    return apiServices.post(AUTH_API.CHECK_USER_EXIST, options?.params);
  },
  acceptTermsAndPrivacy(options?: ValueOptions) {
    return apiServices.post(AUTH_API.ACCEPT_TERMS_AND_PRIVACY, options?.params);
  },
  updatePassword(options?: ValueOptions) {
    return apiServices.put(USERS_API.CHANGE_PASSWORD, options?.params);
  },
};

export default AuthServices;
