import { START_LOADING, STOP_LOADING } from "./action-type";

export const startLoading = (payload: any) => ({
  type: START_LOADING,
  payload,
});

export const stopLoading = (payload: any) => ({
  type: STOP_LOADING,
  payload,
});
