import { AxiosRequestConfig } from "axios";
import { UserRole } from "./common.enum";

export type ChildrenType = {
  id: number | string;
  title: string;
  url: string;
};

export type MenuItemType = {
  id: number | string;
  title: string;
  url?: string;
  children?: ChildrenType[];
};

export type ValueOptions = {
  config?: AxiosRequestConfig;
  params?: { [x: string]: any } | undefined;
  data?: { [x: string]: any };
};

export type ResponseGenerator = {
  config?: any;
  data?: any;
  body?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
};

export interface User {
  createdAt: string;
  deletedAt: string | null;
  email: string;
  firstName: string;
  id: 24;
  lastName: string;
  organization: string;
  phoneNumber: string;
  role: UserRole;
  updatedAt: string;
  organizationUser: {
    role: "LEADER" | "MEMBER";
    organization: {
      createdAt: string;
      email: string | null;
      id: number;
      name: string;
      updatedAt: string;
    };
  };
}
