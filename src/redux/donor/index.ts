import * as slice from "./slice";
import donorSaga from "./saga";

export const {
  getDonorList,
  getDonorListSuccess,
  loading,
  getDonorDetailSuccess,
  setIsShowRegisterUnosModal,
  setIsShowCreateDonorModal,
  uploadDonorSuccess,
  setRegisterDonorStatus,
  getTemplateSuccess,
  setRequestPathologySuccess,
  setUploadProcess,
  setFileSize,
  setCreatedDonor,
  registerDonorFailed,
} = slice.actions;

export { donorSaga };
export default slice.reducer;
