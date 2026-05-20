import { create } from "zustand";
import axios from "axios";

const BASE_URL = "https://blog-app-backend-dvt6.onrender.com";

export const useAuth = create((set) => ({
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (userCredWithRole) => {
    const { role, ...userCredObj } = userCredWithRole;

    try {
      set({ loading: true, error: null });

      let res = await axios.post(
        `${BASE_URL}/common-api/login`,
        userCredObj,
        { withCredentials: true }
      );

      console.log("res is", res);

      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload,
      });
    } catch (err) {
      console.log("error is ", err);

      set({
        loading: false,
        error: err.response?.data?.error || "login error",
        currentUser: null,
        isAuthenticated: false,
      });
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });

      await axios.get(`${BASE_URL}/common-api/logout`, {
        withCredentials: true,
      });

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });
    } catch (err) {
      console.log("error is ", err);

      set({
        loading: false,
        isAuthenticated: false,
        error: err.response?.data?.error || "Logout Failed",
      });
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true });

      const res = await axios.get(
        `${BASE_URL}/common-api/check-auth`,
        { withCredentials: true }
      );

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });

        return;
      }

      console.error("Auth check failed:", err);

      set({ loading: false });
    }
  },
}));