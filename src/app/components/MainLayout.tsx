"use client";

import { dir } from "i18next";
import { useEffect, useState } from "react";
import i18n from "../i18n";

import localFont from "next/font/local";

const Poppins = localFont({
  src: "../../assets/fonts/Poppins-Regular.ttf",
  preload: true,
});
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // get lang in store ...
  const lng = "en";
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (i18n.language) {
      setLoad(true);
    }
  }, [i18n.language]);

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={Poppins.className}>
        <div className="h-full">{load ? children : null}</div>
      </body>
    </html>
  );
};

export default MainLayout;
