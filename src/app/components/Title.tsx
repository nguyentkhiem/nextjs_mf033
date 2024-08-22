import { Button } from "antd";
import React from "react";

interface Props {
  title: string | React.ReactNode;
  hasRightIcon: boolean;
  rightButtonIcon?: React.ReactNode;
  rightButtonText?: string | React.ReactNode;
  onClick?: () => void;
  isSave?: boolean;
}

const Title: React.FC<Props> = ({
  onClick,
  title,
  rightButtonText,
  hasRightIcon,
  rightButtonIcon,
  isSave,
}) => {
  return (
    <div className="flex justify-between mb-[16px]">
      <div className="text-[24px] font-bold">{title}</div>
      {hasRightIcon && (
        <Button
          className={`${isSave && "bg-[#2666D0]"} !h-[44px]`}
          size="large"
          shape="round"
          onClick={onClick}
        >
          <div
            className={`flex space-x-[4px] items-center text-[#A2A0A0] ${
              isSave && "text-[#FFF]"
            }`}
          >
            <div>{rightButtonText}</div>
            <div>{rightButtonIcon}</div>
          </div>
        </Button>
      )}
    </div>
  );
};
export default React.memo(Title);
