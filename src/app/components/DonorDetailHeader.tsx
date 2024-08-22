import LinksIcon from "@/components/icons/LinksIcon";
import { userRequestPathologyRequest } from "@/redux/donor/actions";
import { userGetGroupUserListRequest } from "@/redux/group/actions";
import { useAppSelector } from "@/redux/hooks";
import { Button, Col, Form, Modal, Row, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import crypto from "crypto";
import { setRequestPathologySuccess } from "@/redux/donor";
import { IDonor } from "@/redux/home/actions-types";
import { log } from "@/redux/counter/saga";
import { loadMorePathologyList, setPathologyList } from "@/redux/group";
import { debounce } from "lodash";

interface Props {
  status: number;
  id: number | string;
  onRegister: () => void;
  onGetLink: () => void;
  isAdminPage: boolean;
  donor: IDonor | null;
}

const encryption_key = "kfq2Qz4CPbjFYgcR9uxnXKdNVrTGJaSL";
const initialization_vector = "dpBDJX6mE7PcC5gZ";

const DonorDetailHeader: React.FC<Props> = ({
  status,
  id,
  onGetLink,
  onRegister,
  isAdminPage,
  donor,
}) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [isShowLink, setIsShowLink] = useState(false);
  const [isShowRequestPathology, setIsShowRequestPathology] = useState(false);
  const isShowRegisterUnos = useAppSelector(
    (state) => state.donorReducer.isShowRegiserUnosModal
  );
  const [userList, setUserList] = useState<any[]>([]);
  const [keywork, setKeyword] = useState("");
  const groupUserList = useAppSelector(
    (state) => state.groupReducer.pathologyList
  );
  const total = useAppSelector((state) => state.groupReducer.total);
  const page = useAppSelector((state) => state.groupReducer.page);
  const detail = useAppSelector((state) => state.donorReducer.detail);
  const requestPathologySuccess = useAppSelector(
    (state) => state.donorReducer.requestPathologySuccess
  );
  const encrypt = (text: string) => {
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(encryption_key),
      Buffer.from(initialization_vector)
    );
    var encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  };

  useEffect(() => {
    if (isShowRegisterUnos) {
      form.setFieldsValue({
        id: id,
      });
    }
  }, [isShowRegisterUnos, id]);

  useLayoutEffect(() => {
    if (!isAdminPage && isShowRequestPathology) {
      dispatch(
        userGetGroupUserListRequest({
          limit: 10,
          page: 1,
          keyword: keywork.length ? keywork : undefined,
          filter: JSON.stringify({ role: "PATHOLOGIST" }),
        })
      );
    }
  }, [keywork, isAdminPage, isShowRequestPathology]);

  const onFinish = (values: any) => {
    if (userList.length > 0) {
      dispatch(
        userRequestPathologyRequest({
          donorId: Number(id),
          userIds: userList.map((item) => Number(item)),
        })
      );
    }

    // setIsShowRequestPathology(false);
  };

  useEffect(() => {
    return () => {
      dispatch(setRequestPathologySuccess(false));
    };
  }, []);

  return (
    <div className="flex min-h-[76px] items-center justify-between space-x-[24px] py-[16px] border-b-[1px] border-solid border-[0px]  border-b-[#D4D3D3] ">
      <div className="flex items-center space-x-[16px]">
        <div className="px-[16px] max-w-[500px] py-[6px] bg-[#F3F3F3] text-[#A2A0A0] rounded font-bold break-words">
          Donor ID:{donor?.donorCode}
        </div>
      </div>
      {isAdminPage === false && (
        <div className="flex items-center space-x-[5px]">
          <Button
            onClick={() => {
              setIsShowRequestPathology(true);
            }}
            type="primary"
            size="large"
            shape="round"
            disabled={detail?.slide?.status !== "PASS"}
          >
            Request pathology
          </Button>
          <Button
            onClick={() => {
              setIsShowLink(true);
            }}
            type="primary"
            size="large"
            shape="round"
            disabled={detail?.slide?.status !== "PASS"}
          >
            Get Link
          </Button>
        </div>
      )}
      <Modal
        wrapClassName="register-donor-modal"
        style={{ padding: 0 }}
        width={800}
        open={isShowLink}
        footer={null}
        onCancel={() => {
          setIsShowLink(false);
        }}
      >
        <div>
          <div className="px-[24px] ">
            <div className="text-[24px] font-bold">Copy Link</div>
            <div className="text-justify py-[60px] flex justify-around">
              {`${
                process.env.NEXT_PUBLIC_SITE_NAME
              }/shared-user/donor/?id=${id}&token=${encrypt(
                detail?.id?.toString() || ""
              )}&slideId=${detail?.slide?.id}`}
            </div>
          </div>
          <div className="flex items-center space-x-[16px] h-[76px] bg-[#F3F3F3] rounded-b-[8px] px-[24px] py-[16px]">
            <CopyToClipboard
              onCopy={() => {
                message.success({
                  content: "Copied to clipboad",
                  key: "message-copied",
                });
              }}
              text={`${
                process.env.NEXT_PUBLIC_SITE_NAME
              }/shared-user/donor/?id=${id}&token=${encrypt(
                detail?.id?.toString() || ""
              )}&slideId=${detail?.slide?.id}`}
            >
              <div className="flex items-center space-x-[8px] cursor-pointer ">
                <LinksIcon></LinksIcon>
                <div className="text-[#2666D0] font-bold">Copy Link</div>
              </div>
            </CopyToClipboard>
          </div>
        </div>
      </Modal>
      <Modal
        wrapClassName="register-donor-modal"
        style={{ padding: 0 }}
        width={800}
        open={isShowRequestPathology}
        footer={null}
        onCancel={() => {
          setIsShowRequestPathology(false);
          dispatch(setRequestPathologySuccess(false));
          setUserList([]);
          form.resetFields();
          dispatch(setPathologyList([]));
        }}
      >
        <Form
          onFinish={onFinish}
          form={form}
          colon={false}
          labelCol={{ span: 6 }}
          autoComplete="new-password"
        >
          {requestPathologySuccess ? (
            <div className="flex flex-col justify-center items-center h-[300px]">
              <div className="text-[24px] font-bold mb-[32px]">
                Request has been sent
              </div>
              <div className="text-[#222222] text-[18px]">
                Notification is sent to e-mail address
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full items-center mt-[16px]">
              <div className=" w-[595px] ">
                <div className="text-[24px] font-bold mb-[40px]">
                  Request pathology
                </div>

                <div className="mb-[16px]">Add contact</div>
                <Row className="flex items-center w-full " gutter={20}>
                  <Col span={20}>
                    <Form.Item name="id">
                      <Select
                        onSearch={(value) => {
                          // debounce search
                          debounce(() => {
                            setKeyword(value);
                          }, 500)();
                        }}
                        onSelect={(value) => {
                          setUserList([...userList, value]);
                        }}
                        onDeselect={(value) => {
                          setUserList(
                            userList.filter((item) => item !== value)
                          );
                        }}
                        mode="multiple"
                        maxTagCount="responsive"
                        showSearch
                        optionFilterProp="children"
                        size="large"
                        value={userList}
                        className="!w-[595px] !h-[52px]"
                        onPopupScroll={async (e: any) => {
                          const { target } = e;
                          if (
                            (target as any).scrollTop +
                              (target as any).offsetHeight ===
                            (target as any).scrollHeight
                          ) {
                            // if not load all;
                            if (groupUserList.length < total) {
                              dispatch(
                                userGetGroupUserListRequest({
                                  limit: 10,
                                  page: page + 1,
                                  keyword: keywork.length ? keywork : undefined,
                                  filter: JSON.stringify({
                                    role: "PATHOLOGIST",
                                  }),
                                })
                              );
                            }
                          }
                        }}
                      >
                        {groupUserList.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.email}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                {userList.length > 0 && (
                  <>
                    <div className="text-[#222222] text-[24px]">
                      Members with Access
                    </div>

                    {userList.map((item) => (
                      <div
                        key={item.id}
                        className="p-[16px] border-[0px] border-b-[1px] border-solid border-[#D4D3D3] rounded-[4px] text-[14px]"
                      >
                        <div>
                          {groupUserList.find((g) => g.id === item)?.firstName}{" "}
                          {groupUserList.find((g) => g.id === item)?.lastName}
                        </div>
                        <div>
                          {groupUserList.find((g) => g.id === item)?.email}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="w-full flex justify-end items-center space-x-[16px] h-[76px] bg-[#F3F3F3] rounded-b-[16px] px-[24px] py-[16px] mt-[24px]">
                <Button
                  disabled={userList.length === 0}
                  htmlType="submit"
                  className="w-[130px]"
                  type="primary"
                  size="large"
                >
                  Request
                </Button>
              </div>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};
export default DonorDetailHeader;
