"use client";

import CommentList from "@/app/components/CommentList";
import DonorComments from "@/app/components/DonorComment";
import DonorDetailHeader from "@/app/components/DonorDetailHeader";
import DonorDetailInfomation from "@/app/components/DonorDetailInfomation";
import DonorReport from "@/app/components/DonorReport";
import Title from "@/app/components/Title";
import WithAuthLayoutUser from "@/app/hoc/PrivateUserRoute";
import Breadcrumb from "@/components/BreadCumb";
import EditIcon from "@/components/icons/EditIcon";
import ViewTiffIcon from "@/components/icons/ViewTiffIcon";
import {
  userDeleteDonorReportRequest,
  userUpdateDonorRequest,
} from "@/redux/donor/actions";
import { reset, setDonorReport } from "@/redux/home";
import { userGetDonorDetailRequest } from "@/redux/home/actions";
import { useAppSelector } from "@/redux/hooks";
import { Form, Input, Progress, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import * as animationData from "@/image-processing.json";
import Lottie from "react-lottie";
import { useDispatch } from "react-redux";
import Big from "big.js";
import { adminGetDonorDetailRequest } from "@/redux/admin/case-list/actions";
const TiffImage = dynamic(() => import("@/components/TiffImage"), {
  ssr: false,
});

const DonorDetailPage = () => {
  const { t } = useTranslation("");
  const query = useSearchParams();
  const id = query.get("id");
  const router = useRouter();
  const dispatch = useDispatch();
  const detail = useAppSelector((state) => state.homeReducer.detail);
  const reports = useAppSelector((state) => state.homeReducer.reportList);
  const user = useAppSelector((state) => state.auth.user);
  const [form] = useForm();
  useEffect(() => {
    if (id) {
      dispatch(userGetDonorDetailRequest({ id: Number(id) }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  // call interval for 3s to get the latest data if status is not PASS
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        id &&
        ["PROCESSING", "UPLOADED", "UPLOADING", "PENDING"].includes(
          detail?.slide?.status || ""
        )
      ) {
        dispatch(userGetDonorDetailRequest({ id: Number(id) }));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [dispatch, id, detail]);
  const onEditDetail = () => {
    if (editState.isEditDetail) {
      const donorCode = form.getFieldValue("donorCode");

      const organ = form.getFieldValue("organ");

      dispatch(
        userUpdateDonorRequest({
          comment: detail?.comment || "",
          id: Number(detail?.id || ""),
          // reportIds: reports.map((item) => item.id) || [],
          donorCode: donorCode?.trim() || "",
          organ: organ || "",
        })
      );
      setEditState((prev) => ({ ...prev, isEditDetail: !prev.isEditDetail }));
    } else {
      setEditState((prev) => ({ ...prev, isEditDetail: !prev.isEditDetail }));
    }
  };

  const onEditComment = () => {
    if (editState.isEditComment) {
      const comment = form.getFieldValue("comment");

      dispatch(
        userUpdateDonorRequest({
          comment: comment || "",
          id: Number(detail?.id || ""),
          // reportIds: reports.map((item) => item.id) || [],
          donorCode: detail?.donorCode || "",
          organ: detail?.organ || "",
        })
      );
      setEditState((prev) => ({ ...prev, isEditComment: !prev.isEditComment }));
    } else {
      setEditState((prev) => ({ ...prev, isEditComment: !prev.isEditComment }));
    }
  };

  const onEditReport = () => {
    if (editState.isEditReport) {
      dispatch(
        userUpdateDonorRequest({
          comment: detail?.comment || "",
          id: Number(detail?.id || ""),
          // reportIds: reports.map((item) => item.id) || [],
          donorCode: detail?.donorCode || "",
          organ: detail?.organ || "",
        })
      );
      dispatch(
        userDeleteDonorReportRequest({
          remainingReportIds: reports.map((item) => item.id) || [],
          id: Number(detail?.id || ""),
        })
      );
      setEditState((prev) => ({ ...prev, isEditReport: !prev.isEditReport }));
    } else {
      setEditState((prev) => ({ ...prev, isEditReport: !prev.isEditReport }));
    }
  };
  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/", href: "/" },
      { title: "Case Detail", key: "/donor-detail" },
    ];
  }, []);

  const [editState, setEditState] = useState({
    isEditDetail: false,
    isEditComment: false,
    isEditReport: false,
  });

  useEffect(() => {
    if (editState.isEditDetail) {
      form.setFieldsValue({
        donorCode: detail?.donorCode,
        organ: detail?.organ,
      });
    }
  }, [detail, editState.isEditDetail]);

  return (
    <WithAuthLayoutUser>
      <Breadcrumb items={breadCrubItems} />
      <div className="mt-[40px] rounded-[16px] px-[40px] pb-[60px] bg-[#FFFFFF]">
        <DonorDetailHeader
          id={detail?.id || ""}
          status={detail?.isRegistered || 0}
          onGetLink={() => {}}
          onRegister={() => {}}
          donor={detail}
          isAdminPage={false}
        />

        <div className="mt-[40px]">
          <Title
            title={t("common.slide")}
            onClick={onEditDetail}
            hasRightIcon={false}
          />
        </div>
        {detail?.slide?.status === "PASS" && detail?.slide?.link ? (
          <TiffImage
            slideUrl={detail?.slide?.link || ""}
            id="donor-detail-page-id"
            slideId={detail.slide.id}
          />
        ) : (
          <div className="w-full bg-[#E5E9F480] border-[#213E6F] border-[2px] border-solid rounded-[4px] relative h-[600px] flex items-center px-[40px] flex-col justify-center">
            <Progress
              percent={Big(Number(detail?.slide?.processingRate || 0))
                .times(100)
                .toNumber()}
              size="small"
              status={
                Big(Number(detail?.slide?.processingRate || 0))
                  .times(100)
                  .toNumber() < 100
                  ? "active"
                  : "success"
              }
            />
            <div className="text-[24px] font-[600]">Processing the image</div>
          </div>
        )}
        <div className="flex w-full justify-center mt-[24px]">
          <div className="w-[224px] h-[48px] bg-[#E5E9F480] border-[#213E6F] border-[2px] border-solid rounded-[4px]">
            <div className="flex items-center justify-center">
              <div
                onClick={() => {
                  if (detail?.slide?.status === "PASS") {
                    window.open(
                      `${process.env.NEXT_PUBLIC_SITE_NAME}/slide?id=${detail?.slide?.id}&slideUrl=${detail?.slide?.link}&type=${detail.organ}&originalFilename=${detail?.slide?.originalFilename}&donorCode=${detail.donorCode}`,
                      "_blank"
                    );
                  }

                  // setShowViewer(true);
                }}
                className={`flex items-center cursor-pointer justify-center space-x-[13px] ${
                  detail?.slide?.status !== "PASS"
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <ViewTiffIcon />
                <div className="text-[24px] font-bold text-[#213E6F]">
                  Open Viewer
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[40px] px-[40px] py-[32px]">
          <Form
            form={form}
            initialValues={{
              donorCode: detail?.donorCode,
              organ: detail?.organ,
            }}
            layout="vertical"
            autoComplete="new-password"
          >
            <Title
              title={t("common.case-information")}
              hasRightIcon={
                user?.organizationUser?.role === "LEADER" ||
                detail?.createdBy?.id === user?.id
              }
              onClick={async () => {
                await form.validateFields();
                onEditDetail();
              }}
              rightButtonText={
                editState.isEditDetail ? t("common.save") : t("common.edit")
              }
              isSave={editState.isEditDetail}
              rightButtonIcon={editState.isEditDetail ? null : <EditIcon />}
            />
            {editState.isEditDetail ? (
              <div className="w-[200px]">
                <Form.Item
                  rules={[
                    { required: true, message: "Please input donor ID!" },
                    {
                      whitespace: true,
                      message: "Please input donor ID!",
                    },
                  ]}
                  name="donorCode"
                  label="Donor ID"
                >
                  <Input className="h-[52px]" size="large"></Input>
                </Form.Item>
                <Form.Item name="organ" label="Organ">
                  <Select className="!h-[52px]" size="large">
                    <Select.Option value="LIVER">
                      {t("common.liver")}
                    </Select.Option>
                    <Select.Option value="KIDNEY">
                      {t("common.kidney")}
                    </Select.Option>
                    <Select.Option value="OTHER">
                      {t("common.other")}
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>
            ) : (
              <DonorDetailInfomation detail={detail} />
            )}
          </Form>
        </div>
        <div className="mt-[40px] px-[40px] py-[32px]">
          <Title
            title={t("common.comments-medical-history")}
            hasRightIcon={
              user?.organizationUser?.role === "LEADER" ||
              detail?.createdBy?.id === user?.id
            }
            onClick={onEditComment}
            rightButtonText={
              editState.isEditComment ? t("common.save") : t("common.edit")
            }
            isSave={editState.isEditComment}
            rightButtonIcon={editState.isEditComment ? null : <EditIcon />}
          />
          {editState.isEditComment ? (
            <Form
              form={form}
              initialValues={{ comment: detail?.comment }}
              layout="vertical"
            >
              <Form.Item name="comment">
                <Input.TextArea
                  className="!h-[145px]"
                  size="large"
                ></Input.TextArea>
              </Form.Item>
            </Form>
          ) : (
            <DonorComments comment={detail?.comment || ""} />
          )}
        </div>
        <div className="mt-[40px] px-[40px] py-[32px]">
          <Title
            title={t("common.reports")}
            hasRightIcon={true}
            onClick={onEditReport}
            rightButtonText={
              editState.isEditReport ? t("common.save") : t("common.edit")
            }
            isSave={editState.isEditReport}
            rightButtonIcon={editState.isEditReport ? null : <EditIcon />}
          />
          <DonorReport
            isEdit={editState.isEditReport}
            id={id?.toString() || ""}
            reports={reports || []}
            onDelete={(id) => {
              const newestReports = reports?.filter(
                (item) => item.id !== Number(id)
              );
              dispatch(setDonorReport(newestReports));
            }}
            isAdminPage={false}
          />
        </div>
        <div className="mt-[40px] px-[40px] py-[32px]">
          <Title title={t("common.donor-comment")} hasRightIcon={false} />
          <CommentList
            comments={detail?.comments || []}
            id={id?.toString() || ""}
            isAdminPage={false}
          />
        </div>
      </div>
    </WithAuthLayoutUser>
  );
};
export default DonorDetailPage;
