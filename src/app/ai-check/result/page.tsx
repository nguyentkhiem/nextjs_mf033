"use client";
import WithAuthLayoutUser from "@/app/hoc/PrivateUserRoute";
import Breadcrumb from "@/components/BreadCumb";
import RightIcon from "@/components/icons/RightIcon";
import { Alert, Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

const AiCheckResultPage = () => {
  useEffect(() => {}, []);
  const { t } = useTranslation("");
  const router = useRouter();
  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/", href: "/" },
      { title: "AI Check", key: "/ai-check", href: "/ai-check" },
      { title: "The Result", key: "/the-result" },
    ];
  }, []);

  return (
    <WithAuthLayoutUser>
      <Breadcrumb items={breadCrubItems} />
      <div className="mt-[24px] rounded-[16px] px-[40px] py-[60px] bg-[#FFFFFF]">
        <div className="w-full h-[300px] bg-[#E5E9F480] relative">
          {/* <TiffViewer id="ai-check-result-page" /> */}
        </div>
        <div className="font-semibold mt-[40px] mb-[8px]">
          {t("common.the-result")}
        </div>
        <Alert
          banner
          className="h-[68px] !rounded-[8px] !bg-[#ECFEE3] !px-[32px] py-[24px]"
          message="This donor has passed."
          type="success"
          showIcon
        />
        <div className="flex justify-center mt-[40px]">
          <Button
            className="!bg-[#2666D0]"
            type="primary"
            size="large"
            shape="round"
            onClick={() => {
              router.push("/ai-check/result/register-donor");
            }}
          >
            <div className="flex items-center space-x-[10px]">
              <div>{t("common.continue-to-access")}</div>
              <RightIcon fill="#FFF" />
            </div>
          </Button>
        </div>
      </div>
    </WithAuthLayoutUser>
  );
};
export default React.memo(AiCheckResultPage);
