"use client";
import { setRegisterDonorStatus, setUploadProcess } from "@/redux/donor";
import { userCreateDonorRequest } from "@/redux/donor/actions";
import { Sex } from "@/redux/home/actions-types";
import { useAppSelector } from "@/redux/hooks";
import HomeServices from "@/services/home.services";
import { daysInMonth, getMonthName, humanFileSize } from "@/utils/helpers";
import { Button, Form, Input, Modal, ModalProps, Progress, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const PreviewModal = dynamic(() => import("./PreviewModal"));

const RegisterDonorModal: React.FC<ModalProps> = (props) => {
  const [form] = useForm();
  const slide = useAppSelector((state) => state.donorReducer.slide);
  const registerDonorStatus = useAppSelector(
    (state) => state.donorReducer.registerDonorStatus
  );

  const error = useAppSelector((state) => state.donorReducer.error);

  const uploadProcess = useAppSelector(
    (state) => state.donorReducer.uploadProcess
  );
  const createdDonor = useAppSelector(
    (state) => state.donorReducer.createdDonor
  );
  const fileSize = useAppSelector((state) => state.donorReducer.fileSize);

  const [showPreview, setShowPreview] = useState(false);
  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  console.log("registerDonorStatus", registerDonorStatus);

  const router = useRouter();
  const year = Form.useWatch("year", form);
  const month = Form.useWatch("month", form);
  const [prevForm, setPrevForm] = useState<any>();
  const { t } = useTranslation("");
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const renderModalContent = useCallback(() => {
    if (step === 1)
      return (
        <div className="px-[40px] py-[16px]">
          <div className="w-full h-[116px] flex items-center justify-center bg-[#F3F3F3] rounded-[16px] ">
            <div className="w-[450px]">
              <div className="flex justify-between">
                <div>{slide?.slideGcsFilename}</div>
                <div>{humanFileSize(fileSize)}</div>
              </div>
              <Progress
                percent={uploadProcess}
                size="small"
                status={uploadProcess < 100 ? "active" : "success"}
              />
            </div>
          </div>
          <div className="text-[24px] font-[700] mt-[40px] mb-[20px]">
            {t("common.case-information")}
          </div>
          <>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
                {
                  whitespace: true,
                  message: "This field is required",
                },
                // call api to check donor code is existed
                ({ getFieldValue }) => ({
                  async validator(_, value) {
                    if (value && value.length > 0) {
                      const res = await HomeServices.checkDonorCode({
                        params: { code: value },
                      });

                      if (res.data?.data?.isExists) {
                        return Promise.reject(
                          new Error("DonorID already exists")
                        );
                      }
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
              name="donorCode"
              label={t("common.donor-id")}
            >
              <Input className="h-[52px]" size="large" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
              name="organ"
              label={t("common.organ")}
            >
              <Select className="!w-[400px] !h-[52px]" size="large">
                <Select.Option value="LIVER">{t("common.liver")}</Select.Option>
                <Select.Option value="KIDNEY">
                  {t("common.kidney")}
                </Select.Option>
                <Select.Option value="OTHER">{t("common.other")}</Select.Option>
              </Select>
            </Form.Item>
            <div className="font-[700] mb-[8px]">
              {t("common.medical-history")}
            </div>
            <Form.Item name="comment">
              <Input.TextArea className="!h-[226px]" />
            </Form.Item>
          </>
        </div>
      );
    if (step === 2)
      return (
        <div
          className={`flex items-center justify-center h-full ${
            registerDonorStatus === "failed" ? "min-h-[284px]" : "min-h-[208px]"
          }`}
        >
          {registerDonorStatus === "failed" ? (
            <div className=" w-[60%] space-y-[32px]">
              <div className="text-[24px] font-[700] text-center">
                {t("common.regis-donor-failed")}
              </div>
              <div className="text-center">
                {error && error === "DonorID already exists"
                  ? error
                  : t("common.regis-donor-failed-description")}
              </div>
            </div>
          ) : (
            <div className="text-[24px] font-[700]">
              {t("common.regis-donor-completed")}
            </div>
          )}
        </div>
      );
  }, [step, uploadProcess, slide, fileSize, registerDonorStatus]);

  const renderModalFooter = useCallback(() => {
    if (step === 1)
      return (
        <>
          <Button
            onClick={(e) => {
              dispatch(setUploadProcess(0));
              dispatch(setRegisterDonorStatus("idle"));
              setStep(1);
              if (props.onCancel) {
                props.onCancel(e as any);
              }
            }}
            type="primary"
            ghost
            size="large"
          >
            {t("common.close")}
          </Button>
          <Button
            disabled={uploadProcess < 100}
            htmlType="submit"
            size="large"
            type="primary"
          >
            {t("common.register-donor")}
          </Button>
        </>
      );

    if (step === 2)
      return (
        <>
          <Button onClick={props.onCancel} type="link" size="large">
            {t("common.close")}
          </Button>
          <Button
            onClick={(e) => {
              router.push(`/donor-list/detail/?id=${createdDonor?.id}`);
              setStep(1);
              dispatch(setRegisterDonorStatus("idle"));
              dispatch(setUploadProcess(0));
              form.resetFields();
              if (props.onCancel) {
                props.onCancel(e as any);
              }
            }}
            size="large"
            type="primary"
          >
            {t("common.process-to-detail")}
          </Button>
        </>
      );
  }, [step, uploadProcess, createdDonor]);

  useEffect(() => {
    return () => {
      form.resetFields();
      setStep(1);
    };
  }, []);

  const onFinish = (value: any) => {
    if (slide) {
      console.log("slide", slide);

      dispatch(
        userCreateDonorRequest({
          slideGcsFilename: slide?.slideGcsFilename || "",
          comment: value.comment,
          donorCode: value.donorCode?.trim(),
          organ: value.organ,
          slideId: slide.slideId,
        })
      );
      setStep(2);
    }
  };

  return (
    <Modal
      destroyOnClose={true}
      afterClose={() => {
        setStep(1);
        dispatch(setRegisterDonorStatus("idle"));
        dispatch(setUploadProcess(0));
        form.resetFields();
      }}
      width={800}
      wrapClassName="register-donor-modal"
      style={{ padding: 0 }}
      {...props}
    >
      <div className="min-h-[284px]">
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          colon={false}
          autoComplete="new-password"
        >
          <div
            className={`${
              registerDonorStatus === "failed" && step === 2
                ? "min-h-[284px]"
                : "min-h-[208px]"
            }`}
          >
            {renderModalContent()}
          </div>
          {step === 2 && registerDonorStatus === "failed" ? null : (
            <div className="flex items-center justify-end space-x-[16px] h-[76px] bg-[#F3F3F3] rounded-b-[8px] px-[24px] py-[16px] ">
              {renderModalFooter()}
            </div>
          )}
        </Form>
      </div>
      <PreviewModal
        isShowViewer={showPreview}
        setShowViewer={(value: any) => {
          setShowPreview(value);
        }}
        id="preview-modal"
        slideUrl={slide?.previewUrl || ""}
      />
    </Modal>
  );
};
export default React.memo(RegisterDonorModal);
