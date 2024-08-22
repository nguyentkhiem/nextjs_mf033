import { loginLoading } from "@/redux/auth";
import {
  getTemplateSuccess,
  registerDonorFailed,
  setCreatedDonor,
  setFileSize,
  setIsShowCreateDonorModal,
  setRegisterDonorStatus,
  setRequestPathologySuccess,
  setUploadProcess,
  uploadDonorSuccess,
} from "@/redux/donor";
import { put, takeEvery } from "redux-saga/effects";

import i18n from "@/app/i18n";
import { notification } from "antd";
import axios, { AxiosResponse, HttpStatusCode } from "axios";
import { userGetDonorListRequest } from "@/redux/home/actions";
import { apiServicesGCP } from "@/services/api";
import HomeServices from "@/services/home.services";
import { addNewReport } from "../home";
import { userGetDonorDetailRequest } from "../home/actions";
import { startLoading, stopLoading } from "../loading";
import {
  CreateDonorResponse,
  DeleteDonorResponse,
  GenGCPUrlResponse,
  GetReportTemplateResponse,
  RequestPathologyResponse,
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
import { store } from "../store";
import EventEmitter from "events";
const controller = new AbortController();

let source: any;
function* handleUserUploadReport(action: UserUploadReportRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<GenGCPUrlResponse> =
      yield HomeServices.getUploadReportSignedUrl({
        params: { originalFilename: action.payload.file.name },
      });

    const gcpurlResponse: AxiosResponse<any> = yield apiServicesGCP.put(
      response.data.data.signedUrl,
      action.payload.file,
      {
        headers: {
          "Content-Type":
            "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      }
    );
    yield HomeServices.createReport({
      params: {
        id: action.payload.id,
        reportIds: [response.data.data.report.id],
      },
    });
    // yield put(userGetDonorDetailRequest({ id: action.payload.id }));
    yield put(addNewReport(response.data.data.report));
    notification.success({
      key: "upload-donor-report-success",
      message: i18n.t("common.success"),
      description: "Upload report success",
    });
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "upload-donor-report-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleUserRequestPathology(action: UserRequestPathologyRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<RequestPathologyResponse> =
      yield HomeServices.requestPathology({
        params: action.payload,
      });

    yield put(setRequestPathologySuccess(true));
    notification.success({
      message: i18n.t("common.success"),
      description: "Request pathology success",
    });
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "request-pathology-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleUserUploadDonorSlide(action: UserUploadDonorSlideRequest) {
  yield put(startLoading({}));
  source = axios.CancelToken.source();
  try {
    const response: AxiosResponse<GenGCPUrlResponse> =
      yield HomeServices.getGCPSignedUrl({
        params: { originalFilename: action.payload.gcpFile.name },
      });
    yield put(setIsShowCreateDonorModal(true));

    axios.put(response.data.data.signedUrl, action.payload.gcpFile, {
      headers: {
        "Content-Type":
          "application/octet-stream,image/tiff,image/x-tiff,image/jpeg,image/png",
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded / (progressEvent?.total || 0)) * 100
        );
        store.dispatch(setFileSize(progressEvent.total));
        store.dispatch(setUploadProcess(percent));
        if (percent === 100) {
          if (response.data.data?.slide?.status !== "PASS") {
            HomeServices.updateSlideStatus({
              params: {
                id: response.data.data?.slide?.id,
                status: "UPLOADED",
                fileSize: progressEvent.total,
              },
            });
          }
        }
      },
      cancelToken: source.token,
    });

    // uploadController.upload.addEventListener("progress", function (event) {

    // });
    // uploadController.setRequestHeader(
    //   "Content-Type",
    //   "application/octet-stream,image/tiff,image/x-tiff,image/jpeg,image/png"
    // );
    // uploadController.send();
    // const gcpurlResponse: AxiosResponse<any> = yield apiServicesGCP.put(
    //   response.data.data.signedUrl,
    //   action.payload.gcpFile,
    //   {
    //     headers: {
    //       "Content-Type":
    //         "application/octet-stream,image/tiff,image/x-tiff,image/jpeg,image/png",
    //     },
    //   }
    // );

    yield put(userGetDonorListRequest({ page: 1, limit: 12 }));
    yield put(
      uploadDonorSuccess({
        data: {
          slideGcsFilename: response.data.data.gcsFilename,
          previewUrl: response.data.data.dziFileUrl,
          slideId: response.data.data?.slide?.id,
        },
      })
    );
    // notification.success({
    //   message: i18n.t("common.success"),
    //   description: "Upload slide success",
    // });
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "upload-slide-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleUserCreateDonor(action: UserCreateDonorRequest) {
  // yield put(startLoading({}));
  try {
    const response: AxiosResponse<CreateDonorResponse> =
      yield HomeServices.createDonor({
        params: action.payload,
      });

    notification.success({
      key: "create-donor-success",
      message: i18n.t("common.success"),
      description: "Create donor success",
    });
    yield put(userGetDonorListRequest({ page: 1, limit: 12 }));
    yield put(setRegisterDonorStatus("success"));
    yield put(setCreatedDonor(response.data.data));
    // yield put(setIsShowCreateDonorModal(false));
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      // notification.error({
      //   key: "create-donor-error",
      //   message: i18n.t("common.error"),
      //   description: error.response?.data?.error?.message,
      // });
    }
    yield put(setRegisterDonorStatus("failed"));
    yield put(registerDonorFailed(error.response?.data?.error?.message));
  } finally {
    yield put(stopLoading({}));
    // yield put(loginLoading(false));
  }
}
function* handleUserUpdateDonor(action: UserUpdateDonorRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<CreateDonorResponse> =
      yield HomeServices.updateDonor({
        params: action.payload,
      });

    notification.success({
      key: "update-donor-success",
      message: i18n.t("common.success"),
      description: "Update donor success",
    });
    yield put(userGetDonorDetailRequest({ id: action.payload.id }));
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "update-donor-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleUserDeleteDonor(action: UserDeleteDonorRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<DeleteDonorResponse> =
      yield HomeServices.deleteDonor({
        params: action.payload,
      });
    notification.success({
      key: "delete-donor-success",
      message: i18n.t("common.success"),
      description: "Delete donor success",
    });
    yield put(userGetDonorListRequest({ page: 1, limit: 12 }));
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "delete-donor-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleUserGetReportLink(action: UserGetReportLinkRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<Blob> =
      yield HomeServices.getDownloadLinkReport({
        params: action.payload,
        config: {
          responseType: "blob",
        },
      });
    if (response?.data) {
      const href = URL.createObjectURL(response?.data);
      const link = document.createElement("a");
      link.href = href;
      link.download = action.payload.fileName;
      document.body.appendChild(link);
      link.click();

      // clean up tag <a>
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "get-report-link-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleUserCreateDonorComment(action: UserCreateDonorCommentRequest) {
  yield put(startLoading({}));
  try {
    if (action.payload.file || action.payload.fileName) {
      const response: AxiosResponse<GenGCPUrlResponse> =
        yield HomeServices.getAttachmentPreSignedUrl({
          params: { originalFilename: action.payload.fileName },
        });
      const gcpurlResponse: AxiosResponse<any> = yield apiServicesGCP.put(
        response.data.data.signedUrl,
        action.payload.file,
        {
          headers: {
            "Content-Type":
              "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        }
      );
      yield HomeServices.createDonorComment({
        params: {
          comment: action.payload.comment,
          attachmentGcsFilename: response.data.data.gcsFilename,
          id: action.payload.id,
          originalFilename: action.payload.originalFilename,
        },
      });
    } else {
      yield HomeServices.createDonorComment({
        params: {
          comment: action.payload.comment,
          id: action.payload.id,
        },
      });
    }

    yield put(userGetDonorDetailRequest({ id: action.payload.id }));
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "get-donor-detail-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleUserGetReportTemplate(action: UserGetReportTemplateRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<GetReportTemplateResponse> =
      yield HomeServices.getReportTemplate();
    yield put(getTemplateSuccess(response.data));
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "delete-donor-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleUserDeleteDonorReport(action: UserDeleteDonorReportRequest) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<DeleteDonorResponse> =
      yield HomeServices.deleteDonorReport({
        params: action.payload,
      });
    notification.success({
      key: "update-donor-success",
      message: i18n.t("common.success"),
      description: "Update donor success",
    });
    yield put(userGetDonorDetailRequest({ id: action.payload.id }));
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "delete-donor-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* handleUserDeleteDonorComments(
  action: UserDeleteDonorCommentsRequest
) {
  yield put(startLoading({}));
  try {
    const response: AxiosResponse<DeleteDonorResponse> =
      yield HomeServices.deleteDonorComments({
        params: action.payload,
      });
    notification.success({
      key: "delete-donor-success",
      message: i18n.t("common.success"),
      description: "Delete comment success",
    });
    yield put(userGetDonorDetailRequest({ id: action.payload.donorId }));
  } catch (error: any) {
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "delete-donor-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
  } finally {
    yield put(stopLoading({}));
    yield put(loginLoading(false));
  }
}

function* cancelUpload(action: any) {
  // cancel upload request
  source.cancel("Upload canceled by the user.");
}

export default function* donorSaga() {
  yield takeEvery(USER_UPLOAD_REPORT_REQUEST, handleUserUploadReport);
  yield takeEvery(USER_REQUEST_PATHOLOGY_REQUEST, handleUserRequestPathology);
  yield takeEvery(USER_UPLOAD_DONOR_SLIDE_REQUEST, handleUserUploadDonorSlide);
  yield takeEvery(USER_CREATE_DONOR_REQUEST, handleUserCreateDonor);
  yield takeEvery(USER_DELETE_DONOR_REQUEST, handleUserDeleteDonor);
  yield takeEvery(USER_GET_DOWNLOAD_LINK_REQUEST, handleUserGetReportLink);
  yield takeEvery(USER_CREATE_COMMENT_REQUEST, handleUserCreateDonorComment);
  yield takeEvery(USER_UPDATE_DONOR_REQUEST, handleUserUpdateDonor);
  yield takeEvery(
    USER_GET_REPORT_TEMPLATE_REQUEST,
    handleUserGetReportTemplate
  );
  yield takeEvery(
    USER_DELETE_DONOR_REPORT_REQUEST,
    handleUserDeleteDonorReport
  );
  yield takeEvery("CANCEL_UPLOAD", cancelUpload);
  yield takeEvery(USER_DELETE_COMMENTS_REQUEST, handleUserDeleteDonorComments);
}
