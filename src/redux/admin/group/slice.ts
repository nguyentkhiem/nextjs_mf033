import { IUser } from "@/types/auth.type";
import { createSlice } from "@reduxjs/toolkit";
import {
  UserGetGroupUserListRequest,
  UserGetGroupUserListSuccess,
  UserGetGroupUserDetailSuccess,
  GroupUser,
  AdminGetGroupListSuccess,
} from "./actions-types";

interface InitialStateAuth {
  loading: boolean;
  total: number;
  page: number;
  data: Array<{
    email: string | null;
    id: number;
    name: string;
    numberOfUsers: number;
  }>;
  keyword?: string;
  filter?: string;
  sort?: string;
  detail: {
    loading: boolean;
    total: number;
    page: number;
    data: Array<{
      email: string | null;
      id: number;
      name: string;
      numberOfUsers: number;
    }>;
    keyword?: string;
    filter?: string;
    sort?: string;
    detail: GroupUser | null;
    isDelegateAdminSuccess: boolean;
    isDeleteUserSuccess: boolean;
    isCreateUserSuccess: boolean;
    isRemoveFromAdminSuccess: boolean;
    isEditingMember: boolean;
    organization: {
      name: string;
    } | null;
    error?: any;
  };
  organizationDetail: {
    id: number;
    name: string;
    location: string;
    keyPersonnel: string;
    phoneNumber: string;
  } | null;
  isCreateOrganizationSuccess: boolean;
  isDeleteOrganizationSuccess: boolean;
  isUpdateOrganizationSuccess: boolean;
}

const initialState: InitialStateAuth = {
  loading: false,
  total: 0,
  page: 1,
  data: [],
  keyword: undefined,
  sort: undefined,
  filter: undefined,
  detail: {
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
    isCreateUserSuccess: false,
    isRemoveFromAdminSuccess: false,
    isEditingMember: false,
    error: null,
    organization: null,
  },
  organizationDetail: null,
  isCreateOrganizationSuccess: false,
  isDeleteOrganizationSuccess: false,
  isUpdateOrganizationSuccess: false,
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getGroupUserList: (state, action: UserGetGroupUserListRequest) => ({
      ...state,
      detail: {
        ...state.detail,
        keyword: action.payload.keyword,
        sort: action.payload.sort,
        filter: action.payload.filter,
        page: action.payload.page,
      },
    }),
    getGroupUserListSuccess: (state, action: UserGetGroupUserListSuccess) => ({
      ...state,
      detail: {
        ...state.detail,
        data: action.payload.data.items,
        total: action.payload.data.total,
        organization: action.payload.data.organization,
      },
    }),
    getGroupUserDetailSuccess: (
      state,
      action: UserGetGroupUserDetailSuccess
    ) => ({
      ...state,
      detail: {
        ...state.detail,
        detail: action.payload.data,
      },
    }),
    setGroupUserReport: (state, action) => ({
      ...state,
      reportList: action.payload,
    }),
    setDelegateAdminSuccess: (state, action) => ({
      ...state,
      detail: {
        ...state.detail,
        isDelegateAdminSuccess: action.payload,
      },
    }),
    setDeleteUserSuccess: (state, action) => ({
      ...state,
      detail: {
        ...state.detail,
        isDeleteUserSuccess: action.payload,
      },
    }),
    setIsUpdateOrganizationSuccess: (state, action) => ({
      ...state,
      isUpdateOrganizationSuccess: action.payload,
    }),
    setIsCreateOrganizationSuccess: (state, action) => ({
      ...state,
      isCreateOrganizationSuccess: action.payload,
    }),
    setIsDeleteOrganizationSuccess: (state, action) => ({
      ...state,
      isDeleteOrganizationSuccess: action.payload,
    }),
    setOrganizationDetail: (state, action) => ({
      ...state,
      organizationDetail: action.payload,
    }),
    loading: (state, action) => ({ ...state, loading: action.payload }),
    getGroupListRequest: (state, action) => ({
      ...state,
      keyword: action.payload.keyword,
      sort: action.payload.sort,
      filter: action.payload.filter,
      page: action.payload.page,
    }),
    setIsCreateUserSuccess: (state, action) => ({
      ...state,
      detail: {
        ...state.detail,
        isCreateUserSuccess: action.payload,
      },
    }),
    setIsDeleteUserSuccess: (state, action) => ({
      ...state,
      detail: {
        ...state.detail,
        isDeleteUserSuccess: action.payload,
      },
    }),
    setIsDelegateUserSuccess: (state, action) => ({
      ...state,
      detail: {
        ...state.detail,
        isDelegateAdminSuccess: action.payload,
      },
    }),
    setIsRemoveFromAdminSuccess: (state, action) => ({
      ...state,
      detail: {
        ...state.detail,
        isRemoveFromAdminSuccess: action.payload,
      },
    }),
    setIsEditingMember: (state, action) => ({
      ...state,
      detail: {
        ...state.detail,
        isEditingMember: action.payload,
      },
    }),
    setError: (state, action) => ({
      ...state,
      detail: {
        ...state.detail,
        error: action.payload,
      },
    }),
    getGroupListSuccess: (state, action: AdminGetGroupListSuccess) => ({
      ...state,
      data: action.payload.data.items,
      total: action.payload.data.total,
    }),
  },
});

export const { actions, reducer } = slice;
