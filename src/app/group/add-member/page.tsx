"use client";
import WithAuthLayoutUser from "@/app/hoc/PrivateUserRoute";
import Breadcrumb from "@/components/BreadCumb";
import FormInput from "@/components/Input";
import { OPO_LIST } from "@/constants/common";
import { setAddMemberSuccess } from "@/redux/auth";
import { userAddMemberRequest } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import { OrganizationRole, UserRole } from "@/types/common.enum";
import { isValidPassword, isValidPhoneNumber } from "@/utils/helpers";
import { Button, Col, Form, Input, Radio, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
const { Item } = Form;
const AddUserPage = () => {
  const { t } = useTranslation("");
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const auth = useAppSelector((state) => state.auth);
  const isAddMemberSuccess = useAppSelector(
    (state) => state.auth.isAddMemberSuccess
  );

  const [form] = useForm();
  const [role, setRole] = useState<UserRole>(UserRole.OPO);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const [isShowTerm, setIsShowTerm] = useState(false);
  const onFinish = (values: any) => {
    dispatch(
      userAddMemberRequest({
        data: {
          data: [{ ...values, organizationRole: OrganizationRole.MEMBER }],
        },
        forceRemoveAccessToken: false,
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(setAddMemberSuccess(false));
    };
  }, []);

  useEffect(() => {
    if (isAddMemberSuccess) {
      form.resetFields();
    }
  }, [isAddMemberSuccess]);

  useEffect(() => {
    return () => {
      dispatch(setAddMemberSuccess(false));
    };
  }, []);

  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/", href: "/" },
      { title: "Group", key: "/group", href: "/group" },
      { title: "Add Member", key: "/group/add-member" },
    ];
  }, []);

  useEffect(() => {
    if (auth?.user?.organizationUser.organization.name) {
      form.setFieldValue(
        "organization",
        auth?.user?.organizationUser.organization.name
      );
    }
  }, [auth]);

  return (
    <WithAuthLayoutUser>
      <Breadcrumb items={breadCrubItems} />
      <div className="w-full mt-[40px] flex items-center justify-center bg-[#FFF] rounded-[16px]">
        <div className="w-[421px] text-[#000000] flex items-center flex-col justify-center min-h-screen  space-y-[40px] register-container py-[40px]">
          <>
            <div className="font-[600] text-[24px]">{t("common.add-user")}</div>
            <Form
              form={form}
              autoComplete="new-password"
              initialValues={{
                role: UserRole.OPO,
                organization: auth?.user?.organizationUser.organization.name,
                users: [
                  {
                    role: UserRole.OPO,
                  },
                ],
              }}
              onFinish={onFinish}
              className="w-full"
              layout="vertical"
            >
              <Item
                name="role"
                label={
                  <div className="!flex !justify-between !w-[450px] items-center">
                    <div>{t("common.role")}</div>
                  </div>
                }
              >
                <Radio.Group
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  defaultValue={UserRole.OPO}
                >
                  <Radio value={UserRole.OPO}>{t("admin.opo")}</Radio>
                  <Radio value={UserRole.PATHOLOGIST}>
                    {t("admin.pathologist")}
                  </Radio>
                  <Radio value={UserRole.TRANSPLANT}>
                    {t("admin.transplant")}
                  </Radio>
                  <Radio value={UserRole.OTHER}>{t("admin.other")}</Radio>
                </Radio.Group>
              </Item>
              <Item
                name="organization"
                label={
                  <div className="!flex !justify-between !w-[450px] items-center">
                    <div>{t("common.organization")}</div>
                  </div>
                }
              >
                <FormInput
                  readOnly
                  // prefix={<LockIcon />}
                />
              </Item>
              <Row gutter={[20, 12]}>
                <Col span={12}>
                  <Item
                    rules={[
                      {
                        required: true,
                        message: "First name is required",
                      },
                    ]}
                    label={t("common.first-name")}
                    name="firstName"
                  >
                    <FormInput
                    // prefix={<LockIcon />}
                    />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    rules={[
                      {
                        required: true,
                        message: "Last name is required",
                      },
                    ]}
                    label={t("common.last-name")}
                    name="lastName"
                  >
                    <FormInput
                    // prefix={<LockIcon />}
                    />
                  </Item>
                </Col>
              </Row>
              <Item
                rules={[
                  { required: true, message: "Phone is required" },
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
                label={t("common.phone")}
                name="phoneNumber"
              >
                <FormInput
                // prefix={<LockIcon />}
                />
              </Item>
              <Item
                rules={[
                  { type: "email", message: "Email is invalid" },
                  { required: true, message: "Email is required" },
                ]}
                label={t("common.mail-address")}
                name="email"
              >
                <FormInput
                // prefix={<LockIcon />}
                />
              </Item>
              <Item
                rules={[
                  {
                    required: true,
                    message: t("common.required-name") || "",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value && !isValidPassword(value)) {
                        return Promise.reject(
                          new Error(
                            "Password must be 6-20 characters long, including 1 uppercase letter, 1 lowercase letter, 1 number "
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                label={t("common.password")}
                name="password"
              >
                <Input.Password
                  className="w-full"
                  size="large"
                  autoComplete="new-password"
                  // prefix={<LockIcon />}
                />
              </Item>

              <div className="flex justify-center">
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  shape="round"
                  className="w-[138px]  mt-[40px]"
                >
                  {t("common.add")}
                </Button>
              </div>
            </Form>
          </>
        </div>
      </div>
    </WithAuthLayoutUser>
  );
};
export default AddUserPage;
