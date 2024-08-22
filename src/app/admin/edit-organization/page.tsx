"use client";

import WithAuthLayoutAdmin from "@/app/hoc/PrivateAdminRoute";
import Breadcrumb from "@/components/BreadCumb";
import FormInput from "@/components/Input";
import {
  adminGetOrganizationDetail,
  adminUpdateOrganization,
} from "@/redux/admin/group/actions";
import { useAppSelector } from "@/redux/hooks";
import { isValidPhoneNumber } from "@/utils/helpers";
import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const { Item } = Form;

const EditOrganizationPage = () => {
  const { t } = useTranslation("");
  const router = useRouter();
  const query = useSearchParams();
  const id = query.get("id");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const detail = useAppSelector((state) => state.adminGroup.organizationDetail);
  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/", href: "/admin" },
      { title: `Edit / ${detail?.name}`, key: "/group" },
    ];
  }, [detail]);

  useEffect(() => {
    if (id) {
      dispatch(adminGetOrganizationDetail({ id: Number(id) }));
    }
  }, [id]);

  const onFinish = (values: any) => {
    dispatch(adminUpdateOrganization({ id: Number(id), ...values }));
  };

  useEffect(() => {
    if (detail) {
      form.setFieldsValue({
        name: detail.name,
        location: detail.location,
        keyPersonnel: detail.keyPersonnel,
        phoneNumber: detail.phoneNumber,
      });
    }
  }, [detail]);

  return (
    <WithAuthLayoutAdmin>
      <Breadcrumb items={breadCrubItems} />
      <div className="mt-[40px] flex flex-col items-center justify-center rounded-[16px] px-[40px] py-[40px] bg-[#FFFFFF]">
        <Form
          form={form}
          autoComplete="new-password"
          onFinish={onFinish}
          className="w-[480px]"
          layout="vertical"
        >
          <div className="register-container px-[40px]">
            <div className="text-[24px] pb-[19px] font-[700] text-center">
              Edit Organization
            </div>
            <Item
              rules={[{ required: true, message: "Name is required" }]}
              label={t("common.name")}
              name="name"
            >
              <FormInput
              // prefix={<LockIcon />}
              />
            </Item>
            <Item
              rules={[{ required: true, message: "Location is required" }]}
              label={t("common.location")}
              name="location"
            >
              <FormInput
              // prefix={<LockIcon />}
              />
            </Item>

            <Item
              rules={[{ required: true, message: "Key personnel is required" }]}
              label={t("admin.key-personnel")}
              name="keyPersonnel"
            >
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 5 }}
                // prefix={<LockIcon />}
              />
            </Item>
            <Item
              rules={[
                { required: true, message: "Phone center is required" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value && !isValidPhoneNumber(value)) {
                      return Promise.reject(
                        new Error("Phone number is not valid")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              label={t("admin.center-phone")}
              name="phoneNumber"
            >
              <FormInput
              // prefix={<LockIcon />}
              />
            </Item>
          </div>
          <div className="text-center mt-[40px]">
            <Button
              htmlType="submit"
              size="large"
              className="w-[160px] "
              type="primary"
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </WithAuthLayoutAdmin>
  );
};
export default EditOrganizationPage;
