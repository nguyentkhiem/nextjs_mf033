"use client";
import Description from "@/app/admin/components/Description";
import Title from "@/app/components/Title";
import WithAuthLayoutUser from "@/app/hoc/PrivateUserRoute";
import Breadcrumb from "@/components/BreadCumb";
import FormInput from "@/components/Input";
import EditIcon from "@/components/icons/EditIcon";
import {
  setDelegateAdminSuccess,
  setDeleteUserSuccess,
  setIsEditingMember,
} from "@/redux/group";
import {
  userDelegateAdminRequest,
  userDeleteUserRequest,
  userGetGroupUserDetailRequest,
  userUpdateOrganizationUserRequest,
} from "@/redux/group/actions";
import { useAppSelector } from "@/redux/hooks";
import { UserRole } from "@/types/common.enum";
import {
  handleUserType,
  isValidName,
  isValidPassword,
  isValidPhoneNumber,
} from "@/utils/helpers";
import { Button, Col, Form, Modal, Radio, Row } from "antd";
import { useForm } from "antd/es/form/Form";
// import Item from "antd/es/descriptions/Item";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const { Item } = Form;

const MemberDetail = () => {
  const { t } = useTranslation("");
  const [confirmDelegateAdminPermission, setConfirmDelegateAdminPermission] =
    useState(false);
  const [confirmDeleteMember, setConfirmDeleteMember] = useState(false);
  const router = useRouter();
  const { get } = useSearchParams();
  const id = get("id");
  const userDetail = useAppSelector((state) => state.groupReducer.detail);
  const isEditingMember = useAppSelector(
    (state) => state.groupReducer.isEditingMember
  );
  const isDelegateAdminSuccess = useAppSelector(
    (state) => state.groupReducer.isDelegateAdminSuccess
  );
  const isDeleteUserSuccess = useAppSelector(
    (state) => state.groupReducer.isDeleteUserSuccess
  );

  const me = useAppSelector((state) => state.auth.user);

  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/", href: "/" },
      { title: "Group", key: "/group", href: "/group" },
      { title: "Member Detail", key: "/member-detail" },
    ];
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(
        userGetGroupUserDetailRequest({
          id: Number(id),
        })
      );
    }
  }, [id]);

  const onDelegateAdmin = () => {
    dispatch(
      userDelegateAdminRequest({
        userId: Number(id),
      })
    );
  };

  const onDeleteUser = () => {
    dispatch(
      userDeleteUserRequest({
        userIds: [Number(id)],
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(setDelegateAdminSuccess(false));
      dispatch(setDeleteUserSuccess(false));
    };
  }, []);

  const [form] = useForm();

  useEffect(() => {
    if (isEditingMember && userDetail) {
      form.setFieldsValue({
        role: userDetail?.role,
        firstName: userDetail?.firstName,
        lastName: userDetail?.lastName,
        phoneNumber: userDetail?.phoneNumber,
        email: userDetail?.email,
        password: undefined,
      });
    }
  }, [userDetail, isEditingMember]);

  const onFinish = (values: any) => {
    dispatch(
      userUpdateOrganizationUserRequest({
        id: Number(id),
        ...values,
      })
    );
  };

  return (
    <WithAuthLayoutUser>
      <Breadcrumb items={breadCrubItems} />
      {isEditingMember ? (
        <div className="bg-[#FFF] rounded-[16px] px-[32px] py-[60px] mt-[24px] flex flex-col items-center">
          <div className="text-[24px] font-[700] register-container ">
            <div className="text-center mb-[37px]">
              Edit - {userDetail?.firstName + "" + (userDetail?.lastName + "")}
            </div>
            <Form
              form={form}
              autoComplete="new-password"
              initialValues={{
                role: UserRole.OPO,
                users: [{}],
              }}
              onFinish={onFinish}
              className="w-[460px]"
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
                <Radio.Group onChange={(e) => {}} defaultValue={UserRole.OPO}>
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

              <Row gutter={[20, 12]}>
                <Col span={12}>
                  <Item
                    rules={[
                      {
                        required: true,
                        message: "First name is required",
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
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (value && !isValidName(value)) {
                            return Promise.reject(
                              new Error(
                                "Given last name is only include letters, numbers, space, and maximum 255 characters."
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
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
                <FormInput
                  className="w-full"
                  size="large"
                  autoComplete="new-password"
                  // prefix={<LockIcon />}
                  type="password"
                  readOnly
                />
              </Item>
              {/* <Item name="organizationRole">
                <Select
                  className="!h-[52px] !rounded-[8px] !w-[200px]"
                  size="large"
                  defaultValue={OrganizationRole.MEMBER}
                >
                  <Select.Option value={OrganizationRole.LEADER}>
                    {t("admin.leader")}
                  </Select.Option>
                  <Select.Option value={OrganizationRole.MEMBER}>
                    {t("admin.user")}
                  </Select.Option>
                </Select>
              </Item> */}
              <div className="flex justify-center">
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  className="w-[138px]  mt-[40px]"
                >
                  {t("common.save")}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="bg-[#FFF] rounded-[16px] px-[32px] py-[60px] mt-[24px]">
          <div className="flex justify-end space-x-[16px]">
            {userDetail?.organizationUser?.role === "LEADER" ? (
              <div className="text-[#2666D0] h-[40px] flex items-center font-[700] px-[16px]">
                Member granted permissions
              </div>
            ) : (
              <Button
                onClick={() => setConfirmDelegateAdminPermission(true)}
                size="large"
                type="primary"
              >
                {t("common.delegate-admin")}
              </Button>
            )}

            {userDetail?.id !== me?.id && (
              <Button onClick={() => setConfirmDeleteMember(true)} size="large">
                {t("common.delete-member")}
              </Button>
            )}
          </div>
          <div className="px-[88px]">
            {userDetail?.organizationUser.role === "LEADER" && (
              <div className="bg-[#C94747] mb-[38px] text-[#FFFFFF] h-[29px] rounded-[4px] px-[8px] py-[4px] w-[129px] flex items-center justify-center">
                Admin
              </div>
            )}
            <div className="my-[32px] text-[24px] font-[700]">
              <Title
                title={t("common.member-detail")}
                hasRightIcon={false}
                rightButtonText={t("common.edit")}
              />
            </div>
            <div className="space-y-[24px]">
              <Row gutter={50}>
                <Col span={7}>
                  <Description
                    title={t("common.first-name")}
                    content={userDetail?.firstName}
                  ></Description>
                </Col>
                <Col span={7}>
                  <Description
                    title={t("common.last-name")}
                    content={userDetail?.lastName}
                  ></Description>
                </Col>
                <Col span={7}>
                  <Description
                    title={t("common.role")}
                    content={handleUserType(userDetail?.role || UserRole.OPO)}
                  ></Description>
                </Col>
              </Row>
              <Row gutter={50}>
                <Col span={7}>
                  <Description
                    title={t("common.organization")}
                    content={userDetail?.organizationUser?.organization?.name}
                  ></Description>
                </Col>
                <Col span={7}>
                  <Description
                    title={t("common.phone")}
                    content={userDetail?.phoneNumber}
                  ></Description>
                </Col>
                <Col span={7}>
                  <Description
                    title={t("common.e-mail")}
                    content={userDetail?.email}
                  ></Description>
                </Col>
              </Row>
              <Row gutter={50}>
                <Col span={7}>
                  <Description
                    title={t("common.password")}
                    content={"*********"}
                  ></Description>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}
      <Modal
        wrapClassName="register-donor-modal"
        style={{ padding: 0 }}
        width={800}
        open={confirmDelegateAdminPermission}
        footer={null}
        closeIcon={null}
        onCancel={() => {
          setConfirmDelegateAdminPermission(false);
        }}
      >
        <div>
          <div className="pl-[40px] pr-[9px] ">
            <div className=" h-[208px] flex items-center justify-center">
              <div className="text-[24px] font-bold">
                {isDelegateAdminSuccess
                  ? "Permissions have been granted."
                  : " Is it okay to delegate admin permissions to the member?"}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center space-x-[16px] h-[76px] bg-[#F3F3F3] rounded-b-[16px] px-[24px] py-[16px]">
            {isDelegateAdminSuccess ? (
              <div
                onClick={() => setConfirmDelegateAdminPermission(false)}
                className="w-[130px] flex justify-center items-center text-[#2666D0] font-bold cursor-pointer"
              >
                Close
              </div>
            ) : (
              <>
                <div
                  onClick={() => {
                    dispatch(setDelegateAdminSuccess(false));
                    dispatch(
                      userGetGroupUserDetailRequest({
                        id: Number(id),
                      })
                    );
                    setConfirmDelegateAdminPermission(false);
                  }}
                  className="w-[130px] flex justify-center items-center text-[#2666D0] font-bold cursor-pointer"
                >
                  Cancel
                </div>
                <Button
                  onClick={() => {
                    if (isDelegateAdminSuccess) {
                      dispatch(setDelegateAdminSuccess(false));
                      dispatch(
                        userGetGroupUserDetailRequest({
                          id: Number(id),
                        })
                      );
                      setConfirmDelegateAdminPermission(false);
                    } else {
                      onDelegateAdmin();
                    }
                  }}
                  className="w-[130px]"
                  type="primary"
                  size="large"
                >
                  OK
                </Button>
              </>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        wrapClassName="register-donor-modal"
        style={{ padding: 0 }}
        width={800}
        open={confirmDeleteMember}
        closeIcon={null}
        footer={null}
        onCancel={() => {
          setConfirmDeleteMember(false);
        }}
      >
        <div>
          <div className="pl-[40px] pr-[9px] ">
            <div className=" h-[208px] flex items-center justify-center">
              <div className="text-[24px] font-bold">
                {isDeleteUserSuccess
                  ? "Removed the member"
                  : "Is it okay to delete the member?"}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center space-x-[16px] h-[76px] bg-[#F3F3F3] rounded-b-[16px] px-[24px] py-[16px]">
            {isDeleteUserSuccess ? (
              <>
                <div
                  onClick={() => {
                    setConfirmDeleteMember(false);
                    dispatch(setDeleteUserSuccess(false));
                    router.push("/group");
                  }}
                  className="w-[130px] flex justify-center items-center text-[#2666D0] font-bold cursor-pointer"
                >
                  Close
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => setConfirmDeleteMember(false)}
                  className="w-[130px] flex justify-center items-center text-[#2666D0] font-bold cursor-pointer"
                >
                  Cancel
                </div>
                <Button
                  onClick={() => {
                    if (isDeleteUserSuccess) {
                      setConfirmDeleteMember(false);
                      dispatch(setDeleteUserSuccess(false));
                      router.push("/group");
                    } else {
                      onDeleteUser();
                    }
                  }}
                  className="w-[130px]"
                  type="primary"
                  size="large"
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </WithAuthLayoutUser>
  );
};

export default MemberDetail;
