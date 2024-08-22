import FormInput from "@/components/Input";
import { Button, Dropdown, Form, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import BundledEditor from "@/components/BundledEditor";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userGetReportTemplateRequest } from "@/redux/donor/actions";
import { useForm } from "antd/es/form/Form";

const CreateReportForm = () => {
  const { t } = useTranslation("");
  const editorRef = useRef(null);
  const dispatch = useAppDispatch();
  const template = useAppSelector((state) => state.donorReducer.template);
  const [form] = useForm();
  const [value, setValue] = useState("");
  useEffect(() => {
    dispatch(userGetReportTemplateRequest());
  }, []);
  const items: MenuProps["items"] = useMemo(
    () =>
      template.map((item) => ({
        label: item?.code,
        key: item?.id,
      })),
    [template]
  );

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setValue(template.find((item) => item.id === Number(e.key))?.content || "");
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="pt-[32px]">
      <div className="flex justify-between items-center mb-[16px]">
        <div className="font-bold text-[18px]">{t("common.report")}</div>
        <div>
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button
              size="large"
              className="w-[184px]"
              type="primary"
              ghost
              shape="round"
            >
              {t("common.template")}
            </Button>
          </Dropdown>
        </div>
      </div>
      <Form form={form} autoComplete="new-password">
        <Form.Item>
          <FormInput />
        </Form.Item>
        <Form.Item name="editor">
          <BundledEditor
            onInit={(evt: any, editor: any) => (editorRef.current = editor)}
            value={value}
            onGetContent={(e: any) => {
              setValue(e.content);
            }}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "anchor",
                "autolink",
                "help",
                "image",
                "link",
                "lists",
                "searchreplace",
                "table",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <div className="flex justify-end mt-[16px]">
            <Button type="primary" size="large" className="w-[160px]">
              {t("common.save")}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateReportForm;
