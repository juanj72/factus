import { FaHome, FaUsers, FaCog, FaCalendarAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

export type AppIconName = "home" | "users" | "settings" | "calendar"| "invoice" | "logout";

export const AppIcons: Record<AppIconName, IconType> = {
  home: FaHome,
  users: FaUsers,
  settings: FaCog,
  calendar: FaCalendarAlt,
  invoice: FaFileInvoiceDollar,
  logout: IoIosLogOut

};