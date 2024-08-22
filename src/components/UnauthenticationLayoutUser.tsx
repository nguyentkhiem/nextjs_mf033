import { PropsWithChildren } from "react";
import LoginIcon from "./icons/LoginIcon";
import { useAppSelector } from "@/redux/hooks";
import { Spin } from "antd";

const UnauthenticationLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const loading = useAppSelector((state) => state.loadingReducer.loading);
  return (
    <div className="flex  h-screen">
      <div className="flex flex-1 items-center justify-center h-screen bg-[#FFF]">
        {children} {loading && <Spin fullscreen />}
      </div>
      <div className="flex flex-1 items-center justify-center h-screen bg-[#2666D0]">
        <LoginIcon />
        <div className="text-white text-center w-[394px] text-[28px] font-[700]">
          Slide image sharing system for transplant community with AI
          applications
        </div>
      </div>
    </div>
  );
};
export default UnauthenticationLayout;
