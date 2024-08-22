"use client";
import WithAuthLayoutAdmin from "@/app/hoc/PrivateAdminRoute";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import Description from "../../components/Description";
import Breadcrumb from "@/components/BreadCumb";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { ADMIN } from "@/types/saga.type";
import { useAppSelector } from "@/redux/hooks";
import { handleUserType, handleUserTypeBgColor } from "@/utils/helpers";
import { UserRole } from "@/types/common.enum";

const UserDetail = () => {
  const { t } = useTranslation("");
  const { get } = useSearchParams();
  const id = get("id");
  const dispatch = useDispatch();
  const userDetail = useAppSelector((state) => state.adminReducer.userDetail);
  useEffect(() => {
    if (id) {
      dispatch({ type: ADMIN.GET_USER_DETAIL, payload: { id: id } });
    }
  }, [id]);

  const breadCrubItems: ItemType[] = useMemo(
    () => [
      {
        key: "/admin",
        href: "/admin",
        title: t("admin.home"),
      },
      {
        key: "/admin/users",
        href: "/admin/users",
        title: t("admin.user-list"),
      },
      {
        key: `/admin/users/${userDetail?.id}`,
        // href: "/admin/users",
        title: `${userDetail?.firstName} ${userDetail?.lastName}`,
      },
    ],
    [userDetail]
  );

  return (
    <WithAuthLayoutAdmin>
      <Breadcrumb items={breadCrubItems} />
      <div className="bg-white px-[40px] py-[24px] rounded-[16px] mt-[24px]">
        <div className="flex  items-center space-x-[16px]">
          <div>{t("admin.user-id")} ********* </div>
          <div
            className={`w-[112px] h-[29px] flex items-center justify-center text-[14px] font-[700] rounded-[4px]  text-white ${handleUserTypeBgColor(
              userDetail?.role || UserRole.OPO
            )}`}
          >
            {handleUserType(userDetail?.role || UserRole.OPO)}
          </div>
        </div>
        <div className="h-[1px] bg-[#D4D3D3] mt-[24px]" />
        <div className="px-[150px] py-[32px] mt-[40px]">
          <div className="text-[24px] font-[700]">
            {t("admin.user-profile")}
          </div>
          <div className="mt-[32px]">
            <Row gutter={[56, 16]}>
              <Col span={6} className="space-y-[24px]">
                <Description
                  title={t("admin.first-name")}
                  content={userDetail?.firstName}
                />
                <Description
                  title={t("admin.organization")}
                  content={userDetail?.organization}
                />
              </Col>
              <Col span={6} className="space-y-[24px]">
                <Description
                  title={t("admin.last-name")}
                  content={userDetail?.lastName}
                />
                <Description
                  title={t("admin.phone")}
                  content={userDetail?.phoneNumber}
                />
              </Col>
              <Col span={6} className="space-y-[24px]">
                <Description
                  title={t("admin.role")}
                  content={userDetail?.role}
                />
                <Description
                  title={t("admin.mail-address")}
                  content={userDetail?.email}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </WithAuthLayoutAdmin>
  );
};
export default UserDetail;
