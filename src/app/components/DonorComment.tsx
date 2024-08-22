import React from "react";

interface IProps {
  comment: string;
}

const DonorComments: React.FC<IProps> = ({ comment }) => {
  return (
    <div className="whitespace-break-spaces max-w-[66%] break-words">
      {comment}
    </div>
  );
};
export default React.memo(DonorComments);
