import CloseIcon from "@/components/icons/CloseIcon";
import DocFileIcon from "@/components/icons/DocFileIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import PDFFileIcon from "@/components/icons/PDFFileIcon";
import UploadIcon from "@/components/icons/UploadIcon";
import XLSFileIcon from "@/components/icons/XLSFileIcon";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import {
  userGetReportLinkRequest,
  userUploadReportRequest,
} from "@/redux/donor/actions";
import { IReport } from "@/redux/home/actions-types";
import { Button, Dropdown, MenuProps, Space, Upload, message } from "antd";
import React from "react";
import FileIcon from "@/components/icons/FileIcon";

import { useDispatch } from "react-redux";

interface IProps {
  reports: Array<IReport>;
  id: string;
  isEdit: boolean;
  onDelete: (id: string) => void;
  isAdminPage: boolean;
}

const DonorReport: React.FC<IProps> = ({
  reports,
  id,
  isEdit,
  onDelete,
  isAdminPage,
}) => {
  const dispatch = useDispatch();
  const dummyRequest = async ({ file, onSuccess }: any) => {
    dispatch(userUploadReportRequest({ file: file, id: Number(id) }));
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onDownload = (id: string, fileName: string) => {
    dispatch(userGetReportLinkRequest({ id, fileName }));
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <a href="/Kidney (word).docx" download>
          <div className="flex w-full justify-between">
            <div>Kidney (word)</div>
            <DownloadIcon fill={"#333333"} />
          </div>
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a href="/Kidney (pdf).pdf" download>
          <div className="flex w-full justify-between">
            <div>Kidney (pdf)</div>
            <DownloadIcon fill={"#333333"} />
          </div>
        </a>
      ),
      key: "2",
    },
    {
      label: (
        <a href="/Liver (word).docx" download>
          <div className="flex w-full justify-between">
            <div>Liver (word)</div>
            <DownloadIcon fill={"#333333"} />
          </div>
        </a>
      ),
      key: "3",
    },
    {
      label: (
        <a href="/Liver (pdf).pdf" download>
          <div className="flex w-full justify-between">
            <div>Liver (pdf)</div>
            <DownloadIcon fill={"#333333"} />
          </div>
        </a>
      ),
      key: "4",
    },
  ];
  const menuProps = {
    items,
    onClick: () => {},
  };

  return (
    <div className="flex flex-col ">
      {reports.length > 0 && <div className="mb-[4px]">Uploaded file</div>}
      {reports.length > 0 && (
        <div className="mb-[40px] space-y-[16px] ">
          {reports.map((item) => (
            <>
              <div className="flex space-x-[8px] items-center">
                <div className="flex min-w-[224px] items-center space-x-[8px]">
                  <div>
                    <FileIcon />
                  </div>
                  <div>{item.originalFilename}</div>
                </div>
                {isEdit ? (
                  <div
                    onClick={() => {
                      onDelete(item.id.toString());
                    }}
                    className="bg-[#333333] cursor-pointer rounded-full w-[24px] h-[24px] flex items-center justify-center"
                  >
                    <CloseIcon></CloseIcon>
                  </div>
                ) : (
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={() =>
                      onDownload(`${item.id}`, item.originalFilename)
                    }
                  >
                    <div className="flex items-center space-x-[10px]">
                      <DownloadIcon />
                      <div className="font-[700] flex items-center">
                        DownLoad
                      </div>
                    </div>
                  </Button>
                )}
              </div>
            </>
          ))}
        </div>
      )}
      {/* {isEdit && ( */}
      {isAdminPage ? (
        <></>
      ) : (
        <>
          <div className="mb-[4px]">Please select a template</div>
          <div className="flex space-x-[16px]">
            <Dropdown trigger={["click"]} menu={menuProps}>
              <Button size="large" className="w-[240px]">
                <div className="w-full flex justify-between">
                  <div>Download Template</div>
                  <DownOutlined />
                </div>
              </Button>
            </Dropdown>
            <Upload
              accept=".doc, application/pdf, .pdf, .xlsx, .xls, .docx"
              action=""
              customRequest={dummyRequest}
              showUploadList={false}
              beforeUpload={(file) => {
                const isPNG =
                  file.type === "application/pdf" ||
                  file.type ===
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                  file.type === "application/vnd.ms-excel" ||
                  file.type ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                if (!isPNG) {
                  message.error(`${file.name} is not a valid file`);
                }
                return isPNG || Upload.LIST_IGNORE;
              }}
            >
              <Button size="large" className="h-[40px]">
                <Space>
                  <div className="flex items-center space-x-[10px]">
                    <UploadIcon />
                    <div className="font-[700]">Upload Report</div>
                  </div>
                </Space>
              </Button>
            </Upload>
          </div>
        </>
      )}
      {/* )} */}
      {/* <Modal width={800} open={false} onCancel={() => {}} footer={null}>
        <CreateReportForm />
      </Modal> */}
    </div>
  );
};
export default React.memo(DonorReport);
