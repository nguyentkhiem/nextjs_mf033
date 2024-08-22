import { Col, Row } from "antd";
import Description from "../admin/components/Description";
import { useTranslation } from "react-i18next";
import { IDonor, Sex } from "@/redux/home/actions-types";
import React from "react";
import dayjs from "dayjs";

interface IProps {
  detail: IDonor | null;
}

const DonorDetailInfomation: React.FC<IProps> = ({ detail }) => {
  const { t } = useTranslation("");
  return (
    <Row gutter={20}>
      <Col className="space-y-[24px]" span={16}>
        <Description
          title={t("common.donor-id")}
          content={detail?.donorCode}
        ></Description>
        <Description
          title={t("common.organ")}
          content={
            detail?.organ === "LIVER"
              ? t("common.liver")
              : detail?.organ === "KIDNEY"
              ? t("common.kidney")
              : t("common.other")
          }
        ></Description>
      </Col>
      {/* <Col className="space-y-[24px]" span={4}>
        <Description
          title={t("common.sex")}
          content={
            detail?.sex === Sex.FEMALE ? t("common.female") : t("common.male")
          }
        ></Description>
        <Description
          title={t("common.birth-year")}
          content={dayjs(detail?.birthday).format("YYYY")}
        ></Description>
        <Description
          title={t("common.location")}
          content={detail?.location}
        ></Description>
      </Col>
      <Col className="space-y-[24px]" span={4}>
        <Description
          title={t("common.donor-type")}
          content={detail?.donorType}
        ></Description>
      </Col> */}
    </Row>
  );
};
export default React.memo(DonorDetailInfomation);
