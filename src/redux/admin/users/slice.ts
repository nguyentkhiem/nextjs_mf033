import { IUser } from "@/types/auth.type";
import { UserRole } from "@/types/common.enum";
import { User } from "@/types/common.types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateAdminUsers {
  loading: boolean;
  userList: Array<User>;
  userDetail: User | null;
  total: number;
  overview: {
    totalUser: number;
    totalOpoUser: number;
    totalPathologyUser: number;
    totalOtherUser: number;
    totalTransplantUser: number;
  };
  page: number;
  keyword?: string;
  filter?: string;
  sort?: string;
}

const initialState: InitialStateAdminUsers = {
  loading: false,
  userDetail: null,
  userList: [],
  total: 0,
  overview: {
    totalOpoUser: 0,
    totalOtherUser: 0,
    totalPathologyUser: 0,
    totalTransplantUser: 0,
    totalUser: 0,
  },
  page: 1,
  keyword: undefined,
  sort: undefined,
  filter: undefined,
};

const slice = createSlice({
  name: "admin-users",
  initialState,
  reducers: {
    getUserList: (state, action) => ({
      ...state,
      keyword: action.payload.keyword,
      sort: action.payload.sort,
      filter: action.payload.filter,
      page: action.payload.page,
    }),
    getListUserSuccess: (state, action) => ({
      ...state,
      userList: action.payload.items,
      total: action.payload.total,
    }),
    getUserDetailSuccess: (state, action) => ({
      ...state,
      userDetail: action.payload,
    }),
    getOverViewSuccess: (state, action) => {
      return {
        ...state,
        overview: {
          totalUser: action.payload.totalUsers,
          totalOpoUser:
            action.payload.countRoles.find(
              (item: { role: string; count: number }) =>
                item.role === UserRole.OPO
            )?.count || 0,
          totalOtherUser:
            action.payload.countRoles.find(
              (item: { role: string; count: number }) =>
                item.role === UserRole.OTHER
            )?.count || 0,
          totalPathologyUser:
            action.payload.countRoles.find(
              (item: { role: string; count: number }) =>
                item.role === UserRole.PATHOLOGIST
            )?.count || 0,
          totalTransplantUser:
            action.payload.countRoles.find(
              (item: { role: string; count: number }) =>
                item.role === UserRole.TRANSPLANT
            )?.count || 0,
        },
      };
    },
    loading: (state, action) => ({ ...state, loading: action.payload }),
  },
});

export const { actions, reducer } = slice;
