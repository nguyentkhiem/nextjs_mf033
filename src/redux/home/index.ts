import * as slice from "./slice";
import homeSaga from "./saga";

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

export { homeSaga };
export default slice.reducer;
