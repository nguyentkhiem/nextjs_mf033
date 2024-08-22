"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, use, useCallback, useEffect, useMemo, useState } from "react";
import Breadcrumb from "@/components/BreadCumb";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/es/table";
import { IDonor } from "@/redux/home/actions-types";
import dayjs from "dayjs";
import Table from "@/components/Table";
import {
  handleUserType,
  handleUserTypeBgColor,
  isValidName,
  isValidPassword,
  isValidPhoneNumber,
} from "@/utils/helpers";
import { User } from "@/types/common.types";
import { Button, Col, Form, Input, Modal, Radio, Row, Select } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import SwitchButton from "../components/SwitchButton";
// import { setDeleteUserSuccess } from "@/redux/group";
import WithAuthLayoutAdmin from "@/app/hoc/PrivateAdminRoute";
import {
  adminCreateUser,
  userGetGroupUserListRequest,
} from "@/redux/admin/group/actions";
import FormInput from "@/components/Input";
import { OPO_LIST } from "@/constants/common";
import {
  FilterUserType,
  OrganizationRole,
  UserRole,
} from "@/types/common.enum";
import { useForm } from "antd/es/form/Form";
import PlusIcon from "@/components/icons/PlusIcon";
import { ADMIN } from "@/types/saga.type";
import {
  setDeleteUserSuccess,
  setIsCreateUserSuccess,
} from "@/redux/admin/group";
import SortIcon from "@/components/icons/SortIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import { debounce } from "lodash";
const { Item } = Form;
const GroupPage = () => {
  const { t } = useTranslation("");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const router = useRouter();
  const organization = useAppSelector(
    (state) => state.adminGroup.detail.organization
  );
  const query = useSearchParams();
  const id = query.get("id");
  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/", href: "/admin" },
      { title: organization?.name, key: "/group" },
    ];
  }, [organization]);
  const [filer, setFilter] = useState<FilterUserType>(FilterUserType.ALL);
  const isDeleteUserSuccess = useAppSelector(
    (state) => state.adminGroup.detail.isDeleteUserSuccess
  );
  const [selectedRow, setSelectedRow] = useState<Key[]>([]);
  const [confirmDeleteMember, setConfirmDeleteMember] = useState(false);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const groupUserList = useAppSelector((state) => state.adminGroup.detail.data);

  const total = useAppSelector((state) => state.adminGroup.detail.total);
  const page = useAppSelector((state) => state.adminGroup.detail.page);
  const me = useAppSelector((state) => state.auth.user);
  const isCreateUserSuccess = useAppSelector(
    (state) => state.adminGroup.detail.isCreateUserSuccess
  );
  const [sort, setSort] = useState<{ by: string; direction: "DESC" | "ASC" }>({
    by: "lastName",
    direction: "ASC",
  });
  useEffect(() => {
    dispatch(
      userGetGroupUserListRequest({
        limit: 4,
        page: 1,
        keyword: keyword.length ? keyword : undefined,
        id: Number(id) || 0,
        filter: (filer !== "ALL" && JSON.stringify({ role: filer })) || "",
        sort: JSON.stringify(sort),
      })
    );
  }, [filer, sort]);

  const onFinish = (values: any) => {
    dispatch(
      adminCreateUser({
        ...values,
        organizationId: Number(id),
      })
    );
  };

  const [form] = useForm();
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.OPO);

  const collums: ColumnsType<User> = [
    {
      title: t("admin.last-name"),
      dataIndex: "lastName",
      sorter: true,
      sortIcon: () => (
        <div className="flex  items-center">
          <SortIcon />
        </div>
      ),
    },
    {
      title: t("admin.first-name"),
      dataIndex: "firstName",
      ellipsis: true,
    },
    {
      title: t("admin.organization"),
      render: (_, record) => (
        <div className="truncate">
          {record.organizationUser.organization.name}
        </div>
      ),
      ellipsis: true,
    },
    {
      title: t("admin.user-name-email"),
      dataIndex: "email",
      ellipsis: true,
    },
    {
      title: t("admin.user-type"),
      ellipsis: true,
      render: (_, record) => (
        <div
          className={`w-[112px] h-[29px] flex items-center justify-center text-[14px] font-[700] rounded-[4px] ${handleUserTypeBgColor(
            record.role
          )} text-white`}
        >
          {handleUserType(record.role)}
        </div>
      ),
    },
  ];

  const onDelete = () => {
    dispatch({
      type: ADMIN.DELETE_USERS,
      payload: {
        userIds: selectedRow.map((item) => Number(item.toString())),
        organizationId: Number(id),
      },
    });
  };

  useEffect(() => {
    return () => {
      dispatch(setDeleteUserSuccess(false));
    };
  }, []);
  const onSwitch = useCallback(
    (value: FilterUserType) => () => {
      setFilter(value);
    },
    []
  );

  const changeHandler = (event: any) => {
    setKeyword(event.target.value);
    dispatch(
      userGetGroupUserListRequest({
        limit: 4,
        page: 1,
        keyword: event.target.value.length ? event.target.value : undefined,
        id: Number(id) || 0,
        filter: (filer !== "ALL" && JSON.stringify({ role: filer })) || "",
        sort: JSON.stringify(sort),
      })
    );
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  return (
    <WithAuthLayoutAdmin>
      <Breadcrumb items={breadCrubItems} />
      <div className="mt-[40px] mb-[20px] w-[532px] input-search">
        <Input
          onChange={debouncedChangeHandler}
          prefix={<SearchIcon />}
          size="large"
        />
      </div>
      <div className="mt-[40px] rounded-[16px] px-[40px] py-[40px] bg-[#FFFFFF]">
        <div className="text-[24px] font-[700] text-center">
          {organization?.name}
        </div>
        <div className="flex space-x-[40px] items-center justify-between mb-[16px] mt-[54px]">
          <div className="flex space-x-3">
            <Button
              onClick={() => {
                if (!isSelectMode) {
                  setIsSelectMode(true);
                } else {
                  if (selectedRow.length) {
                    setConfirmDeleteMember(true);
                  }
                }
              }}
              className="h-[36px]"
            >
              {isSelectMode ? t("common.delete-all") : t("common.select")}
            </Button>
            {isSelectMode && (
              <Button
                onClick={() => {
                  setIsSelectMode(false);
                }}
                className="h-[36px]"
              >
                {t("common.cancel")}
              </Button>
            )}
            <div className="flex items-center space-x-[8px] bg-[#F3F3F3] p-[4px] rounded-[4px] h-[36px]">
              <SwitchButton
                isActive={filer === FilterUserType.ALL}
                title={t("admin.all")}
                onClick={onSwitch(FilterUserType.ALL)}
              ></SwitchButton>
              <SwitchButton
                isActive={filer === FilterUserType.OPO}
                title={t("admin.opo")}
                onClick={onSwitch(FilterUserType.OPO)}
              ></SwitchButton>
              <SwitchButton
                isActive={filer === FilterUserType.PATHOLOGIST}
                title={t("admin.pathologist")}
                onClick={onSwitch(FilterUserType.PATHOLOGIST)}
              ></SwitchButton>
              <SwitchButton
                isActive={filer === FilterUserType.TRANSPLANT}
                title={t("admin.transplant")}
                onClick={onSwitch(FilterUserType.TRANSPLANT)}
              ></SwitchButton>
              <SwitchButton
                isActive={filer === FilterUserType.OTHER}
                title={t("admin.other")}
                onClick={onSwitch(FilterUserType.OTHER)}
              ></SwitchButton>
            </div>
          </div>
          <Button
            onClick={() => {
              setShowCreateUser(true);
            }}
            size="large"
            // shape="round"
            className="!w-[181px]"
            type="primary"
          >
            <div className="flex items-center justify-center space-x-[10px]">
              <PlusIcon /> <div>Add Member</div>
            </div>
          </Button>
        </div>
        <Table
          rowKey={(record) => record.id}
          columns={collums}
          dataSource={groupUserList}
          onChange={(page, filter, sorter) => {
            console.log("sort", sorter);

            if ((sorter as any).field) {
              console.log("61234626");

              setSort({
                by: (sorter as any).field,
                direction: (sorter as any).order === "ascend" ? "ASC" : "DESC",
              });
            }
          }}
          pagination={{
            total: total,
            current: page,
            pageSize: 4,
            onChange: (page) => {
              dispatch(
                userGetGroupUserListRequest({
                  limit: 4,
                  page: page,
                  keyword: keyword.length ? keyword : undefined,
                  id: Number(id) || 0,
                  filter:
                    (filer !== "ALL" && JSON.stringify({ role: filer })) || "",
                  sort: JSON.stringify(sort),
                })
              );
            },
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                router.push(
                  `/admin/group-detail/member-detail/?userId=${record.id}`
                );
              },
            };
          }}
          {...(isSelectMode && {
            rowSelection: {
              onChange(selectedRowKeys, selectedRows, info) {
                setSelectedRow(selectedRowKeys);
              },
              getCheckboxProps: (record) => ({
                disabled: record?.id === me?.id, // Column configuration not to be checked
              }),
            },
          })}
        />
      </div>
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
                  : " Are you sure you want to delete this user?"}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center space-x-[16px] h-[76px] bg-[#F3F3F3] rounded-b-[16px] px-[24px] py-[16px]">
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
                  dispatch(
                    userGetGroupUserListRequest({
                      limit: 10,
                      page: 1,
                      id: Number(id) || 0,
                    })
                  );
                } else {
                  onDelete();
                }
              }}
              className="w-[130px]"
              type="primary"
              size="large"
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={showCreateUser}
        footer={null}
        width={800}
        onCancel={() => {
          setShowCreateUser(false);
          dispatch(setIsCreateUserSuccess(false));
          form.resetFields();
        }}
        closable={!isCreateUserSuccess}
        wrapClassName="modal-without-padding"
        style={{
          padding: 0,
        }}
        centered
        bodyStyle={{
          padding: "0px !important",
        }}
      >
        <Form
          form={form}
          autoComplete="new-password"
          initialValues={{
            role: UserRole.OPO,
            organizationRole: OrganizationRole.MEMBER,
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
          {isCreateUserSuccess ? (
            <div className="h-[200px] flex items-center justify-center">
              <div className="text-[24px] font-[700]">Member added</div>
            </div>
          ) : (
            <div className="register-container py-[80px] px-[40px]">
              <div className="text-[24px] pb-[19px] font-[700]">Add Member</div>
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

              <Row gutter={[20, 12]}>
                <Col span={8}>
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
                <Col span={8}>
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
              <Item name="organizationRole">
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
              </Item>
            </div>
          )}
          <div className="flex justify-end bg-[#F3F3F3] h-[76px] items-center px-[24px] rounded-b-[16px]">
            {isCreateUserSuccess ? (
              <Button
                // htmlType="submit"
                type="link"
                size="large"
                onClick={() => {
                  setShowCreateUser(false);
                  dispatch(setIsCreateUserSuccess(false));
                  form.resetFields();
                  dispatch(
                    userGetGroupUserListRequest({
                      limit: 10,
                      page: 1,
                      id: Number(id) || 0,
                    })
                  );
                }}
                className="w-[130px] "
              >
                {t("common.close")}
              </Button>
            ) : (
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className="w-[130px]  "
              >
                {t("common.add")}
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    </WithAuthLayoutAdmin>
  );
};
export default GroupPage;
