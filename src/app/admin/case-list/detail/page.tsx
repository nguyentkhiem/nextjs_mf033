"use client";

import CommentList from "@/app/components/CommentList";
import DonorComments from "@/app/components/DonorComment";
import DonorDetailHeader from "@/app/components/DonorDetailHeader";
import DonorDetailInfomation from "@/app/components/DonorDetailInfomation";
import DonorReport from "@/app/components/DonorReport";
import Title from "@/app/components/Title";
import WithAuthLayoutAdmin from "@/app/hoc/PrivateAdminRoute";
import Breadcrumb from "@/components/BreadCumb";
import ViewTiffIcon from "@/components/icons/ViewTiffIcon";
import * as animationData from "@/image-processing.json";
import { reset } from "@/redux/admin/case-list";
import { adminGetDonorDetailRequest } from "@/redux/admin/case-list/actions";
import { setDonorReport } from "@/redux/home";
import { useAppSelector } from "@/redux/hooks";
import { Form, Input, Progress, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import Big from "big.js";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";
import { useDispatch } from "react-redux";
const TiffImage = dynamic(() => import("@/components/TiffImage"), {
  ssr: false,
});

const CaseDetailPage = () => {
  const { t } = useTranslation("");
  const query = useSearchParams();
  const id = query.get("id");
  const router = useRouter();
  const dispatch = useDispatch();
  const detail = useAppSelector((state) => state.adminCaseListReducer.detail);
  const reports = useAppSelector(
    (state) => state.adminCaseListReducer.reportList
  );
  const [form] = useForm();
  useEffect(() => {
    if (id) {
      dispatch(adminGetDonorDetailRequest({ id: Number(id) }));
    }
  }, [dispatch, id]);

  const onEditDetail = () => {
    // if (editState.isEditDetail) {
    //   const donorCode = form.getFieldValue("donorCode");
    //   const organ = form.getFieldValue("organ");
    //   dispatch(
    //     userUpdateDonorRequest({
    //       comment: detail?.comment || "",
    //       id: Number(detail?.id || ""),
    //       reportIds: reports.map((item) => item.id) || [],
    //       donorCode: donorCode || "",
    //       organ: organ || "",
    //     })
    //   );
    //   setEditState((prev) => ({ ...prev, isEditDetail: !prev.isEditDetail }));
    // } else {
    //   setEditState((prev) => ({ ...prev, isEditDetail: !prev.isEditDetail }));
    // }
  };

  const onEditComment = () => {
    // if (editState.isEditComment) {
    //   const comment = form.getFieldValue("comment");
    //   dispatch(
    //     userUpdateDonorRequest({
    //       comment: comment || "",
    //       id: Number(detail?.id || ""),
    //       reportIds: reports.map((item) => item.id) || [],
    //       donorCode: detail?.donorCode || "",
    //       organ: detail?.organ || "",
    //     })
    //   );
    //   setEditState((prev) => ({ ...prev, isEditComment: !prev.isEditComment }));
    // } else {
    //   setEditState((prev) => ({ ...prev, isEditComment: !prev.isEditComment }));
    // }
  };

  const onEditReport = () => {
    // if (editState.isEditReport) {
    //   dispatch(
    //     userUpdateDonorRequest({
    //       comment: detail?.comment || "",
    //       id: Number(detail?.id || ""),
    //       reportIds: reports.map((item) => item.id) || [],
    //       donorCode: detail?.donorCode || "",
    //       organ: detail?.organ || "",
    //     })
    //   );
    //   setEditState((prev) => ({ ...prev, isEditReport: !prev.isEditReport }));
    // } else {
    //   setEditState((prev) => ({ ...prev, isEditReport: !prev.isEditReport }));
    // }
  };
  const breadCrubItems = useMemo(() => {
    return [
      {
        title: "Case List",
        key: "/admin/case-list",
        href: `/admin/case-list`,
      },
      { title: "Case Detail", key: "admin/case-list/donor-detail" },
    ];
  }, [detail]);

  const [editState, setEditState] = useState({
    isEditDetail: false,
    isEditComment: false,
    isEditReport: false,
  });

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <WithAuthLayoutAdmin>
      <Breadcrumb items={breadCrubItems} />
      <div className="mt-[40px] rounded-[16px] px-[40px] pb-[60px] bg-[#FFFFFF]">
        <DonorDetailHeader
          id={detail?.id || ""}
          status={detail?.isRegistered || 0}
          onGetLink={() => {}}
          onRegister={() => {}}
          isAdminPage={true}
          donor={detail}
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
            slideId={detail?.slide?.id}
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
                      `${process.env.NEXT_PUBLIC_SITE_NAME}/slide?id=${detail?.slide?.id}&slideUrl=${detail?.slide?.link}&type=${detail.organ}`,
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
          <Title
            title={t("common.case-information")}
            onClick={onEditDetail}
            hasRightIcon={false}
          />
          {editState.isEditDetail ? (
            <Form
              form={form}
              className="w-[200px]"
              initialValues={{
                donorCode: detail?.donorCode,
                organ: detail?.organ,
              }}
              layout="vertical"
              autoComplete="new-password"
            >
              <Form.Item name="donorCode" label="Donor ID">
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
            </Form>
          ) : (
            <DonorDetailInfomation detail={detail} />
          )}
        </div>
        <div className="mt-[40px] px-[40px] py-[32px]">
          <Title
            title={t("common.comments-medical-history")}
            hasRightIcon={false}
            onClick={onEditComment}
          />
          {editState.isEditComment ? (
            <Form
              form={form}
              initialValues={{ comment: detail?.comment }}
              layout="vertical"
              autoComplete="new-password"
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
            title={t("admin.report-include-template")}
            hasRightIcon={false}
            onClick={onEditReport}
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
            isAdminPage={true}
          />
        </div>
        <div className="mt-[40px] px-[40px] py-[32px]">
          <Title title={t("common.donor-comment")} hasRightIcon={false} />
          <CommentList
            comments={detail?.comments || []}
            id={id?.toString() || ""}
            isAdminPage={true}
          />
        </div>
      </div>
    </WithAuthLayoutAdmin>
  );
};
export default CaseDetailPage;
