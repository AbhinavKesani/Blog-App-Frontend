import { create } from "zustand";
import axios from "axios";

const BASE_URL = "https://blog-app-backend-tgj0.onrender.com";

/* =========================
   LOAD FROM STORAGE (SAFE PARSE)
========================= */
const getStoredUser = () => {
  try {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const storedUser = getStoredUser();

export const useAuth = create((set) => ({
  currentUser: storedUser,
  isAuthenticated: !!storedUser,
  loading: false,
  error: null,

  /* =========================
     LOGIN
  ========================= */
  login: async (userCredWithRole) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post(
        `${BASE_URL}/common-api/login`,
        userCredWithRole,
        { withCredentials: true }
      );

      const user = res.data.payload;

      localStorage.setItem("currentUser", JSON.stringify(user));

      set({
        currentUser: user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: err.response?.data?.message || "Login failed",
      });
    }
  },

  /* =========================
     LOGOUT
  ========================= */
  logout: async () => {
    set({ loading: true, error: null });

    try {
      await axios.get(`${BASE_URL}/common-api/logout`, {
        withCredentials: true,
      });

      localStorage.removeItem("currentUser");

      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Logout failed",
      });
    }
  },

  /* =========================
     CHECK AUTH (SERVER VERIFY)
  ========================= */
  checkAuth: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(
        `${BASE_URL}/common-api/check-auth`,
        { withCredentials: true }
      );

      const user = res.data.payload;

      localStorage.setItem("currentUser", JSON.stringify(user));

      set({
        currentUser: user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      localStorage.removeItem("currentUser");

      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    }
  },
}));