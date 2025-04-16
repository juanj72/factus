import { AppIcons } from "../icons";
import { useRoutes } from "react-router-dom";
import { MainContent } from "../layouts/MainContent";
import { Home } from "../pages/Home";
import { Invoices } from "../pages/Invoices";


export type RouteItem = {
  name: string;
  route: string;
  icon: React.ReactNode;
};

export const sidebarRoutes: RouteItem[] = [
  {
    name: "Home",
    route: "/dashboard",
    icon: <AppIcons.home/>,
    
  },
  {
    name: "Invoices",
    route: "/invoices",
    icon: <AppIcons.invoice/>,
  },
];


export const AppRoutes = () =>
  useRoutes([
    {
      path: "/",
      element: <MainContent />,
      children: [
        { path: "dashboard", element: <Home /> },
        { path: "invoices", element: <Invoices /> },
      ],
    },
  ]);