export const AUTH_API = {
  SIGNIN: "/auth/login-user",
  REGISTER: "auth/register-user",
  FORGOT_PASSWORD: "auth/recover-password-user",
  RESET_PASSWORD: "auth/reset-password-user",
  CHECK_USER_EXIST: "auth/check-user-exists",
  ACCEPT_TERMS_AND_PRIVACY: "user/accept-policy",
};
export const AUTH_API_ADMIN = {
  SIGNIN: "/auth/login-admin",
  F5_TOKEN: "/auth/refresh-token-admin",
  RECOVER_PASSWORD: "/auth/recover-password-admin",
  RESET_PASSWORD: "/auth/reset-password-admin",
};

export const USERS_API = {
  GET_USERS: "/users",
  GET_USER_INFO: "/user/info",
  USER: "/user",
  UPDATE_USER: "/user/:id",
  UPDATE_INFO: "/user/update-info",
  GET_ME: "/user/info-me",
  BULK_CREATE: "/user/bulk-create",
  GET_GROUP_USER_LIST: "/user/organization",
  CHANGE_PASSWORD: "/user/change-password",
};

export const DONOR_API = {
  GET_DONOR_LIST: "/donor",
  CREATE_DONOR: "/donor",
  GET_DONOR_DETAIL: "/donor",
  UPDATE_DONOR_DETAIL: "/donor",
  UPLOAD_REPORT: "/donor/:id/upload-report",
  DELETE_DONOR: "/donor/bulk-delete",
  DOWNLOAD_REPORT: "/donor/download-report",
};

export const ADMIN_API = {
  GET_ME: "/admin/info-me",
  GET_USER_LIST: "/admin/user-list",
  GET_USER_DETAIL: "admin/user-detail",
  GET_OVER_VIEW: "admin/user-overview",
  DELETE_DONOR: "/admin/bulk-delete-user",
  CREATE_USER: "/admin/create-user",
  DELEGATE_USER: "/admin/delegate-user",
  GET_CASE_LIST: "/admin/donor-list",
  GET_CASE_DETAIL: "/admin/donor-list",
  REMOVE_FROM_ADMIN: "/admin/revoke-admin",
  UPDATE_USER_INFO: "/admin/update-user",
  DELETE_CASE: "/admin/bulk-delete-donor",
};

export const GROUP_API = {
  GET_GROUP_LIST: "/organization",
  CREATE_GROUP: "/organization",
  DELETE_GROUP: "/organization",
  UPDATE_GROUP: "/organization",
};
