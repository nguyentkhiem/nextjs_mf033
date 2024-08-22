import * as slice from "./slice";
import authSaga from "./saga";

export const {
  logout,
  loginSuccess,
  loading: loginLoading,
  registerSuccess,
  clearRegisterStatus,
  getMeSuccess,
  resetPasswordSuccess,
  clearResetPasswordStatus,
  updateUserInfoSuccess,
  clearUpdateUserInfoSuccess,
  checkIsExists,
  setIsSendMailStatus,
  setAddMemberSuccess,
  setUpdatePasswordSuccess,
} = slice.actions;

export { authSaga };
export default slice.reducer;
