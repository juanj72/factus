import { ReactNode } from "react";
import { Link } from "react-router-dom";

type SidebarItemProps = {
  icon: ReactNode;
  name: string;
  route: string;
};

export const SidebarItem = ({ icon, name, route }: SidebarItemProps) => {
  return (
    <li>
      <Link
        to={route}
        className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
      >
        {icon}
        {name}
      </Link>
    </li>
  );
};
