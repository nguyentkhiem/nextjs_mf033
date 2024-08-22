import * as slice from "./slice";
import adminCaseListSaga from "./saga";

export const {
  getDonorList,
  getDonorListSuccess,
  loading,
  getDonorDetailSuccess,
  setDonorReport,
  addNewReport,
  getSharedUserDataSuccess,
  reset,
} = slice.actions;

export { adminCaseListSaga };
export default slice.reducer;
