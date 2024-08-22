import { IUser } from "@/types/auth.type";
import { createSlice } from "@reduxjs/toolkit";
import {
  CheckUserExistRequest,
  CheckUserExistSuccess,
  IMe,
  UserGetMeSuccess,
  UserLoginSuccess,
  UserRegisterSuccess,
  UserReserPasswordSuccess,
} from "./actions-types";

interface InitialStateAuth {
  isLogin: boolean;
  loading: boolean;
  token: string;
  refreshToken: string;
  user?: IMe;
  isRegisterSuccess: boolean;
  isResetPasswordSuccess: boolean;
  isUpdateInfoSuccess: boolean;
  isExists: boolean;
  isSendMailRegisterSucess: boolean;
  isAddMemberSuccess: boolean;
  isUpdatePasswordSuccess: boolean;
  error: any;
}

const initialState: InitialStateAuth = {
  isLogin: false,
  loading: false,
  token: "",
  refreshToken: "",
  isRegisterSuccess: false,
  isResetPasswordSuccess: false,
  isUpdateInfoSuccess: false,
  isExists: false,
  isSendMailRegisterSucess: false,
  isAddMemberSuccess: false,
  error: null,
  isUpdatePasswordSuccess: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => initialState,
    loginSuccess: (state, action: UserLoginSuccess) => ({
      ...state,
      isLogin: true,
      token: action.payload.data.accessToken,
      refreshToken: action.payload.data.accessToken,
    }),
    registerSuccess: (state, action: UserRegisterSuccess) => ({
      ...state,
      isRegisterSuccess: true,
    }),
    clearRegisterStatus: (state, action) => ({
      ...state,
      isRegisterSuccess: false,
    }),
    setAddMemberSuccess: (state, action) => ({
      ...state,
      isAddMemberSuccess: action.payload,
    }),
    resetPasswordSuccess: (state, action: UserReserPasswordSuccess) => ({
      ...state,
      isResetPasswordSuccess: action.payload.data,
    }),
    clearResetPasswordStatus: (state, action) => ({
      ...state,
      isResetPasswordSuccess: false,
    }),
    getMeSuccess: (state, action: UserGetMeSuccess) => ({
      ...state,
      user: action.payload.data,
    }),
    updateUserInfoSuccess: (state, action) => ({
      ...state,
      isUpdateInfoSuccess: true,
    }),
    clearUpdateUserInfoSuccess: (state, action) => ({
      ...state,
      isUpdateInfoSuccess: false,
    }),
    checkIsExists: (state, action: CheckUserExistSuccess) => ({
      ...state,
      isExists: action.payload.data.isExists,
    }),
    setIsSendMailStatus: (state, action) => ({
      ...state,
      isSendMailRegisterSucess: action.payload,
    }),
    setError: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    setUpdatePasswordSuccess: (state, action) => ({
      ...state,
      isUpdatePasswordSuccess: action.payload,
    }),
    loading: (state, action) => ({ ...state, loading: action.payload }),
  },
});

export const { actions, reducer } = slice;
