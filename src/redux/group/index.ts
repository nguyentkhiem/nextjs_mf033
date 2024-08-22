import * as slice from "./slice";
import groupSaga from "./saga";

export const {
  getGroupUserList,
  getGroupUserListSuccess,
  loading,
  getGroupUserDetailSuccess,
  setGroupUserReport,
  setDelegateAdminSuccess,
  setDeleteUserSuccess,
  setIsEditingMember,
  loadMorePathologyList,
  setPathologyList,
} = slice.actions;

export { groupSaga };
export default slice.reducer;
