"use client";
import Breadcrumb from "@/components/BreadCumb";
import WithAuthLayoutUser from "../hoc/PrivateUserRoute";
import { useEffect, useMemo, useState } from "react";
import Title from "../components/Title";
import { useTranslation } from "react-i18next";
import EditIcon from "@/components/icons/EditIcon";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import Description from "../admin/components/Description";
import { handleUserType, isValidName, isValidPassword } from "@/utils/helpers";
import { UserRole } from "@/types/common.enum";
import { useAppSelector } from "@/redux/hooks";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import {
  userUpdateInfoRequest,
  userUpdatePasswordRequest,
} from "@/redux/auth/actions";
import FormInput from "@/components/Input";
import {
  clearUpdateUserInfoSuccess,
  setUpdatePasswordSuccess,
} from "@/redux/auth";

const MyPage = () => {
  const { t } = useTranslation("");
  const [isEdit, setIsEdit] = useState(false);
  const [activeKey, setActiveKey] = useState(0);
  const user = useAppSelector((state) => state.auth.user);
  const isUpdateInfoSuccess = useAppSelector(
    (state) => state.auth.isUpdateInfoSuccess
  );
  const isUpdatePasswordSuccess = useAppSelector(
    (state) => state.auth.isUpdatePasswordSuccess
  );
  const dispatch = useDispatch();
  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/", href: "/" },
      { title: activeKey === 0 ? "My profile" : "Password", key: "/my-page" },
    ];
  }, [activeKey]);
  const [form] = useForm();

  useEffect(() => {
    if (isEdit && user) {
      form.setFieldsValue({
        firstName: user.firstName,
        organization: user.organizationUser.organization.name,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [isEdit, user]);

  const onFinish = (values: any) => {
    dispatch(
      userUpdateInfoRequest({
        role: values.role,
        email: values.email,
        organization: values.organization,
        firstName: values.firstName,
        phoneNumber: values.phone,
        lastName: values.lastName,
      })
    );
  };

  const onUpdatePassword = (values: any) => {
    dispatch(
      userUpdatePasswordRequest({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
    );
  };

  useEffect(() => {
    if (isEdit && isUpdateInfoSuccess) {
      setIsEdit(false);
    }
  }, [isEdit, isUpdateInfoSuccess]);

  return (
    <WithAuthLayoutUser>
      <Breadcrumb items={breadCrubItems} />
      <div className="bg-[#FFF] rounded-[16px] px-[40px] py-[60px] mt-[24px]">
        <div className="flex">
          <div className="flex flex-col space-y-[16px] pr-[20px] py-[32px]">
            <div
              onClick={() => {
                setActiveKey(0);
              }}
              className={`cursor-pointer w-[150px] font-bold rounded-[4px] px-[24px] py-[12px] text-center ${
                activeKey === 0 && "bg-[#E5E9F4] text-[#2666D0]"
              }`}
            >
              My profile
            </div>
            <div
              onClick={() => {
                setActiveKey(1);
              }}
              className={`cursor-pointer w-[150px] font-bold rounded-[4px] px-[24px] py-[12px] text-center ${
                activeKey === 1 && "bg-[#E5E9F4] text-[#2666D0]"
              }`}
            >
              Password
            </div>
          </div>
          <div className="border-l-[1px] border-l-[#A2A0A0] border-solid border-[0px] py-[32px] pr-[32px] pl-[80px] w-full register-form">
            {activeKey === 0 ? (
              <>
                {isEdit ? (
                  <>
                    <Title
                      title={t("common.my-profile")}
                      hasRightIcon={false}
                    ></Title>

                    <Form
                      autoComplete="new-password"
                      form={form}
                      onFinish={onFinish}
                      layout="vertical"
                      className="mt-[32px]"
                    >
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: t("common.required-name") || "",
                          },
                          {
                            whitespace: true,
                            message: t("common.required-name") || "",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (value && !isValidName(value)) {
                                return Promise.reject(
                                  new Error("Given first name is not valid")
                                );
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                        name="firstName"
                        label={t("common.first-name")}
                      >
                        <Input className="!h-[52px]" size="large" />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: t("common.required-name") || "",
                          },
                          {
                            whitespace: true,
                            message: t("common.required-name") || "",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (value && !isValidName(value)) {
                                return Promise.reject(
                                  new Error("Given last name is not valid")
                                );
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                        name="lastName"
                        label={t("common.last-name")}
                      >
                        <Input className="!h-[52px]" size="large" />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: t("common.required-name") || "",
                          },
                          {
                            whitespace: true,
                            message: t("common.required-name") || "",
                          },
                        ]}
                        name="role"
                        label={t("common.role")}
                      >
                        <Select className="!h-[52px]" size="large">
                          <Select.Option
                            value={UserRole.OPO}
                            key={UserRole.OPO}
                          >
                            {t("admin.opo")}
                          </Select.Option>
                          <Select.Option
                            value={UserRole.PATHOLOGIST}
                            key={UserRole.PATHOLOGIST}
                          >
                            {t("admin.pathologist")}
                          </Select.Option>
                          <Select.Option
                            value={UserRole.TRANSPLANT}
                            key={UserRole.TRANSPLANT}
                          >
                            {t("admin.transplant")}
                          </Select.Option>
                          <Select.Option
                            value={UserRole.OTHER}
                            key={UserRole.OTHER}
                          >
                            {t("admin.other")}
                          </Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="organization"
                        label={t("common.organization")}
                      >
                        <Input className="!h-[52px]" size="large" readOnly />
                      </Form.Item>

                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: t("common.required-name") || "",
                          },
                          {
                            whitespace: true,
                            message: t("common.required-name") || "",
                          },
                        ]}
                        name="phoneNumber"
                        label={t("common.phone")}
                      >
                        <Input className="!h-[52px]" size="large" />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: t("common.required-name") || "",
                          },
                          {
                            whitespace: true,
                            message: t("common.required-name") || "",
                          },
                        ]}
                        name="email"
                        label={t("common.e-mail")}
                      >
                        <Input readOnly className="!h-[52px]" size="large" />
                      </Form.Item>
                      <div className="flex justify-center">
                        <Button
                          htmlType="submit"
                          className="bg-[#2666D0] !h-[44px] w-[160px] "
                          type="primary"
                        >
                          <div className=" font-bold text-white">
                            {t("common.save")}
                          </div>
                        </Button>
                      </div>
                    </Form>
                  </>
                ) : (
                  <>
                    {user?.organizationUser.role === "LEADER" && (
                      <div className="bg-[#C94747] mb-[38px] text-[#FFFFFF] h-[29px] rounded-[4px] px-[8px] py-[4px] w-[129px] flex items-center justify-center">
                        Admin
                      </div>
                    )}

                    <Title
                      title={t("common.my-profile")}
                      hasRightIcon
                      onClick={() => {
                        setIsEdit(true);
                      }}
                      rightButtonIcon={<EditIcon />}
                      rightButtonText={t("common.edit")}
                    ></Title>
                    <div>
                      <Row gutter={50}>
                        <Col className="space-y-[24px]" span={7}>
                          <Description
                            title={t("common.first-name")}
                            content={user?.firstName}
                          ></Description>
                          <Description
                            title={t("common.organization")}
                            content={user?.organizationUser.organization.name}
                          ></Description>
                        </Col>
                        <Col className="space-y-[24px]" span={7}>
                          <Description
                            title={t("common.last-name")}
                            content={user?.lastName}
                          ></Description>
                          <Description
                            title={t("common.phone")}
                            content={user?.phoneNumber}
                          ></Description>
                          {/* <Description
                            title={t("common.group-admin-name")}
                            content={user?.organizationUser?.organization?.email}
                          ></Description> */}
                        </Col>
                        <Col className="space-y-[24px]" span={7}>
                          <Description
                            title={t("common.role")}
                            content={handleUserType(user?.role || UserRole.OPO)}
                          ></Description>
                          <Description
                            title={t("common.e-mail")}
                            content={user?.email}
                          ></Description>
                          {/* <Description
                            title={t("common.group-admin-email")}
                            content={
                              user?.organizationUser?.organization?.email
                            }
                          ></Description> */}
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <Title
                  title={t("common.password")}
                  hasRightIcon={false}
                ></Title>

                <Form
                  autoComplete="new-password"
                  form={form}
                  onFinish={onUpdatePassword}
                  layout="vertical"
                  className="mt-[32px]"
                >
                  <Form.Item
                    name="currentPassword"
                    label={t("common.current-password")}
                    rules={[
                      {
                        required: true,
                        message: t("common.required-name") || "",
                      },
                    ]}
                  >
                    <Input.Password className="!h-[52px]" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label={t("common.new-password")}
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
                                "Password must be 6-20 characters long, including 1 uppercase letter, 1 lowercase letter, 1 number"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input.Password className="!h-[52px]" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="newPasswordConfirm"
                    label={t("common.new-password-confirm")}
                    rules={[
                      {
                        required: true,
                        message: t("common.required-name") || "",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (value && value !== getFieldValue("newPassword")) {
                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input.Password className="!h-[52px]" size="large" />
                  </Form.Item>
                  <div className="flex justify-center">
                    <Button
                      htmlType="submit"
                      className="bg-[#2666D0] !h-[44px] w-[160px] "
                      type="primary"
                    >
                      <div className=" font-bold text-white">
                        {t("common.save")}
                      </div>
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        wrapClassName="register-donor-modal"
        style={{ padding: 0 }}
        width={800}
        footer={null}
        onCancel={() => {
          dispatch(clearUpdateUserInfoSuccess({}));
        }}
        open={isUpdateInfoSuccess}
      >
        <div>
          <div className="pl-[40px] pr-[9px] ">
            <div className=" h-[208px] flex items-center justify-center">
              <div className="text-[24px] font-bold">
                Profile Edit was completed
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center space-x-[16px] h-[76px] bg-[#F3F3F3] rounded-b-[16px] px-[24px] py-[16px]">
            <div
              onClick={() => {
                dispatch(clearUpdateUserInfoSuccess({}));
              }}
              className="w-[130px] flex justify-center items-center text-[#2666D0] font-bold cursor-pointer"
            >
              Close
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        wrapClassName="register-donor-modal"
        style={{ padding: 0 }}
        width={800}
        footer={null}
        onCancel={() => {
          dispatch(setUpdatePasswordSuccess(false));
          setActiveKey(0);
          form.resetFields();
        }}
        open={isUpdatePasswordSuccess}
      >
        <div>
          <div className="pl-[40px] pr-[9px] ">
            <div className=" h-[208px] flex items-center justify-center">
              <div className="text-[24px] font-bold">
                Password change was completed.
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center space-x-[16px] h-[76px] bg-[#F3F3F3] rounded-b-[16px] px-[24px] py-[16px]">
            <div
              onClick={() => {
                setActiveKey(0);
                dispatch(setUpdatePasswordSuccess(false));
                form.resetFields();
              }}
              className="w-[130px] flex justify-center items-center text-[#2666D0] font-bold cursor-pointer"
            >
              Close
            </div>
          </div>
        </div>
      </Modal>
    </WithAuthLayoutUser>
  );
};
export default MyPage;
