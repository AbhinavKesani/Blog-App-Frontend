import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore";
import { useNavigate, NavLink } from "react-router-dom";

import {
  pageBackground,
  formCard,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  mutedText,
  linkClass,
} from "../styles/common";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const login = useAuth((state) => state.login);

  // submit
  const formSubmit = async (userData) => {
    try {
      await login(userData);
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  // redirect after login
  useEffect(() => {
    if (!isAuthenticated || !currentUser) return;

    const role = currentUser.role;

    if (role === "USER") navigate("/user-profile");
    else if (role === "AUTHOR") navigate("/author-profile");
    else if (role === "ADMIN") navigate("/admin-profile");
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <div className={`${pageBackground} flex items-center justify-center min-h-screen px-6`}>
      <form onSubmit={handleSubmit(formSubmit)} className={formCard}>

        <h2 className="text-3xl font-bold text-center mb-8">
          Sign In
        </h2>

        {/* EMAIL */}
        <div className={formGroup}>
          <label className={labelClass}>Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
            })}
            className={inputClass}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className={formGroup}>
          <label className={labelClass}>Password</label>

          <input
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
            })}
            className={inputClass}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button type="submit" className={submitBtn}>
          Sign In
        </button>

        {/* FOOTER */}
        <p className={`${mutedText} text-center mt-6`}>
          Don't have an account?{" "}
          <NavLink to="/register" className={linkClass}>
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
