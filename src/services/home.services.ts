import { DONOR_API } from "@/constants/api";
import { ValueOptions } from "@/types/common.types";
import { apiServices } from "./api";

const HomeServices = {
  getDonorList(options?: ValueOptions) {
    return apiServices.get(DONOR_API.GET_DONOR_LIST, options?.params);
  },
  getDonorDetail(options?: ValueOptions) {
    return apiServices.get(
      `${DONOR_API.GET_DONOR_LIST}/${options?.params?.id}`
    );
  },
  updateDonor(options?: ValueOptions) {
    return apiServices.put(
      `${DONOR_API.UPDATE_DONOR_DETAIL}/${options?.params?.id}`,
      options?.params
    );
  },
  createDonor(options?: ValueOptions) {
    return apiServices.post(DONOR_API.CREATE_DONOR, options?.params);
  },
  deleteDonor(options?: ValueOptions) {
    return apiServices.delete(DONOR_API.DELETE_DONOR, options?.params);
  },

  deleteDonorReport(options?: ValueOptions) {
    return apiServices.delete(
      `${DONOR_API.GET_DONOR_LIST}/report/${options?.params?.id}`,
      options?.params
    );
  },
  getDownloadLinkReport(options?: ValueOptions) {
    return apiServices.getBlob(
      `${DONOR_API.DOWNLOAD_REPORT}/${options?.params?.id}`,
      options?.params
    );
  },
  uploadReport(options?: ValueOptions) {
    return apiServices.post(
      `${DONOR_API.GET_DONOR_LIST}/${options?.params?.id}/upload-report`,
      options?.params,
      options?.config
    );
  },
  getUploadReportSignedUrl(options?: ValueOptions) {
    return apiServices.post(
      `${DONOR_API.GET_DONOR_LIST}/gen-upload-report-url`,
      options?.params,
      options?.config
    );
  },
  requestPathology(options?: ValueOptions) {
    return apiServices.post(
      `${DONOR_API.GET_DONOR_LIST}/share`,
      options?.params,
      options?.config
    );
  },
  uploadDonorSlide(options?: ValueOptions) {
    return apiServices.post(
      `${DONOR_API.GET_DONOR_LIST}/upload-slide`,
      options?.params,
      options?.config
    );
  },
  getGCPSignedUrl(options?: ValueOptions) {
    return apiServices.post(
      `${DONOR_API.GET_DONOR_LIST}/gen-upload-slide-url`,
      options?.params,
      options?.config
    );
  },
  getAttachmentPreSignedUrl(options?: ValueOptions) {
    return apiServices.post(
      `${DONOR_API.GET_DONOR_LIST}/gen-upload-attachment-url`,
      options?.params,
      options?.config
    );
  },
  createDonorComment(options?: ValueOptions) {
    return apiServices.post(
      `${DONOR_API.GET_DONOR_LIST}/${options?.params?.id}/add-comment`,
      options?.params,
      options?.config
    );
  },
  updateSlideStatus(options?: ValueOptions) {
    return apiServices.put(`slide/${options?.params?.id}`, options?.params);
  },
  getReportTemplate(options?: ValueOptions) {
    return apiServices.get(`report-template`, options?.params);
  },
  getSharedUserData(options?: ValueOptions) {
    return apiServices.get(
      `${DONOR_API.GET_DONOR_LIST}/public/${options?.params?.id}`,
      options?.params
    );
  },
  createReport(options?: ValueOptions) {
    return apiServices.post(
      `${DONOR_API.GET_DONOR_LIST}/report/${options?.params?.id}`,
      options?.params,
      options?.config
    );
  },
  getAnalysisResult(options?: ValueOptions) {
    return apiServices.get(`slide/calculation-result/${options?.params?.id}`);
  },
  putCalculationParams(options?: ValueOptions) {
    return apiServices.put(
      `slide/calculation-params/${options?.params?.id}`,
      options?.params
    );
  },

  checkDonorCode(options?: ValueOptions) {
    return apiServices.get(
      `${DONOR_API.GET_DONOR_LIST}/check-code`,
      options?.params
    );
  },
  deleteDonorComments(options?: ValueOptions) {
    return apiServices.delete(
      `${DONOR_API.GET_DONOR_LIST}/comment/${options?.params?.id}`,
      {
        commentId: options?.params?.id,
      }
    );
  },
};

export default HomeServices;
