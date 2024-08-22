import LoginIcon from "@/components/icons/LoginIcon";
import ChangeLng from "../components/ChangeLng";
import Image from "next/image";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex  min-h-screen bg-[#FFF]">
      <div className="flex flex-1 items-center justify-center auth">
        {children}
      </div>
      <div className="flex flex-1 items-center justify-center min-h-screen bg-[#2666D0] flex-col">
        <LoginIcon />
        <div className="text-white text-center w-[390px] text-[28px] font-[700] leading-[39.2px] ">
          Slide image sharing system for transplant community with AI
          applications
        </div>
      </div>
    </div>
  );
}
