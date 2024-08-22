export const USER_GET_ANALYSIS_RESULTS_REQUEST =
  "USER_GET_ANALYSIS_RESULTS_REQUEST";
export const USER_GET_ANALYSIS_RESULTS_SUCCESS =
  "USER_GET_ANALYSIS_RESULTS_SUCCESS";
export const USER_GET_ANALYSIS_RESULTS_FAILURE =
  "USER_GET_ANALYSIS_RESULTS_FAILURE";

export const USER_PUT_CALCULATION_PARAMS_REQUEST =
  "USER_PUT_CALCULATION_PARAMS_REQUEST";
export const USER_PUT_CALCULATION_PARAMS_SUCCESS =
  "USER_PUT_CALCULATION_PARAMS_SUCCESS";
export const USER_PUT_CALCULATION_PARAMS_FAILURE =
  "USER_PUT_CALCULATION_PARAMS_FAILURE";

export interface IAnalysisResults {
  id: number;
  calcStatus: string;
  calcParams: {
    macroMicroFatThreshold: number;
    fatMinThreshold: number;
    rangeForMicroFatSemiQuantification: number;
  };
  calcResult: {
    originalImage: Array<any>;
    resultImage: Array<any>;
    macroMicroFatThreshold: number;
    fatMinThreshold: number;
    rangeForMicroFatSemiQuantification: number;
    imageTarget: string;
    statisticsInfo: Array<{
      cellAreaRatio: string;
      nucleusAreaRatio: string;
      nucleusMeanSize: string;
      fatAreaRatio: string;
      macroFatRatio: string;
      adjustedMacroFatRatio: string;
      microFatRatio: string;
      microFatRatioSemiQuantification: string;
    }>;
    statisticsInfoTotal: {
      cellAreaRatio: string;
      nucleusAreaRatio: string;
      nucleusMeanSize: string;
      fatAreaRatio: string;
      macroFatRatio: string;
      adjustedMacroFatRatio: string;
      microFatRatio: string;
      microFatRatioSemiQuantification: string;
    };
    nucleusSizeDistribution: Array<{
      data: Array<any>;
      layout: any;
    }>;
    fatSizeDistribution: Array<{
      data: Array<{
        line: {
          color: string;
        };
        nbinsx: number;
        mode: string;
        x: Array<number>;
        y: Array<number>;
        type: string;
        xaxis: string;
        yaxis: string;
      }>;
      layout: any;
    }>;

    fatSizeDistributionTotal: {
      data: Array<{
        line: {
          color: string;
        };
        nbinsx: number;
        mode: string;
        x: Array<number>;
        y: Array<number>;
        type: string;
        xaxis: string;
        yaxis: string;
      }>;
      layout: any;
    };
    nucleusSizeDistributionTotal: {
      data: Array<any>;
      layout: any;
    };
  };
}

export interface IAnalysisResultsResponse {
  id: number;
  calcStatus: string;
  calcResult: {
    filename: string;
    macroMicroFatThreshold?: number;
    fatMinThreshold?: number;
    rangeForMicroFatSemiQuantification?: number;
    imageTarget?: string;
    statisticsInfo?: Array<{
      cellAreaRatio?: string;
      nucleusAreaRatio?: string;
      nucleusMeanSize?: string;
      fatAreaRatio?: string;
      macroFatRatio?: string;
      adjustedMacroFatRatio?: string;
      microFatRatio?: string;
      microFatRatioSemiQuantification?: string;
    }>;
    statisticsInfoTotal?: {
      cellAreaRatio?: string;
      nucleusAreaRatio?: string;
      nucleusMeanSize?: string;
      fatAreaRatio?: string;
      macroFatRatio?: string;
      adjustedMacroFatRatio?: string;
      microFatRatio?: string;
      microFatRatioSemiQuantification?: string;
    };
    nucleusSizeDistribution?: Array<{
      data: Array<any>;
      layout: any;
    }>;
    fatSizeDistribution?: Array<{
      data: Array<{
        line: {
          color: string;
        };
        nbinsx: number;
        mode: string;
        x: Array<number>;
        y: Array<number>;
        type: string;
        xaxis: string;
        yaxis: string;
      }>;
      layout: any;
    }>;

    fatSizeDistributionTotal?: {
      data: Array<{
        line: {
          color: string;
        };
        nbinsx: number;
        mode: string;
        x: Array<number>;
        y: Array<number>;
        type: string;
        xaxis: string;
        yaxis: string;
      }>;
      layout: any;
    };
    nucleusSizeDistributionTotal?: {
      data: Array<any>;
      layout: any;
    };
  };
  calcParams: {
    macroMicroFatThreshold: number;
    fatMinThreshold: number;
    rangeForMicroFatSemiQuantification: number;
  };
}

export interface GetAnalysisResultResponse {
  data: IAnalysisResults;
}

export interface GetAnalysisResultRequest {
  id: number;
}

export interface PutCalculationParamsRequest {
  id: number;
  macroMicroFatThreshold: number;
  fatMinThreshold: number;
  rangeForMicroFatSemiQuantification: number;
}

export interface UserGetAnalysisResultRequest {
  type: string;
  payload: GetAnalysisResultRequest;
}

export type UserGetAnalysisResultSuccess = {
  type: string;
  payload: GetAnalysisResultResponse;
};
export type UserGetAnalysisResultFailure = {
  type: string;
  payload: any;
};

export interface UserPutCalculationParamsRequest {
  type: string;
  payload: PutCalculationParamsRequest;
}

export type UserPutCalculationParamsSuccess = {
  type: string;
  payload: GetAnalysisResultResponse;
};
export type UserPutCalculationParamsFailure = {
  type: string;
  payload: any;
};

export type UserHomeActions =
  | UserGetAnalysisResultRequest
  | UserGetAnalysisResultSuccess
  | UserGetAnalysisResultFailure
  | UserPutCalculationParamsRequest
  | UserPutCalculationParamsSuccess
  | UserPutCalculationParamsFailure;
