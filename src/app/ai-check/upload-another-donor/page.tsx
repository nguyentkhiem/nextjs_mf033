"use client";

import Breadcrumb from "@/components/BreadCumb";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Upload } from "antd";
import HintImageIcon from "@/components/icons/HintImageIcon";
import WithAuthLayoutUser from "@/app/hoc/PrivateUserRoute";

const AiCheckPage = () => {
  const { t } = useTranslation("");
  const router = useRouter();
  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/", href: "/" },
      { title: "AI Check", key: "/ai-check", href: "/ai-check" },
      { title: "Upload another donor", key: "/ai-check/upload-another-donor" },
    ];
  }, []);
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <WithAuthLayoutUser>
      <Breadcrumb items={breadCrubItems} />
      <div className="mt-[20px] text-[24px] font-[700]">
        {t("common.upload-new-donor")}
      </div>
      <div>{t("common.please-upload-image")}</div>
      <div className="mt-[8px]">
        <Upload.Dragger
          className="!bg-white"
          onChange={() => {
            router.push("/ai-check/result");
          }}
          customRequest={dummyRequest}
          showUploadList={false}
        >
          <div className="h-[400px] flex flex-col items-center justify-center text-left ">
            <HintImageIcon />
            <div className="text-left mt-[21px]">
              {t("common.drag")}{" "}
              <b className="text-[#2666D0]">{t("common.browse")}</b>
            </div>
            <div className="text-left mt-[16px]">
              <div>{t("common.svs/tiff")}</div>
              <div>{t("common.jpeg/png")}</div>
            </div>
          </div>
        </Upload.Dragger>
      </div>
    </WithAuthLayoutUser>
  );
};
export default AiCheckPage;
