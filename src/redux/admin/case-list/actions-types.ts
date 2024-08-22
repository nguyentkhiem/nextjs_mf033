import { IMe } from "@/redux/auth/actions-types";
import {
  DeleteDonorRequest,
  DeleteDonorResponse,
} from "@/redux/donor/actions-types";
import { IDonor } from "@/redux/home/actions-types";
import { UserRole } from "@/types/common.enum";

export const ADMIN_GET_DONOR_LIST_REQUEST = "ADMIN_GET_DONOR_LIST_REQUEST";
export const ADMIN_GET_DONOR_LIST_SUCCESS = "ADMIN_GET_DONOR_LIST_SUCCESS";
export const ADMIN_GET_DONOR_LIST_FAILURE = "ADMIN_GET_DONOR_LIST_FAILURE";

export const ADMIN_GET_DONOR_DETAIL_REQUEST = "ADMIN_GET_DONOR_DETAIL_REQUEST";
export const ADMIN_GET_DONOR_DETAIL_SUCCESS = "ADMIN_GET_DONOR_DETAIL_SUCCESS";
export const ADMIN_GET_DONOR_DETAIL_FAILURE = "ADMIN_GET_DONOR_DETAIL_FAILURE";

export const ADMIN_DELETE_DONOR_REQUEST = "ADMIN_DELETE_DONOR_REQUEST";
export const ADMIN_DELETE_DONOR_SUCCESS = "ADMIN_DELETE_DONOR_SUCCESS";
export const ADMIN_DELETE_DONOR_FAILURE = "ADMIN_DELETE_DONOR_FAILURE";

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
  donor: string;
  user: IMe;
}

// export interface IDonor {
//   createdAt?: Date;
//   updatedAt?: Date;
//   id?: number;
//   donorCode?: string;
//   donorSlide?: string;
//   sex?: Sex;
//   birthday?: Date;
//   location?: string;
//   causeOfDeath?: string;
//   donorType?: string;
//   organ?: "KIDNEY" | "LIVER";
//   personInCharge?: string;
//   comment?: string;
//   isRegistered?: 0;
//   reports?: Array<IReport>;
//   comments?: Array<IComment>;
//   slide?: {
//     createdAt?: string;
//     filename?: string;
//     id?: number;
//     link?: string;
//     status?: string;
//     updatedAt?: string;
//     processingRate: number;
//   };
// }

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

export interface AdminGetDonorListRequest {
  type: string;
  payload: GetDonorListRequest;
}

export interface GetSharedUserDataRequest {
  id: number;
  token: string;
}

export type AdminGetDonorListSuccess = {
  type: string;
  payload: GetDonorListResponse;
};
export type AdminGetDonorListFailure = {
  type: string;
  payload: any;
};

export interface AdminGetDonorDetailRequest {
  type: string;
  payload: GetDonorDetailRequest;
}
export type AdminGetDonorDetailSuccess = {
  type: string;
  payload: GetDonorDetailResponse;
};
export type AdminGetDonorDetailFailure = {
  type: string;
  payload: any;
};

export interface AdminGetSharedUserDataRequest {
  type: string;
  payload: GetSharedUserDataRequest;
}
export type AdminGetSharedUserDataSuccess = {
  type: string;
  payload: GetSharedUserDataResponse;
};
export type AdminGetSharedUserDataFailure = {
  type: string;
  payload: any;
};

export interface AdminDeleteDonorRequest {
  type: string;
  payload: DeleteDonorRequest;
}
export type AdminDeleteDonorSuccess = {
  type: string;
  payload: DeleteDonorResponse;
};
export type AdminDeleteDonorFailure = {
  type: string;
  payload: any;
};

export type AdminHomeActions =
  | AdminGetDonorListRequest
  | AdminGetDonorListSuccess
  | AdminGetDonorListFailure
  | AdminGetDonorDetailRequest
  | AdminGetDonorDetailSuccess
  | AdminGetDonorDetailFailure
  | AdminDeleteDonorRequest
  | AdminDeleteDonorSuccess
  | AdminDeleteDonorFailure;
