"use client";
import { useRouter } from "next/navigation";
import WithAuthLayoutUser from "../hoc/PrivateUserRoute";
import { Key, use, useEffect, useMemo, useState } from "react";
import Breadcrumb from "@/components/BreadCumb";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/es/table";
import { IDonor } from "@/redux/home/actions-types";
import dayjs from "dayjs";
import Table from "@/components/Table";
import { handleUserType, handleUserTypeBgColor } from "@/utils/helpers";
import { User } from "@/types/common.types";
import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import {
  userDeleteUserRequest,
  userGetGroupUserListRequest,
} from "@/redux/group/actions";
import { setDeleteUserSuccess } from "@/redux/group";
import PlusIcon from "@/components/icons/PlusIcon";

const GroupPage = () => {
  const { t } = useTranslation("");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const router = useRouter();
  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/", href: "/" },
      { title: "Group", key: "/group" },
    ];
  }, []);
  const isDeleteUserSuccess = useAppSelector(
    (state) => state.groupReducer.isDeleteUserSuccess
  );
  const [selectedRow, setSelectedRow] = useState<Key[]>([]);
  const [confirmDeleteMember, setConfirmDeleteMember] = useState(false);
  const dispatch = useDispatch();
  const [keywork, setKeyword] = useState("");
  const groupUserList = useAppSelector((state) => state.groupReducer.data);
  const total = useAppSelector((state) => state.groupReducer.total);
  const page = useAppSelector((state) => state.groupReducer.page);
  const me = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(
      userGetGroupUserListRequest({
        limit: 6,
        page: 1,
        keyword: keywork.length ? keywork : undefined,
      })
    );
  }, [keywork]);

  const collums: ColumnsType<User> = [
    {
      title: t("admin.first-name"),
      dataIndex: "firstName",
      ellipsis: true,
    },
    {
      title: t("admin.last-name"),
      dataIndex: "lastName",
      ellipsis: true,
    },
    {
      title: t("admin.user-name-email"),
      dataIndex: "email",
      ellipsis: true,
    },
    {
      title: t("admin.organization"),
      render: (_, record) => (
        <span>{record.organizationUser.organization.name}</span>
      ),
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
    dispatch(
      userDeleteUserRequest({
        userIds: selectedRow.map((item) => Number(item.toString())),
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(setDeleteUserSuccess(false));
    };
  }, []);

  return (
    <WithAuthLayoutUser>
      <Breadcrumb items={breadCrubItems} />
      <div className="mt-[40px] text-[40px] rounded-[16px] px-[40px] py-[40px] bg-[#FFFFFF]">
        <div className="text-[24px] font-[700] text-center">
          {t("common.group-members")}
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
              {isSelectMode
                ? selectedRow.length
                  ? "Delete All"
                  : t("common.delete-all")
                : t("common.select")}
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
          </div>
          <Button
            onClick={() => {
              router.push("/group/add-member");
            }}
            size="large"
            className="!w-[181px]"
            type="primary"
          >
            <div className="flex items-center justify-center space-x-[12px]">
              <PlusIcon /> <span>Add Member</span>
            </div>
          </Button>
        </div>
        <Table
          rowKey={(record) => record.id}
          columns={collums}
          dataSource={groupUserList}
          onChange={(_, filter, sorter) => {}}
          pagination={{
            total: total,
            current: page,
            pageSize: 6,
            onChange: (page) => {
              dispatch(
                userGetGroupUserListRequest({
                  limit: 6,
                  page: page,
                  keyword: keywork.length ? keywork : undefined,
                })
              );
            },
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                router.push(`/group/member-detail/?id=${record.id}`);
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
            {isDeleteUserSuccess ? (
              <>
                <div
                  onClick={() => {
                    setConfirmDeleteMember(false);
                    dispatch(setDeleteUserSuccess(false));
                    dispatch(
                      userGetGroupUserListRequest({
                        limit: 10,
                        page: 1,
                      })
                    );
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
                      dispatch(
                        userGetGroupUserListRequest({
                          limit: 10,
                          page: 1,
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
export default GroupPage;
