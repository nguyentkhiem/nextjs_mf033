import {
  USER_GET_ANALYSIS_RESULTS_REQUEST,
  GetAnalysisResultRequest,
  UserGetAnalysisResultRequest,
  PutCalculationParamsRequest,
  UserPutCalculationParamsRequest,
  USER_PUT_CALCULATION_PARAMS_REQUEST,
} from "./actions-types";

export const userGetAnalysisResultsRequest = (
  payload: GetAnalysisResultRequest
): UserGetAnalysisResultRequest => ({
  type: USER_GET_ANALYSIS_RESULTS_REQUEST,
  payload,
});

export const userPutCalculationParamsRequest = (
  payload: PutCalculationParamsRequest
): UserPutCalculationParamsRequest => ({
  type: USER_PUT_CALCULATION_PARAMS_REQUEST,
  payload,
});
