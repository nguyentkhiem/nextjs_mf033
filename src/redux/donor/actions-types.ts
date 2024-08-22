import { RcFile } from "antd/es/upload";
import { IDonor, IReport } from "../home/actions-types";

export const USER_UPLOAD_REPORT_REQUEST = "USER_UPLOAD_REPORT_REQUEST";
export const USER_UPLOAD_REPORT_SUCCESS = "USER_UPLOAD_REPORT_SUCCESS";
export const USER_UPLOAD_REPORT_FAILURE = "USER_UPLOAD_REPORT_FAILURE";

export const USER_UPLOAD_DONOR_SLIDE_REQUEST =
  "USER_UPLOAD_DONOR_SLIDE_REQUEST";
export const USER_UPLOAD_DONOR_SLIDE_SUCCESS =
  "USER_UPLOAD_DONOR_SLIDE_SUCCESS";
export const USER_UPLOAD_DONOR_SLIDE_FAILURE =
  "USER_UPLOAD_DONOR_SLIDE_FAILURE";

export const USER_REQUEST_PATHOLOGY_REQUEST = "USER_REQUEST_PATHOLOGY_REQUEST";
export const USER_REQUEST_PATHOLOGY_SUCCESS = "USER_REQUEST_PATHOLOGY_SUCCESS";
export const USER_REQUEST_PATHOLOGY_FAILURE = "USER_REQUEST_PATHOLOGY_FAILURE";

export const USER_CREATE_DONOR_REQUEST = "USER_CREATE_DONOR_REQUEST";
export const USER_CREATE_DONOR_SUCCESS = "USER_CREATE_DONOR_SUCCESS";
export const USER_CREATE_DONOR_FAILURE = "USER_CREATE_DONOR_FAILURE";

export const USER_UPDATE_DONOR_REQUEST = "USER_UPDATE_DONOR_REQUEST";
export const USER_UPDATE_DONOR_SUCCESS = "USER_UPDATE_DONOR_SUCCESS";
export const USER_UPDATE_DONOR_FAILURE = "USER_UPDATE_DONOR_FAILURE";

export const USER_DELETE_DONOR_REQUEST = "USER_DELETE_DONOR_REQUEST";
export const USER_DELETE_DONOR_SUCCESS = "USER_DELETE_DONOR_SUCCESS";
export const USER_DELETE_DONOR_FAILURE = "USER_DELETE_DONOR_FAILURE";

export const USER_GET_DOWNLOAD_LINK_REQUEST = "USER_GET_DOWNLOAD_LINK_REQUEST";
export const USER_GET_DOWNLOAD_LINK_SUCCESS = "USER_GET_DOWNLOAD_LINK_SUCCESS";
export const USER_GET_DOWNLOAD_LINK_FAILURE = "USER_GET_DOWNLOAD_LINK_FAILURE";

export const USER_CREATE_COMMENT_REQUEST = "USER_CREATE_COMMENT_REQUEST";
export const USER_CREATE_COMMENT_SUCCESS = "USER_CREATE_COMMENT_SUCCESS";
export const USER_CREATE_COMMENT_FAILURE = "USER_CREATE_COMMENT_FAILURE";

export const USER_GET_REPORT_TEMPLATE_REQUEST =
  "USER_GET_REPORT_TEMPLATE_REQUEST";
export const USER_GET_REPORT_TEMPLATE_SUCCESS =
  "USER_GET_REPORT_TEMPLATE_SUCCESS";
export const USER_GET_REPORT_TEMPLATE_FAILURE =
  "USER_GET_REPORT_TEMPLATE_FAILURE";

export const USER_DELETE_DONOR_REPORT_REQUEST =
  "USER_DELETE_DONOR_REPORT_REQUEST";
export const USER_DELETE_DONOR_REPORT_SUCCESS =
  "USER_DELETE_DONOR_REPORT_SUCCESS";
export const USER_DELETE_DONOR_REPORT_FAILURE =
  "USER_DELETE_DONOR_REPORT_FAILURE";

