import {
  CheckDonorCodeRequest,
  CreateDonorCommentRequest,
  CreateDonorRequest,
  DeleteDonorCommentsRequest,
  DeleteDonorReportRequest,
  DeleteDonorRequest,
  RequestPathologyRequest,
  UpdateDonorRequest,
  UploadDonorSlideRequest,
  UploadReportRequest,
  USER_CHECK_DONOR_CODE_REQUEST,
  USER_CREATE_COMMENT_REQUEST,
  USER_CREATE_DONOR_REQUEST,
  USER_DELETE_COMMENTS_REQUEST,
  USER_DELETE_DONOR_REPORT_REQUEST,
  USER_DELETE_DONOR_REQUEST,
  USER_GET_DOWNLOAD_LINK_REQUEST,
  USER_GET_REPORT_TEMPLATE_REQUEST,
  USER_REQUEST_PATHOLOGY_REQUEST,
  USER_UPDATE_DONOR_REQUEST,
  USER_UPLOAD_DONOR_SLIDE_REQUEST,
  USER_UPLOAD_REPORT_REQUEST,
  UserCheckDonorCodeRequest,
  UserCreateDonorCommentRequest,
  UserCreateDonorRequest,
  UserDeleteDonorCommentsRequest,
  UserDeleteDonorReportRequest,
  UserDeleteDonorRequest,
  UserGetReportLinkRequest,
  UserGetReportTemplateRequest,
  UserRequestPathologyRequest,
  UserUpdateDonorRequest,
  UserUploadDonorSlideRequest,
  UserUploadReportRequest,
} from "./actions-types";

export const userUploadReportRequest = (
  payload: UploadReportRequest
): UserUploadReportRequest => ({
  type: USER_UPLOAD_REPORT_REQUEST,
  payload,
});

export const userUploadDonorSlideRequest = (
  payload: UploadDonorSlideRequest
): UserUploadDonorSlideRequest => ({
  type: USER_UPLOAD_DONOR_SLIDE_REQUEST,
  payload,
});

export const userRequestPathologyRequest = (
  payload: RequestPathologyRequest
): UserRequestPathologyRequest => ({
  type: USER_REQUEST_PATHOLOGY_REQUEST,
  payload,
});

export const userCreateDonorRequest = (
  payload: CreateDonorRequest
): UserCreateDonorRequest => ({
  type: USER_CREATE_DONOR_REQUEST,
  payload,
});
export const userUpdateDonorRequest = (
  payload: UpdateDonorRequest
): UserUpdateDonorRequest => ({
  type: USER_UPDATE_DONOR_REQUEST,
  payload,
});

export const userDeleteDonorRequest = (
  payload: DeleteDonorRequest
): UserDeleteDonorRequest => ({
  type: USER_DELETE_DONOR_REQUEST,
  payload,
});

export const userGetReportLinkRequest = (payload: {
  id: string;
  fileName: string;
}): UserGetReportLinkRequest => ({
  type: USER_GET_DOWNLOAD_LINK_REQUEST,
  payload,
});

export const userCreateDonorCommentRequest = (
  payload: CreateDonorCommentRequest
): UserCreateDonorCommentRequest => ({
  type: USER_CREATE_COMMENT_REQUEST,
  payload,
});

export const userGetReportTemplateRequest =
  (): UserGetReportTemplateRequest => ({
    type: USER_GET_REPORT_TEMPLATE_REQUEST,
  });
export const userDeleteDonorReportRequest = (
  payload: DeleteDonorReportRequest
): UserDeleteDonorReportRequest => ({
  type: USER_DELETE_DONOR_REPORT_REQUEST,
  payload,
});

export const userCheckDonorCodeRequest = (
  payload: CheckDonorCodeRequest
): UserCheckDonorCodeRequest => ({
  type: USER_CHECK_DONOR_CODE_REQUEST,
  payload,
});

export const userDeleteDonorCommentsRequest = (
  payload: DeleteDonorCommentsRequest
): UserDeleteDonorCommentsRequest => ({
  type: USER_DELETE_COMMENTS_REQUEST,
  payload,
});
