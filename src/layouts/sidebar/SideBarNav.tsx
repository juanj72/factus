import { SidebarItem } from "../../../src/layouts/sidebar/SideBarItem";
import { RouteItem } from "../../Routes/routes";

type SidebarNavProps = {
  items: RouteItem[];
};

export const SidebarNav = ({ items }: SidebarNavProps) => {
  return (
    <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
      <ul>
        {items.map((item) => (
          <SidebarItem key={item.route} {...item} />
        ))}
      </ul>
      <div
        className="hs-accordion-group pb-0 px-2  w-full flex flex-col flex-wrap"
        data-hs-accordion-always-open
      >
        {/* Usa props o define componentes para Items si es necesario */}
      </div>
    </nav>
  );
};
