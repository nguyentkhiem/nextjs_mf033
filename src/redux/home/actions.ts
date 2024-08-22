import { UserGetMeRequest } from "../auth/actions-types";
import {
  GetDonorDetailRequest,
  GetDonorListRequest,
  GetSharedUserDataRequest,
  USER_GET_DONOR_DETAIL_REQUEST,
  USER_GET_DONOR_LIST_REQUEST,
  USER_GET_SHARED_USER_DATA_REQUEST,
  UserGetDonorDetailRequest,
  UserGetDonorListRequest,
  UserGetSharedUserDataRequest,
} from "./actions-types";

export const userGetDonorListRequest = (
  payload: GetDonorListRequest
): UserGetDonorListRequest => ({
  type: USER_GET_DONOR_LIST_REQUEST,
  payload,
});

export const userGetDonorDetailRequest = (
  payload: GetDonorDetailRequest
): UserGetDonorDetailRequest => ({
  type: USER_GET_DONOR_DETAIL_REQUEST,
  payload,
});

export const userGetSharedUserDataRequest = (
  payload: GetSharedUserDataRequest
): UserGetSharedUserDataRequest => ({
  type: USER_GET_SHARED_USER_DATA_REQUEST,
  payload,
});
