import { set } from "lodash";
import * as slice from "./slice";
import adminGroup from "./saga";

export const {
  getGroupUserList,
  getGroupUserListSuccess,
  loading,
  setGroupUserReport,
  setDelegateAdminSuccess,
  setDeleteUserSuccess,
  getGroupListRequest,
  getGroupListSuccess,
  getGroupUserDetailSuccess,
  setIsCreateUserSuccess,
  setIsDeleteUserSuccess,
  setIsDelegateUserSuccess,
  setIsRemoveFromAdminSuccess,
  setError,
  setIsUpdateOrganizationSuccess,
  setIsCreateOrganizationSuccess,
  setIsDeleteOrganizationSuccess,
  setOrganizationDetail,
  setIsEditingMember,
} = slice.actions;

export { adminGroup };
export default slice.reducer;
