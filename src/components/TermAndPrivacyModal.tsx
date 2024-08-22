import { Button, Checkbox, Form, Modal, ModalProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import LoginButton from "./Button";

interface Props extends ModalProps {
  onNext: () => void;
}

const TermsAndPrivacyModal: React.FC<Props> = (props) => {
  const { t } = useTranslation("");
  const [step, setStep] = React.useState(0);
  return (
    <Modal
      footer={null}
      open={props.open}
      onCancel={props.onCancel}
      width="100%"
      destroyOnClose
      style={{ maxWidth: 1000 }}
      closable={false}
    >
      <Form
        onFinish={() => {
          if (step === 0) {
            setStep(1);
          } else {
            props.onNext();
          }
        }}
      >
        <div className="px-[80px] py-[100px]  register-container">
          {step === 0 && (
            <>
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
                Your acceptance of this agreement acknowledges that you will
                follow this subpart that applies with respect to PHI. <br /> You
                acknowledge the understanding that the login and password
                provided to you will not be shared with anyone.
                <br /> You also acknowledge that you will ensure appropriate
                procedures to log out of the system to prevent its unauthorized
                use.
                <br />
                You further acknowledge that accessing PHI without
                authorization, accessing or using PHI for an improper purpose,
                or allowing access to PHI by unauthorized persons constitutes a
                HIPAA Privacy and Security Rule violation.
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

                      <div className="text-right ml-[4px]">
                        {t("common.terms")}
                      </div>
                    </div>
                  </Checkbox>
                </Form.Item>
              </div>
              <div className="flex justify-center w-full mt-[24px]">
                <Form.Item>
                  <LoginButton
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className="w-[400px] !h-[52px] !rounded-none"
                  >
                    Next
                  </LoginButton>
                </Form.Item>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="text-center text-[24px] font-[600] mb-[33px]">
                Privacy Policy
              </div>
              <div>
                Privacy Policy (or Personal Information Protection Policy)
              </div>
              <p>
                1.Handling of personal information Regarding the handling of
                personal information acquired by our company, we comply with the
                Act on the Protection of Personal Information, guidelines such
                as guidelines on the protection of personal information, and
                other related laws and regulations regarding the protection of
                personal information.
              </p>
              <p>
                2.Safety management of personal information Regarding the
                protection of personal information, our company will implement
                appropriate organizational, physical, human, and technical
                measures to prevent the leakage, loss, or damage of personal
                information handled by our company, and to safely manage
                personal information. We will take necessary and appropriate
                measures.
              </p>
              <p>
                3. Compliance matters regarding acquisition of personal
                information, etc. Regarding the acquisition, use, and provision
                of personal information by our company, we will comply with the
                following matters.
              </p>
              <p>
                <div>(1) Acquisition of personal information</div>
                <div>{`Our company provides general users of this site (hereinafter referred to as "users") or this site to the extent necessary for the operation of the Internet information providing site (hereinafter referred to as "this site") managed by our company. We may obtain personal information related to users.`}</div>
              </p>

              <div>(2) Purpose of use of personal information</div>

              <p>
                Our company will not use the personal information it acquires
                beyond the scope necessary to achieve the purposes of use set
                forth below, unless required by law or with the consent of the
                person concerned.
              </p>

              <p>
                <div>
                  ①　Operation, maintenance, and management of this site
                </div>
                <div>
                  ② Providing and introducing services through this site
                </div>
                <div>③ Survey to improve the quality of this site</div>
              </p>

              <p>
                <div>(3) Provision of personal information, etc.</div>
                <div>
                  Our company will not provide personal information obtained
                  based on the consent of the person to a third party without
                  the prior consent of the person, except as required by law.
                  Regarding disclosure, correction, addition, or deletion of
                  personal information or notification of purpose of use at the
                  request of the person concerned, we will comply with laws and
                  regulations and respond appropriately to opinions and
                  consultations.
                </div>
              </p>

              <p>
                <div>4. Change of purpose of use of personal information</div>
                <div>
                  In principle, our company will not change the purpose of use
                  specified in the previous paragraph unless we have obtained
                  the consent of the person in advance. However, this does not
                  apply if the changed purpose of use is announced in advance to
                  the extent that it is reasonably recognized to have a
                  considerable relationship to the purpose of use before the
                  change.
                </div>
              </p>

              <p>
                <div>5.Provision of personal information to third parties</div>
                <div>
                  When entrusting all or part of the handling of personal
                  information to a third party, we will thoroughly examine the
                  suitability of the third party and ensure that the handling of
                  the personal information entrusted to us is managed safely. We
                  will provide necessary and appropriate supervision to those
                  who are involved.
                </div>
              </p>

              <p>
                <div>
                  6.Improving and reviewing the handling of personal information
                </div>
                <div>
                  Our company conducts inspections regarding the handling of
                  personal information, management systems, and initiatives, and
                  continuously makes improvements and reviews.
                </div>
              </p>

              <p>
                <div>7. Disposal of personal information</div>
                <div>
                  Our company shall delete or dispose of personal information
                  when it is no longer necessary in light of the purpose of use
                  of personal information, and such deletion and disposal shall
                  be done as necessary and appropriate to prevent the risk of
                  external leakage, etc. Depending on the method, we will do so
                  to the extent necessary for the performance of our business.
                </div>
              </p>

              <p>8. This site is not made for children. </p>

              <p>
                <div>9. Point of contact for complaints and consultations</div>
                <div>
                  Our company has established a contact point as follows.
                </div>
              </p>

              <p>
                <div>
                  Write to us at: [Procurement Teams for New York, Limited]
                </div>
                <div>2048 Quaker Ridge Road, Croton-On-Hudson, NY, 10520</div>
                <div>Email: PTNY@pt-ny.com</div>
              </p>
              <div className="flex items-center w-full justify-center mt-[72px] ">
                <Form.Item
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error(t("common.please-accept-privacy") || "")
                            ),
                    },
                  ]}
                  valuePropName="checked"
                  name="policy"
                >
                  <Checkbox>
                    <div className="flex">
                      <div className="text-[#A2A0A0]">{t("common.agree")}</div>

                      <div className="text-right ml-[4px]">Privacy Policy</div>
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
            </>
          )}
        </div>
      </Form>
    </Modal>
  );
};
export default TermsAndPrivacyModal;
