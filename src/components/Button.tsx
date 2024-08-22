import { Button, ButtonProps } from "antd";

const LoginButton: React.FC<ButtonProps> = (props) => {
  return (
    <div className="admin-login-btn">
      <Button {...props}>{props.children}</Button>
    </div>
  );
};
export default LoginButton;
