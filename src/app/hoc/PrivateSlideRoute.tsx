"use client";

import { useAppSelector } from "@/redux/hooks";
import { Button, Layout, MenuProps, Spin } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
const { Header, Content, Footer, Sider } = Layout;

export default function WithAuthSlideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation("");
  const router = useRouter();
  const loading = useAppSelector((state) => state.loadingReducer.loading);
  const dropdownItems: MenuProps["items"] = [
    {
      label: <div className="text-red-500">{t("common.log-out")}</div>,
      key: "1",
    },
  ];

  return (
    <Layout>
      <Layout className="site-layout">
        <Content style={{ background: "#E9F1FC" }}>
          <div
            style={{
              padding: "8px 20px",
              height: "calc(100vh)",
              overflowY: "scroll",
            }}
          >
            {loading ? <Spin fullscreen /> : children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
