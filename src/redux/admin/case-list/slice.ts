import { createSlice } from "@reduxjs/toolkit";
import {
  AdminGetDonorDetailSuccess,
  AdminGetDonorListRequest,
  AdminGetDonorListSuccess,
  IReport,
} from "./actions-types";
import { IDonor } from "@/redux/home/actions-types";

interface InitialStateAuth {
  loading: boolean;
  total: number;
  page: number;
  data: Array<IDonor>;
  keyword?: string;
  filter?: string;
  sort?: string;
  detail: IDonor | null;
  reportList: Array<IReport>;
  sharedUser: IDonor | null;
}

const initialState: InitialStateAuth = {
  loading: false,
  total: 0,
  page: 1,
  data: [],
  keyword: undefined,
  sort: undefined,
  filter: undefined,
  detail: null,
  reportList: [],
  sharedUser: null,
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getDonorList: (state, action: AdminGetDonorListRequest) => ({
      ...state,
      keyword: action.payload.keyword,
      sort: action.payload.sort,
      filter: action.payload.filter,
      page: action.payload.page,
    }),
    getDonorListSuccess: (state, action: AdminGetDonorListSuccess) => ({
      ...state,
      data: action.payload.data.items,
      total: action.payload.data.total,
    }),
    getDonorDetailSuccess: (state, action: AdminGetDonorDetailSuccess) => ({
      ...state,
      detail: action.payload.data,
      reportList: action.payload.data.reports || [],
    }),
    setDonorReport: (state, action) => ({
      ...state,
      reportList: action.payload,
    }),
    addNewReport: (state, action) => {
      const cloneReportList = [...state.reportList];
      const newReport = (cloneReportList || []).concat(action.payload);

      return {
        ...state,
        reportList: newReport,
      };
    },
    getSharedUserDataSuccess: (state, action) => ({
      ...state,
      sharedUser: action.payload.data,
    }),
    loading: (state, action) => ({ ...state, loading: action.payload }),
    reset: () => initialState,
  },
});

export const { actions, reducer } = slice;
