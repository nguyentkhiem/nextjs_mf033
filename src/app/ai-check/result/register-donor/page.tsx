"use client";
import WithAuthLayoutUser from "@/app/hoc/PrivateUserRoute";
import Breadcrumb from "@/components/BreadCumb";
import RightIcon from "@/components/icons/RightIcon";
import { Button, Form, Input, Modal, Select } from "antd";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const AiCheckRegisterDonorPage = () => {
  const isFailed = Math.random() < 0.5;
  const { t } = useTranslation("");
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/", href: "/" },
      { title: "AI Check", key: "/ai-check", href: "/ai-check" },
      { title: "The Result", key: "/result", href: "/ai-check/result" },
      { title: "Register Donor", key: "/register-donor" },
    ];
  }, []);

  const onFinish = () => {
    setIsOpenModal(true);
  };

  return (
    <WithAuthLayoutUser>
      <Breadcrumb items={breadCrubItems} />
      <div className="mt-[24px] rounded-[16px] px-[115px] py-[60px] bg-[#FFFFFF]">
        <div className="flex items-center flex-col mb-[40px]">
          <div className="text-[24px] font-bold">
            {t("common.register-donor")}
          </div>
          <div>{t("common.plase-enter-donor")}</div>
        </div>
        <Form
          autoComplete="new-password"
          onFinish={onFinish}
          labelCol={{ span: 3 }}
          colon={false}
        >
          <Form.Item label={t("common.donor-id")}>
            <Input className="h-[52px]" size="large" />
          </Form.Item>
          <Form.Item label={t("common.sex")}>
            <Select className="!w-[200px] !h-[52px]" size="large"></Select>
          </Form.Item>
          <Form.Item label="Birth Date" className="!mb-[0px]">
            <div className="flex items-center space-x-[16px]">
              <Form.Item>
                <Select className="!w-[140px] !h-[52px]" size="large"></Select>
              </Form.Item>
              <Form.Item>
                <Select className="!w-[140px] !h-[52px]" size="large"></Select>
              </Form.Item>
              <Form.Item>
                <Select className="!w-[140px] !h-[52px]" size="large"></Select>
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item label={t("common.location")}>
            <Select className="!w-[200px] !h-[52px]" size="large"></Select>
          </Form.Item>
          <div className="flex justify-center mt-[40px]">
            <Button
              htmlType="submit"
              className="!bg-[#2666D0]"
              type="primary"
              size="large"
              shape="round"
            >
              <div className="flex items-center space-x-[10px]">
                <div>{t("common.register")}</div>
                <RightIcon fill="#FFF" />
              </div>
            </Button>
          </div>
        </Form>
      </div>
      <Modal
        width={800}
        wrapClassName="register-donor-modal"
        style={{ padding: 0 }}
        open={isOpenModal}
        footer={null}
        onCancel={() => {
          setIsOpenModal(false);
        }}
      >
        <div className="min-h-[284px]">
          <div className={`${isFailed ? "min-h-[284px]" : "min-h-[208px]"}`}>
            <div
              className={`flex items-center justify-center h-full ${
                isFailed ? "min-h-[284px]" : "min-h-[208px]"
              }`}
            >
              {isFailed ? (
                <div className=" w-[60%] space-y-[32px]">
                  <div className="text-[24px] font-[700] text-center">
                    {t("common.regis-donor-failed")}
                  </div>
                  <div>{t("common.regis-donor-failed-description")}</div>
                </div>
              ) : (
                <div className="text-[24px] font-[700]">
                  {t("common.regis-donor-completed")}
                </div>
              )}
            </div>
          </div>
          {isFailed ? null : (
            <div className="flex items-center justify-end space-x-[16px] h-[76px] bg-[#F3F3F3] rounded-b-[8px] px-[24px] py-[16px] ">
              <>
                <Button
                  onClick={() => {
                    router.push("/");
                  }}
                  type="primary"
                  ghost
                  size="large"
                >
                  {t("common.home")}
                </Button>
                <Button
                  onClick={() => {
                    router.push("/ai-check/upload-another-donor");
                  }}
                  size="large"
                  type="primary"
                >
                  {t("common.upload-to-another-donor")}
                </Button>
              </>
            </div>
          )}
        </div>
      </Modal>
    </WithAuthLayoutUser>
  );
};
export default AiCheckRegisterDonorPage;
