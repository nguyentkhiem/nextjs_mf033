import { UserRole } from "@/types/common.enum";
import { IMe } from "../auth/actions-types";

export const USER_GET_DONOR_LIST_REQUEST = "USER_GET_DONOR_LIST_REQUEST";
export const USER_GET_DONOR_LIST_SUCCESS = "USER_GET_DONOR_LIST_SUCCESS";
export const USER_GET_DONOR_LIST_FAILURE = "USER_GET_DONOR_LIST_FAILURE";

export const USER_GET_DONOR_DETAIL_REQUEST = "USER_GET_DONOR_DETAIL_REQUEST";
export const USER_GET_DONOR_DETAIL_SUCCESS = "USER_GET_DONOR_DETAIL_SUCCESS";
export const USER_GET_DONOR_DETAIL_FAILURE = "USER_GET_DONOR_DETAIL_FAILURE";

export const USER_GET_SHARED_USER_DATA_REQUEST =
  "USER_GET_SHARED_USER_DATA_REQUEST";
export const USER_GET_SHARED_USER_DATA_SUCCESS =
  "USER_GET_SHARED_USER_DATA_SUCCESS";
export const USER_GET_SHARED_USER_DATA_FAILURE =
  "USER_GET_SHARED_USER_DATA_FAILURE";

export enum Sex {
  FEMALE = "FEMALE",
  MALE = "MALE",
  OTHER = "OTHER",
}

export interface IReport {
  createdAt: string;
  donorId: number;
  filename: string;
  id: number;
  originalFilename: string;
  updatedAt: string;
}

export interface IComment {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  donorId: number;
  userId: number;
  content: string;
  attachment: string;
  link: string | null;
  donor: string;
  user: IMe;
  originalFilename: string | null;
}

export interface IDonor {
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  donorCode?: string;
  donorSlide?: string;
  sex?: Sex;
  birthday?: Date;
  location?: string;
  causeOfDeath?: string;
  donorType?: string;
  organ?: "KIDNEY" | "LIVER" | "OTHER";
  personInCharge?: string;
  comment?: string;
  isRegistered?: number;
  isShared: boolean;
  reports?: Array<IReport>;
  comments?: Array<IComment>;
  slide?: {
    createdAt?: string;
    filename?: string;
    id?: number;
    link?: string;
    status?: string;
    updatedAt?: string;
    processingRate: number;
    originalFilename: string;
  };
  createdBy: {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    phoneNumber: string;
    role: UserRole;
  };
}

export interface GetDonorListResponse {
  data: {
    items: Array<IDonor>;
    total: number;
  };
}
export interface GetDonorDetailResponse {
  data: IDonor;
}

export interface GetSharedUserDataResponse {
  data: IDonor;
}

export interface GetDonorListRequest {
  limit: number;
  page: number;
  keyword?: string;
  filter?: string;
  sort?: string;
}

export interface GetDonorDetailRequest {
  id: number;
}

export interface UserGetDonorListRequest {
  type: string;
  payload: GetDonorListRequest;
}

export interface GetSharedUserDataRequest {
  id: number;
  token: string;
}

export type UserGetDonorListSuccess = {
  type: string;
  payload: GetDonorListResponse;
};
export type UserGetDonorListFailure = {
  type: string;
  payload: any;
};

export interface UserGetDonorDetailRequest {
  type: string;
  payload: GetDonorDetailRequest;
}
export type UserGetDonorDetailSuccess = {
  type: string;
  payload: GetDonorDetailResponse;
};
export type UserGetDonorDetailFailure = {
  type: string;
  payload: any;
};

export interface UserGetSharedUserDataRequest {
  type: string;
  payload: GetSharedUserDataRequest;
}
export type UserGetSharedUserDataSuccess = {
  type: string;
  payload: GetSharedUserDataResponse;
};
export type UserGetSharedUserDataFailure = {
  type: string;
  payload: any;
};

export type UserHomeActions =
  | UserGetDonorListRequest
  | UserGetDonorListSuccess
  | UserGetDonorListFailure
  | UserGetDonorDetailRequest
  | UserGetDonorDetailSuccess
  | UserGetDonorDetailFailure
  | UserGetSharedUserDataRequest
  | UserGetSharedUserDataSuccess
  | UserGetSharedUserDataFailure;
