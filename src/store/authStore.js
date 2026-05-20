import { create } from "zustand";
import axios from "axios";

const BASE_URL =
  "https://blog-app-backend-dvt6.onrender.com";

export const useAuth = create((set) => ({
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // LOGIN
  login: async (userCredWithRole) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await axios.post(
        `${BASE_URL}/common-api/login`,
        userCredWithRole,
        {
          withCredentials: true,
        }
      );

      console.log("Login response:", res);

      // SAVE TOKEN
      if (res.data.token) {
        localStorage.setItem(
          "token",
          res.data.token
        );
      }

      // SAVE USER
      if (res.data.payload) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(res.data.payload)
        );
      }

      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload,
      });
    } catch (err) {
      console.log("Login error:", err);

      set({
        loading: false,
        error:
          err.response?.data?.message ||
          "Login failed",
        currentUser: null,
        isAuthenticated: false,
      });
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      await axios.get(
        `${BASE_URL}/common-api/logout`,
        {
          withCredentials: true,
        }
      );

      // CLEAR STORAGE
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });
    } catch (err) {
      console.log("Logout error:", err);

      set({
        loading: false,
        error:
          err.response?.data?.message ||
          "Logout failed",
      });
    }
  },

  // CHECK AUTH
  checkAuth: async () => {
    try {
      set({
        loading: true,
      });

      const token =
        localStorage.getItem("token");

      // NO TOKEN
      if (!token) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });

        return;
      }

      const res = await axios.get(
        `${BASE_URL}/common-api/check-auth`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.log("Auth check failed:", err);

      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");

      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));