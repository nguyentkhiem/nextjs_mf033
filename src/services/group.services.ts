import { adminCreateUser } from "./../redux/admin/group/actions";
import { ADMIN_API, DONOR_API, GROUP_API, USERS_API } from "@/constants/api";
import { ValueOptions } from "@/types/common.types";
import { apiServices, apiServicesAdmin } from "./api";

const GroupServices = {
  getGroupUserList(options?: ValueOptions) {
    return apiServices.get(USERS_API.GET_GROUP_USER_LIST, options?.params);
  },
  getGroupUserDetail(options?: ValueOptions) {
    return apiServices.get(`${USERS_API.USER}/${options?.params?.id}`);
  },
  delegateAdmin(options?: ValueOptions) {
    return apiServices.post(`${USERS_API.USER}/delegate`, options?.params);
  },
  deleteUser(options?: ValueOptions) {
    return apiServices.delete(`${USERS_API.USER}/bulk-delete`, options?.params);
  },
  getGroupList(options?: ValueOptions) {
    return apiServicesAdmin.get("organization", options?.params);
  },
  adminGetGroupDetail(options?: ValueOptions) {
    return apiServicesAdmin.get(
      `organization/${options?.params?.id}`,
      options?.params
    );
  },
  adminGetGroupUserDetail(options?: ValueOptions) {
    return apiServicesAdmin.get(
      `${ADMIN_API.GET_USER_DETAIL}/${options?.params?.id}`
    );
  },
  adminCreateUser(options?: ValueOptions) {
    return apiServicesAdmin.post(ADMIN_API.CREATE_USER, options?.params);
  },
  adminDelegateUser(options?: ValueOptions) {
    return apiServicesAdmin.post(ADMIN_API.DELEGATE_USER, options?.params);
  },
  removeFromAdmin(options?: ValueOptions) {
    return apiServicesAdmin.post(
      `${ADMIN_API.REMOVE_FROM_ADMIN}`,
      options?.params
    );
  },
  adminCreateOrganization(options?: ValueOptions) {
    return apiServicesAdmin.post(GROUP_API.CREATE_GROUP, options?.params);
  },
  adminDeleteOrganization(options?: ValueOptions) {
    return apiServicesAdmin.delete(
      `${GROUP_API.DELETE_GROUP}/${options?.params?.id}`,
      options?.params
    );
  },
  adminUpdateOrganization(options?: ValueOptions) {
    return apiServicesAdmin.put(
      `${GROUP_API.UPDATE_GROUP}/${options?.params?.id}`,
      options?.params
    );
  },
  adminGetOrganizationDetail(options?: ValueOptions) {
    return apiServicesAdmin.get(
      `${GROUP_API.GET_GROUP_LIST}/details/${options?.params?.id}`
    );
  },

  adminUpdateUserDetail(options?: ValueOptions) {
    return apiServicesAdmin.put(
      `${ADMIN_API.UPDATE_USER_INFO}/${options?.params?.id}`,
      options?.params
    );
  },
  updateOrganizationUser(options?: ValueOptions) {
    return apiServices.put(
      `${USERS_API.USER}/update/${options?.params?.id}`,
      options?.params
    );
  },
};

export default GroupServices;
