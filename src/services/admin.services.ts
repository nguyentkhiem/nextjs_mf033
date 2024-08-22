import { ADMIN_API, AUTH_API_ADMIN } from "@/constants/api";
import { ValueOptions } from "@/types/common.types";
import { apiServicesAdmin } from "./api";

const AdminServices = {
  adminLogin(options?: ValueOptions) {
    return apiServicesAdmin.post(AUTH_API_ADMIN.SIGNIN, options?.params);
  },
  adminRecoverPassword(options?: ValueOptions) {
    return apiServicesAdmin.post(
      AUTH_API_ADMIN.RECOVER_PASSWORD,
      options?.params
    );
  },
  adminResetPassword(options?: ValueOptions) {
    return apiServicesAdmin.post(
      AUTH_API_ADMIN.RESET_PASSWORD,
      options?.params
    );
  },
  adminRefreshToken(options?: ValueOptions) {
    return apiServicesAdmin.post(AUTH_API_ADMIN.F5_TOKEN, options?.params);
  },
  adminGetMe(options?: ValueOptions) {
    return apiServicesAdmin.get(ADMIN_API.GET_ME, options?.params);
  },
  adminGetUserList(options?: ValueOptions) {
    return apiServicesAdmin.get(ADMIN_API.GET_USER_LIST, options?.params);
  },
  adminGetUserDetail(options?: ValueOptions) {
    return apiServicesAdmin.get(
      `${ADMIN_API.GET_USER_DETAIL}/${options?.params?.id}`
    );
  },
  adminGetOverview(options?: ValueOptions) {
    return apiServicesAdmin.get(ADMIN_API.GET_OVER_VIEW, options?.params);
  },
  deleteUser(options?: ValueOptions) {
    return apiServicesAdmin.delete(ADMIN_API.DELETE_DONOR, options?.params);
  },
  getDonorList(options?: ValueOptions) {
    return apiServicesAdmin.get(ADMIN_API.GET_CASE_LIST, options?.params);
  },
  getDonorDetail(options?: ValueOptions) {
    return apiServicesAdmin.get(
      `${ADMIN_API.GET_CASE_DETAIL}/${options?.params?.id}`
    );
  },
  deleteDonor(options?: ValueOptions) {
    return apiServicesAdmin.delete(ADMIN_API.DELETE_CASE, options?.params);
  },
};

export default AdminServices;
