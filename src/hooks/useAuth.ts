// src/hooks/useAuth.ts
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import {
  saveTokens,
  clearTokens,
  isAuthenticated as checkAuth,
} from "../../src/api/Factus/utils/auth";

export const useAuth = () => {
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const body = new URLSearchParams();
    body.append("grant_type", "password");
    body.append("client_id", import.meta.env.VITE_CLIENT_ID);
    body.append("client_secret", import.meta.env.VITE_CLIENT_SECRET);
    body.append("username", email);
    body.append("password", password);

    try {
      const res = await api.post("/oauth/token", body.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token, refresh_token } = res.data;
      saveTokens(access_token, refresh_token);
      navigate("/dashboard"); 
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const logout = () => {
    clearTokens();
    navigate("/login");
  };

  return {
    login,
    logout,
    isAuthenticated: checkAuth(),
  };
};
