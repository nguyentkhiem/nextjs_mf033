"use client";

import { ChildrenType, MenuItemType } from "@/types/common.types";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface AccorditionProps {
  dataAccordition: MenuItemType;
}

const Accordition = ({ dataAccordition }: AccorditionProps) => {
  const router = useRouter();
  const path = usePathname();
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="overflow-hidden">
      <div
        className="flex justify-between cursor-pointer p-3 hover:bg-blue-100"
        onClick={() => setVisible(!visible)}
      >
        <span>{dataAccordition?.title}</span>
        <> {visible ? "+" : "-"}</>
      </div>
      <div
        className="transition-all duration-300 flex flex-col "
        style={{ maxHeight: visible ? 0 : "100vh" }}
      >
        {dataAccordition?.children?.map((e: ChildrenType) => (
          <div
            key={e.id}
            className="p-3 pl-8 hover:bg-blue-100 cursor-pointer"
            style={{
              backgroundColor: path === e.url ? "rgb(219 234 254)" : "",
            }}
            onClick={() => router.push(e.url)}
          >
            {e.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordition;
