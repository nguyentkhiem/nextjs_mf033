import { MenuItemType } from "./../types/common.types";
export const MENU_ITEMS: MenuItemType[] = [
  {
    id: 1,
    title: "Manager",
    url: "/admin",
    children: [
      {
        id: 4,
        title: "Users",
        url: "/admin/users",
      },
    ],
  },
  {
    id: 4,
    title: "Settings",
    url: "/admin/settings",
  },
];
