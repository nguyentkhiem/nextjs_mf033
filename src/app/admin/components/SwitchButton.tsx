import React from "react";

interface Props {
  isActive: boolean;
  onClick: () => void;
  title: string;
}
const SwitchButton: React.FC<Props> = ({ isActive, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex px-[16px] py-[4px] min-w-[67px] items-center justify-center ${
        isActive ? "bg-[#FFFFFF]" : "bg-[#F3F3F3]"
      } rounded-[4px] cursor-pointer h-[28px]`}
    >
      {title}
    </div>
  );
};
export default React.memo(SwitchButton);
