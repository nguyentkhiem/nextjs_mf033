"use client";

import Table from "@/components/Table";
import SearchIcon from "@/components/icons/SearchIcon";
import SortIcon from "@/components/icons/SortIcon";
import { useAppSelector } from "@/redux/hooks";
import { FilterUserType } from "@/types/common.enum";
import { User } from "@/types/common.types";
import { ADMIN } from "@/types/saga.type";
import {
  handleUserType,
  handleUserTypeBgColor,
  isValidPassword,
  isValidPhoneNumber,
} from "@/utils/helpers";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { ColumnsType } from "antd/es/table";
import { debounce, set } from "lodash";
import { useRouter } from "next/navigation";
import { Key, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import WithAuthLayoutAdmin from "../hoc/PrivateAdminRoute";
import Overview from "./components/Overview";
import SwitchButton from "./components/SwitchButton";
import {
  adminCreateOrganization,
  adminDeleteOrganization,
  userGetGroupList,
} from "@/redux/admin/group/actions";
import PlusIcon from "@/components/icons/PlusIcon";
import { useForm } from "antd/es/form/Form";
import FormInput from "@/components/Input";
import {
  setDeleteUserSuccess,
  setIsCreateOrganizationSuccess,
  setIsDeleteOrganizationSuccess,
} from "@/redux/admin/group";
import PenIcon from "@/components/icons/PenIcon";
import TrashBinIcon from "@/components/icons/TrashBinIcon";
const { Item } = Form;

export default function AdminPage() {
  const { t } = useTranslation("");
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [filer, setFilter] = useState<FilterUserType>(FilterUserType.ALL);
  const [sort, setSort] = useState<{ by: string; direction: "DESC" | "ASC" }>({
    by: "id",
    direction: "ASC",
  });
  const [form] = useForm();
  const [confirmDeleteOrganization, setConfirmDeleteOrganization] =
    useState(false);
  const [showCreateOrganization, setShowCreateOrganization] = useState(false);
  const listUser = useAppSelector((state) => state.adminGroup.data);
  const loading = useAppSelector((state) => state.adminGroup.loading);
  const total = useAppSelector((state) => state.adminGroup.total);
  const page = useAppSelector((state) => state.adminGroup.page);
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState<Key[]>([]);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const isCreateOrganizationSuccess = useAppSelector(
    (state) => state.adminGroup.isCreateOrganizationSuccess
  );
  const isDeleteOrganizationSuccess = useAppSelector(
    (state) => state.adminGroup.isDeleteOrganizationSuccess
  );
  const onDeleteUsers = () => {
    dispatch({
      type: ADMIN.DELETE_USERS,
      payload: {
        userIds: selectedRow.map((item) => item.toString()),
      },
    });
  };
  const changeHandler = (event: any) => {
    setKeyword(event.target.value);
    dispatch(
      userGetGroupList({
        limit: 10,
        page: 1,
        filter: filer,
        keyword: event.target.value.length ? event.target.value : undefined,
        sort: JSON.stringify(sort),
      })
    );
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  useEffect(() => {
    dispatch({ type: ADMIN.GET_OVERVIEW });
  }, []);

  useEffect(() => {
    dispatch(
      userGetGroupList({
        limit: 10,
        page: page,
        filter: filer,
        keyword: keyword.length ? keyword : undefined,
        sort: JSON.stringify(sort),
      })
    );
  }, [filer, sort, page]);

  const onSwitch = useCallback(
    (value: FilterUserType) => () => {
      setFilter(value);
    },
    []
  );

  const columns: ColumnsType<User> = [
    {
      title: t("admin.name"),
      dataIndex: "name",
      ellipsis: true,
      sorter: true,
      sortIcon: () => <SortIcon />,
    },
    {
      title: t("admin.location"),
      dataIndex: "location",
      ellipsis: true,
      // sorter: true,
      // sortIcon: () => <SortIcon />,
    },
    {
      title: t("admin.key-personnel"),
      // dataIndex: "keyPersonnel",
      render: (record) => (
        <div
          style={{
            whiteSpace: "pre-line",
          }}
        >
          {record.keyPersonnel}
        </div>
      ),
      // ellipsis: true,
    },
    {
      title: t("admin.center-phone"),
      dataIndex: "phoneNumber",
      ellipsis: true,
      // sorter: true,
      // sortIcon: () => <SortIcon />,
    },
    {
      width: 150,
      render: (record) => (
        <div className="flex space-x-4">
          <div
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/edit-organization?id=${record?.id}`);
            }}
          >
            <PenIcon />
          </div>
          <div
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setConfirmDeleteOrganization(true);
              setSelectedOrganizationId(record.id);
            }}
          >
            <TrashBinIcon />
          </div>
        </div>
      ),
    },
  ];
  const overview = useAppSelector((state) => state.adminReducer);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedOrganizationId, setSelectedOrganizationId] =
    useState<number>();
  const onFinish = (values: any) => {
    dispatch(adminCreateOrganization(values));
  };
  const onDelete = () => {
    dispatch(adminDeleteOrganization({ id: Number(selectedOrganizationId) }));
  };
  return (
    <WithAuthLayoutAdmin>
      <div className="text-[24px] font-[700] mb-[8px] mt-[20px]">
        {t("admin.overview")}
      </div>
      <Overview />
      <div className="mt-[40px] mb-[20px] w-[532px] input-search">
        <Input
          onChange={debouncedChangeHandler}
          prefix={<SearchIcon />}
          size="large"
        />
      </div>
      <div className="bg-white px-[40px] py-[60px] rounded-[16px]">
        <div className="text-center font-[700] text-[24px] text-[#333333] mb-[40px]">
          {t("admin.organization-list")}
        </div>
        <div className="flex space-x-[15px] mb-[16px] justify-end">
          <Button
            onClick={() => {
              setShowCreateOrganization(true);
            }}
            size="large"
            // shape="round"
            className="!w-[208px]"
            type="primary"
          >
            <div className="flex items-center justify-center space-x-[10px]">
              <PlusIcon /> <div>Add Organization</div>
            </div>
          </Button>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={listUser}
          pagination={{
            total: total,
            pageSize: 10,
            current: page,
            onChange: (page) => {
              dispatch(
                userGetGroupList({
                  limit: 10,
                  page: page,
                  keyword: keyword.length ? keyword : undefined,
                  sort: JSON.stringify(sort),
                })
              );
            },
          }}
          onChange={(page, filter, sorter) => {
            setSort({
              by: (sorter as any).field,
              direction: (sorter as any).order === "ascend" ? "ASC" : "DESC",
            });
          }}
          {...(isSelectMode && {
            rowSelection: {
              onChange(selectedRowKeys, selectedRows, info) {
                setSelectedRow(selectedRowKeys);
              },
            },
          })}
          onRow={(record) => {
            return {
              onClick: () => {
                router.push(`/admin/group-detail/?id=${record.id}`);
              },
            };
          }}
        />
      </div>
      <Modal
        wrapClassName="register-donor-modal"
        style={{ padding: 0 }}
        width={800}
        open={openConfirmDeleteModal}
        footer={null}
        onCancel={() => {
          setOpenConfirmDeleteModal(false);
        }}
      >
        <div>
          <div className="pl-[40px] pr-[9px] ">
            <div className=" h-[208px] flex items-center justify-center">
              <div className="text-[24px] font-bold">
                Are you sure you want to delete ?
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center space-x-[16px] h-[76px] bg-[#F3F3F3] rounded-b-[16px] px-[24px] py-[16px]">
            <div
              onClick={() => setOpenConfirmDeleteModal(false)}
              className="w-[130px] flex justify-center items-center text-[#2666D0] font-bold cursor-pointer"
            >
              Back
            </div>
            <Button
              onClick={() => {
                onDeleteUsers();
                setOpenConfirmDeleteModal(false);
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
        open={showCreateOrganization}
        footer={null}
        width={800}
        onCancel={() => {
          setShowCreateOrganization(false);
          dispatch(setIsCreateOrganizationSuccess(false));
          form.resetFields();
        }}
        closable={false}
        wrapClassName="modal-without-padding"
        style={{
          padding: 0,
        }}
        bodyStyle={{
          padding: "0px !important",
        }}
      >
        <Form
          form={form}
          autoComplete="new-password"
          onFinish={onFinish}
          className="w-full"
          layout="vertical"
        >
          {isCreateOrganizationSuccess ? (
            <div className="h-[200px] flex items-center justify-center">
              <div className="text-[24px] font-[700]">
                New Organization added
              </div>
            </div>
          ) : (
            <div className="register-container py-[80px] px-[40px]">
              <div className="text-[24px] pb-[19px] font-[700]">
                Add Organization
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
                rules={[
                  { required: true, message: "Key personnel is required" },
                ]}
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
                label={t("admin.center-phone")}
                name="phoneNumber"
              >
                <FormInput
                // prefix={<LockIcon />}
                />
              </Item>
            </div>
          )}
          <div className="flex justify-end bg-[#F3F3F3] h-[76px] items-center px-[24px] rounded-b-[16px]">
            {isCreateOrganizationSuccess ? (
              <Button
                // htmlType="submit"
                type="link"
                size="large"
                onClick={() => {
                  setShowCreateOrganization(false);
                  dispatch(setIsCreateOrganizationSuccess(false));
                  form.resetFields();
                  dispatch(
                    userGetGroupList({
                      limit: 20,
                      page: 1,
                    })
                  );
                }}
                className="w-[138px] "
              >
                {t("common.close")}
              </Button>
            ) : (
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className="w-[138px] "
              >
                {t("common.add")}
              </Button>
            )}
          </div>
        </Form>
      </Modal>
      <Modal
        wrapClassName="register-donor-modal"
        style={{ padding: 0 }}
        width={800}
        open={confirmDeleteOrganization}
        closeIcon={null}
        footer={null}
        onCancel={() => {
          setConfirmDeleteOrganization(false);
        }}
      >
        <div>
          <div className="pl-[40px] pr-[9px] ">
            <div className=" h-[208px] flex items-center justify-center px-[97px]">
              <div className="text-[24px] font-bold">
                {
                  " Deleting the organization will also remove all its members. \n\n Are you sure you want to proceed with the deletion?"
                }
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center space-x-[16px] h-[76px] bg-[#F3F3F3] rounded-b-[16px] px-[24px] py-[16px]">
            <div
              onClick={() => setConfirmDeleteOrganization(false)}
              className="w-[130px] flex justify-center items-center text-[#2666D0] font-bold cursor-pointer"
            >
              Cancel
            </div>
            <Button
              onClick={() => {
                onDelete();
                setConfirmDeleteOrganization(false);
              }}
              className="w-[130px]"
              type="primary"
              size="large"
            >
              OK
            </Button>
          </div>
        </div>
      </Modal>
    </WithAuthLayoutAdmin>
  );
}
