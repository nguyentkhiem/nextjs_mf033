"use client";
import LoginButton from "@/components/Button";
import FormInput from "@/components/Input";
import UnauthenticationLayout from "@/components/UnauthenticationLayout";
import MailIcon from "@/components/icons/MailIcon";
import { userResetPasswordRequest } from "@/redux/auth/actions";
import { AUTH } from "@/types/saga.type";
import { isValidPassword } from "@/utils/helpers";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const { Item } = Form;
const AdminResetPassword = () => {
  const { get } = useSearchParams();
  const router = useRouter();
  const token = get("token");
  const { t } = useTranslation("");
  const [form] = useForm();
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch({
      type: AUTH.ADMIN_RESET_PASSWORD,
      payload: {
        token: token || "",
        newPassword: values.verifyPassword,
        router,
      },
    });
  };
  return (
    <UnauthenticationLayout>
      <div className="text-[#000000] w-[400px] flex items-center flex-col justify-center h-screen space-y-[40px] register-container">
        <div className="w-full text-center text-[14px]">
          <div className="text-[24px] font-[600] leading-[28px]">
            {t("common.recover-your-password")}
          </div>
          <div className="mt-[8px]">
            {t("common.reset-password-description")}
          </div>
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          className="w-full"
          layout="vertical"
          autoComplete="new-password"
        >
          <Item
            rules={[
              { required: true, message: t("common.required-name") || "" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && !isValidPassword(value)) {
                    return Promise.reject(
                      new Error(
                        "Password must be 6-20 characters long, including 1 uppercase letter, 1 lowercase letter, 1 number "
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            label={t("common.new-password")}
            name="new-password"
          >
            <Input.Password
              className="w-full"
              size="large"
              // prefix={<LockIcon />}
            />
          </Item>
          <Item
            dependencies={["new-password"]}
            label={t("common.verify-password")}
            name="verifyPassword"
            rules={[
              { required: true, message: t("common.required-name") || "" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new-password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
              // ({ getFieldValue }) => ({
              //   validator(_, value) {
              //     if (value && !isValidPassword(value)) {
              //       return Promise.reject(
              //         new Error(
              //           "Password must be 6-20 characters long, including 1 uppercase letter, 1 lowercase letter, 1 number "
              //         )
              //       );
              //     }
              //     return Promise.resolve();
              //   },
              // }),
            ]}
          >
            <Input.Password
              className="w-full"
              size="large"
              // prefix={<LockIcon />}
            />
          </Item>
          <LoginButton
            htmlType="submit"
            type="primary"
            size="large"
            className="w-full mt-[40px]"
          >
            {t("common.save-password")}
          </LoginButton>
        </Form>
      </div>
    </UnauthenticationLayout>
  );
};
export default AdminResetPassword;
