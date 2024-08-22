"use client";

import SearchIcon from "@/components/icons/SearchIcon";
import { Button, Input, Modal } from "antd";
import { Key, useCallback, useEffect, useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ColumnType, ColumnsType } from "antd/es/table";
import LeftIcon from "@/components/icons/LeftIcon";
import RightIcon from "@/components/icons/RightIcon";
import WithAuthLayoutAdmin from "@/app/hoc/PrivateAdminRoute";
import SwitchButton from "../components/SwitchButton";
import SeparatorIcon from "@/components/icons/SeparatorIcon";
import { useRouter } from "next/navigation";
import { FilterUserType } from "@/types/common.enum";
import Breadcrumb from "@/components/BreadCumb";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import Table from "@/components/Table";
import { useAppSelector } from "@/redux/hooks";
import { ADMIN } from "@/types/saga.type";
import { handleUserTypeBgColor, handleUserType } from "@/utils/helpers";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { User } from "@/types/common.types";
import SortIcon from "@/components/icons/SortIcon";

interface DataType {
  username: string;
  email: string;
  userType: number;
  id: string;
}

const fakeData = Array.from({ length: 57 }).map((item, index) => ({
  username: "texttexttexttexttexttexttexttexttexttexttexttext",
  email: "samplesample@mailadress.cocomcom",
  userType: Math.floor(Math.random() * 3) + 1,
  id: `${index}`,
}));

export default function Userslist() {
  const { t } = useTranslation("");
  const router = useRouter();
  const [keywork, setKeyword] = useState("");
  const [filer, setFilter] = useState<FilterUserType>(FilterUserType.ALL);
  const listUser = useAppSelector((state) => state.adminReducer.userList);
  const loading = useAppSelector((state) => state.adminReducer.loading);
  const total = useAppSelector((state) => state.adminReducer.total);
  const page = useAppSelector((state) => state.adminReducer.page);
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState<Key[]>([]);
  const [sort, setSort] = useState<{ by: string; direction: "DESC" | "ASC" }>({
    by: "id",
    direction: "DESC",
  });
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const onDeletedUsers = () => {
    dispatch({
      type: ADMIN.DELETE_USERS,
      payload: {
        userIds: selectedRow.map((item) => item.toString()),
      },
    });
  };
  const changeHandler = (event: any) => {
    setKeyword(event.target.value);
    dispatch({
      type: ADMIN.GET_USER_LIST,
      payload: {
        limit: 10,
        page: 1,
        keyword: event.target.value.length ? event.target.value : undefined,
        filter: filer !== "ALL" && JSON.stringify({ role: filer }),
        sort: JSON.stringify(sort),
      },
    });
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  useEffect(() => {
    dispatch({ type: ADMIN.GET_OVERVIEW });
  }, []);

  useEffect(() => {
    dispatch({
      type: ADMIN.GET_USER_LIST,
      payload: {
        limit: 10,
        page: page,
        keyword: keywork.length ? keywork : undefined,
        filter: filer !== "ALL" && JSON.stringify({ role: filer }),
        sort: JSON.stringify(sort),
      },
    });
  }, [filer, keywork, page]);

  const breadCrubItems: ItemType[] = useMemo(
    () => [
      {
        key: "/admin",
        href: "/admin",
        title: t("admin.home"),
      },
      {
        key: "/admin/users",
        // href: "/admin/users",
        title: t("admin.user-list"),
      },
    ],
    []
  );

  const onSwitch = useCallback(
    (value: FilterUserType) => () => {
      setFilter(value);
    },
    []
  );

  const collums: ColumnsType<User> = [
    {
      title: t("admin.first-name"),
      dataIndex: "firstName",
      ellipsis: true,
      sorter: true,
      sortIcon: () => <SortIcon />,
    },
    {
      title: t("admin.last-name"),
      dataIndex: "lastName",
      ellipsis: true,
    },
    {
      title: t("admin.organization"),
      dataIndex: "organization",
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

  return (
    <WithAuthLayoutAdmin>
      <Breadcrumb items={breadCrubItems} />
      <div className="mt-[24px] mb-[20px] w-[532px] input-search">
        <div className="font-[700] text-[24px] text-[#333333] mb-[8px]">
          {t("admin.user-list")}
        </div>
        <Input
          onChange={debouncedChangeHandler}
          prefix={<SearchIcon />}
          size="large"
        />
      </div>
      <div className="bg-white px-[40px] py-[60px] rounded-[16px]">
        <div className="flex space-x-[40px] mb-[16px]">
          <Button
            onClick={() => {
              if (selectedRow.length) {
                setOpenConfirmDeleteModal(true);
              }
            }}
            className="h-[36px]"
          >
            {t("common.delete-all")}
          </Button>
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
        <Table
          rowKey={(record) => record.id}
          columns={collums}
          dataSource={listUser}
          rowSelection={{
            onChange(selectedRowKeys, selectedRows, info) {
              setSelectedRow(selectedRowKeys);
            },
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                router.push(`/admin/users/detail?id=${record.id}`);
              },
            };
          }}
          pagination={{
            total: total,
            pageSize: 20,
            current: page,
            onChange: (page) => {
              dispatch({
                type: ADMIN.GET_USER_LIST,
                payload: {
                  limit: 20,
                  page: page,
                  keyword: keywork.length ? keywork : undefined,
                  filter: filer !== "ALL" && JSON.stringify({ role: filer }),
                  sort: JSON.stringify(sort),
                },
              });
            },
          }}
          onChange={(page, filter, sorter) => {
            setSort({
              by: (sorter as any).field,
              direction: (sorter as any).order === "ascend" ? "ASC" : "DESC",
            });
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
                onDeletedUsers();
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
    </WithAuthLayoutAdmin>
  );
}
