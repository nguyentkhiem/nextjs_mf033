import { IUser } from "@/types/auth.type";
import { createSlice } from "@reduxjs/toolkit";

interface LoadingFeatureState {
  loading: boolean;
}

const initialState: LoadingFeatureState = {
  loading: false,
};

const slice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state, action) => ({
      loading: true,
    }),
    stopLoading: (state, action) => ({
      loading: false,
    }),
  },
});

export const { actions, reducer } = slice;
