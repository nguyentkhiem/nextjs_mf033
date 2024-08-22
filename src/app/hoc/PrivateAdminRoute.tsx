"use client";

import Logo from "@/components/icons/Logo";
import MenuHomeIcon from "@/components/icons/MenuHomeIcon";
import MenuUserIcon from "@/components/icons/MenuUserIcon";
import { PUBLIC_ROUTES } from "@/constants/routers";
import { ACCESS_TOKEN_ADMIN } from "@/constants/variables";
import { logout } from "@/redux/admin/auth";
import { useAppSelector } from "@/redux/hooks";
import { ADMIN } from "@/types/saga.type";
import { Dropdown, Layout, Menu, MenuProps, Spin } from "antd";
import Cookie from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

export default function WithAuthLayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation("");
  const router = useRouter();
  const path = usePathname();
  const user = useAppSelector((state) => state.authAdmin.user);
  const adminToken = Cookie.get(ACCESS_TOKEN_ADMIN);
  const checkPath: boolean = PUBLIC_ROUTES.includes(path);
  const loading = useAppSelector((state) => state.loadingReducer.loading);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (adminToken && checkPath) {
  //     router.push(ROUTES.ADMIN);
  //   } else if (adminToken === null || adminToken === undefined) {
  //     router.push(ROUTES.ADMIN_SIGIN);
  //     return;
  //   }
  // }, [adminToken]);

  useEffect(() => {
    dispatch({ type: ADMIN.GET_ME });
  }, []);

  const items: MenuProps["items"] = [
    {
      key: "/admin",
      label: t("common.home"),
      icon: <MenuHomeIcon />,
    },

    {
      key: "/admin/case-list",
      label: t("common.case-list"),
      icon: <MenuUserIcon />,
    },
  ];
  const handleSelectedKeys = () => {
    if (path.includes("/admin/case-list")) {
      return "/admin/case-list";
    }
    return "/admin";
  };
  const dropdownItems: MenuProps["items"] = [
    {
      label: <div className="text-red-500">{t("common.log-out")}</div>,
      key: "1",
    },
  ];
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
                router.push("/admin");
              }}
              className="flex items-center pt-[40px] mb-[8px] px-[32px] text-[18px] font-bold text-[var(--text-color)] cursor-pointer"
            >
              <Logo />
            </div>
            <Menu
              style={{ background: "var(--sider-background)" }}
              mode="inline"
              defaultSelectedKeys={[handleSelectedKeys()]}
              items={items}
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
                        Cookie.remove(ACCESS_TOKEN_ADMIN);
                        dispatch(logout());
                        router.push("/admin/sign-in");
                      }
                    },
                  }}
                >
                  <div className="text-right px-[24px] font-[600] text-[15px] text-[#2A5193]">
                    {user?.username}
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
            </Content>
          </Layout>
        </>
      ) : null}
    </Layout>
  );
}
