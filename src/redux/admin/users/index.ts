import * as slice from "./slice";
import adminSaga from "./saga";

export const {
  loading,
  getListUserSuccess,
  getUserDetailSuccess,
  getOverViewSuccess,
  getUserList,
} = slice.actions;

export { adminSaga };
export default slice.reducer;
