import { Button, ButtonProps } from "antd";
import { PropsWithChildren } from "react";

interface Props extends ButtonProps {}

const SocicalButton: React.FC<PropsWithChildren<Props>> = (props) => {
  return (
    <div className="social-btn">
      <Button size="large" className="w-[320px]" {...props}>
        <div className="flex items-center justify-center">{props.children}</div>
      </Button>
    </div>
  );
};
export default SocicalButton;
