import { createSlice } from "@reduxjs/toolkit";
import {
  IDonor,
  UserGetDonorDetailSuccess,
  UserGetDonorListRequest,
  UserGetDonorListSuccess,
} from "../home/actions-types";
import { ISlide, UserUploadDonorSlideSuccess } from "./actions-types";

interface InitialStateHome {
  loading: boolean;
  total: number;
  page: number;
  data: Array<IDonor>;
  keyword?: string;
  filter?: string;
  sort?: string;
  detail: IDonor | null;
  isShowRegiserUnosModal: boolean;
  isShowCreateDonorModal: boolean;
  slide: ISlide | null;
  registerDonorStatus: "idle" | "success" | "failed";
  template: Array<{
    createdAt: string;
    updatedAt: string;
    id: number;
    code: string;
    content: string;
  }>;
  requestPathologySuccess: boolean;
  uploadProcess: number;
  fileSize: number;
  createdDonor: IDonor | null;
  error?: string;
}

const initialState: InitialStateHome = {
  loading: false,
  total: 0,
  page: 1,
  data: [],
  keyword: undefined,
  sort: undefined,
  filter: undefined,
  detail: null,
  isShowRegiserUnosModal: false,
  isShowCreateDonorModal: false,
  slide: null,
  registerDonorStatus: "idle",
  template: [],
  requestPathologySuccess: false,
  uploadProcess: 0,
  fileSize: 0,
  createdDonor: null,
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getDonorList: (state, action: UserGetDonorListRequest) => ({
      ...state,
      keyword: action.payload.keyword,
      sort: action.payload.sort,
      filter: action.payload.filter,
      page: action.payload.page,
    }),
    getDonorListSuccess: (state, action: UserGetDonorListSuccess) => ({
      ...state,
      data: action.payload.data.items,
      total: action.payload.data.total,
    }),
    getDonorDetailSuccess: (state, action: UserGetDonorDetailSuccess) => ({
      ...state,
      detail: action.payload.data,
    }),
    setIsShowRegisterUnosModal: (state, action) => ({
      ...state,
      isShowRegiserUnosModal: action.payload,
    }),
    setIsShowCreateDonorModal: (state, action) => ({
      ...state,
      isShowCreateDonorModal: action.payload,
    }),
    uploadDonorSuccess: (state, action: UserUploadDonorSlideSuccess) => ({
      ...state,
      slide: action.payload.data,
    }),
    setRegisterDonorStatus: (state, action) => ({
      ...state,
      registerDonorStatus: action.payload,
    }),
    getTemplateSuccess: (state, action) => ({
      ...state,
      template: action.payload.data.items,
    }),
    setRequestPathologySuccess: (state, action) => ({
      ...state,
      requestPathologySuccess: action.payload,
    }),
    setUploadProcess: (state, action) => ({
      ...state,
      uploadProcess: action.payload,
    }),
    setFileSize: (state, action) => ({
      ...state,
      fileSize: action.payload,
    }),
    setCreatedDonor: (state, action) => ({
      ...state,
      createdDonor: action.payload,
    }),
    registerDonorFailed: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    loading: (state, action) => ({ ...state, loading: action.payload }),
  },
});

export const { actions, reducer } = slice;
