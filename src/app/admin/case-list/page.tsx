"use client";
import WithAuthLayoutAdmin from "@/app/hoc/PrivateAdminRoute";
import Breadcrumb from "@/components/BreadCumb";
import Table from "@/components/Table";
import DownIcon from "@/components/icons/DownIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import SortIcon from "@/components/icons/SortIcon";
import {
  adminDeleteDonorRequest,
  adminGetDonorListRequest,
} from "@/redux/admin/case-list/actions";
import { setIsShowCreateDonorModal } from "@/redux/donor";
import { userGetDonorListRequest } from "@/redux/home/actions";
import { IDonor } from "@/redux/home/actions-types";
import { useAppSelector } from "@/redux/hooks";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const CaseList = () => {
  const { t } = useTranslation("");
  const dispatch = useDispatch();
  const [keywork, setKeyword] = useState("");
  const donorList = useAppSelector((state) => state.adminCaseListReducer.data);
  const total = useAppSelector((state) => state.adminCaseListReducer.total);
  const page = useAppSelector((state) => state.adminCaseListReducer.page);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [filter, setFilter] = useState<any>({});
  const [selectedRow, setSelectedRow] = useState<Key[]>([]);
  const [form] = Form.useForm();
  const onDeleteDonors = () => {
    console.log("selectedRow", selectedRow);

    dispatch(
      adminDeleteDonorRequest({
        donorIds: selectedRow as string[],
      })
    );
  };
  const onFinish = (values: any) => {
    console.log("values", values);

    const filter = {
      // timezone
      createdAtFrom: values.date
        ? dayjs(values.date[0]).utc().startOf("d").format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      createdAtTo: values.date
        ? dayjs(values.date[1]).utc().endOf("d").format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      // date: dayjs(values.date).format("YYYY-MM-DD"),
      donorCode: values.donorCode,
      organ: values.organ,
      status: values.status,
    };
    setFilter(filter);
    setCollapse(false);
  };
  useEffect(() => {
    dispatch(
      adminGetDonorListRequest({
        limit: 10,
        page: 1,
        keyword: keywork.length ? keywork : undefined,
        filter: JSON.stringify(filter),
      })
    );
  }, [keywork, filter]);

  const changeHandler = (event: any) => {
    setKeyword(event.target.value);
    dispatch(
      adminGetDonorListRequest({
        limit: 10,
        page: 1,
        keyword: event.target.value.length ? event.target.value : undefined,
        filter: JSON.stringify(filter),
      })
    );
  };
  const [isSelectMode, setIsSelectMode] = useState(false);
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  const router = useRouter();
  const breadCrubItems = useMemo(() => {
    return [
      { title: "Home", key: "/admin", href: "/admin" },
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
        return <div>{record.donorCode}</div>;
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
    {
      title: t("common.pathology"),
      ellipsis: true,
      render(value, record, index) {
        return <div>{record.isShared ? t("common.yes") : t("common.no")}</div>;
      },
      // sorter: (a, b) => dayjs(a.birthday).unix() - dayjs(b.birthday).unix(),
      // sortIcon: () => <SortIcon />,
    },
  ];
  const [collapse, setCollapse] = useState(false);
  return (
    <WithAuthLayoutAdmin>
      <div className="mt-[16px] text-[40px] rounded-[16px] px-[40px] py-[60px] bg-[#FFFFFF]">
        <div className="text-[24px] font-[700] text-center">
          {t("common.registered-donor")}
        </div>
        <div className="w-full mt-[40px] flex items-center justify-center">
          <div className="w-[600px]  mt-[8px] case-list-search">
            <Input
              className="!border-[2px] !border-[#E5E9F4] !rounded-[12px] !h-[56px] !border-solid"
              onChange={debouncedChangeHandler}
              prefix={<SearchIcon />}
              size="large"
            />
          </div>
        </div>
        <div className="mt-[40px] flex space-x-[16px] mb-[16px]">
          <Button
            onClick={() => {
              if (isSelectMode && selectedRow.length) {
                setOpenConfirmDeleteModal(true);
              }
              setIsSelectMode(true);
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
          {!isSelectMode && (
            <Button
              className="h-[36px]"
              onClick={() => {
                setCollapse(!collapse);
              }}
            >
              <div className="flex items-center space-x-[16px]">
                <div>{t("common.set-conditions")}</div>
                <DownIcon />
              </div>
            </Button>
          )}
        </div>
        {/* {collapse && (
          <Form layout="vertical" className="mb-[8px]">
            <Row gutter={16}>
              <Col span={5}>
                <Form.Item label={t("common.sex")}>
                  <Select ></Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label={t("common.location")}>
                  <Select ></Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label={t("common.donor-type")}>
                  <Select ></Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label={t("common.status")}>
                  <Select ></Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )} */}
        <Table
          rowKey={(record) => record.id}
          columns={collums}
          dataSource={donorList}
          {...(isSelectMode && {
            rowSelection: {
              onChange(selectedRowKeys, selectedRows, info) {
                setSelectedRow(selectedRowKeys);
              },
            },
          })}
          onChange={(_, filter, sorter) => {}}
          pagination={{
            total,
            current: page,
            pageSize: 10,
            onChange: (page) => {
              dispatch(
                adminGetDonorListRequest({
                  limit: 10,
                  page: page,
                  keyword: keywork.length ? keywork : undefined,
                  filter: JSON.stringify(filter),
                })
              );
            },
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                router.push(`/admin/case-list/detail?id=${record.id}`);
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
      <Modal
        onCancel={() => {
          setCollapse(false);
          setFilter({});
          form.resetFields();
        }}
        footer={null}
        open={collapse}
        width={800}
      >
        <div className="py-[40px]">
          <div className="flex w-full mb-[40px] justify-center font-[700] text-[24px]">
            Filter
          </div>
          <div className="flex w-full justify-center">
            <Form
              form={form}
              labelCol={{ span: 6 }}
              colon={false}
              onFinish={onFinish}
              className="w-[475px]"
              autoComplete="new-password"
            >
              <Form.Item label="Date" name="date">
                <DatePicker.RangePicker
                  size="large"
                  className="!h-[52px] w-full"
                />
              </Form.Item>
              <Form.Item label="Donor ID" name="donorCode">
                <Input size="large" className="!h-[52px] !bg-[#FFF]" />
              </Form.Item>
              <Form.Item label="Organ" name="organ">
                <Select size="large" className="!h-[52px]">
                  <Select.Option value="LIVER">Liver</Select.Option>
                  <Select.Option value="KIDNEY">Kidney</Select.Option>
                  <Select.Option value="OTHER">Other</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Pathology" name="status">
                <Select size="large" className="!h-[52px]">
                  <Select.Option value={true}>Yes</Select.Option>
                  <Select.Option value={false}>No</Select.Option>
                </Select>
              </Form.Item>
              <div className="flex justify-center">
                <Button
                  className="w-[130px] !h-[44px]"
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                  Search
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </WithAuthLayoutAdmin>
  );
};
export default CaseList;
