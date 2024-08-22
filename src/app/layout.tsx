"use client";
import "@/assets/scss/globals.scss";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { Providers } from "@/redux/provider";
import MainLayout from "./components/MainLayout";
import "./i18n";
import { ConfigProvider } from "antd";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <StyledComponentsRegistry>
        <MainLayout>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#2666D0",
                borderRadius: 4,
                colorBgContainerDisabled: "#A2A0A0",
                colorTextDisabled: "#FFFFFF",
                colorLink: "#2666D0",
                fontSize: 18,
              },
              components: {
                Button: {
                  colorLink: "#2666D0",
                },
              },
            }}
          >
            {children}
          </ConfigProvider>
        </MainLayout>
      </StyledComponentsRegistry>
    </Providers>
  );
}
