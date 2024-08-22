"use client";
import LoginButton from "@/components/Button";
import FormInput from "@/components/Input";
import UserIcon from "@/components/icons/UserIcon";
import WarningIcon from "@/components/icons/WarningIcon";
import { ACCESS_TOKEN } from "@/constants/variables";
import { userCheckUserExistRequest } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import { Alert, Form } from "antd";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
const { Item } = Form;
const CertificationComplete = () => {
  const { t } = useTranslation("");
  const dispatch = useDispatch();
  const router = useRouter();
  const isExists = useAppSelector((state) => state.auth.isExists);
  const token = Cookies.get(ACCESS_TOKEN);
  const { get } = useSearchParams();
  const onFinish = (values: any) => {
    router.push(
      `/auth/sign-up/register?email=${encodeURIComponent(get("email") || "")}`
    );
  };

  return (
    <div className="w-[400px] text-[#000000] flex items-center flex-col justify-center h-screen space-y-[40px]">
      <div>
        <div className="font-[700] text-[30px] text-center leading-[42px]">
          {t("common.thanks")}
        </div>
        <div className="font-[400] mt-[16px] text-[14px] text-center">
          {t("common.certification-completed")}
        </div>
      </div>

      <Form
        autoComplete="new-password"
        onFinish={onFinish}
        className="w-full"
        layout="vertical"
      >
        <LoginButton
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full mt-[14px]"
        >
          {t("common.proceed-to-sign-up")}
        </LoginButton>
      </Form>
    </div>
  );
};
export default CertificationComplete;
