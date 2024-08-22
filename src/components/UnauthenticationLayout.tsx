import { useAppSelector } from "@/redux/hooks";
import { Spin } from "antd";
import { PropsWithChildren } from "react";

const UnauthenticationLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const loading = useAppSelector((state) => state.loadingReducer.loading);
  return (
    <div className="flex items-center justify-center h-screen bg-[#FFF]">
      {children}
      {loading && <Spin fullscreen />}
    </div>
  );
};
export default UnauthenticationLayout;
