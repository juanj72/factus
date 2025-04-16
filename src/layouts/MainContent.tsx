import { ReactNode } from "react";
import { Sidebar } from "../../src/layouts/sidebar/SideBar";
import { Outlet } from "react-router-dom";

export const MainContent = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 p-6 overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
};
