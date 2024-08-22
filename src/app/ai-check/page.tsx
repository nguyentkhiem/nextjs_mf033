"use client";

import Breadcrumb from "@/components/BreadCumb";
import WithAuthLayoutUser from "../hoc/PrivateUserRoute";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Upload } from "antd";
import HintImageIcon from "@/components/icons/HintImageIcon";
import LiverIcon from "@/components/icons/Liver";
import Cookie from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/variables";
const AiCheckPage = () => {
  const { t } = useTranslation("");
  const router = useRouter();
  const token = Cookie.get(ACCESS_TOKEN);
  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/", href: "/" },
      { title: "AI Applications", key: "/ai-check" },
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
        {t("common.AI-applications")}
      </div>
      <div className="mt-[8px]">
        <div className="!bg-white rounded-[16px] border-dashed border-[2px] border-[#86B1F8]">
          <div className="h-[673px] flex flex-col items-center justify-center text-left ">
            <div className="text-[24px] text-[#2666D0] font-bold mb-[4px]">
              STEP 1
            </div>
            <div className="text-[#A2A0A0] text-[24px] mb-[32px]">
              Drag and Drop or Select File. PNG or JPG images with x20
              magnification are desirable.
            </div>
            <div className="text-[24px] text-[#2666D0] font-bold mb-[4px]">
              STEP2
            </div>
            <div className="text-[#A2A0A0] text-[24px] mb-[32px]">
              Click calculate button, AI application will quantify the steatosis
              of the liver.
            </div>
            <div className="border-[#86B1F8] border-solid border-[1px] rounded-[8px] w-[303px] h-[60px] mb-[100px] flex items-center justify-center">
              <div className="flex items-center justify-between text-[#86B1F8] space-x-[15px]">
                <div>
                  <LiverIcon />
                </div>
                <div>Available for liver images only.</div>
              </div>
            </div>

            <a
              target="_blank"
              href={`/ai-check/upload`}
              className="h-[52px] w-[400px] bg-[#2666D0] flex items-center justify-center text-[#fff] font-bold rounded-[4px] mb-[48px] cursor-pointer"
            >
              Open AI application（β version）
            </a>
            <div>Research use only. Not for use in diagnostic Procedures.</div>
            {/* <div className="text-left mt-[21px]">
              {t("common.drag")}{" "}
              <b className="text-[#2666D0]">{t("common.browse")}</b>
            </div>
            <div className="text-left mt-[16px]">
              <div>{t("common.svs/tiff")}</div>
              <div>{t("common.jpeg/png")}</div>
            </div> */}
          </div>
        </div>
      </div>
    </WithAuthLayoutUser>
  );
};
export default AiCheckPage;
