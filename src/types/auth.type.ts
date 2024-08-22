import { AUTH } from "@/types/saga.type";
import { User } from "./common.types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type LoginPayload = {
  username: string;
  password: string;
};

export type IUser = {
  id?: number | string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  [x: string]: any;
};

export namespace Paramas {
  export interface AdminLogin {
    usernameOrEmail: string;
    password: string;
    router: AppRouterInstance;
  }
  export interface AdminGetUserList {
    limit: number;
    page: number;
    keyword: string;
    filter: any;
    sort: {
      by: string;
      direction: "DESC" | "ASC";
    };
  }
  export interface AdminGetUserDetail {
    id: string;
  }
  export interface AdminRecoverPassword {
    email: string;
  }

  export interface AdminResetPassword {
    token: string;
    newPassword: string;
    router: AppRouterInstance;
  }
}

export namespace Response {
  export interface AdminLogin {
    data: string;
  }
  export interface AdminResetPassword {
    data: boolean;
  }
  export interface AdminRecoverPassword {
    data: boolean;
  }
  export interface AdminGetMe {
    data: {
      id: number;
      username: string;
      email: string;
    };
  }
  export interface AdminGetUserList {
    data: {
      items: User[];
      total: number;
    };
  }
  export interface AdminGetUserDetail {
    data: User;
  }

  export interface AdminGetOverview {
    data: {
      totalUsers: number;
      countRoles: Array<{
        role: string;
        count: number;
      }>;
    };
  }
}

export namespace Action {
  export interface AdminLoginAction {
    type: string;
    payload: Paramas.AdminLogin;
  }
  export interface AdminResetPasswordAction {
    type: string;
    payload: Paramas.AdminResetPassword;
  }
  export interface AdminRecoverPasswordAction {
    type: string;
    payload: Paramas.AdminRecoverPassword;
  }
  export interface AdminGetUserListAction {
    type: string;
    payload: Paramas.AdminGetUserList;
  }
  export interface AdminGetUserDetailAction {
    type: string;
    payload: Paramas.AdminGetUserDetail;
  }
}
