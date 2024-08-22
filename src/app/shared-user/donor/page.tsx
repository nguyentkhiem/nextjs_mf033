"use client";

import WithSharedUserLayout from "@/app/hoc/SharedUserLayout";
import LoginButton from "@/components/Button";
import TermsAndPrivacyModal from "@/components/TermAndPrivacyModal";
import TermsOfServiceModal from "@/components/TermOfServiceModal";
import { userGetSharedUserDataRequest } from "@/redux/home/actions";
import { useAppSelector } from "@/redux/hooks";
import { Checkbox, Form, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { set } from "lodash";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
const FullpageViewer = dynamic(() => import("@/components/FullpageViewer"), {
  ssr: false,
});

const DonorDetailPage = () => {
  const { t } = useTranslation("");
  const query = useSearchParams();
  const [showTerm, setShowTerm] = useState(true);
  const [form] = useForm();
  const id = query.get("id");
  const token = query.get("token");
  const dispatch = useDispatch();
  const data = useAppSelector((state) => state.homeReducer.sharedUser);

  useEffect(() => {
    if (id && token) {
      dispatch(userGetSharedUserDataRequest({ id: Number(id), token: token }));
    }
  }, [id, token]);

  return (
    <WithSharedUserLayout>
      <TermsOfServiceModal
        onNext={() => {
          setShowTerm(false);
        }}
        open={showTerm}
      />

      {!showTerm && (
        <>
          <div className="px-[16px] py-[6px] text-[14px] bg-[#e6e6e6] text-[#A2A0A0] rounded font-bold w-fit break-words mb-1">
            {data?.donorCode}
          </div>
          <FullpageViewer slideId={data?.slide?.id} url={data?.slide?.link} />
        </>
      )}
    </WithSharedUserLayout>
  );
};
export default DonorDetailPage;
