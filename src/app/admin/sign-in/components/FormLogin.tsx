import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { AUTH } from "@/types/saga.type";
import { ROUTES } from "@/constants/routers";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function FormLogin() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("");
  const router = useRouter();
  const auth = useAppSelector((state) => state.authAdmin);

  const onFinish = (values: any) => {
    dispatch({
      type: AUTH.LOGIN,
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {};

  useEffect(() => {
    if (auth.isLogin) {
      router.push(ROUTES.HOME);
    }
  }, [auth, router]);

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ minWidth: 800 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="new-password"
    >
      <Form.Item<FieldType>
        label={t("common.username")}
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label={t("common.password")}
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 11, span: 18 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormLogin;
