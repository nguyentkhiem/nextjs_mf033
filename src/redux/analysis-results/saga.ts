import { call, put, takeEvery } from "redux-saga/effects";

import i18n from "@/app/i18n";
import HomeServices from "@/services/home.services";
import { notification } from "antd";
import axios, { AxiosResponse, HttpStatusCode } from "axios";
import { getAnalysisResultSuccess, loading } from ".";
import {
  GetAnalysisResultResponse,
  IAnalysisResultsResponse,
  USER_GET_ANALYSIS_RESULTS_REQUEST,
  USER_PUT_CALCULATION_PARAMS_REQUEST,
  UserGetAnalysisResultRequest,
  UserPutCalculationParamsRequest,
} from "./actions-types";
import { userGetAnalysisResultsRequest } from "./actions";

const getCalcResult = async (fileName: string) => {
  const response = await axios.get(fileName);
  return response.data;
};

function* handleUserGetAnalysisResult(action: UserGetAnalysisResultRequest) {
  yield put(loading(true));
  try {
    const response: AxiosResponse<{ data: IAnalysisResultsResponse }> =
      yield HomeServices.getAnalysisResult({
        params: action.payload,
      });

    const calcResponse: AxiosResponse<any> = yield call(
      getCalcResult,
      response.data.data?.calcResult?.filename || ""
    );

    yield put(
      getAnalysisResultSuccess({
        data: {
          ...response.data.data,
          calcResult:
            response.data.data?.calcResult?.fatMinThreshold !== undefined ||
            response.data.data?.calcResult?.fatSizeDistribution !== undefined ||
            response.data.data?.calcResult?.fatSizeDistributionTotal !==
              undefined ||
            response.data.data?.calcResult?.nucleusSizeDistribution !==
              undefined ||
            response.data.data?.calcResult?.nucleusSizeDistributionTotal !==
              undefined ||
            response.data.data?.calcResult?.statisticsInfo !== undefined ||
            response.data.data?.calcResult?.statisticsInfoTotal !== undefined
              ? {
                  fatMinThreshold:
                    response.data.data?.calcResult?.fatMinThreshold,
                  fatSizeDistribution:
                    response.data.data?.calcResult?.fatSizeDistribution,
                  fatSizeDistributionTotal:
                    response.data.data?.calcResult?.fatSizeDistributionTotal,
                  nucleusSizeDistribution:
                    response.data.data?.calcResult?.nucleusSizeDistribution,
                  nucleusSizeDistributionTotal:
                    response.data.data?.calcResult
                      ?.nucleusSizeDistributionTotal,
                  statisticsInfo: (calcResponse as any)?.statisticsInfo,
                  statisticsInfoTotal: (calcResponse as any)
                    ?.statisticsInfoTotal,
                  originalImage: (calcResponse as any)?.originalImage,
                  resultImage: (calcResponse as any)?.resultImage,
                }
              : (calcResponse as any),
        },
      })
    );
    yield put(loading(false));
  } catch (error: any) {
    console.log("error", error);

    // if(error)
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "get-donor-detail-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
    yield put(loading(false));
  } finally {
    // yield put(stopLoading({}));
    // yield put(loginLoading(false));
  }
}

function* handleUserPutCalculationParams(
  action: UserPutCalculationParamsRequest
) {
  yield put(loading(true));

  try {
    const response: AxiosResponse<any> =
      yield HomeServices.putCalculationParams({
        params: action.payload,
      });
    // yield put(getAnalysisResultSuccess(response.data));
    yield put(userGetAnalysisResultsRequest({ id: action.payload.id }));
    yield put(loading(false));
  } catch (error: any) {
    // if(error)
    if (error.response?.status !== HttpStatusCode.Unauthorized) {
      notification.error({
        key: "get-donor-detail-error",
        message: i18n.t("common.error"),
        description: error.response?.data?.error?.message,
      });
    }
    yield put(loading(false));
  } finally {
    // yield put(stopLoading({}));
    // yield put(loginLoading(false));
  }
}

export default function* homeSaga() {
  yield takeEvery(
    USER_GET_ANALYSIS_RESULTS_REQUEST,
    handleUserGetAnalysisResult
  );
  yield takeEvery(
    USER_PUT_CALCULATION_PARAMS_REQUEST,
    handleUserPutCalculationParams
  );
}
