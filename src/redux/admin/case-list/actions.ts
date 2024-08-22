import { DeleteDonorRequest } from "@/redux/donor/actions-types";
import {
  GetDonorDetailRequest,
  GetDonorListRequest,
  AdminGetDonorDetailRequest,
  AdminGetDonorListRequest,
  ADMIN_GET_DONOR_LIST_REQUEST,
  ADMIN_GET_DONOR_DETAIL_REQUEST,
  ADMIN_DELETE_DONOR_REQUEST,
  AdminDeleteDonorRequest,
} from "./actions-types";

export const adminGetDonorListRequest = (
  payload: GetDonorListRequest
): AdminGetDonorListRequest => ({
  type: ADMIN_GET_DONOR_LIST_REQUEST,
  payload,
});

export const adminGetDonorDetailRequest = (
  payload: GetDonorDetailRequest
): AdminGetDonorDetailRequest => ({
  type: ADMIN_GET_DONOR_DETAIL_REQUEST,
  payload,
});

export const adminDeleteDonorRequest = (
  payload: DeleteDonorRequest
): AdminDeleteDonorRequest => ({
  type: ADMIN_DELETE_DONOR_REQUEST,
  payload,
});
