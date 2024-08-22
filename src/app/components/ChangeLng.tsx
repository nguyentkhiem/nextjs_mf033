"use client";

import i18next from "i18next";
import { LANGUAGES } from "@/constants/common";
import { Select } from "antd";

const ChangeLng = () => {
  const onChange = (value: string) => {
    i18next.changeLanguage(value?.toString()).then((t) => {
      // set locale to localstorage
    });
  };

  return (
    <Select
      defaultValue={"en"}
      style={{ width: 100 }}
      onChange={onChange}
      options={LANGUAGES.map((lang: string) => ({
        value: lang,
        label: lang,
      }))}
    />
  );
};

export default ChangeLng;
