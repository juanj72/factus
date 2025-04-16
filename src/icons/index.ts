import { FaHome, FaUsers, FaCog, FaCalendarAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { FaFileInvoiceDollar } from "react-icons/fa";

export type AppIconName = "home" | "users" | "settings" | "calendar"| "invoice";

export const AppIcons: Record<AppIconName, IconType> = {
  home: FaHome,
  users: FaUsers,
  settings: FaCog,
  calendar: FaCalendarAlt,
  invoice: FaFileInvoiceDollar
};