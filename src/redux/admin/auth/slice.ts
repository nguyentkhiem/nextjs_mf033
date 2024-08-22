import { IUser } from "@/types/auth.type";
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateAuth {
  isLogin: boolean;
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isEmailSent: boolean;
  user: {
    id: number;
    username: string;
    email: string;
    isAccepted: boolean;
  } | null;
}

const initialState: InitialStateAuth = {
  isLogin: false,
  loading: false,
  accessToken: null,
  refreshToken: null,
  isEmailSent: false,
  user: null,
};

const slice = createSlice({
  name: "auth-admin",
  initialState,
  reducers: {
    logout: (state) => initialState,
    loginSuccess: (state, action) => ({
      ...state,
      isLogin: true,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
    }),
    sentEmail: (state, action) => ({
      ...state,
      isEmailSent: action.payload,
    }),
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    loading: (state, action) => ({ ...state, loading: action.payload }),
  },
});

export const { actions, reducer } = slice;
