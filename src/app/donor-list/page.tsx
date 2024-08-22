"use client";
import Breadcrumb from "@/components/BreadCumb";
import RegisterDonorModal from "@/components/RegisterDonorModal";
import Table from "@/components/Table";
import DownIcon from "@/components/icons/DownIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import SortIcon from "@/components/icons/SortIcon";
import { setIsShowCreateDonorModal } from "@/redux/donor";
import { userDeleteDonorRequest } from "@/redux/donor/actions";
import { userGetDonorListRequest } from "@/redux/home/actions";
import { IDonor } from "@/redux/home/actions-types";
import { useAppSelector } from "@/redux/hooks";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import WithAuthLayoutUser from "../hoc/PrivateUserRoute";

const DonorListPage = () => {
  const { t } = useTranslation("");
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const donorList = useAppSelector((state) => state.homeReducer.data);
  const total = useAppSelector((state) => state.homeReducer.total);
  const page = useAppSelector((state) => state.homeReducer.page);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const isOpenRegisterDonorModal = useAppSelector(
    (state) => state.donorReducer.isShowCreateDonorModal
  );
  const [selectedRow, setSelectedRow] = useState<Key[]>([]);

  const onDeleteDonors = () => {
    dispatch(
      userDeleteDonorRequest({
        donorIds: selectedRow.map((item) => item.toString()),
      })
    );
  };
  const onCancel = useCallback(() => {
    dispatch(setIsShowCreateDonorModal(false));
  }, []);

  useEffect(() => {
    dispatch(
      userGetDonorListRequest({
        limit: 10,
        page: 1,
        keyword: keyword.length ? keyword : undefined,
      })
    );
  }, [keyword]);

  const changeHandler = (event: any) => {
    setKeyword(event.target.value);
    dispatch(
      userGetDonorListRequest({
        limit: 10,
        page: 1,
        keyword: event.target.value.length ? event.target.value : undefined,
      })
    );
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  const router = useRouter();
  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/", href: "/" },
      { title: "Case List", key: "/donor-list" },
    ];
  }, []);

  const collums: ColumnsType<IDonor> = [
    {
      title: t("common.date"),
      ellipsis: true,
      render(value, record, index) {
        return <div>{dayjs(record.createdAt).format("MMM.DD.YYYY")}</div>;
      },
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      sortIcon: () => <SortIcon />,
    },
    {
      title: t("common.donor-id"),
      ellipsis: true,
      render(value, record, index) {
        return <div>{record.id}</div>;
      },
    },
    {
      title: t("common.organ"),
      ellipsis: true,
      render(value, record, index) {
        return (
          <div>
            {record.organ === "LIVER"
              ? t("common.liver")
              : record.organ === "KIDNEY"
              ? t("common.kidney")
              : t("common.other")}
          </div>
        );
      },
      // sorter: (a, b) => dayjs(a.birthday).unix() - dayjs(b.birthday).unix(),
      // sortIcon: () => <SortIcon />,
    },
  ];
  const [collapse, setCollapse] = useState(false);
  return (
    <WithAuthLayoutUser>
      <Breadcrumb items={breadCrubItems} />
      <div className="text-[24px] font-[700] mt-[24px]">
        {t("common.case-list")}
      </div>
      <div className="flex items-center justify-between">
        <div className=" mb-[20px] w-[532px] input-search mt-[8px]">
          <Input
            onChange={debouncedChangeHandler}
            prefix={<SearchIcon />}
            size="large"
          />
        </div>
        {/* <Upload
          accept=".svs, .tif, .jpeg, .png"
          customRequest={onUploadDonorSlide}
          showUploadList={false}
        > */}
        <Button
          onClick={() => {
            router.push("/");
          }}
          className="w-[137px]"
          size="large"
          type="primary"
        >
          <div className="flex items-center justify-center space-x-[4px]">
            <PlusIcon />
            <div>Add</div>
          </div>
        </Button>
        {/* </Upload> */}
      </div>
      <div className="mt-[40px] text-[40px] rounded-[16px] px-[40px] py-[60px] bg-[#FFFFFF]">
        <div className="text-[24px] font-[700] text-center">
          {t("common.registered-donor")}
        </div>
        <div className="mt-[40px] flex space-x-[16px] mb-[16px]">
          <Button
            onClick={() => {
              if (selectedRow.length) {
                setOpenConfirmDeleteModal(true);
              }
            }}
          >
            {t("common.delete-all")}
          </Button>
          <Button
            onClick={() => {
              setCollapse(!collapse);
            }}
          >
            <div className="flex items-center space-x-[16px]">
              <div>{t("common.set-conditions")}</div>
              <DownIcon />
            </div>
          </Button>
        </div>
        {collapse && (
          <Form
            layout="vertical"
            className="mb-[8px]"
            autoComplete="new-password"
          >
            <Row gutter={16}>
              <Col span={5}>
                <Form.Item label={t("common.sex")}>
                  <Select></Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label={t("common.location")}>
                  <Select></Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label={t("common.donor-type")}>
                  <Select></Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label={t("common.status")}>
                  <Select></Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
        <Table
          rowKey={(record) => record.id}
          columns={collums}
          dataSource={donorList}
          rowSelection={{
            onChange(selectedRowKeys, selectedRows, info) {
              setSelectedRow(selectedRowKeys);
            },
          }}
          onChange={(_, filter, sorter) => {}}
          pagination={{
            total,
            current: page,
            pageSize: 10,
            onChange: (page) => {
              dispatch(
                userGetDonorListRequest({
                  limit: 10,
                  page: page,
                  keyword: keyword.length ? keyword : undefined,
                })
              );
            },
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                router.push(`/donor-list/detail?id=${record.id}`);
              },
            };
          }}
        />
      </div>
      <RegisterDonorModal
        open={isOpenRegisterDonorModal}
        onCancel={onCancel}
        footer={null}
      />
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
                onDeleteDonors();
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
    </WithAuthLayoutUser>
  );
};
export default DonorListPage;
