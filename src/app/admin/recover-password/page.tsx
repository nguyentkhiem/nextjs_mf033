"use client";
import "@/assets/scss/globals.scss";
import LoginButton from "@/components/Button";
import FormInput from "@/components/Input";
import UnauthenticationLayout from "@/components/UnauthenticationLayout";
import MailIcon from "@/components/icons/MailIcon";
import { useAppSelector } from "@/redux/hooks";
import { AUTH } from "@/types/saga.type";
import { Form } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const { Item } = Form;

export default function ResetPassword() {
  const { t } = useTranslation("");
  const dispatch = useDispatch();
  const { isEmailSent } = useAppSelector((state) => state.authAdmin);
  const onFinish = (values: any) => {
    dispatch({
      type: AUTH.ADMIN_RECOVER_PASSWORD,
      payload: {
        email: values.email,
      },
    });
    setEmail(values.email);
  };
  const [email, setEmail] = useState("");
  return (
    <UnauthenticationLayout>
      <div className="text-[#000000] w-[400px] flex items-center flex-col justify-center h-screen space-y-[40px]">
        <div className="w-full text-center text-[14px]">
          <div className="text-[24px] font-[700] leading-[28px]">
            {t("common.recover-your-password")}
          </div>
          <div className=" mt-[8px] leading-[19.6px] text-center text-[14px]">
            {isEmailSent
              ? t("common.recover-your-password-description-success")
              : t("common.recover-your-password-description")}
          </div>
          {isEmailSent && (
            <div className="mt-[40px]">
              {t(`common.resend-recover-your-password`)}
            </div>
          )}
        </div>
        {isEmailSent ? (
          <div className="w-full text-center">
            <LoginButton
              onClick={() => {
                dispatch({
                  type: AUTH.ADMIN_RECOVER_PASSWORD,
                  payload: {
                    email: email,
                  },
                });
              }}
              type="primary"
              size="large"
              className="w-full"
            >
              {t("common.request-resend")}
            </LoginButton>
            <Link href="/admin/sign-in">
              <div className="mt-[16px] text-[#2666D0] font-[700]">
                {t("common.login")}
              </div>
            </Link>
          </div>
        ) : (
          <Form
            onFinish={onFinish}
            className="w-full"
            layout="vertical"
            autoComplete="new-password"
          >
            <Item
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Email is invalid" },
              ]}
            >
              <FormInput prefix={<MailIcon />} />
            </Item>
            <LoginButton
              onClick={() => {}}
              type="primary"
              size="large"
              className="w-full mt-[32px]"
              htmlType="submit"
            >
              {t("common.send-link")}
            </LoginButton>
          </Form>
        )}
      </div>
    </UnauthenticationLayout>
  );
}
