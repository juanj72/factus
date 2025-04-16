import { SidebarToggle } from "../../../src/layouts/sidebar/SideBarToggle";
import { SidebarHeader } from "../../layouts/sidebar/SideBarHeader";
import { SidebarNav } from "../../layouts/sidebar/SideBarNav";
import { sidebarRoutes } from "../../Routes/routes";

export const Sidebar = () => {
  return (
    <>
      <SidebarToggle />

      <div
        id="hs-sidebar-collapsible-group"
        className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64
        hs-overlay-open:translate-x-0
        -translate-x-full transition-all duration-300 transform
        h-full hidden fixed top-0 start-0 bottom-0 z-60
        bg-white border-e border-gray-200"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <SidebarHeader />
          <SidebarNav items={sidebarRoutes} />
        </div>
      </div>
    </>
  );
};
