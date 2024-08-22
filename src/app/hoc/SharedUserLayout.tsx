"use client";

import { PUBLIC_ROUTES } from "@/constants/routers";
import { ACCESS_TOKEN } from "@/constants/variables";
import { userGetMeRequest } from "@/redux/auth/actions";
import { useAppSelector } from "@/redux/hooks";
import { Button, Layout, MenuProps, Spin } from "antd";
import Cookie from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

export default function WithSharedUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation("");
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const loading = useAppSelector((state) => state.loadingReducer.loading);

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
