import React from "react";

interface Props {
  title: string | React.ReactNode;
  content: string | number;
}

const StatisticCard: React.FC<Props> = ({ title, content }) => {
  return (
    <div className="bg-[#FFFFFF] py-[16px] px-[24px] w-[full] rounded-[12px]">
      <div className="text-[#A2A0A0] font-[700]">{title}</div>
      <div className="mt-[20px] font-[700] text-[40px] text-[#333333]">
        {content}
      </div>
    </div>
  );
};
export default React.memo(StatisticCard);
