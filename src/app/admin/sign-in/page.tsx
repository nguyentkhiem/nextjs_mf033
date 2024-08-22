"use client";
import LoginButton from "@/components/Button";
import FormInput from "@/components/Input";
import UnauthenticationLayout from "@/components/UnauthenticationLayout";
import LockIcon from "@/components/icons/LockIcon";
import UserIcon from "@/components/icons/UserIcon";
import { ROUTES } from "@/constants/routers";
import { ACCESS_TOKEN_ADMIN } from "@/constants/variables";
import { useAppSelector } from "@/redux/hooks";
import { AUTH } from "@/types/saga.type";
import { Checkbox, Form, Input } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const { Item } = Form;

export default function Login() {
  const { t } = useTranslation("");
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.authAdmin);
  const adminToken = Cookies.get(ACCESS_TOKEN_ADMIN);
  const onFinish = (values: any) => {
    dispatch({
      type: AUTH.LOGIN_ADMIN,
      payload: {
        usernameOrEmail: values.username,
        password: values.password,
        router,
        isRememberMe: values.isRemember,
      },
    });
  };
  useEffect(() => {
    if (auth.isLogin || adminToken) {
      router.push(ROUTES.ADMIN);
    }
  }, [auth, adminToken]);

  return (
    <UnauthenticationLayout>
      <div className="w-[400px] text-[#000000] flex items-center flex-col justify-center h-screen space-y-[40px]">
        <div className="font-[600] text-[24px]">
          {t("common.login-to-your-account")}
        </div>
        <Form
          autoComplete="new-password"
          onFinish={onFinish}
          className="w-full"
          layout="vertical"
        >
          <Item
            name="username"
            rules={[
              {
                required: true,
                message: t("common.required-name") || "",
              },
              {
                type: "email",
                message: t("common.email-is-invalid") || "",
              },
            ]}
          >
            <FormInput className="!h-[52px]" prefix={<UserIcon />} />
          </Item>
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: t("common.required-name") || "",
              },
            ]}
          >
            <Input.Password
              className="!h-[52px]"
              autoComplete="new-password"
              size="large"
              prefix={<LockIcon />}
            />
          </Item>
          <div className="flex items-center justify-between">
            <Item valuePropName="checked" name="isRemember">
              <Checkbox>
                <div className="text-[#A2A0A0]">{t("common.remember-me")}</div>
              </Checkbox>
            </Item>
            <Link href={"/admin/recover-password"}>
              <div className=" mb-[12px] text-right text-[#2666D0] font-[700] cursor-pointer">
                {t("common.forgot-your-password")}
              </div>
            </Link>
          </div>

          <LoginButton
            htmlType="submit"
            type="primary"
            size="large"
            className="w-full mt-[40px]"
          >
            {t("common.login")}
          </LoginButton>
        </Form>
      </div>
    </UnauthenticationLayout>
  );
}
