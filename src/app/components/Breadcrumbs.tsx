"use client";
import { MenuItemType } from "@/types/common.types";
import { usePathname, useRouter } from "next/navigation";

interface BreadcrumbsProps {
  data: MenuItemType[];
}

const Breadcrumbs = ({ data }: BreadcrumbsProps) => {
  const router = useRouter();
  const path = usePathname();
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {data?.map((e: any, index: number) => (
          <li key={e.id}>
            <div className="flex items-center">
              <span
                onClick={() => router.push(e?.url)}
                style={{ color: e?.url === path ? "blue" : "#000" }}
                className="ml-1 mr-4 cursor-pointer text-sm font-medium hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                {e?.title}
              </span>
              {index < data.length - 1 && (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default Breadcrumbs;
