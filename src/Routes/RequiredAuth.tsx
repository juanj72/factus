// src/routes/RequireAuth.tsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../src/api/Factus/utils/auth";

export const RequireAuth = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};


