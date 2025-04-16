import { AppIcons } from "../icons";
import { useRoutes,Navigate } from "react-router-dom";
import { MainContent } from "../layouts/MainContent";
import { Home } from "../pages/Home";
import { Invoices } from "../pages/Invoices";
import { Login } from "../pages/Login";
import { RequireAuth } from "../../src/Routes/RequiredAuth";


export type RouteItem = {
  name: string;
  route: string;
  icon: React.ReactNode;
};

export const sidebarRoutes: RouteItem[] = [
  {
    name: "Home",
    route: "/",
    icon: <AppIcons.home/>,
    
  },
  {
    name: "Invoices",
    route: "/invoices",
    icon: <AppIcons.invoice/>,
  },
  {
    name: "Logout",
    route: "/logout",
    icon: <AppIcons.logout />,
  },

];


export const AppRoutes = () =>
  useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      element: <RequireAuth />, 
      children: [
        {
          path: "/",
          element: <MainContent />,
          children: [
            { index: true, element: <Navigate to="/dashboard" replace /> },
            { path: "dashboard", element: <Home /> },
            { path: "invoices", element: <Invoices /> },
          ],
        },
      ],
    },
  ]);