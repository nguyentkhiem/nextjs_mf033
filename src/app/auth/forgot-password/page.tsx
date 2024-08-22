"use client";
import LoginButton from "@/components/Button";
import FormInput from "@/components/Input";
import MailIcon from "@/components/icons/MailIcon";
import { clearResetPasswordStatus } from "@/redux/auth";
import { userForgotPasswordRequest } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import { Form } from "antd";
import { useForm } from "antd/es/form/Form";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const { Item } = Form;
const UserForgotPassword = () => {
  const { t } = useTranslation("");
  const isResetPasswordSuccess = useAppSelector(
    (state) => state.auth.isResetPasswordSuccess
  );
  const [emai, setEmail] = useState("");
  const { get } = useSearchParams();
  const [form] = useForm();
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    setEmail(values.email);
    dispatch(userForgotPasswordRequest({ email: values.email }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearResetPasswordStatus(false));
    };
  }, []);

  return (
    <div className="text-[#000000] w-[400px] flex items-center flex-col justify-center h-screen space-y-[40px]">
      <div className="w-full text-center text-[14px]">
        <div className="text-[24px] font-[700] leading-[28px]">
          {isResetPasswordSuccess
            ? "E-mail was sent"
            : t("common.recover-your-password")}
        </div>
        <div className=" mt-[8px] leading-[22.4px]">
          {isResetPasswordSuccess
            ? t("common.recover-your-password-description-success")
            : t("common.recover-your-password-description")}
        </div>
        {isResetPasswordSuccess && (
          <div className="mt-[40px]">
            {t(`common.resend-recover-your-password`)}
          </div>
        )}
      </div>
      {isResetPasswordSuccess ? (
        <div className="w-full text-center">
          <LoginButton
            onClick={() => {
              dispatch(userForgotPasswordRequest({ email: emai }));
            }}
            type="primary"
            size="large"
            className="w-full"
          >
            {t("common.request-resend")}
          </LoginButton>
          <Link href="/auth/login">
            <div className="mt-[16px] text-[#2666D0] font-[700]">
              {t("common.login")}
            </div>
          </Link>
        </div>
      ) : (
        <Form
          form={form}
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
            htmlType="submit"
            type="primary"
            size="large"
            className="w-full mt-[32px]"
          >
            {t("common.send-link")}
          </LoginButton>
          {/* <div className="flex items-center justify-center flex-col mt-[16px] w-full">
            <div className="w-full text-center">
              {t("common.assistance")}{" "}
              <b className="cursor-pointer text-[#2666D0]">
                {t("common.contact-sp-team")}
              </b>
            </div>
          </div> */}
        </Form>
      )}
    </div>
  );
};
export default UserForgotPassword;
