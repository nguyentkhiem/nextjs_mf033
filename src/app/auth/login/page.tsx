"use client";
import LoginButton from "@/components/Button";
import FormInput from "@/components/Input";
import LockIcon from "@/components/icons/LockIcon";
import UserIcon from "@/components/icons/UserIcon";
import { ROUTES } from "@/constants/routers";
import { ACCESS_TOKEN } from "@/constants/variables";
import { userLoginRequest } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import { Checkbox, Form, Input } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
const { Item } = Form;
const UserLogin = () => {
  const { t } = useTranslation("");
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const token = Cookies.get(ACCESS_TOKEN);
  const { get } = useSearchParams();
  const redirectUrl = get("redirect");

  const onFinish = (values: any) => {
    if (redirectUrl) {
      const newRedirectUrl = new URL(redirectUrl);
      dispatch(
        userLoginRequest({
          email: values.username,
          password: values.password,
          router,
          isRememberMe: values.isRemember,
          redirectUrl: newRedirectUrl.href,
        })
      );
    } else {
      dispatch(
        userLoginRequest({
          email: values.username,
          password: values.password,
          router,
          isRememberMe: values.isRemember,
          redirectUrl: ROUTES.HOME,
        })
      );
    }
  };

  useEffect(() => {
    if (auth.isLogin || token) {
      if (redirectUrl) {
        const newRedirectUrl = new URL(redirectUrl);
        router.push(newRedirectUrl.href);
      } else {
        router.push(ROUTES.HOME);
      }
    }
  }, [auth.isLogin, token]);

  return (
    <div className="w-[400px] text-[#000000] flex items-center flex-col justify-center h-screen space-y-[40px]">
      <div className="font-[600] text-[24px] leading-7 l">
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
          <FormInput
            // autoComplete="new-password"
            prefix={<UserIcon />}
          />
        </Item>
        <Item
          name="password"
          rules={[
            {
              required: true,
              message: t("common.required-password") || "",
            },
          ]}
        >
          <Input.Password
            // autoComplete="new-password"
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
          <Link href={"/auth/forgot-password"}>
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
        {/* <div className="flex items-center flex-col mt-[16px] text-[14px]">
          <div>
            {t("common.don't-have-an-account?")}
            <b
              onClick={() => {
                router.push("/auth/sign-up");
              }}
              className="text-[#2666D0] cursor-pointer"
            >
              {t("common.create-an-account")}
            </b>
          </div>
        </div> */}
      </Form>
    </div>
  );
};
export default UserLogin;
