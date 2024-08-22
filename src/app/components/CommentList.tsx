import DocFileIcon from "@/components/icons/DocFileIcon";
import PDFFileIcon from "@/components/icons/PDFFileIcon";
import PaperClipIcon from "@/components/icons/PaperClipIcon";
import XLSFileIcon from "@/components/icons/XLSFileIcon";
import {
  userCreateDonorCommentRequest,
  userDeleteDonorCommentsRequest,
} from "@/redux/donor/actions";
import { IComment } from "@/redux/home/actions-types";
import { Button, Form, Input, Modal, Upload } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import dayjs from "dayjs";
import Image from "next/image";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/redux/hooks";
interface IProps {
  comments: Array<IComment>;
  id: string;
  isAdminPage: boolean;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const CommentList: React.FC<IProps> = ({ comments, id, isAdminPage }) => {
  const { t } = useTranslation("");
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [commentId, setCommentId] = useState<number>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [file, setFile] = useState<RcFile | null>();
  const [comment, setComment] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  const dummyRequest = async ({ file, onSuccess }: any) => {
    setFile(file);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setPreviewUrl(url);
    });
  };
  const dispatch = useDispatch();

  const onCreateComment = () => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("comment", comment);

    dispatch(
      userCreateDonorCommentRequest({
        file: file as RcFile,
        comment: comment,
        id: Number(id),
        fileName: file?.name || "",
        originalFilename: file?.name || "",
      })
    );
    setComment("");
    setPreviewUrl("");
    setFile(null);
  };

  const onDeleteComment = (commentId: number) => {
    dispatch(
      userDeleteDonorCommentsRequest({
        donorId: Number(id),
        id: Number(commentId),
      })
    );
  };

  return (
    <div className="border-t-[1px] border-solid border-[0px] border-[#D4D3D3]">
      {/* <div className="flex items-center justify-center relative h-[1px] bg-[#D4D3D3]">
        <div className="absolute bg-[#FFFFFF] p-[12px] text-[16px]">
          2023.12.12
        </div>
      </div> */}
      {comments.map((item, index) => (
        <div
          key={item.id}
          className={`px-[30px] py-[40px] border-b-[1px] border-solid border-[0px] border-[#D4D3D3] ${
            index % 2 ? "bg-[#E5E9F430]" : "bg-[#ffffff]"
          } `}
        >
          <div className="flex items-center justify-between">
            <div className="flex space-x-[12px]">
              <div className="font-bold">
                {item.user.firstName} {item.user.lastName}
              </div>
            </div>
            <div className="flex items-center flex-col space-y-2">
              <div className="text-[#A2A0A0]">
                {dayjs(item.createdAt).format("DD.MM.YYYY")}
              </div>
              {item.user.id === user?.id && (
                <div>
                  <DeleteOutlined
                    onClick={() => {
                      setCommentId(item.id);
                      setOpenConfirmDeleteModal(true);
                    }}
                    className="cursor-pointer text-red-500"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="px-[50px] mt-[26px] text-[#000000] flex flex-col space-y-[12px]">
            <div>{item.content}</div>
            {item.attachment && (
              <div className="flex space-x-1 items-end">
                {item.attachment.includes(".doc") ||
                item.attachment.includes(".docx") ? (
                  <a
                    download
                    href={item.link || ""}
                    className="w-[40px] h-[40px] flex justify-center items-center relative "
                  >
                    <DocFileIcon width={40} height={40} />
                  </a>
                ) : item.attachment.includes(".excel") ||
                  item.attachment.includes(".xlsx") ||
                  item.attachment.includes(".xls") ? (
                  <a
                    download
                    href={item.link || ""}
                    className="w-[40px] h-[40px] flex justify-center items-center relative "
                  >
                    <XLSFileIcon width={40} height={40} />
                  </a>
                ) : (
                  <a
                    download
                    href={item.link || ""}
                    className="w-[40px] h-[40px] flex justify-center items-center relative "
                  >
                    <PDFFileIcon width={40} height={40} />
                  </a>
                )}
                <div>{item?.originalFilename}</div>
              </div>
            )}
          </div>
        </div>
      ))}
      {!isAdminPage && (
        <div className="mt-[24px]">
          <Form autoComplete="new-password">
            <div className="h-[249px] relative border-[1px] border-[#D4D3D3] rounded-[8px] border-solid p-[4px]">
              <Form.Item>
                <Input.TextArea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="!h-[180px] border-[0px]"
                ></Input.TextArea>
              </Form.Item>
              <div className="pl-[4px] pb-[20px]">
                {file && (
                  <div>
                    {file?.name.includes(".doc") ||
                    file?.name.includes(".docx") ? (
                      <div className="w-[40px] h-[40px] flex justify-center items-center relative pb-[12px] pl-[24x]">
                        <DocFileIcon width={40} height={40} />
                      </div>
                    ) : file?.name.includes(".excel") ||
                      file?.name.includes(".xlsx") ||
                      file?.name.includes(".xls") ? (
                      <div className="w-[40px] h-[40px] flex justify-center items-center relative pb-[12px] pl-[24x]">
                        <XLSFileIcon width={40} height={40} />
                      </div>
                    ) : (
                      <div className="w-[40px] h-[40px] flex justify-center items-center relative pb-[20px] pl-[24x]">
                        <PDFFileIcon width={40} height={40} />
                      </div>
                    )}
                    <div>{file?.name}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end items-center space-x-[12px] mt-[12px]">
              <Upload
                accept=".doc, application/pdf, .pdf, .xlsx, .xls, .docx"
                onChange={handleChange}
                showUploadList={false}
                customRequest={dummyRequest}
                className="h-[40px] flex items-center"
              >
                <PaperClipIcon />
              </Upload>
              <Button
                onClick={() => {
                  if (comment || file) {
                    onCreateComment();
                  }
                }}
                type="primary"
                size="large"
              >
                {t("common.send")}
              </Button>
            </div>
          </Form>
        </div>
      )}
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
                onDeleteComment(commentId as number);
              }}
              className="w-[130px]"
              type="primary"
              size="large"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default CommentList;