export const USER_CHECK_DONOR_CODE_REQUEST = "USER_CHECK_DONOR_CODE_REQUEST";
export const USER_CHECK_DONOR_CODE_SUCCESS = "USER_CHECK_DONOR_CODE_SUCCESS";
export const USER_CHECK_DONOR_CODE_FAILURE = "USER_CHECK_DONOR_CODE_FAILURE";

export const USER_DELETE_COMMENTS_REQUEST = "USER_DELETE_COMMENTS_REQUEST";
export const USER_DELETE_COMMENTS_SUCCESS = "USER_DELETE_COMMENTS_SUCCESS";
export const USER_DELETE_COMMENTS_FAILURE = "USER_DELETE_COMMENTS_FAILURE";

export interface DeleteDonorReportResponse {
  data: boolean;
}

export interface DeleteDonorCommentsResponse {
  data: boolean;
}

export interface CheckDonorCodeResponse {
  data: boolean;
}

export interface UploadReportResponse {
  data: boolean;
}

export interface CreateDonorCommentResponse {
  data: boolean;
}

export interface ISlide {
  slideGcsFilename: string;
  previewUrl: string;
  slideId: number;
}

export interface GCPUrl {
  gcsFilename: string;
  signedUrl: string;
  report: IReport;
  dziFileUrl: string;
  slide: {
    id: number;
    status: string;
  };
}

export interface UploadDonorSlideResponse {
  data: ISlide;
}

export interface GenGCPUrlResponse {
  data: GCPUrl;
}

export interface DeleteDonorResponse {
  data: boolean;
}

export interface CreateDonorResponse {
  data: IDonor;
}

export interface UploadReportRequest {
  file: RcFile;
  id: number;
}

export interface CreateDonorCommentRequest {
  fileName: string;
  comment: string;
  id: number;
  file: RcFile;
  originalFilename: string;
}

export interface DeleteDonorRequest {
  donorIds: string[];
}

export interface DeleteDonorCommentsRequest {
  donorId: number;
  id: number;
}

export interface DeleteDonorReportRequest {
  remainingReportIds: number[];
  id: number;
}

export interface CheckDonorCodeRequest {
  code: string;
}

export interface UploadDonorSlideRequest {
  gcpFile: RcFile;
}

export interface CreateDonorRequest {
  slideGcsFilename: string;
  donorCode: string;
  sex?: string;
  birthday?: string;
  location?: string;
  causeOfDeath?: string;
  donorType?: string;
  organ: string;
  personInCharge?: string;
  comment: string;
  slideId: number;
}

export interface GetReportTemplateResponse {
  data: {
    items: Array<{
      createdAt: string;
      updatedAt: string;
      id: number;
      code: string;
      content: string;
    }>;
    total: number;
  };
}

export interface UpdateDonorRequest {
  donorCode: string;
  organ: string;
  comment: string;
  id: number;
  // reportIds: number[];
}

export interface RequestPathologyRequest {
  donorId: number;
  userIds: Array<number>;
}

export interface UserUploadReportRequest {
  type: string;
  payload: UploadReportRequest;
}

export interface UserDeleteDonorRequest {
  type: string;
  payload: DeleteDonorRequest;
}

export interface UserCreateDonorRequest {
  type: string;
  payload: CreateDonorRequest;
}

export type UserUploadReportSuccess = {
  type: string;
  payload: UploadReportResponse;
};

export interface UserUpdateDonorRequest {
  type: string;
  payload: UpdateDonorRequest;
}
export interface UserUpdateDonorSuccess {
  type: string;
  payload: CreateDonorResponse;
}
export interface UserUpdateDonorFailure {
  type: string;
  payload: any;
}

export type UserDeleteDonorSuccess = {
  type: string;
  payload: DeleteDonorResponse;
};

export type UserCreateDonorSuccess = {
  type: string;
  payload: CreateDonorResponse;
};

export type UserUploadReportFailure = {
  type: string;
  payload: any;
};

export type UserDeleteDonorFailure = {
  type: string;
  payload: any;
};

