import { createSlice } from "@reduxjs/toolkit";
import {
  IAnalysisResults,
  UserGetAnalysisResultSuccess,
} from "./actions-types";

interface InitialStateAuth {
  loading: boolean;
  data: IAnalysisResults | null;
}

const initialState: InitialStateAuth = {
  loading: false,
  data: null,
};

const slice = createSlice({
  name: "slide",
  initialState,
  reducers: {
    getAnalysisResultSuccess: (
      state,
      action: UserGetAnalysisResultSuccess
    ) => ({
      ...state,
      data: action.payload.data,
    }),

    loading: (state, action) => ({ ...state, loading: action.payload }),
  },
});

export const { actions, reducer } = slice;
