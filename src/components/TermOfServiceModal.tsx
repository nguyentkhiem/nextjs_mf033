import { Button, Checkbox, Form, Modal, ModalProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import LoginButton from "./Button";

interface Props extends ModalProps {
  onNext: () => void;
}

const TermsOfServiceModal: React.FC<Props> = (props) => {
  const { t } = useTranslation("");

  return (
    <Modal
      footer={null}
      open={props.open}
      onCancel={props.onCancel}
      closable={false}
      width="100%"
      style={{ maxWidth: 1000 }}
    >
      <Form
        onFinish={() => {
          props.onNext();
        }}
      >
        <div className="px-[80px] py-[100px]  register-container">
          <div className="text-center text-[24px] font-[600] mb-[33px]">
            Terms of Service
          </div>
          <p>
            {t(
              "This system is research use only. Not for use in diagnostic procedures to purpose."
            )}
          </p>
          <p>
            {t(
              "Health Insurance Portability and Accountability Act (HIPAA) agreement. "
            )}
          </p>
          <p>
            {t(
              "The standards, requirements, and implementation specifications of Privacy Rule apply with respect to protected health information (PHI).  This information is provided as following:"
            )}
          </p>
          <a
            href="https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E"
            target="_blank"
            className="text-[#1677ff]"
          >
            eCFR :: 45 CFR Part 164 Subpart E -- Privacy of Individually
            Identifiable Health Information
          </a>
          <p>
            Your acceptance of this agreement acknowledges that you will follow
            this subpart that applies with respect to PHI. <br /> You
            acknowledge the understanding that the login and password provided
            to you will not be shared with anyone.
            <br /> You also acknowledge that you will ensure appropriate
            procedures to log out of the system to prevent its unauthorized use.
            <br />
            You further acknowledge that accessing PHI without authorization,
            accessing or using PHI for an improper purpose, or allowing access
            to PHI by unauthorized persons constitutes a HIPAA Privacy and
            Security Rule violation.
          </p>
          <div className="flex items-center w-full justify-center mt-[72px] ">
            <Form.Item
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(t("common.please-accept-terms") || "")
                        ),
                },
              ]}
              valuePropName="checked"
              name="term"
            >
              <Checkbox>
                <div className="flex">
                  <div className="text-[#A2A0A0]">{t("common.agree")}</div>

                  <div className="text-right text-[#2666D0] font-[700] cursor-pointer ml-[4px]">
                    {t("common.terms")}
                  </div>
                </div>
              </Checkbox>
            </Form.Item>
          </div>
          <div className="flex justify-center w-full mt-[24px]">
            <Form.Item>
              <LoginButton
                htmlType="submit"
                type="primary"
                size="large"
                className="w-[400px] !h-[52px] !rounded-none"
              >
                Next
              </LoginButton>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
export default TermsOfServiceModal;