export type UserCreateDonorFailure = {
  type: string;
  payload: any;
};

export interface UserUploadDonorSlideRequest {
  type: string;
  payload: UploadDonorSlideRequest;
}

export type UserUploadDonorSlideSuccess = {
  type: string;
  payload: UploadDonorSlideResponse;
};

export type UserUploadDonorSlideFailure = {
  type: string;
  payload: any;
};

export interface RequestPathologyResponse {
  data: any;
}

export interface UserRequestPathologyRequest {
  type: string;
  payload: RequestPathologyRequest;
}

export type UserRequestPathologySuccess = {
  type: string;
  payload: RequestPathologyResponse;
};

export type UserRequestPathologyFailure = {
  type: string;
  payload: any;
};

export interface UserGetReportLinkRequest {
  type: string;
  payload: {
    id: string;
    fileName: string;
  };
}

export type UserGetReportLinkSuccess = {
  type: string;
  payload: any;
};

export type UserGetReportLinkFailure = {
  type: string;
  payload: any;
};

export interface UserCreateDonorCommentRequest {
  type: string;
  payload: CreateDonorCommentRequest;
}

export type UserCreateDonorCommentSuccess = {
  type: string;
  payload: CreateDonorCommentResponse;
};

export type UserCreateDonorCommentFailure = {
  type: string;
  payload: any;
};

export interface UserGetReportTemplateRequest {
  type: string;
}

export type UserGetReportTemplateSuccess = {
  type: string;
  payload: GetReportTemplateResponse;
};

export type UserGetReportTemplateFailure = {
  type: string;
  payload: any;
};

export interface UserDeleteDonorReportRequest {
  type: string;
  payload: DeleteDonorReportRequest;
}

export type UserDeleteDonorReportSuccess = {
  type: string;
  payload: DeleteDonorReportResponse;
};

export type UserDeleteDonorReportFailure = {
  type: string;
  payload: any;
};

export interface UserCheckDonorCodeRequest {
  type: string;
  payload: CheckDonorCodeRequest;
}

export type UserCheckDonorCodeSuccess = {
  type: string;
  payload: CheckDonorCodeResponse;
};

export type UserCheckDonorCodeFailure = {
  type: string;
  payload: any;
};

export interface UserDeleteDonorCommentsRequest {
  type: string;
  payload: DeleteDonorCommentsRequest;
}

export type UserDeleteDonorCommentsSuccess = {
  type: string;
  payload: DeleteDonorCommentsResponse;
};

export type UserDeleteDonorCommentsFailure = {
  type: string;
  payload: any;
};

export type UserHomeActions =
  | UserUploadReportRequest
  | UserUploadReportSuccess
  | UserUploadReportFailure
  | UserRequestPathologyRequest
  | UserRequestPathologySuccess
  | UserRequestPathologyFailure
  | UserUploadDonorSlideRequest
  | UserUploadDonorSlideSuccess
  | UserUploadDonorSlideFailure
  | UserCreateDonorRequest
  | UserCreateDonorSuccess
  | UserCreateDonorFailure
  | UserDeleteDonorRequest
  | UserDeleteDonorSuccess
  | UserDeleteDonorFailure
  | UserGetReportLinkRequest
  | UserGetReportLinkSuccess
  | UserGetReportLinkFailure
  | UserCreateDonorCommentRequest
  | UserCreateDonorCommentSuccess
  | UserCreateDonorCommentFailure
  | UserUpdateDonorRequest
  | UserUpdateDonorSuccess
  | UserUpdateDonorFailure
  | UserGetReportTemplateRequest
  | UserGetReportTemplateSuccess
  | UserGetReportTemplateFailure
  | UserDeleteDonorReportRequest
  | UserDeleteDonorReportSuccess
  | UserDeleteDonorReportFailure
  | UserCheckDonorCodeRequest
  | UserCheckDonorCodeSuccess
  | UserCheckDonorCodeFailure
  | UserDeleteDonorCommentsRequest
  | UserDeleteDonorCommentsSuccess
  | UserDeleteDonorCommentsFailure;
