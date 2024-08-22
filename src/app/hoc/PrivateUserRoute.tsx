"use client";

import TermsAndPrivacyModal from "@/components/TermAndPrivacyModal";
import TermsOfServiceModal from "@/components/TermOfServiceModal";
import Logo from "@/components/icons/Logo";
import MenuAiCheckIcon from "@/components/icons/MenuAiCheckIcon";
import MenuDonorListIcon from "@/components/icons/MenuDonorListIcon";
import MenuHomeIcon from "@/components/icons/MenuHomeIcon";
import MenuMyPageIcon from "@/components/icons/MenuMyPageIcon";
import { PUBLIC_ROUTES } from "@/constants/routers";
import { ACCESS_TOKEN } from "@/constants/variables";
import { logout } from "@/redux/auth";
import {
  userAcceptTermAndPolicyRequest,
  userGetMeRequest,
} from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import { Dropdown, Form, Layout, Menu, MenuProps, Modal, Spin } from "antd";
import Cookie from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

export default function WithAuthLayoutUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation("");
  const router = useRouter();
  const path = usePathname();
  const token = Cookie.get(ACCESS_TOKEN);
  const dispatch = useDispatch();
  const checkPath: boolean = PUBLIC_ROUTES.includes(path);
  useEffect(() => {
    dispatch(userGetMeRequest());
  }, []);

  // useEffect(() => {
  //   if (token && checkPath) {
  //     router.push(ROUTES.HOME);
  //   } else if (token === null || token === undefined) {
  //     router.push(ROUTES.AUTH_LOGIN);
  //     return;
  //   }
  // }, [token]);

  const dropdownItems: MenuProps["items"] = [
    {
      label: (
        <div className="text-red-500 text-[20px]">{t("common.log-out")}</div>
      ),
      key: "1",
    },
  ];
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.loadingReducer.loading);
  const items: MenuProps["items"] = [
    {
      key: "/",
      label: t("common.home"),
      icon: <MenuHomeIcon />,
    },
    {
      key: "/ai-check",
      label: t("common.ai-check"),
      icon: <MenuAiCheckIcon />,
    },
    {
      key: "/group",
      label: t("common.group"),
      icon: <MenuMyPageIcon />,
    },
    {
      key: "/my-page",
      label: t("common.my-page"),
      icon: <MenuMyPageIcon />,
    },
  ];
  const handleSelectedKeys = () => {
    if (path.includes("/donor-list")) {
      return "/";
    }
    if (path.includes("/ai-check")) return "/ai-check";
    if (path.includes("/my-page")) return "/my-page";
    if (path.includes("/group")) return "/group";
    return "/";
  };

  // console.log("user?.isAccepted", user?.isAccepted);

  return (
    <Layout hasSider>
      {user ? (
        <>
          <Sider
            width={240}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              background: "var(--sider-background)",
            }}
          >
            <div
              onClick={() => {
                router.push("/");
              }}
              className="flex items-center pt-[40px] mb-[8px] px-[32px] text-[18px] font-bold text-[var(--text-color)] cursor-pointer"
            >
              <Logo />
            </div>
            <Menu
              style={{ background: "var(--sider-background)" }}
              mode="inline"
              defaultSelectedKeys={[handleSelectedKeys()]}
              items={
                user?.organizationUser?.role === "LEADER"
                  ? items
                  : items.filter((item) => item?.key !== "/group")
              }
              onClick={({ key }) => router.push(key)}
            />
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 240 }}>
            <Header
              style={{
                padding: 0,
                background: "#FFF",
                borderBottom: "1px solid #2A5193",
              }}
            >
              <div className="flex justify-between">
                <div></div>
                <Dropdown
                  menu={{
                    items: dropdownItems,
                    onClick: ({ key }) => {
                      if (key === "1") {
                        Cookie.remove(ACCESS_TOKEN);
                        dispatch(logout());
                        router.push("/auth/login");
                      }
                    },
                  }}
                >
                  <div className="text-right px-[24px] font-[600] text-[20px] text-[#2A5193]">
                    {user?.firstName + " " + user?.lastName}
                  </div>
                </Dropdown>
              </div>
            </Header>
            <Content style={{ background: "#E9F1FC" }}>
              <div
                style={{
                  padding: "20px 60px",
                  height: "calc(100vh - 66px)",
                  overflowY: "scroll",
                }}
              >
                {loading ? <Spin fullscreen /> : children}
              </div>
              <TermsAndPrivacyModal
                onNext={() => {
                  dispatch(userAcceptTermAndPolicyRequest());
                }}
                open={user?.isAccepted === false}
              />
            </Content>
          </Layout>
        </>
      ) : null}
    </Layout>
  );
}
