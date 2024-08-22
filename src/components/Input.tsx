import { Input, InputProps } from "antd";

const FormInput: React.FC<InputProps> = (props) => {
  return (
    <Input
      autoComplete="new-password"
      className="w-[full]"
      size="large"
      {...props}
    />
  );
};
export default FormInput;
