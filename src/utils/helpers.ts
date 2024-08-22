"use client";

import i18n from "@/app/i18n";
import { UserRole } from "@/types/common.enum";
import { useCallback } from "react";

export const handleDonorStatusBgColor = (userType: number) => {
  switch (userType) {
    case 0:
      return "bg-[#F8D1D1]";
    case 1:
      return "bg-[#D0F6BD]";
  }
};
export const handleDonorStatusColor = (userType: number) => {
  switch (userType) {
    case 0:
      return "text-[#D13B3B]";
    case 1:
      return "text-[#44C159]";
  }
};

export const handleDonorStatus = (userType: number) => {
  switch (userType) {
    case 0:
      return i18n.t("common.unregistered");
    case 1:
      return i18n.t("common.unos");
  }
};

export const handleUserType = (userType: UserRole) => {
  switch (userType) {
    case UserRole.OPO:
      return i18n.t("admin.opo");
    case UserRole.PATHOLOGIST:
      return i18n.t("admin.pathologist");
    case UserRole.OTHER:
      return i18n.t("admin.other");
    case UserRole.TRANSPLANT:
      return i18n.t("admin.transplant");
  }
};
export const handleUserTypeBgColor = (userType: UserRole) => {
  switch (userType) {
    case UserRole.OPO:
      return "bg-[#8047C9]";
    case UserRole.PATHOLOGIST:
      return "bg-[#EE7C56]";
    case UserRole.OTHER:
      return "bg-[#28AD53]";
    case UserRole.TRANSPLANT:
      return "bg-[#AA50AC]";
  }
};
export function getMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("en-US", { month: "long" });
}

export function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export function isValidPassword(password: string) {
  const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{6,20}$/;
  return passwordReg.test(password);
}

export function isValidPhoneNumber(phone: string) {
  const phoneReg = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  return phoneReg.test(phone);
}
export function humanFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

export function isValidName(name: string) {
  const nameReg = /^[a-zA-Z0-9\s]{1,255}$/;
  return nameReg.test(name);
}
