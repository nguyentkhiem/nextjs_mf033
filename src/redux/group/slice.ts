import { IUser } from "@/types/auth.type";
import { createSlice } from "@reduxjs/toolkit";
import {
  UserGetGroupUserListRequest,
  UserGetGroupUserListSuccess,
  UserGetGroupUserDetailSuccess,
  GroupUser,
} from "./actions-types";

interface InitialStateAuth {
  loading: boolean;
  total: number;
  page: number;
  data: Array<GroupUser>;
  keyword?: string;
  filter?: string;
  sort?: string;
  detail: GroupUser | null;
  isDelegateAdminSuccess: boolean;
  isDeleteUserSuccess: boolean;
  isEditingMember: boolean;
  pathologyList: Array<GroupUser>;
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
  isDelegateAdminSuccess: false,
  isDeleteUserSuccess: false,
  isEditingMember: false,
  pathologyList: [],
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getGroupUserList: (state, action: UserGetGroupUserListRequest) => ({
      ...state,
      keyword: action.payload.keyword,
      sort: action.payload.sort,
      filter: action.payload.filter,
      page: action.payload.page,
    }),
    getGroupUserListSuccess: (state, action: UserGetGroupUserListSuccess) => ({
      ...state,
      data: action.payload.data.items,
      total: action.payload.data.total,
    }),
    loadMorePathologyList: (state, action) => ({
      ...state,
      pathologyList: state.pathologyList.concat(action.payload),
    }),
    getGroupUserDetailSuccess: (
      state,
      action: UserGetGroupUserDetailSuccess
    ) => ({
      ...state,
      detail: action.payload.data,
    }),
    setGroupUserReport: (state, action) => ({
      ...state,
      reportList: action.payload,
    }),
    setDelegateAdminSuccess: (state, action) => ({
      ...state,
      isDelegateAdminSuccess: action.payload,
    }),
    setDeleteUserSuccess: (state, action) => ({
      ...state,
      isDeleteUserSuccess: action.payload,
    }),
    setIsEditingMember: (state, action) => ({
      ...state,
      isEditingMember: action.payload,
    }),
    loading: (state, action) => ({ ...state, loading: action.payload }),
    setPathologyList: (state, action) => ({
      ...state,
      pathologyList: action.payload,
    }),
  },
});

export const { actions, reducer } = slice;
